import { Download } from 'lucide-react';
import Header from '../includes/Header';
import sign from '../../img/sign.svg';
import photo from '../../img/profile.jpg';
import { Text } from '../../containers/Language';
import { social } from '../includes/Brands';
import { colorOf } from '../../nav';

const name = "Pedro del Río Marrón"
const available = false
const cv = "https://drive.google.com/file/d/1TvHb0JQK4aQnimNJ8Q7P8byWJIB3DMTY/view"

export function About() {
    const color = colorOf('/about');

    return (
        <>
            <Header title="header_about" subtitle="header_about_sub" url="/about" />
            <div className="mx-auto grid max-w-6xl gap-6 px-6 md:px-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                {/* ID card */}
                <div className="surface rise relative overflow-hidden rounded-3xl p-8">
                    <div aria-hidden className="absolute inset-x-0 top-0 h-32" style={{ background: `linear-gradient(135deg, ${color}, #175384)` }} />
                    <img src={photo} alt={name} width={160} height={160}
                        className="relative mt-10 size-40 rounded-3xl object-cover shadow-2xl ring-4 ring-(--surface) transition duration-500 ease-(--ease-spring) hover:scale-105 hover:-rotate-2" />
                    <h2 className="mt-6 text-2xl font-bold">{name}</h2>
                    <p className="text-muted font-mono text-sm">@pedelriomarron</p>
                    <div className="mt-6 flex gap-2">
                        {social.slice(0, 2).map(({ name, href, icon: Icon }) => (
                            <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name}
                                className="grid size-10 place-items-center rounded-xl ring-1 ring-(--border) transition hover:-translate-y-0.5 hover:bg-(--border)">
                                <Icon className="size-4" />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="surface rise flex flex-col rounded-3xl p-8" style={{ '--i': 1 } as React.CSSProperties}>
                    <span className="font-mono text-xs tracking-widest uppercase" style={{ color }}>// about.md</span>
                    <p className="mt-4 text-xl leading-relaxed text-pretty md:text-xl md:leading-relaxed">
                        <Text tid="about_extract" />
                    </p>
                    <img alt="" src={sign} className="mt-6 w-32 opacity-80 dark:invert" />

                    <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
                        <span className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold ring-1 ring-(--border)">
                            <span className="relative flex size-2.5">
                                {available && <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-500 opacity-75" />}
                                <span className={`relative inline-flex size-2.5 rounded-full ${available ? 'bg-green-500' : 'bg-red-500'}`} />
                            </span>
                            <Text tid={available ? "about_available" : "about_not_available"} />
                        </span>
                        <a href={cv} rel="noopener noreferrer" target="_blank"
                            className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-ink">
                            <Download className="size-4 transition-transform group-hover:translate-y-0.5" />
                            <Text tid="about_download" />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
