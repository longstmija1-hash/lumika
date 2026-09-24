/** Пакеты индивидуальных занятий: уровень сервиса → объём → цена */

export const PRICING_HEADING = 'Стоимость занятий'

export const PRICING_SUB =
  'Сначала выберите формат занятий, затем пакет под вашу цель. Чем больше объём, тем ниже цена одного часа.'

export const PRICING_TRUST_POINTS = [
  'Честный формат: 45 минут в Стандарте и 60+ минут в Премиуме',
  'До 4 бесплатных занятий при первой покупке',
  'Оплата частями: уточните у менеджера',
]

export const HONEST_HOUR_UTP = {
  badge: 'Гарантия честного часа при покупке премиума',
  short: 'Для тарифа «Премиум» фиксируем честные 60+ минут индивидуальной работы.',
  note: 'В Премиуме урок длится 60+ минут: преподаватель не завершает занятие «по звонку», пока не закрыт учебный блок.',
}

export const SERVICE_LEVELS = [
  {
    id: 'standard',
    name: 'Стандарт',
    duration: '45 минут',
    durationNote: 'компактный урок с чётким фокусом',
    features: [
      'Фокусный урок 45 минут без «воды»',
      'Индивидуальная программа под цели ученика',
      'Обратная связь и отчёты для родителя',
      'До 3 переносов и отмен в месяц',
      'Кураторский контроль прогресса ученика',
      'Система жизней и наград на платформе',
    ],
    includesTier: null,
    dark: false,
  },
  {
    id: 'premium',
    name: 'Премиум',
    duration: '60+ минут',
    durationNote: 'полный час + разбор сложных вопросов',
    features: [
      'Честные 60+ минут',
      'Топ-репетиторы с высоким рейтингом',
      'Поддержка в мессенджере между занятиями',
      'Безлимитные переносы и отмены',
      'Бесплатные занятия в подарок при покупке от 16 пакетов',
      'Индивидуальный подход при особых потребностях',
    ],
    includesTier: 'Стандарт',
    dark: true,
  },
]

const PACKAGE_MATRIX = {
  standard: {
    listPerLesson: 1800,
    rows: [
      {
        id: 'standard-4',
        count: 4,
        perLesson: 1440,
        goal: 'Разобрать сложную тему или закрыть один пробел',
        popular: false,
      },
      {
        id: 'standard-8',
        count: 8,
        perLesson: 1314,
        goal: 'Подготовиться к контрольной или самостоятельной',
        popular: false,
      },
      {
        id: 'standard-16',
        count: 16,
        perLesson: 1260,
        goal: 'Закрыть пробелы за четверть без аврала',
        popular: false,
      },
      {
        id: 'standard-32',
        count: 32,
        perLesson: 1188,
        goal: 'Системная подготовка к ОГЭ или ЕГЭ',
        popular: true,
      },
      {
        id: 'standard-64',
        count: 64,
        perLesson: 1134,
        goal: 'Долгосрочная программа с максимальной выгодой',
        popular: false,
      },
    ],
  },
  premium: {
    listPerLesson: 2294,
    rows: [
      {
        id: 'premium-4',
        count: 4,
        perLesson: 1835,
        goal: 'Точечная работа со сложными темами',
        popular: false,
      },
      {
        id: 'premium-8',
        count: 8,
        perLesson: 1674,
        goal: 'Подготовка к контрольным и проверочным',
        popular: false,
      },
      {
        id: 'premium-16',
        count: 16,
        perLesson: 1605,
        goal: 'Стабильный прогресс без перегрузки',
        popular: false,
      },
      {
        id: 'premium-32',
        count: 32,
        perLesson: 1414,
        goal: 'Углублённая подготовка к экзаменам',
        popular: true,
      },
      {
        id: 'premium-64',
        count: 64,
        perLesson: 1445,
        goal: 'Максимум внимания и лучшая цена часа',
        popular: false,
      },
    ],
  },
}

function buildPackages(levelId) {
  const tier = PACKAGE_MATRIX[levelId]
  if (!tier) return []

  return tier.rows.map((row) => {
    const original = tier.listPerLesson * row.count
    const current = row.perLesson * row.count
    const discount = Math.round((1 - current / original) * 100)

    return {
      ...row,
      bonus: 0,
      bonusBlock: false,
      original,
      current,
      discount,
      totalLessons: row.count,
    }
  })
}

export const LESSON_PACKAGES = {
  standard: buildPackages('standard'),
  premium: buildPackages('premium'),
}

export const SUBJECT_RATES = [
  { label: 'Массмаркет: русский, математика', price: '1 200 ₽ / час' },
  { label: 'Нишевые предметы', price: '1 500 ₽ / час' },
  { label: 'IT для взрослых (нейросети, Photoshop)', price: '1 500–2 000 ₽ / час' },
]

export const WEBINARS_PRICING = {
  title: 'Вебинары (групповые)',
  items: [
    { label: 'Любой вебинар (групповой)', price: '450 ₽ / человек' },
  ],
}

export const COURSES_PRICING = {
  title: 'Методички и материалы',
  note: 'Готовые конспекты, шаблоны и материалы для самостоятельной практики.',
  price: 'от 2 990 ₽',
  hint: 'Подбор пакета и точной стоимости после заявки',
}

export const TARIFF_MODAL_MAP = {
  standard: 'standard',
  premium: 'premium',
}