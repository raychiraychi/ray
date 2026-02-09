import React, { useState } from 'react';
import { BaziInput, BaziResultData } from '../types';
import { generateBaziAnalysis } from '../services/geminiService';

const BaziFeature: React.FC = () => {
  const [step, setStep] = useState<'form' | 'loading' | 'result'>('form');
  const [formData, setFormData] = useState<BaziInput>({
    name: '',
    birthDate: '',
    birthTime: '',
    birthCity: '',
    gender: 'male',
    isLunar: false,
  });
  const [result, setResult] = useState<BaziResultData | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('loading');
    try {
      const data = await generateBaziAnalysis(formData);
      setResult(data);
      setStep('result');
    } catch (error) {
      alert("分析失败，请稍后重试");
      setStep('form');
    }
  };

  if (step === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <div className="w-20 h-20 border-4 border-[#8c3b2c] border-t-transparent rounded-full animate-spin mb-8 shadow-[0_0_15px_rgba(140,59,44,0.5)]"></div>
        <p className="text-2xl font-calligraphy text-[#d4af37]">大师正在排盘推演...</p>
        <p className="mt-3 text-sm text-[#9ca3af]">乾坤未定，请静心等候</p>
      </div>
    );
  }

  if (step === 'result' && result) {
    return (
      <div className="animate-fade-in space-y-8 pb-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-calligraphy text-[#d4af37] mb-3 drop-shadow-md">八字命盘详解</h2>
          <p className="text-[#9ca3af]">缘主：<span className="text-[#e5e0d4] font-bold">{formData.name}</span></p>
        </div>

        {/* The Grid Table mimicking the image */}
        <div className="border border-[#5c4a3f] p-1 bg-[#1a1614] shadow-2xl rounded-sm">
          <div className="grid grid-cols-5 gap-0.5 text-center border-b border-[#5c4a3f] bg-[#2c241f] font-bold text-lg p-2 text-[#d4af37]">
            <div></div>
            <div>年柱</div>
            <div>月柱</div>
            <div>日柱</div>
            <div>时柱</div>
          </div>
          
          <div className="grid grid-cols-5 gap-0.5 text-center border-b border-[#3d312a] py-5 items-center bg-[#1a1614]">
            <div className="font-bold text-[#8c3b2c] font-calligraphy text-xl">天干</div>
            <div className="text-[#e5e0d4]">{result.fourPillars.year.gan}</div>
            <div className="text-[#e5e0d4]">{result.fourPillars.month.gan}</div>
            <div className="text-[#e5e0d4]">{result.fourPillars.day.gan}</div>
            <div className="text-[#e5e0d4]">{result.fourPillars.hour.gan}</div>
          </div>
          
          <div className="grid grid-cols-5 gap-0.5 text-center border-b border-[#3d312a] py-5 items-center bg-[#1a1614]">
            <div className="font-bold text-[#8c3b2c] font-calligraphy text-xl">地支</div>
            <div className="text-[#e5e0d4]">{result.fourPillars.year.zhi}</div>
            <div className="text-[#e5e0d4]">{result.fourPillars.month.zhi}</div>
            <div className="text-[#e5e0d4]">{result.fourPillars.day.zhi}</div>
            <div className="text-[#e5e0d4]">{result.fourPillars.hour.zhi}</div>
          </div>

           <div className="grid grid-cols-5 gap-0.5 text-center py-5 items-center text-sm bg-[#1a1614]">
            <div className="font-bold text-[#9ca3af] text-base">十神</div>
            <div className="text-[#9ca3af]">{result.fourPillars.year.god}</div>
            <div className="text-[#9ca3af]">{result.fourPillars.month.god}</div>
            <div className="text-[#9ca3af]">{result.fourPillars.day.god}</div>
            <div className="text-[#9ca3af]">{result.fourPillars.hour.god}</div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8">
           <div className="bg-[#2c241f] p-6 rounded-lg border border-[#3d312a] shadow-lg">
             <Section title="命局总评" content={result.summary} />
             <Section title="五行强弱" content={result.fiveElements} />
             <Section title="大运流年" content={result.luckCycles.join(" → ")} />
           </div>
           
           <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#2c241f] p-6 rounded-lg border border-[#3d312a] shadow-lg">
                <Section title="性格分析" content={result.analysis.character} />
              </div>
              <div className="bg-[#2c241f] p-6 rounded-lg border border-[#3d312a] shadow-lg">
                <Section title="事业运势" content={result.analysis.career} />
              </div>
              <div className="bg-[#2c241f] p-6 rounded-lg border border-[#3d312a] shadow-lg">
                <Section title="婚姻情感" content={result.analysis.marriage} />
              </div>
              <div className="bg-[#2c241f] p-6 rounded-lg border border-[#3d312a] shadow-lg">
                <Section title="财运分析" content={result.analysis.wealth} />
              </div>
           </div>

           <div className="border-l-4 border-[#8c3b2c] pl-6 py-4 bg-[#2a221e] rounded-r-lg shadow-inner">
              <h3 className="text-2xl font-calligraphy text-[#8c3b2c] mb-3">大师建议</h3>
              <p className="text-lg leading-relaxed text-[#e5e0d4]">{result.analysis.advice}</p>
           </div>
        </div>
        
        <div className="text-center pt-8">
            <button 
              onClick={() => setStep('form')}
              className="bg-transparent border border-[#5c4a3f] text-[#9ca3af] px-8 py-3 rounded-md text-lg hover:border-[#d4af37] hover:text-[#d4af37] transition"
            >
              测算他人
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-[#2c241f] p-8 md:p-12 rounded-xl shadow-2xl border border-[#3d312a] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1c1815] via-[#8c3b2c] to-[#1c1815]"></div>
      
      <h2 className="text-3xl font-calligraphy text-center text-[#d4af37] mb-10 drop-shadow">生辰八字排盘</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-bold text-[#9ca3af] mb-2">缘主姓名</label>
          <input 
            type="text" 
            required
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            className="w-full bg-[#1a1614] border border-[#5c4a3f] p-4 text-lg text-[#e5e0d4] focus:border-[#d4af37] outline-none rounded shadow-inner transition-colors"
            placeholder="请输入姓名"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
           <div>
            <label className="block text-lg font-bold text-[#9ca3af] mb-2">性别</label>
            <div className="relative">
              <select 
                value={formData.gender}
                onChange={e => setFormData({...formData, gender: e.target.value as 'male'|'female'})}
                className="w-full bg-[#1a1614] border border-[#5c4a3f] p-4 text-lg text-[#e5e0d4] focus:border-[#d4af37] outline-none rounded appearance-none shadow-inner"
              >
                <option value="male">男</option>
                <option value="female">女</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#9ca3af]">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-lg font-bold text-[#9ca3af] mb-2">历法</label>
            <div className="relative">
              <select 
                value={formData.isLunar ? "true" : "false"}
                onChange={e => setFormData({...formData, isLunar: e.target.value === "true"})}
                className="w-full bg-[#1a1614] border border-[#5c4a3f] p-4 text-lg text-[#e5e0d4] focus:border-[#d4af37] outline-none rounded appearance-none shadow-inner"
              >
                <option value="false">阳历 (公历)</option>
                <option value="true">农历 (阴历)</option>
              </select>
               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#9ca3af]">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-bold text-[#9ca3af] mb-2">出生日期</label>
            <input 
              type="date" 
              required
              value={formData.birthDate}
              onChange={e => setFormData({...formData, birthDate: e.target.value})}
              className="w-full bg-[#1a1614] border border-[#5c4a3f] p-4 text-lg text-[#e5e0d4] focus:border-[#d4af37] outline-none rounded shadow-inner [color-scheme:dark]"
            />
          </div>
          <div>
            <label className="block text-lg font-bold text-[#9ca3af] mb-2">出生时间</label>
            <input 
              type="time" 
              required
              value={formData.birthTime}
              onChange={e => setFormData({...formData, birthTime: e.target.value})}
              className="w-full bg-[#1a1614] border border-[#5c4a3f] p-4 text-lg text-[#e5e0d4] focus:border-[#d4af37] outline-none rounded shadow-inner [color-scheme:dark]"
            />
          </div>
        </div>

        <div>
          <label className="block text-lg font-bold text-[#9ca3af] mb-2">出生地点</label>
          <input 
            type="text" 
            required
            value={formData.birthCity}
            onChange={e => setFormData({...formData, birthCity: e.target.value})}
            className="w-full bg-[#1a1614] border border-[#5c4a3f] p-4 text-lg text-[#e5e0d4] focus:border-[#d4af37] outline-none rounded shadow-inner"
            placeholder="例如：北京市朝阳区"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-[#8c3b2c] to-[#6b2c20] text-[#e5e0d4] text-xl font-bold py-4 rounded shadow-lg hover:shadow-[#8c3b2c]/30 hover:to-[#8c3b2c] transition mt-6 font-calligraphy tracking-[0.2em] border border-[#a64e3e]"
        >
          立即排盘
        </button>
      </form>
    </div>
  );
};

const Section: React.FC<{title: string, content: string}> = ({title, content}) => (
  <div className="mb-6 last:mb-0">
    <h3 className="text-xl font-bold text-[#d4af37] border-b border-[#5c4a3f] pb-2 mb-3 inline-block">
      {title}
    </h3>
    <p className="text-lg leading-relaxed text-justify text-[#e5e0d4] opacity-90">{content}</p>
  </div>
);

export default BaziFeature;