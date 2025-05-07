require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const express = require('express');

// Telegram bot oluştur
const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

// Express middlewares
app.use(express.json());

// API endpoint - sağlık kontrolü
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// Telegram bot komutları
bot.start((ctx) => {
  return ctx.reply(
    `Merhaba ${ctx.from.first_name}! Tap-to-Earn oyununa hoş geldiniz.`,
    Markup.keyboard([
      [Markup.button.webApp('🎮 Oyunu Başlat', process.env.WEBAPP_URL)]
    ]).resize()
  );
});

bot.help((ctx) => {
  return ctx.reply(
    'Tap-to-Earn Oyun Yardımı:\n\n' +
    '/start - Oyunu başlat\n' +
    '/help - Bu yardım mesajını görüntüle'
  );
});

// Mini uygulamadan dönen verileri işle
bot.on('web_app_data', (ctx) => {
  try {
    const data = JSON.parse(ctx.webAppData.data);
    
    if (data.action === 'score_update') {
      ctx.reply(`Tebrikler! Yeni puanınız: ${data.score}`);
    } else if (data.action === 'level_up') {
      ctx.reply(`Harika! Seviye ${data.level} oldunuz! 🎉`);
    }
  } catch (error) {
    console.error('Web app data parsing error:', error);
  }
});

// Bot başlat
if (process.env.NODE_ENV === 'production') {
  // Webhook ile çalıştır
  const PORT = process.env.PORT || 3000;
  app.use(bot.webhookCallback('/webhook'));
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    bot.telegram.setWebhook(`${process.env.WEBHOOK_URL}/webhook`);
  });
} else {
  // Long polling ile çalıştır
  bot.launch()
    .then(() => console.log('Bot started with long polling'))
    .catch(err => console.error('Bot start error:', err));
}

// Düzgün kapanma
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM')); 