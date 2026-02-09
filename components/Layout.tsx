import React from 'react';
import { ViewState } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, setView }) => {
  return (
    <div className="min-h-screen flex flex-col text-[#e5e0d4]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#1c1815] bg-opacity-95 border-b border-[#5c4a3f] shadow-lg backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={() => setView('home')}
          >
             {/* Logo */}
            <div className="w-10 h-10 bg-[#2a221e] text-[#d4af37] rounded-full flex items-center justify-center font-calligraphy text-xl mr-3 border border-[#d4af37] group-hover:bg-[#8c3b2c] group-hover:border-[#8c3b2c] group-hover:text-white transition-colors duration-500">
              易
            </div>
            <h1 className="text-2xl md:text-3xl font-calligraphy text-[#d4af37] tracking-wider">大易文化</h1>
          </div>
          
          <nav className="hidden md:flex space-x-8 text-lg font-medium text-[#9ca3af]">
            <button onClick={() => setView('home')} className={`hover:text-[#d4af37] transition-colors duration-300 ${currentView === 'home' ? 'text-[#d4af37] font-bold' : ''}`}>首页</button>
            <button onClick={() => setView('bazi')} className={`hover:text-[#d4af37] transition-colors duration-300 ${currentView === 'bazi' ? 'text-[#d4af37] font-bold' : ''}`}>八字精批</button>
            <button onClick={() => setView('numerology')} className={`hover:text-[#d4af37] transition-colors duration-300 ${currentView === 'numerology' ? 'text-[#d4af37] font-bold' : ''}`}>数字能量</button>
            <button onClick={() => setView('divination')} className={`hover:text-[#d4af37] transition-colors duration-300 ${currentView === 'divination' ? 'text-[#d4af37] font-bold' : ''}`}>问事抽签</button>
          </nav>

          {/* Mobile Menu Button (Simple) */}
          <div className="md:hidden">
             <button className="text-[#d4af37] font-bold font-calligraphy" onClick={() => setView('home')}>
                主页
             </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-4xl mx-auto px-4 py-6 md:py-10">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1c1815] border-t border-[#5c4a3f] flex justify-around py-4 z-40 text-sm font-bold shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
        <button onClick={() => setView('bazi')} className={`flex flex-col items-center ${currentView === 'bazi' ? 'text-[#d4af37]' : 'text-[#9ca3af]'}`}>
           <span>八字</span>
        </button>
        <button onClick={() => setView('numerology')} className={`flex flex-col items-center ${currentView === 'numerology' ? 'text-[#d4af37]' : 'text-[#9ca3af]'}`}>
           <span>数字</span>
        </button>
        <button onClick={() => setView('divination')} className={`flex flex-col items-center ${currentView === 'divination' ? 'text-[#d4af37]' : 'text-[#9ca3af]'}`}>
           <span>抽签</span>
        </button>
        <button onClick={() => setView('ask')} className={`flex flex-col items-center ${currentView === 'ask' ? 'text-[#d4af37]' : 'text-[#9ca3af]'}`}>
           <span>问答</span>
        </button>
      </nav>

      {/* Footer */}
      <footer className="bg-[#0f0c0b] text-[#9ca3af] py-10 text-center pb-24 md:pb-10 border-t border-[#2c241f]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-calligraphy text-[#8c3b2c] mb-4">大易文化</h2>
          <p className="mb-2 text-sm opacity-80 tracking-widest">传承国学经典 · 弘扬易学智慧</p>
          <div className="w-12 h-0.5 bg-[#5c4a3f] mx-auto my-6"></div>
          <p className="text-xs opacity-40">© 2024 Da Yi Culture. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;