// Utility for tactile haptic feedback (Physical vibration + subtle Web Audio micro-feedback)

let audioCtx = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

// Gentle synthetic micro-click for desktop (simulating trackpad/taptic engine click)
function playTactileTick(type = 'light') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';

    if (type === 'light' || type === 'selection') {
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.02);
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.02);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.02);
    } else if (type === 'medium') {
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.03);
      gain.gain.setValueAtTime(0.025, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } else if (type === 'success') {
      // Pleasant double micro-pulse
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.06);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'error') {
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(140, now + 0.08);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    }
  } catch {
    // Audio feedback silently ignored if blocked or unsupported
  }
}

/**
 * Trigger physical haptic feedback (navigator.vibrate) and subtle tactile feedback
 * @param {'light' | 'medium' | 'heavy' | 'selection' | 'success' | 'error'} type
 */
export function triggerHaptic(type = 'light') {
  if (typeof window === 'undefined') return;

  // 1. Hardware vibration API
  if (navigator && typeof navigator.vibrate === 'function') {
    try {
      switch (type) {
        case 'selection':
        case 'light':
          navigator.vibrate(10);
          break;
        case 'medium':
          navigator.vibrate(22);
          break;
        case 'heavy':
          navigator.vibrate(38);
          break;
        case 'success':
          navigator.vibrate([15, 30, 20]);
          break;
        case 'error':
          navigator.vibrate([30, 40, 30, 40]);
          break;
        default:
          navigator.vibrate(15);
      }
    } catch {
      // Ignore vibration errors
    }
  }

  // 2. Tactile audio tick (desktop & mobile)
  playTactileTick(type);
}
