import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { ExternalLink, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectCard: React.FC<{ project: typeof PROJECTS[0], idx: number }> = ({ project, idx }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1],
        delay: idx * 0.05
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.98 }}
      className="group p-6 rounded-2xl bg-white/5 border border-white/10 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden relative h-full hover:bg-white/[0.08] hover:border-blue-500/30"
      style={{
        boxShadow: isHovered ? '0 20px 40px -10px rgba(59, 130, 246, 0.2)' : 'none',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0px)',
        zIndex: isHovered ? 20 : 1
      }}
    >
      {/* Subtle Glow Overlay */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-2xl pointer-events-none z-0 bg-gradient-to-br from-blue-500/[0.03] to-transparent"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-black text-lg text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">
            {project.title}
          </h3>
          <div className="flex gap-3">
            {project.github && (
              <a 
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors p-1"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={16} />
              </a>
            )}
            <a 
              href={project.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors p-1"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
        <p className="text-xs text-white/50 mb-6 line-clamp-3 leading-relaxed group-hover:text-white/70 transition-colors font-medium">
          {project.description}
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-auto relative z-10">
        {project.tags.map(tag => (
          <span 
            key={tag} 
            className="text-[9px] font-black px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-widest transition-colors group-hover:bg-blue-500/20"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const ProjectsApp: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-1">
      {PROJECTS.map((project, idx) => (
        <ProjectCard key={idx} project={project} idx={idx} />
      ))}
    </div>
  );
};

export default ProjectsApp;