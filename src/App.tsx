import { HashRouter, Route, Routes } from 'react-router-dom';
import { Shell } from './ui/Shell';
import { Home } from './ui/pages/Home';
import { KanaPage } from './ui/pages/KanaPage';
import { Stats } from './ui/pages/Stats';
import { Settings } from './ui/pages/Settings';
import { Planned } from './ui/pages/Planned';
import { Listening } from './ui/pages/Listening';
import { SECTIONS } from './content/sections';
import { useTheme } from './ui/hooks';

const BUILT: Record<string, JSX.Element> = {
  inicio: <Home />,
  hiragana: <KanaPage script="hiragana" />,
  katakana: <KanaPage script="katakana" />,
  escucha: <Listening />,
  estadisticas: <Stats />,
  configuracion: <Settings />,
};

export function App() {
  useTheme();
  return (
    // HashRouter: funciona en GitHub Pages sin configurar redirecciones.
    <HashRouter>
      <Shell>
        <Routes>
          {SECTIONS.map((s) => (
            <Route key={s.id} path={s.path} element={BUILT[s.id] ?? <Planned section={s} />} />
          ))}
          <Route path="*" element={<Home />} />
        </Routes>
      </Shell>
    </HashRouter>
  );
}
