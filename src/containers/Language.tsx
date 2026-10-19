import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { dictionaryList, type LangId, type TextId } from '../languages';

const STORAGE_KEY = 'config';

// Same rules as the old LangService: saved choice > browser language > English
function initialLang(): LangId {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null');
        if (saved?.lang in dictionaryList) return saved.lang;
    } catch { /* ignore */ }
    const browser = navigator.language.substring(0, 2);
    return browser in dictionaryList ? browser as LangId : 'en';
}

interface LanguageContextValue {
    lang: LangId;
    setLang: (lang: LangId) => void;
    t: (tid: TextId) => string;
}

export const LanguageContext = createContext<LanguageContextValue>(null!);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<LangId>(initialLang);

    useEffect(() => {
        document.documentElement.lang = lang;
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ lang })); } catch { /* ignore */ }
    }, [lang]);

    const t = (tid: TextId) => dictionaryList[lang][tid];

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);

// get text according to id & current language
export function Text({ tid }: { tid: TextId }) {
    return <>{useLanguage().t(tid)}</>;
}
