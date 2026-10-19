import { useState } from 'react';
import { ArrowUpRight, ChevronDown, Eye, Gamepad2, MoveHorizontal, Sparkles } from 'lucide-react';
import Header from '../../includes/Header';
import { GithubIcon } from '../../includes/Brands';
import { Text, useLanguage } from '../../../containers/Language';
import type { TextId } from '../../../languages';
import type { L10n } from '../../../data';
import { archive } from '../../../archive';
import { correctTitle } from '../../../utils';
import { trackSpotlight } from '../../../hooks';

const img = (file: string) => import.meta.env.BASE_URL + 'projects/' + file
const repo = (name: string) => `https://github.com/pedelriomarron/${name}`

interface Link { href: string, label: TextId, primary?: boolean }

const btn = (primary?: boolean) => primary
    ? 'inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-ink'
    : 'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold ring-1 ring-(--border) transition hover:-translate-y-0.5 hover:bg-(--border)'

function Links({ links }: { links: Link[] }) {
    return (
        <div className="mt-auto flex flex-wrap gap-2 pt-3">
            {links.map(({ href, label, primary }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" className={btn(primary)}>
                    {label === 'portfolio_code' ? <GithubIcon className="size-3.5" /> : label === 'portfolio_play' ? <Gamepad2 className="size-3.5" /> : <ArrowUpRight className="size-3.5" />}
                    <Text tid={label} />
                </a>
            ))}
        </div>
    );
}

function Card({ title, text, tags, links, accent, children, className = "", index }:
    { title: string, text: L10n, tags: string[], links: Link[], accent: string, children: React.ReactNode, className?: string, index: number }) {
    const { lang } = useLanguage();
    return (
        <article onPointerMove={trackSpotlight} style={{ '--accent': accent, '--i': index } as React.CSSProperties}
            className={`spotlight surface rise group flex overflow-hidden rounded-3xl ${className}`}>
            {children}
            <div className="flex flex-1 flex-col p-4 md:px-5">
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="text-muted mt-1 text-sm leading-snug">{text[lang]}</p>
                <ul className="mt-3 flex flex-wrap gap-1">
                    {tags.map(tag => <li key={tag} className="rounded-full bg-(--border) px-2 py-0.5 font-mono text-[10px]">{tag}</li>)}
                </ul>
                <Links links={links} />
            </div>
        </article>
    );
}

// Drag to compare the 2020 site with the remaster
function BeforeAfter() {
    const [pos, setPos] = useState(50);
    const { t } = useLanguage();
    return (
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-(--border) select-none md:w-[46%] md:aspect-auto">
            <img src={img('web-2026.jpg')} alt="2026" className="absolute inset-0 size-full object-cover object-[35%_top]" />
            <img src={img('web-2020.jpg')} alt="2020" className="absolute inset-0 size-full object-cover object-[35%_top]"
                style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} />
            <div aria-hidden className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,.5)]" style={{ left: `${pos}%` }}>
                <span className="absolute top-1/2 left-1/2 grid size-7 -translate-1/2 place-items-center rounded-full bg-white text-ink shadow-lg">
                    <MoveHorizontal className="size-3.5" />
                </span>
            </div>
            <span className="absolute top-2 left-2 rounded-full bg-ink/70 px-2 py-0.5 font-mono text-[10px] text-white">2020</span>
            <span className="absolute top-2 right-2 rounded-full bg-ink/70 px-2 py-0.5 font-mono text-[10px] text-sky">2026</span>
            <input type="range" min={0} max={100} value={pos} onChange={e => setPos(+e.target.value)} aria-label={t('portfolio_drag')}
                className="absolute inset-0 size-full cursor-ew-resize opacity-0" />
        </div>
    );
}

function Archive() {
    return (
        <section className="mt-8">
            <p className="text-muted mb-4 text-sm"><Text tid="portfolio_archive_sub" /></p>
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {archive.map((item, i) => (
                    <li key={item.name} className="rise surface flex items-center gap-3 rounded-xl px-3 py-2.5 font-mono text-xs" style={{ '--i': Math.min(i, 12) } as React.CSSProperties}>
                        <span className="text-muted">{item.year}</span>
                        <span className="min-w-0 flex-1">
                            <span className="block truncate font-semibold capitalize" title={item.description}>{correctTitle(item.name)}</span>
                            <span className="text-muted text-[10px]">{item.lang}</span>
                        </span>
                        {item.demo && <a href={item.demo} target="_blank" rel="noopener noreferrer" aria-label="Demo" className="text-muted grid size-7 place-items-center rounded-lg transition hover:bg-(--border) hover:text-(--text)"><Eye className="size-3.5" /></a>}
                        <a href={repo(item.name)} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted grid size-7 place-items-center rounded-lg transition hover:bg-(--border) hover:text-(--text)"><GithubIcon className="size-3.5" /></a>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export const Portfolio = () => {
    const [showArchive, setShowArchive] = useState(false);

    return (
        <>
            <Header title="header_portfolio" subtitle="header_portfolio_sub" url="/portfolio" />
            <div className="mx-auto max-w-6xl px-6 md:px-12">
                <div className="grid gap-4 lg:grid-cols-[minmax(0,11fr)_minmax(0,9fr)]">
                    <Card index={0} accent="#c2452d" title="Sísifo"
                        text={{ es: "Buscador de oposiciones y empleo público en toda España. Vigila el BOE y los boletines autonómicos y provinciales, calcula los plazos y avisa por Telegram.", en: "Search engine for public-sector jobs across Spain. It watches the official gazettes, tracks every deadline and sends Telegram alerts." }}
                        tags={["Proyecto propio", "Alertas Telegram", "ES · CA · GL · EU"]}
                        links={[{ href: "https://sisifo.app", label: "portfolio_visit", primary: true }]}
                        className="flex-col">
                        <div className="relative aspect-[16/6.5] overflow-hidden bg-(--border)">
                            <img src={img('sisifo.jpg')} alt="Sísifo" className="size-full object-cover object-top transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-105" />
                            <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-[#c2452d] px-2.5 py-1 text-[11px] font-bold text-white shadow-lg">
                                <Sparkles className="size-3" /> <Text tid="portfolio_new" />
                            </span>
                        </div>
                    </Card>

                    <div className="grid gap-4">
                        <Card index={1} accent="#8b5a3c" title="Flamme Rouge"
                            text={{ es: "App para llevar la partida del juego de mesa: etapas, clasificaciones y partidas guardadas.", en: "Companion app for the board game: stages, rankings and saved games." }}
                            tags={["Svelte", "Ionic", "PWA", "TypeScript"]}
                            links={[{ href: "https://pedelriomarron.github.io/flamme-rouge_pwa/", label: "portfolio_play", primary: true }, { href: repo('flamme-rouge_pwa'), label: "portfolio_code" }]}
                            className="flex-col sm:flex-row">
                            <div className="flex shrink-0 items-end justify-center bg-[#45201a] px-5 pt-4 sm:w-32">
                                <img src={img('flamme-rouge.jpg')} alt="Flamme Rouge" className="w-24 rounded-t-xl ring-4 ring-ink transition-transform duration-500 ease-(--ease-spring) group-hover:-translate-y-1" />
                            </div>
                        </Card>
                        <Card index={2} accent="#93d4ea" title={useLanguage().lang === 'es' ? "Esta web 2020 → 2026" : "This site 2020 → 2026"}
                            text={{ es: "Mi web de 2020, remasterizada. Arrastra para comparar.", en: "My 2020 site, remastered. Drag to compare." }}
                            tags={["React 19", "Vite", "Tailwind 4"]}
                            links={[{ href: repo('web'), label: "portfolio_code" }]}
                            className="flex-col md:flex-row">
                            <BeforeAfter />
                        </Card>
                    </div>
                </div>

                <button onClick={() => setShowArchive(s => !s)}
                    className="text-muted mx-auto mt-5 flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 font-mono text-xs font-semibold ring-1 ring-(--border) transition hover:text-(--text)">
                    <ChevronDown className={`size-3.5 transition-transform ${showArchive ? 'rotate-180' : ''}`} />
                    {showArchive ? <Text tid="portfolio_less" /> : <><Text tid="portfolio_archive" /> ({archive.length})</>}
                </button>
                {showArchive && <Archive />}
            </div>
        </>
    );
}
