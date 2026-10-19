import { useEffect, useRef } from 'react';

// Hand-rolled replacement for react-particles-js with the original params:
// white dots, linked under 150px, drifting at speed 2. Now they also reach for the cursor.
export default function Constellation({ className = "" }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;
        const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
        const LINK = 150;
        const mouse = { x: -9999, y: -9999 };
        let width = 0, height = 0, frame = 0;
        let dots: { x: number, y: number, vx: number, vy: number, r: number }[] = [];

        const resize = () => {
            const dpr = Math.min(devicePixelRatio, 2);
            width = canvas.clientWidth;
            height = canvas.clientHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            // ~180 particles per 700² area like the original density setting
            const count = Math.round((width * height) / 7000);
            dots = Array.from({ length: Math.min(count, 220) }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                r: Math.random() * 1.8 + 0.4,
            }));
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            for (const d of dots) {
                if (!reduced) {
                    d.x += d.vx;
                    d.y += d.vy;
                    if (d.x < -10) d.x = width + 10; else if (d.x > width + 10) d.x = -10;
                    if (d.y < -10) d.y = height + 10; else if (d.y > height + 10) d.y = -10;
                }
                ctx.beginPath();
                ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255,255,255,0.7)';
                ctx.fill();
            }
            for (let i = 0; i < dots.length; i++) {
                const a = dots[i];
                for (let j = i + 1; j < dots.length; j++) {
                    const b = dots[j];
                    const dist = Math.hypot(a.x - b.x, a.y - b.y);
                    if (dist < LINK) {
                        ctx.strokeStyle = `rgba(255,255,255,${0.35 * (1 - dist / LINK)})`;
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
                const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
                if (md < LINK * 1.4) {
                    ctx.strokeStyle = `rgba(255,255,255,${0.8 * (1 - md / (LINK * 1.4))})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
            if (!reduced) frame = requestAnimationFrame(draw);
        };

        const onMove = (e: PointerEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
            if (reduced) draw();
        };
        const onLeave = () => { mouse.x = mouse.y = -9999; };

        resize();
        draw();
        const ro = new ResizeObserver(() => { resize(); if (reduced) draw(); });
        ro.observe(canvas);
        const host = canvas.parentElement!;
        host.addEventListener('pointermove', onMove);
        host.addEventListener('pointerleave', onLeave);
        return () => {
            cancelAnimationFrame(frame);
            ro.disconnect();
            host.removeEventListener('pointermove', onMove);
            host.removeEventListener('pointerleave', onLeave);
        };
    }, []);

    return <canvas ref={canvasRef} aria-hidden className={"absolute inset-0 h-full w-full " + className} />;
}
