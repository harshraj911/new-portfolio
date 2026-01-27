
import React from 'react';
import { EXPERIENCE } from '../constants';
import { motion } from 'framer-motion';

const ExperienceApp: React.FC = () => {
  return (
    <div className="relative pl-6 space-y-10">
      <div className="absolute left-[7px] top-2 bottom-0 w-px bg-white/10" />
      
      {EXPERIENCE.map((item, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="relative group"
        >
          {/* Dot */}
          <div className="absolute -left-[23px] top-1.5 w-4 h-4 rounded-full border-2 border-slate-900 bg-white group-hover:bg-blue-500 group-hover:scale-125 transition-all shadow-[0_0_10px_rgba(59,130,246,0)] group-hover:shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
          
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded">
              {item.type}
            </span>
            <span className="text-[11px] text-white/40 font-medium">
              {item.period}
            </span>
          </div>
          
          <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors uppercase leading-none mb-1">
            {item.title}
          </h3>
          <p className="text-sm font-medium text-white/60 mb-2 italic">
            {item.company}
          </p>
          <p className="text-sm text-white/50 leading-relaxed">
            {item.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default ExperienceApp;
