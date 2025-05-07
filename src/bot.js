const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();

// Bot bilgileri
const BOT_TOKEN = '7595907260:AAHQqXd9dU1lSnhCNYyWI9Qm1MX4Hql2gB8';
const BOT_ID = 8067544942;
// Telegram'ın örnek mini uygulama URL'sini kullanıyoruz (test için)
const WEBAPP_URL = 'https://telegram-mini-apps-dev.github.io/game-demo/';
const bot = new Telegraf(BOT_TOKEN);

// /start komutu için handler - basitleştirilmiş sürüm
bot.start((ctx) => {
  return ctx.reply(
    `🎮 Tap-to-Earn Oyununa Hoş Geldiniz!\n\nMerhaba ${ctx.from.first_name}! Oyunu başlatmak için aşağıdaki butonu kullanabilirsin.`,
    {
      reply_markup: Markup.keyboard([
        ['🎮 Oyunu Oyna'],
        ['🛠️ Yardım']
      ]).resize()
    }
  );
});

// Klavye butonlarını işle
bot.hears('🎮 Oyunu Oyna', (ctx) => {
  return ctx.reply(
    'Oyunu başlatmak için aşağıdaki butona tıklayın:',
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: '🎮 Oyunu Başlat', web_app: { url: WEBAPP_URL } }]
        ]
      }
    }
  );
});

bot.hears('🛠️ Yardım', (ctx) => {
  return ctx.reply(
    'Tap-to-Earn Oyun Yardımı:\n\n' +
    '- Ekrana tıklayarak puan kazanabilirsiniz\n' +
    '- Puanlarınızla seviye atlayın\n' +
    '- En yüksek skoru elde etmeye çalışın!'
  );
});

// /play komutu - doğrudan oyunu başlatır
bot.command('play', (ctx) => {
  return ctx.reply(
    '🎮 Tap-to-Earn Oyununu Başlat!',
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: '▶️ Hemen Oyna', web_app: { url: WEBAPP_URL } }]
        ]
      }
    }
  );
});

// /help komutu için handler
bot.help((ctx) => {
  return ctx.reply(
    '🌟 Tap-to-Earn Yardım Menüsü 🌟\n\n' +
    '/start - Oyuna genel bakış ve başlatma menüsü\n' +
    '/play - Doğrudan oyunu başlat\n' +
    '/help - Bu yardım menüsünü göster'
  );
});

// Mini uygulamadan dönen verileri işle
bot.on('web_app_data', (ctx) => {
  try {
    const data = JSON.parse(ctx.webAppData.data);
    
    if (data.action === 'score_update') {
      ctx.reply(`🎮 Tebrikler! Yeni puanınız: ${data.score}`);
    } else if (data.action === 'level_up') {
      ctx.reply(`🌟 Harika! Seviye ${data.level} oldunuz! 🎉`);
    }
  } catch (error) {
    console.error('Web app data parsing error:', error);
  }
});

// Bilinmeyen komutları işle
bot.on('text', (ctx) => {
  ctx.reply(
    'Anlaşılmadı. Komutları görmek için /help yazabilirsiniz.',
    Markup.keyboard([
      ['/start', '/play', '/help'],
      ['/profile', '/leaderboard']
    ]).resize()
  );
});

// Bot bilgilerini konsola yazdır
bot.launch()
  .then(() => {
    console.log('Xsnce_Bot başarıyla başlatıldı!');
    console.log(`Bot ID: ${BOT_ID}`);
    console.log(`Bot Token: ${BOT_TOKEN}`);
    console.log(`WebApp URL: ${WEBAPP_URL}`);
  })
  .catch((err) => {
    console.error('Bot başlatılırken hata oluştu:', err);
  });

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM')); 