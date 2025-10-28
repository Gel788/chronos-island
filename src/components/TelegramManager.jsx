import React, { useState } from 'react'
import { Send, Bot, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react'
import telegramService from '../services/telegramService'
import './TelegramManager.css'

const TelegramManager = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [lastMessage, setLastMessage] = useState('')
  const [messageStatus, setMessageStatus] = useState('')

  const handleTestMessage = async () => {
    setIsLoading(true)
    setMessageStatus('')
    
    try {
      const success = await telegramService.sendTestMessage()
      if (success) {
        setLastMessage('Тестовое сообщение отправлено успешно!')
        setMessageStatus('success')
      } else {
        setLastMessage('Ошибка отправки тестового сообщения')
        setMessageStatus('error')
      }
    } catch (error) {
      setLastMessage(`Ошибка: ${error.message}`)
      setMessageStatus('error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendCustomMessage = async () => {
    const customMessage = `🛒 <b>ТЕСТОВЫЙ ЗАКАЗ</b>

👤 <b>Клиент:</b>
• Имя: Тестовый Клиент
• Телефон: +7 (999) 123-45-67

📅 <b>Дата заказа:</b> ${new Date().toLocaleString('ru-RU')}
📍 <b>Самовывоз:</b> ТЦ Рио Ленинский

🛍️ <b>Товары (1):</b>
1. Rolex Submariner Date
   💰 450,000 ₽ × 1 = 450,000 ₽

💰 <b>ИТОГО: 450,000 ₽</b>

📊 <b>Статус:</b> ⏳ Ожидает обработки`

    setIsLoading(true)
    setMessageStatus('')
    
    try {
      await telegramService.sendMessage(customMessage)
      setLastMessage('Тестовый заказ отправлен в Telegram!')
      setMessageStatus('success')
    } catch (error) {
      setLastMessage(`Ошибка: ${error.message}`)
      setMessageStatus('error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="telegram-manager">
      <div className="telegram-header">
        <h2>
          <Bot size={24} />
          Telegram Bot Manager
        </h2>
        <div className="bot-info">
          <p><strong>Бот:</strong> @CHRONOSisland_bot</p>
          <p><strong>Chat ID:</strong> 3208977801</p>
          <p><strong>Статус:</strong> <span className="status-active">Активен</span></p>
        </div>
      </div>

      <div className="telegram-actions">
        <div className="action-section">
          <h3>
            <MessageSquare size={20} />
            Тестирование
          </h3>
          <p>Отправьте тестовое сообщение для проверки подключения</p>
          
          <div className="action-buttons">
            <button 
              className="btn btn-primary test-btn"
              onClick={handleTestMessage}
              disabled={isLoading}
            >
              <Send size={16} />
              {isLoading ? 'Отправка...' : 'Отправить тест'}
            </button>
            
            <button 
              className="btn btn-secondary test-order-btn"
              onClick={handleSendCustomMessage}
              disabled={isLoading}
            >
              <Bot size={16} />
              {isLoading ? 'Отправка...' : 'Тестовый заказ'}
            </button>
          </div>
        </div>

        {lastMessage && (
          <div className={`message-result ${messageStatus}`}>
            {messageStatus === 'success' ? (
              <CheckCircle size={20} className="success-icon" />
            ) : (
              <AlertCircle size={20} className="error-icon" />
            )}
            <span>{lastMessage}</span>
          </div>
        )}
      </div>

      <div className="telegram-info">
        <h3>Информация о боте</h3>
        <ul>
          <li>✅ Все новые заказы автоматически отправляются в Telegram</li>
          <li>✅ Уведомления включают полную информацию о клиенте и товарах</li>
          <li>✅ Форматированные сообщения с эмодзи для лучшей читаемости</li>
          <li>✅ Автоматические напоминания о времени готовности заказа</li>
          <li>✅ Поддержка HTML разметки в сообщениях</li>
        </ul>
      </div>

      <div className="telegram-example">
        <h3>Пример уведомления о заказе:</h3>
        <div className="message-preview">
          <pre>{`🛒 НОВЫЙ ЗАКАЗ #123456

👤 Клиент:
• Имя: Иван Петров
• Телефон: +7 (999) 123-45-67
• Email: ivan@example.com

📅 Дата заказа: 15.01.2024, 14:30:00
📍 Самовывоз: ТЦ Рио Ленинский

🛍️ Товары (2):
1. Rolex Submariner Date
   💰 450,000 ₽ × 1 = 450,000 ₽
2. Omega Speedmaster
   💰 320,000 ₽ × 1 = 320,000 ₽

💰 ИТОГО: 770,000 ₽

📊 Статус: ⏳ Ожидает обработки`}</pre>
        </div>
      </div>
    </div>
  )
}

export default TelegramManager
