// get-chat-id.js
// Получение правильного chat_id для Telegram бота

const BOT_TOKEN = '8068992681:AAH6YkH82WmCgMTdxF6X5Nf7I4Km0vEWk2w'

async function getUpdates() {
  console.log('🔍 Получение обновлений от бота...')
  
  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`)
    const data = await response.json()
    
    if (data.ok) {
      console.log('📱 Найдено обновлений:', data.result.length)
      
      if (data.result.length > 0) {
        console.log('\n📋 Доступные чаты:')
        data.result.forEach((update, index) => {
          if (update.message) {
            const chat = update.message.chat
            console.log(`${index + 1}. Chat ID: ${chat.id}`)
            console.log(`   Тип: ${chat.type}`)
            console.log(`   Название: ${chat.title || chat.first_name || 'Личный чат'}`)
            console.log(`   Username: @${chat.username || 'не указан'}`)
            console.log('')
          }
        })
      } else {
        console.log('❌ Нет обновлений. Нужно:')
        console.log('1. Написать боту @CHRONOSisland_bot в личные сообщения')
        console.log('2. Отправить команду /start')
        console.log('3. Затем запустить этот скрипт снова')
      }
    } else {
      console.error('❌ Ошибка получения обновлений:', data)
    }
    
  } catch (error) {
    console.error('❌ Ошибка:', error)
  }
}

getUpdates()
