
import React, { useState, useEffect, useCallback, useRef } from 'react';
/* Added User to the lucide-react imports to fix the 'Cannot find name User' error on line 468 */
import { Gamepad2, Play, RotateCcw, Trophy, Cpu, User, ChevronLeft, Hash, Grid3X3, Info, Zap, Skull, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- SYNTHETIC SOUND ENGINE ---
const playSound = (type: 'click' | 'start' | 'score' | 'gameover' | 'move') => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    switch (type) {
      case 'click':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
        break;
      case 'start':
        osc.type = 'square';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.3);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
        break;
      case 'score':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
        break;
      case 'gameover':
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.linearRampToValueAtTime(100, now + 0.5);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
        break;
      case 'move':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, now);
        gain.gain.setValueAtTime(0.02, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
        break;
    }
  } catch (e) {}
};

// --- COMMON UI COMPONENTS ---
const MissionBriefing: React.FC<{ title: string; instructions: string[]; difficultyOptions: { label: string; value: any; icon?: any }[]; onStart: (val: any) => void }> = ({ title, instructions, difficultyOptions, onStart }) => {
  const [selected, setSelected] = useState(difficultyOptions[0].value);
  
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col h-full gap-4">
      <div className="flex-1 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col gap-4 overflow-y-auto custom-scrollbar">
        <div className="flex items-center gap-2 text-blue-400">
          <div className="p-1 rounded bg-blue-500/10">
            <Info size={14} />
          </div>
          <h3 className="text-xs font-black uppercase tracking-[0.2em]">Mission Briefing: {title}</h3>
        </div>
        <div className="space-y-3">
          {instructions.map((line, i) => (
            <p key={i} className="text-[11px] text-white/50 font-mono leading-relaxed border-l border-blue-500/30 pl-3">
              <span className="text-blue-500/50 mr-2">>></span> {line}
            </p>
          ))}
        </div>
        <div className="mt-auto pt-4 border-t border-white/10">
          <label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-3 block">Configure Intensity</label>
          <div className="grid grid-cols-1 gap-2">
            {difficultyOptions.map((opt) => (
              <button
                key={opt.label}
                onClick={() => { playSound('click'); setSelected(opt.value); }}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                  selected === opt.value 
                  ? 'bg-blue-600/20 border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
                  : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  {opt.icon && <span className={selected === opt.value ? 'text-blue-400' : ''}>{opt.icon}</span>}
                  <span className="text-[10px] font-bold uppercase tracking-widest">{opt.label}</span>
                </div>
                {selected === opt.value && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#60a5fa]" />}
              </button>
            ))}
          </div>
        </div>
      </div>
      <button 
        onClick={() => onStart(selected)}
        className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black uppercase tracking-[0.3em] shadow-xl shadow-blue-900/20 active:scale-95 transition-all flex items-center justify-center gap-2"
      >
        <Play size={16} fill="currentColor" /> Initialize Simulation
      </button>
    </motion.div>
  );
};

// --- SNAKE GAME COMPONENT ---
const SnakeGame: React.FC = () => {
  const GRID_SIZE = 20;
  const INITIAL_SNAKE = [[10, 10], [10, 11], [10, 12]];
  const INITIAL_DIRECTION = [0, -1];
  
  const [difficulty, setDifficulty] = useState<number | null>(null);
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState([5, 5]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  
  const directionRef = useRef(INITIAL_DIRECTION);
  const nextDirectionRef = useRef(INITIAL_DIRECTION);
  const gameLoopRef = useRef<number | null>(null);

  const generateFood = useCallback((currentSnake: number[][]) => {
    let newFood;
    while (true) {
      newFood = [Math.floor(Math.random() * GRID_SIZE), Math.floor(Math.random() * GRID_SIZE)];
      if (!currentSnake.some(p => p[0] === newFood![0] && p[1] === newFood![1])) break;
    }
    return newFood;
  }, []);

  const resetGame = (speed: number) => {
    playSound('start');
    setSnake(INITIAL_SNAKE);
    directionRef.current = INITIAL_DIRECTION;
    nextDirectionRef.current = INITIAL_DIRECTION;
    setFood(generateFood(INITIAL_SNAKE));
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
    setDifficulty(speed);
  };

  const moveSnake = useCallback(() => {
    directionRef.current = nextDirectionRef.current;
    setSnake(prevSnake => {
      const head = prevSnake[0];
      const [dx, dy] = directionRef.current;
      const newHead = [head[0] + dx, head[1] + dy];

      if (newHead[0] < 0 || newHead[0] >= GRID_SIZE || newHead[1] < 0 || newHead[1] >= GRID_SIZE || prevSnake.some(p => p[0] === newHead[0] && p[1] === newHead[1])) {
        playSound('gameover');
        setGameOver(true);
        setGameStarted(false);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];
      if (newHead[0] === food[0] && newHead[1] === food[1]) {
        playSound('score');
        setScore(s => s + 10);
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }
      return newSnake;
    });
  }, [food, generateFood]);

  useEffect(() => {
    if (gameStarted && !gameOver && difficulty) {
      gameLoopRef.current = window.setInterval(moveSnake, difficulty);
    } else if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    return () => { if (gameLoopRef.current) clearInterval(gameLoopRef.current); };
  }, [gameStarted, gameOver, moveSnake, difficulty]);

  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (!gameStarted) return;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) e.preventDefault();
      const current = directionRef.current;
      switch (e.key) {
        case 'ArrowUp': if (current[1] !== 1) nextDirectionRef.current = [0, -1]; break;
        case 'ArrowDown': if (current[1] !== -1) nextDirectionRef.current = [0, 1]; break;
        case 'ArrowLeft': if (current[0] !== 1) nextDirectionRef.current = [-1, 0]; break;
        case 'ArrowRight': if (current[0] !== -1) nextDirectionRef.current = [1, 0]; break;
      }
    };
    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [gameStarted]);

  if (!gameStarted && !gameOver) {
    return (
      <MissionBriefing 
        title="CyberSnake"
        instructions={[
          "Use arrow keys to navigate the data-harvester.",
          "Collect red memory nodes to increase sequence length.",
          "Avoid firewall boundaries and self-intersection.",
          "Higher intensities increase pulse frequency (speed)."
        ]}
        difficultyOptions={[
          { label: "Standard (110ms)", value: 110, icon: <ShieldAlert size={14} /> },
          { label: "Overclocked (70ms)", value: 70, icon: <Zap size={14} /> },
          { label: "Quantum (40ms)", value: 40, icon: <Skull size={14} /> }
        ]}
        onStart={resetGame}
      />
    );
  }

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10 shrink-0">
        <span className="text-[10px] font-mono text-blue-400 tracking-wider">NODES_RECOVERED: <span className="text-white font-bold">{score}</span></span>
        <button onClick={() => { setGameStarted(false); setGameOver(false); }} className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg transition-all text-white/50 hover:text-white"><RotateCcw size={16} /></button>
      </div>
      <div className="flex-1 bg-black/40 rounded-xl border border-white/5 relative overflow-hidden">
        <div className="aspect-square w-full h-full grid p-2 gap-[1px]" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`, gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)` }}>
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
            const x = i % GRID_SIZE, y = Math.floor(i / GRID_SIZE);
            const isSnake = snake.some(p => p[0] === x && p[1] === y);
            const isHead = snake[0][0] === x && snake[0][1] === y;
            const isFood = food[0] === x && food[1] === y;
            return <div key={i} className={`rounded-[1px] ${isHead ? 'bg-blue-400 shadow-[0_0_8px_#60a5fa]' : isSnake ? 'bg-blue-600/30' : isFood ? 'bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-white/[0.02]'}`} />;
          })}
        </div>
        <AnimatePresence>
          {gameOver && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 z-20">
              <Trophy size={40} className="text-yellow-500 mb-2" />
              <h3 className="text-xl font-black uppercase text-white tracking-widest mb-1">SEG_FAULT</h3>
              <p className="text-[10px] text-white/40 font-mono mb-6 uppercase">Buffer Overflow Detected</p>
              <button 
                onClick={() => { setGameStarted(false); setGameOver(false); }} 
                className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-all shadow-xl shadow-blue-900/40"
              >
                Return to Briefing
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- 2048 GAME COMPONENT ---
const Game2048: React.FC = () => {
  const [difficulty, setDifficulty] = useState<number | null>(null);
  const [grid, setGrid] = useState<number[][]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const addRandomTile = useCallback((currentGrid: number[][], size: number) => {
    const emptyCells = [];
    for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) if (currentGrid[r][c] === 0) emptyCells.push({ r, c });
    if (emptyCells.length === 0) return currentGrid;
    const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newGrid = currentGrid.map(row => [...row]);
    newGrid[r][c] = Math.random() < 0.9 ? 2 : 4;
    return newGrid;
  }, []);

  const checkGameOver = (currentGrid: number[][], size: number) => {
    // 1. Check for empty cells
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (currentGrid[r][c] === 0) return false;
      }
    }
    // 2. Check for adjacent identical values
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const val = currentGrid[r][c];
        // Check right
        if (c < size - 1 && currentGrid[r][c + 1] === val) return false;
        // Check down
        if (r < size - 1 && currentGrid[r + 1][c] === val) return false;
      }
    }
    return true;
  };

  const initGame = (size: number) => {
    playSound('start');
    let newGrid = Array(size).fill(0).map(() => Array(size).fill(0));
    newGrid = addRandomTile(newGrid, size);
    newGrid = addRandomTile(newGrid, size);
    setGrid(newGrid);
    setScore(0);
    setGameOver(false);
    setDifficulty(size);
  };

  const slide = (row: number[]) => {
    let arr = row.filter(val => val !== 0);
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] === arr[i + 1]) {
        playSound('score');
        arr[i] *= 2;
        setScore(prev => prev + arr[i]);
        arr[i + 1] = 0;
      }
    }
    arr = arr.filter(val => val !== 0);
    while (arr.length < (difficulty || 4)) arr.push(0);
    return arr;
  };

  const move = useCallback((direction: string) => {
    if (!difficulty || gameOver) return;
    setGrid(prev => {
      let currentGrid = prev.map(row => [...row]);
      let rotatedGrid: number[][] = [];
      if (direction === 'left') rotatedGrid = currentGrid;
      else if (direction === 'right') rotatedGrid = currentGrid.map(row => [...row].reverse());
      else if (direction === 'up') {
        for (let c = 0; c < difficulty; c++) {
          let col = [];
          for (let r = 0; r < difficulty; r++) col.push(currentGrid[r][c]);
          rotatedGrid.push(col);
        }
      } else if (direction === 'down') {
        for (let c = 0; c < difficulty; c++) {
          let col = [];
          for (let r = difficulty - 1; r >= 0; r--) col.push(currentGrid[r][c]);
          rotatedGrid.push(col);
        }
      }

      const movedGrid = rotatedGrid.map(row => slide(row));
      let finalGrid = Array(difficulty).fill(0).map(() => Array(difficulty).fill(0));
      if (direction === 'left') finalGrid = movedGrid;
      else if (direction === 'right') finalGrid = movedGrid.map(row => row.reverse());
      else if (direction === 'up') {
        for (let r = 0; r < difficulty; r++) for (let c = 0; c < difficulty; c++) finalGrid[r][c] = movedGrid[c][r];
      } else if (direction === 'down') {
        for (let r = 0; r < difficulty; r++) for (let c = 0; c < difficulty; c++) finalGrid[r][c] = movedGrid[c][difficulty - 1 - r];
      }

      if (JSON.stringify(prev) !== JSON.stringify(finalGrid)) {
        playSound('move');
        const nextGrid = addRandomTile(finalGrid, difficulty);
        if (checkGameOver(nextGrid, difficulty)) {
          playSound('gameover');
          setGameOver(true);
        }
        return nextGrid;
      }
      return prev;
    });
  }, [difficulty, addRandomTile, gameOver]);

  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (!difficulty || gameOver) return;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        move(e.key.replace('Arrow', '').toLowerCase());
      }
    };
    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [move, difficulty, gameOver]);

  if (!difficulty) {
    return (
      <MissionBriefing 
        title="BitMerge 2048"
        instructions={[
          "Slide tiles using Arrow keys.",
          "Merge tiles with same binary values to double them.",
          "Target: Synthesize the 2048 Bit-Unit.",
          "Choosing a 3x3 cache drastically reduces operation space."
        ]}
        difficultyOptions={[
          { label: "4x4 Standard Cluster", value: 4, icon: <Hash size={14} /> },
          { label: "3x3 Restricted Cache", value: 3, icon: <Zap size={14} /> }
        ]}
        onStart={initGame}
      />
    );
  }

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10 shrink-0">
        <span className="text-[10px] font-mono text-blue-400">DATA_SYNTH: <span className="text-white font-bold">{score}</span></span>
        <button onClick={() => { setDifficulty(null); setGameOver(false); }} className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg transition-all text-white/50 hover:text-white"><RotateCcw size={16} /></button>
      </div>
      <div className="flex-1 bg-black/20 p-2 rounded-xl border border-white/5 relative flex items-center justify-center overflow-hidden">
        <div className="grid gap-2 w-full max-w-[360px] aspect-square" style={{ gridTemplateColumns: `repeat(${difficulty}, 1fr)` }}>
          {grid.map((row, r) => row.map((val, c) => (
            <motion.div 
              key={`${r}-${c}`} 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`flex items-center justify-center rounded-lg text-lg font-black border transition-all ${
                val === 0 ? 'bg-white/5 border-transparent' : 'bg-blue-600/20 border-blue-500/40 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.1)]'
              }`}
            >
              {val !== 0 && val}
            </motion.div>
          )))}
        </div>
        <AnimatePresence>
          {gameOver && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 z-20 text-center">
              <Skull size={40} className="text-red-500 mb-2" />
              <h3 className="text-xl font-black uppercase text-white tracking-widest mb-1">CACHE_EXHAUSTED</h3>
              <p className="text-[10px] text-white/40 font-mono mb-6 uppercase">No valid merge operations remaining</p>
              <button 
                onClick={() => { setDifficulty(null); setGameOver(false); }} 
                className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-all shadow-xl shadow-blue-900/40"
              >
                Return to Briefing
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- TIC TAC TOE COMPONENT ---
const TicTacToe: React.FC = () => {
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  
  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (const [a, b, c] of lines) if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
    return squares.includes(null) ? null : 'Draw';
  };

  const winner = calculateWinner(board);

  const minimax = (newBoard: (string | null)[], player: string): any => {
    const availSpots = newBoard.map((v, i) => v === null ? i : null).filter(v => v !== null);
    const result = calculateWinner(newBoard);
    if (result === 'O') return { score: 10 };
    if (result === 'X') return { score: -10 };
    if (availSpots.length === 0) return { score: 0 };

    const moves = [];
    for (let i = 0; i < availSpots.length; i++) {
      const move: any = {};
      move.index = availSpots[i];
      newBoard[availSpots[i] as number] = player;
      if (player === 'O') move.score = minimax(newBoard, 'X').score;
      else move.score = minimax(newBoard, 'O').score;
      newBoard[availSpots[i] as number] = null;
      moves.push(move);
    }

    let bestMove;
    if (player === 'O') {
      let bestScore = -10000;
      for (let i = 0; i < moves.length; i++) if (moves[i].score > bestScore) { bestScore = moves[i].score; bestMove = i; }
    } else {
      let bestScore = 10000;
      for (let i = 0; i < moves.length; i++) if (moves[i].score < bestScore) { bestScore = moves[i].score; bestMove = i; }
    }
    return moves[bestMove as number];
  };

  const handleClick = (i: number) => {
    if (winner || board[i]) return;
    const newBoard = board.slice();
    newBoard[i] = 'X';
    setBoard(newBoard);
    setIsXNext(false);
    playSound('move');
  };

  useEffect(() => {
    if (!isXNext && difficulty === 'ai' && !winner) {
      const timer = setTimeout(() => {
        const bestMove = minimax(board.slice(), 'O');
        const newBoard = board.slice();
        newBoard[bestMove.index] = 'O';
        setBoard(newBoard);
        setIsXNext(true);
        playSound('move');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isXNext, difficulty, winner]);

  if (!difficulty) {
    return (
      <MissionBriefing 
        title="Signal Nexus"
        instructions={[
          "Align 3 logical markers (X or O) to secure the nexus.",
          "In Local Link, two users compete at the same terminal.",
          "The AI Sentinel uses a recursive logic-tree (Minimax) to prevent failure.",
          "AI Sentinel is computationally unbeatable. Attempt at your own risk."
        ]}
        difficultyOptions={[
          { label: "Local Peer Link", value: "local", icon: <User size={14} /> },
          { label: "AI Sentinel (Hard)", value: "ai", icon: <Cpu size={14} /> }
        ]}
        onStart={(val) => { playSound('start'); setDifficulty(val); setBoard(Array(9).fill(null)); setIsXNext(true); }}
      />
    );
  }

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10 shrink-0">
        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
          {winner ? `VERIFIED: ${winner}` : `WAITING_SIGNAL: ${isXNext ? 'X' : 'O'}`}
        </span>
        <button onClick={() => setDifficulty(null)} className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg transition-all text-white/50 hover:text-white"><RotateCcw size={16} /></button>
      </div>
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="grid grid-cols-3 gap-3 w-full max-w-[320px] aspect-square">
          {board.map((val, i) => (
            <button key={i} onClick={() => { if (difficulty === 'local' || isXNext) handleClick(i); if (difficulty === 'local' && !isXNext) { 
              if (winner || board[i]) return;
              const nb = board.slice(); nb[i] = 'O'; setBoard(nb); setIsXNext(true); playSound('move');
            }}} className={`rounded-xl border transition-all flex items-center justify-center text-3xl font-black ${
              val ? 'bg-blue-600/20 border-blue-500/40 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}>
              {val}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const GamesApp: React.FC = () => {
  const [currentGame, setCurrentGame] = useState<string>('menu');

  return (
    <div className="flex flex-col h-full bg-slate-950/20 rounded-xl overflow-hidden p-2">
      <AnimatePresence mode="wait">
        {currentGame === 'menu' ? (
          <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-4 p-4 h-full overflow-y-auto">
            <h2 className="text-xl font-black uppercase text-white italic mb-2 tracking-tight">Simulation_Deck_v4</h2>
            <div className="grid grid-cols-1 gap-3">
              {[
                { id: 'snake', name: 'CyberSnake', icon: <Cpu />, desc: 'High-speed sequence recovery' },
                { id: '2048', name: 'BitMerge 2048', icon: <Hash />, desc: 'Memory synthesis protocol' },
                { id: 'tictactoe', name: 'Signal Nexus', icon: <Grid3X3 />, desc: 'Logic gate security' }
              ].map(game => (
                <button key={game.id} onClick={() => { playSound('click'); setCurrentGame(game.id); }} className="group flex items-center gap-5 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all text-left shadow-lg">
                  <div className="p-3 rounded-xl bg-white/5 text-blue-400 group-hover:bg-blue-500/20 transition-colors">{game.icon}</div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white">{game.name}</h3>
                    <p className="text-[10px] text-white/30 font-mono mt-1">{game.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="game" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full gap-2">
            <button onClick={() => { playSound('click'); setCurrentGame('menu'); }} className="flex items-center gap-2 p-2 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all w-fit">
              <ChevronLeft size={14} /> Back to Deck
            </button>
            <div className="flex-1 min-h-0">
              {currentGame === 'snake' && <SnakeGame />}
              {currentGame === '2048' && <Game2048 />}
              {currentGame === 'tictactoe' && <TicTacToe />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GamesApp;
