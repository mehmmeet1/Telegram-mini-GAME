import React, { useState, useEffect } from 'react';

interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  level: number;
  avatar?: string;
  isCurrentUser?: boolean;
}

interface LeaderboardProps {
  username: string;
  score: number;
  level: number;
  onClose: () => void;
  isOnline: boolean;
}

// Demo liderlik tablosu verileri
const demoLeaderboardData: LeaderboardEntry[] = [
  { id: '1', name: 'TapMaster', score: 15420, level: 12, avatar: '👑' },
  { id: '2', name: 'ClickChamp', score: 12350, level: 10, avatar: '🏆' },
  { id: '3', name: 'TapKing', score: 9870, level: 9, avatar: '🔥' },
  { id: '4', name: 'FastFinger', score: 8540, level: 8, avatar: '⚡' },
  { id: '5', name: 'PointHunter', score: 7620, level: 7, avatar: '🎯' },
  { id: '6', name: 'TapTap', score: 6950, level: 7, avatar: '🌟' },
  { id: '7', name: 'ClickerHero', score: 5430, level: 6, avatar: '🦸‍♂️' },
  { id: '8', name: 'MasterTapper', score: 4320, level: 5, avatar: '🧙‍♂️' },
  { id: '9', name: 'SpeedClicker', score: 3650, level: 5, avatar: '🏎️' },
  { id: '10', name: 'PointCollector', score: 2980, level: 4, avatar: '🧩' },
];

const Leaderboard: React.FC<LeaderboardProps> = ({
  username,
  score,
  level,
  onClose,
  isOnline
}) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userRank, setUserRank] = useState<number | null>(null);
  
  useEffect(() => {
    const loadLeaderboard = async () => {
      if (!isOnline) {
        setIsLoading(false);
        return;
      }
      
      try {
        // Gerçek bir API'den veri çekmek yerine demo verileri kullanıyoruz
        await new Promise(resolve => setTimeout(resolve, 800)); // Simüle edilmiş gecikme
        
        // Kullanıcıyı sıralamaya ekle
        const userEntry: LeaderboardEntry = {
          id: 'user',
          name: username || 'Sen',
          score,
          level,
          isCurrentUser: true,
          avatar: '👤'
        };
        
        // Tüm verileri birleştir ve sırala
        const allEntries = [...demoLeaderboardData, userEntry]
          .sort((a, b) => b.score - a.score);
        
        // Kullanıcının sıralamasını bul
        const userRankIndex = allEntries.findIndex(entry => entry.isCurrentUser);
        if (userRankIndex !== -1) {
          setUserRank(userRankIndex + 1);
        }
        
        setLeaderboard(allEntries);
        setIsLoading(false);
      } catch (error) {
        console.error('Liderlik tablosu yüklenirken hata oluştu:', error);
        setIsLoading(false);
      }
    };
    
    loadLeaderboard();
  }, [isOnline, username, score, level]);
  
  // Liderlik tablosunu sırala ve en iyi 10'u göster
  const top10 = leaderboard.slice(0, 10);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-20">
      <div className="bg-acik-50 rounded-xl max-w-md w-full mx-4 max-h-[80vh] flex flex-col">
        <div className="p-4 border-b border-krem-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-koyu-800">Liderlik Tablosu</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-krem-200 text-koyu-800"
          >
            ✕
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto flex-1">
          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <div className="w-10 h-10 border-2 border-bordo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : !isOnline ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <span className="text-4xl mb-4">📡</span>
              <h3 className="text-lg font-medium text-koyu-800 mb-2">Çevrimdışı Mod</h3>
              <p className="text-koyu-600 max-w-xs">
                Liderlik tablosunu görüntülemek için internet bağlantısı gerekiyor.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4 flex justify-between text-xs font-medium text-koyu-700 px-2">
                <span>Sıra</span>
                <span>Oyuncu</span>
                <span>Puan</span>
                <span>Seviye</span>
              </div>
              
              <div className="space-y-2">
                {top10.map((entry, index) => (
                  <div 
                    key={entry.id}
                    className={`p-3 rounded-lg flex items-center ${
                      entry.isCurrentUser 
                        ? 'bg-bordo-100 border border-bordo-400' 
                        : index < 3 
                          ? 'bg-krem-100' 
                          : 'bg-white'
                    }`}
                  >
                    <div className="w-8 text-center font-bold">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                    </div>
                    
                    <div className="flex items-center flex-1 ml-2">
                      <span className="text-xl mr-2">{entry.avatar}</span>
                      <span className={`font-medium ${entry.isCurrentUser ? 'text-bordo-700' : 'text-koyu-800'}`}>
                        {entry.name}
                      </span>
                      {entry.isCurrentUser && (
                        <span className="ml-2 text-xs bg-bordo-500 text-white px-2 py-0.5 rounded-full">
                          Sen
                        </span>
                      )}
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold text-bordo-700">{entry.score.toLocaleString()}</div>
                      <div className="text-xs text-koyu-600">Lvl {entry.level}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              {userRank && userRank > 10 && (
                <div className="mt-4 border-t border-krem-200 pt-4">
                  <div className="text-center text-sm text-koyu-600 mb-2">
                    Senin Sıralamanın
                  </div>
                  
                  <div className="p-3 rounded-lg flex items-center bg-bordo-100 border border-bordo-400">
                    <div className="w-8 text-center font-bold">
                      {userRank}.
                    </div>
                    
                    <div className="flex items-center flex-1 ml-2">
                      <span className="text-xl mr-2">👤</span>
                      <span className="font-medium text-bordo-700">
                        {username || 'Sen'}
                      </span>
                      <span className="ml-2 text-xs bg-bordo-500 text-white px-2 py-0.5 rounded-full">
                        Sen
                      </span>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold text-bordo-700">{score.toLocaleString()}</div>
                      <div className="text-xs text-koyu-600">Lvl {level}</div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        
        <div className="border-t border-krem-200 p-3">
          <p className="text-xs text-center text-koyu-600">
            Her tıklama seni liderlik tablosunda yukarı taşır!
          </p>
          
          {!isOnline && (
            <p className="text-xs text-center text-red-500 mt-1 font-medium">
              ⚠️ Çevrimdışı moddasınız. Liderlik tablosu için internet bağlantısı gerekiyor.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Leaderboard); 