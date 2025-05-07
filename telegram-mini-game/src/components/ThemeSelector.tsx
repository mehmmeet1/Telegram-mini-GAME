import React from 'react';
import type { ThemeType } from '../hooks/useGameState';

interface ThemeSelectorProps {
  currentTheme: ThemeType;
  onThemeChange: (theme: ThemeType) => void;
  onClose: () => void;
  isOnline: boolean;
}

const themes: { id: ThemeType; name: string; icon: string; description: string }[] = [
  {
    id: 'default',
    name: 'Klasik',
    icon: '🌟',
    description: 'Standart parlak tema'
  },
  {
    id: 'dark',
    name: 'Karanlık',
    icon: '🌙',
    description: 'Göz yorgunluğunu azaltan gece modu'
  },
  {
    id: 'neon',
    name: 'Neon',
    icon: '💫',
    description: 'Parlak, canlı ve enerjik'
  },
  {
    id: 'pastel',
    name: 'Pastel',
    icon: '🍧',
    description: 'Yumuşak ve sakin renkler'
  }
];

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onThemeChange,
  onClose,
  isOnline
}) => {
  const handleThemeChange = (theme: ThemeType) => {
    if (!isOnline) {
      alert('Tema değiştirmek için internet bağlantısı gerekiyor!');
      return;
    }
    
    onThemeChange(theme);
    
    // Haptic feedback
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-20">
      <div className="bg-acik-50 rounded-xl max-w-md w-full mx-4 max-h-[80vh] flex flex-col">
        <div className="p-4 border-b border-krem-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-koyu-800">Tema Seçimi</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-krem-200 text-koyu-800"
          >
            ✕
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            {themes.map(theme => (
              <div 
                key={theme.id}
                onClick={() => handleThemeChange(theme.id)}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  currentTheme === theme.id
                    ? 'bg-bordo-100 border-2 border-bordo-500'
                    : 'bg-krem-100 hover:bg-krem-200'
                }`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{theme.icon}</div>
                  <h3 className="font-medium text-koyu-800">{theme.name}</h3>
                  <p className="text-xs mt-1 text-koyu-600">{theme.description}</p>
                </div>
                
                {currentTheme === theme.id && (
                  <div className="mt-2 text-center">
                    <span className="inline-block py-1 px-2 bg-bordo-500 text-white text-xs rounded-full">
                      Aktif
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="border-t border-krem-200 p-3">
          {!isOnline && (
            <p className="text-xs text-center text-red-500 font-medium">
              ⚠️ Çevrimdışı moddasınız. Tema değiştirmek için internet bağlantısı gerekiyor.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ThemeSelector); 