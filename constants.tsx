
import React from 'react';
import { Terminal, Briefcase, Code, User, Mail, FileText, Cpu } from 'lucide-react';
import { Project, SkillCategory, ExperienceItem } from './types';

export const PROJECTS: Project[] = [
  {
    title: "AI Code Reviewer",
    description: "LLM-powered code analysis using Gemini API to identify bugs, performance issues, and security vulnerabilities in real-time.",
    tags: ["Gemini API", "React", "Node.js", "TypeScript"],
    github: "#"
  },
  {
    title: "Phish Guard",
    description: "ML-based phishing URL detection system using random forest classifiers to protect users from malicious web links.",
    tags: ["Python", "Scikit-learn", "Flask", "ML"],
    github: "#"
  },
  {
    title: "Hand Gesture Controller",
    description: "Computer Vision application that uses MediaPipe and OpenCV to control presentations and media players via hand gestures.",
    tags: ["OpenCV", "MediaPipe", "Python", "Computer Vision"],
    github: "#"
  },
  {
    title: "AI Doc Verification",
    description: "Advanced OCR + Gemini LLM system to automatically extract and verify information from legal and identity documents.",
    tags: ["OCR", "LLM", "Python", "Cloud Vision"],
    github: "#"
  },
  {
    title: "KASH Video Call",
    description: "Real-time communication app utilizing WebRTC for ultra-low latency video and audio conferencing.",
    tags: ["WebRTC", "Socket.io", "React", "Node.js"],
    github: "#"
  },
  {
    title: "Smart Drip Irrigation",
    description: "IoT-based automation system for crop irrigation and shed monitoring using ESP32 and real-time sensors.",
    tags: ["IoT", "C++", "Sensors", "Arduino"],
    github: "#"
  }
];

export const SKILLS: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["Python", "C++", "JavaScript", "SQL", "TypeScript"],
    icon: "code"
  },
  {
    title: "Frameworks & Web",
    skills: ["React.js", "Node.js", "Express", "Tailwind CSS", "Flask", "Django"],
    icon: "globe"
  },
  {
    title: "AI / ML / Robotics",
    skills: ["TensorFlow", "PyTorch", "OpenCV", "MediaPipe", "Gemini API", "LangChain"],
    icon: "cpu"
  },
  {
    title: "Tools & Others",
    skills: ["Git", "Docker", "AWS", "ROS", "Linux", "MongoDB"],
    icon: "settings"
  }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    title: "AI/ML Intern",
    company: "Tech Solutions AI",
    period: "May 2024 - Present",
    description: "Developing custom LLM agents for automated code auditing and processing real-time video streams using MediaPipe.",
    type: "Internship"
  },
  {
    title: "B.Tech in CSE (AI & ML)",
    company: "University Institute of Technology",
    period: "2021 - 2025",
    description: "Focusing on advanced algorithms, neural networks, and computer vision architectures.",
    type: "Training"
  },
  {
    title: "Computer Vision Researcher",
    company: "Robotics Club",
    period: "2022 - 2024",
    description: "Led the development of a vision-based navigation system for a prototype autonomous robot.",
    type: "Project"
  },
  {
    title: "Hackathon Winner",
    company: "Global AI Challenge",
    period: "2023",
    description: "Awarded 1st place for building an AI-driven accessibility tool for visually impaired users.",
    type: "Achievement"
  }
];
