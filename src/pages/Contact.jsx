import React, { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react'
import { storeInfo } from '../data/watches'
import telegramService from '../services/telegramService'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      // Форматируем сообщение для Telegram
      const telegramMessage = `📞 <b>НОВАЯ ЗАЯВКА С САЙТА</b>

👤 <b>Клиент:</b>
• Имя: ${formData.name}
• Email: ${formData.email}
${formData.phone ? `• Телефон: ${formData.phone}` : ''}

📅 <b>Дата заявки:</b> ${new Date().toLocaleString('ru-RU')}

📋 <b>Тема:</b> ${formData.subject || 'Не указана'}

💬 <b>Сообщение:</b>
${formData.message}

🔗 <b>Источник:</b> Форма обратной связи на сайте`

      // Отправляем в Telegram
      await telegramService.sendMessage(telegramMessage)
      
      console.log('✅ Заявка отправлена в Telegram')
      alert('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.')
      
      // Очищаем форму
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
      
    } catch (error) {
      console.error('❌ Ошибка отправки заявки в Telegram:', error)
      alert('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.')
      
      // Очищаем форму даже при ошибке
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    }
  }

  return (
    <div className="contact">
      <div className="container">
        {/* Заголовок */}
        <div className="contact-header">
          <h1 className="page-title">Контакты</h1>
          <p className="page-subtitle">
            Свяжитесь с нами любым удобным способом
          </p>
        </div>

        <div className="contact-content">
          {/* Информация о магазине */}
          <div className="contact-info">
            <h2>Наш магазин</h2>
            <p className="contact-description">
              Посетите наш магазин в торговом центре Рио Ленинский, где вы сможете 
              увидеть и примерить понравившиеся модели часов, а также получить 
              профессиональную консультацию от наших специалистов.
            </p>

            <div className="info-cards">
              <div className="info-card">
                <div className="info-icon">
                  <MapPin size={24} />
                </div>
                <div className="info-content">
                  <h3>Адрес</h3>
                  <p>{storeInfo.address}</p>
                  <p className="info-note">Торговый центр Рио Ленинский, 2 этаж</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <Phone size={24} />
                </div>
                <div className="info-content">
                  <h3>Телефон</h3>
                  <p>{storeInfo.phone}</p>
                  <p className="info-note">Звонки принимаются в рабочее время</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <Mail size={24} />
                </div>
                <div className="info-content">
                  <h3>Email</h3>
                  <p>{storeInfo.email}</p>
                  <p className="info-note">Ответим в течение 24 часов</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <Clock size={24} />
                </div>
                <div className="info-content">
                  <h3>Режим работы</h3>
                  <p>Пн-Пт: {storeInfo.workingHours.weekdays}</p>
                  <p>Сб-Вс: {storeInfo.workingHours.weekends}</p>
                </div>
              </div>
            </div>

            {/* Карта */}
            <div className="map-section">
              <h3>Как добраться</h3>
              <div className="map-placeholder">
                <div className="map-content">
                  <MapPin size={48} />
                  <p>Торговый центр Рио Ленинский</p>
                  <p>Москва, Ленинский проспект</p>
                </div>
              </div>
              <div className="transport-info">
                <div className="transport-item">
                  <h4>🚇 Метро</h4>
                  <p>Станция "Ленинский проспект" (5 минут пешком)</p>
                </div>
                <div className="transport-item">
                  <h4>🚌 Автобус</h4>
                  <p>Остановка "ТЦ Рио" (маршруты 144, 196, 255)</p>
                </div>
                <div className="transport-item">
                  <h4>🚗 Парковка</h4>
                  <p>Бесплатная парковка на территории ТЦ</p>
                </div>
              </div>
            </div>
          </div>

          {/* Форма обратной связи */}
          <div className="contact-form-section">
            <h2>Напишите нам</h2>
            <p className="form-description">
              Есть вопросы о часах или нужна консультация? Заполните форму, 
              и мы обязательно ответим вам.
            </p>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Имя *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Ваше имя"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Телефон</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Тема сообщения</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                >
                  <option value="">Выберите тему</option>
                  <option value="consultation">Консультация по выбору часов</option>
                  <option value="service">Сервисное обслуживание</option>
                  <option value="warranty">Гарантийные вопросы</option>
                  <option value="delivery">Доставка и оплата</option>
                  <option value="other">Другое</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Сообщение *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  placeholder="Опишите ваш вопрос или пожелания..."
                />
              </div>

              <button type="submit" className="btn btn-primary submit-btn">
                <Send size={20} />
                Отправить сообщение
              </button>
            </form>

            <div className="form-note">
              <MessageCircle size={16} />
              <p>
                Мы отвечаем на все сообщения в течение 24 часов. 
                Для срочных вопросов звоните по телефону.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
