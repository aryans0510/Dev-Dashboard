import React, { useEffect, useState } from 'react';

const LETTERS_ARYAN = [
  { char: 'A', color: 'from-blue-400 to-purple-500' },
  { char: 'r', color: 'from-purple-500 to-indigo-600' },
  { char: 'Y', color: 'from-indigo-600 to-blue-500' },
  { char: 'a', color: 'from-blue-500 to-cyan-400' },
  { char: 'N', color: 'from-cyan-400 to-blue-400' },
];
const LETTERS_WORLD = [
  { char: 'W', color: 'from-gray-300 to-gray-100' },
  { char: 'o', color: 'from-gray-200 to-white' },
  { char: 'r', color: 'from-white to-gray-200' },
  { char: 'l', color: 'from-gray-200 to-gray-300' },
  { char: 'd', color: 'from-gray-300 to-gray-400' },
];

function randomTransform(depth = 400) {
  const x = Math.random() * 1000 - 500;
  const y = Math.random() * 600 - 300;
  const z = Math.random() * depth - depth / 2;
  const r = Math.random() * 180 - 90;
  return `translate3d(${x}px,${y}px,${z}px) rotate(${r}deg)`;
}

export default function WelcomeAnimation({ onFinish }) {
  // 0: ArYaN fly-in, 1: snap, 2: World fly-in, 3: morph, 4: space zoom, 5: done
  const [phase, setPhase] = useState(0);
  const [aryanTransforms, setAryanTransforms] = useState(LETTERS_ARYAN.map(() => randomTransform()));
  const [worldTransforms, setWorldTransforms] = useState(LETTERS_WORLD.map(() => randomTransform()));

  useEffect(() => {
    // Animation timeline
    const timers = [
      setTimeout(() => setPhase(1), 1200),      // Snap ArYaN
      setTimeout(() => setPhase(2), 2800),     // World fly-in
      setTimeout(() => setPhase(3), 4200),     // Morph effect
      setTimeout(() => setPhase(4), 5200),     // Space zoom
      setTimeout(() => setPhase(5), 7200),     // Fade out and finish (2s for zoom)
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (phase === 1) setAryanTransforms(LETTERS_ARYAN.map(() => 'none'));
    if (phase === 2) setWorldTransforms(LETTERS_WORLD.map(() => 'none'));
    if (phase === 5 && onFinish) onFinish();
  }, [phase, onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none select-none transition-opacity duration-1000
        ${phase === 5 ? 'opacity-0' : 'opacity-100'}
        ${phase === 4 ? 'bg-black' : 'bg-gradient-to-br from-gray-900 via-black to-gray-800'}`}
      style={{ transition: 'opacity 1s cubic-bezier(.4,0,.2,1)' }}
    >
      {/* Subtle starfield for space effect */}
      {phase === 4 && <Starfield />}
      {/* Elegant background pattern (hidden during space zoom) */}
      {phase < 4 && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-shimmer"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/10 to-transparent animate-shimmer" style={{animationDelay: '0.5s'}}></div>
        </div>
      )}
      <div
        className={`flex flex-col items-center justify-center w-full h-full relative transition-transform duration-[900ms] ease-in-out
          ${phase === 4 ? 'animate-zoom-space' : ''}`}
        style={{
          zIndex: 2,
        }}
      >
        {/* Welcome to */}
        <div className={`text-2xl md:text-3xl font-light text-gray-300 mb-4 transition-all duration-1000 ${phase >= 2 ? 'animate-fade-in-up' : ''}`}
          style={{ 
            opacity: phase >= 2 ? 1 : 0, 
            transform: phase >= 2 ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '0.3s' 
          }}>
          Welcome to
        </div>
        {/* ArYaN letters */}
        <div className="flex space-x-1 mb-4">
          {LETTERS_ARYAN.map((l, i) => (
            <span
              key={i}
              className={`text-6xl md:text-7xl font-black drop-shadow-2xl bg-clip-text text-transparent bg-gradient-to-br ${l.color} transition-all duration-1000 ease-out ${phase >= 1 ? 'animate-float' : ''} ${phase === 0 ? 'motion-trail' : ''}`}
              style={{
                transform: phase === 0 ? aryanTransforms[i] : 'none',
                opacity: phase === 0 && phase < 1 ? 0.7 : 1,
                filter: phase >= 1 ? 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))' : '',
                transitionDelay: `${i * 0.1}s`,
                animationDelay: `${i * 0.1}s`,
                zIndex: 2,
              }}
            >
              {l.char}
            </span>
          ))}
        </div>
        {/* World letters */}
        <div className="flex space-x-1 mb-6 h-16">
          {LETTERS_WORLD.map((l, i) => (
            <span
              key={i}
              className={`text-4xl md:text-5xl font-bold drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-br ${l.color} transition-all duration-1000 ease-out ${phase === 2 ? 'animate-scale-in' : ''}`}
              style={{
                transform: phase < 2 ? worldTransforms[i] : 'none',
                opacity: phase < 2 ? 0.7 : 1,
                filter: phase >= 2 ? 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))' : '',
                transitionDelay: `${i * 0.08}s`,
                zIndex: 2,
              }}
            >
              {l.char}
            </span>
          ))}
        </div>
        {/* Elegant morphing effect */}
        {phase === 3 && <MorphingEffect />}
        {/* Subtle glow rings */}
        {phase >= 3 && phase < 4 && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-blue-500/20 rounded-full animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-purple-500/20 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }
        @keyframes motionTrail {
          0% { filter: blur(4px) brightness(1.2); opacity: 0.6; }
          100% { filter: blur(0) brightness(1); opacity: 1; }
        }
        .motion-trail {
          animation: motionTrail 0.8s cubic-bezier(.4,0,.2,1);
        }
        @keyframes scaleIn {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scaleIn 0.8s cubic-bezier(.4,0,.2,1);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
        @keyframes morphRing {
          0% { transform: scale(0.8) rotate(0deg); opacity: 0; }
          50% { transform: scale(1.1) rotate(180deg); opacity: 0.8; }
          100% { transform: scale(1) rotate(360deg); opacity: 0; }
        }
        .animate-morph-ring {
          animation: morphRing 2s ease-in-out;
        }
        @keyframes zoomSpace {
          0% { transform: scale(1); opacity: 1; }
          80% { transform: scale(2.5); opacity: 1; }
          100% { transform: scale(3.5); opacity: 0; }
        }
        .animate-zoom-space {
          animation: zoomSpace 2s cubic-bezier(.7,0,.2,1) forwards;
        }
      `}</style>
    </div>
  );
}

// Elegant morphing effect
function MorphingEffect() {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {/* Morphing rings */}
      <div className="relative">
        <div className="w-32 h-32 border-2 border-blue-400/30 rounded-full animate-morph-ring"></div>
        <div className="absolute inset-0 w-32 h-32 border-2 border-purple-400/30 rounded-full animate-morph-ring" style={{animationDelay: '0.3s'}}></div>
        <div className="absolute inset-0 w-32 h-32 border-2 border-cyan-400/30 rounded-full animate-morph-ring" style={{animationDelay: '0.6s'}}></div>
      </div>
      {/* Floating dots */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * 2 * Math.PI;
        const radius = 60;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-float"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        );
      })}
    </div>
  );
}

// Subtle starfield for space effect
function Starfield() {
  // 60 random stars
  const stars = Array.from({ length: 60 });
  return (
    <div className="absolute inset-0 z-0">
      {stars.map((_, i) => {
        const size = Math.random() * 2 + 1;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const opacity = Math.random() * 0.5 + 0.5;
        return (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              top: `${top}%`,
              opacity,
              filter: 'blur(0.5px)',
              transition: 'opacity 0.8s',
            }}
          />
        );
      })}
    </div>
  );
} 