"use client";
import { useId, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Gamepad2,
  GraduationCap,
  Calculator,
  BookOpen,
  Atom,
  Sparkles,
  Play,
  RotateCcw,
  MoreHorizontal,
  Lightbulb,
  Star,
} from "lucide-react";
import "./ReferenceHero.css";

function Note({ children, className = "" }) {
  return (
    <div className={`ref-note ${className}`} aria-hidden="true">
      {children}
      <svg viewBox="0 0 70 65" fill="none">
        <path
          d="M5 6C36-1 63 35 44 26C27 18 59 6 62 54M53 44l10 12 3-15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
function Leaves() {
  const id = useId();
  return (
    <svg className="ref-leaves" viewBox="0 0 170 245" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#b8e4c9" />
          <stop offset=".5" stopColor="#6bae99" />
          <stop offset="1" stopColor="#2e8465" />
        </linearGradient>
      </defs>
      <g fill={`url(#${id})`}>
        <ellipse
          cx="48"
          cy="80"
          rx="22"
          ry="64"
          transform="rotate(-38 48 80)"
        />
        <ellipse cx="99" cy="62" rx="21" ry="58" transform="rotate(12 99 62)" />
        <ellipse
          cx="62"
          cy="143"
          rx="23"
          ry="58"
          transform="rotate(-53 62 143)"
        />
        <ellipse
          cx="119"
          cy="136"
          rx="24"
          ry="62"
          transform="rotate(27 119 136)"
        />
        <ellipse
          cx="92"
          cy="195"
          rx="24"
          ry="55"
          transform="rotate(-54 92 195)"
        />
      </g>
      <path
        d="M102 235Q95 117 52 69"
        fill="none"
        stroke="#3c8868"
        strokeOpacity=".35"
        strokeWidth="3"
      />
    </svg>
  );
}
function Mascot({ school }) {
  return (
    <div className={`ref-mascot ${school ? "ref-mascot-school" : ""}`}>
      <div className="ref-speech">
        Привет!
        <br />
        <strong>{school ? "Я МИКА" : "Я ЛЮ"}</strong>
        <span>{school ? "♥" : "✧"}</span>
      </div>
      <div className="ref-character">
        <img
          src={school ? "/hero/luma-mascots.webp" : "/hero/ly-waving.webp"}
          alt={
            school
              ? "Хамелеон Мика с книгой"
              : "Хамелеон ЛЮ приветствует будущего программиста"
          }
          width={school ? 1920 : 900}
          height={school ? 800 : 900}
          fetchPriority="high"
        />
      </div>
    </div>
  );
}
function RocketArt() {
  return (
    <svg className="ref-rocket" viewBox="0 0 110 160" aria-hidden="true">
      <defs>
        <linearGradient id="ref-ship">
          <stop stopColor="#a080ec" />
          <stop offset=".45" stopColor="#fff" />
          <stop offset="1" stopColor="#e0d4fa" />
        </linearGradient>
        <linearGradient id="ref-flame" x2="0" y2="1">
          <stop stopColor="#ffd36a" />
          <stop offset="1" stopColor="#ff8777" />
        </linearGradient>
      </defs>
      <path
        d="M42 109Q18 127 38 154L53 132 65 148Q83 124 66 109"
        fill="url(#ref-flame)"
      />
      <path
        d="M28 66Q4 80 8 117L34 105M77 67Q104 79 100 118L75 103"
        fill="#9770e9"
      />
      <path d="M29 110Q16 50 54 7Q94 48 79 110Z" fill="url(#ref-ship)" />
      <path d="M37 27L54 7 71 28Q55 38 37 27" fill="#bc9cf3" />
      <circle cx="54" cy="63" r="18" fill="#8063b5" />
      <circle cx="54" cy="63" r="13" fill="#d2e6ff" />
      <path
        d="M47 57q7-8 15 0"
        fill="none"
        stroke="#fff"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d="M49 97h10l-1 28h-8z" fill="#a084d3" />
    </svg>
  );
}
function SpaceDemo() {
  const [playing, setPlaying] = useState(false);
  return (
    <div className={`ref-space ${playing ? "playing" : ""}`}>
      <div className="ref-blocks" aria-hidden="true">
        <div>
          когда <Play size={16} fill="white" /> нажато
        </div>
        <div>
          идти <b>10</b> шагов
        </div>
        <div>
          если касается <b>звезды</b> ?
        </div>
        <div>
          сказать <b>Ура!</b> <b>2</b> сек
        </div>
      </div>
      <span className="ref-level">LEVEL {playing ? "02" : "01"}</span>
      <div className="ref-planet">
        <i />
        <i />
      </div>
      <svg className="ref-trajectory" viewBox="0 0 430 300" aria-hidden="true">
        <path
          d="M25 272C204 335 243 49 354 44"
          fill="none"
          stroke="#d5c6ff"
          strokeWidth="1.5"
          strokeDasharray="6 9"
        />
      </svg>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <span key={i} className={`ref-star ref-star-${i}`} aria-hidden="true">
          ✦
        </span>
      ))}
      <RocketArt />
      <div className="ref-code-float" aria-hidden="true">
        <div>
          <span>1</span>
          <b>const</b> rocket = <em>new</em> Player();
        </div>
        <div>
          <span>2</span>
          <strong>rocket</strong>.fly();
        </div>
        <div>
          <span>3</span>
          <strong>collect</strong>(star);
        </div>
        <div>
          <span>4</span>
          <strong>showMessage</strong>(<i>&quot;Ура!&quot;</i>);
        </div>
      </div>
      <button
        className="ref-play"
        aria-label={playing ? "Начать игру заново" : "Запустить демо игры"}
        onClick={() => setPlaying(!playing)}
      >
        <Play size={20} fill="currentColor" />
        {playing ? "Ещё раз" : "Играть"}
      </button>
      <span className="ref-game-status" aria-live="polite">
        {playing ? "Новый уровень открыт!" : ""}
      </span>
    </div>
  );
}
function ProgrammingDemo({ renderProject }) {
  const [project, setProject] = useState(0);
  const labels = ["Scratch", "JavaScript", "Go"];
  return (
    <div className="ref-window ref-program-window">
      <div
        className="ref-demo-tabs"
        role="tablist"
        aria-label="Примеры направлений"
        onKeyDown={(e) => {
          if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key))
            return;
          e.preventDefault();
          const next =
            e.key === "Home"
              ? 0
              : e.key === "End"
                ? 2
                : (project + (e.key === "ArrowRight" ? 1 : 2)) % 3;
          setProject(next);
          document.getElementById(`project-tab-${next}`)?.focus();
        }}
      >
        {labels.map((label, i) => (
          <button
            key={label}
            role="tab"
            aria-label={label}
            id={`project-tab-${i}`}
            aria-controls="hero-project"
            aria-selected={project === i}
            tabIndex={project === i ? 0 : -1}
            onClick={() => setProject(i)}
          >
            {i === 0 ? (
              <Gamepad2 />
            ) : i === 1 ? (
              <span className="ref-js-icon">JS</span>
            ) : (
              <span className="ref-go-icon">Go</span>
            )}
            {label}
          </button>
        ))}
      </div>
      <div
        id="hero-project"
        role="tabpanel"
        aria-labelledby={`project-tab-${project}`}
      >
        {project === 0 ? (
          <>
            <div className="ref-window-bar">
              <span>
                <i />
                <i />
                <i />
              </span>
              space-adventure.sb3
              <Code2 size={16} />
            </div>
            <SpaceDemo />
          </>
        ) : (
          <div className="ref-existing-demo">{renderProject(project)}</div>
        )}
      </div>
    </div>
  );
}
const subjectDemos = [
  {
    name: "Математика",
    icon: Calculator,
    title: "Решим уравнение вместе",
    equation: "2x + 6 = 14",
    steps: [
      ["Вычтем 6 из обеих частей", "2x = 14 − 6"],
      ["Получим", "2x = 8"],
      ["Разделим обе части на 2", "x = 8 ÷ 2 = 4"],
    ],
    answer: "x = 4",
  },
  {
    name: "Русский язык",
    icon: BookOpen,
    title: "Найдём проверочное слово",
    equation: "л…сной → лес",
    steps: [
      ["Находим безударную гласную", "л…сной"],
      ["Ставим гласную под ударение", "лес"],
      ["Пишем ту же букву в корне", "лесной"],
    ],
    answer: "лесной",
  },
  {
    name: "Английский",
    icon: BookOpen,
    title: "Соберём предложение",
    equation: "She … a book every day.",
    steps: [
      ["Кто выполняет действие?", "She"],
      ["Действие повторяется", "every day"],
      ["Добавляем окончание -s", "reads"],
    ],
    answer: "She reads a book every day.",
  },
  {
    name: "Физика",
    icon: Atom,
    title: "Найдём скорость вместе",
    equation: "s = 120 км, t = 2 ч",
    steps: [
      ["Вспоминаем формулу", "v = s ÷ t"],
      ["Подставляем значения", "v = 120 ÷ 2"],
      ["Выполняем деление", "v = 60 км/ч"],
    ],
    answer: "60 км/ч",
  },
];
function SchoolDemo() {
  const [subject, setSubject] = useState(0),
    [step, setStep] = useState(3);
  const demo = subjectDemos[subject];
  return (
    <div className="ref-window ref-school-window">
      <div
        className="ref-demo-tabs ref-subject-tabs"
        role="tablist"
        aria-label="Примеры школьных предметов"
        onKeyDown={(e) => {
          if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key))
            return;
          e.preventDefault();
          const next =
            e.key === "Home"
              ? 0
              : e.key === "End"
                ? 3
                : (subject + (e.key === "ArrowRight" ? 1 : 3)) % 4;
          setSubject(next);
          setStep(3);
          document.getElementById(`school-demo-tab-${next}`)?.focus();
        }}
      >
        {subjectDemos.map((item, i) => (
          <button
            key={item.name}
            role="tab"
            aria-label={item.name}
            id={`school-demo-tab-${i}`}
            aria-controls="school-demo-panel"
            aria-selected={subject === i}
            tabIndex={subject === i ? 0 : -1}
            onClick={() => {
              setSubject(i);
              setStep(3);
            }}
          >
            {i === 2 ? <span className="ref-en-icon">EN</span> : <item.icon />}
            {item.name}
          </button>
        ))}
        <MoreHorizontal aria-hidden="true" />
      </div>
      <div
        className="ref-lesson"
        id="school-demo-panel"
        role="tabpanel"
        aria-labelledby={`school-demo-tab-${subject}`}
      >
        <span className="ref-lesson-eyebrow">
          ✧ &nbsp; ПРИМЕР РАЗБОРА НА ЗАНЯТИИ
        </span>
        <h2>{demo.title}</h2>
        <div
          className={`ref-equation ${subject === 2 ? "ref-equation-english" : ""}`}
        >
          {demo.equation}
        </div>
        <ol className="ref-equation-steps" aria-live="polite">
          {demo.steps.map(([text, value], i) => (
            <li key={i} className={step > i ? "done" : ""}>
              <span>{i + 1}</span>
              <p>{text}</p>
              <strong>{step > i ? value : "…"}</strong>
            </li>
          ))}
        </ol>
        <button
          className="ref-answer demo-next"
          onClick={() => setStep(step === 3 ? 0 : step + 1)}
          aria-label={
            step === 3
              ? "Разобрать решение по шагам"
              : "Разобрать следующий шаг"
          }
        >
          {step === 3 ? (
            <>
              <span>Ответ:</span>
              <strong>{demo.answer}</strong>
              <RotateCcw size={15} />
            </>
          ) : (
            <>
              <span>
                {step === 0
                  ? "Начнём с первого шага"
                  : "Разобрать следующий шаг"}
              </span>
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
function HeroArt({ school, renderProject }) {
  return (
    <div className={`ref-art ${school ? "ref-art-school" : "ref-art-it"}`}>
      <div className="ref-glow" aria-hidden="true" />
      <div className="ref-organic" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="ref-plant-left">
        <Leaves school={school} />
      </div>
      <div className="ref-plant-right">
        <Leaves school={school} />
      </div>
      <div className="ref-plant-top">
        <Leaves school={school} />
      </div>
      <Note className="ref-note-top">
        {school ? (
          <>
            Сложное
            <br />
            становится понятным!
          </>
        ) : (
          <>
            Из «а что, если…»
            <br />в «я сделал!»
          </>
        )}
      </Note>
      <div className="ref-floating-top">
        {school ? (
          <>
            <GraduationCap />
            <span>
              <strong>ОГЭ · ЕГЭ</strong>
              <small>Готовимся шаг за шагом</small>
            </span>
          </>
        ) : (
          <>
            <Code2 />
            <code>when idea becomes real</code>
          </>
        )}
      </div>
      {school ? (
        <SchoolDemo />
      ) : (
        <ProgrammingDemo renderProject={renderProject} />
      )}
      <Star className="ref-gold-star" fill="currentColor" aria-hidden="true" />
      {school && (
        <>
          <div className="ref-step-note">
            <span>✦</span>Всё по шагам,
            <br />и сразу понятно
          </div>
          <div className="ref-bulb" aria-hidden="true">
            <Lightbulb />
          </div>
        </>
      )}
      <Mascot school={school} />
      <div className="ref-success">
        <span className="ref-success-icon">
          <Check />
        </span>
        <span>
          <strong>{school ? "Ты справишься!" : "Это я создал!"}</strong>
          <small>
            {school ? (
              "Я рядом на каждом шаге"
            ) : (
              <>
                Мой первый проект —<br />
                настоящая игра
              </>
            )}
          </small>
        </span>
        <Sparkles />
      </div>
      <Note className="ref-note-bottom">
        Больше, чем уроки —<br />
        {school ? "это уверенность в себе" : "это приключение"}
      </Note>
    </div>
  );
}
export default function ReferenceHero({ school = false, renderProject }) {
  return (
    <section
      className={`ref-hero ${school ? "ref-hero-school" : "ref-hero-it"}`}
      aria-labelledby="ref-hero-title"
    >
      <div className="ref-hero-inner">
        <div className="ref-copy">
          <span className="ref-eyebrow">
            <i />
            {school
              ? "ШКОЛЬНЫЕ ПРЕДМЕТЫ · ОГЭ · ЕГЭ"
              : "ОНЛАЙН-ШКОЛА ПРОГРАММИРОВАНИЯ · 7–16+"}
          </span>
          <h1 id="ref-hero-title">
            {school ? (
              <>
                От «не понимаю»
                <br />к уверенному
                <br />
                <span>«я могу».</span>
              </>
            ) : (
              <>
                Сегодня играет.
                <br />
                Завтра —<br />
                <span>
                  создаёт своё.
                  <svg viewBox="0 0 530 18" aria-hidden="true">
                    <path
                      d="M5 11Q265-3 525 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="10"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </>
            )}
          </h1>
          <p>
            {school ? (
              <>
                Разбираемся в предмете, закрываем пробелы
                <br className="ref-desktop-break" /> и готовимся к экзаменам. С
                понятным планом
                <br className="ref-desktop-break" /> и преподавателем, который
                рядом.
              </>
            ) : (
              <>
                Игры, сайты и приложения — идеи ребёнка становятся
                <br className="ref-desktop-break" /> настоящими проектами. С
                преподавателем, который
                <br className="ref-desktop-break" /> помогает понять и
                вдохновляет развиваться.
              </>
            )}
          </p>
          <div className="ref-actions">
            <a
              className="ref-primary"
              href={school ? "#school-finder" : "#finder"}
            >
              {school ? "Найти свой предмет" : "Подобрать программу"}
              <ArrowUpRight size={20} />
            </a>
            <a
              className="ref-secondary"
              href={school ? "#school-method" : "#courses"}
            >
              {school ? "Как проходит обучение" : "Смотреть направления"}
              <ArrowRight size={21} />
            </a>
          </div>
          <div className="ref-benefits">
            {(school
              ? [
                  "Индивидуальный маршрут",
                  "Онлайн с преподавателем",
                  "В своём темпе",
                ]
              : ["С нуля и с опытом", "В своём темпе", "Практика на занятиях"]
            ).map((text) => (
              <span key={text}>
                <i>
                  <Check />
                </i>
                {text}
              </span>
            ))}
          </div>
        </div>
        <HeroArt school={school} renderProject={renderProject} />
      </div>
    </section>
  );
}
