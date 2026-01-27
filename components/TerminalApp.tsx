
import React, { useState, useEffect, useRef } from 'react';

const HELP_TEXT = `
Available commands:
  about       - Display information about Harsh Raj
  skills      - List core technical competencies
  projects    - Show major AI/ML & Dev projects
  experience  - View professional journey
  contact     - Display contact information
  clear       - Clear the terminal screen
  help        - List all available commands
`;

const TerminalApp: React.FC = () => {
  const [history, setHistory] = useState<Array<{ type: 'input' | 'output', text: string | React.ReactNode }>>([
    { type: 'output', text: 'Welcome to HarshOS v1.0.0-terminal' },
    { type: 'output', text: 'Type "help" to see available commands.' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const processCommand = (cmd: string) => {
    const cleanCmd = cmd.toLowerCase().trim();
    let response: string | React.ReactNode = '';

    switch (cleanCmd) {
      case 'help':
        response = HELP_TEXT;
        break;
      case 'about':
        response = "Harsh Raj: AI/ML Engineer and Full-Stack Developer passionate about creating intelligent real-time systems. Currently specializing in LLM applications, Robotics, and Computer Vision.";
        break;
      case 'skills':
        response = "Python, C++, JavaScript, React, Node.js, TensorFlow, OpenCV, MediaPipe, Gemini API, Docker, AWS.";
        break;
      case 'projects':
        response = "AI Code Reviewer, Phish Guard, Hand Gesture Controller, AI Doc Verification, KASH Video Call, IoT Irrigation.";
        break;
      case 'experience':
        response = "Currently an AI/ML Intern. B.Tech (CSE-AIML) candidate 2021-25. Robotics Club Lead.";
        break;
      case 'contact':
        response = "Email: harshraj@example.com | GitHub: harshraj-dev | LinkedIn: harshraj-ai";
        break;
      case 'clear':
        setHistory([]);
        return;
      default:
        response = `Command not found: ${cleanCmd}. Type "help" for a list of commands.`;
    }

    setHistory(prev => [...prev, { type: 'input', text: cmd }, { type: 'output', text: response }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      processCommand(input);
      setInput('');
    }
  };

  return (
    <div className="mono h-full bg-slate-950/80 text-green-400 p-2 text-sm selection:bg-green-500 selection:text-black">
      <div className="flex flex-col gap-1">
        {history.map((entry, i) => (
          <div key={i} className="whitespace-pre-wrap leading-relaxed">
            {entry.type === 'input' ? (
              <div className="flex gap-2">
                <span className="text-blue-400">guest@harsh-os:~$</span>
                <span className="text-white">{entry.text}</span>
              </div>
            ) : (
              <div className="mb-2">{entry.text}</div>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-2 items-center">
        <span className="text-blue-400">guest@harsh-os:~$</span>
        <input
          autoFocus
          className="bg-transparent border-none outline-none text-white flex-1 caret-green-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
};

export default TerminalApp;
