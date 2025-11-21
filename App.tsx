
import React, { useState, useEffect } from 'react';
import StarBackground from './components/StarBackground';
import Typewriter from './components/Typewriter';
import Planet3D from './components/Planet3D';
import { DESTINATIONS } from './constants';
import { Destination, TravelStatus } from './types';
import { generateTravelLog } from './services/geminiService';
import { audioService } from './services/audioService';

const GASES = ['氮气', '二氧化碳', '甲烷', '氢气'];
const LOADING_BAR_ARRAY = [1, 2, 3];

const App: React.FC = () => {
  const [status, setStatus] = useState<TravelStatus>('IDLE');
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);
  const [travelLog, setTravelLog] = useState<string>('');
  const [loadingLog, setLoadingLog] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [audioInitialized, setAudioInitialized] = useState(false);

  useEffect(() => {
    const handleInteraction = () => {
      if (!audioInitialized) {
        audioService.init();
        audioService.resume();
        setAudioInitialized(true);
      }
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [audioInitialized]);

  const handleSelectDestination = (dest: Destination) => {
    if (selectedDest?.id !== dest.id) {
       audioService.playClick();
    }
    setSelectedDest(dest);
  };

  const handleMouseEnter = () => {
    audioService.playHover();
  };

  const initiateWarp = async () => {
    if (!selectedDest) return;
    
    audioService.playClick();
    audioService.playWarpEngage();

    setShowMenu(false);
    setStatus('WARPING');
    setTravelLog('');

    setTimeout(() => {
      setStatus('ARRIVED');
      audioService.playArrival();
      fetchLog();
    }, 4500);
  };

  const fetchLog = async () => {
    if (!selectedDest) return;
    setLoadingLog(true);
    const log = await generateTravelLog(selectedDest);
    setTravelLog(log);
    setLoadingLog(false);
  };

  const handleReturn = () => {
    audioService.playClick();
    setStatus('IDLE');
    setSelectedDest(null);
    setShowMenu(true);
    setTravelLog('');
  };

  const getStatusText = (s: TravelStatus) => {
    if (s === 'IDLE') return '系统待机 (STANDBY)';
    if (s === 'WARPING') return '跃迁引擎启动 (ENGAGED)';
    if (s === 'ARRIVED') return '抵达目的地 (ARRIVED)';
    return '';
  };

  const getStatusColor = (s: TravelStatus) => {
    if (s === 'IDLE') return 'bg-green-500 animate-pulse';
    if (s === 'WARPING') return 'bg-red-500 animate-ping';
    return 'bg-cyan-500';
  };

  return (
    <div className="relative w-full min-h-screen text-white selection:bg-cyan-500 selection:text-black overflow-hidden">
      <div className="scanline" />
      <StarBackground isWarping={status === 'WARPING'} />

      {!audioInitialized && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center cursor-pointer backdrop-blur-sm">
           <div className="text-center animate-pulse">
             <p className="text-cyan-500 font-mono text-lg tracking-[0.5em] border border-cyan-500 px-8 py-4 rounded hover:bg-cyan-900/30 transition-colors">
               &gt;&gt;&gt; 点击接入神经链路 &lt;&lt;&lt;
             </p>
           </div>
        </div>
      )}

      <header className="fixed top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-50 pointer-events-none">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${getStatusColor(status)}`} />
          <span className="font-mono text-xs md:text-sm tracking-widest opacity-80 brand-font">状态: {getStatusText(status)}</span>
        </div>
        <div className="text-right">
          <h1 className="text-xl md:text-2xl font-bold tracking-tighter hologram-glow">星际导航系统</h1>
          <p className="text-[10px] md:text-xs text-cyan-400 font-mono">版本 3.0.1 // 深度空间</p>
        </div>
      </header>

      <main className="relative z-10 w-full h-screen flex flex-col items-center justify-center p-4">
        
        {status === 'IDLE' && showMenu && (
          <div className="w-full max-w-7xl animate-[fadeIn_1s_ease-out] flex flex-col h-full pt-20 pb-24">
            <div className="text-center mb-8 md:mb-12 flex-shrink-0">
              <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-widest hologram-glow uppercase">
                选择跃迁坐标
              </h2>
              <p className="text-cyan-300/80 font-mono text-sm md:text-lg">
                正在扫描附近扇区... 发现 {DESTINATIONS.length} 个宜居信号
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4 overflow-y-auto hide-scrollbar flex-grow">
              {DESTINATIONS.map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => handleSelectDestination(dest)}
                  onMouseEnter={handleMouseEnter}
                  className={`group relative p-6 border bg-black/60 backdrop-blur-md transition-all duration-300 text-left flex flex-col hover:bg-cyan-900/20 hover:scale-[1.02] ${selectedDest?.id === dest.id ? dest.color + ' border-opacity-100 bg-opacity-30 scale-[1.02] ring-1 ring-current' : 'border-white/10 hover:border-cyan-400/50'}`}
                >
                  <div className="absolute top-0 right-0 p-2 opacity-50 font-mono text-[10px]">ID: {dest.id.toUpperCase()}</div>
                  
                  <div className="flex items-center gap-4 mb-4">
                      <div 
                        className={`w-12 h-12 rounded-full overflow-hidden border border-white/20 ${selectedDest?.id === dest.id ? 'animate-spin' : ''}`}
                        style={{ animationDuration: '20s' }}
                      >
                           {dest.id !== 'blackhole_cygnus' ? (
                               <img src={dest.imagePlaceholder} alt="" className="w-full h-full object-cover opacity-80" />
                           ) : (
                               <div className="w-full h-full bg-black border-2 border-white/50 rounded-full" />
                           )}
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold ${selectedDest?.id === dest.id ? '' : 'text-gray-200'}`}>
                            {dest.name}
                        </h3>
                        <p className="text-xs font-mono opacity-70">{dest.type}</p>
                      </div>
                  </div>
                  
                  <p className="text-xs font-mono mb-4 opacity-70 border-t border-white/10 pt-2">距离: {dest.distance}</p>
                  <p className="text-sm opacity-80 line-clamp-2">{dest.description}</p>
                  
                  {selectedDest?.id === dest.id && (
                    <div className="mt-auto pt-4 animate-pulse flex justify-between items-center">
                      <span className="text-xs font-bold tracking-wider uppercase bg-current text-black px-2 py-0.5 rounded-sm">已锁定</span>
                      <span className="text-[10px] font-mono">准备就绪</span>
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="flex-shrink-0 pt-6 flex justify-center">
               <button
                 disabled={!selectedDest}
                 onClick={initiateWarp}
                 onMouseEnter={selectedDest ? handleMouseEnter : undefined}
                 className={`relative overflow-hidden group px-12 py-4 text-xl font-bold tracking-[0.2em] uppercase border-2 transition-all duration-500 ${selectedDest ? 'bg-cyan-600/20 text-cyan-100 border-cyan-500 hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] cursor-pointer' : 'bg-gray-900/50 text-gray-600 border-gray-800 cursor-not-allowed'}`}
                 style={{ clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)' }}
               >
                 <span className="relative z-10">{selectedDest ? '启动 光速跃迁' : '等待目标确认'}</span>
                 {selectedDest && <div className="absolute inset-0 bg-cyan-400/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />}
               </button>
            </div>
          </div>
        )}

        {status === 'WARPING' && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-cyan-500/10 mix-blend-overlay">
            <div className="text-center animate-pulse">
              <h2 className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-500 italic transform skew-x-12">
                光速跃迁
              </h2>
              <div className="mt-8 w-64 h-2 bg-gray-800 rounded-full overflow-hidden mx-auto">
                  <div className="h-full bg-cyan-400 animate-[loading_4s_ease-in-out]" />
              </div>
              <p className="mt-4 text-xl font-mono text-cyan-300 tracking-[1em]">HYPERSPACE</p>
            </div>
          </div>
        )}

        {status === 'ARRIVED' && selectedDest && (
          <div className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-8 p-4 md:p-12 animate-[fadeIn_2s_ease-in]">
            
            <div className="flex-1 flex items-center justify-center order-2 md:order-1 relative">
                <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-full scale-110 animate-pulse" />
                <div className="relative z-10 transform transition-transform duration-[2000ms] ease-out scale-0 opacity-0 animate-[popIn_2s_forwards]">
                    <Planet3D destination={selectedDest} />
                </div>
            </div>

            <div className="flex-1 w-full max-w-xl order-1 md:order-2 z-20">
                <div className={`border-l-2 ${selectedDest.color.split(' ')[1]} bg-black/80 backdrop-blur-xl p-6 md:p-10 relative overflow-hidden`}>
                  
                  <div className="absolute top-0 right-0 w-32 h-[2px] bg-gradient-to-l from-current to-transparent opacity-50" />
                  <div className="absolute bottom-0 right-0 w-16 h-[2px] bg-current opacity-50" />
                  
                  <div className="mb-6">
                      <div className="flex justify-between items-end border-b border-white/10 pb-2 mb-4">
                          <h2 className="text-4xl md:text-6xl font-bold brand-font leading-none text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                              {selectedDest.name.split(' ')[0]}
                          </h2>
                          <span className="font-mono text-xs text-cyan-500 mb-1">{selectedDest.distance}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6 font-mono text-xs opacity-60">
                          <div>重力: {Math.random().toFixed(2)}g</div>
                          <div>温度: {Math.floor(Math.random() * 300 - 150)}°C</div>
                          <div>大气: {GASES[Math.floor(Math.random()*4)]}</div>
                          <div>宜居度: {Math.floor(Math.random() * 100)}%</div>
                      </div>
                  </div>

                  <div className="min-h-[180px] font-mono text-sm md:text-base leading-relaxed text-cyan-100 bg-cyan-900/10 p-4 rounded-sm border border-white/5">
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-cyan-400 mb-2 border-b border-cyan-900/30 pb-1">
                          <span>// AI 航行日志</span>
                          <span className="ml-auto">{new Date().toLocaleTimeString()}</span>
                      </div>
                      {loadingLog ? (
                         <div className="flex flex-col gap-1 text-cyan-400/70">
                           <span className="animate-pulse">正在解密量子信号...</span>
                           <span className="text-[10px] font-mono h-4 overflow-hidden">
                             {Array(10).fill(0).map(() => Math.random().toString(36).substring(7)).join('')}
                           </span>
                         </div>
                      ) : (
                         <Typewriter text={travelLog} speed={20} className="drop-shadow-md" />
                      )}
                  </div>

                  <div className="mt-8 flex justify-between items-center">
                     <div className="flex gap-1">
                         {LOADING_BAR_ARRAY.map(i => (
                           <div 
                             key={i} 
                             className="w-1 h-1 bg-current rounded-full animate-ping" 
                             style={{animationDelay: `${i*200}ms`}} 
                           />
                         ))}
                     </div>
                     <button 
                       onClick={handleReturn}
                       onMouseEnter={handleMouseEnter}
                       className="group flex items-center gap-2 px-6 py-2 border border-white/30 hover:bg-white hover:text-black transition-all duration-300 font-mono text-sm tracking-widest uppercase"
                     >
                       <span>断开连接</span>
                       <span className="group-hover:translate-x-1 transition-transform">→</span>
                     </button>
                  </div>
                </div>
            </div>
          </div>
        )}
      </main>
      
      <div className="fixed bottom-4 left-6 font-mono text-[10px] text-white/30 z-50 pointer-events-none">
        SYS.INTEGRITY: 98.4% <br/>
        AUDIO: {audioInitialized ? 'ACTIVE' : 'MUTED'}
      </div>
    </div>
  );
};

export default App;
