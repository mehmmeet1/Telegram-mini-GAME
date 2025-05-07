import { useEffect, useState, useCallback } from 'react';
import React from 'react';

interface LevelUpEffectProps {
  level: number;
  show: boolean;
  onComplete: () => void;
}

const LevelUpEffect: React.FC<LevelUpEffectProps> = ({ level, show, onComplete }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // useCallback ile optimize ediyoruz
  const handleComplete = useCallback(() => {
    setIsVisible(false);
    if (onComplete) onComplete();
  }, [onComplete]);
  
  useEffect(() => {
    if (show) {
      setIsVisible(true);
      
      // 3 saniye sonra efekti kaldır ve tamamlandı olarak işaretle
      const timer = setTimeout(() => {
        handleComplete();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [show, handleComplete]);
  
  if (!isVisible) return null;
  
  return (
    <div className="level-up-effect fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="level-up-content relative flex flex-col items-center">
        <div className="level-up-badge animate-scale-in bg-bordo-700 text-acik-50 rounded-full w-28 h-28 flex flex-col items-center justify-center shadow-lg">
          <span className="text-xs uppercase tracking-wider">Seviye</span>
          <span className="text-4xl font-bold">{level}</span>
        </div>
        
        <div className="level-up-text animate-fade-in mt-4 text-2xl font-bold text-bordo-600">
          SEVİYE ATLADINIZ!
        </div>
        
        <div className="stars absolute">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i} 
              className="star absolute animate-star"
              style={{
                left: `${Math.random() * 300 - 150}px`,
                top: `${Math.random() * 300 - 150}px`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${1 + Math.random() * 1}s`,
                opacity: Math.random() * 0.7 + 0.3,
                transform: `scale(${Math.random() * 0.5 + 0.5})`,
              }}
            >
              ✨
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        .animate-scale-in {
          animation: scaleIn 0.5s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out 0.3s forwards;
          opacity: 0;
        }
        
        .animate-star {
          animation: starAnim 1s ease-out infinite;
          position: absolute;
          font-size: 24px;
        }
        
        @keyframes scaleIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          70% {
            transform: scale(1.1);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes fadeIn {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes starAnim {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scale(1.5) rotate(45deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

// React.memo ile sarmak gereksiz render'ları önler
export default React.memo(LevelUpEffect); 