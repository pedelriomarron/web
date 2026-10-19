import { useState } from 'react';
import { Briefcase, ChevronDown, ChevronRight, CornerDownRight, GraduationCap } from 'lucide-react';
import Header from '../includes/Header';
import { Text, useLanguage } from '../../containers/Language';
import { colorOf } from '../../nav';
import { education, experience, formatPeriod, type Job } from '../../data';

const RECENT = 4

// Horizontal timeline on desktop, vertical on mobile
// Arrow sitting on the timeline line; the background hides the dashes behind it
const lineArrow = "absolute grid size-5 place-items-center rounded-full bg-(--bg) text-muted"

function Timeline({ items, compact, offset = 0, continues, continued }:
    { items: Job[], compact?: boolean, offset?: number, continues?: boolean, continued?: boolean }) {
    const { lang, t } = useLanguage();
    const color = colorOf('/resume');

    return (
        <ol className="ml-2 grid gap-3 border-l-2 border-dashed border-(--border) pl-6 md:ml-0 md:grid-cols-4 md:border-t-2 md:border-l-0 md:pt-5 md:pl-0">
            {items.map((item, i) => {
                const current = !item.to;
                return (
                    <li key={item.company + item.from} className="rise relative" style={{ '--i': i + offset } as React.CSSProperties}>
                        <span aria-hidden className="absolute top-4 -left-[33px] size-3.5 rounded-full ring-4 ring-(--bg) md:-top-[29px] md:left-6"
                            style={{ background: current ? color : 'var(--muted)', boxShadow: current ? `0 0 16px ${color}` : undefined }} />
                        {/* next = older: → on the horizontal line, ↓ on the vertical one */}
                        {i < items.length - 1 && <>
                            <span aria-hidden className={`${lineArrow} -top-[32px] -right-4 hidden md:grid`}><ChevronRight className="size-3.5" /></span>
                        </>}
                        {continues && i === items.length - 1 &&
                            <span aria-hidden className={`${lineArrow} -top-[32px] -right-2.5 hidden md:grid`} style={{ color }}><ChevronDown className="size-3.5" /></span>}
                        {continued && i === 0 &&
                            <span aria-hidden className={`${lineArrow} -top-[32px] -left-2.5 hidden md:grid`} style={{ color }}><CornerDownRight className="size-3.5" /></span>}
                        <div className={`surface flex h-full flex-col rounded-2xl transition duration-300 hover:-translate-y-1 hover:shadow-lg ${compact ? 'px-4 py-2.5' : 'px-4 py-3.5'}`}>
                            <span className="font-mono text-[11px]" style={{ color }}>{formatPeriod(lang, item.from, item.to, t('resume_present'))}</span>
                            <span className={`mt-1 leading-snug font-semibold ${compact ? 'text-sm' : ''}`}>{item.title[lang]}</span>
                            <span className={`text-muted leading-snug ${compact ? 'text-xs' : 'text-sm'}`}>{item.company}</span>
                            {item.note && <span className="text-muted text-xs">{item.note[lang]}</span>}
                            {item.summary && <p className="mt-1.5 text-sm leading-snug">{item.summary[lang]}</p>}
                            {item.tags.length > 0 && !compact &&
                                <ul className="mt-auto flex flex-wrap gap-1 pt-2.5">
                                    {item.tags.map(tag => <li key={tag} className="rounded-full bg-(--border) px-1.5 py-0.5 font-mono text-[10px]">{tag}</li>)}
                                </ul>}
                        </div>
                    </li>
                );
            })}
        </ol>
    );
}

function SectionTitle({ icon: Icon, tid, children }: { icon: typeof Briefcase, tid: 'resume_exp' | 'resume_edu', children?: React.ReactNode }) {
    const color = colorOf('/resume');
    return (
        <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-3 text-lg font-bold uppercase">
                <span className="grid size-9 place-items-center rounded-xl" style={{ background: `color-mix(in oklab, ${color} 22%, transparent)`, color }}>
                    <Icon className="size-4.5" />
                </span>
                <Text tid={tid} />
            </h2>
            {children}
        </div>
    );
}

export function Resume() {
    const [showOlder, setShowOlder] = useState(false);

    return (
        <>
            <Header title="header_resume" subtitle="header_resume_sub" url="/resume" />
            <div className="mx-auto max-w-6xl space-y-8 px-6 md:space-y-5 md:px-12">
                <section>
                    <SectionTitle icon={Briefcase} tid="resume_exp">
                        <button onClick={() => setShowOlder(s => !s)}
                            className="text-muted hidden md:inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold ring-1 ring-(--border) transition hover:text-(--text)">
                            <ChevronDown className={`size-3.5 transition-transform ${showOlder ? 'rotate-180' : ''}`} />
                            <Text tid={showOlder ? 'resume_less' : 'resume_older'} />{!showOlder && ` (${experience.length - RECENT})`}
                        </button>
                    </SectionTitle>
                    <Timeline items={experience.slice(0, RECENT)} continues={showOlder} />
                    <button onClick={() => setShowOlder(s => !s)}
                        className="text-muted mt-4 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-full py-2.5 text-xs font-semibold ring-1 ring-(--border) md:hidden">
                        <ChevronDown className={`size-3.5 transition-transform ${showOlder ? 'rotate-180' : ''}`} />
                        <Text tid={showOlder ? 'resume_less' : 'resume_older'} />{!showOlder && ` (${experience.length - RECENT})`}
                    </button>
                    {showOlder && <div className="mt-6 md:mt-7"><Timeline items={experience.slice(RECENT)} compact continued /></div>}
                </section>
                <section>
                    <SectionTitle icon={GraduationCap} tid="resume_edu" />
                    <Timeline items={education} compact offset={RECENT} />
                </section>
            </div>
        </>
    );
}
