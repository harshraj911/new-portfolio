
import React from 'react';
import { motion } from 'framer-motion';

const AboutApp: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-xl mx-auto py-8 flex flex-col items-center text-center space-y-6"
    >
      <motion.div variants={item} className="relative">
        <div className="w-24 h-24 rounded-full border-2 border-blue-500/50 p-1 mb-4 overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.3)]">
          <img 
            src="https://picsum.photos/seed/harsh/200" 
            alt="Harsh Raj" 
            className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white text-[8px] px-2 py-1 rounded font-bold uppercase tracking-tighter">
          ONLINE
        </div>
      </motion.div>

      <motion.h1 variants={item} className="text-3xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
        Harsh Raj
      </motion.h1>

      <motion.div variants={item} className="space-y-4">
        <p className="text-lg text-white/80 leading-relaxed font-light italic">
          "Pioneering the intersection of artificial intelligence and physical systems."
        </p>
        <div className="h-px w-20 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mx-auto" />
        <p className="text-sm text-white/60 leading-relaxed text-justify">
          I am an AI/ML enthusiast and Full-Stack Developer currently pursuing a B.Tech in CSE with a specialization in Artificial Intelligence. My passion lies in building real-time autonomous systems, ranging from computer vision-powered robotics to sophisticated LLM pipelines. 
        </p>
        <p className="text-sm text-white/60 leading-relaxed text-justify">
          I believe that technology should be both highly functional and aesthetically inspiring. Whether it's optimizing a neural network or designing a custom OS interface, I aim for precision and innovation.
        </p>
      </motion.div>

      <motion.div variants={item} className="flex gap-4 pt-4">
        <div className="flex flex-col items-center px-4">
          <span className="text-xl font-bold text-white">10+</span>
          <span className="text-[10px] text-white/40 uppercase tracking-widest">Projects</span>
        </div>
        <div className="w-px h-8 bg-white/10" />
        <div className="flex flex-col items-center px-4">
          <span className="text-xl font-bold text-white">AI/ML</span>
          <span className="text-[10px] text-white/40 uppercase tracking-widest">Focus</span>
        </div>
        <div className="w-px h-8 bg-white/10" />
        <div className="flex flex-col items-center px-4">
          <span className="text-xl font-bold text-white">FullStack</span>
          <span className="text-[10px] text-white/40 uppercase tracking-widest">Engineer</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutApp;
