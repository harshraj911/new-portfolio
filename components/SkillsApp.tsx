
import React from 'react';
import { SKILLS } from '../constants';
import { motion } from 'framer-motion';
import { Cpu, Code, Globe, Settings } from 'lucide-react';

const iconMap: Record<string, any> = {
  cpu: Cpu,
  code: Code,
  globe: Globe,
  settings: Settings
};

const SkillsApp: React.FC = () => {
  return (
    <div className="space-y-6">
      {SKILLS.map((cat, idx) => {
        const Icon = iconMap[cat.icon] || Code;
        return (
          <div key={idx}>
            <div className="flex items-center gap-2 mb-3 text-white/80 border-b border-white/10 pb-1">
              <Icon size={18} className="text-blue-400" />
              <h3 className="font-semibold uppercase tracking-widest text-sm">{cat.title}</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {cat.skills.map(skill => (
                <motion.div
                  key={skill}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/90 text-sm font-medium shadow-sm flex items-center gap-2 cursor-default transition-all"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  {skill}
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SkillsApp;
