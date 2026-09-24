"use client";
import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { trackFunnel } from "../lib/funnelAnalytics";
import "./CourseRoadmap.css";

const programs = [
  {
    name: "Scratch",
    count: 16,
    entry: "С нуля · не нужно уметь писать код",
    stages: [
      {
        range: "1–4",
        title: "Оживляем идею",
        text: "Сцена, персонажи, движение и события. Учимся собирать последовательность команд.",
        result: "Анимированная история",
      },
      {
        range: "5–10",
        title: "Думаем как разработчик",
        text: "Условия, циклы, переменные и счёт. Разбираемся, как игра реагирует на действия игрока.",
        result: "Игровой прототип",
      },
      {
        range: "11–16",
        title: "Собираем свою игру",
        text: "Добавляем уровни, тестируем правила, исправляем ошибки и объясняем, как всё устроено.",
        result: "Игра с собственным героем",
      },
    ],
  },
  {
    name: "JavaScript",
    count: 32,
    entry: "Начальный уровень · можно без опыта веб-разработки",
    stages: [
      {
        range: "1–8",
        title: "Создаём страницу",
        text: "HTML, CSS и адаптивная вёрстка. Превращаем идею в страницу, удобную на разных экранах.",
        result: "Первый сайт",
      },
      {
        range: "9–20",
        title: "Добавляем поведение",
        text: "Переменные, условия, функции, события и DOM. Кнопки и формы начинают отвечать пользователю.",
        result: "Интерактивный интерфейс",
      },
      {
        range: "21–32",
        title: "Доводим до продукта",
        text: "Объединяем код и интерфейс, работаем с данными, проверяем сценарии и представляем проект.",
        result: "Сайт или браузерная мини-игра",
      },
    ],
  },
  {
    name: "Go",
    count: 32,
    entry: "С опытом · знакомы с переменными, условиями и циклами",
    stages: [
      {
        range: "1–8",
        title: "Осваиваем язык",
        text: "Синтаксис Go, типы, функции и обработка ошибок. Пишем и запускаем небольшие программы.",
        result: "Консольная программа",
      },
      {
        range: "9–20",
        title: "Организуем данные",
        text: "Структуры, коллекции и пакеты. Разделяем задачу на части и проверяем поведение кода.",
        result: "Логика будущего приложения",
      },
      {
        range: "21–32",
        title: "Запускаем сервер",
        text: "HTTP, маршруты и JSON. Создаём API, проверяем запросы и объясняем устройство сервиса.",
        result: "Backend с HTTP API",
      },
    ],
  },
];

export default function CourseRoadmap({ onChoose }) {
  const [selected, setSelected] = useState(0);
  const course = programs[selected];
  return (
    <section
      id="curriculum"
      className="section section-space course-roadmap reveal"
    >
      <div className="section-heading">
        <div>
          <span className="eyebrow">ПОНЯТНЫЙ ПУТЬ К СВОЕМУ ПРОЕКТУ</span>
          <h2>
            От первого шага
            <br />
            до «я сделал сам».
          </h2>
        </div>
        <p>
          У каждого этапа — своя задача и видимый результат. Вот как устроен
          вводный курс.
        </p>
      </div>
      <div className="roadmap-tabs" role="tablist" aria-label="Программа курса">
        {programs.map((item, index) => (
          <button
            key={item.name}
            id={`roadmap-tab-${index}`}
            role="tab"
            aria-selected={selected === index}
            aria-controls="roadmap-panel"
            tabIndex={selected === index ? 0 : -1}
            onClick={() => {
              setSelected(index);
              trackFunnel("course_select", item.name);
            }}
            onKeyDown={(event) => {
              if (
                !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
              )
                return;
              event.preventDefault();
              const next =
                event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? 2
                    : (index + (event.key === "ArrowRight" ? 1 : 2)) % 3;
              setSelected(next);
              document.getElementById(`roadmap-tab-${next}`)?.focus();
              trackFunnel("course_select", programs[next].name);
            }}
          >
            {item.name}
            <span>{item.count} занятий</span>
          </button>
        ))}
      </div>
      <div
        id="roadmap-panel"
        role="tabpanel"
        aria-labelledby={`roadmap-tab-${selected}`}
        tabIndex={0}
      >
        <p className="roadmap-entry">
          <Check size={17} />
          {course.entry}
        </p>
        <ol className="roadmap-grid">
          {course.stages.map((stage, index) => (
            <li key={`${course.name}-${index}`}>
              <div className="roadmap-step">
                <span>0{index + 1}</span>
                <span>ЗАНЯТИЯ {stage.range}</span>
              </div>
              <h3>{stage.title}</h3>
              <p>{stage.text}</p>
              <div className="roadmap-result">
                <span>РЕЗУЛЬТАТ ЭТАПА</span>
                <strong>{stage.result}</strong>
              </div>
            </li>
          ))}
        </ol>
        <div className="roadmap-bottom">
          <p>
            Это ориентир по этапам: сложность задач и темп внутри курса
            подбираем под ученика.
          </p>
          <a
            href="#enroll"
            className="text-link"
            onClick={() => onChoose(course.name)}
          >
            Обсудить курс {course.name}
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
