import { useState, useEffect, useCallback, useMemo } from 'react'
import './App.css'
import ScoreAnimation from './components/ScoreAnimation'
import LevelUpEffect from './components/LevelUpEffect'
import UserProfile from './components/UserProfile'
import RewardModal from './components/RewardModal'
import DailyTasks from './components/DailyTasks'
import ThemeSelector from './components/ThemeSelector'
import Leaderboard from './components/Leaderboard'
import SocialShare from './components/SocialShare'
import { useGameState } from './hooks/useGameState'

// Telegram WebApp'ı global olarak tanımlı
declare global {
  interface Window {
    Telegram: {
      WebApp: any;
    };
  }
}

function App() {
  const [tgInitialized, setTgInitialized] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isRewardsOpen, setIsRewardsOpen] = useState(false)
  const [isTasksOpen, setIsTasksOpen] = useState(false)
  const [isThemeOpen, setIsThemeOpen] = useState(false)
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false)
  const [isSocialShareOpen, setIsSocialShareOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(Date.now())
  
  const {
    score,
    level,
    clickPower,
    totalClicks,
    activeRewards,
    dailyTasks,
    theme,
    username,
    isOnline,
    showLevelUp,
    setShowLevelUp,
    handleTap,
    claimReward,
    claimTaskReward,
    getProgressPercentage,
    getNextLevelThreshold,
    changeTheme,
    updateUsername,
    hasGoldenTap
  } = useGameState();

  // Her saniye saati güncelle - bu aktif ödüllerin zaman göstergesini güncellemek için gerekli
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Telegram WebApp nesnesinin varlığını kontrol et
    const initTelegram = () => {
      if (window.Telegram && window.Telegram.WebApp) {
        // WebApp'ı başlat
        window.Telegram.WebApp.ready()
        // Main Button'ı temizle (eğer varsa)
        if (window.Telegram.WebApp.MainButton.isVisible) {
          window.Telegram.WebApp.MainButton.hide()
        }
        setTgInitialized(true)
        
        // Tema rengini ayarla
        document.documentElement.classList.add('theme-custom')
        
        // Tema değişikliğini dinle
        window.Telegram.WebApp.onEvent('themeChanged', () => {
          // Koyu tema kontrolü
          const isDarkTheme = window.Telegram.WebApp.colorScheme === 'dark'
          if (isDarkTheme) {
            document.documentElement.classList.add('dark-theme')
          } else {
            document.documentElement.classList.remove('dark-theme')
          }
        })

        // Telegram'a haptic feedback izni iste
        window.Telegram.WebApp.enableClosingConfirmation()
        
        // Kullanıcı adını al (varsa)
        if (window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user) {
          const tgUser = window.Telegram.WebApp.initDataUnsafe.user;
          const displayName = tgUser.first_name || tgUser.username || 'User';
          updateUsername(displayName);
        }
      } else {
        console.log('Telegram WebApp API bulunamadı. Tarayıcı ortamında olabilirsiniz.')
      }
    }

    initTelegram()
  }, [updateUsername])
  
  // Temayı uygula
  useEffect(() => {
    // Tüm tema sınıflarını temizle
    document.documentElement.classList.remove('theme-neon', 'theme-pastel', 'theme-dark');
    
    // Seçilen temayı ekle
    if (theme !== 'default') {
      document.documentElement.classList.add(`theme-${theme}`);
    }
  }, [theme]);
  
  // Çevrimdışı mod için sınıf ekle veya kaldır
  useEffect(() => {
    if (isOnline) {
      document.body.classList.remove('offline-mode');
    } else {
      document.body.classList.add('offline-mode');
    }
  }, [isOnline]);

  // Add after the online/offline effect:
  useEffect(() => {
    // Service Worker'dan online/offline durumu mesajlarını dinle
    if ('serviceWorker' in navigator) {
      const handleServiceWorkerMessage = (event: MessageEvent) => {
        if (event.data && event.data.type === 'ONLINE_STATUS') {
          const { isOnline: newOnlineStatus } = event.data;
          // useGameState hook'undaki isOnline state'i zaten window.navigator.onLine değişikliklerini dinliyor
          // burada ek bir işlem yapmaya gerek yok
        }
        
        if (event.data && event.data.type === 'OFFLINE_MODE') {
          // Kullanıcıya çevrimdışı mod hakkında bilgi vermek için Toast veya uyarı göster
          console.log('Service Worker Mesajı:', event.data.message);
        }
      };
      
      navigator.serviceWorker.addEventListener('message', handleServiceWorkerMessage);
      
      return () => {
        navigator.serviceWorker.removeEventListener('message', handleServiceWorkerMessage);
      };
    }
  }, []);

  // DoubleTap ödülünün aktif olup olmadığını kontrol et
  const hasDoubleTap = useMemo(() => {
    return activeRewards.some(reward => reward.id === 'double_tap');
  }, [activeRewards]);

  // Tıklama olayını işle - useCallback ile optimize edildi
  const onTapAreaClick = useCallback(() => {
    handleTap()
    
    // Tıklama animasyonu
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 150)
  }, [handleTap])

  // Profil açma/kapama - useCallback ile optimize edildi
  const toggleProfile = useCallback(() => {
    setIsProfileOpen(prev => !prev)
  }, [])
  
  // Ödüller açma/kapama - useCallback ile optimize edildi
  const toggleRewards = useCallback(() => {
    setIsRewardsOpen(prev => !prev)
  }, [])
  
  // Görevler açma/kapama
  const toggleTasks = useCallback(() => {
    setIsTasksOpen(prev => !prev)
  }, [])
  
  // Tema seçici açma/kapama
  const toggleTheme = useCallback(() => {
    setIsThemeOpen(prev => !prev)
  }, [])
  
  // Liderlik tablosu açma/kapama
  const toggleLeaderboard = useCallback(() => {
    setIsLeaderboardOpen(prev => !prev)
  }, [])
  
  // Sosyal paylaşım açma/kapama
  const toggleSocialShare = useCallback(() => {
    setIsSocialShareOpen(prev => !prev)
  }, [])
  
  // Ödül talep edildiğinde - useCallback ile optimize edildi
  const handleRewardClaim = useCallback((rewardId: string, cost: number) => {
    return claimReward(rewardId, cost)
  }, [claimReward])
  
  // Aktif ödülleri göster - useMemo ile optimize edildi
  const activeRewardsElement = useMemo(() => {
    if (activeRewards.length === 0 && !hasGoldenTap) return null;
    
    return (
      <div className="active-rewards flex gap-2 mb-4 justify-center">
        {activeRewards.map(reward => {
          const timeLeft = Math.max(0, Math.floor((reward.endTime - currentTime) / 1000));
          const minutes = Math.floor(timeLeft / 60);
          const seconds = timeLeft % 60;
          
          // Süre bittiğinde otomatik olarak gizlenecek
          if (timeLeft <= 0) return null;
          
          let icon = '🔍';
          if (reward.id === 'double_tap') icon = '⚡';
          else if (reward.id === 'auto_tap') icon = '🤖';
          
          return (
            <div key={reward.id} className="px-2 py-1 bg-bordo-100 rounded-full text-xs flex items-center">
              <span className="mr-1">{icon}</span>
              <span className="text-bordo-700">{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
            </div>
          )
        })}
        
        {hasGoldenTap && (
          <div className="px-2 py-1 bg-krem-200 rounded-full text-xs flex items-center animate-pulse">
            <span className="mr-1">👑</span>
            <span className="text-bordo-700">Altın Tıklama</span>
          </div>
        )}
      </div>
    )
  }, [activeRewards, hasGoldenTap, currentTime]);

  // Level up efekti tamamlandığında - useCallback ile optimize edildi
  const handleLevelUpComplete = useCallback(() => {
    setShowLevelUp(false)
  }, [setShowLevelUp]);
  
  // Tamamlanmış ama talep edilmemiş görevlerin sayısı
  const pendingTasksCount = useMemo(() => {
    return dailyTasks.filter(task => task.completed && !task.claimed).length;
  }, [dailyTasks]);

  return (
    <div className={`app-container min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-krem-100 to-acik-50`}>
      {/* Üst Menü */}
      <div className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 z-10">
        <div className="flex gap-2">
          <button 
            onClick={toggleProfile}
            className="w-10 h-10 rounded-full bg-koyu-800 text-acik-50 flex items-center justify-center shadow-md"
          >
            <span className="text-lg">👤</span>
          </button>
          
          <button 
            onClick={toggleTasks}
            className="w-10 h-10 rounded-full bg-krem-600 text-acik-50 flex items-center justify-center shadow-md relative"
          >
            <span className="text-lg">📋</span>
            {pendingTasksCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                {pendingTasksCount}
              </span>
            )}
          </button>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={toggleLeaderboard}
            className="w-10 h-10 rounded-full bg-koyu-700 text-acik-50 flex items-center justify-center shadow-md"
            disabled={!isOnline}
          >
            <span className="text-lg">🏆</span>
          </button>
          
          <button 
            onClick={toggleRewards}
            className="w-10 h-10 rounded-full bg-bordo-600 text-acik-50 flex items-center justify-center shadow-md"
          >
            <span className="text-lg">🎁</span>
          </button>
        </div>
      </div>
      
      {/* Çevrimdışı uyarısı */}
      {!isOnline && (
        <div className="offline-badge">
          📶 Çevrimdışı mod - Bazı özellikler devre dışı
        </div>
      )}
      
      <header className="text-center mb-6 mt-16">
        <h1 className="text-2xl font-bold mb-1 text-bordo-700">Tap-to-Earn</h1>
        <p className="text-sm text-koyu-800">Ekrana tıklayarak puan kazan!</p>
      </header>

      {/* Aktif ödüller */}
      {activeRewardsElement}

      <div className="level-indicator w-full max-w-md mb-6">
        <div className="flex justify-between text-xs text-koyu-700 mb-1">
          <span className="font-medium">Seviye {level}</span>
          <span>{score} / {getNextLevelThreshold()} puan</span>
        </div>
        <div className="w-full bg-krem-200 rounded-full h-3 shadow-inner">
          <div 
            className="bg-bordo-600 h-3 rounded-full transition-all duration-500 ease-out shadow-sm" 
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>
      </div>

      <main className="flex-1 w-full max-w-md flex flex-col items-center justify-center">
        <div 
          onClick={onTapAreaClick}
          className={`tap-area bg-gradient-to-b from-bordo-500 to-bordo-700 w-full h-64 rounded-2xl flex items-center justify-center shadow-lg cursor-pointer active:scale-95 transition-transform duration-150 border-2 border-bordo-300 ${isAnimating ? 'scale-95' : ''} ${hasGoldenTap ? 'golden-tap' : ''} ${!isOnline ? 'opacity-80' : ''}`}
          data-click-power={clickPower}
          data-double-tap={hasDoubleTap}
          data-golden-tap={hasGoldenTap}
        >
          <div className="tap-content flex flex-col items-center">
            <span className="tap-icon text-4xl mb-2">{hasGoldenTap ? '👑' : '👆'}</span>
            <p className="text-lg font-medium text-acik-50">Tıkla ve Kazan!</p>
            {hasGoldenTap && (
              <span className="text-xs bg-krem-200 text-bordo-700 px-2 py-1 rounded-full mt-2 font-bold animate-pulse">
                10x BONUS!
              </span>
            )}
            {!isOnline && (
              <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full mt-2 font-medium">
                ⚠️ Çevrimdışı Mod
              </span>
            )}
          </div>
        </div>
        
        <div className="score-display mt-6 text-center bg-koyu-800 text-acik-50 rounded-xl p-4 shadow-md">
          <p className="text-3xl font-bold">{score}</p>
          <p className="text-xs uppercase tracking-wide">Toplam Puan</p>
        </div>

        <div className="info-panel mt-4 p-4 bg-krem-200 rounded-lg w-full text-center shadow-md">
          <p className="text-sm font-medium text-koyu-800">Seviye {level}</p>
          <p className="text-xs text-koyu-700">Her tıklamada <span className="font-bold text-bordo-700">+{clickPower}</span> puan kazanıyorsun</p>
          {hasDoubleTap && (
            <p className="text-xs text-bordo-700 mt-1 font-medium">⚡ Çift Tıklama aktif! (x2)</p>
          )}
        </div>
        
        {/* Alt butonlar */}
        <div className="mt-6 grid grid-cols-2 gap-2 w-full">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-krem-100 hover:bg-krem-200 text-koyu-800 flex items-center justify-center shadow-sm"
          >
            <span className="mr-2">🎨</span>
            <span className="text-sm font-medium">Tema Değiştir</span>
          </button>
          
          <button 
            onClick={toggleSocialShare}
            className={`p-2 rounded-lg flex items-center justify-center shadow-sm ${
              isOnline 
                ? 'bg-bordo-100 hover:bg-bordo-200 text-bordo-800' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            disabled={!isOnline}
          >
            <span className="mr-2">📢</span>
            <span className="text-sm font-medium">Paylaş</span>
        </button>
        </div>
      </main>

      <footer className="mt-8 text-center text-xs text-koyu-500 mb-4">
        <p className="flex items-center justify-center">
          <span className={`inline-block w-2 h-2 rounded-full mr-1 ${isOnline ? tgInitialized ? 'bg-green-500' : 'bg-yellow-500' : 'bg-red-500'}`}></span>
          {tgInitialized ? isOnline ? 'Telegram bağlantısı aktif' : 'Çevrimdışı mod' : 'Telegram bağlantısı kurulamadı'}
        </p>
      </footer>

      {/* Puan animasyonu bileşeni */}
      <ScoreAnimation />
      
      {/* Seviye atlama efekti */}
      <LevelUpEffect 
        level={level}
        show={showLevelUp} 
        onComplete={handleLevelUpComplete}
      />
      
      {/* Kullanıcı profili */}
      {isProfileOpen && (
        <UserProfile 
          level={level}
          score={score}
          clickPower={clickPower}
          totalClicks={totalClicks}
          username={username || 'Oyuncu'}
          onClose={toggleProfile}
        />
      )}
      
      {/* Ödüller modalı */}
      {isRewardsOpen && (
        <RewardModal 
          isOpen={isRewardsOpen}
          onClose={toggleRewards}
          userScore={score}
          onRewardClaim={handleRewardClaim}
          isOnline={isOnline}
        />
      )}
      
      {/* Görevler modalı */}
      {isTasksOpen && (
        <DailyTasks 
          tasks={dailyTasks}
          onClaimReward={claimTaskReward}
          isOnline={isOnline}
          onClose={toggleTasks}
        />
      )}
      
      {/* Tema seçici */}
      {isThemeOpen && (
        <ThemeSelector 
          currentTheme={theme}
          onThemeChange={changeTheme}
          isOnline={isOnline}
          onClose={toggleTheme}
        />
      )}
      
      {/* Liderlik tablosu */}
      {isLeaderboardOpen && (
        <Leaderboard 
          username={username}
          score={score}
          level={level}
          isOnline={isOnline}
          onClose={toggleLeaderboard}
        />
      )}
      
      {/* Sosyal paylaşım */}
      {isSocialShareOpen && (
        <SocialShare 
          score={score}
          level={level}
          isOnline={isOnline}
          onClose={toggleSocialShare}
        />
      )}
      </div>
  )
}

export default App
