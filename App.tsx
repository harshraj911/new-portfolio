
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
  Minimize2,
  Gamepad2,
  BatteryCharging
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
import ResumeApp from './components/ResumeApp';
import GamesApp from './components/GamesApp';
import { AppID, AppConfig } from './types';

const App: React.FC = () => {
  const [openApps, setOpenApps] = useState<AppID[]>([]);
  const [activeApp, setActiveApp] = useState<AppID | null>(null);
  const [minimizedApps, setMinimizedApps] = useState<AppID[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [battery, setBattery] = useState({ level: 100, charging: false });

  // System Battery Integration
  useEffect(() => {
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((batt: any) => {
        const updateBattery = () => {
          setBattery({
            level: Math.round(batt.level * 100),
            charging: batt.charging
          });
        };
        updateBattery();
        batt.addEventListener('levelchange', updateBattery);
        batt.addEventListener('chargingchange', updateBattery);
      });
    }
  }, []);

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
      initialSize: { width: 850, height: 600 }
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
      id: 'games', 
      name: 'Games.app', 
      icon: <Gamepad2 size={32} />, 
      component: <GamesApp />,
      initialSize: { width: 500, height: 600 }
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
      component: <ResumeApp />,
      initialSize: { width: 600, height: 700 }
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
    <div className="relative w-screen h-screen overflow-hidden text-slate-100 select-none bg-slate-950">
      <Background />

      {/* OS Header Bar */}
      <div className="fixed top-0 left-0 right-0 h-8 flex items-center justify-between px-4 bg-black/60 backdrop-blur-xl border-b border-white/10 z-[100]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-bold uppercase tracking-tighter text-blue-400">
            <Cpu size={14} className="animate-pulse" />
            <span className="text-xs">HarshOS v1.2</span>
          </div>
          <div className="h-3 w-px bg-white/20" />
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">SYSTEM READY</span>
        </div>
        
        <div className="flex items-center gap-4 text-white/60">
          <button 
            onClick={toggleFullscreen}
            className="p-1 hover:bg-white/10 rounded transition-all active:scale-95"
          >
            {isFullscreen ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
          </button>
          <div className="h-3 w-px bg-white/20" />
          <div className="flex items-center gap-3">
            <Bluetooth size={12} />
            <Wifi size={12} />
            <Volume2 size={12} />
          </div>
          <div className="h-3 w-px bg-white/20" />
          <div className="flex items-center gap-1.5">
            {battery.charging ? <BatteryCharging size={12} className="text-green-400" /> : <Battery size={12} />}
            <span className="text-[9px] font-bold">{battery.level}%</span>
          </div>
          <div className="h-3 w-px bg-white/20" />
          <span className="text-[10px] font-bold tracking-tight text-white/80">{time}</span>
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="absolute inset-0 pt-12 pb-24 px-8 z-0 overflow-hidden pointer-events-none">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6 auto-rows-min w-fit h-full">
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
      </div>

      {/* Windows Layer */}
      <div className="absolute inset-0 pt-8 pb-16 z-20 pointer-events-none">
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

      {/* Dock / Taskbar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 mb-4 p-1.5 flex items-center gap-1 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[100]">
        {APPS.map((app) => (
          <button
            key={app.id}
            onClick={() => handleOpenApp(app.id)}
            className={`p-3 rounded-xl transition-all relative group flex flex-col items-center ${
              activeApp === app.id 
                ? 'bg-blue-500/20 text-blue-300 scale-105 shadow-inner border border-blue-500/20' 
                : 'text-white/40 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="transform scale-90">
              {app.icon}
            </div>
            {openApps.includes(app.id) && (
              <div className={`absolute -bottom-0.5 w-1 h-1 rounded-full ${
                activeApp === app.id ? 'bg-blue-400 shadow-[0_0_8px_#60a5fa]' : 'bg-white/20'
              }`} />
            )}
            
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded text-[9px] uppercase font-bold tracking-widest text-white opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 pointer-events-none whitespace-nowrap shadow-xl">
              {app.name}
            </div>
          </button>
        ))}
      </div>
      
      {/* Cinematic Vignette */}
      <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.6)] z-[200]" />
    </div>
  );
};

export default App;
