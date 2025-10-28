import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingBag, Search, Clock } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { itemCount } = useCart()
  const location = useLocation()

  const navigation = [
    { name: 'Главная', href: '/' },
    { name: 'Каталог', href: '/catalog' },
    { name: 'О нас', href: '/about' },
    { name: 'Контакты', href: '/contact' }
  ]

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Логотип */}
          <Link to="/" className="logo">
            <Clock className="logo-icon" />
            <div className="logo-text">
              <span className="logo-main">CHRONOS</span>
              <span className="logo-sub">island</span>
            </div>
          </Link>

          {/* Навигация для десктопа */}
          <nav className="nav-desktop">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link ${location.pathname === item.href ? 'active' : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Действия */}
          <div className="header-actions">
            <button 
              className="action-btn"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search size={20} />
            </button>
            <Link to="/cart" className="action-btn cart-link">
              <ShoppingBag size={20} />
              {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
            </Link>
            <button 
              className="menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Поиск */}
        {isSearchOpen && (
          <div className="search-bar">
            <div className="search-input-wrapper">
              <Search size={20} className="search-icon" />
              <input 
                type="text" 
                placeholder="Поиск часов..." 
                className="search-input"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Мобильная навигация */}
        {isMenuOpen && (
          <nav className="nav-mobile">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link ${location.pathname === item.href ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/cart"
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Корзина {itemCount > 0 && `(${itemCount})`}
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
