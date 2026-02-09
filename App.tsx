import React, { useState, useEffect, useRef } from 'react';
import Layout from './components/Layout';
import MasterHome from './components/MasterHome';
import BaziFeature from './components/BaziFeature';
import NumerologyFeature from './components/NumerologyFeature';
import DivinationFeature from './components/DivinationFeature';
import AskMasterFeature from './components/AskMasterFeature';
import { ViewState } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Background Music Logic
  useEffect(() => {
    // Try to play audio on load, but catch error (browsers block this usually)
    const initAudio = async () => {
      if(audioRef.current) {
         audioRef.current.volume = 0.4; // Moderate volume
         try {
           await audioRef.current.play();
           setIsPlaying(true);
         } catch(e) {
           console.log("Autoplay blocked, waiting for interaction");
         }
      }
    };
    initAudio();

    // Add listener for first user interaction
    const playAudioOnInteract = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log("Play failed", e));
      }
    };

    document.addEventListener('click', playAudioOnInteract, { once: true });
    document.addEventListener('touchstart', playAudioOnInteract, { once: true });

    return () => {
      document.removeEventListener('click', playAudioOnInteract);
      document.removeEventListener('touchstart', playAudioOnInteract);
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log(e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <MasterHome setView={setCurrentView} />;
      case 'bazi':
        return <BaziFeature />;
      case 'numerology':
        return <NumerologyFeature />;
      case 'divination':
        return <DivinationFeature />;
      case 'ask':
        return <AskMasterFeature />;
      default:
        return <MasterHome setView={setCurrentView} />;
    }
  };

  return (
    <Layout currentView={currentView} setView={setCurrentView}>
      {renderContent()}

      {/* Music Control / Hidden Audio */}
      {/* Reliable Chinese Bamboo Flute / Zen source */}
      <audio ref={audioRef} loop src="https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3" />
      
      <button 
        onClick={toggleMusic}
        className={`fixed bottom-20 right-4 md:bottom-8 md:right-8 z-50 p-3 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.3)] border border-[#d4af37] transition-all hover:scale-110 ${isPlaying ? 'bg-[#8c3b2c] animate-spin-slow' : 'bg-[#2c241f] text-[#9ca3af]'}`}
        style={{ animationDuration: '6s' }}
        title={isPlaying ? "暂停音乐" : "播放音乐"}
      >
        <span className="text-xl text-[#d4af37]">♫</span>
      </button>
    </Layout>
  );
}

export default App;