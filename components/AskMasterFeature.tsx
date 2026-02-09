import React, { useState } from 'react';
import { askMaster } from '../services/geminiService';

const AskMasterFeature: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer('');
    try {
      const response = await askMaster(question);
      setAnswer(response);
    } catch (e) {
      setAnswer("网络繁忙，请稍后再试。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 min-h-[60vh]">
      <div className="text-center">
        <h2 className="text-3xl font-calligraphy text-[#d4af37] mb-2 drop-shadow">专属问答 · 答案之书</h2>
        <p className="text-[#9ca3af]">心中疑惑，皆有定数。大师为您指点迷津。</p>
      </div>

      <div className="bg-[#2c241f] p-8 rounded-lg shadow-xl border border-[#3d312a]">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="在此输入您想咨询的运势、困惑..."
          className="w-full h-40 bg-[#1a1614] border border-[#5c4a3f] p-4 text-lg text-[#e5e0d4] focus:border-[#d4af37] outline-none rounded resize-none mb-6 shadow-inner placeholder-gray-600"
        />
        <button
          onClick={handleAsk}
          disabled={loading || !question}
          className="w-full bg-gradient-to-r from-[#4a3b32] to-[#3d312a] border border-[#5c4a3f] text-[#d4af37] py-4 text-xl font-bold rounded shadow-lg hover:border-[#d4af37] hover:text-[#fff] transition disabled:opacity-50"
        >
          {loading ? '大师思考中...' : '敬请指点'}
        </button>
      </div>

      {answer && (
        <div className="animate-fade-in relative bg-[#1c1815] border-y border-[#8c3b2c] p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] mx-4">
           {/* Decorative corners */}
           <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#8c3b2c]"></div>
           <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#8c3b2c]"></div>
           <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#8c3b2c]"></div>
           <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#8c3b2c]"></div>

           <h3 className="text-center font-calligraphy text-2xl text-[#d4af37] mb-6 drop-shadow">大师批语</h3>
           <p className="text-xl leading-loose text-justify text-[#e5e0d4] font-serif opacity-90">
             {answer}
           </p>
           <div className="text-right mt-8">
             <span className="inline-block border border-[#5c4a3f] text-[#8c3b2c] px-3 py-1 text-xs rounded tracking-wider">
               大易文化
             </span>
           </div>
        </div>
      )}
    </div>
  );
};

export default AskMasterFeature;