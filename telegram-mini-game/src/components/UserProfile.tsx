import React from 'react';

interface UserProfileProps {
  level: number;
  score: number;
  clickPower: number;
  totalClicks: number;
  username: string;
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ 
  level, 
  score, 
  clickPower, 
  totalClicks,
  username,
  onClose 
}) => {
  // Toplam oyun süresi (her kullanıcıya farklı hissettirmek için seed olarak leveli kullanıyoruz)
  const totalPlayTimeHours = Math.floor((level * 7.5) + (totalClicks / 300));
  const totalPlayTimeMinutes = Math.floor((totalClicks % 300) / 5);
  
  // Ortalama tıklama hızı (dakikada)
  const avgClickRate = Math.floor(60 * (totalClicks / (totalPlayTimeHours + (totalPlayTimeMinutes / 60))));
  
  // Level tabanlı başarı rozeti
  const getLevelBadge = () => {
    if (level >= 10) return '🏆 Altın';
    if (level >= 7) return '🥈 Gümüş';
    if (level >= 5) return '🥉 Bronz';
    return '🔰 Yeni Başlayan';
  };
  
  // Tıklama hızına göre rozet
  const getClickBadge = () => {
    if (avgClickRate >= 120) return '⚡ Ultra Hızlı';
    if (avgClickRate >= 90) return '🚀 Çok Hızlı';
    if (avgClickRate >= 60) return '🔥 Hızlı';
    return '👍 Normal';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-20">
      <div className="bg-acik-50 rounded-xl max-w-md w-full mx-4 max-h-[80vh] flex flex-col">
        <div className="p-4 border-b border-krem-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-koyu-800">Profil</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-krem-200 text-koyu-800"
          >
            ✕
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto">
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-bordo-500 to-bordo-700 flex items-center justify-center text-white text-2xl mb-3">
              {username.slice(0, 1).toUpperCase()}
            </div>
            <h3 className="text-xl font-bold text-koyu-800">{username}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <div className="text-xs bg-krem-200 text-koyu-700 px-2 py-1 rounded-full">
                Seviye {level}
              </div>
              <div className="text-xs bg-bordo-100 text-bordo-700 px-2 py-1 rounded-full">
                {getLevelBadge()}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-krem-100 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-bordo-700">{score.toLocaleString()}</p>
              <p className="text-xs text-koyu-600">Toplam Puan</p>
            </div>
            
            <div className="bg-krem-100 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-bordo-700">{totalClicks.toLocaleString()}</p>
              <p className="text-xs text-koyu-600">Toplam Tıklama</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="bg-acik-100 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-koyu-800">Tıklama Gücü</h4>
                  <p className="text-xs text-koyu-600">Her tıklamada kazanılan puan</p>
                </div>
                <div className="font-bold text-bordo-700 text-xl">+{clickPower}</div>
              </div>
            </div>
            
            <div className="bg-acik-100 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-koyu-800">Tıklama Hızı</h4>
                  <p className="text-xs text-koyu-600">Ortalama tıklama / dakika</p>
                </div>
                <div className="flex items-center">
                  <span className="font-bold text-bordo-700 text-xl mr-2">{avgClickRate}</span>
                  <span className="text-xs bg-bordo-100 text-bordo-700 px-2 py-1 rounded-full">
                    {getClickBadge()}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-acik-100 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-koyu-800">Oyun Süresi</h4>
                  <p className="text-xs text-koyu-600">Toplam oynanan süre</p>
                </div>
                <div className="font-bold text-bordo-700 text-lg">
                  {totalPlayTimeHours}s {totalPlayTimeMinutes}d
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(UserProfile); 