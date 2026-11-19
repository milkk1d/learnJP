# learnJP 日本語

Japan teacher by Claude: una web para aprender **hiragana y katakana** desde el navegador, pensada para el celular.

## Qué incluye

- **Tablas**: los 104 caracteres de cada sistema (básicos, dakuten y combinados). Toca uno para escuchar cómo suena.
- **Practicar**: elige hiragana, katakana o ambos, las filas que quieres repasar y un modo:
  - Kana → romaji, eligiendo entre 4 opciones.
  - Kana → romaji, escribiendo la respuesta (acepta variantes como `shi`/`si`, `tsu`/`tu`, `fu`/`hu`).
  - Romaji → kana, eligiendo el carácter.
- **Repaso espaciado**: cada carácter sube de nivel cuando aciertas y baja cuando fallas. Los que más te cuestan aparecen más seguido.
- **Progreso**: cuántos dominas, cuántos has visto y tu porcentaje de aciertos.
- **Voz**: usa la voz japonesa de tu dispositivo (Web Speech API). Es gratis y no necesita cuenta.

El progreso se guarda solo en tu navegador (`localStorage`). No hay servidor ni cuentas.

## Usarla

Es una página estática: abre `index.html` desde un servidor local.

```bash
npm start            # o: python3 -m http.server 8000
# luego abre http://localhost:8000
```

Para publicarla, activa **GitHub Pages** en *Settings → Pages* usando la rama `main` y la carpeta raíz.

### Si no se escucha la voz

La pronunciación depende de que tu dispositivo tenga una voz japonesa:

- **iPhone/iPad**: Ajustes → Accesibilidad → Contenido leído → Voces → Japonés.
- **Android**: Ajustes → Sistema → Idioma → Salida de texto a voz → instala los datos de japonés.
- **Windows**: Configuración → Hora e idioma → Voz → Agregar voces → Japonés.

## Pruebas

```bash
npm test
```

Comprueban los datos de kana (cantidad, conversión a katakana, romaji) y la lógica de repaso y corrección.

## Estructura

```
index.html        página principal
css/style.css     estilos (modo claro y oscuro)
js/kana.js        datos de hiragana; el katakana se genera desde ahí
js/srs.js         repaso espaciado, corrección y opciones
js/app.js         interfaz, voz y guardado
tests/            pruebas con node:test
```

## Licencia

MIT. Ver [LICENSE](LICENSE).
