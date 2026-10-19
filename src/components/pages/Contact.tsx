import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Mail, Phone } from 'lucide-react';
import Header from '../includes/Header';
import { Text } from '../../containers/Language';
import { social } from '../includes/Brands';
import { trackSpotlight } from '../../hooks';

const direct = [
    { name: "pedelriomarron@gmail.com", value: "pedelriomarron@gmail.com", url: "mailto:pedelriomarron@gmail.com", icon: Mail, color: "#f05252" },
    { name: "+34 622 86 11 62", value: "+34622861162", url: "tel:+34622861162", icon: Phone, color: "#facc15" },
]

function CopyButton({ value }: { value: string }) {
    const [copied, setCopied] = useState(false);
    const copy = async (e: React.MouseEvent) => {
        e.preventDefault();
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
    };
    return (
        <button onClick={copy} aria-label="Copy" className="text-muted relative z-10 inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-(--border) transition hover:text-(--text)">
            {copied ? <Check className="size-3.5 text-green-500" /> : <Copy className="size-3.5" />}
            <span className="hidden sm:inline"><Text tid={copied ? "contact_copied" : "contact_copy"} /></span>
        </button>
    );
}

export function Contact() {
    return (
        <>
            <Header title="header_contact" subtitle="header_contact_sub" url="/contact" />
            <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] gap-10 px-6 md:px-12 lg:grid-cols-2">
                <section>
                    <h2 className="text-muted mb-4 font-mono text-xs tracking-[0.3em] uppercase"><Text tid="contact_direct" /></h2>
                    <div className="grid grid-cols-[minmax(0,1fr)] gap-3">
                        {direct.map(({ name, value, url, icon: Icon, color }, i) => (
                            <a key={url} href={url} onPointerMove={trackSpotlight}
                                style={{ '--accent': color, '--i': i } as React.CSSProperties}
                                className="spotlight surface rise group flex items-center gap-3 rounded-2xl p-4 transition hover:-translate-y-0.5 sm:gap-4 sm:p-5">
                                <span className="grid size-10 shrink-0 place-items-center rounded-xl sm:size-12" style={{ background: `color-mix(in oklab, ${color} 18%, transparent)`, color }}>
                                    <Icon className="size-5" />
                                </span>
                                <span className="min-w-0 flex-1 text-sm font-semibold break-all sm:text-base sm:break-normal">{name}</span>
                                <CopyButton value={value} />
                            </a>
                        ))}
                    </div>
                </section>
                <section>
                    <h2 className="text-muted mb-4 font-mono text-xs tracking-[0.3em] uppercase"><Text tid="contact_social" /></h2>
                    <div className="grid grid-cols-[minmax(0,1fr)] gap-3">
                        {social.slice(0, 2).map(({ name, href, icon: Icon, color }, i) => (
                            <a key={name} href={href} target="_blank" rel="noopener noreferrer" onPointerMove={trackSpotlight}
                                style={{ '--accent': color, '--i': i + 2 } as React.CSSProperties}
                                className="spotlight surface rise group flex items-center gap-4 rounded-2xl p-5 transition hover:-translate-y-0.5">
                                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-(--border)">
                                    <Icon className="size-5" />
                                </span>
                                <span className="flex-1">
                                    <span className="block font-semibold">{name}</span>
                                    <span className="text-muted font-mono text-xs">@pedelriomarron</span>
                                </span>
                                <ArrowUpRight className="text-muted size-5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </a>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}
