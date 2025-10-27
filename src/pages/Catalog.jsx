import React, { useState, useMemo } from 'react'
import { Search, Filter, SortAsc, Grid, List } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { allWatches, categories, brands } from '../data/watches'
import './Catalog.css'

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedBrand, setSelectedBrand] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)

  const filteredWatches = useMemo(() => {
    let filtered = allWatches.filter(watch => {
      const matchesSearch = watch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           watch.brand.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || watch.category === selectedCategory
      const matchesBrand = selectedBrand === 'all' || watch.brand === selectedBrand
      
      return matchesSearch && matchesCategory && matchesBrand
    })

    // Сортировка
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [searchTerm, selectedCategory, selectedBrand, sortBy])

  return (
    <div className="catalog">
      <div className="container">
        {/* Заголовок */}
        <div className="catalog-header">
          <h1 className="page-title">Каталог часов</h1>
          <p className="page-subtitle">
            Эксклюзивные коллекции наручных часов от ведущих мировых брендов
          </p>
        </div>

        {/* Панель поиска и фильтров */}
        <div className="catalog-controls">
          <div className="search-section">
            <div className="search-input-wrapper">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Поиск часов..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <button 
              className="filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={20} />
              Фильтры
            </button>
          </div>

          <div className="controls-right">
            <div className="sort-section">
              <SortAsc size={16} />
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="name">По названию</option>
                <option value="price-low">Цена: по возрастанию</option>
                <option value="price-high">Цена: по убыванию</option>
                <option value="rating">По рейтингу</option>
              </select>
            </div>

            <div className="view-toggle">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={16} />
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="catalog-content">
          {/* Фильтры */}
          <div className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
            <div className="filter-section">
              <h3>Категории</h3>
              <div className="filter-options">
                {categories.map(category => (
                  <label key={category.id} className="filter-option">
                    <input
                      type="radio"
                      name="category"
                      value={category.id}
                      checked={selectedCategory === category.id}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    />
                    <span>{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3>Бренды</h3>
              <div className="filter-options">
                <label className="filter-option">
                  <input
                    type="radio"
                    name="brand"
                    value="all"
                    checked={selectedBrand === 'all'}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                  />
                  <span>Все бренды</span>
                </label>
                {brands.map(brand => (
                  <label key={brand} className="filter-option">
                    <input
                      type="radio"
                      name="brand"
                      value={brand}
                      checked={selectedBrand === brand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                    />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Результаты */}
          <div className="catalog-results">
            <div className="results-header">
              <p>Найдено: {filteredWatches.length} товаров</p>
            </div>

            {filteredWatches.length > 0 ? (
              <div className={`products-grid ${viewMode}`}>
                {filteredWatches.map(watch => (
                  <ProductCard key={watch.id} watch={watch} />
                ))}
              </div>
            ) : (
              <div className="no-results">
                <h3>Товары не найдены</h3>
                <p>Попробуйте изменить параметры поиска или фильтры</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Catalog
