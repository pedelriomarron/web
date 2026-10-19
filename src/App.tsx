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
import { LanguageProvider, useLanguage } from './containers/Language';
import type { TextId } from './languages';
import Cassette from './components/includes/Cassette';

const pageMeta: Record<string, [TextId, TextId]> = {
  '/portfolio': ['header_portfolio', 'header_portfolio_sub'],
  '/resume': ['header_resume', 'header_resume_sub'],
  '/skills': ['header_skills', 'header_skills_sub'],
  '/about': ['header_about', 'header_about_sub'],
  '/contact': ['header_contact', 'header_contact_sub'],
}

// Title and description per page and language (Google renders the JS)
const defaultTitle = document.title;
const defaultDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';

function PageMeta({ pathname }: { pathname: string }) {
  const { t } = useLanguage();

  useEffect(() => {
    const meta = pageMeta[pathname];
    document.title = meta ? `${t(meta[0])} | Pedro del Río Marrón` : defaultTitle;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta ? t(meta[1]) : defaultDescription);
  }, [pathname, t]);

  return null;
}

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => { window.scrollTo({ top: 0 }) }, [pathname]);

  return (
    <LanguageProvider>
      <PageMeta pathname={pathname} />
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
          <Cassette />
        </div>
      </div>
    </LanguageProvider>
  );
}
