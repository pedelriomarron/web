import { useCallback, useEffect, useState, type PointerEvent } from 'react';

export function useTheme() {
    const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));

    useEffect(() => {
        document.documentElement.classList.toggle('dark', dark);
        try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch { /* ignore */ }
    }, [dark]);

    const toggle = useCallback(() => {
        const flip = () => setDark(d => !d);
        if (document.startViewTransition) document.startViewTransition(flip);
        else flip();
    }, []);

    return { dark, toggle };
}

// Feeds the cursor position to the .spotlight CSS effect
export function trackSpotlight(e: PointerEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
}
