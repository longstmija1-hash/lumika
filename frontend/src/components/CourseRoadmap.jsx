"use client";
import { useState } from "react";
import {
  ArrowUpRight,
  Box,
  Braces,
  Check,
  ChevronRight,
  Code2,
  Flag,
  Gamepad2,
  Info,
  Lightbulb,
  Monitor,
  MousePointer2,
  PanelsTopLeft,
  Server,
  Terminal,
  Trophy,
} from "lucide-react";
import { trackFunnel } from "../lib/funnelAnalytics";
import "./CourseRoadmap.css";
import "./CourseRoadmapReference.css";

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

const courseIcons = [Gamepad2, Box, Terminal];
const stageIcons = [Lightbulb, Code2, Flag];
const resultIcons = [
  [Flag, Gamepad2, Trophy],
  [PanelsTopLeft, MousePointer2, Monitor],
  [Terminal, Braces, Server],
];
const resultNotes = [
  [
    "Персонажи двигаются и реагируют на события. Ребёнок может объяснить последовательность команд в своей истории.",
    "У игры появляются правила, счёт и реакция на действия игрока. Проверяем, что происходит в разных ситуациях.",
    "Объединяем персонажей, правила и уровни в завершённый проект. Ребёнок показывает игру и объясняет, как она работает.",
  ],
  [
    "Страница со своей структурой и оформлением, которая остаётся удобной на разных экранах.",
    "Кнопки, формы и события связываются с JavaScript: интерфейс реагирует на действия пользователя.",
    "Завершённый проект, в котором ребёнок соединяет вёрстку, логику и работу с данными.",
  ],
  [
    "Небольшая программа, которую ученик запускает в терминале и может разобрать по шагам.",
    "Данные и функции организованы по задачам. Проверяем, как отдельные части программы работают вместе.",
    "Сервис принимает HTTP-запросы и возвращает JSON. Ученик проверяет API и объясняет устройство своего backend.",
  ],
];
function RoadmapMark({ className = "" }) {
  return (
    <svg
      className={`rm-mark ${className}`}
      viewBox="0 0 42 62"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m8 18 12-12M14 30l22-6M13 45l13 8"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}
function StageConnection() {
  return (
    <svg
      className="rm-connection"
      viewBox="0 0 65 86"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 8C53-3 10 74 59 70"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="2 3"
      />
      <path
        d="m54 65 6 5-7 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CourseRoadmap({ onChoose }) {
  const [selected, setSelected] = useState(0);
  const course = programs[selected];
  return (
    <section
      id="curriculum"
      className="section section-space course-roadmap roadmap-ref reveal"
      aria-labelledby="curriculum-title"
    >
      <div className="rm-heading">
        <div>
          <span className="rm-eyebrow">ПОНЯТНЫЙ ПУТЬ К СВОЕМУ ПРОЕКТУ</span>
          <h2 id="curriculum-title">
            От первого шага
            <br />
            до <span>«я сделал сам»</span>.<RoadmapMark />
          </h2>
        </div>
        <p className="rm-heading-copy">
          У каждого этапа — своя задача и видимый результат. Вот как устроен
          вводный курс.
          <svg
            className="rm-intro-arrow"
            viewBox="0 0 88 76"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M79 4C69 43 40 55 33 37C25 18 13 45 35 43C51 42 25 65 8 68M13 59l-7 10 12 2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </p>
      </div>
      <div className="roadmap-tabs" role="tablist" aria-label="Программа курса">
        {programs.map((item, index) => {
          const Icon = courseIcons[index];
          return (
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
                  !["ArrowLeft", "ArrowRight", "Home", "End"].includes(
                    event.key,
                  )
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
              <Icon size={25} aria-hidden="true" />
              <strong>{item.name}</strong>
              <span>
                {item.count} {item.count === 32 ? "занятия" : "занятий"}
              </span>
            </button>
          );
        })}
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
          {course.stages.map((stage, index) => {
            const StageIcon = stageIcons[index];
            const ResultIcon = resultIcons[selected][index];
            return (
              <li key={`${course.name}-${index}`}>
                <div className="roadmap-step">
                  <span>0{index + 1}</span>
                  <span>ЗАНЯТИЯ {stage.range}</span>
                </div>
                <span className="rm-stage-icon">
                  <StageIcon size={29} strokeWidth={1.9} />
                  <RoadmapMark />
                </span>
                <h3>{stage.title}</h3>
                <p>{stage.text}</p>
                <div className="roadmap-result">
                  <span>РЕЗУЛЬТАТ ЭТАПА</span>
                  <details className="rm-result-detail">
                    <summary>
                      <ResultIcon size={25} aria-hidden="true" />
                      <strong>{stage.result}</strong>
                      <ChevronRight
                        size={20}
                        className="rm-result-chevron"
                        aria-hidden="true"
                      />
                    </summary>
                    <p>{resultNotes[selected][index]}</p>
                  </details>
                </div>
                {index < 2 && <StageConnection />}
              </li>
            );
          })}
        </ol>
        <div className="roadmap-bottom">
          <p>
            <Info size={20} aria-hidden="true" />
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
