import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle, MapPin, Clock, Phone } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import './Checkout.css'

const Checkout = () => {
  const { items, total, itemCount, clearCart } = useCart()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    comment: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 0) {
      if (value.startsWith('8')) {
        value = '7' + value.slice(1)
      }
      if (value.length > 1) {
        value = '+' + value
      }
      if (value.length > 2) {
        value = value.slice(0, 2) + ' ' + value.slice(2)
      }
      if (value.length > 6) {
        value = value.slice(0, 6) + ' ' + value.slice(6)
      }
      if (value.length > 10) {
        value = value.slice(0, 10) + ' ' + value.slice(10)
      }
      if (value.length > 13) {
        value = value.slice(0, 13) + ' ' + value.slice(13)
      }
      if (value.length > 16) {
        value = value.slice(0, 16) + ' ' + value.slice(16)
      }
    }
    setFormData(prev => ({
      ...prev,
      phone: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Симуляция отправки заказа
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Создаем объект заказа
    const order = {
      id: Date.now(),
      items: items,
      total: total,
      customer: formData,
      pickupLocation: 'ТЦ Рио Ленинский',
      status: 'pending',
      createdAt: new Date().toISOString()
    }

    // Сохраняем заказ в localStorage (в реальном приложении отправляем на сервер)
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    orders.push(order)
    localStorage.setItem('orders', JSON.stringify(orders))

    setIsSuccess(true)
    clearCart()
    
    // Перенаправляем на страницу успеха через 3 секунды
    setTimeout(() => {
      navigate('/')
    }, 3000)
  }

  const formatPrice = (price) => {
    return price.toLocaleString('ru-RU')
  }

  if (items.length === 0 && !isSuccess) {
    return (
      <div className="checkout">
        <div className="container">
          <div className="checkout-header">
            <h1>Оформление заказа</h1>
            <Link to="/cart" className="back-link">
              <ArrowLeft size={20} />
              Вернуться в корзину
            </Link>
          </div>
          
          <div className="empty-checkout">
            <h2>Корзина пуста</h2>
            <p>Добавьте товары в корзину для оформления заказа</p>
            <Link to="/catalog" className="btn btn-primary">
              Перейти к каталогу
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="checkout">
        <div className="container">
          <div className="success-page">
            <div className="success-icon">
              <CheckCircle size={80} />
            </div>
            <h1>Заказ оформлен!</h1>
            <p>Ваш заказ принят в обработку. Мы свяжемся с вами в ближайшее время.</p>
            
            <div className="order-info">
              <h3>Информация о заказе</h3>
              <p><strong>Сумма:</strong> {formatPrice(total)} ₽</p>
              <p><strong>Товаров:</strong> {itemCount} шт.</p>
              <p><strong>Способ получения:</strong> Самовывоз из ТЦ Рио Ленинский</p>
            </div>

            <div className="pickup-details">
              <h4>📍 Адрес самовывоза</h4>
              <p><strong>ТЦ Рио Ленинский</strong></p>
              <p>Москва, Ленинский проспект</p>
              <p>Режим работы: 10:00 - 22:00</p>
              <p>Заказ будет готов к выдаче в течение 1-2 часов</p>
            </div>

            <Link to="/" className="btn btn-primary">
              Вернуться на главную
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout">
      <div className="container">
        <div className="checkout-header">
          <h1>Оформление заказа</h1>
          <Link to="/cart" className="back-link">
            <ArrowLeft size={20} />
            Вернуться в корзину
          </Link>
        </div>

        <div className="checkout-content">
          <div className="checkout-form">
            <form onSubmit={handleSubmit}>
              <div className="form-section">
                <h3>Контактная информация</h3>
                
                <div className="form-group">
                  <label htmlFor="name">Имя *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Введите ваше имя"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Телефон *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    required
                    placeholder="+7 999 123 45 67"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@email.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="comment">Комментарий к заказу</label>
                  <textarea
                    id="comment"
                    name="comment"
                    value={formData.comment}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Дополнительные пожелания..."
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Способ получения</h3>
                <div className="delivery-option">
                  <div className="option-card selected">
                    <div className="option-icon">
                      <MapPin size={24} />
                    </div>
                    <div className="option-content">
                      <h4>Самовывоз из ТЦ Рио Ленинский</h4>
                      <p>Москва, Ленинский проспект</p>
                      <p className="option-price">Бесплатно</p>
                    </div>
                    <div className="option-check">
                      <CheckCircle size={20} />
                    </div>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Оформляем заказ...' : `Оформить заказ на ${formatPrice(total)} ₽`}
              </button>
            </form>
          </div>

          <div className="order-summary">
            <div className="summary-card">
              <h3>Ваш заказ</h3>
              
              <div className="order-items">
                {items.map((item) => (
                  <div key={item.id} className="order-item">
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="item-info">
                      <h4>{item.brand} {item.name}</h4>
                      <p>Количество: {item.quantity}</p>
                      <p className="item-price">{formatPrice(item.price * item.quantity)} ₽</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-total">
                <div className="total-row">
                  <span>Товары ({itemCount} шт.)</span>
                  <span>{formatPrice(total)} ₽</span>
                </div>
                <div className="total-row">
                  <span>Самовывоз</span>
                  <span className="free">Бесплатно</span>
                </div>
                <div className="total-row final">
                  <span>К оплате</span>
                  <span>{formatPrice(total)} ₽</span>
                </div>
              </div>

              <div className="pickup-info">
                <h4>📍 Самовывоз</h4>
                <div className="info-item">
                  <MapPin size={16} />
                  <span>ТЦ Рио Ленинский, Москва</span>
                </div>
                <div className="info-item">
                  <Clock size={16} />
                  <span>Готовность: 1-2 часа</span>
                </div>
                <div className="info-item">
                  <Phone size={16} />
                  <span>+7 (495) 123-45-67</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
