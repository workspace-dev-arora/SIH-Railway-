import { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';

const NAVY = '#123B66';
const DEEP = '#0B2545';
const BLUE = '#1769AA';
const SAFFRON = '#F28C28';
const GREEN = '#138A4B';

interface Props {
  role: string;
  onComplete: () => void;
}

export default function PostLoginTransition({ role, onComplete }: Props) {
  const { user } = useApp();
  const [line1, setLine1] = useState(false);
  const [line2, setLine2] = useState(false);
  const [trainPos, setTrainPos] = useState(0);
  const [trackVisible, setTrackVisible] = useState(false);

  useEffect(() => {
    const t0 = setTimeout(() => setLine1(true), 200);
    const t1 = setTimeout(() => setLine2(true), 750);
    const t2 = setTimeout(() => setTrackVisible(true), 1200);

    // Animate train across
    let pos = 0;
    let interval: ReturnType<typeof setInterval>;
    const t3 = setTimeout(() => {
      interval = setInterval(() => {
        pos += 4;
        setTrainPos(pos);
        if (pos >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 200);
        }
      }, 16);
    }, 1250);

    return () => {
      [t0, t1, t2, t3].forEach(clearTimeout);
      clearInterval(interval);
    };
  }, [onComplete]);

  const displayName = user?.name || user?.employeeId || (role === 'Block Planner' ? 'Planner' : role);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{ background: '#FDFAF6' }}
    >
      {/* Tricolor top line */}
      <div className="absolute top-0 left-0 right-0 flex" style={{ height: '2px' }}>
        <div className="flex-1" style={{ background: SAFFRON }} />
        <div className="flex-1" style={{ background: '#E2E8F0' }} />
        <div className="flex-1" style={{ background: GREEN }} />
      </div>

      {/* Brand mark */}
      <div className="flex items-center gap-2.5 mb-10">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${DEEP}, ${BLUE})` }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </div>
        <span className="font-black text-sm tracking-widest" style={{ color: NAVY }}>TRACKSYNC</span>
      </div>

      {/* Text */}
      <div className="text-center space-y-3 mb-10 px-4">
        <p
          className="text-2xl sm:text-3xl font-bold transition-all duration-500"
          style={{
            color: NAVY,
            opacity: line1 ? 1 : 0,
            transform: line1 ? 'translateY(0)' : 'translateY(8px)',
          }}
        >
          Welcome back, {displayName}.
        </p>
        <p
          className="text-sm sm:text-base font-normal transition-all duration-500"
          style={{
            color: '#64748B',
            opacity: line2 ? 1 : 0,
            transform: line2 ? 'translateY(0)' : 'translateY(8px)',
          }}
        >
          Central Division railway operations & maintenance schedule is live.
        </p>
      </div>

      {/* Railway animation */}
      <div
        className="relative transition-all duration-500"
        style={{ width: '320px', opacity: trackVisible ? 1 : 0 }}
      >
        {/* Stations */}
        <div className="flex items-center justify-between">
          {['A', 'B', 'C', 'D'].map((s) => (
            <div key={s} className="flex flex-col items-center gap-1 z-10 relative">
              <div
                className="w-2.5 h-2.5 rounded-full bg-white border-2"
                style={{ borderColor: NAVY }}
              />
              <span className="text-[10px] font-bold font-mono" style={{ color: '#94A3B8' }}>{s}</span>
            </div>
          ))}
        </div>
        {/* Track line */}
        <div
          className="absolute left-0 right-0"
          style={{ top: '5px', height: '2px', background: '#E2E8F0', zIndex: 0 }}
        />
        {/* Train dot */}
        <div
          className="absolute z-20 transition-none"
          style={{
            top: '1px',
            left: `${Math.min(trainPos, 97)}%`,
            transform: 'translateX(-50%)',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${DEEP}, ${BLUE})`,
            boxShadow: `0 0 8px ${BLUE}60`,
          }}
        />
      </div>
    </div>
  );
}
