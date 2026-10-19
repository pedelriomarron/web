// Tiny 80s-style groove synthesized with WebAudio (original pattern), used when
// there is no audio file in public/music. Returns a stop function.
export function playSynthGroove(ctx: AudioContext, onBeat: () => void) {
    const BPM = 112;
    const step = 60 / BPM / 4; // 16th notes
    const master = ctx.createGain();
    master.gain.value = 0.35;
    master.connect(ctx.destination);

    const midi = (n: number) => 440 * Math.pow(2, (n - 69) / 12);
    // E minor bassline, 16 steps x 2 bars
    const bass = [40, 0, 40, 52, 0, 50, 0, 47, 43, 0, 43, 55, 0, 45, 47, 50,
        40, 0, 40, 52, 0, 50, 0, 47, 45, 0, 45, 57, 0, 47, 50, 52];
    const chords = [[64, 67, 71], [62, 66, 69]];

    const tone = (freq: number, time: number, dur: number, type: OscillatorType, vol: number, cutoff = 2000) => {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(cutoff, time);
        filter.frequency.exponentialRampToValueAtTime(cutoff / 4, time + dur);
        gain.gain.setValueAtTime(vol, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + dur);
        osc.connect(filter).connect(gain).connect(master);
        osc.start(time);
        osc.stop(time + dur + 0.02);
    };

    const noise = (time: number, dur: number, vol: number, hp: number) => {
        const buffer = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
        const src = ctx.createBufferSource();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();
        src.buffer = buffer;
        filter.type = 'highpass';
        filter.frequency.value = hp;
        gain.gain.setValueAtTime(vol, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + dur);
        src.connect(filter).connect(gain).connect(master);
        src.start(time);
    };

    const kick = (time: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(140, time);
        osc.frequency.exponentialRampToValueAtTime(40, time + 0.15);
        gain.gain.setValueAtTime(0.9, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);
        osc.connect(gain).connect(master);
        osc.start(time);
        osc.stop(time + 0.3);
    };

    let n = 0;
    let next = ctx.currentTime + 0.05;
    const schedule = () => {
        while (next < ctx.currentTime + 0.12) {
            const s = n % 32;
            if (bass[s]) tone(midi(bass[s]), next, step * 1.6, 'sawtooth', 0.32, 900);
            if (s % 8 === 0 || s === 10 || s === 26) kick(next);
            if (s % 8 === 4) noise(next, 0.18, 0.5, 1200);
            if (s % 2 === 0) noise(next, 0.04, 0.12, 7000);
            if (s % 8 === 6) chords[Math.floor(s / 16)].forEach(c => tone(midi(c), next, step * 2, 'square', 0.05, 3000));
            if (s % 4 === 0) setTimeout(onBeat, (next - ctx.currentTime) * 1000);
            next += step;
            n++;
        }
    };
    const timer = setInterval(schedule, 25);
    schedule();

    return () => {
        clearInterval(timer);
        master.gain.setTargetAtTime(0, ctx.currentTime, 0.05);
        setTimeout(() => master.disconnect(), 300);
    };
}
