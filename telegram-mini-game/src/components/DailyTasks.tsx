import React, { useMemo } from 'react';
import type { Task } from '../hooks/useGameState';

interface DailyTasksProps {
  tasks: Task[];
  onClaimReward: (taskId: string) => boolean;
  isOnline: boolean;
  onClose: () => void;
}

const DailyTasks: React.FC<DailyTasksProps> = ({ 
  tasks, 
  onClaimReward, 
  isOnline,
  onClose 
}) => {
  // Görevlerin tamamlanma durumuna göre sırala
  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      // Önce tamamlanmış ama talep edilmemiş görevler
      if (a.completed && !a.claimed && !(b.completed && !b.claimed)) return -1;
      if (b.completed && !b.claimed && !(a.completed && !a.claimed)) return 1;
      
      // Sonra devam eden görevler
      if (!a.completed && b.completed) return -1;
      if (!b.completed && a.completed) return 1;
      
      // Son olarak tamamlanmış ve talep edilmiş görevler
      return 0;
    });
  }, [tasks]);

  // Görev türüne göre simge belirle
  const getTaskIcon = (taskType: string) => {
    switch (taskType) {
      case 'click_count': return '👆';
      case 'score_target': return '🎯';
      case 'use_reward': return '🎁';
      default: return '📋';
    }
  };

  const handleClaimReward = (taskId: string) => {
    if (!isOnline) {
      alert('Bu özellik için internet bağlantısı gerekiyor!');
      return;
    }
    
    const success = onClaimReward(taskId);
    if (success && window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-20">
      <div className="bg-acik-50 rounded-xl max-w-md w-full mx-4 max-h-[80vh] flex flex-col">
        <div className="p-4 border-b border-krem-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-koyu-800">Günlük Görevler</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-krem-200 text-koyu-800"
          >
            ✕
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto flex-1">
          {sortedTasks.length === 0 ? (
            <div className="text-center py-8 text-koyu-600">
              <p>Henüz görev yok.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedTasks.map(task => (
                <div 
                  key={task.id} 
                  className={`p-3 rounded-lg ${
                    task.completed && !task.claimed 
                      ? 'bg-krem-100 border-2 border-bordo-400' 
                      : task.completed && task.claimed 
                        ? 'bg-gray-100 opacity-70' 
                        : 'bg-krem-100'
                  }`}
                >
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">{getTaskIcon(task.type)}</span>
                    <div className="flex-1">
                      <h3 className="font-medium text-koyu-800">{task.description}</h3>
                      
                      <div className="mt-1 flex justify-between items-center">
                        <div className="flex-1">
                          <div className="h-2 bg-krem-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-bordo-500"
                              style={{ width: `${Math.min(100, (task.progress / task.target) * 100)}%` }}
                            ></div>
                          </div>
                          <p className="text-xs mt-1 text-koyu-600">
                            {task.progress}/{task.target} {task.completed ? '(Tamamlandı!)' : ''}
                          </p>
                        </div>
                        
                        <div className="ml-2 flex items-center">
                          {task.completed && !task.claimed ? (
                            <button
                              onClick={() => handleClaimReward(task.id)}
                              disabled={!isOnline}
                              className={`py-1 px-3 rounded-full text-sm font-medium flex items-center ${
                                isOnline 
                                  ? 'bg-bordo-500 text-white hover:bg-bordo-600 active:bg-bordo-700' 
                                  : 'bg-gray-400 text-gray-100 cursor-not-allowed'
                              }`}
                            >
                              <span className="mr-1">{task.reward}</span>
                              <span className="text-xs">🪙</span>
                            </button>
                          ) : task.claimed ? (
                            <span className="text-sm text-green-600 font-medium">✓ Alındı</span>
                          ) : (
                            <span className="bg-krem-200 py-1 px-2 rounded-full text-xs font-medium">
                              +{task.reward} 🪙
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="border-t border-krem-200 p-3">
          <p className="text-xs text-center text-koyu-600">
            Görevler her 24 saatte bir yenilenir
          </p>
          {!isOnline && (
            <p className="text-xs text-center text-red-500 mt-1 font-medium">
              ⚠️ Çevrimdışı moddasınız. Görev ödüllerini talep etmek için internet bağlantısı gerekiyor.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(DailyTasks); 