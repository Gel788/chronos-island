// src/services/telegramService.js
// Сервис для отправки уведомлений в Telegram бот

class TelegramService {
  constructor() {
    this.botToken = '8068992681:AAH6YkH82WmCgMTdxF6X5Nf7I4Km0vEWk2w'
    this.chatId = '-1003208977801' // Правильный chat ID для группы
    this.baseUrl = `https://api.telegram.org/bot${this.botToken}`
  }

  // Отправка сообщения в Telegram
  async sendMessage(text, options = {}) {
    try {
      const url = `${this.baseUrl}/sendMessage`
      const payload = {
        chat_id: this.chatId,
        text: text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
        ...options
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`Telegram API Error: ${errorData.description || response.statusText}`)
      }

      const result = await response.json()
      console.log('✅ Telegram message sent successfully:', result.message_id)
      return result
    } catch (error) {
      console.error('❌ Failed to send Telegram message:', error)
      throw error
    }
  }

  // Форматирование заказа для отправки
  formatOrderMessage(order) {
    const { customer, items, total, pickupLocation, createdAt } = order
    
    const orderNumber = order.id.toString().slice(-6)
    const orderDate = new Date(createdAt).toLocaleString('ru-RU')
    
    let message = `🛒 <b>НОВЫЙ ЗАКАЗ #${orderNumber}</b>\n\n`
    
    // Информация о клиенте
    message += `👤 <b>Клиент:</b>\n`
    message += `• Имя: ${customer.name}\n`
    message += `• Телефон: ${customer.phone}\n`
    if (customer.email) {
      message += `• Email: ${customer.email}\n`
    }
    if (customer.comment) {
      message += `• Комментарий: ${customer.comment}\n`
    }
    
    message += `\n📅 <b>Дата заказа:</b> ${orderDate}\n`
    message += `📍 <b>Самовывоз:</b> ${pickupLocation}\n\n`
    
    // Товары в заказе
    message += `🛍️ <b>Товары (${items.length}):</b>\n`
    items.forEach((item, index) => {
      const itemTotal = item.price * item.quantity
      message += `${index + 1}. ${item.brand} ${item.name}\n`
      message += `   💰 ${item.price.toLocaleString()} ₽ × ${item.quantity} = ${itemTotal.toLocaleString()} ₽\n`
    })
    
    // Итого
    message += `\n💰 <b>ИТОГО: ${total.toLocaleString()} ₽</b>\n\n`
    
    // Статус
    message += `📊 <b>Статус:</b> ${this.getStatusEmoji(order.status)} ${this.getStatusText(order.status)}\n`
    
    // Дополнительная информация
    if (order.moyskladId) {
      message += `🔗 <b>МойСклад ID:</b> ${order.moyskladId}\n`
    }
    
    return message
  }

  // Получение эмодзи статуса
  getStatusEmoji(status) {
    const statusEmojis = {
      'pending': '⏳',
      'processing': '🔄',
      'ready': '✅',
      'completed': '🎉',
      'cancelled': '❌'
    }
    return statusEmojis[status] || '❓'
  }

  // Получение текста статуса
  getStatusText(status) {
    const statusTexts = {
      'pending': 'Ожидает обработки',
      'processing': 'В обработке',
      'ready': 'Готов к выдаче',
      'completed': 'Выдан',
      'cancelled': 'Отменен'
    }
    return statusTexts[status] || 'Неизвестно'
  }

  // Отправка уведомления о новом заказе
  async sendNewOrderNotification(order) {
    try {
      const message = this.formatOrderMessage(order)
      await this.sendMessage(message)
      
      // Отправляем дополнительное уведомление о готовности
      const readyMessage = `⏰ <b>Время готовности:</b> Через 1-2 часа\n`
      const readyMessage2 = `📞 <b>Не забудьте связаться с клиентом!</b>\n`
      
      await this.sendMessage(readyMessage)
      await this.sendMessage(readyMessage2)
      
      return true
    } catch (error) {
      console.error('Failed to send new order notification:', error)
      return false
    }
  }

  // Отправка уведомления об изменении статуса заказа
  async sendStatusUpdateNotification(order, oldStatus, newStatus) {
    try {
      const orderNumber = order.id.toString().slice(-6)
      const message = `📊 <b>ОБНОВЛЕНИЕ СТАТУСА ЗАКАЗА #${orderNumber}</b>\n\n`
      message += `Статус изменен с ${this.getStatusEmoji(oldStatus)} ${this.getStatusText(oldStatus)} на ${this.getStatusEmoji(newStatus)} ${this.getStatusText(newStatus)}\n\n`
      message += `👤 Клиент: ${order.customer.name}\n`
      message += `📞 Телефон: ${order.customer.phone}\n`
      
      await this.sendMessage(message)
      return true
    } catch (error) {
      console.error('Failed to send status update notification:', error)
      return false
    }
  }

  // Отправка ежедневного отчета
  async sendDailyReport(orders) {
    try {
      const today = new Date().toLocaleDateString('ru-RU')
      const todayOrders = orders.filter(order => {
        const orderDate = new Date(order.createdAt).toLocaleDateString('ru-RU')
        return orderDate === today
      })
      
      const totalOrders = todayOrders.length
      const totalRevenue = todayOrders.reduce((sum, order) => sum + order.total, 0)
      const pendingOrders = todayOrders.filter(order => order.status === 'pending').length
      
      let message = `📊 <b>ЕЖЕДНЕВНЫЙ ОТЧЕТ - ${today}</b>\n\n`
      message += `📦 Заказов за день: ${totalOrders}\n`
      message += `💰 Выручка: ${totalRevenue.toLocaleString()} ₽\n`
      message += `⏳ Ожидают обработки: ${pendingOrders}\n\n`
      
      if (todayOrders.length > 0) {
        message += `🛍️ <b>Заказы за день:</b>\n`
        todayOrders.forEach((order, index) => {
          const orderNumber = order.id.toString().slice(-6)
          message += `${index + 1}. #${orderNumber} - ${order.customer.name} - ${order.total.toLocaleString()} ₽\n`
        })
      }
      
      await this.sendMessage(message)
      return true
    } catch (error) {
      console.error('Failed to send daily report:', error)
      return false
    }
  }

  // Тестовая отправка сообщения
  async sendTestMessage() {
    try {
      const message = `🤖 <b>ТЕСТ БОТА CHRONOS ISLAND</b>\n\n`
      message += `✅ Бот успешно подключен!\n`
      message += `📅 Время: ${new Date().toLocaleString('ru-RU')}\n`
      message += `🔗 Готов к получению уведомлений о заказах`
      
      await this.sendMessage(message)
      return true
    } catch (error) {
      console.error('Failed to send test message:', error)
      return false
    }
  }
}

// Создаем единственный экземпляр сервиса
const telegramService = new TelegramService()

export default telegramService
