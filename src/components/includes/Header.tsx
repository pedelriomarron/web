import type { LucideIcon } from 'lucide-react';
import { Text } from '../../containers/Language';
import type { TextId } from '../../languages';
import { navItems } from '../../nav';

interface IProps {
    title: TextId
    subtitle: TextId
    url: string
}

// Each section keeps its own color band, like in 2020
export default function Header({ title, subtitle, url }: IProps) {
    const { color, icon: Icon } = navItems.find(item => item.url === url) as { color: string, icon: LucideIcon };

    return (
        <header className="relative mb-12 overflow-hidden px-6 pt-20 pb-14 md:mb-5 md:px-12 md:pt-8 md:pb-6"
            style={{ background: `radial-gradient(120% 140% at 0% 0%, color-mix(in oklab, ${color} 55%, transparent), transparent 60%), radial-gradient(80% 120% at 100% 100%, color-mix(in oklab, ${color} 25%, transparent), transparent 70%)` }}>
            <Icon aria-hidden strokeWidth={1} className="pointer-events-none absolute -top-6 -right-6 size-56 opacity-15 md:size-48" style={{ color }} />
            <div className="relative mx-auto max-w-6xl">
                <div className="rise mb-4 md:mb-3 inline-flex items-center gap-2 rounded-full bg-(--surface)/70 px-3 py-1 font-mono text-xs ring-1 ring-(--border) backdrop-blur">
                    <span className="size-1.5 rounded-full" style={{ background: color }} />
                    ~{url}
                </div>
                <h1 className="rise text-4xl font-black tracking-tight uppercase sm:text-5xl md:text-6xl" style={{ '--i': 1 } as React.CSSProperties}>
                    <Text tid={title} />
                </h1>
                <p className="rise text-muted mt-4 max-w-2xl text-base md:mt-2" style={{ '--i': 2 } as React.CSSProperties}>
                    <Text tid={subtitle} />
                </p>
            </div>
        </header>
    );
}
