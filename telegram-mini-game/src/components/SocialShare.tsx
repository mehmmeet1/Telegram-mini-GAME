import React from 'react';

interface SocialShareProps {
  score: number;
  level: number;
  onClose: () => void;
  isOnline: boolean;
}

const SocialShare: React.FC<SocialShareProps> = ({
  score,
  level,
  onClose,
  isOnline
}) => {
  const shareText = `🎮 Tap-to-Earn oyununda ${score.toLocaleString()} puan kazandım ve ${level}. seviyeye ulaştım! Sen de denemelisin!`;
  
  const handleShare = (platform: string) => {
    if (!isOnline) {
      alert('Paylaşım yapmak için internet bağlantısı gerekiyor!');
      return;
    }
    
    // Telegram paylaşımı
    if (platform === 'telegram' && window.Telegram?.WebApp) {
      // Telegram'da paylaşım işlemi için
      if (window.Telegram.WebApp.MainButton) {
        window.Telegram.WebApp.MainButton.setText('Paylaş');
        window.Telegram.WebApp.MainButton.show();
        window.Telegram.WebApp.MainButton.onClick(() => {
          window.Telegram.WebApp.sendData(JSON.stringify({
            action: 'share',
            text: shareText
          }));
          window.Telegram.WebApp.MainButton.hide();
        });
      }
    }
    
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
    }
  };
  
  // Ekran görüntüsü alma (gerçek uygulamada daha karmaşık olacaktır)
  const takeScreenshot = () => {
    if (!isOnline) {
      alert('Bu özellik için internet bağlantısı gerekiyor!');
      return;
    }
    
    alert('Ekran görüntüsü alındı ve paylaşıma hazır!');
    
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
    }
  };
  
  const shareOptions = [
    { id: 'telegram', name: 'Telegram', icon: '📱' },
    { id: 'screenshot', name: 'Ekran Görüntüsü', icon: '📸' }
  ];
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-20">
      <div className="bg-acik-50 rounded-xl max-w-md w-full mx-4 max-h-[80vh] flex flex-col">
        <div className="p-4 border-b border-krem-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-koyu-800">Başarını Paylaş</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-krem-200 text-koyu-800"
          >
            ✕
          </button>
        </div>
        
        <div className="p-4">
          <div className="bg-krem-100 rounded-lg p-4 mb-4">
            <div className="text-center mb-4">
              <div className="inline-block bg-gradient-to-r from-bordo-500 to-bordo-700 text-white text-4xl p-4 rounded-full mb-2">
                {level > 8 ? '🏆' : level > 5 ? '🥇' : level > 3 ? '🥈' : '🥉'}
              </div>
              <h3 className="text-xl font-bold text-koyu-800">Seviye {level}</h3>
              <p className="text-bordo-700 font-medium">{score.toLocaleString()} Puan</p>
            </div>
            
            <p className="text-center text-koyu-700 border-t border-krem-200 pt-3 px-2">
              "{shareText}"
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {shareOptions.map(option => (
              <button
                key={option.id}
                onClick={() => option.id === 'screenshot' ? takeScreenshot() : handleShare(option.id)}
                disabled={!isOnline}
                className={`p-3 rounded-lg flex flex-col items-center justify-center ${
                  isOnline 
                    ? 'bg-krem-100 hover:bg-krem-200 active:bg-krem-300' 
                    : 'bg-gray-100 cursor-not-allowed'
                }`}
              >
                <span className="text-3xl mb-2">{option.icon}</span>
                <span className={`text-sm font-medium ${isOnline ? 'text-koyu-800' : 'text-gray-500'}`}>
                  {option.name}
                </span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="border-t border-krem-200 p-3">
          <p className="text-xs text-center text-koyu-600">
            Paylaşarak arkadaşlarını oyuna davet et!
          </p>
          
          {!isOnline && (
            <p className="text-xs text-center text-red-500 mt-1 font-medium">
              ⚠️ Çevrimdışı moddasınız. Paylaşım yapmak için internet bağlantısı gerekiyor.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(SocialShare); 