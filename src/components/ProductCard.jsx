import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingBag, Star } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import './ProductCard.css'

const ProductCard = ({ watch }) => {
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(watch)
  }

  return (
    <div className="product-card">
      <div className="product-image">
        <Link to={`/product/${watch.id}`}>
          <img src={watch.image} alt={watch.name} />
        </Link>
        <div className="product-actions">
          <button className="action-btn wishlist-btn">
            <Heart size={18} />
          </button>
          <button 
            className="action-btn cart-btn"
            onClick={handleAddToCart}
            title="Добавить в корзину"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
        {watch.isNew && <div className="product-badge new">Новинка</div>}
        {watch.discount && <div className="product-badge discount">-{watch.discount}%</div>}
      </div>
      
      <div className="product-info">
        <div className="product-brand">{watch.brand}</div>
        <h3 className="product-name">
          <Link to={`/product/${watch.id}`}>{watch.name}</Link>
        </h3>
        
        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < watch.rating ? 'filled' : 'empty'}
              />
            ))}
          </div>
          <span className="rating-text">({watch.reviews})</span>
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
            </div>
          ) : (
            <span className="price-current">
              {watch.price.toLocaleString()} ₽
            </span>
          )}
        </div>
        
        <div className="product-features">
          <span className="feature">{watch.material}</span>
          <span className="feature">{watch.movement}</span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
