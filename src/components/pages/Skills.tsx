import Header from '../includes/Header';
import { useLanguage } from '../../containers/Language';
import { trackSpotlight } from '../../hooks';
import { skillGroups, skillLogos } from '../../data';

export function Skills() {
    const { lang } = useLanguage();

    return (
        <>
            <Header title="header_skills" subtitle="header_skills_sub" url="/skills" />
            <section className="mx-auto max-w-6xl px-6 md:px-12">
                <div className="grid gap-4 sm:grid-cols-2 md:gap-3 lg:grid-cols-3">
                    {skillGroups.map(({ title, icon: Icon, color, items }, i) => (
                        <article key={title.en} onPointerMove={trackSpotlight}
                            style={{ '--accent': color, '--i': i } as React.CSSProperties}
                            className="spotlight surface rise group rounded-3xl p-5 transition-transform duration-500 ease-(--ease-spring) hover:-translate-y-1.5 md:p-4">
                            <div className="flex items-center gap-3">
                                <span className="grid size-8 place-items-center rounded-lg bg-(--accent)/12 text-(--accent) transition-transform duration-500 ease-(--ease-spring) group-hover:scale-110 group-hover:-rotate-6">
                                    <Icon className="size-4" />
                                </span>
                                <h3 className="font-bold">{title[lang]}</h3>
                            </div>
                            <ul className="mt-3 flex flex-wrap gap-1">
                                {items.map(name => (
                                    <li key={name} className="inline-flex items-center gap-1 rounded-full bg-(--border) px-2.5 py-[5px] font-mono text-[11px] leading-none">
                                        {skillLogos[name] && <img alt="" className="size-3 object-contain" src={import.meta.env.BASE_URL + 'skills/' + skillLogos[name]} />}
                                        {name}
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </section>
        </>
    );
}
