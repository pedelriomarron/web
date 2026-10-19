import { Heart } from 'lucide-react';
import { Text } from '../../containers/Language';
import { social } from './Brands';

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="skew-footer mt-24 bg-ink pt-28 pb-28 text-white md:mt-8 md:pt-12 md:pb-4 dark:bg-[#05070c]">
            <div className="md:mx-auto md:flex md:max-w-6xl md:items-center md:justify-between md:px-12">
                <div className="flex justify-center gap-2">
                    {social.map(({ name, href, icon: Icon, color }) => (
                        <a key={name} aria-label={name} rel="noopener noreferrer" target="_blank" href={href}
                            style={{ '--c': color } as React.CSSProperties}
                            className="grid size-12 place-items-center rounded-2xl text-white/50 ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:text-(--c) hover:ring-(--c)/50 hover:shadow-[0_8px_30px_-8px_var(--c)] md:size-9 md:rounded-xl">
                            <Icon className="size-5 md:size-4" />
                        </a>
                    ))}
                </div>
                <div className="mt-8 space-y-1 text-center text-sm text-white/50 md:mt-0 md:flex md:gap-3 md:space-y-0 md:text-xs">
                    <hr className="mx-auto mb-6 w-1/4 border-white/10 md:hidden" />
                    <div>Copyright © {year} | <Text tid="footer_rights" /></div>
                    <span className="hidden text-white/20 md:inline">·</span>
                    <div><Text tid="footer_made" /> <Heart className="inline size-3.5 fill-red-500 text-red-500" /> <Text tid="footer_by" /></div>
                </div>
                <div className="mt-1 text-center font-mono text-xs text-white/30 md:mt-0">v. 2.0.0 <span className="text-sky">· remastered</span></div>
            </div>
        </footer>
    );
}
