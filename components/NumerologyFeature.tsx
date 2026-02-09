import React, { useState } from 'react';
import { analyzeNumerology } from '../services/geminiService';
import { NumerologyResult } from '../types';

const NumerologyFeature: React.FC = () => {
  const [type, setType] = useState<'phone' | 'id'>('phone');
  const [number, setNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<NumerologyResult | null>(null);

  const handleAnalyze = async () => {
    if (!number) return;
    setLoading(true);
    setResult(null);
    try {
      const data = await analyzeNumerology(type, number);
      setResult(data);
    } catch (e) {
      alert("分析出现错误，请检查网络或输入");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-calligraphy text-[#d4af37] mb-2 drop-shadow">数字觉醒 · 能量分析</h2>
        <p className="text-[#9ca3af]">万物皆数，解析您身边的数字磁场</p>
      </div>

      <div className="max-w-xl mx-auto bg-[#2c241f] p-8 rounded-lg shadow-xl border border-[#3d312a]">
        <div className="flex space-x-4 mb-8 justify-center">
          <button 
            onClick={() => { setType('phone'); setResult(null); }}
            className={`px-8 py-2 rounded-sm text-lg transition-all border ${type === 'phone' ? 'bg-[#8c3b2c] text-[#e5e0d4] border-[#8c3b2c]' : 'bg-transparent text-[#9ca3af] border-[#5c4a3f] hover:text-[#d4af37] hover:border-[#d4af37]'}`}
          >
            手机号分析
          </button>
          <button 
            onClick={() => { setType('id'); setResult(null); }}
            className={`px-8 py-2 rounded-sm text-lg transition-all border ${type === 'id' ? 'bg-[#8c3b2c] text-[#e5e0d4] border-[#8c3b2c]' : 'bg-transparent text-[#9ca3af] border-[#5c4a3f] hover:text-[#d4af37] hover:border-[#d4af37]'}`}
          >
            身份证分析
          </button>
        </div>

        <div className="space-y-6">
          <input 
            type="text" 
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder={type === 'phone' ? "请输入手机号码" : "请输入身份证号码"}
            className="w-full bg-[#1a1614] border border-[#5c4a3f] p-4 text-xl text-center text-[#d4af37] focus:border-[#d4af37] outline-none rounded shadow-inner tracking-widest transition-colors"
          />
          <button 
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#4a3b32] to-[#3d312a] border border-[#5c4a3f] text-[#d4af37] py-4 text-xl font-bold rounded shadow-lg hover:border-[#d4af37] hover:text-[#fff] transition disabled:opacity-50"
          >
            {loading ? '正在推演...' : '开始解析'}
          </button>
        </div>
      </div>

      {result && (
        <div className="animate-fade-in bg-[#2c241f] p-8 md:p-10 rounded-lg shadow-2xl border-t-4 border-[#8c3b2c] relative">
          <div className="flex justify-between items-center mb-6 border-b border-[#3d312a] pb-4">
            <h3 className="text-2xl font-calligraphy text-[#e5e0d4]">分析报告</h3>
            <div className="text-right">
              <span className="block text-sm text-[#9ca3af]">能量评分</span>
              <span className={`text-4xl font-bold font-mono ${result.score > 80 ? 'text-[#4ade80]' : result.score > 60 ? 'text-[#d4af37]' : 'text-[#f87171]'}`}>
                {result.score} <span className="text-lg">分</span>
              </span>
            </div>
          </div>
          
          <div className="mb-8">
            <h4 className="text-lg font-bold text-[#d4af37] mb-3">磁场解读</h4>
            <p className="text-lg leading-loose text-justify text-[#e5e0d4] opacity-90">{result.analysis}</p>
          </div>

          <div className="bg-[#1a1614] p-6 rounded border border-[#3d312a] shadow-inner">
            <h4 className="text-lg font-bold text-[#8c3b2c] mb-3">
              {type === 'phone' ? '改运建议' : '化解之道'}
            </h4>
            <p className="text-lg leading-relaxed text-[#e5e0d4] opacity-90">{result.advice}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NumerologyFeature;