import { useEffect, useState } from 'react';

const SAFFRON = '#F28C28';
const GREEN = '#138A4B';
const NAVY = '#123B66';

const steps = [
  { id: 'namaste', deva: 'नमस्ते', sub: null },
  { id: 'vande', deva: 'वन्दे मातरम्', sub: null },
  { id: 'brand', deva: null, sub: 'AI-Powered Maintenance Block Planning' },
  { id: 'tagline', deva: null, sub: 'Plan smarter. Maintain safer. Keep trains moving.' },
  { id: 'railway', deva: null, sub: null },
];

interface Props {
  onComplete: () => void;
}

export default function WelcomeAnimation({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const [trainPos, setTrainPos] = useState(0);

  useEffect(() => {
    // Fade in first step
    const t0 = setTimeout(() => setVisible(true), 80);

    // Advance steps with fade transitions
    const stepTimings = [1000, 1800, 2600, 3300, 4000, 5000];

    const advance = (nextStep: number, delay: number) =>
      setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          setStep(nextStep);
          setVisible(true);
        }, 350);
      }, delay);

    const t1 = advance(1, stepTimings[0]);
    const t2 = advance(2, stepTimings[1]);
    const t3 = advance(3, stepTimings[2]);
    const t4 = advance(4, stepTimings[3]);

    // Railway step: animate train
    const t5 = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        setStep(4);
        setVisible(true);
        let pos = 0;
        const interval = setInterval(() => {
          pos += 2.5;
          setTrainPos(pos);
          if (pos >= 100) {
            clearInterval(interval);
            setTimeout(onComplete, 400);
          }
        }, 20);
      }, 350);
    }, stepTimings[4]);

    return () => [t0, t1, t2, t3, t4, t5].forEach(clearTimeout);
  }, [onComplete]);

  const current = steps[step];

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{ background: '#FDFAF6' }}
    >
      <div
        className="flex flex-col items-center gap-6 transition-all duration-500"
        style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(12px)' }}
      >
        {/* Step 0 & 1: Devanagari */}
        {(step === 0 || step === 1) && (
          <div className="text-center">
            <p
              className="font-deva text-6xl md:text-7xl font-light tracking-wide"
              style={{ color: NAVY, lineHeight: 1.3 }}
            >
              {current.deva}
            </p>
            {/* Tricolor accent */}
            {step === 0 && (
              <div
                className="flex mt-5 mx-auto rounded-full overflow-hidden h-0.5 transition-all duration-700"
                style={{ width: visible ? '120px' : '0px' }}
              >
                <div className="flex-1" style={{ background: SAFFRON }} />
                <div className="flex-1 bg-white" />
                <div className="flex-1" style={{ background: GREEN }} />
              </div>
            )}
          </div>
        )}

        {/* Step 2: Brand */}
        {step === 2 && (
          <div className="text-center space-y-3">
            <p
              className="text-5xl md:text-6xl font-black tracking-widest"
              style={{ color: NAVY, letterSpacing: '0.15em' }}
            >
              TRACKSYNC
            </p>
            <div className="flex mx-auto rounded-full overflow-hidden h-0.5" style={{ width: '80px' }}>
              <div className="flex-1" style={{ background: SAFFRON }} />
              <div className="flex-1 bg-slate-200" />
              <div className="flex-1" style={{ background: GREEN }} />
            </div>
            <p className="text-base text-slate-500 font-medium tracking-wide">{current.sub}</p>
          </div>
        )}

        {/* Step 3: Tagline */}
        {step === 3 && (
          <p
            className="text-2xl md:text-3xl font-light text-center max-w-lg"
            style={{ color: '#2D3748', lineHeight: 1.5 }}
          >
            {current.sub}
          </p>
        )}

        {/* Step 4: Railway animation */}
        {step === 4 && (
          <div className="flex flex-col items-center gap-8 w-full max-w-2xl px-8">
            <p
              className="text-3xl font-black tracking-widest"
              style={{ color: NAVY, letterSpacing: '0.15em' }}
            >
              TRACKSYNC
            </p>
            {/* Track */}
            <div className="relative w-full" style={{ height: '60px' }}>
              {/* Stations */}
              <div className="absolute inset-0 flex items-center">
                {['A', 'B', 'C', 'D'].map((s, i) => (
                  <div key={s} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center gap-1 z-10">
                      <div
                        className="w-3 h-3 rounded-full bg-white border-2"
                        style={{ borderColor: NAVY }}
                      />
                      <span className="text-xs font-bold font-mono" style={{ color: NAVY }}>
                        {s}
                      </span>
                    </div>
                    {i < 3 && (
                      <div className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full"
                          style={{ height: '3px', background: NAVY + '30' }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {/* Animated train */}
              <div
                className="absolute top-1/2 -translate-y-1/2 z-20 transition-none"
                style={{ left: `${Math.min(trainPos, 95)}%`, transform: 'translateX(-50%) translateY(-50%)' }}
              >
                <div
                  className="px-2 py-0.5 rounded text-[10px] font-bold text-white shadow-lg"
                  style={{ background: NAVY }}
                >
                  ▶
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Progress dots */}
      <div className="absolute bottom-12 flex gap-2">
        {steps.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === step ? '20px' : '6px',
              height: '6px',
              background: i === step ? NAVY : '#D1D5DB',
            }}
          />
        ))}
      </div>
    </div>
  );
}
