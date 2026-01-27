import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Copy, Maximize2 } from 'lucide-react';

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

  if (!isOpen) return null;

  const headerHeight = 32; 
  const dockAreaHeight = 96; 

  const maximizedStyles = {
    top: headerHeight,
    left: 0,
    x: 0,
    y: 0,
    width: '100vw',
    height: `calc(100vh - ${headerHeight}px - ${dockAreaHeight}px)`,
    borderRadius: '0px'
  };

  const normalStyles = {
    width: initialSize.width, 
    height: initialSize.height,
    borderRadius: '16px',
  };

  return (
    <motion.div
      drag={!isMaximized}
      dragMomentum={false}
      dragElastic={0}
      dragTransition={{ power: 0 }}
      onMouseDown={onFocus}
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        ...(isMaximized ? maximizedStyles : normalStyles)
      }}
      exit={{ opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.15 } }}
      transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
      className={`absolute left-[10%] top-[10%] flex flex-col overflow-hidden border border-white/20 backdrop-blur-3xl bg-slate-950/80 shadow-2xl pointer-events-auto ${
        isActive ? 'z-50 shadow-blue-500/20 ring-1 ring-blue-500/40' : 'z-10 shadow-black/80'
      } ${isMaximized ? 'fixed !left-0 !top-0' : ''}`}
      style={{ 
        minWidth: isMaximized ? '100vw' : 320,
        minHeight: isMaximized ? `calc(100vh - ${headerHeight}px - ${dockAreaHeight}px)` : 240,
        maxWidth: isMaximized ? '100vw' : '90vw',
        maxHeight: isMaximized ? `calc(100vh - ${headerHeight}px - ${dockAreaHeight}px)` : '80vh',
      }}
    >
      {/* Title Bar - macOS Style */}
      <div 
        className="flex items-center h-10 px-4 bg-white/5 border-b border-white/10 select-none cursor-grab active:cursor-grabbing shrink-0 relative"
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
            className="w-3 h-3 rounded-full bg-[#ff5f56] flex items-center justify-center group/btn relative overflow-hidden"
          >
            <X 
              size={8} 
              className={`text-black/60 transition-opacity duration-200 ${isHoveringControls ? 'opacity-100' : 'opacity-0'}`} 
            />
          </button>
          
          {/* Minimize */}
          <button 
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="w-3 h-3 rounded-full bg-[#ffbd2e] flex items-center justify-center group/btn relative overflow-hidden"
          >
            <Minus 
              size={8} 
              className={`text-black/60 transition-opacity duration-200 ${isHoveringControls ? 'opacity-100' : 'opacity-0'}`} 
            />
          </button>
          
          {/* Maximize */}
          <button 
            onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); }}
            className="w-3 h-3 rounded-full bg-[#27c93f] flex items-center justify-center group/btn relative overflow-hidden"
          >
            {isMaximized ? (
              <Copy 
                size={8} 
                className={`text-black/60 transition-opacity duration-200 ${isHoveringControls ? 'opacity-100' : 'opacity-0'}`} 
              />
            ) : (
              <Plus 
                size={8} 
                className={`text-black/60 transition-opacity duration-200 ${isHoveringControls ? 'opacity-100' : 'opacity-0'}`} 
              />
            )}
          </button>
        </div>

        {/* Centered Title */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 truncate max-w-[200px]">
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