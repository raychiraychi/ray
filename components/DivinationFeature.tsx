import React, { useState } from 'react';
import { DivinationResult } from '../types';

// Pre-defined simple results
const LOT_RESULTS: DivinationResult[] = [
  { level: '大', luck: '吉', poem: '春风得意马蹄疾，一日看尽长安花。', explanation: '时来运转，万事顺遂，心中所想之事必有大成。' },
  { level: '中', luck: '吉', poem: '山重水复疑无路，柳暗花明又一村。', explanation: '初看困难，坚持下去必有转机，结果令人欣喜。' },
  { level: '小', luck: '吉', poem: '润物细无声，随风潜入夜。', explanation: '福气悄然而至，虽无轰轰烈烈，但胜在平稳安康。' },
  { level: '小', luck: '凶', poem: '欲速则不达，静待时机至。', explanation: '当前时机未成熟，强求无益，宜静守等待。' },
  { level: '中', luck: '凶', poem: '屋漏偏逢连夜雨，船迟又遇打头风。', explanation: '阻碍较多，需格外谨慎，凡事多做二手准备。' },
  { level: '大', luck: '吉', poem: '长风破浪会有时，直挂云帆济沧海。', explanation: '宏图大展，贵人相助，事业运极佳。' },
];

const DivinationFeature: React.FC = () => {
  const [isShaking, setIsShaking] = useState(false);
  const [result, setResult] = useState<DivinationResult | null>(null);

  const drawLot = () => {
    setIsShaking(true);
    setResult(null);
    // Simulate animation time
    setTimeout(() => {
      const random = LOT_RESULTS[Math.floor(Math.random() * LOT_RESULTS.length)];
      setResult(random);
      setIsShaking(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-10">
       <div className="space-y-2">
           <h2 className="text-3xl font-calligraphy text-[#d4af37]">诚心问事 · 灵签指引</h2>
           <p className="text-[#9ca3af] text-lg max-w-md mx-auto">
             请在心中默念您想问的事情，保持心诚，然后点击签筒。
           </p>
       </div>

       <div className="relative h-72 w-72 flex items-center justify-center">
         {/* Simple CSS illustration of a Lot Pot - Dark Version */}
         <div 
            onClick={!isShaking ? drawLot : undefined}
            className={`w-36 h-56 bg-gradient-to-b from-[#3d312a] to-[#1c1815] rounded-b-3xl rounded-t-lg border-2 border-[#d4af37] relative flex justify-center cursor-pointer transition-transform shadow-[0_10px_30px_rgba(0,0,0,0.5)] ${isShaking ? 'animate-bounce' : 'hover:scale-105'}`}
          >
            <div className="absolute top-6 w-24 h-24 bg-[#8c3b2c] rounded-full flex items-center justify-center text-[#d4af37] font-calligraphy text-5xl border-4 border-[#d4af37] shadow-lg">
              签
            </div>
            {/* Sticks */}
            <div className="absolute -top-10 w-2 h-20 bg-[#e5e0d4] transform -rotate-12 left-10 shadow-md"></div>
            <div className="absolute -top-12 w-2 h-24 bg-[#e5e0d4] transform rotate-6 right-12 shadow-md"></div>
            <div className="absolute -top-8 w-2 h-16 bg-[#e5e0d4] transform rotate-12 right-8 shadow-md"></div>
         </div>
       </div>

       {isShaking && <p className="text-xl font-bold text-[#8c3b2c] animate-pulse">正在摇签...</p>}

       {result && (
         <div className="animate-fade-in-up bg-[#e5e0d4] text-[#1c1815] border-2 border-[#8c3b2c] p-8 max-w-md w-full shadow-[0_0_50px_rgba(140,59,44,0.3)] relative overflow-hidden rounded-sm">
           <div className="absolute top-0 left-0 w-full h-3 bg-[#8c3b2c]"></div>
           <div className="absolute bottom-0 left-0 w-full h-3 bg-[#8c3b2c]"></div>
           
           <div className="flex justify-center items-baseline space-x-3 mb-6">
             <span className="text-6xl font-calligraphy text-[#8c3b2c]">{result.level}</span>
             <span className="text-6xl font-calligraphy text-[#1c1815]">{result.luck}</span>
           </div>

           <div className="my-6 relative">
             <div className="w-8 h-0.5 bg-[#8c3b2c] mx-auto mb-4"></div>
             <p className="text-2xl font-serif italic text-[#4a3b32] mb-2 leading-snug">“{result.poem}”</p>
             <div className="w-8 h-0.5 bg-[#8c3b2c] mx-auto mt-4"></div>
           </div>
           
           <div className="bg-[#fffefc] p-5 rounded text-left border border-[#d6d0c4] shadow-sm">
             <span className="block font-bold text-[#8c3b2c] mb-1 text-lg">【大师指引】</span>
             <p className="text-lg text-[#4a3b32]">{result.explanation}</p>
           </div>
         </div>
       )}
    </div>
  );
};

export default DivinationFeature;