import React, { useState, useEffect, useCallback } from 'react';

interface Reward {
  id: string;
  name: string;
  description: string;
  cost: number;
  icon: string;
  unlocked: boolean;
  claimed: boolean;
  claimTime: number;
  duration: number;
}

interface RewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  userScore: number;
  onRewardClaim: (rewardId: string, cost: number) => boolean;
  isOnline: boolean;
}

const RewardModal: React.FC<RewardModalProps> = ({ 
  isOpen, 
  onClose,
  userScore,
  onRewardClaim,
  isOnline
}) => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  // Mevcut ödül listesini yükle
  useEffect(() => {
    const availableRewards = [
      {
        id: 'double_tap',
        name: 'Çift Tıklama',
        description: '1 dakika boyunca her tıklama 2 kat puan kazandırır!',
        cost: 500,
        icon: '⚡',
        unlocked: userScore >= 500,
        claimed: false,
        claimTime: 0,
        duration: 60000
      },
      {
        id: 'auto_tap',
        name: 'Otomatik Tıklayıcı',
        description: '2 dakika boyunca her 3 saniyede bir otomatik tıklama yapar!',
        cost: 1000,
        icon: '🤖',
        unlocked: userScore >= 1000,
        claimed: false,
        claimTime: 0,
        duration: 120000
      },
      {
        id: 'bonus_points',
        name: 'Bonus Puan',
        description: 'Anında 100 bonus puan kazan!',
        cost: 300,
        icon: '🎁',
        unlocked: userScore >= 300,
        claimed: false,
        claimTime: 0,
        duration: 0
      },
      {
        id: 'golden_tap',
        name: 'Altın Tıklama',
        description: 'Bir sonraki tıklama için 10 kat puan!',
        cost: 750,
        icon: '👑',
        unlocked: userScore >= 750,
        claimed: false,
        claimTime: 0,
        duration: 0
      },
      {
        id: 'click_boost',
        name: 'Kalıcı Güçlendirme',
        description: 'Tıklama gücünü kalıcı olarak +2 arttır!',
        cost: 2000,
        icon: '💪',
        unlocked: userScore >= 2000,
        claimed: false,
        claimTime: 0,
        duration: 0
      }
    ];
    
    setRewards(availableRewards);
  }, [userScore]);
  
  const openConfirmModal = useCallback((reward: Reward) => {
    if (!isOnline) {
      alert('Bu özellik için internet bağlantısı gerekiyor!');
      return;
    }
    
    if (reward.unlocked && userScore >= reward.cost) {
      setSelectedReward(reward);
      setShowConfirmModal(true);
    }
  }, [userScore, isOnline]);
  
  const closeConfirmModal = useCallback(() => {
    setShowConfirmModal(false);
    setSelectedReward(null);
  }, []);
  
  const handleClaimReward = (rewardId: string, cost: number) => {
    if (!isOnline) {
      alert('Bu özellik için internet bağlantısı gerekiyor!');
      return;
    }
    
    const success = onRewardClaim(rewardId, cost);
    
    if (success) {
      setRewards(rewards.map(r => 
        r.id === rewardId 
          ? {...r, claimTime: Date.now() + r.duration, claimed: true} 
          : r
      ));
      
      // Haptic feedback
      if (window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
      }
      
      closeConfirmModal();
    } else {
      alert('Yeterli puanınız yok veya ödül zaten aktif!');
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-20">
      <div className="bg-acik-50 rounded-xl max-w-md w-full mx-4 max-h-[80vh] flex flex-col">
        <div className="p-4 border-b border-krem-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-koyu-800">Ödüller</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-krem-200 text-koyu-800"
          >
            ✕
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto flex-1">
          <div className="flex justify-between mb-3">
            <p className="text-sm text-koyu-800">Mevcut puanınız:</p>
            <p className="font-bold text-bordo-600">{userScore} puan</p>
          </div>
          
          <div className="grid gap-3">
            {rewards.map(reward => (
              <div 
                key={reward.id} 
                className={`p-4 rounded-lg border ${
                  reward.unlocked && !reward.claimed && isOnline 
                    ? 'bg-acik-100 border-krem-200 cursor-pointer hover:bg-acik-200' 
                    : 'bg-gray-100 border-gray-200 opacity-70'
                }`}
                onClick={() => reward.unlocked && !reward.claimed && isOnline && openConfirmModal(reward)}
              >
                <div className="flex items-center">
                  <div className="text-3xl mr-3">{reward.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-medium text-koyu-800">{reward.name}</h3>
                    <p className="text-xs text-koyu-700">{reward.description}</p>
                    
                    <div className="mt-2 flex justify-between items-center">
                      <div className="text-xs font-medium">
                        {reward.claimed 
                          ? <span className="text-green-600">✓ Alındı</span> 
                          : <span className={reward.unlocked ? 'text-bordo-600' : 'text-gray-500'}>
                              Maliyet: {reward.cost} puan
                            </span>
                        }
                      </div>
                      
                      {!reward.claimed && (
                        <span className={`text-xs py-1 px-2 rounded-full ${
                          reward.unlocked && isOnline
                            ? 'bg-krem-100 text-bordo-600' 
                            : 'bg-gray-200 text-gray-500'
                        }`}>
                          {reward.unlocked ? isOnline ? 'Talep Et' : 'Çevrimdışı' : 'Kilitli'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Onayla modalı */}
        {showConfirmModal && selectedReward && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-4 w-full max-w-sm">
              <h3 className="text-lg font-bold text-koyu-800 mb-2">Ödülü Talep Et</h3>
              <p className="text-koyu-700 mb-4">
                "{selectedReward.name}" ödülünü {selectedReward.cost} puan karşılığında talep etmek istiyor musunuz?
              </p>
              
              <div className="flex gap-2">
                <button 
                  onClick={closeConfirmModal}
                  className="flex-1 py-2 rounded-lg bg-krem-200 text-koyu-800 font-medium hover:bg-krem-300"
                >
                  İptal
                </button>
                <button 
                  onClick={() => handleClaimReward(selectedReward.id, selectedReward.cost)}
                  className="flex-1 py-2 rounded-lg bg-bordo-600 text-acik-50 font-medium hover:bg-bordo-700"
                >
                  Talep Et
                </button>
              </div>
            </div>
          </div>
        )}
        
        {!isOnline && (
          <div className="border-t border-krem-200 p-3">
            <p className="text-xs text-center text-red-500 font-medium">
              ⚠️ Çevrimdışı moddasınız. Ödül almak için internet bağlantısı gerekiyor.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(RewardModal); 