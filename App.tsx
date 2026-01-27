
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Code, 
  User, 
  Cpu, 
  Briefcase, 
  Mail, 
  FileText, 
  Wifi, 
  Battery, 
  Volume2, 
  Bluetooth,
  Maximize2,
  Minimize2
} from 'lucide-react';
import Background from './components/Background';
import Window from './components/Window';
import DesktopIcon from './components/DesktopIcon';
import TerminalApp from './components/TerminalApp';
import ProjectsApp from './components/ProjectsApp';
import SkillsApp from './components/SkillsApp';
import ExperienceApp from './components/ExperienceApp';
import AboutApp from './components/AboutApp';
import ContactApp from './components/ContactApp';
import { AppID, AppConfig } from './types';

const App: React.FC = () => {
  const [openApps, setOpenApps] = useState<AppID[]>([]);
  const [activeApp, setActiveApp] = useState<AppID | null>(null);
  const [minimizedApps, setMinimizedApps] = useState<AppID[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Sync fullscreen state with document
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const APPS: AppConfig[] = [
    { 
      id: 'about', 
      name: 'About.app', 
      icon: <User size={32} />, 
      component: <AboutApp />,
      initialSize: { width: 500, height: 600 }
    },
    { 
      id: 'terminal', 
      name: 'Terminal.app', 
      icon: <Terminal size={32} />, 
      component: <TerminalApp />,
      initialSize: { width: 650, height: 450 }
    },
    { 
      id: 'projects', 
      name: 'Projects.app', 
      icon: <Code size={32} />, 
      component: <ProjectsApp />,
      initialSize: { width: 750, height: 550 }
    },
    { 
      id: 'skills', 
      name: 'Skills.app', 
      icon: <Cpu size={32} />, 
      component: <SkillsApp />,
      initialSize: { width: 600, height: 500 }
    },
    { 
      id: 'experience', 
      name: 'Experience.app', 
      icon: <Briefcase size={32} />, 
      component: <ExperienceApp />,
      initialSize: { width: 600, height: 500 }
    },
    { 
      id: 'contact', 
      name: 'Contact.app', 
      icon: <Mail size={32} />, 
      component: <ContactApp />,
      initialSize: { width: 450, height: 500 }
    },
    { 
      id: 'resume', 
      name: 'Resume.pdf', 
      icon: <FileText size={32} />, 
      component: (
        <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
          <FileText size={64} className="text-blue-500/50" />
          <p className="text-white/60">Resume module not integrated in this demo environment.</p>
          <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-bold uppercase text-xs tracking-widest transition-all">Download PDF</button>
        </div>
      ),
      initialSize: { width: 400, height: 300 }
    },
  ];

  const handleOpenApp = useCallback((id: AppID) => {
    if (!openApps.includes(id)) {
      setOpenApps(prev => [...prev, id]);
    }
    setMinimizedApps(prev => prev.filter(a => a !== id));
    setActiveApp(id);
  }, [openApps]);

  const handleCloseApp = useCallback((id: AppID) => {
    setOpenApps(prev => prev.filter(a => a !== id));
    setMinimizedApps(prev => prev.filter(a => a !== id));
    if (activeApp === id) setActiveApp(null);
  }, [activeApp]);

  const handleMinimizeApp = useCallback((id: AppID) => {
    setMinimizedApps(prev => [...prev, id]);
    if (activeApp === id) setActiveApp(null);
  }, [activeApp]);

  const handleFocusApp = useCallback((id: AppID) => {
    setActiveApp(id);
    setMinimizedApps(prev => prev.filter(a => a !== id));
  }, []);

  const time = useMemo(() => {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden text-slate-100 select-none">
      <Background />

      {/* OS Header Bar */}
      <div className="fixed top-0 left-0 right-0 h-8 flex items-center justify-between px-4 bg-black/40 backdrop-blur-md border-b border-white/5 z-[100]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-black uppercase tracking-tighter text-blue-400">
            <Cpu size={16} />
            <span>HarshOS v1.0</span>
          </div>
          <div className="h-4 w-px bg-white/10" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">AI Deep Space Network</span>
        </div>
        
        <div className="flex items-center gap-4 text-white/60">
          <button 
            onClick={toggleFullscreen}
            className="p-1 hover:bg-white/10 rounded transition-all active:scale-95"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <Bluetooth size={14} />
            <Wifi size={14} />
            <Volume2 size={14} />
          </div>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <Battery size={14} />
            <span className="text-[10px] font-bold">85%</span>
          </div>
          <div className="h-4 w-px bg-white/10" />
          <span className="text-xs font-bold tracking-tight">{time}</span>
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="absolute inset-0 pt-12 pb-20 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 auto-rows-min pointer-events-none">
        {APPS.map((app) => (
          <div key={app.id} className="pointer-events-auto">
            <DesktopIcon
              id={app.id}
              name={app.name}
              icon={app.icon}
              isOpen={openApps.includes(app.id)}
              onClick={() => handleOpenApp(app.id)}
            />
          </div>
        ))}
      </div>

      {/* Windows Container */}
      <div className="absolute inset-0 pt-8 pb-16 pointer-events-none z-10">
        <AnimatePresence>
          {APPS.map((app) => (
            <Window
              key={app.id}
              id={app.id}
              title={app.name}
              isOpen={openApps.includes(app.id) && !minimizedApps.includes(app.id)}
              onClose={() => handleCloseApp(app.id)}
              onMinimize={() => handleMinimizeApp(app.id)}
              isActive={activeApp === app.id}
              onFocus={() => handleFocusApp(app.id)}
              initialSize={app.initialSize}
            >
              {app.component}
            </Window>
          ))}
        </AnimatePresence>
      </div>

      {/* Bottom Taskbar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 mb-4 p-2 flex items-center gap-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-[100]">
        {APPS.map((app) => (
          <button
            key={app.id}
            onClick={() => handleOpenApp(app.id)}
            className={`p-3 rounded-xl transition-all relative group ${
              activeApp === app.id ? 'bg-blue-500/20 text-blue-400 scale-110 shadow-lg shadow-blue-500/20' : 'text-white/40 hover:text-white hover:bg-white/10'
            }`}
          >
            <div className="transform scale-75 origin-center">
              {app.icon}
            </div>
            {openApps.includes(app.id) && (
              <div className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                activeApp === app.id ? 'bg-blue-400' : 'bg-white/40'
              }`} />
            )}
            
            {/* Tooltip */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded text-[10px] uppercase font-bold tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {app.name}
            </div>
          </button>
        ))}
      </div>
      
      {/* Visual FX: Vignette */}
      <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] z-[200]" />
    </div>
  );
};

export default App;
