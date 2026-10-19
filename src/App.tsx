import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { Footer } from './components/includes/Footer';
import { Sidebar } from './components/includes/Sidebar';
import { About } from './components/pages/About';
import { Resume } from './components/pages/Resume';
import { Contact } from './components/pages/Contact';
import { Skills } from './components/pages/Skills';
import { Portfolio } from './components/pages/portfolio/Portfolio';
import Homepage from './components/pages/Homepage';
import { NoMatchPage } from './components/pages/NoMatchPage';
import { LanguageProvider } from './containers/Language';

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => { window.scrollTo({ top: 0 }) }, [pathname]);

  return (
    <LanguageProvider>
      <div className="grain flex min-h-dvh">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <main key={pathname} className="flex-1">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NoMatchPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </LanguageProvider>
  );
}
