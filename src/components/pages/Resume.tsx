import { Briefcase, GraduationCap } from 'lucide-react';
import Header from '../includes/Header';
import { Text } from '../../containers/Language';
import type { TextId } from '../../languages';
import { colorOf } from '../../nav';

interface TimelineItem { title: TextId, from: string, to: string | null, place: string }

const dataTimeline = [
    {
        name: "resume_edu",
        icon: GraduationCap,
        items: [
            { title: "resume_web", from: "2018", to: null, place: "IES Marqués de Comares & IES Trassierra" },
            { title: "resume_sysadmin", from: "2016", to: "2018", place: "IES Marqués de Comares" },
            { title: "resume_networks", from: "2014", to: "2016", place: "CES Lope de Vega SCA" },
        ] as TimelineItem[]
    },
    {
        name: "resume_exp",
        icon: Briefcase,
        items: [
            { title: "resume_intern_web", from: "04/2018", to: "06/2018", place: "Eurotransportcar" },
            { title: "resume_intern_it", from: "03/2016", to: "05/2016", place: "PC-ON Córdoba" },
        ] as TimelineItem[]
    }
] as const

export function Resume() {
    const color = colorOf('/resume');

    return (
        <>
            <Header title="header_resume" subtitle="header_resume_sub" url="/resume" />
            <div className="mx-auto grid max-w-6xl gap-10 px-6 md:px-12 lg:grid-cols-2">
                {dataTimeline.map(({ name, icon: Icon, items }, j) => (
                    <section key={name}>
                        <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold uppercase md:mb-5 md:text-xl">
                            <span className="grid size-11 place-items-center rounded-xl" style={{ background: `color-mix(in oklab, ${color} 22%, transparent)`, color }}>
                                <Icon className="size-5" />
                            </span>
                            <Text tid={name} />
                        </h2>
                        <ol className="relative ml-5 border-l-2 border-dashed border-(--border) pl-8">
                            {items.map((item, i) => (
                                <li key={item.title} className="rise relative mb-5 md:mb-3" style={{ '--i': i + j * 3 } as React.CSSProperties}>
                                    <span aria-hidden className="absolute top-6 md:top-5 -left-[41px] size-4 rounded-full ring-4 ring-(--bg)"
                                        style={{ background: item.to ? 'var(--muted)' : color, boxShadow: item.to ? undefined : `0 0 16px ${color}` }} />
                                    <div className="surface rounded-2xl p-5 md:px-5 md:py-3.5 transition duration-300 hover:translate-x-1 hover:shadow-lg">
                                        <div className="font-mono text-xs" style={{ color }}>
                                            {item.from} — {item.to ?? <Text tid="resume_present" />}
                                        </div>
                                        <div className="mt-1.5 text-lg font-semibold"><Text tid={item.title} /></div>
                                        <div className="text-muted text-sm">{item.place}</div>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </section>
                ))}
            </div>
        </>
    );
}
