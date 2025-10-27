import React from 'react'
import { Clock, Star, Users, Award, MapPin, Phone, Mail, Clock as ClockIcon } from 'lucide-react'
import { storeInfo } from '../data/watches'
import './About.css'

const About = () => {
  return (
    <div className="about">
      <div className="container">
        {/* Hero секция */}
        <div className="about-hero">
          <h1 className="page-title">О CHRONOS island</h1>
          <p className="page-subtitle">
            Премиальный магазин наручных часов на Рио Ленинском
          </p>
        </div>

        {/* Основная информация */}
        <div className="about-content">
          <div className="about-text">
            <h2>Наша история</h2>
            <p>
              CHRONOS island — это не просто магазин часов, это место, где встречаются 
              традиции часового искусства и современные технологии. Мы открыли свои двери 
              в 2015 году с целью предоставить москвичам доступ к самым престижным и 
              качественным наручным часам в мире.
            </p>
            <p>
              Наш магазин расположен в одном из самых престижных торговых центров Москвы — 
              Рио Ленинском, что подчеркивает наш статус как поставщика эксклюзивных 
              часовых изделий.
            </p>
            <p>
              За годы работы мы завоевали доверие тысяч клиентов, став их надежным 
              партнером в выборе идеальных часов для любых жизненных ситуаций.
            </p>
          </div>

          <div className="about-image">
            <div className="image-placeholder">
              <div className="placeholder-content">
                <Clock size={64} />
                <p>Магазин CHRONOS island</p>
              </div>
            </div>
          </div>
        </div>

        {/* Наши ценности */}
        <div className="values-section">
          <h2 className="section-title">Наши ценности</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <Star size={32} />
              </div>
              <h3>Качество</h3>
              <p>
                Мы предлагаем только оригинальные часы от ведущих мировых брендов. 
                Каждая модель проходит тщательную проверку подлинности.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Users size={32} />
              </div>
              <h3>Сервис</h3>
              <p>
                Наши специалисты помогут вам выбрать идеальные часы, учитывая ваши 
                предпочтения, стиль жизни и бюджет.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Award size={32} />
              </div>
              <h3>Экспертиза</h3>
              <p>
                Мы обладаем глубокими знаниями в области часового искусства и можем 
                рассказать историю каждой модели.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Clock size={32} />
              </div>
              <h3>Традиции</h3>
              <p>
                Мы чтим традиции часового мастерства и передаем их нашим клиентам, 
                помогая им стать частью этой истории.
              </p>
            </div>
          </div>
        </div>

        {/* Бренды */}
        <div className="brands-section">
          <h2 className="section-title">Наши бренды</h2>
          <p className="section-subtitle">
            Мы работаем с ведущими мировыми производителями часов
          </p>
          <div className="brands-grid">
            {['Rolex', 'Omega', 'Cartier', 'Patek Philippe', 'Audemars Piguet', 'Breitling'].map(brand => (
              <div key={brand} className="brand-card">
                <h3>{brand}</h3>
                <p>Эксклюзивные коллекции</p>
              </div>
            ))}
          </div>
        </div>

        {/* Контакты */}
        <div className="contact-preview">
          <h2 className="section-title">Посетите наш магазин</h2>
          <div className="contact-info">
            <div className="contact-item">
              <MapPin size={24} />
              <div>
                <h3>Адрес</h3>
                <p>{storeInfo.address}</p>
              </div>
            </div>
            <div className="contact-item">
              <Phone size={24} />
              <div>
                <h3>Телефон</h3>
                <p>{storeInfo.phone}</p>
              </div>
            </div>
            <div className="contact-item">
              <Mail size={24} />
              <div>
                <h3>Email</h3>
                <p>{storeInfo.email}</p>
              </div>
            </div>
            <div className="contact-item">
              <ClockIcon size={24} />
              <div>
                <h3>Режим работы</h3>
                <p>Пн-Пт: {storeInfo.workingHours.weekdays}</p>
                <p>Сб-Вс: {storeInfo.workingHours.weekends}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
