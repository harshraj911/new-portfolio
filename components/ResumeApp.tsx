
import React, { useState } from 'react';
import { FileText, Download, Eye, ExternalLink, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ResumeApp: React.FC = () => {
  const [viewMode, setViewMode] = useState<'menu' | 'preview'>('menu');

  if (viewMode === 'preview') {
    return (
      <div className="flex flex-col h-full bg-slate-900/50 rounded-lg overflow-hidden border border-white/10">
        <div className="flex items-center justify-between p-3 bg-white/5 border-b border-white/10">
          <button 
            onClick={() => setViewMode('menu')}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors"
          >
            <ChevronLeft size={16} /> Back
          </button>
          <div className="flex items-center gap-4">
            <ZoomOut size={14} className="text-white/40 cursor-pointer hover:text-white" />
            <span className="text-[10px] text-white/60 font-mono">100%</span>
            <ZoomIn size={14} className="text-white/40 cursor-pointer hover:text-white" />
          </div>
          <button className="p-2 bg-blue-500/20 hover:bg-blue-500/40 rounded-md transition-all">
            <Download size={14} className="text-blue-400" />
          </button>
        </div>
        <div className="flex-1 overflow-auto p-8 flex justify-center bg-slate-800/30">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl bg-white shadow-2xl p-12 min-h-[1000px] text-slate-900 relative"
          >
            {/* Simulated Document Content */}
            <header className="border-b-2 border-slate-900 pb-4 mb-8">
              <h1 className="text-4xl font-black uppercase tracking-tighter">Harsh Raj</h1>
              <p className="text-sm font-bold text-slate-500">AI / ML Engineer | Full-Stack Developer</p>
            </header>
            
            <section className="mb-8">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] bg-slate-900 text-white px-2 py-1 inline-block mb-4">Experience</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold">AI/ML Intern @ Tech Solutions AI</h3>
                  <p className="text-xs text-slate-500">2024 - Present</p>
                  <p className="text-sm mt-1">Specializing in LLM auditing and Computer Vision pipelines.</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] bg-slate-900 text-white px-2 py-1 inline-block mb-4">Education</h2>
              <div>
                <h3 className="font-bold">B.Tech in CSE (AI & ML)</h3>
                <p className="text-xs text-slate-500">2021 - 2025</p>
              </div>
            </section>

            <div className="absolute top-0 right-0 p-8 opacity-5 select-none pointer-events-none rotate-12">
              <FileText size={400} />
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 p-6">
      <div className="relative group">
        <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full group-hover:bg-blue-500/40 transition-all duration-700" />
        <FileText size={80} className="text-white relative z-10 opacity-80 group-hover:scale-110 transition-transform duration-500" />
      </div>
      
      <div className="text-center space-y-2 relative z-10">
        <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Harsh_Raj_Resume.pdf</h2>
        <p className="text-white/40 text-xs font-medium uppercase tracking-[0.3em]">Latest Revision: Oct 2024</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm relative z-10">
        <button 
          onClick={() => setViewMode('preview')}
          className="flex-1 flex items-center justify-center gap-3 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all active:scale-95 group"
        >
          <Eye size={18} className="text-blue-400 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest text-white">View Document</span>
        </button>
        
        <button className="flex-1 flex items-center justify-center gap-3 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-500/20 transition-all active:scale-95 group">
          <Download size={18} className="text-white group-hover:translate-y-0.5 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest text-white">Download PDF</span>
        </button>
      </div>
      
      <p className="text-[10px] text-white/20 font-mono uppercase tracking-widest">MD5: 8f24b2a3c4d5e6f7g8h9i0j1k2l3m4n5</p>
    </div>
  );
};

export default ResumeApp;
