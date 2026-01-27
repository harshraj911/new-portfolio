
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Square, Copy } from 'lucide-react';

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

  if (!isOpen) return null;

  const maximizedStyles = {
    top: '32px', // Height of the header
    left: '0px',
    width: '100vw',
    height: 'calc(100vh - 32px - 80px)', // Subtract header and taskbar area approximately
    borderRadius: '0px'
  };

  const normalStyles = {
    width: initialSize.width, 
    height: initialSize.height,
    borderRadius: '12px'
  };

  return (
    <motion.div
      drag={!isMaximized}
      dragMomentum={false}
      onMouseDown={onFocus}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: 0,
        ...(isMaximized ? maximizedStyles : normalStyles)
      }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className={`absolute left-[15%] top-[15%] flex flex-col overflow-hidden border border-white/20 backdrop-blur-xl bg-slate-950/60 shadow-2xl ${
        isActive ? 'z-50 shadow-blue-500/20 ring-1 ring-blue-500/30' : 'z-10 shadow-black/50'
      } ${isMaximized ? '!left-0 !top-8' : ''}`}
      style={{ 
        minWidth: isMaximized ? '100vw' : 320,
        minHeight: isMaximized ? 'calc(100vh - 112px)' : 240
      }}
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10 select-none cursor-grab active:cursor-grabbing">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-xs font-medium uppercase tracking-widest text-white/70">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="p-1 hover:bg-white/10 rounded transition-colors"
            title="Minimize"
          >
            <Minus size={14} className="text-white/60" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); }}
            className="p-1 hover:bg-white/10 rounded transition-colors"
            title={isMaximized ? "Restore" : "Maximize"}
          >
            {isMaximized ? <Copy size={12} className="text-white/60" /> : <Square size={12} className="text-white/60" />}
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="p-1 hover:bg-red-500/40 rounded transition-colors"
            title="Close"
          >
            <X size={14} className="text-white/60" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-4 custom-scrollbar">
        {children}
      </div>
    </motion.div>
  );
};

export default Window;
