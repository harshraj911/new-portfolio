
// Added React import to resolve React namespace errors
import React from 'react';

export type AppID = 'terminal' | 'projects' | 'skills' | 'experience' | 'about' | 'contact' | 'resume';

export interface AppConfig {
  id: AppID;
  name: string;
  icon: React.ReactNode;
  component: React.ReactNode;
  initialSize: { width: number; height: number };
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
  icon: string;
}

export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
  type: 'Internship' | 'Training' | 'Achievement' | 'Project';
}