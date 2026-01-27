
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
      dragElastic={0.1}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onDoubleClick={onClick}
      className="group relative flex flex-col items-center gap-2 p-4 rounded-xl cursor-pointer hover:bg-white/5 transition-colors w-24"
    >
      <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg group-hover:shadow-blue-500/20 group-hover:border-blue-500/50 transition-all ${
        isOpen ? 'bg-blue-500/10 border-blue-500/40' : ''
      }`}>
        <div className="text-white/80 group-hover:text-blue-400 transition-colors">
          {icon}
        </div>
      </div>
      <span className="text-[11px] font-medium text-center text-white/80 group-hover:text-white drop-shadow-md tracking-wide uppercase">
        {name}
      </span>
      {isOpen && (
        <div className="absolute bottom-0 w-1 h-1 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
      )}
    </motion.div>
  );
};

export default DesktopIcon;
