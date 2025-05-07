# Telegram Mini-App PRD: Tap-to-Earn Game

## Proje Özeti
Bu proje, Telegram platformu içerisinde çalışacak, kullanıcıların ekrana tıklayarak ödül kazanabileceği bir "Tap-to-Earn" (Tıkla Kazan) mini uygulaması geliştirmeyi amaçlamaktadır. Uygulama, Vite.js ve Tailwind CSS kullanılarak geliştirilecek, Telegram Web App API'sine uygun olarak tasarlanacak ve üstün düzeyde mobil uyumluluk sağlayacaktır.

## Teknik Altyapı
- **Frontend Framework**: Vite.js
- **CSS Framework**: Tailwind CSS
- **Platform**: Telegram Mini App
- **API**: Telegram Web App API
- **Mobil Uyumluluk**: En üst düzeyde (Mobile-First Approach)

## Temel Özellikler
1. **Tıklama Mekanizması**: Kullanıcılar ekrana tıklayarak puan/jeton kazanabilecek
2. **Puan Sistemi**: Kullanıcıların kazandığı puanları görüntüleyebilecekleri sayaç
3. **Görsel Geri Bildirim**: Tıklama anında görsel efektler
4. **Seviye Sistemi**: Belirli puan eşiklerine ulaşıldığında seviye atlama
5. **Ödül Mekanizması**: Kazanılan puanların ödüllere dönüştürülebilmesi
6. **Kullanıcı Profili**: Kullanıcı istatistiklerinin görüntülenebilmesi

## Kullanıcı Deneyimi Akışı
1. Kullanıcı mini uygulamayı Telegram içerisinden açar
2. Karşılama ekranı ve kısa bir açıklama görüntülenir
3. Kullanıcı oyun alanına yönlendirilir
4. Kullanıcı ekrana tıklayarak puan kazanmaya başlar
5. Kazanılan puanlar anlık olarak güncellenir
6. Belirli puan eşiklerinde ödüller veya seviye atlamaları gerçekleşir

## Mobil Uyumluluk Gereksinimleri
- **Mobile-First Tasarım**: Tüm tasarım ve geliştirme süreçleri önce mobil platformlar için optimize edilecek
- **Farklı Ekran Boyutları**: Tüm ekran boyutlarında (özellikle mobil cihazlarda) sorunsuz çalışma
- **Dokunmatik Optimizasyonu**: Tıklama alanları ve butonlar dokunmatik kullanım için optimize edilecek (minimum 44x44px)
- **Performans Optimizasyonu**: Mobil cihazlarda hızlı yükleme ve akıcı deneyim
- **Yatay/Dikey Mod Desteği**: Hem yatay hem dikey modda sorunsuz çalışma
- **Ağ Optimizasyonu**: Düşük bant genişliğinde verimli çalışma
- **Batarya Verimliliği**: Animasyon ve efektlerin batarya tüketimi göz önünde bulundurularak optimize edilmesi

## Tasarım Gereksinimleri
- Telegram'ın tasarım diline uygun arayüz
- Mobil öncelikli ve tüm cihazlarda duyarlı (responsive) tasarım
- Tüm mobil cihaz tiplerine (telefon, tablet) ve ekran boyutlarına uyumluluk
- Kullanıcı dostu, sezgisel arayüz
- Dokunmatik etkileşimler için optimize edilmiş elementler
- Seçilecek renk paleti ile uyumlu görsel elementler
- Mobil kullanım için optimize edilmiş yazı tipleri ve boyutları

## Geliştirme Aşamaları

### Aşama 1: Proje Kurulumu ✅
- [x] Vite.js proje iskeleti oluşturma
- [x] Tailwind CSS entegrasyonu
- [x] Telegram Web App API entegrasyonu
- [x] Proje yapısının düzenlenmesi
- [x] Mobil uyumluluk için temel yapılandırmaların ayarlanması

### Aşama 2: Temel Fonksiyonlar ✅
- [x] Tıklama mekanizmasının geliştirilmesi
- [x] Puan sisteminin implementasyonu
- [x] Kullanıcı arayüzünün temel elementlerinin oluşturulması
- [x] Mobil cihazlar için dokunmatik etkileşim optimizasyonu

### Aşama 3: Görsel Tasarım ✅
- [x] Renk paletinin belirlenmesi
- [x] Kullanıcı arayüzünün detaylandırılması
- [x] Animasyon ve efektlerin eklenmesi
- [x] Mobil cihazlar için responsive tasarım uygulaması
- [x] Farklı ekran boyutları için UI adaptasyonları

### Aşama 4: İleri Özellikler ✅
- [x] Seviye sisteminin geliştirilmesi
- [x] Ödül mekanizmasının implementasyonu
- [x] Kullanıcı profil sayfasının oluşturulması
- [x] Mobil cihazlarda performans optimizasyonu

### Aşama 5: Test ve Optimizasyon ✅
- [x] Performans optimizasyonu
- [x] Çeşitli mobil cihazlarda kapsamlı test
- [x] Farklı ekran boyutlarında UI testleri
- [x] Düşük bant genişliği testleri
- [x] Batarya tüketimi testleri
- [x] Hata ayıklama
- [x] Kullanıcı deneyimi testleri

### Aşama 6: Yayınlama ✅
- [x] Son kontroller ve mobil uyumluluk doğrulaması
- [x] Telegram Bot oluşturma ve yapılandırma
- [x] Mini uygulamanın yayınlanması

## Gelecek Geliştirmeler
- Çoklu oyuncu özelliği
- Liderlik tablosu
- Günlük görevler ve bonuslar
- Özelleştirilebilir temalar
- Sosyal medya entegrasyonu
- Çevrimdışı mod desteği

## Mobil Test Matrisi
| Cihaz Tipi | Ekran Boyutu | İşletim Sistemi | Tarayıcı |
|------------|--------------|-----------------|----------|
| Akıllı Telefon (Küçük) | 320px-375px | iOS/Android | Native WebView |
| Akıllı Telefon (Orta) | 376px-414px | iOS/Android | Native WebView |
| Akıllı Telefon (Büyük) | 415px-480px | iOS/Android | Native WebView |
| Tablet | 481px-768px | iOS/Android | Native WebView |
| Büyük Tablet | 769px-1024px | iOS/Android | Native WebView |

---
*Not: Bu PRD, projenin genel hatlarını belirtmektedir ve geliştirme sürecinde güncellenebilir.* 

# Tap-to-Earn Telegram Bot: Kurulum Rehberi

## Genel Bakış

Bu doküman, Tap-to-Earn mini-oyunu için bir Telegram botu oluşturma ve entegre etme sürecini adım adım açıklamaktadır. Bot, oyunculara kolay erişim sağlayacak, bildirimler gönderecek ve oyun içi etkileşimleri yönetecektir.

## 1. Telegram Bot Kurulumu

### 1.1. BotFather ile Bot Oluşturma

1. Telegram'da [@BotFather](https://t.me/botfather) hesabını açın
2. `/newbot` komutunu gönderin
3. Botunuz için bir isim belirleyin (ör. "Tap to Earn Game")
4. Botunuz için bir kullanıcı adı belirleyin (mutlaka "bot" ile bitmeli, ör. "TapToEarnGameBot")
5. BotFather size bir API token verecektir. Bu tokeni güvenli bir yerde saklayın, API istekleri için gereklidir

### 1.2. Bot Ayarları

1. BotFather'da `/mybots` komutunu kullanarak botunuzu seçin
2. "Edit Bot" > "Edit Description" seçeneği ile bot açıklamasını düzenleyin
   ```
   Tap-to-Earn: Ekrana tıklayarak puan kazanın, seviye atlayın ve ödüller kazanın! Arkadaşlarınızla rekabet edin ve liderlik tablosunda yerinizi alın.
   ```
3. "Edit Bot" > "Edit About" ile kısa bir açıklama ekleyin
4. "Edit Bot" > "Edit Commands" ile bot komutlarını ekleyin:
   ```
   start - Oyunu başlat
   profile - Profilini görüntüle
   rewards - Ödülleri görüntüle
   leaderboard - Liderlik tablosunu görüntüle
   tasks - Günlük görevleri görüntüle
   help - Yardım al
   ```
5. "Edit Bot" > "Edit Bot Image" ile bot profil fotoğrafını yükleyin

### 1.3. Mini Uygulama Oluşturma

1. BotFather'da `/newapp` komutunu gönderin
2. Botunuzu seçin
3. Mini uygulama için bir başlık belirleyin (ör. "Tap-to-Earn")
4. Mini uygulama için kısa bir açıklama yazın
5. Uygulama URL'sini belirtin (oyunun barındırıldığı adres)
6. Mini uygulama fotoğrafı yükleyin
7. Mini uygulama oluşturulduğunda size bir web app URL'si verilecektir

## 2. Sunucu Kurulumu

### 2.1. Temel Gereksinimler

- Node.js (v14.0.0 veya üstü)
- npm veya yarn
- Hosting hizmeti (Vercel, Netlify, Heroku vb.)

### 2.2. Proje Yapılandırması

1. Telegram bot backend projesini oluşturun:
   ```bash
   mkdir tap-to-earn-bot
   cd tap-to-earn-bot
   npm init -y
   ```

2. Gerekli paketleri yükleyin:
   ```bash
   clnpm install telegraf dotenv axios express cors mongodb mongoose
   npm install nodemon --save-dev
   ```

3. `.env` dosyası oluşturun:
   ```
   BOT_TOKEN=7827782759:AAGcyUqzpgz8pLoHfIA-D0c9DHYxDpnXM9A
   MONGODB_URI=mongodb://localhost:27017/tapToEarn
   WEBAPP_URL=http://192.168.0.27:5174
   ```

4. `package.json` içine script ekleyin:
   ```json
   "scripts": {
     "start": "node src/index.js",
     "dev": "nodemon src/index.js"
   }
   ```

## 3. Bot Backend Geliştirme

### 3.1. Temel Bot Yapısı

`src/index.js` dosyasını oluşturun:

```javascript
require('dotenv').config();
const { Telegraf } = require('telegraf');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const scoreRoutes = require('./routes/scoreRoutes');

// Bot oluştur
const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API rotaları
app.use('/api/users', userRoutes);
app.use('/api/scores', scoreRoutes);

// Veritabanı bağlantısı
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB bağlantısı başarılı'))
  .catch(err => console.error('MongoDB bağlantı hatası:', err));

// Bot komutları
bot.command('start', ctx => {
  ctx.reply(`Merhaba ${ctx.from.first_name}! Tap-to-Earn oyununa hoş geldin. Ekrana tıklayarak puan kazan, seviye atla ve ödüller kazanabilirsin.`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🎮 Oyunu Başlat', web_app: { url: process.env.WEBAPP_URL } }]
      ]
    }
  });
});

bot.command('profile', ctx => {
  // Profil bilgilerini getir
  ctx.reply('Profilinize bakılıyor...', {
    reply_markup: {
      inline_keyboard: [
        [{ text: '👤 Profili Görüntüle', web_app: { url: `${process.env.WEBAPP_URL}?page=profile` } }]
      ]
    }
  });
});

bot.command('rewards', ctx => {
  ctx.reply('Ödüller listeleniyor...', {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🎁 Ödülleri Görüntüle', web_app: { url: `${process.env.WEBAPP_URL}?page=rewards` } }]
      ]
    }
  });
});

bot.command('leaderboard', ctx => {
  ctx.reply('Liderlik tablosu getiriliyor...', {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🏆 Liderlik Tablosu', web_app: { url: `${process.env.WEBAPP_URL}?page=leaderboard` } }]
      ]
    }
  });
});

bot.command('tasks', ctx => {
  ctx.reply('Günlük görevler listeleniyor...', {
    reply_markup: {
      inline_keyboard: [
        [{ text: '📋 Görevleri Görüntüle', web_app: { url: `${process.env.WEBAPP_URL}?page=tasks` } }]
      ]
    }
  });
});

bot.command('help', ctx => {
  ctx.reply(
    'Tap-to-Earn Oyun Yardımı:\n\n' +
    '/start - Oyunu başlat\n' +
    '/profile - Profilini görüntüle\n' +
    '/rewards - Ödülleri görüntüle\n' +
    '/leaderboard - Liderlik tablosunu görüntüle\n' +
    '/tasks - Günlük görevleri görüntüle\n' +
    '/help - Bu yardım mesajını görüntüle'
  );
});

// Mini uygulama verilerini al
bot.on('web_app_data', async ctx => {
  const data = JSON.parse(ctx.webAppData.data);
  
  if (data.action === 'share') {
    // Paylaşım işlemi
    ctx.reply(`${ctx.from.first_name} bir başarı paylaştı: ${data.text}`);
  } else if (data.action === 'score_update') {
    // Puan güncellemesi
    ctx.reply(`Tebrikler! Yeni puanınız: ${data.score}`);
  }
});

// Bot'u başlat
bot.launch().then(() => {
  console.log('Bot başlatıldı!');
});

// API sunucusunu başlat
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API sunucusu ${PORT} portunda çalışıyor`);
});

// Graceful kapanış
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
```

### 3.2. Veritabanı Modelleri

`src/models/User.js` dosyasını oluşturun:

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  telegramId: { type: Number, required: true, unique: true },
  username: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  score: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  totalClicks: { type: Number, default: 0 },
  clickPower: { type: Number, default: 1 },
  lastActive: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
```

`src/models/Score.js` dosyasını oluşturun:

```javascript
const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  telegramId: { type: Number, required: true },
  score: { type: Number, required: true },
  level: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Score', scoreSchema);
```

### 3.3. API Rotaları

`src/routes/userRoutes.js` dosyasını oluşturun:

```javascript
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Kullanıcı kaydı veya güncelleme
router.post('/register', async (req, res) => {
  try {
    const { telegramId, username, firstName, lastName } = req.body;

    // Kullanıcıyı bul veya oluştur
    let user = await User.findOne({ telegramId });
    
    if (user) {
      // Mevcut kullanıcıyı güncelle
      user.username = username;
      user.firstName = firstName;
      user.lastName = lastName;
      user.lastActive = Date.now();
      await user.save();
    } else {
      // Yeni kullanıcı oluştur
      user = new User({
        telegramId,
        username,
        firstName,
        lastName
      });
      await user.save();
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Kullanıcı kayıt hatası:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Kullanıcı bilgilerini getir
router.get('/:telegramId', async (req, res) => {
  try {
    const user = await User.findOne({ telegramId: req.params.telegramId });
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'Kullanıcı bulunamadı' });
    }
    
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Kullanıcı getirme hatası:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Kullanıcı puanını güncelle
router.post('/:telegramId/update-score', async (req, res) => {
  try {
    const { score, level, totalClicks, clickPower } = req.body;
    
    const user = await User.findOne({ telegramId: req.params.telegramId });
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'Kullanıcı bulunamadı' });
    }
    
    user.score = score;
    user.level = level;
    user.totalClicks = totalClicks;
    user.clickPower = clickPower;
    user.lastActive = Date.now();
    
    await user.save();
    
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Puan güncelleme hatası:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
```

`src/routes/scoreRoutes.js` dosyasını oluşturun:

```javascript
const express = require('express');
const router = express.Router();
const Score = require('../models/Score');
const User = require('../models/User');

// Skor kaydet
router.post('/', async (req, res) => {
  try {
    const { telegramId, score, level } = req.body;
    
    // Kullanıcıyı bul
    const user = await User.findOne({ telegramId });
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'Kullanıcı bulunamadı' });
    }
    
    // Skoru kaydet
    const newScore = new Score({
      userId: user._id,
      telegramId,
      score,
      level
    });
    
    await newScore.save();
    
    res.status(201).json({ success: true, score: newScore });
  } catch (error) {
    console.error('Skor kayıt hatası:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Liderlik tablosunu getir
router.get('/leaderboard', async (req, res) => {
  try {
    // En yüksek scorelara sahip kullanıcıları getir
    const users = await User.find()
      .sort({ score: -1 })
      .limit(20)
      .select('telegramId username firstName lastName score level');
    
    res.status(200).json({ success: true, leaderboard: users });
  } catch (error) {
    console.error('Liderlik tablosu hatası:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Belirli bir kullanıcının liderlik tablosundaki sırasını al
router.get('/rank/:telegramId', async (req, res) => {
  try {
    const telegramId = parseInt(req.params.telegramId);
    
    // Kullanıcıyı bul
    const user = await User.findOne({ telegramId });
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'Kullanıcı bulunamadı' });
    }
    
    // Kullanıcının puanından yüksek puana sahip kullanıcı sayısını bul
    const rank = await User.countDocuments({ score: { $gt: user.score } });
    
    res.status(200).json({ 
      success: true, 
      rank: rank + 1,
      user: {
        telegramId: user.telegramId,
        username: user.username,
        firstName: user.firstName,
        score: user.score,
        level: user.level
      }
    });
  } catch (error) {
    console.error('Sıralama hesaplama hatası:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
```

## 4. Mini Oyun Entegrasyonu

### 4.1. Mini Oyun Kodu Güncelleme

Mevcut Tap-to-Earn oyununu Telegram Bot ile entegre etmek için aşağıdaki değişiklikleri yapın:

1. API bağlantısı için `src/services/api.ts` dosyasını oluşturun:

```typescript
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const apiService = {
  // Kullanıcı kaydı veya güncelleme
  registerUser: async (userData: {
    telegramId: number;
    username?: string;
    firstName: string;
    lastName?: string;
  }) => {
    try {
      const response = await axios.post(`${API_URL}/users/register`, userData);
      return response.data;
    } catch (error) {
      console.error('Kullanıcı kayıt hatası:', error);
      throw error;
    }
  },
  
  // Kullanıcı bilgilerini getir
  getUserData: async (telegramId: number) => {
    try {
      const response = await axios.get(`${API_URL}/users/${telegramId}`);
      return response.data.user;
    } catch (error) {
      console.error('Kullanıcı bilgisi alma hatası:', error);
      return null;
    }
  },
  
  // Skor güncelle
  updateScore: async (telegramId: number, gameData: {
    score: number;
    level: number;
    totalClicks: number;
    clickPower: number;
  }) => {
    try {
      const response = await axios.post(`${API_URL}/users/${telegramId}/update-score`, gameData);
      return response.data;
    } catch (error) {
      console.error('Skor güncelleme hatası:', error);
      throw error;
    }
  },
  
  // Liderlik tablosunu getir
  getLeaderboard: async () => {
    try {
      const response = await axios.get(`${API_URL}/scores/leaderboard`);
      return response.data.leaderboard;
    } catch (error) {
      console.error('Liderlik tablosu hatası:', error);
      return [];
    }
  },
  
  // Kullanıcı sıralamasını getir
  getUserRank: async (telegramId: number) => {
    try {
      const response = await axios.get(`${API_URL}/scores/rank/${telegramId}`);
      return response.data;
    } catch (error) {
      console.error('Kullanıcı sıralama hatası:', error);
      return null;
    }
  }
};
```

2. `.env` dosyasına API URL ekleyin:

```
VITE_API_URL=http://your-backend-url.com/api
```

3. `src/hooks/useGameState.ts` dosyasında Telegram entegrasyonu yapın:

```typescript
// useGameState.ts içinde Telegram entegrasyonu ekleyin
useEffect(() => {
  // Telegram WebApp nesnesinin varlığını kontrol et
  if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe?.user) {
    const tgUser = window.Telegram.WebApp.initDataUnsafe.user;
    
    // Kullanıcı bilgilerini güncelle
    updateUsername(tgUser.first_name || tgUser.username || 'User');
    
    // API'ye kullanıcı bilgilerini gönder
    const registerUser = async () => {
      try {
        await apiService.registerUser({
          telegramId: tgUser.id,
          username: tgUser.username,
          firstName: tgUser.first_name,
          lastName: tgUser.last_name
        });
        
        // Kullanıcı verilerini al ve oyun durumunu güncelle
        const userData = await apiService.getUserData(tgUser.id);
        if (userData) {
          setGameState(prev => ({
            ...prev,
            score: Math.max(prev.score, userData.score || 0),
            level: Math.max(prev.level, userData.level || 1),
            clickPower: Math.max(prev.clickPower, userData.clickPower || 1),
            totalClicks: Math.max(prev.totalClicks, userData.totalClicks || 0),
            username: userData.firstName || userData.username || prev.username
          }));
        }
      } catch (error) {
        console.error('Kullanıcı kaydı hatası:', error);
      }
    };
    
    registerUser();
  }
}, [updateUsername]);

// Puan değişimini API'ye gönder (throttled)
useEffect(() => {
  // Telegram kullanıcı kimliğini al
  const telegramId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;
  
  if (telegramId && isOnline) {
    const sendScoreUpdate = async () => {
      try {
        await apiService.updateScore(telegramId, {
          score: gameState.score,
          level: gameState.level,
          totalClicks: gameState.totalClicks,
          clickPower: gameState.clickPower
        });
      } catch (error) {
        console.error('Skor güncelleme hatası:', error);
      }
    };
    
    // Belirli aralıklarla güncelleme yap (her 30 saniyede bir)
    const scoreUpdateTimer = setTimeout(sendScoreUpdate, 30000);
    
    return () => clearTimeout(scoreUpdateTimer);
  }
}, [gameState.score, gameState.level, isOnline]);
```

4. `src/components/Leaderboard.tsx` dosyasını API ile entegre edin:

```typescript
// Leaderboard.tsx içinde API ile gerçek verileri kullanın
useEffect(() => {
  const loadLeaderboard = async () => {
    if (!isOnline) {
      setIsLoading(false);
      return;
    }
    
    try {
      // API'den liderlik tablosunu al
      const leaderboardData = await apiService.getLeaderboard();
      
      // Telegram kullanıcı kimliğini al
      const telegramId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;
      
      if (telegramId) {
        // Kullanıcı sıralamasını al
        const rankData = await apiService.getUserRank(telegramId);
        
        if (rankData) {
          setUserRank(rankData.rank);
          
          // Kullanıcı top10'da değilse, ayrıca göster
          const userInTop10 = leaderboardData.some(entry => entry.telegramId === telegramId);
          
          // Tüm kullanıcı girişlerini oluştur
          const formattedEntries = leaderboardData.map(entry => ({
            id: entry.telegramId.toString(),
            name: entry.firstName || entry.username || 'Anonim',
            score: entry.score,
            level: entry.level,
            isCurrentUser: entry.telegramId === telegramId,
            avatar: '👤'
          }));
          
          // Kullanıcı top10'da değilse ve sıralama bilgisi varsa
          if (!userInTop10 && rankData) {
            const userEntry = {
              id: 'user',
              name: username || rankData.user.firstName || rankData.user.username || 'Sen',
              score: rankData.user.score,
              level: rankData.user.level,
              isCurrentUser: true,
              avatar: '👤'
            };
            
            setUserRank(rankData.rank);
            setLeaderboard([...formattedEntries]);
          } else {
            setLeaderboard(formattedEntries);
          }
        }
      } else {
        // Telegram kullanıcı bilgisi yoksa sadece liderlik tablosunu göster
        setLeaderboard(leaderboardData.map(entry => ({
          id: entry.telegramId.toString(),
          name: entry.firstName || entry.username || 'Anonim',
          score: entry.score,
          level: entry.level,
          avatar: '👤'
        })));
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Liderlik tablosu yüklenirken hata oluştu:', error);
      setIsLoading(false);
      
      // Hata durumunda demo verileri kullan
      setLeaderboard(demoLeaderboardData);
    }
  };
  
  loadLeaderboard();
}, [isOnline, username, score, level]);
```

## 5. Dağıtım ve Yayınlama

### 5.1. Backend Dağıtımı

1. Heroku/Vercel/Railway gibi bir platforma bot backend'ini dağıtın
2. MongoDB Atlas veya başka bir MongoDB sağlayıcısında veritabanı oluşturun
3. Çevre değişkenlerini (BOT_TOKEN, MONGODB_URI, WEBAPP_URL) ayarlayın

### 5.2. Frontend Dağıtımı

1. Mini oyun uygulamasını derleyin:
   ```bash
   cd telegram-mini-game
   npm run build
   ```
2. Oluşturulan `dist` klasörünü Vercel, Netlify veya GitHub Pages gibi bir statik hosting hizmetine dağıtın
3. Dağıtılan URL'yi BotFather'da mini uygulama URL'si olarak ayarlayın

### 5.3. Webhook Kurulumu (Opsiyonel)

Sürekli çalışması gereken senaryolar için webhook kurulumu:

```javascript
// Webhook metodu ile çalıştırmak için index.js dosyasında:
const PORT = process.env.PORT || 3000;
const WEBHOOK_DOMAIN = process.env.WEBHOOK_DOMAIN;

app.use(bot.webhookCallback('/webhook'));

bot.telegram.setWebhook(`${WEBHOOK_DOMAIN}/webhook`);

app.listen(PORT, () => {
  console.log(`Bot ve API sunucusu ${PORT} portunda çalışıyor`);
});
```

## 6. Test ve İzleme

### 6.1. Bot Testleri

1. Telegram'da botunuzu açın ve `/start` komutu ile başlatın
2. Tüm komutların doğru çalıştığını kontrol edin
3. Mini uygulamanın doğru yüklendiğini ve oyunun çalıştığını doğrulayın
4. Puan güncellemelerinin kaydedildiğini ve liderlik tablosunda göründüğünü test edin
5. Farklı cihazlarda ve bağlantı durumlarında test edin

### 6.2. İzleme ve Analitik

1. Temel hata izleme için log sistemi ekleyin
2. Kullanıcı istatistiklerini izlemek için bir dashboard oluşturun
3. Bot kullanımını takip etmek için Telegram Analytics ekleyin

## 7. Bakım ve Güncellemeler

### 7.1. Düzenli Bakım

1. Haftalık olarak hata loglarını kontrol edin
2. Veritabanı yedeklerini alın
3. Her ay değişiklikleri test edin ve gerekirse güncellemeleri yapın

### 7.2. Gelecek Geliştirmeler

- Günlük ödül sistemi
- Grup sıralamaları ve yarışmalar
- Özel kampanyalar ve etkinlikler
- Bot ile doğrudan oyun oynama seçenekleri

## 8. Güvenlik ve Ölçeklenebilirlik

### 8.1. Güvenlik Önlemleri

1. Telegram Mini Uygulama verisini doğrulayın
2. Rate limiting uygulayın
3. MongoDB bağlantılarının güvenliğini sağlayın
4. API anahtarlarını ve tokenları güvenli bir şekilde saklayın

### 8.2. Ölçeklenebilirlik

1. Artan kullanıcı sayısı için veritabanı sorguları optimize edin
2. Caching mekanizmaları ekleyin
3. Yük dengeleme için hazırlık yapın

---

**Not:** Bu dökümanda belirtilen adımlar, Tap-to-Earn mini-oyunu için bir Telegram botu kurulumunu kapsamaktadır. Uygulamanızın özel ihtiyaçlarına göre bu adımları değiştirebilir veya genişletebilirsiniz. 