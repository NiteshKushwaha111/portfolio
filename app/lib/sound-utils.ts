// lib/sound-utils.ts

type SoundName = 'theme-switch' | 'hover' | 'click';

export class SoundManager {
    private static instance: SoundManager;
    private audioContext: AudioContext | null = null;
    private enabled: boolean = true;

    private constructor() { }

    static getInstance(): SoundManager {
        if (!SoundManager.instance) {
            SoundManager.instance = new SoundManager();
        }
        return SoundManager.instance;
    }

    async init(): Promise<void> {
        try {
            if (!this.audioContext) {
                const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
                this.audioContext = new AudioContextClass();
            }
            if (this.audioContext.state === 'suspended') {
                await this.audioContext.resume();
            }
            this.enabled = true;
        } catch {
            this.enabled = false;
        }
    }

    playSound(name: SoundName, volume: number = 0.3): void {
        if (!this.enabled) return;

        // Auto-initialize if context doesn't exist yet
        if (!this.audioContext) {
            this.init();
            return;
        }

        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume().catch(() => {});
        }

        try {
            const ctx = this.audioContext;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            const now = ctx.currentTime;

            if (name === 'click') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(1200, now);
                osc.frequency.exponentialRampToValueAtTime(1800, now + 0.05);
                gain.gain.setValueAtTime(volume * 0.8, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
                osc.start(now);
                osc.stop(now + 0.05);
            } else if (name === 'hover') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(2000, now);
                gain.gain.setValueAtTime(volume * 0.3, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
                osc.start(now);
                osc.stop(now + 0.03);
            } else if (name === 'theme-switch') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(800, now);
                osc.frequency.exponentialRampToValueAtTime(2400, now + 0.2);
                gain.gain.setValueAtTime(0, now);
                gain.gain.linearRampToValueAtTime(volume * 0.5, now + 0.1);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
                osc.start(now);
                osc.stop(now + 0.3);
            }
        } catch {
            // Silently handle synthesis edge-cases
        }
    }

    async enable(): Promise<void> {
        this.enabled = true;
        if (!this.audioContext) {
            await this.init();
        } else if (this.audioContext.state === 'suspended') {
            await this.audioContext.resume();
        }
    }

    disable(): void {
        this.enabled = false;
    }
}

export const soundManager = SoundManager.getInstance();