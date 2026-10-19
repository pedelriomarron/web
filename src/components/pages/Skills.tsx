import Header from '../includes/Header';
import { Text } from '../../containers/Language';
import type { TextId } from '../../languages';
import { trackSpotlight } from '../../hooks';

const skills: { title: string, img: string, label: TextId, items: string[], color: string }[] = [
    { title: "JavaScript", img: "javascript.svg", label: "skills_frameworks", items: ["Angular", "React"], color: "#f7df1e" },
    { title: "PHP", img: "php.svg", label: "skills_frameworks", items: ["Symfony", "Laravel"], color: "#8892bf" },
    { title: "Node.js", img: "nodejs.svg", label: "skills_frameworks", items: ["Express.js"], color: "#83cd29" },
    { title: "Database", img: "database.svg", label: "skills_systems", items: ["MySQL", "MongoDB"], color: "#f29111" },
    { title: "Java", img: "java.svg", label: "skills_tech", items: ["JSP"], color: "#e76f00" },
    { title: "CSS", img: "css-3.svg", label: "skills_frameworks", items: ["Bootstrap", "TailwindCSS", "Materialize"], color: "#2965f1" },
    { title: "Linux", img: "linux-tux.svg", label: "skills_services", items: ["Apache", "Bind", "Samba", "FTP"], color: "#fcc624" },
    { title: "Python", img: "python.svg", label: "skills_frameworks", items: ["Django"], color: "#3776ab" },
    { title: "Windows", img: "windows.svg", label: "skills_services", items: ["IIS", "Active Directory"], color: "#00adef" },
]

export function Skills() {
    return (
        <>
            <Header title="header_skills" subtitle="header_skills_sub" url="/skills" />
            <section className="mx-auto max-w-6xl px-6 md:px-12">
                <h2 className="text-muted mb-6 md:mb-4 font-mono text-xs tracking-[0.3em] uppercase"><Text tid="skills_title" /></h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-3">
                    {skills.map((item, i) => (
                        <article key={item.title} onPointerMove={trackSpotlight}
                            style={{ '--accent': item.color, '--i': i } as React.CSSProperties}
                            className="spotlight surface rise group rounded-3xl p-6 md:p-5 transition-transform duration-500 ease-(--ease-spring) hover:-translate-y-1.5">
                            <div className="flex items-center gap-4">
                                <span className="grid size-14 md:size-12 place-items-center rounded-2xl bg-(--accent)/10 transition-transform duration-500 ease-(--ease-spring) group-hover:scale-110 group-hover:-rotate-6">
                                    <img alt="" className="size-8 md:size-7 object-contain" src={import.meta.env.BASE_URL + 'skills/' + item.img} />
                                </span>
                                <div>
                                    <h3 className="text-lg font-bold">{item.title}</h3>
                                    <div className="text-muted text-xs font-medium tracking-wide uppercase"><Text tid={item.label} /></div>
                                </div>
                            </div>
                            <ul className="mt-5 flex flex-wrap gap-1.5 md:mt-3">
                                {item.items.map(name => (
                                    <li key={name} className="rounded-full bg-(--border) px-3 py-1 font-mono text-xs">{name}</li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </section>
        </>
    );
}
