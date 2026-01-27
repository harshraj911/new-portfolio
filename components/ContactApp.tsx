
import React, { useState } from 'react';
import { Mail, Linkedin, Github, Copy, Check, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactApp: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = "harshraj@example.com";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <div className="w-full max-w-sm p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Mail size={80} />
        </div>
        
        <h2 className="text-xl font-black uppercase tracking-tighter text-white mb-6">Transmitting Signal...</h2>
        
        <div className="space-y-4">
          <div 
            onClick={copyToClipboard}
            className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-blue-500/10 hover:border-blue-500/40 cursor-pointer transition-all"
          >
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-blue-400" />
              <span className="text-sm font-medium text-white/80">{email}</span>
            </div>
            {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} className="text-white/40" />}
          </div>

          <a 
            href="#" 
            className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-blue-500/10 hover:border-blue-500/40 transition-all"
          >
            <div className="flex items-center gap-3">
              <Linkedin size={18} className="text-blue-400" />
              <span className="text-sm font-medium text-white/80">LinkedIn Profile</span>
            </div>
            <ExternalLink size={16} className="text-white/40" />
          </a>

          <a 
            href="#" 
            className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-blue-500/10 hover:border-blue-500/40 transition-all"
          >
            <div className="flex items-center gap-3">
              <Github size={18} className="text-blue-400" />
              <span className="text-sm font-medium text-white/80">GitHub Repository</span>
            </div>
            <ExternalLink size={16} className="text-white/40" />
          </a>
        </div>
      </div>

      <div className="text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Encrypted Communication v3.4</p>
      </div>
    </div>
  );
};

export default ContactApp;
