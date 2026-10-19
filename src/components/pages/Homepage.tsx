import { NavLink } from 'react-router';
import { ArrowRight, ArrowUpRight, BriefcaseBusiness, Cog, FileUser, MailOpen } from 'lucide-react';
import Constellation from '../includes/Constellation';
import { Text } from '../../containers/Language';
import { colorOf } from '../../nav';
import { trackSpotlight } from '../../hooks';

const features = [
    { href: "/portfolio", title: "feature_projects", icon: BriefcaseBusiness, subtitle: "feature_projects_sub" },
    { href: "/resume", title: "feature_resume", icon: FileUser, subtitle: "feature_resume_sub" },
    { href: "/skills", title: "feature_skills", icon: Cog, subtitle: "feature_skills_sub" },
    { href: "/contact", title: "feature_contact", icon: MailOpen, subtitle: "feature_contact_sub" },
] as const

export default function Homepage() {
    return (
        <>
            <section className="relative isolate overflow-hidden bg-[linear-gradient(90deg,#93d4ea_0%,#175384_100%)] px-6 pt-28 pb-40 md:px-12 md:pt-16 md:pb-36">
                {/* depth: glows over the original gradient */}
                <div aria-hidden className="absolute -top-40 -left-20 -z-10 size-[520px] rounded-full bg-white/30 blur-3xl" />
                <div aria-hidden className="absolute -top-20 right-0 -z-10 size-[420px] rounded-full bg-[#0b2a4a]/40 blur-3xl" />
                <Constellation className="-z-10" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-linear-to-b from-transparent to-(--bg)" />

                <div className="mx-auto max-w-6xl text-white">
                    <p className="rise mb-6 md:mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 font-mono text-xs ring-1 ring-white/30 backdrop-blur-md">
                        <span className="relative flex size-2">
                            <span className="absolute inline-flex size-full animate-ping rounded-full bg-white opacity-75" />
                            <span className="relative inline-flex size-2 rounded-full bg-white" />
                        </span>
                        <Text tid="homepage_kicker" />
                    </p>
                    <h1 className="rise max-w-5xl text-5xl leading-[0.95] font-black tracking-tighter text-balance drop-shadow-[0_2px_24px_rgba(11,42,74,0.35)] sm:text-6xl md:text-7xl" style={{ '--i': 1 } as React.CSSProperties}>
                        <Text tid="homepage_title" /><span className="caret text-sky">_</span>
                    </h1>
                    <p className="rise mt-6 max-w-2xl text-lg text-white/85 md:mt-4 md:text-xl" style={{ '--i': 2 } as React.CSSProperties}>
                        <Text tid="homepage_subtitle" />
                    </p>
                    <div className="rise mt-10 flex flex-wrap gap-3 md:mt-8" style={{ '--i': 3 } as React.CSSProperties}>
                        <NavLink to="/about" className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold tracking-wider text-ink uppercase shadow-xl shadow-[#0b2a4a]/30 transition hover:-translate-y-0.5 hover:shadow-2xl">
                            <Text tid="homepage_btn" />
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </NavLink>
                        <NavLink to="/portfolio" className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold tracking-wider text-white uppercase ring-1 ring-white/50 backdrop-blur transition hover:bg-white/10">
                            <Text tid="homepage_btn_2" />
                        </NavLink>
                    </div>
                </div>
            </section>

            <section className="relative z-10 mx-auto -mt-24 grid max-w-6xl gap-4 px-6 sm:grid-cols-2 md:px-12 xl:grid-cols-4">
                {features.map(({ href, title, subtitle, icon: Icon }, i) => {
                    const color = colorOf(href);
                    return (
                        <NavLink key={href} to={href} onPointerMove={trackSpotlight}
                            style={{ '--accent': color, '--i': i + 3 } as React.CSSProperties}
                            className="spotlight surface rise group flex flex-col rounded-3xl p-7 md:p-6 shadow-xl shadow-slate-900/5 transition-transform duration-500 ease-(--ease-spring) hover:-translate-y-3 hover:scale-[1.03] dark:shadow-black/30">
                            <div className="mb-6 flex items-start justify-between">
                                <span className="grid size-14 place-items-center rounded-2xl md:size-16 transition-transform duration-500 ease-(--ease-spring) group-hover:-rotate-6 group-hover:scale-110"
                                    style={{ background: `color-mix(in oklab, ${color} 18%, transparent)`, color }}>
                                    <Icon className="size-7 md:size-8" strokeWidth={1.5} />
                                </span>
                                <ArrowUpRight className="text-muted size-5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-(--accent)" />
                            </div>
                            <h2 className="text-xl font-bold"><Text tid={title} /></h2>
                            <p className="text-muted mt-1 text-sm leading-relaxed"><Text tid={subtitle} /></p>
                        </NavLink>
                    );
                })}
            </section>
        </>
    );
}
