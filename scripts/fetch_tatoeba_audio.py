#!/usr/bin/env python3
"""Descarga frases japonesas de Tatoeba grabadas por hablantes nativos con licencia libre.

Qué hace:
  1. Baja los índices públicos de Tatoeba (frases, audios, traducciones, lecturas, idiomas de usuarios).
  2. Se queda solo con audios cuyo autor declara japonés nativo (nivel 5) y cuya licencia
     permite reutilizarlos (CC BY / CC BY-SA / CC BY-NC / CC0). Los audios sin licencia
     declarada NO se usan.
  3. Descarga los MP3 a public/audio/tatoeba/ y escribe src/content/listening/tatoeba.json
     con texto, lectura, traducciones, autor, licencia y enlace a la fuente.

Uso:  npm run content:audio   (descarga + romaji)
      python3 scripts/fetch_tatoeba_audio.py [--max N] [--no-download]
Después de este script hay que correr scripts/add_romaji.ts (lo hace npm run content:audio).
Requiere acceso a downloads.tatoeba.org y tatoeba.org. Es idempotente: no vuelve a bajar
audios que ya existen.
"""
import argparse, bz2, collections, csv, json, os, sys, time, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO_DIR = os.path.join(ROOT, "public", "audio", "tatoeba")
OUT_JSON = os.path.join(ROOT, "src", "content", "listening", "tatoeba.json")
CACHE = os.path.join(ROOT, ".cache", "tatoeba")
BASE = "https://downloads.tatoeba.org/exports/per_language"
UA = "NihongoQuestAudioFetcher/0.1 (non-commercial educational app)"
ALLOWED = {"CC BY 4.0", "CC BY-SA 4.0", "CC BY-NC 4.0", "CC0 1.0", "CC BY 2.0 FR"}

csv.field_size_limit(10**9)


def fetch(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                return r.read()
        except Exception as e:  # noqa: BLE001
            if attempt == 3:
                raise
            print(f"  reintento {attempt + 1} ({e})", file=sys.stderr)
            time.sleep(2 ** attempt)
    raise RuntimeError("unreachable")


def table(path: str):
    """Lee un TSV de Tatoeba (bz2), cacheado en .cache/tatoeba/."""
    os.makedirs(CACHE, exist_ok=True)
    local = os.path.join(CACHE, path.replace("/", "_"))
    if not os.path.exists(local):
        print(f"descargando {path}", file=sys.stderr)
        with open(local, "wb") as f:
            f.write(fetch(f"{BASE}/{path}"))
    with bz2.open(local, "rt", encoding="utf-8") as f:
        yield from csv.reader(f, delimiter="\t", quoting=csv.QUOTE_NONE)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--max", type=int, default=0, help="máximo de frases (0 = todas)")
    ap.add_argument("--no-download", action="store_true", help="solo regenerar el índice con los audios ya descargados")
    args = ap.parse_args()

    natives = {r[2] for r in table("jpn/jpn_user_languages.tsv.bz2") if len(r) > 2 and r[1] == "5"}
    audio = {}
    for row in table("jpn/jpn_sentences_with_audio.tsv.bz2"):
        if len(row) < 4:
            continue
        sid, aid, user, lic, *rest = row
        if user in natives and lic in ALLOWED and sid not in audio:
            audio[sid] = {"audioId": aid, "voice": user, "license": lic, "attribution": rest[0] if rest else ""}
    print(f"{len(audio)} audios nativos con licencia libre", file=sys.stderr)

    jpn = {r[0]: r[2] for r in table("jpn/jpn_sentences.tsv.bz2") if len(r) > 2 and r[0] in audio}
    links = {"spa": collections.defaultdict(list), "eng": collections.defaultdict(list)}
    for lang in links:
        for r in table(f"jpn/jpn-{lang}_links.tsv.bz2"):
            if len(r) < 2:
                continue
            a, b = r[0], r[1]
            if a in audio:
                links[lang][a].append(b)
    texts = {}
    for lang in links:
        need = {b for v in links[lang].values() for b in v}
        texts[lang] = {r[0]: r[2] for r in table(f"{lang}/{lang}_sentences.tsv.bz2") if len(r) > 2 and r[0] in need}
    reading = {r[0]: r[4] for r in table("jpn/jpn_transcriptions.tsv.bz2") if len(r) > 4 and r[0] in audio and r[2] == "Hrkt"}

    items = []
    for sid, a in audio.items():
        if sid not in jpn:
            continue
        items.append({
            "id": sid,
            "jp": jpn[sid],
            "reading": reading.get(sid, ""),
            "es": [texts["spa"][x] for x in links["spa"][sid] if x in texts["spa"]][:2],
            "en": [texts["eng"][x] for x in links["eng"][sid] if x in texts["eng"]][:2],
            **a,
        })
    # Primero las que tienen traducción al español y son cortas.
    items.sort(key=lambda o: (not o["es"], len(o["jp"])))
    if args.max:
        items = items[: args.max]

    os.makedirs(AUDIO_DIR, exist_ok=True)

    def download(it):
        dest = os.path.join(AUDIO_DIR, f"{it['audioId']}.mp3")
        if os.path.exists(dest):
            return
        data = fetch(f"https://tatoeba.org/audio/download/{it['audioId']}")
        if not data.startswith(b"ID3") and data[:2] != b"\xff\xfb":
            print(f"  {it['audioId']}: no es MP3, se omite", file=sys.stderr)
            return
        tmp = dest + ".part"
        with open(tmp, "wb") as f:
            f.write(data)
        os.replace(tmp, dest)

    # Descargas de a una: el servidor (y algunos proxies) atienden mal las conexiones simultáneas.
    if not args.no_download:
        for i, it in enumerate(items, 1):
            download(it)
            if i % 50 == 0:
                print(f"  {i}/{len(items)} audios", file=sys.stderr)
    items = [it for it in items if os.path.exists(os.path.join(AUDIO_DIR, f"{it['audioId']}.mp3"))]

    os.makedirs(os.path.dirname(OUT_JSON), exist_ok=True)
    with open(OUT_JSON, "w", encoding="utf-8") as f:
        json.dump(
            {
                "source": "Tatoeba (https://tatoeba.org)",
                "note": "Texto: CC BY 2.0 FR (autores de Tatoeba). Audio: licencia indicada en cada frase. "
                "Traducciones de voluntarios de Tatoeba, no revisadas por Nihongo Quest.",
                "generatedAt": time.strftime("%Y-%m-%d"),
                "items": items,
            },
            f,
            ensure_ascii=False,
            indent=0,
        )
    print(f"listo: {len(items)} frases -> {OUT_JSON}", file=sys.stderr)


if __name__ == "__main__":
    main()
