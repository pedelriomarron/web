import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Pause, Play } from 'lucide-react';
import { playSynthGroove } from '../../music';
import { navItems } from '../../nav';

const TRACK = { file: 'music/smooth-criminal.mp3', title: 'Smooth Criminal' };
const NOTES = ['♪', '♫', '♪', '♬'];

interface Note { id: number, char: string, color: string, y: number, drift: number, size: number }

export default function Cassette() {
    const [playing, setPlaying] = useState(false);
    const [title, setTitle] = useState(TRACK.title);
    const [notes, setNotes] = useState<Note[]>([]);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const stopSynthRef = useRef<(() => void) | null>(null);
    const ctxRef = useRef<AudioContext | null>(null);
    const reelsRef = useRef<SVGGElement>(null);
    const progress = useRef(0);
    const noteId = useRef(0);

    const emitNote = () => {
        const id = noteId.current++;
        const note: Note = {
            id,
            char: NOTES[id % NOTES.length],
            color: navItems[id % navItems.length].color,
            y: Math.random() * 16,
            drift: Math.random() * 50,
            size: 12 + Math.random() * 8,
        };
        setNotes(list => [...list.slice(-14), note]);
        setTimeout(() => setNotes(list => list.filter(n => n.id !== id)), 2600);
    };

    // Use the real song if it's in public/music, otherwise the synth groove
    const start = async () => {
        if (!audioRef.current) {
            const audio = new Audio(import.meta.env.BASE_URL + TRACK.file);
            audio.loop = true;
            const ok = await new Promise<boolean>(resolve => {
                audio.oncanplay = () => resolve(true);
                audio.onerror = () => resolve(false);
                audio.load();
            });
            audioRef.current = ok ? audio : null;
            if (!ok) setTitle('Remaster Groove ’26');
        }
        if (audioRef.current) {
            await audioRef.current.play();
        } else {
            ctxRef.current ??= new AudioContext();
            await ctxRef.current.resume();
            stopSynthRef.current = playSynthGroove(ctxRef.current, emitNote);
        }
        setPlaying(true);
    };

    const stop = () => {
        audioRef.current?.pause();
        stopSynthRef.current?.();
        stopSynthRef.current = null;
        setPlaying(false);
    };

    // Notes for the real song (the synth emits them on its beats) + tape moving between reels
    useEffect(() => {
        if (!playing) return;
        const timer = audioRef.current ? setInterval(emitNote, 520) : undefined;
        let frame = 0;
        const tick = () => {
            const audio = audioRef.current;
            progress.current = audio?.duration ? audio.currentTime / audio.duration : (progress.current + 0.0002) % 1;
            const [left, right] = reelsRef.current!.querySelectorAll<SVGCircleElement>('.tape');
            left.setAttribute('r', String(11 + 13 * (1 - progress.current)));
            right.setAttribute('r', String(11 + 13 * progress.current));
            frame = requestAnimationFrame(tick);
        };
        tick();
        return () => { clearInterval(timer); cancelAnimationFrame(frame); };
    }, [playing]);

    useEffect(() => () => { stop(); ctxRef.current?.close(); }, []);

    // On mobile the cassette lives in the top-right controls pill (slot rendered by Sidebar)
    const [slot, setSlot] = useState<HTMLElement | null>(null);
    useEffect(() => setSlot(document.getElementById('cassette-slot')), []);

    return (<>
        {slot && createPortal(
            <button onClick={playing ? stop : start} aria-label={playing ? 'Pause' : 'Play'} title={title}
                className={`grid size-9 shrink-0 cursor-pointer place-items-center rounded-full ring-1 transition ${playing ? 'bg-sky/15 text-sky ring-sky/40' : 'bg-white/5 text-white/70 ring-white/10'}`}>
                <svg viewBox="0 0 24 16" className="w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                    <rect x="1" y="1" width="22" height="14" rx="2.5" />
                    <path d="M7 15 L8.5 11.5 H15.5 L17 15" strokeWidth="1.2" />
                    {[8, 16].map(cx => (
                        <g key={cx} className="cassette-reel" style={{ animationPlayState: playing ? 'running' : 'paused' }}>
                            <circle cx={cx} cy="7" r="2.3" />
                            <path d={`M${cx} 4.7 V5.8`} strokeWidth="1.2" />
                        </g>
                    ))}
                </svg>
            </button>, slot)}
        <div className="fixed top-4 right-5 z-40 hidden md:block">
            {/* the notes fly out to the left, into the page */}
            <div aria-hidden className="pointer-events-none absolute top-3 right-1/2">
                {notes.map(note => (
                    <span key={note.id} className="cassette-note absolute font-bold"
                        style={{ color: note.color, fontSize: note.size, top: note.y, '--drift': `${note.drift}px` } as React.CSSProperties}>
                        {note.char}
                    </span>
                ))}
            </div>

            <button onClick={playing ? stop : start} aria-label={playing ? 'Pause' : 'Play'} title={title}
                className={`group relative block cursor-pointer rounded-lg transition-transform duration-500 ease-(--ease-spring) hover:scale-110 ${playing ? 'cassette-bob' : ''}`}>
                <svg viewBox="0 0 64 40" className="w-16 drop-shadow-[0_6px_14px_rgba(0,0,0,0.3)]" aria-hidden>
                    <defs>
                        <clipPath id="cassette-window"><rect x="15" y="11" width="34" height="16" rx="8" /></clipPath>
                    </defs>
                    <rect x="0.75" y="0.75" width="62.5" height="38.5" rx="5" fill="#0e1320" fillOpacity=".85" stroke="#fff" strokeOpacity=".18" strokeWidth="1.5" />
                    <rect x="8" y="5" width="48" height="1.5" rx=".75" fill={playing ? '#93d4ea' : '#fff'} fillOpacity={playing ? 1 : 0.25} className="transition-colors" />
                    <g ref={reelsRef} clipPath="url(#cassette-window)">
                        <circle className="tape" cx="24" cy="19" r="10" fill="#fff" fillOpacity=".12" />
                        <circle className="tape" cx="40" cy="19" r="5" fill="#fff" fillOpacity=".12" />
                        {[24, 40].map(cx => (
                            <g key={cx} className="cassette-reel" style={{ animationPlayState: playing ? 'running' : 'paused' }}>
                                <circle cx={cx} cy="19" r="3.6" fill="none" stroke="#fff" strokeWidth="1.2" />
                                {[0, 120, 240].map(a => (
                                    <rect key={a} x={cx - 0.5} y="15.4" width="1" height="2" fill="#fff" transform={`rotate(${a} ${cx} 19)`} />
                                ))}
                            </g>
                        ))}
                    </g>
                    <rect x="15" y="11" width="34" height="16" rx="8" fill="none" stroke="#fff" strokeOpacity=".3" />
                    <path d="M18 39 L21 32 H43 L46 39" fill="none" stroke="#fff" strokeOpacity=".18" strokeWidth="1.2" />
                </svg>
                <span className={`absolute -right-1.5 -bottom-1.5 grid size-5 place-items-center rounded-full bg-white text-ink shadow ring-1 ring-ink/20 transition ${playing ? 'scale-0 group-hover:scale-100' : ''}`}>
                    {playing ? <Pause className="size-2.5 fill-current" /> : <Play className="size-2.5 translate-x-px fill-current" />}
                </span>
            </button>
        </div>
    </>);
}
