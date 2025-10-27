import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Star, ArrowRight } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { featuredWatches, heroSlides } from '../data/watches'
import './Home.css'

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <div className="home">
      {/* Hero секция */}
      <section className="hero">
        <div className="hero-slider">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="hero-overlay">
                <div className="container">
                  <div className="hero-content">
                    <div className="hero-text">
                      <h1 className="hero-title">{slide.title}</h1>
                      <p className="hero-subtitle">{slide.subtitle}</p>
                      <div className="hero-actions">
                        <Link to="/catalog" className="btn btn-primary">
                          Смотреть коллекцию
                          <ArrowRight size={16} />
                        </Link>
                        <Link to={`/product/${slide.productId}`} className="btn btn-secondary">
                          Подробнее
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <button className="hero-nav hero-nav-prev" onClick={prevSlide}>
            <ChevronLeft size={24} />
          </button>
          <button className="hero-nav hero-nav-next" onClick={nextSlide}>
            <ChevronRight size={24} />
          </button>

          <div className="hero-dots">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* О нас */}
      <section className="about-preview">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="section-title">CHRONOS island</h2>
              <p className="section-subtitle">
                Премиальный магазин наручных часов на Рио Ленинском
              </p>
              <p className="about-description">
                Мы предлагаем эксклюзивные коллекции часов от ведущих мировых брендов. 
                Каждая модель проходит тщательную проверку подлинности и качества. 
                Наши специалисты помогут вам выбрать идеальные часы, которые станут 
                вашим верным спутником на долгие годы.
              </p>
              <Link to="/about" className="btn btn-primary">
                Узнать больше о нас
              </Link>
            </div>
            <div className="about-image">
              <div className="image-placeholder">
                <div className="placeholder-content">
                  <Star size={48} />
                  <p>Эксклюзивные коллекции</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Популярные товары */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Популярные модели</h2>
            <p className="section-subtitle">
              Самые востребованные часы в нашей коллекции
            </p>
          </div>
          
          <div className="products-grid">
            {featuredWatches.map((watch) => (
              <ProductCard key={watch.id} watch={watch} />
            ))}
          </div>

          <div className="section-footer">
            <Link to="/catalog" className="btn btn-primary">
              Смотреть весь каталог
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">
                <Star size={32} />
              </div>
              <h3>Подлинность</h3>
              <p>Все часы проходят проверку подлинности и имеют сертификаты качества</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <Star size={32} />
              </div>
              <h3>Гарантия</h3>
              <p>Официальная гарантия производителя и сервисное обслуживание</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <Star size={32} />
              </div>
              <h3>Доставка</h3>
              <p>Быстрая и безопасная доставка по всей России</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <Star size={32} />
              </div>
              <h3>Консультация</h3>
              <p>Профессиональные консультации по выбору часов</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
