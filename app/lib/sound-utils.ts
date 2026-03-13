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
        if (!this.enabled) return;
        try {
            const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
            this.audioContext = new AudioContextClass();
        } catch {
            this.enabled = false;
        }
    }

    playSound(name: SoundName, volume: number = 0.3): void {
        if (!this.enabled || !this.audioContext || this.audioContext.state === 'suspended') {
            return;
        }

        try {
            const ctx = this.audioContext;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            const now = ctx.currentTime;
            
            // Generate synthetic sounds to avoid missing file errors
            // -------------------------------------------------------------
            // PROFILE 1: 'DIGITAL' (Modern & Crisp) - ACTIVE
            // -------------------------------------------------------------
            if (name === 'click') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(600, now);
                osc.frequency.exponentialRampToValueAtTime(300, now + 0.1);
                gain.gain.setValueAtTime(volume, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
            } else if (name === 'hover') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(400, now);
                gain.gain.setValueAtTime(volume * 0.5, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
                osc.start(now);
                osc.stop(now + 0.05);
            } else if (name === 'theme-switch') {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(300, now);
                osc.frequency.linearRampToValueAtTime(600, now + 0.2);
                gain.gain.setValueAtTime(0, now);
                gain.gain.linearRampToValueAtTime(volume, now + 0.1);
                gain.gain.linearRampToValueAtTime(0, now + 0.3);
                osc.start(now);
                osc.stop(now + 0.3);
            }

            // -------------------------------------------------------------
            // PROFILE 2: 'ANALOG' (Warm & Deep) - INACTIVE
            // To use, comment out Profile 1 and uncomment this section.
            // -------------------------------------------------------------
            /*
            if (name === 'click') {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(400, now);
                osc.frequency.exponentialRampToValueAtTime(100, now + 0.15);
                gain.gain.setValueAtTime(volume * 1.5, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
                osc.start(now);
                osc.stop(now + 0.15);
            } else if (name === 'hover') {
                osc.type = 'square';
                osc.frequency.setValueAtTime(150, now);
                gain.gain.setValueAtTime(volume * 0.2, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
                osc.start(now);
                osc.stop(now + 0.08);
            } else if (name === 'theme-switch') {
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(100, now);
                osc.frequency.linearRampToValueAtTime(200, now + 0.3);
                gain.gain.setValueAtTime(0, now);
                gain.gain.linearRampToValueAtTime(volume * 0.8, now + 0.15);
                gain.gain.linearRampToValueAtTime(0, now + 0.4);
                osc.start(now);
                osc.stop(now + 0.4);
            }
            */

            // -------------------------------------------------------------
            // PROFILE 3: 'GLASS' (High & Resonant) - INACTIVE
            // To use, comment out Profile 1 and uncomment this section.
            // -------------------------------------------------------------
            /*
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
            */
        } catch {
            // Silently fail if synthesis errors
        }
    }

    async enable(): Promise<void> {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            await this.audioContext.resume();
            this.enabled = true;
        }
    }

    disable(): void {
        this.enabled = false;
    }
}

export const soundManager = SoundManager.getInstance();