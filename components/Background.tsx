import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const Background: React.FC = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 250 }).map((_, i) => ({
      id: i,
      size: Math.random() * 1.5 + 0.5,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.7 + 0.2,
      duration: Math.random() * 5 + 3,
      delay: Math.random() * 10
    }));
  }, []);

  const shootingStars = useMemo(() => {
    return Array.from({ length: 3 }).map((_, i) => ({
      id: i,
      delay: Math.random() * 15 + 5,
      duration: Math.random() * 1.5 + 0.5,
      top: Math.random() * 60,
      left: Math.random() * 100
    }));
  }, []);

  return (
    <div className="fixed inset-0 -z-10 bg-[#010208] overflow-hidden">
      {/* Deepest Void */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#050b1d_0%,_#010208_100%)]" />

      {/* Galaxy Core - Central Swirl */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180vw] h-[180vw] opacity-20 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[15%] bg-blue-600/10 blur-[140px] rounded-full rotate-45" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[15%] bg-indigo-600/10 blur-[140px] rounded-full -rotate-45" />
      </motion.div>

      {/* Nebula Clouds */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[5%] left-[-10%] w-[70%] h-[70%] bg-purple-900/15 blur-[150px] rounded-full mix-blend-screen" 
      />
      <motion.div 
        animate={{ 
          scale: [1.1, 1, 1.1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[0%] right-[-5%] w-[60%] h-[60%] bg-blue-800/15 blur-[150px] rounded-full mix-blend-screen" 
      />

      {/* TECH GRID WALLPAPER LAYERS */}
      
      {/* 1. Perspective Floor Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{ perspective: '800px' }}>
        <div 
          className="absolute inset-0 origin-bottom"
          style={{ 
            transform: 'rotateX(60deg)',
            backgroundImage: `linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            maskImage: 'linear-gradient(to bottom, transparent, black 80%)'
          }}
        />
      </div>

      {/* 2. Main Surface Tech Grid (HUD Style) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{ 
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* 3. Grid Dots (Glowing Intersections) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.07]"
        style={{ 
          backgroundImage: 'radial-gradient(circle, rgba(96, 165, 250, 0.8) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Star Field */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white z-0"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: star.opacity,
            boxShadow: star.size > 1.2 ? `0 0 5px rgba(255,255,255,0.6)` : 'none'
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 0.3, star.opacity],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Shooting Stars */}
      {shootingStars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute h-[1px] bg-gradient-to-r from-transparent via-blue-200 to-transparent z-0"
          style={{
            width: '150px',
            top: `${s.top}%`,
            left: `${s.left}%`,
            transform: 'rotate(-30deg)',
            opacity: 0,
          }}
          animate={{
            x: [-200, 1000],
            y: [-100, 500],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            repeatDelay: s.delay,
            ease: "linear"
          }}
        />
      ))}

      {/* Scanline / CRT Effect Overlay */}
      <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
      </div>

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,rgba(1,2,8,0.5)_100%)] z-[2]" />
    </div>
  );
};

export default Background;
