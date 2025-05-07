import { useState, useEffect, useCallback, useRef, useMemo } from 'react';

// Renk temaları
export type ThemeType = 'default' | 'dark' | 'neon' | 'pastel';

// Görev tipi
export type TaskType = 'click_count' | 'score_target' | 'use_reward';

// Görev arayüzü
export interface Task {
  id: string;
  type: TaskType;
  description: string;
  target: number;
  progress: number;
  reward: number;
  completed: boolean;
  claimed: boolean;
}

interface GameState {
  score: number;
  level: number;
  clickPower: number;
  totalClicks: number;
  activeRewards: {
    id: string;
    endTime: number;
  }[];
  // Yeni eklemeler
  theme: ThemeType;
  dailyTasks: Task[];
  lastTaskRefresh: number;
  username: string;
  isOnline: boolean;
}

// Seviye eşikleri
const LEVEL_THRESHOLDS = [0, 50, 150, 300, 500, 1000, 2000, 5000, 10000];

// Günlük görevler
const TASK_TEMPLATES: Omit<Task, 'id' | 'progress' | 'completed' | 'claimed'>[] = [
  {
    type: 'click_count',
    description: 'Oyunda 100 kez tıkla',
    target: 100,
    reward: 50
  },
  {
    type: 'score_target',
    description: 'Toplam 200 puan kazan',
    target: 200,
    reward: 75
  },
  {
    type: 'use_reward',
    description: 'Herhangi bir ödül kullan',
    target: 1,
    reward: 30
  },
  {
    type: 'click_count',
    description: 'Oyunda 500 kez tıkla',
    target: 500,
    reward: 150
  },
  {
    type: 'score_target',
    description: 'Toplam 1000 puan kazan',
    target: 1000,
    reward: 200
  }
];

// Bir günün milisaniye cinsinden değeri
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    level: 1,
    clickPower: 1,
    totalClicks: 0,
    activeRewards: [],
    // Yeni eklemeler
    theme: 'default',
    dailyTasks: [],
    lastTaskRefresh: 0,
    username: '',
    isOnline: navigator.onLine
  });
  
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [nextClickMultiplier, setNextClickMultiplier] = useState(1);
  
  // useRef ile intervalı tutmak memory leak'i önler
  const autoClickIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const previousLevelRef = useRef<number>(1);
  
  // Çevrimiçi durumunu takip et
  useEffect(() => {
    const handleOnline = () => {
      setGameState(prev => ({...prev, isOnline: true}));
    };
    
    const handleOffline = () => {
      setGameState(prev => ({...prev, isOnline: false}));
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Görevleri oluştur - ilk render ve günlük olarak
  const generateDailyTasks = useCallback(() => {
    // 3 rastgele görev seç
    const shuffled = [...TASK_TEMPLATES].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    
    // Görevleri oluştur
    return selected.map((task, index) => ({
      ...task,
      id: `task_${Date.now()}_${index}`,
      progress: 0,
      completed: false,
      claimed: false
    }));
  }, []);
  
  // Günlük görevleri kontrol et ve gerekirse yenile
  useEffect(() => {
    const currentTime = Date.now();
    const lastRefresh = gameState.lastTaskRefresh;
    
    // Hiç görev yoksa veya son yenilemeden 24 saat geçmişse yenile
    if (gameState.dailyTasks.length === 0 || (currentTime - lastRefresh > ONE_DAY_MS)) {
      const newTasks = generateDailyTasks();
      setGameState(prev => ({
        ...prev,
        dailyTasks: newTasks,
        lastTaskRefresh: currentTime
      }));
    }
  }, [gameState.dailyTasks, gameState.lastTaskRefresh, generateDailyTasks]);
  
  // localStorage'dan oyun durumunu yükle
  useEffect(() => {
    const savedState = localStorage.getItem('tapGameState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        
        // Süresi dolmuş ödülleri temizle
        const currentTime = Date.now();
        const validRewards = parsedState.activeRewards ? 
          parsedState.activeRewards.filter((reward: any) => reward.endTime > currentTime) : 
          [];
        
        const updatedState = {
          ...parsedState,
          activeRewards: validRewards,
          isOnline: navigator.onLine // Çevrimiçi durumu her zaman güncel olmalı
        };
        
        setGameState(prev => ({
          ...prev,
          ...updatedState
        }));
        
        // İlk seviyeyi kaydet
        previousLevelRef.current = updatedState.level || 1;
      } catch (error) {
        console.error('Oyun durumu yüklenirken hata oluştu:', error);
      }
    }
  }, []);
  
  // Oyun durumunu localStorage'a kaydet - Throttled, performans için her 500ms'de bir çalışır
  const saveGameStateRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    if (saveGameStateRef.current) {
      clearTimeout(saveGameStateRef.current);
    }
    
    saveGameStateRef.current = setTimeout(() => {
      localStorage.setItem('tapGameState', JSON.stringify(gameState));
    }, 500);
    
    return () => {
      if (saveGameStateRef.current) {
        clearTimeout(saveGameStateRef.current);
      }
    };
  }, [gameState]);
  
  // Aktif ödülleri kontrol et ve süresi dolanları temizle
  useEffect(() => {
    const checkRewards = () => {
      const currentTime = Date.now();
      const updatedRewards = gameState.activeRewards.filter(reward => reward.endTime > currentTime);
      
      if (updatedRewards.length !== gameState.activeRewards.length) {
        setGameState(prev => ({
          ...prev,
          activeRewards: updatedRewards
        }));
      }
    };
    
    const interval = setInterval(checkRewards, 1000);
    return () => clearInterval(interval);
  }, [gameState.activeRewards]);
  
  // Oto-tıklama ödülünü kontrol et
  useEffect(() => {
    // Otomatik tıklama ödülünü kontrol et
    const hasAutoClick = gameState.activeRewards.some(reward => reward.id === 'auto_tap');
    
    if (hasAutoClick && !autoClickIntervalRef.current) {
      // Her 3 saniyede bir otomatik tıklama
      const interval = setInterval(() => {
        handleTap(true);
      }, 3000);
      
      autoClickIntervalRef.current = interval;
    } else if (!hasAutoClick && autoClickIntervalRef.current) {
      clearInterval(autoClickIntervalRef.current);
      autoClickIntervalRef.current = null;
    }
    
    return () => {
      if (autoClickIntervalRef.current) {
        clearInterval(autoClickIntervalRef.current);
        autoClickIntervalRef.current = null;
      }
    };
  }, [gameState.activeRewards]);
  
  // Seviye değişimini takip et
  useEffect(() => {
    // Seviye atladıysa ve önceki seviyeden yüksekse
    if (gameState.level > previousLevelRef.current) {
      setShowLevelUp(true);
      
      // Telegram haptic feedback
      if (window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
      }
      
      // Seviyeyi güncelle
      previousLevelRef.current = gameState.level;
    }
  }, [gameState.level]);
  
  // Verilen score'a göre seviyeyi hesapla
  const calculateLevelFromScore = useCallback((score: number) => {
    let newLevel = 1;
    
    for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
      if (score >= LEVEL_THRESHOLDS[i]) {
        newLevel = i + 1;
      } else {
        break;
      }
    }
    
    return newLevel;
  }, []);
  
  // Tıklama işlevini yönet
  const handleTap = useCallback((isAuto = false) => {
    // Çevrimdışıysa işlem yapma
    if (!gameState.isOnline) return;
    
    let pointsToAdd = gameState.clickPower;
    
    // Double tap ödülünü kontrol et
    const hasDoubleTap = gameState.activeRewards.some(reward => reward.id === 'double_tap');
    if (hasDoubleTap) {
      pointsToAdd *= 2;
    }
    
    // Altın tıklama ödülünü kontrol et
    if (nextClickMultiplier > 1 && !isAuto) {
      pointsToAdd *= nextClickMultiplier;
      setNextClickMultiplier(1); // Bir kerelik kullanım
    }
    
    setGameState(prev => {
      const newScore = prev.score + pointsToAdd;
      const newTotalClicks = prev.totalClicks + 1;
      
      // Yeni seviyeyi hesapla
      const newLevel = calculateLevelFromScore(newScore);
      
      // Seviye değiştiğinde tıklama gücünü güncelle
      const newClickPower = newLevel > prev.level 
        ? Math.max(newLevel, prev.clickPower) 
        : prev.clickPower;
      
      // Görevleri güncelle
      const updatedTasks = prev.dailyTasks.map(task => {
        let newProgress = task.progress;
        
        // Görev tipine göre ilerlemeyi güncelle
        if (task.type === 'click_count') {
          newProgress = Math.min(task.target, task.progress + 1);
        } else if (task.type === 'score_target') {
          newProgress = Math.min(task.target, task.progress + pointsToAdd);
        }
        
        // Tamamlanma durumunu kontrol et
        const completed = newProgress >= task.target;
        
        return {
          ...task,
          progress: newProgress,
          completed: completed
        };
      });
      
      return {
        ...prev,
        score: newScore,
        totalClicks: newTotalClicks,
        level: newLevel,
        clickPower: newClickPower,
        dailyTasks: updatedTasks
      };
    });
    
    // Haptic feedback - sadece gerçek tıklama için
    if (!isAuto && window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
    }
  }, [gameState.clickPower, gameState.activeRewards, gameState.isOnline, nextClickMultiplier, calculateLevelFromScore]);
  
  // Ödül talep etmeyi yönet
  const claimReward = useCallback((rewardId: string, cost: number) => {
    // Çevrimdışıysa işlem yapma
    if (!gameState.isOnline) return false;
    
    // Puanın yeterli olup olmadığını kontrol et
    if (gameState.score < cost) return false;
    
    // Puanları düş
    setGameState(prev => ({
      ...prev,
      score: prev.score - cost
    }));
    
    // Ödül türüne göre işlem yap
    switch (rewardId) {
      case 'double_tap':
        // 1 dakika çift tıklama
        addActiveReward(rewardId, 60000);
        break;
      
      case 'auto_tap':
        // 2 dakika otomatik tıklama
        addActiveReward(rewardId, 120000);
        break;
      
      case 'bonus_points':
        // 100 bonus puan ekle
        setGameState(prev => {
          const newScore = prev.score + 100;
          // Yeni seviyeyi hesapla
          const newLevel = calculateLevelFromScore(newScore);
          
          // Seviye değiştiğinde tıklama gücünü güncelle
          const newClickPower = newLevel > prev.level 
            ? Math.max(newLevel, prev.clickPower) 
            : prev.clickPower;
          
          return {
            ...prev,
            score: newScore,
            level: newLevel,
            clickPower: newClickPower
          };
        });
        break;
      
      case 'golden_tap':
        // Sonraki tıklama 10 kat
        setNextClickMultiplier(10);
        break;
      
      case 'click_boost':
        // Tıklama gücünü kalıcı olarak +2 arttır
        setGameState(prev => ({
          ...prev,
          clickPower: prev.clickPower + 2
        }));
        break;
    }
    
    // Ödül kullanma görevini güncelle
    setGameState(prev => {
      const updatedTasks = prev.dailyTasks.map(task => {
        if (task.type === 'use_reward') {
          const newProgress = Math.min(task.target, task.progress + 1);
          return {
            ...task,
            progress: newProgress,
            completed: newProgress >= task.target
          };
        }
        return task;
      });
      
      return {
        ...prev,
        dailyTasks: updatedTasks
      };
    });
    
    return true;
  }, [gameState.score, gameState.isOnline, calculateLevelFromScore]);
  
  // Aktif ödül ekle
  const addActiveReward = useCallback((rewardId: string, durationMs: number) => {
    const endTime = Date.now() + durationMs;
    
    setGameState(prev => ({
      ...prev,
      activeRewards: [
        ...prev.activeRewards.filter(r => r.id !== rewardId), // Varsa aynı türdeki önceki ödülü kaldır
        { id: rewardId, endTime }
      ]
    }));
  }, []);
  
  // İlerleme yüzdesini hesapla
  const getProgressPercentage = useCallback(() => {
    if (gameState.level >= LEVEL_THRESHOLDS.length) return 100;
    
    const currentLevelThreshold = LEVEL_THRESHOLDS[gameState.level - 1];
    const nextLevelThreshold = LEVEL_THRESHOLDS[gameState.level];
    const scoreInLevel = gameState.score - currentLevelThreshold;
    const scoreNeededForNextLevel = nextLevelThreshold - currentLevelThreshold;
    
    return Math.min(Math.floor((scoreInLevel / scoreNeededForNextLevel) * 100), 100);
  }, [gameState.level, gameState.score]);
  
  // Bir sonraki seviyeye kalan puanı hesapla
  const getNextLevelThreshold = useCallback(() => {
    const nextLevel = gameState.level < LEVEL_THRESHOLDS.length ? gameState.level : LEVEL_THRESHOLDS.length - 1;
    return LEVEL_THRESHOLDS[nextLevel];
  }, [gameState.level]);
  
  // Tema değiştir
  const changeTheme = useCallback((theme: ThemeType) => {
    setGameState(prev => ({
      ...prev,
      theme
    }));
  }, []);
  
  // Kullanıcı adını güncelle
  const updateUsername = useCallback((username: string) => {
    setGameState(prev => ({
      ...prev,
      username
    }));
  }, []);
  
  // Görev ödülünü talep et
  const claimTaskReward = useCallback((taskId: string) => {
    // Çevrimdışıysa işlem yapma
    if (!gameState.isOnline) return false;
    
    setGameState(prev => {
      const task = prev.dailyTasks.find(t => t.id === taskId);
      
      // Görev bulunamadı, tamamlanmadı veya zaten talep edildi
      if (!task || !task.completed || task.claimed) return prev;
      
      // Ödülü ver ve görevi işaretle
      const updatedTasks = prev.dailyTasks.map(t => {
        if (t.id === taskId) {
          return { ...t, claimed: true };
        }
        return t;
      });
      
      return {
        ...prev,
        score: prev.score + task.reward,
        dailyTasks: updatedTasks
      };
    });
    
    return true;
  }, [gameState.isOnline]);
  
  return {
    score: gameState.score,
    level: gameState.level,
    clickPower: gameState.clickPower,
    totalClicks: gameState.totalClicks,
    activeRewards: gameState.activeRewards,
    dailyTasks: gameState.dailyTasks,
    theme: gameState.theme,
    username: gameState.username,
    isOnline: gameState.isOnline,
    showLevelUp,
    setShowLevelUp,
    handleTap,
    claimReward,
    claimTaskReward,
    getProgressPercentage,
    getNextLevelThreshold,
    changeTheme,
    updateUsername,
    hasGoldenTap: nextClickMultiplier > 1
  };
}; 