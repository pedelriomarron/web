import { languageOptions } from '../../languages';
import { useLanguage } from '../../containers/Language';

export default function LanguageSelector() {
    const { lang, setLang } = useLanguage();

    return (
        <div role="radiogroup" aria-label="Language" className="relative grid grid-cols-2 rounded-full bg-white/5 p-1 text-xs font-semibold ring-1 ring-white/10">
            <span
                aria-hidden
                className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-white shadow transition-transform duration-500 ease-(--ease-spring)"
                style={{ transform: lang === languageOptions[1].id ? 'translateX(100%)' : undefined }}
            />
            {languageOptions.map(item => (
                <button
                    key={item.id}
                    role="radio"
                    aria-checked={lang === item.id}
                    onClick={() => setLang(item.id)}
                    className={`relative z-10 cursor-pointer rounded-full px-3 py-1.5 transition-colors ${lang === item.id ? 'text-ink' : 'text-white/60 hover:text-white'}`}
                >
                    {item.text}
                </button>
            ))}
        </div>
    );
}
