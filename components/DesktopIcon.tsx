import React from 'react';
import { motion } from 'framer-motion';

interface DesktopIconProps {
  id: string;
  name: string;
  icon: React.ReactNode;
  onClick: () => void;
  isOpen: boolean;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ id, name, icon, onClick, isOpen }) => {
  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.05}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onTap={onClick}
      className="group relative flex flex-col items-center gap-2 p-2 rounded-xl cursor-pointer w-24 transition-all"
    >
      <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl group-hover:shadow-blue-500/20 group-hover:border-blue-500/50 group-hover:bg-white/10 transition-all duration-300 ${
        isOpen ? 'bg-blue-500/10 border-blue-500/40 shadow-blue-500/10' : ''
      }`}>
        <div className={`transition-colors duration-300 ${
          isOpen ? 'text-blue-400' : 'text-white/70 group-hover:text-blue-300'
        }`}>
          {icon}
        </div>
      </div>
      <span className="text-[10px] font-bold text-center text-white/60 group-hover:text-white drop-shadow-lg tracking-[0.1em] uppercase transition-colors">
        {name}
      </span>
      {isOpen && (
        <div className="absolute bottom-1 w-1 h-1 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,1)]" />
      )}
    </motion.div>
  );
};

export default DesktopIcon;