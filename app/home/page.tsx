'use client';

import { useState, useRef, useEffect } from 'react';




export default function Home() {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [hoverCount, setHoverCount] = useState(0);
  const [isStopped, setIsStopped] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const [music, setMusic] = useState<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    const audio = new Audio('/sonata.mp3');
    audio.volume = 0.05;
    setMusic(audio);
  }, []);


  const handleClick = (e: React.MouseEvent) => {
    if (isStopped || !imgRef.current) return;

    if(!isStopped) {
      laugh();
    }

    const rect = imgRef.current.getBoundingClientRect();
    const imgCenterX = rect.left + rect.width / 2;
    const imgCenterY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    setHoverCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 10) {
        setIsStopped(true);
      }
      return newCount;
    });

    // Calculate direction away from click
    const angle = Math.atan2(imgCenterY - mouseY, imgCenterX - mouseX);
    const moveDistance = 150;
    
    let newX = position.x + Math.cos(angle) * moveDistance;
    let newY = position.y + Math.sin(angle) * moveDistance;

    // Keep within screen bounds (with padding)
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 100;
    
    newX = Math.max(20, Math.min(newX, maxX));
    newY = Math.max(20, Math.min(newY, maxY));

    setPosition({ x: newX, y: newY });
  };

  useEffect(()=>{
    if (isStopped) {
      Aray();
    }
  }, [isStopped]);

  function Aray() {
    const audio = new Audio('/m2.mp3');
    audio.play();
  }

  function laugh() {
    const audio = new Audio('/fart.mp3');
    audio.volume = 0.1;
    audio.play();
  }

  const [isPlaying, setIsPlaying] = useState(false);
  function toggleMusic(){
    if (isPlaying) {
      music.pause();
      setIsPlaying(false);
    } else {
      music.play();
      setIsPlaying(true);
    }
  }



  return (
    <div 
      className="min-h-screen bg-[#ffffff] overflow-hidden relative"
    >
      <div 
        ref={imgRef}
        onClick={handleClick}
        className="absolute z-50 transition-all duration-300 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          cursor: isStopped ? 'default' : 'pointer'
        }}
      >
        <img
          src={!isStopped ? "/run.gif" : "/stopped.png"}
          alt="Background"
          className="h-20 w-20 object-cover rounded-full "
        />
        {isStopped && (
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 text-[#E75480] text-sm whitespace-nowrap font-bold">
            Aray ko!
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 flex flex-col items-center">
        {/* Letter Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif text-[#5A2A38] mb-4">
            My Dearest Love
          </h1>
          <div className="w-24 h-1 bg-[#E75480] mx-auto"></div>
        </div>

        {/* Letter Content */}
        <div className="bg-white/80 relative backdrop-blur-sm rounded-lg shadow-xl p-12 mb-16 border-2 border-[#F4C2D7]">
          <div className="absolute -top-10 -right-10">
            <img
              src="/shh.jpg"
              alt="Background"
              className="h-20 w-20 object-cover rounded-full"
            />
          </div>

          <div className="absolute bottom-10 left-10">
            <img
              src="/cool.jpg"
              alt="Background"
              className="h-25 w-25 object-cover rounded-full"
            />
          </div>

          <p className="text-[#5A2A38] text-lg leading-relaxed mb-6 font-serif">
            Every moment I spend with you is incredibly special. You’re the only woman I’m truly in love with, and you always bring happiness into my life. I’m deeply grateful for your unwavering presence through both the highs and the lows.
          </p>
          <p className="text-[#5A2A38] text-lg leading-relaxed mb-6 font-serif">
            I will always cherish your care and support, and I have never regretted anything about you. Thank you for always being there for me, for standing by me, and for supporting me in every way with all your heart.
          </p>
          <p className="text-[#5A2A38] text-lg leading-relaxed mb-6 font-serif">
            You are my everything, and I promise to love and appreciate you every single day.
          </p>
          <p className="text-[#9F6F7A] text-xl text-right font-serif italic mt-8">
            Forever yours,
          </p>
          <p className="text-[#E75480] text-2xl text-right font-serif mt-2">
            ♥
          </p>
        </div>

        {/* Photo Gallery */}
        <div className="mb-12 flex flex-col items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className="aspect-square h-80 w-80 overflow-hidden bg-gradient-to-br from-[#E75480] to-[#F4C2D7] rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 p-2">
                <img src={`/p${index}.jpg`} alt="" className="w-full h-full object-cover rounded-md" />
              </div>
            ))}
          </div>
        </div>

        <button onClick={toggleMusic} disabled={isPlaying} className='disabled:cursor-not-allowed  self-center flex items-center gap-2 justify-center text-2xl font-bold text-white bg-primary py-4 px-8 rounded-full'>
          Play now <Svg/>
        </button>
      </div>
    </div>
  );
}

function Svg(){
  return(
    <svg 
      version="1.1" 
      id="Layer_1" 
      xmlns="http://www.w3.org/2000/svg" 
      xmlnsXlink="http://www.w3.org/1999/xlink" 
      width="30px" 
      height="30px" 
      viewBox="0 0 64 64" 
      enableBackground="new 0 0 64 64" 
      xmlSpace="preserve"
    >
      <g>
        <polygon 
          fill="none" 
          stroke="#ffffff" 
          strokeWidth="2" 
          strokeLinejoin="bevel" 
          strokeMiterlimit="10" 
          points="27,21 41,32 27,43"
        />
        <path 
          fill="none" 
          stroke="#ffffff" 
          strokeWidth="2" 
          strokeMiterlimit="10" 
          d="M53.92,10.081 c12.107,12.105,12.107,31.732,0,43.838c-12.106,12.108-31.734,12.108-43.839,0c-12.107-12.105-12.107-31.732,0-43.838 C22.186-2.027,41.813-2.027,53.92,10.081z"
        />
      </g>
    </svg>
  )
}