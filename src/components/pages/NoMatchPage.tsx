import { NavLink } from 'react-router';
import { RotateCcw } from 'lucide-react';
import Constellation from '../includes/Constellation';
import { Text } from '../../containers/Language';

// A tiny "game over" screen as the 404
export const NoMatchPage = () => (
    <section className="relative isolate grid min-h-[80dvh] md:min-h-[calc(100dvh-9rem)] place-items-center overflow-hidden bg-ink px-6 text-center text-white">
        <Constellation className="-z-10 opacity-40" />
        <div>
            <p className="font-mono text-sm tracking-[0.4em] text-sky">GAME OVER</p>
            <h1 className="mt-2 bg-linear-to-b from-white to-white/30 bg-clip-text text-[9rem] leading-none font-black tracking-tighter text-transparent md:text-[14rem]">404</h1>
            <h2 className="text-2xl font-bold"><Text tid="notfound_title" /></h2>
            <p className="mx-auto mt-2 max-w-md text-white/60"><Text tid="notfound_sub" /></p>
            <NavLink to="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-ink uppercase transition hover:-translate-y-0.5">
                <RotateCcw className="size-4" /> <Text tid="notfound_btn" /> <span className="caret">_</span>
            </NavLink>
        </div>
    </section>
);
