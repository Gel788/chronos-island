// Данные о часах для магазина CHRONOS island

// Массив с путями к изображениям часов
const watchImages = [
  '/images/204ab6e2-8d86-11f0-9f5d-1831bf6bdca3_204ab6e4-8d86-11f0-9f5d-1831bf6bdca3.png',
  '/images/204ab6e2-8d86-11f0-9f5d-1831bf6bdca3_204ab6e8-8d86-11f0-9f5d-1831bf6bdca3.png',
  '/images/3df8deb5-d0b4-11ea-bcdf-1831bf6bdca3_81dcfcc1-d0b4-11ea-bcdf-1831bf6bdca3.png',
  '/images/3df8deb5-d0b4-11ea-bcdf-1831bf6bdca3_81dcfcc4-d0b4-11ea-bcdf-1831bf6bdca3.png',
  '/images/71599f1b-7b4d-11ef-9f54-1831bf6bdca3_ab03f704-b244-11ef-9f58-1831bf6bdca3.png',
  '/images/71599f1b-7b4d-11ef-9f54-1831bf6bdca3_ab03f705-b244-11ef-9f58-1831bf6bdca3.png',
  '/images/b545f5d5-9d2e-11eb-bd04-1831bf6bdca3_4bb8e38b-9d2f-11eb-bd04-1831bf6bdca3.png',
  '/images/c06d2bc6-9706-11e8-bc64-1831bf6bdca3_03475ea5-9707-11e8-bc64-1831bf6bdca3.png',
  '/images/c06d2bc6-9706-11e8-bc64-1831bf6bdca3_53c03c31-4fae-11e9-bc88-1831bf6bdca3.png'
]

// Функция для получения изображения по индексу
const getWatchImage = (index) => {
  return watchImages[index % watchImages.length]
}

// Функция для создания SVG изображений часов (резерв)
const createWatchSVG = (brand, color = '#495057') => {
  const colors = {
    'Rolex': '#1a1a1a',
    'Omega': '#003366', 
    'Cartier': '#8B0000',
    'Patek Philippe': '#2F4F4F',
    'Audemars Piguet': '#696969',
    'Breitling': '#000080',
    'TAG Heuer': '#DC143C',
    'IWC': '#2F4F4F',
    'Panerai': '#8B4513',
    'Jaeger-LeCoultre': '#4682B4',
    'Vacheron Constantin': '#2F4F4F',
    'Blancpain': '#000080',
    'Zenith': '#8B0000',
    'Girard-Perregaux': '#696969',
    'Breguet': '#2F4F4F'
  }
  
  const watchColor = colors[brand] || color
  
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="600" fill="#F8F9FA"/>
      <rect x="50" y="50" width="500" height="500" rx="25" fill="#E9ECEF" stroke="#DEE2E6" stroke-width="2"/>
      <circle cx="300" cy="300" r="120" fill="white" stroke="${watchColor}" stroke-width="4"/>
      <circle cx="300" cy="300" r="100" fill="#F8F9FA" stroke="#6C757D" stroke-width="2"/>
      <text x="300" y="320" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="${watchColor}">${brand}</text>
      <line x1="300" y1="300" x2="300" y2="200" stroke="${watchColor}" stroke-width="3" stroke-linecap="round"/>
      <line x1="300" y1="300" x2="360" y2="300" stroke="${watchColor}" stroke-width="2" stroke-linecap="round"/>
      <circle cx="300" cy="300" r="4" fill="${watchColor}"/>
    </svg>
  `)}`
}

export const heroSlides = [
  {
    id: 1,
    title: "Роскошь времени",
    subtitle: "Эксклюзивные коллекции наручных часов от ведущих мировых брендов",
    image: getWatchImage(0),
    productId: 1
  },
  {
    id: 2,
    title: "Точность и стиль",
    subtitle: "Швейцарские механизмы в сочетании с безупречным дизайном",
    image: getWatchImage(1),
    productId: 2
  },
  {
    id: 3,
    title: "Наследие мастерства",
    subtitle: "Часы, которые передаются из поколения в поколение",
    image: getWatchImage(2),
    productId: 3
  },
  {
    id: 4,
    title: "Премиум коллекция",
    subtitle: "Самые престижные модели от легендарных швейцарских мануфактур",
    image: getWatchImage(3),
    productId: 4
  },
  {
    id: 5,
    title: "Спортивная элегантность",
    subtitle: "Профессиональные часы для активного образа жизни",
    image: getWatchImage(4),
    productId: 6
  }
]

export const featuredWatches = [
  {
    id: 1,
    name: "Submariner Date",
    brand: "Rolex",
    price: 450000,
    originalPrice: 500000,
    discount: 10,
    image: getWatchImage(0),
    rating: 5,
    reviews: 127,
    material: "Сталь",
    movement: "Автоматический",
    isNew: true,
    description: "Легендарные дайверские часы Rolex с водонепроницаемостью до 300 метров.",
    features: ["Водонепроницаемость 300м", "Автоматический механизм", "Стальной корпус", "Сапфировое стекло"],
    inStock: true,
    category: "diving"
  },
  {
    id: 4,
    name: "Royal Oak",
    brand: "Audemars Piguet",
    price: 1200000,
    image: getWatchImage(1),
    rating: 5,
    reviews: 67,
    material: "Сталь",
    movement: "Автоматический",
    isNew: true,
    description: "Культовые часы Audemars Piguet с характерным восьмиугольным безелем.",
    features: ["Восьмиугольный безель", "Автоматический механизм", "Стальной корпус", "Tapisserie циферблат"],
    inStock: true,
    category: "luxury"
  },
  {
    id: 2,
    name: "Speedmaster Professional",
    brand: "Omega",
    price: 320000,
    image: getWatchImage(2),
    rating: 5,
    reviews: 89,
    material: "Сталь",
    movement: "Механический",
    isNew: false,
    description: "Знаменитые хронографы Omega, побывавшие на Луне.",
    features: ["Хронограф", "Механический механизм", "Стальной корпус", "Люминесцентные стрелки"],
    inStock: true,
    category: "chronograph"
  },
  {
    id: 3,
    name: "Santos de Cartier",
    brand: "Cartier",
    price: 280000,
    image: getWatchImage(3),
    rating: 4,
    reviews: 156,
    material: "Сталь",
    movement: "Автоматический",
    isNew: false,
    description: "Классические часы Cartier с узнаваемым квадратным дизайном.",
    features: ["Квадратный корпус", "Автоматический механизм", "Стальной браслет", "Римские цифры"],
    inStock: true,
    category: "dress"
  },
  {
    id: 5,
    name: "Nautilus",
    brand: "Patek Philippe",
    price: 1800000,
    image: getWatchImage(4),
    rating: 5,
    reviews: 34,
    material: "Сталь",
    movement: "Автоматический",
    isNew: false,
    description: "Престижные часы Patek Philippe с уникальным дизайном корпуса.",
    features: ["Уникальный дизайн", "Автоматический механизм", "Стальной корпус", "Эксклюзивность"],
    inStock: false,
    category: "luxury"
  },
  {
    id: 6,
    name: "Seamaster Planet Ocean",
    brand: "Omega",
    price: 180000,
    image: getWatchImage(2),
    rating: 4,
    reviews: 203,
    material: "Титан",
    movement: "Автоматический",
    isNew: false,
    description: "Профессиональные дайверские часы Omega с титановым корпусом.",
    features: ["Водонепроницаемость 600м", "Титановый корпус", "Автоматический механизм", "Гелиевый клапан"],
    inStock: true,
    category: "diving"
  },
  {
    id: 19,
    name: "Daytona",
    brand: "Rolex",
    price: 550000,
    image: getWatchImage(0),
    rating: 5,
    reviews: 203,
    material: "Сталь",
    movement: "Автоматический",
    isNew: false,
    description: "Легендарные хронографы Rolex Daytona для автогонок.",
    features: ["Хронограф", "Автоматический механизм", "Стальной корпус", "Тахиметрическая шкала"],
    inStock: false,
    category: "chronograph"
  },
  {
    id: 13,
    name: "Reverso Classic",
    brand: "Jaeger-LeCoultre",
    price: 320000,
    image: getWatchImage(0),
    rating: 5,
    reviews: 98,
    material: "Сталь",
    movement: "Механический",
    isNew: false,
    description: "Культовые часы Jaeger-LeCoultre с переворачивающимся корпусом.",
    features: ["Переворачивающийся корпус", "Механический механизм", "Стальной корпус", "Ручная гравировка"],
    inStock: true,
    category: "dress"
  }
]

// Создаем полный массив всех часов без дубликатов
const allWatchesData = [
  ...featuredWatches,
  {
    id: 7,
    name: "GMT-Master II",
    brand: "Rolex",
    price: 380000,
    image: getWatchImage(0),
    rating: 5,
    reviews: 145,
    material: "Сталь",
    movement: "Автоматический",
    isNew: false,
    description: "Часы для путешественников с функцией GMT и двухцветным безелем.",
    features: ["GMT функция", "Двухцветный безель", "Автоматический механизм", "Стальной корпус"],
    inStock: true,
    category: "travel"
  },
  {
    id: 8,
    name: "Tank Solo",
    brand: "Cartier",
    price: 220000,
    image: getWatchImage(3),
    rating: 4,
    reviews: 98,
    material: "Сталь",
    movement: "Кварцевый",
    isNew: false,
    description: "Элегантные прямоугольные часы Cartier в классическом стиле.",
    features: ["Прямоугольный корпус", "Кварцевый механизм", "Стальной корпус", "Кожаный ремешок"],
    inStock: true,
    category: "dress"
  },
  {
    id: 9,
    name: "Chronomat",
    brand: "Breitling",
    price: 250000,
    image: getWatchImage(5),
    rating: 4,
    reviews: 112,
    material: "Сталь",
    movement: "Автоматический",
    isNew: true,
    description: "Профессиональные хронографы Breitling для авиации и спорта.",
    features: ["Хронограф", "Автоматический механизм", "Стальной корпус", "Люминесцентные метки"],
    inStock: true,
    category: "chronograph"
  },
  {
    id: 10,
    name: "Aquaracer",
    brand: "TAG Heuer",
    price: 120000,
    image: getWatchImage(6),
    rating: 4,
    reviews: 89,
    material: "Сталь",
    movement: "Автоматический",
    isNew: false,
    description: "Спортивные дайверские часы TAG Heuer с современным дизайном.",
    features: ["Водонепроницаемость 300м", "Автоматический механизм", "Стальной корпус", "Поворотный безель"],
    inStock: true,
    category: "diving"
  },
  {
    id: 11,
    name: "Portugieser",
    brand: "IWC",
    price: 350000,
    image: getWatchImage(7),
    rating: 5,
    reviews: 76,
    material: "Сталь",
    movement: "Автоматический",
    isNew: false,
    description: "Классические морские часы IWC с элегантным дизайном.",
    features: ["Классический дизайн", "Автоматический механизм", "Стальной корпус", "Сапфировое стекло"],
    inStock: true,
    category: "dress"
  },
  {
    id: 12,
    name: "Luminor Marina",
    brand: "Panerai",
    price: 280000,
    image: getWatchImage(8),
    rating: 4,
    reviews: 134,
    material: "Сталь",
    movement: "Автоматический",
    isNew: true,
    description: "Итальянские морские часы Panerai с характерным дизайном.",
    features: ["Морской дизайн", "Автоматический механизм", "Стальной корпус", "Защитная скоба"],
    inStock: true,
    category: "diving"
  },
  {
    id: 14,
    name: "Overseas",
    brand: "Vacheron Constantin",
    price: 850000,
    image: getWatchImage(1),
    rating: 5,
    reviews: 45,
    material: "Сталь",
    movement: "Автоматический",
    isNew: true,
    description: "Престижные спортивные часы Vacheron Constantin для путешественников.",
    features: ["Спортивный дизайн", "Автоматический механизм", "Стальной корпус", "Множественные ремешки"],
    inStock: true,
    category: "travel"
  },
  {
    id: 15,
    name: "Fifty Fathoms",
    brand: "Blancpain",
    price: 420000,
    image: getWatchImage(2),
    rating: 5,
    reviews: 67,
    material: "Сталь",
    movement: "Автоматический",
    isNew: false,
    description: "Легендарные дайверские часы Blancpain - прародители всех дайверских часов.",
    features: ["Водонепроницаемость 300м", "Автоматический механизм", "Стальной корпус", "Поворотный безель"],
    inStock: true,
    category: "diving"
  },
  {
    id: 16,
    name: "El Primero",
    brand: "Zenith",
    price: 180000,
    image: getWatchImage(3),
    rating: 4,
    reviews: 156,
    material: "Сталь",
    movement: "Автоматический",
    isNew: true,
    description: "Высокоточные хронографы Zenith с легендарным механизмом El Primero.",
    features: ["Высокоточный хронограф", "Автоматический механизм", "Стальной корпус", "36,000 полуколебаний"],
    inStock: true,
    category: "chronograph"
  },
  {
    id: 17,
    name: "Classique",
    brand: "Breguet",
    price: 650000,
    image: getWatchImage(5),
    rating: 5,
    reviews: 78,
    material: "Золото",
    movement: "Механический",
    isNew: false,
    description: "Элегантные классические часы Breguet с ручной гравировкой.",
    features: ["Ручная гравировка", "Механический механизм", "Золотой корпус", "Гильошированный циферблат"],
    inStock: true,
    category: "luxury"
  },
  {
    id: 18,
    name: "Laureato",
    brand: "Girard-Perregaux",
    price: 320000,
    image: getWatchImage(4),
    rating: 4,
    reviews: 89,
    material: "Сталь",
    movement: "Автоматический",
    isNew: true,
    description: "Спортивные часы Girard-Perregaux с характерным восьмиугольным дизайном.",
    features: ["Восьмиугольный дизайн", "Автоматический механизм", "Стальной корпус", "Интегрированный браслет"],
    inStock: true,
    category: "dress"
  },
  {
    id: 20,
    name: "Constellation",
    brand: "Omega",
    price: 150000,
    image: getWatchImage(2),
    rating: 4,
    reviews: 167,
    material: "Сталь",
    movement: "Автоматический",
    isNew: false,
    description: "Классические часы Omega Constellation с характерными 'когтями'.",
    features: ["Классический дизайн", "Автоматический механизм", "Стальной корпус", "Звездные метки"],
    inStock: true,
    category: "dress"
  },
  {
    id: 21,
    name: "Ballon Bleu",
    brand: "Cartier",
    price: 240000,
    image: getWatchImage(3),
    rating: 4,
    reviews: 145,
    material: "Сталь",
    movement: "Автоматический",
    isNew: true,
    description: "Элегантные круглые часы Cartier с характерным синим сапфиром.",
    features: ["Круглый корпус", "Автоматический механизм", "Стальной корпус", "Синий сапфир"],
    inStock: true,
    category: "dress"
  },
  {
    id: 22,
    name: "Sky-Dweller",
    brand: "Rolex",
    price: 480000,
    image: getWatchImage(0),
    rating: 5,
    reviews: 92,
    material: "Сталь",
    movement: "Автоматический",
    isNew: false,
    description: "Сложные часы Rolex с функцией GMT и годовым календарем.",
    features: ["GMT функция", "Годовой календарь", "Автоматический механизм", "Стальной корпус"],
    inStock: true,
    category: "travel"
  },
  {
    id: 23,
    name: "Aqua Terra",
    brand: "Omega",
    price: 200000,
    image: getWatchImage(2),
    rating: 4,
    reviews: 134,
    material: "Сталь",
    movement: "Автоматический",
    isNew: false,
    description: "Универсальные часы Omega для города и путешествий.",
    features: ["Универсальный дизайн", "Автоматический механизм", "Стальной корпус", "Магнитозащита"],
    inStock: true,
    category: "travel"
  },
  {
    id: 24,
    name: "Calatrava",
    brand: "Patek Philippe",
    price: 950000,
    image: getWatchImage(4),
    rating: 5,
    reviews: 56,
    material: "Золото",
    movement: "Механический",
    isNew: true,
    description: "Классические часы Patek Philippe в чистом стиле.",
    features: ["Классический дизайн", "Механический механизм", "Золотой корпус", "Ручная полировка"],
    inStock: true,
    category: "luxury"
  }
]

// Убираем дубликаты по ID
export const allWatches = allWatchesData.filter((watch, index, self) => 
  index === self.findIndex(w => w.id === watch.id)
)

export const categories = [
  { id: 'all', name: 'Все часы' },
  { id: 'luxury', name: 'Люкс' },
  { id: 'diving', name: 'Дайверские' },
  { id: 'chronograph', name: 'Хронографы' },
  { id: 'dress', name: 'Классические' },
  { id: 'travel', name: 'Путешествия' }
]

export const brands = [
  'Rolex',
  'Omega', 
  'Cartier',
  'Patek Philippe',
  'Audemars Piguet',
  'Breitling',
  'TAG Heuer',
  'IWC',
  'Panerai',
  'Jaeger-LeCoultre',
  'Vacheron Constantin',
  'Blancpain',
  'Zenith',
  'Girard-Perregaux',
  'Breguet'
]

export const storeInfo = {
  name: "CHRONOS island",
  address: "Рио Ленинский, Москва",
  phone: "+7 (495) 123-45-67",
  email: "info@chronosisland.ru",
  workingHours: {
    weekdays: "10:00 - 22:00",
    weekends: "11:00 - 21:00"
  },
  description: "Премиальный магазин наручных часов на Рио Ленинском. Мы предлагаем эксклюзивные коллекции часов от ведущих мировых брендов. Каждая модель проходит тщательную проверку подлинности и качества."
}