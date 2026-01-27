import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { ExternalLink, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectCard: React.FC<{ project: typeof PROJECTS[0], idx: number }> = ({ project, idx }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: idx * 0.08,
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        y: -8, 
        scale: 1.04,
        backgroundColor: "rgba(255, 255, 255, 0.08)"
      }}
      className="group p-6 rounded-2xl bg-white/5 border border-white/10 transition-all duration-500 flex flex-col justify-between cursor-default overflow-hidden relative h-full"
      style={{
        boxShadow: isHovered ? '0 20px 40px -15px rgba(59, 130, 246, 0.25)' : 'none'
      }}
    >
      {/* Animated Glow Border Overlay (The Pulse) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              boxShadow: [
                "inset 0 0 0px rgba(59, 130, 246, 0)",
                "inset 0 0 20px rgba(59, 130, 246, 0.3)",
                "inset 0 0 0px rgba(59, 130, 246, 0)"
              ],
              borderColor: [
                "rgba(59, 130, 246, 0.3)",
                "rgba(59, 130, 246, 0.7)",
                "rgba(59, 130, 246, 0.3)"
              ]
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute inset-0 rounded-2xl pointer-events-none border-2 border-blue-500/40 z-0"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-xl text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">
            {project.title}
          </h3>
          <div className="flex gap-4">
            {project.github && (
              <motion.a 
                whileHover={{ scale: 1.2, color: '#60a5fa' }}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors cursor-pointer"
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
            >
              <ExternalLink size={20} />
            </motion.a>
          </div>
        </div>
        <p className="text-sm text-white/50 mb-6 line-clamp-3 leading-relaxed group-hover:text-white/80 transition-colors">
          {project.description}
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-auto relative z-10">
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