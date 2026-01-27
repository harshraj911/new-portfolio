import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { ExternalLink, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectCard: React.FC<{ project: typeof PROJECTS[0], idx: number }> = ({ project, idx }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={isHovered ? {
        scale: [1.04, 1.06, 1.04],
        filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"],
        y: -12,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        opacity: 1
      } : {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "brightness(1)",
        backgroundColor: "rgba(255, 255, 255, 0.05)"
      }}
      transition={isHovered ? {
        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        filter: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        y: { duration: 0.3, ease: "easeOut" },
        backgroundColor: { duration: 0.3 }
      } : {
        delay: idx * 0.08,
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ 
        scale: 0.94, 
        opacity: 0.6,
        filter: "brightness(0.8)",
        transition: { duration: 0.1 } 
      }}
      className="group p-6 rounded-2xl bg-white/5 border border-white/10 transition-shadow duration-500 flex flex-col justify-between cursor-pointer overflow-hidden relative h-full"
      style={{
        boxShadow: isHovered ? '0 25px 50px -12px rgba(59, 130, 246, 0.3)' : 'none'
      }}
    >
      {/* Animated Glow Border Overlay */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              boxShadow: [
                "inset 0 0 0px rgba(59, 130, 246, 0)",
                "inset 0 0 25px rgba(59, 130, 246, 0.4)",
                "inset 0 0 0px rgba(59, 130, 246, 0)"
              ],
              borderColor: [
                "rgba(59, 130, 246, 0.4)",
                "rgba(59, 130, 246, 0.8)",
                "rgba(59, 130, 246, 0.4)"
              ]
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute inset-0 rounded-2xl pointer-events-none border-2 border-blue-500/50 z-0"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 pointer-events-none">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-xl text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">
            {project.title}
          </h3>
          <div className="flex gap-4 pointer-events-auto">
            {project.github && (
              <motion.a 
                whileHover={{ scale: 1.2, color: '#60a5fa' }}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={20} />
              </motion.a>
            )}
            <motion.a 
              whileHover={{ scale: 1.2, color: '#60a5fa' }}
              href={project.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={20} />
            </motion.a>
          </div>
        </div>
        <p className="text-sm text-white/50 mb-6 line-clamp-3 leading-relaxed group-hover:text-white/80 transition-colors">
          {project.description}
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-auto relative z-10 pointer-events-none">
        {project.tags.map(tag => (
          <span 
            key={tag} 
            className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-tighter group-hover:bg-blue-500/20 group-hover:border-blue-500/40 transition-all duration-300"
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
      {PROJECTS.map((project, idx) => (
        <ProjectCard key={idx} project={project} idx={idx} />
      ))}
    </div>
  );
};

export default ProjectsApp;