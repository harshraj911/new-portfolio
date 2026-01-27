import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { X, Minus, Plus, Copy } from 'lucide-react';

interface WindowProps {
  id: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  isActive: boolean;
  onFocus: () => void;
  children: React.ReactNode;
  initialSize?: { width: number; height: number };
}

const Window: React.FC<WindowProps> = ({ 
  id, 
  title, 
  isOpen, 
  onClose, 
  onMinimize, 
  isActive, 
  onFocus, 
  children,
  initialSize = { width: 600, height: 400 }
}) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isHoveringControls, setIsHoveringControls] = useState(false);
  
  // Track position to restore after un-maximizing
  const [lastPos, setLastPos] = useState({ x: 100, y: 100 });
  const x = useMotionValue(100);
  const y = useMotionValue(100);

  // Sync state with motion values during drag
  const handleDragEnd = () => {
    setLastPos({ x: x.get(), y: y.get() });
  };

  if (!isOpen) return null;

  const headerHeight = 32; // HarshOS top bar height
  const dockAreaHeight = 90; // Space to leave for dock at bottom

  // Maximized target values
  const maximizedTarget = {
    x: 8,
    y: headerHeight + 8,
    width: window.innerWidth - 16,
    height: window.innerHeight - (headerHeight + dockAreaHeight + 16),
    borderRadius: 12,
  };

  // Normal target values
  const normalTarget = {
    x: lastPos.x,
    y: lastPos.y,
    width: initialSize.width,
    height: initialSize.height,
    borderRadius: 16,
  };

  return (
    <motion.div
      drag={!isMaximized}
      dragMomentum={false}
      dragElastic={0}
      style={{ x, y }}
      onDragEnd={handleDragEnd}
      onMouseDown={onFocus}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: 1,
        ...(isMaximized ? maximizedTarget : normalTarget),
      }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
      transition={{ 
        type: 'spring', 
        damping: 30, 
        stiffness: 300,
        // Ensure opacity and scale are fast
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 }
      }}
      className={`absolute flex flex-col overflow-hidden border border-white/20 backdrop-blur-3xl bg-slate-950/90 shadow-2xl pointer-events-auto ${
        isActive ? 'z-50 shadow-blue-500/20 ring-1 ring-blue-500/40' : 'z-10 shadow-black/80 opacity-90'
      }`}
    >
      {/* Title Bar - macOS Style */}
      <div 
        className={`flex items-center h-10 px-4 bg-white/5 border-b border-white/10 select-none shrink-0 relative ${!isMaximized ? 'cursor-grab active:cursor-grabbing' : ''}`}
      >
        {/* Functional macOS Traffic Lights */}
        <div 
          className="flex gap-2 z-[70] pointer-events-auto"
          onMouseEnter={() => setIsHoveringControls(true)}
          onMouseLeave={() => setIsHoveringControls(false)}
        >
          {/* Close */}
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-3 h-3 rounded-full bg-[#ff5f56] flex items-center justify-center group/btn relative transition-transform active:scale-90"
          >
            <X 
              size={8} 
              className={`text-black/70 transition-opacity duration-200 ${isHoveringControls ? 'opacity-100' : 'opacity-0'}`} 
            />
          </button>
          
          {/* Minimize */}
          <button 
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="w-3 h-3 rounded-full bg-[#ffbd2e] flex items-center justify-center group/btn relative transition-transform active:scale-90"
          >
            <Minus 
              size={8} 
              className={`text-black/70 transition-opacity duration-200 ${isHoveringControls ? 'opacity-100' : 'opacity-0'}`} 
            />
          </button>
          
          {/* Maximize / Restore */}
          <button 
            onClick={(e) => { 
              e.stopPropagation(); 
              if (!isMaximized) {
                // Store current pos before snapping to maximized
                setLastPos({ x: x.get(), y: y.get() });
              }
              setIsMaximized(!isMaximized); 
            }}
            className="w-3 h-3 rounded-full bg-[#27c93f] flex items-center justify-center group/btn relative transition-transform active:scale-90"
          >
            {isMaximized ? (
              <Copy 
                size={8} 
                className={`text-black/70 transition-opacity duration-200 ${isHoveringControls ? 'opacity-100' : 'opacity-0'}`} 
              />
            ) : (
              <Plus 
                size={8} 
                className={`text-black/70 transition-opacity duration-200 ${isHoveringControls ? 'opacity-100' : 'opacity-0'}`} 
              />
            )}
          </button>
        </div>

        {/* Centered Title */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 truncate max-w-[200px]">
            {title}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 custom-scrollbar bg-transparent relative min-h-0">
        {children}
      </div>
    </motion.div>
  );
};

export default Window;