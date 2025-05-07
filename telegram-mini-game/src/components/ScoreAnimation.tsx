import { useEffect, useState, useCallback } from 'react';
import React from 'react';

interface ScoreAnimationProps {
  x: number;
  y: number;
  score: number;
  onComplete: () => void;
}

interface Animation {
  id: number;
  x: number;
  y: number;
  score: number;
  opacity: number;
  scale: number;
}

const ScoreAnimation = () => {
  const [animations, setAnimations] = useState<Animation[]>([]);
  
  // Tüm noktaları global olarak izle
  useEffect(() => {
    const handleGlobalClick = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      
      // Tıklama gücünü almak için özel veri niteliği (data attribute) kullan
      const target = e.target as HTMLElement;
      const tapArea = target.closest('.tap-area') as HTMLElement;
      
      if (!tapArea) return;
      
      // Tıklama gücü, çarpan ve diğer faktörleri data attribute'den al
      const clickPower = Number(tapArea.dataset.clickPower || 1);
      const hasDoubleTap = tapArea.dataset.doubleTap === 'true';
      const hasGoldenTap = tapArea.dataset.goldenTap === 'true';
      
      // Gerçek puan hesaplaması
      let actualScore = clickPower;
      if (hasDoubleTap) actualScore *= 2;
      if (hasGoldenTap) actualScore *= 10;
      
      // Yeni animasyon ekle
      const newAnimation: Animation = {
        id: Date.now(),
        x: mouseEvent.clientX,
        y: mouseEvent.clientY,
        score: actualScore,
        opacity: 1,
        scale: 1,
      };
      
      setAnimations((prev) => [...prev, newAnimation]);
      
      // 1.5 saniye sonra animasyonu kaldır
      setTimeout(() => {
        setAnimations((prev) => prev.filter(anim => anim.id !== newAnimation.id));
      }, 1500);
    };
    
    // Sadece tap-area sınıfına sahip elemanlara tıklandığında çalışsın
    const tapArea = document.querySelector('.tap-area');
    if (tapArea) {
      tapArea.addEventListener('click', handleGlobalClick);
    }
    
    return () => {
      if (tapArea) {
        tapArea.removeEventListener('click', handleGlobalClick);
      }
    };
  }, []);
  
  return (
    <div className="score-animations-container" style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', width: '100%', height: '100%', zIndex: 1000 }}>
      {animations.map((anim) => (
        <div
          key={anim.id}
          className="score-animation font-bold"
          style={{
            position: 'absolute',
            left: `${anim.x}px`,
            top: `${anim.y}px`,
            transform: `translate(-50%, -50%) scale(${anim.scale})`,
            opacity: anim.opacity,
            animation: 'float-up 1.5s ease-out forwards',
            fontSize: '22px',
            color: '#c13354', // Bordo
            textShadow: '0 0 5px rgba(255,255,255,0.9), 0 1px 2px rgba(0,0,0,0.3)',
          }}
        >
          +{anim.score}
        </div>
      ))}
      
      <style>
        {`
          @keyframes float-up {
            0% {
              transform: translate(-50%, -50%) scale(0.5);
              opacity: 0;
            }
            10% {
              transform: translate(-50%, -60%) scale(1.4);
              opacity: 1;
            }
            70% {
              opacity: 0.9;
            }
            100% {
              transform: translate(-50%, -180%) scale(1);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

// React.memo ile sarmak gereksiz render'ları önler
export default React.memo(ScoreAnimation); 