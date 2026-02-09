import React from 'react';
import { ViewState } from '../types';

interface MasterHomeProps {
  setView: (view: ViewState) => void;
}

const MasterHome: React.FC<MasterHomeProps> = ({ setView }) => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative bg-[#2c241f] rounded-xl overflow-hidden shadow-2xl border border-[#3d312a] p-6 md:p-10 flex flex-col md:flex-row items-center gap-8">
        {/* Glow Effect */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-[#8c3b2c] opacity-10 blur-[100px] rounded-full pointer-events-none"></div>
        
        {/* Master Image Area */}
        <div className="w-full md:w-1/2 flex justify-center z-10">
            {/* Placeholder for Master Li's Image */}
            <div className="relative group">
              <div className="absolute inset-0 bg-[#d4af37] rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <img 
                src="https://picsum.photos/400/500?grayscale" 
                alt="李治儒老师" 
                className="relative rounded-lg shadow-2xl object-cover h-[400px] w-[300px] border border-[#5c4a3f] brightness-90 contrast-110"
              />
              <div className="absolute -bottom-4 -right-4 bg-[#8c3b2c] text-[#e5e0d4] px-5 py-2 text-lg font-bold shadow-xl rounded-tl-lg font-calligraphy border border-[#5c4a3f]">
                李治儒 老师
              </div>
            </div>
        </div>

        {/* Intro Text */}
        <div className="w-full md:w-1/2 space-y-6 z-10 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-calligraphy text-[#d4af37] leading-tight">
            传承易学经典 <br/> <span className="text-[#e5e0d4] text-3xl md:text-4xl mt-2 block">开启智慧人生</span>
          </h2>
          <p className="text-lg leading-relaxed text-[#9ca3af] text-justify">
            李治儒，资深国学易学传承人，深耕易理数术多年。
            不仅精通传统子平八字，更著有《数字觉醒》一书，
            独创数字能量磁场分析体系，致力于将古老智慧与现代生活相结合，
            帮助福主知命改运，趋吉避凶。
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <span className="px-3 py-1 bg-[#1a1614] border border-[#3d312a] text-[#8c3b2c] rounded text-sm tracking-wide">#国学讲师</span>
            <span className="px-3 py-1 bg-[#1a1614] border border-[#3d312a] text-[#8c3b2c] rounded text-sm tracking-wide">#数字能量学</span>
            <span className="px-3 py-1 bg-[#1a1614] border border-[#3d312a] text-[#8c3b2c] rounded text-sm tracking-wide">#八字命理</span>
          </div>
          
          <button 
             onClick={() => setView('bazi')}
             className="mt-4 bg-gradient-to-r from-[#8c3b2c] to-[#5e261c] text-[#e5e0d4] px-10 py-3 rounded border border-[#a64e3e] text-lg font-bold shadow-lg hover:shadow-[#8c3b2c]/40 hover:scale-105 transition transform w-full md:w-auto font-calligraphy tracking-widest"
          >
            立即排盘
          </button>
        </div>
      </div>

      {/* Feature Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard 
          title="八字精批" 
          desc="洞悉流年运势，掌握人生起伏" 
          onClick={() => setView('bazi')}
          icon="命"
        />
        <FeatureCard 
          title="数字能量" 
          desc="解析手机号码，调整磁场运势" 
          onClick={() => setView('numerology')}
          icon="数"
        />
        <FeatureCard 
          title="问事抽签" 
          desc="心诚则灵，一签解千愁" 
          onClick={() => setView('divination')}
          icon="签"
        />
      </div>

      {/* Contact & QR Code Section */}
      <div className="bg-[#1a1614] border border-[#3d312a] rounded-xl p-8 shadow-2xl mt-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8c3b2c] to-transparent opacity-50"></div>
         
         <div className="space-y-4 text-center md:text-left z-10">
           <h3 className="text-3xl font-calligraphy text-[#d4af37]">命运详解精批注</h3>
           <p className="text-[#9ca3af] text-lg">
             添加老师微信，获取一对一深度咨询。
           </p>
           <div className="inline-block px-6 py-3 rounded bg-[#2c241f] border border-[#3d312a] shadow-inner">
             <p className="text-2xl font-bold text-[#e5e0d4] font-mono tracking-wider">
               微信号：<span className="text-[#d4af37]">lgj141319</span>
             </p>
           </div>
         </div>
         <div className="bg-white p-2 rounded-lg shadow-lg z-10">
            {/* Placeholder for QR Code */}
            <img 
              src="https://picsum.photos/200/200" 
              alt="微信二维码" 
              className="w-40 h-40 object-cover"
            />
         </div>
      </div>
      
      {/* Warm Tips */}
      <div className="text-center text-[#5c4a3f] text-sm mt-12 italic font-serif">
         “ 顺势而为，方能乘风破浪；知命改运，始得自在人生。”
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{title: string, desc: string, onClick: () => void, icon: string}> = ({title, desc, onClick, icon}) => (
  <div 
    onClick={onClick}
    className="bg-[#2c241f] border border-[#3d312a] p-8 rounded-lg shadow-lg hover:shadow-2xl hover:border-[#8c3b2c] transition duration-300 cursor-pointer group text-center relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a1614] opacity-50"></div>
    <div className="relative z-10">
        <div className="w-16 h-16 bg-[#1a1614] text-[#d4af37] rounded-full flex items-center justify-center text-3xl font-calligraphy mx-auto mb-5 border border-[#3d312a] group-hover:bg-[#8c3b2c] group-hover:text-white group-hover:border-[#8c3b2c] transition duration-300 shadow-inner">
        {icon}
        </div>
        <h3 className="text-xl font-bold text-[#e5e0d4] mb-2 group-hover:text-[#d4af37] transition">{title}</h3>
        <p className="text-[#9ca3af] text-sm group-hover:text-[#b0b0b0] transition">{desc}</p>
    </div>
  </div>
);

export default MasterHome;