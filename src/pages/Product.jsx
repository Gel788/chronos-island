import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Heart, ShoppingBag, Star, ArrowLeft, Check, Truck, Shield, RotateCcw } from 'lucide-react'
import { allWatches } from '../data/watches'
import { useCart } from '../contexts/CartContext'
import './Product.css'

const Product = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isAddedToCart, setIsAddedToCart] = useState(false)
  
  const watch = allWatches.find(w => w.id === parseInt(id))
  
  if (!watch) {
    return (
      <div className="product-not-found">
        <div className="container">
          <h1>Товар не найден</h1>
          <Link to="/catalog" className="btn btn-primary">
            Вернуться в каталог
          </Link>
        </div>
      </div>
    )
  }

  const images = [
    watch.image,
    watch.image, // В реальном проекте здесь были бы разные углы
    watch.image,
    watch.image
  ]

  const handleAddToCart = () => {
    // Добавляем товар в корзину с выбранным количеством
    for (let i = 0; i < quantity; i++) {
      addToCart(watch)
    }
    setIsAddedToCart(true)
    setTimeout(() => setIsAddedToCart(false), 2000)
  }

  const relatedWatches = allWatches
    .filter(w => w.brand === watch.brand && w.id !== watch.id)
    .slice(0, 4)

  return (
    <div className="product">
      <div className="container">
        {/* Навигация */}
        <div className="product-nav">
          <Link to="/catalog" className="back-link">
            <ArrowLeft size={16} />
            Назад к каталогу
          </Link>
        </div>

        <div className="product-content">
          {/* Галерея изображений */}
          <div className="product-gallery">
            <div className="main-image">
              <img src={images[selectedImage]} alt={watch.name} />
            </div>
            <div className="thumbnails">
              {images.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${index === selectedImage ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${watch.name} ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Информация о товаре */}
          <div className="product-info">
            <div className="product-breadcrumb">
              <span>{watch.brand}</span>
              <span>•</span>
              <span>{watch.category}</span>
            </div>

            <h1 className="product-title">{watch.name}</h1>
            
            <div className="product-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < watch.rating ? 'filled' : 'empty'}
                  />
                ))}
              </div>
              <span className="rating-text">({watch.reviews} отзывов)</span>
            </div>

            <div className="product-price">
              {watch.discount ? (
                <div className="price-container">
                  <span className="price-current">
                    {watch.price.toLocaleString()} ₽
                  </span>
                  <span className="price-original">
                    {watch.originalPrice.toLocaleString()} ₽
                  </span>
                  <span className="discount-badge">-{watch.discount}%</span>
                </div>
              ) : (
                <span className="price-current">
                  {watch.price.toLocaleString()} ₽
                </span>
              )}
            </div>

            <div className="product-description">
              <p>{watch.description}</p>
            </div>

            <div className="product-features">
              <h3>Характеристики</h3>
              <ul>
                {watch.features.map((feature, index) => (
                  <li key={index}>
                    <Check size={16} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="product-actions">
              <div className="quantity-selector">
                <label>Количество:</label>
                <div className="quantity-controls">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>

              <div className="action-buttons">
                <button 
                  className="btn btn-primary add-to-cart"
                  onClick={handleAddToCart}
                  disabled={isAddedToCart}
                >
                  <ShoppingBag size={20} />
                  {isAddedToCart ? `Добавлено ${quantity} шт. в корзину!` : 'Добавить в корзину'}
                </button>
                {isAddedToCart && (
                  <button 
                    className="btn btn-secondary go-to-cart"
                    onClick={() => navigate('/cart')}
                  >
                    Перейти в корзину
                  </button>
                )}
                <button className="btn btn-secondary wishlist">
                  <Heart size={20} />
                  В избранное
                </button>
              </div>
            </div>

            <div className="product-benefits">
              <div className="benefit">
                <Truck size={24} />
                <div>
                  <h4>Бесплатная доставка</h4>
                  <p>По Москве в течение дня</p>
                </div>
              </div>
              <div className="benefit">
                <Shield size={24} />
                <div>
                  <h4>Гарантия подлинности</h4>
                  <p>Официальная гарантия производителя</p>
                </div>
              </div>
              <div className="benefit">
                <RotateCcw size={24} />
                <div>
                  <h4>Возврат 14 дней</h4>
                  <p>Возможность возврата без объяснения причин</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Похожие товары */}
        {relatedWatches.length > 0 && (
          <div className="related-products">
            <h2>Похожие товары</h2>
            <div className="related-grid">
              {relatedWatches.map(relatedWatch => (
                <div key={relatedWatch.id} className="related-card">
                  <Link to={`/product/${relatedWatch.id}`}>
                    <img src={relatedWatch.image} alt={relatedWatch.name} />
                    <h3>{relatedWatch.name}</h3>
                    <p className="related-price">
                      {relatedWatch.price.toLocaleString()} ₽
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Product
