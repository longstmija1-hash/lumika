// Fixed introductory courses approved by the school owner.
// Rates match the existing Standard packages; changing school prices does not
// silently change the published price of an IT course.
export const IT_COURSE_PRICING = [
  {
    name: "Scratch",
    count: 16,
    perLesson: 1260,
    duration: 45,
    result: "Своя игра с персонажами и уровнями",
    stages: [
      "Знакомимся с блоками",
      "Собираем игровую логику",
      "Создаём и показываем игру",
    ],
  },
  {
    name: "JavaScript",
    count: 32,
    perLesson: 1188,
    duration: 45,
    result: "Интерактивный сайт или браузерная мини-игра",
    stages: [
      "Осваиваем HTML и CSS",
      "Добавляем JavaScript",
      "Собираем итоговый проект",
    ],
  },
  {
    name: "Go",
    count: 32,
    perLesson: 1188,
    duration: 45,
    result: "Backend с собственным HTTP API",
    stages: [
      "Разбираемся с языком Go",
      "Работаем с данными",
      "Создаём сервер приложения",
    ],
  },
].map((course) => ({ ...course, total: course.count * course.perLesson }));

export const formatRubles = (value) =>
  new Intl.NumberFormat("ru-RU").format(value);
export const describeItCourse = (course) =>
  `${course.name} · вводный курс · ${course.count} занятий по ${course.duration} минут · ${course.perLesson} ₽/занятие · ${course.total} ₽ за курс`;
