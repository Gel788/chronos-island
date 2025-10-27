import React from 'react'
import { Link } from 'react-router-dom'
import { Clock, MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Логотип и описание */}
          <div className="footer-section">
            <Link to="/" className="footer-logo">
              <Clock className="logo-icon" />
              <div className="logo-text">
                <span className="logo-main">CHRONOS</span>
                <span className="logo-sub">island</span>
              </div>
            </Link>
            <p className="footer-description">
              Премиальный магазин наручных часов на Рио Ленинском. 
              Эксклюзивные коллекции от ведущих мировых брендов.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-link">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Навигация */}
          <div className="footer-section">
            <h3 className="footer-title">Навигация</h3>
            <ul className="footer-links">
              <li><Link to="/catalog">Каталог часов</Link></li>
              <li><Link to="/about">О нас</Link></li>
              <li><Link to="/contact">Контакты</Link></li>
              <li><a href="#">Доставка и оплата</a></li>
              <li><a href="#">Гарантия</a></li>
            </ul>
          </div>

          {/* Бренды */}
          <div className="footer-section">
            <h3 className="footer-title">Бренды</h3>
            <ul className="footer-links">
              <li><a href="#">Rolex</a></li>
              <li><a href="#">Omega</a></li>
              <li><a href="#">Cartier</a></li>
              <li><a href="#">Patek Philippe</a></li>
              <li><a href="#">Audemars Piguet</a></li>
            </ul>
          </div>

          {/* Контакты */}
          <div className="footer-section">
            <h3 className="footer-title">Контакты</h3>
            <div className="contact-info">
              <div className="contact-item">
                <MapPin size={16} />
                <span>Рио Ленинский, Москва</span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <span>+7 (495) 123-45-67</span>
              </div>
              <div className="contact-item">
                <Mail size={16} />
                <span>info@chronosisland.ru</span>
              </div>
            </div>
            <div className="working-hours">
              <p><strong>Режим работы:</strong></p>
              <p>Пн-Пт: 10:00 - 22:00</p>
              <p>Сб-Вс: 11:00 - 21:00</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 CHRONOS island. Все права защищены.</p>
          <div className="footer-bottom-links">
            <a href="#">Политика конфиденциальности</a>
            <a href="#">Условия использования</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
