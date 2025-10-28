// test-telegram.js
// Простой тест Telegram бота

const BOT_TOKEN = '8068992681:AAH6YkH82WmCgMTdxF6X5Nf7I4Km0vEWk2w'
const CHAT_ID = '3208977801'

async function testTelegramBot() {
  console.log('🤖 Тестирование Telegram бота...')
  
  try {
    // Проверяем информацию о боте
    const botInfoResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getMe`)
    const botInfo = await botInfoResponse.json()
    
    if (botInfo.ok) {
      console.log('✅ Бот активен:', botInfo.result.first_name, '@' + botInfo.result.username)
    } else {
      console.error('❌ Ошибка получения информации о боте:', botInfo)
      return
    }
    
    // Пробуем отправить сообщение
    const messageResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: `🤖 ТЕСТ БОТА CHRONOS ISLAND

✅ Бот успешно подключен!
📅 Время: ${new Date().toLocaleString('ru-RU')}
🔗 Готов к получению уведомлений о заказах`,
        parse_mode: 'HTML'
      })
    })
    
    const messageResult = await messageResponse.json()
    
    if (messageResult.ok) {
      console.log('✅ Сообщение отправлено успешно!')
      console.log('📱 Message ID:', messageResult.result.message_id)
    } else {
      console.error('❌ Ошибка отправки сообщения:', messageResult)
      
      if (messageResult.error_code === 400 && messageResult.description.includes('chat not found')) {
        console.log('💡 Решение:')
        console.log('1. Напишите боту @CHRONOSisland_bot в личные сообщения')
        console.log('2. Отправьте команду /start')
        console.log('3. Или добавьте бота в группу и получите правильный chat_id')
      }
    }
    
  } catch (error) {
    console.error('❌ Ошибка тестирования:', error)
  }
}

// Запускаем тест
testTelegramBot()
