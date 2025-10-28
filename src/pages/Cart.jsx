import React from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import './Cart.css'

const Cart = () => {
  const { items, total, itemCount, removeFromCart, updateQuantity, clearCart } = useCart()

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId)
    } else {
      updateQuantity(itemId, newQuantity)
    }
  }

  const formatPrice = (price) => {
    return price.toLocaleString('ru-RU')
  }

  if (items.length === 0) {
    return (
      <div className="cart">
        <div className="container">
          <div className="cart-header">
            <h1>Корзина</h1>
            <Link to="/catalog" className="back-link">
              <ArrowLeft size={20} />
              Вернуться к каталогу
            </Link>
          </div>
          
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <ShoppingBag size={64} />
            </div>
            <h2>Корзина пуста</h2>
            <p>Добавьте товары из каталога, чтобы оформить заказ</p>
            <Link to="/catalog" className="btn btn-primary">
              Перейти к каталогу
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart">
      <div className="container">
        <div className="cart-header">
          <h1>Корзина ({itemCount} товаров)</h1>
          <Link to="/catalog" className="back-link">
            <ArrowLeft size={20} />
            Вернуться к каталогу
          </Link>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                
                <div className="item-details">
                  <h3 className="item-brand">{item.brand}</h3>
                  <h4 className="item-name">{item.name}</h4>
                  <div className="item-specs">
                    <span className="spec">{item.material}</span>
                    <span className="spec">{item.movement}</span>
                  </div>
                </div>

                <div className="item-quantity">
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div className="item-price">
                  <span className="price">{formatPrice(item.price * item.quantity)} ₽</span>
                  <span className="price-per-item">{formatPrice(item.price)} ₽ за шт.</span>
                </div>

                <button 
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                  title="Удалить из корзины"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h3>Итого</h3>
              
              <div className="summary-row">
                <span>Товары ({itemCount} шт.)</span>
                <span>{formatPrice(total)} ₽</span>
              </div>
              
              <div className="summary-row">
                <span>Доставка</span>
                <span className="free">Самовывоз - бесплатно</span>
              </div>
              
              <div className="summary-row total">
                <span>К оплате</span>
                <span>{formatPrice(total)} ₽</span>
              </div>

              <div className="cart-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={clearCart}
                >
                  Очистить корзину
                </button>
                <Link to="/checkout" className="btn btn-primary">
                  Оформить заказ
                </Link>
              </div>

              <div className="pickup-info">
                <h4>📍 Самовывоз</h4>
                <p><strong>ТЦ Рио Ленинский</strong></p>
                <p>Москва, Ленинский проспект</p>
                <p>Режим работы: 10:00 - 22:00</p>
                <p>Заказ будет готов к выдаче в течение 1-2 часов</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
