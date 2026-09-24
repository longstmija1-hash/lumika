"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Code2,
  Braces,
  Gamepad2,
  Globe2,
  Terminal,
  Menu,
  X,
  Play,
  Sparkles,
  ShieldCheck,
  MousePointer2,
  ChevronDown,
  Rocket,
  GraduationCap,
} from "lucide-react";
import LeadForm from "../components/landing/LeadForm";
import DirectionSwitch from "../components/DirectionSwitch";
import ItCoursePricing from "../components/ItCoursePricing";
import CourseRoadmap from "../components/CourseRoadmap";
import { trackFunnel } from "../lib/funnelAnalytics";
import {
  IT_COURSE_PRICING,
  formatRubles,
  describeItCourse,
} from "../data/itCoursePricing";
import { CONTACT_PHONE, CONTACT_PHONE_HREF } from "../data/landingContent";
import "./studio.css";
import "./studio-polish.css";

const courses = [
  {
    name: "Scratch",
    tag: "Первое знакомство",
    age: "7–12 лет",
    level: "С нуля",
    icon: Gamepad2,
    tone: "peach",
    title: "Большие идеи.\nПервые игры.",
    text: "Для тех, кто любит придумывать и ещё не писал код. Собираем программы из понятных визуальных блоков.",
    skills: ["Логика, условия и циклы", "Сюжеты, персонажи и анимация"],
    project: "Игра с уровнями и своим героем",
  },
  {
    name: "JavaScript",
    tag: "От идеи к коду",
    age: "12–16+ лет",
    level: "Начальный",
    icon: Globe2,
    tone: "lavender",
    title: "Свой сайт.\nСвои правила.",
    text: "Для тех, кто хочет создавать в интернете. Знакомимся с HTML, CSS и оживляем страницы настоящим кодом.",
    skills: [
      "Вёрстка и интерактивность",
      "События, функции и работа с данными",
    ],
    project: "Интерактивный сайт или мини-игра",
  },
  {
    name: "Go",
    tag: "Следующий уровень",
    age: "14–16+ лет",
    level: "С опытом",
    icon: Terminal,
    tone: "mint",
    title: "Внутри приложений.\nЗа пределами экрана.",
    text: "Для подростков, знакомых с основами кода. Разбираемся, как работают серверы, данные и приложения.",
    skills: ["Структуры данных и алгоритмы", "Серверная логика и HTTP API"],
    project: "Свой backend для приложения",
  },
];
const faqs = [
  [
    "Подойдёт, если ребёнок никогда не программировал?",
    "Да. В Scratch начинаем с визуальных блоков: ребёнок знакомится с последовательностями, условиями и циклами. Подросткам можно начать с основ веб-разработки. На первом занятии уточним опыт и подберём посильные задачи.",
  ],
  [
    "Как проходят занятия и что понадобится?",
    "Занимаемся онлайн с преподавателем. Нужен компьютер или ноутбук, стабильный интернет, микрофон и браузер. Перед началом поможем разобраться с инструментами выбранного направления.",
  ],
  [
    "Как я пойму, что есть результат?",
    "По тому, что ребёнок может сделать и объяснить самостоятельно. Обсуждаем пройденные темы, показываем проекты и объясняем, над чем работаем дальше. Сложность растёт по мере освоения материала.",
  ],
  [
    "Нужно ли сразу выбирать направление?",
    "Нет. Подбор на сайте — предварительный ориентир. На знакомстве обсудим интересы и возраст ребёнка, посмотрим уровень и вместе выберем точку старта.",
  ],
  [
    "Сколько стоят занятия?",
    "Вводный курс Scratch: 16 занятий по 1 260 ₽ — всего 20 160 ₽. JavaScript и Go: по 32 занятия по 1 188 ₽ — 38 016 ₽ за каждый курс. Все занятия индивидуальные, по 45 минут. При одном занятии в неделю это 16 или 32 учебные недели; при двух — 8 или 16. Календарный срок зависит от расписания и переносов.",
  ],
  [
    "Что будет на пробном занятии?",
    "Это бесплатное знакомство на 20–30 минут. Обсудим интересы ребёнка, опыт и цели, расскажем о формате и ответим на вопросы. Готовиться и выполнять задания заранее не нужно. После знакомства вместе определим следующий шаг.",
  ],
];

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="Люмика — на главную">
      <span className="brand-symbol">
        <Braces size={24} />
      </span>
      люмика<span className="brand-dot">®</span>
    </a>
  );
}
function LinkButton({
  children,
  href = "#enroll",
  secondary = false,
  onClick,
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`studio-button ${secondary ? "secondary" : ""}`}
    >
      {children}
      <ArrowUpRight size={18} />
    </a>
  );
}

function CourseVisual({ type }) {
  return (
    <div className={`course-visual course-visual-${type}`} aria-hidden="true">
      {type === 0 ? (
        <>
          <span className="mini-command">
            <Play size={14} fill="currentColor" />
            начать игру
          </span>
          <span className="mini-command">
            повторить <b>10</b> раз <ArrowRight size={14} />
          </span>
          <Gamepad2 className="mini-object" />
        </>
      ) : type === 1 ? (
        <>
          <span className="mini-browser-bar">
            <i />
            <i />
            <i />
            <span>my-first-site.dev</span>
          </span>
          <span className="mini-web-title">
            Hello,
            <br />
            <em>my world.</em>
          </span>
          <MousePointer2 className="mini-object" />
        </>
      ) : (
        <>
          <span className="mini-code">
            <span>func</span> buildFuture() {"{"}
          </span>
          <span className="mini-code">&nbsp; return "Hello, world!"</span>
          <span className="mini-code">{"}"}</span>
          <span className="mini-status">
            <i />
            200 OK · API работает
          </span>
        </>
      )}
    </div>
  );
}

function ProjectPreview({ type = 0, hero = false }) {
  const [running, setRunning] = useState(false);
  useEffect(() => setRunning(false), [type]);
  return (
    <div
      className={`project-preview preview-${type} ${hero ? "hero-preview" : ""}`}
    >
      <div className="window-bar">
        <span className="window-dots">
          <i />
          <i />
          <i />
        </span>
        <span>
          {
            [
              "space-adventure.sb3",
              "my-universe / index.html",
              "my-app / main.go",
            ][type]
          }
        </span>
        <Code2 size={13} />
      </div>
      {type === 0 ? (
        <div className={`space-game ${running ? "playing" : ""}`}>
          <div className="game-hud">
            <span>SPACE EXPLORER</span>
            <span>{running ? "LEVEL 02" : "LEVEL 01"}</span>
          </div>
          <div className="planet">
            <i />
          </div>
          <span className="star star-a">+</span>
          <span className="star star-b">✦</span>
          <span className="star star-c">+</span>
          <div className="orbit" />
          <div className="rocket">
            <Rocket aria-hidden="true" />
          </div>
          <div className="game-bottom">
            <span>
              Твоя вселенная.
              <br />
              <strong>
                {running ? "Новый уровень открыт!" : "Твои правила."}
              </strong>
            </span>
            <button
              onClick={() => setRunning(!running)}
              aria-label={
                running ? "Начать игру заново" : "Запустить демо игры"
              }
            >
              <Play size={16} fill="currentColor" />
              {running ? "Ещё раз" : "Играть"}
            </button>
          </div>
        </div>
      ) : type === 1 ? (
        <div className="web-demo">
          <div className="web-demo-nav">
            orbit® <span>DESIGN YOUR WORLD</span>
          </div>
          <span className="tiny-label">МОЙ ПЕРВЫЙ САЙТ</span>
          <h3>
            Make it
            <br />
            <em>your own.</em>
          </h3>
          <button onClick={() => setRunning(!running)}>
            {running ? "Вернуть тему" : "Изменить тему"}
            <ArrowUpRight size={14} />
          </button>
          <div className={`web-orb ${running ? "changed" : ""}`} />
        </div>
      ) : (
        <div className="code-demo">
          <div>
            <span>01</span>
            <b>package</b> main
          </div>
          <div>
            <span>02</span>
          </div>
          <div>
            <span>03</span>
            <b>func</b> main() {"{"}
          </div>
          <div>
            <span>04</span> http.<em>HandleFunc</em>("/hello",
          </div>
          <div>
            <span>05</span> <b>func</b>(w, r) {"{"}
          </div>
          <div>
            <span>06</span> <em>say</em>("Hello, world!")
          </div>
          <div>
            <span>07</span> {"})"}
          </div>
          <div>
            <span>08</span>
            {"}"}
          </div>
          <button onClick={() => setRunning(!running)}>
            <Play size={13} />
            {running ? "Запустить снова" : "Запустить запрос"}
          </button>
          <p className="terminal-response">
            {running
              ? '200 OK → { "message": "Hello, world!" }'
              : "$ go run main.go"}
            <i />
          </p>
        </div>
      )}
    </div>
  );
}

function CourseFinder({ onChoose }) {
  const [age, setAge] = useState("");
  const [experience, setExperience] = useState("");
  const [interest, setInterest] = useState("");
  const complete = age && experience && interest;
  const index =
    age === "7–9" ||
    (age === "10–12" && (experience !== "Уже писал код" || interest === "Игры"))
      ? 0
      : (age === "13–15" || age === "16+") &&
          experience === "Уже писал код" &&
          (interest === "Приложения" ||
            interest === "Настоящее программирование")
        ? 2
        : 1;
  const course = courses[index];
  return (
    <section id="finder" className="finder section reveal">
      <div className="finder-intro">
        <span className="eyebrow">НЕ ЗНАЕТЕ, С ЧЕГО НАЧАТЬ?</span>
        <h2>
          Найдём его
          <br />
          точку старта.
        </h2>
        <p>Три коротких вопроса — и направление, которое стоит попробовать.</p>
        <span className="finder-note">
          <ShieldCheck size={17} />
          Без контактов и регистрации
        </span>
        <div
          className="finder-progress"
          aria-label={`Выбрано ${[age, experience, interest].filter(Boolean).length} из 3 ответов`}
        >
          <div>
            {[age, experience, interest].map((answer, i) => (
              <span key={i} className={answer ? "answered" : ""} />
            ))}
          </div>
          <span>
            {[age, experience, interest].filter(Boolean).length} из 3 — ваш
            маршрут становится яснее
          </span>
        </div>
      </div>
      <div className="finder-controls">
        {[
          [
            "01",
            "Сколько лет ребёнку?",
            ["7–9", "10–12", "13–15", "16+"],
            age,
            setAge,
          ],
          [
            "02",
            "Уже знаком с программированием?",
            ["Никогда не программировал", "Немного пробовал", "Уже писал код"],
            experience,
            setExperience,
          ],
          [
            "03",
            "Что ему интереснее создавать?",
            ["Игры", "Сайты", "Приложения", "Настоящее программирование"],
            interest,
            setInterest,
          ],
        ].map(([n, title, options, value, setter]) => (
          <fieldset key={n}>
            <legend>
              <span>{n}</span>
              {title}
            </legend>
            <div className="choices">
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={value === option}
                  onClick={() => setter(option)}
                  className={value === option ? "selected" : ""}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>
        ))}
        <div className="finder-result" aria-live="polite">
          {complete ? (
            <>
              <div>
                <span className="tiny-label">РЕКОМЕНДУЕМ ПОПРОБОВАТЬ</span>
                <h3>
                  {course.name}
                  <ArrowUpRight size={21} />
                </h3>
                <p>
                  {index === 0
                    ? "Визуальные блоки помогут освоить логику через создание игр."
                    : index === 1
                      ? "Начнём с доступных основ веба и постепенно добавим настоящий код."
                      : "Опыт уже есть — можно исследовать серверную сторону приложений."}{" "}
                  Точный уровень уточним на знакомстве.
                </p>
              </div>
              <LinkButton onClick={() => onChoose(course.name)}>
                Обсудить программу
              </LinkButton>
            </>
          ) : (
            <p>
              <Sparkles size={20} />
              Выберите по одному ответу — здесь появится ваша рекомендация.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  const [menu, setMenu] = useState(false);
  const [project, setProject] = useState(0);
  const [program, setProgram] = useState("Подбор программы");
  const [success, setSuccess] = useState(false);
  const chooseProgram = (name) => {
    setProgram(name);
    trackFunnel("course_select", name);
  };
  const pricedCourse = IT_COURSE_PRICING.find(
    (course) => course.name === program,
  );
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return (
    <div className="studio" id="top">
      <a className="skip-link" href="#main">
        К содержимому
      </a>
      <header className="studio-header">
        <DirectionSwitch active="it" />
        <div className="header-inner">
          <Brand />
          <nav
            className={menu ? "nav-open" : ""}
            id="main-navigation"
            aria-label="Основная навигация"
          >
            <a href="#courses" onClick={() => setMenu(false)}>
              Направления
            </a>
            <a href="#approach" onClick={() => setMenu(false)}>
              Как учим
            </a>
            <a href="#projects" onClick={() => setMenu(false)}>
              Проекты
            </a>
            <a href="#it-pricing" onClick={() => setMenu(false)}>
              Стоимость
            </a>
            <a href="#faq" onClick={() => setMenu(false)}>
              Вопросы
            </a>
          </nav>
          <a
            className="header-cta"
            href="#enroll"
            onClick={() => setMenu(false)}
          >
            Пробное занятие
            <ArrowUpRight size={16} />
          </a>
          <button
            className="menu-toggle"
            aria-label={menu ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menu}
            aria-controls="main-navigation"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="main">
        <section className="hero section">
          <div className="hero-copy">
            <span className="eyebrow">
              <i />
              ОНЛАЙН-ШКОЛА ПРОГРАММИРОВАНИЯ · 7–16+
            </span>
            <h1>
              Сегодня играет.
              <br />
              Завтра —<br />
              <span>создаёт своё.</span>
            </h1>
            <p>
              Игры, сайты и приложения — идеи ребёнка становятся настоящими
              проектами. С преподавателем, который помогает понять.
            </p>
            <div className="hero-actions">
              <LinkButton href="#finder">Подобрать программу</LinkButton>
              <a className="text-link" href="#courses">
                Смотреть направления
                <ArrowRight size={17} />
              </a>
            </div>
            <div className="hero-trust">
              <span>
                <Check />С нуля и с опытом
              </span>
              <span>
                <Check />В своём темпе
              </span>
              <span>
                <Check />
                Практика на занятиях
              </span>
            </div>
            <a href="/school" className="it-school-bridge">
              <GraduationCap aria-hidden="true" />
              <span>
                <small>А если нужна помощь со школьными предметами?</small>
                <strong>Школа и экзамены · ОГЭ и ЕГЭ</strong>
              </span>
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>
          </div>
          <div className="hero-art">
            <div className="art-grid" />
            <div className="art-caption">
              <span className="status-dot" />
              ИЗ «А ЧТО, ЕСЛИ…» В «Я СДЕЛАЛ!»
            </div>
            <div className="floating-code">
              <Code2 size={16} />
              <span>when idea becomes real</span>
            </div>
            <div className="main-project">
              <div
                className="project-tabs"
                role="tablist"
                aria-label="Примеры направлений"
                onKeyDown={(event) => {
                  const offsets = { ArrowRight: 1, ArrowLeft: -1 };
                  if (
                    !(event.key in offsets) &&
                    event.key !== "Home" &&
                    event.key !== "End"
                  )
                    return;
                  event.preventDefault();
                  const next =
                    event.key === "Home"
                      ? 0
                      : event.key === "End"
                        ? 2
                        : (project + offsets[event.key] + 3) % 3;
                  setProject(next);
                  document.getElementById(`project-tab-${next}`)?.focus();
                }}
              >
                {courses.map((c, i) => (
                  <button
                    key={c.name}
                    role="tab"
                    id={`project-tab-${i}`}
                    aria-selected={project === i}
                    tabIndex={project === i ? 0 : -1}
                    aria-controls="hero-project"
                    onClick={() => setProject(i)}
                  >
                    <c.icon size={15} />
                    {c.name}
                  </button>
                ))}
              </div>
              <div
                id="hero-project"
                role="tabpanel"
                aria-labelledby={`project-tab-${project}`}
              >
                <ProjectPreview type={project} hero />
              </div>
            </div>
            <div className="project-sticker">
              <span className="sticker-icon">
                <Check size={19} />
              </span>
              <div>
                <strong>Это я создал!</strong>
                <span>Первый проект — большая гордость</span>
              </div>
              <Sparkles size={17} />
            </div>
            <span className="art-footer">
              ПРИМЕР УЧЕБНОГО ПРОЕКТА <span>01 — 03</span>
            </span>
            <div className="cursor-label">
              <MousePointer2 size={23} fill="currentColor" />
              <span>будущий разработчик</span>
            </div>
          </div>
        </section>
        <div className="principle-strip section">
          <span>
            Меньше «просто за компьютером».
            <br />
            <strong>Больше «посмотри, что я сделал».</strong>
          </span>
          <div>
            <Braces />
            <span>
              Настоящие навыки
              <br />
              <b>вместо пассивного просмотра</b>
            </span>
          </div>
          <div>
            <MousePointer2 />
            <span>
              Личный маршрут
              <br />
              <b>по возрасту и интересам</b>
            </span>
          </div>
          <div>
            <Globe2 />
            <span>
              Из любой точки
              <br />
              <b>онлайн с преподавателем</b>
            </span>
          </div>
        </div>
        <section id="courses" className="section section-space reveal">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                ТРИ НАПРАВЛЕНИЯ. МНОЖЕСТВО ВОЗМОЖНОСТЕЙ.
              </span>
              <h2>
                У каждого создателя
                <br />
                свой первый шаг.
              </h2>
            </div>
            <p>
              От визуальных блоков до собственного API. Выбираем старт по
              готовности ребёнка, а не только по возрасту.
            </p>
          </div>
          <div className="course-grid">
            {courses.map((course, i) => (
              <article
                className={`course-card ${course.tone}`}
                key={course.name}
              >
                <div className="course-top">
                  <span className="course-icon">
                    <course.icon size={26} />
                  </span>
                  <span>{course.age}</span>
                </div>
                <div className="course-name">
                  {course.name}
                  <span>{course.tag}</span>
                </div>
                <CourseVisual type={i} />
                <h3>{course.title}</h3>
                <p>{course.text}</p>
                <ul>
                  {course.skills.map((skill) => (
                    <li key={skill}>
                      <Check size={15} />
                      {skill}
                    </li>
                  ))}
                </ul>
                <div className="course-project">
                  <span className="tiny-label">
                    ПРОЕКТ, КОТОРЫМ МОЖНО ГОРДИТЬСЯ
                  </span>
                  <strong>{course.project}</strong>
                </div>
                <div className="course-level">
                  <span className={`level-bars bars-${i}`}>
                    <i />
                    <i />
                    <i />
                  </span>
                  {course.level}
                </div>
                <LinkButton
                  onClick={() => {
                    chooseProgram(course.name);
                    setSuccess(false);
                  }}
                >
                  Попробовать {course.name}
                </LinkButton>
              </article>
            ))}
          </div>
          <p className="section-footnote">
            Возраст — ориентир. Программу и сложность уточняем после знакомства
            с ребёнком.
          </p>
        </section>
        <CourseRoadmap onChoose={chooseProgram} />
        <CourseFinder
          onChoose={(value) => {
            chooseProgram(value);
            setSuccess(false);
          }}
        />
        <section id="approach" className="section section-space reveal">
          <div className="section-heading">
            <div>
              <span className="eyebrow">ПОНЯТЬ. ПОПРОБОВАТЬ. СОЗДАТЬ.</span>
              <h2>
                Не зритель урока.
                <br />
                <span className="muted-heading">Автор своего проекта.</span>
              </h2>
            </div>
            <p>
              Преподаватель рядом, но мышку держит ребёнок. Учимся рассуждать,
              искать решения и спокойно относиться к ошибкам.
            </p>
          </div>
          <div className="approach-grid">
            <div className="lesson-board">
              <div className="board-top">
                <span>
                  <i className="status-dot" />
                  МАСТЕРСКАЯ ИДЕЙ
                </span>
                <span>ЗАНЯТИЕ / 01</span>
              </div>
              <div className="logic-block block-yellow">
                когда нажат <Play size={14} fill="currentColor" />
              </div>
              <div className="logic-block block-purple">
                повторить <b>10</b> раз
                <div className="logic-block block-blue">
                  идти <b>10</b> шагов <ArrowRight size={15} />
                </div>
              </div>
              <div className="board-comment">
                <span>ДФ</span>
                <p>
                  «А что изменится, если увеличить число шагов? Давай проверим.»
                </p>
              </div>
              <span className="board-caption">
                Не даём готовый ответ. Помогаем его найти.
              </span>
            </div>
            <div className="lesson-steps">
              {[
                [
                  "01",
                  "Начинаем с интереса",
                  "Обсуждаем идею и ставим понятную цель: что сегодня должно заработать?",
                ],
                [
                  "02",
                  "Разбираемся на практике",
                  "Немного объяснений — и сразу пробуем. Проверяем гипотезы, исправляем ошибки вместе.",
                ],
                [
                  "03",
                  "Замечаем результат",
                  "Ребёнок показывает, что получилось. Обсуждаем успехи и следующий шаг с родителем.",
                ],
              ].map(([n, title, text]) => (
                <div key={n}>
                  <span>{n}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="projects" className="projects-section">
          <div className="section section-space reveal">
            <div className="section-heading">
              <div>
                <span className="eyebrow">ЗНАНИЯ, КОТОРЫЕ МОЖНО ПОКАЗАТЬ</span>
                <h2>
                  Не просто «прошёл тему».
                  <br />А вот что получилось.
                </h2>
              </div>
              <span className="example-label">Примеры учебных проектов</span>
            </div>
            <div className="projects-grid">
              {[
                [
                  "Космическое приключение",
                  "Scratch",
                  "Персонаж движется, собирает очки и проходит уровни. За игрой — условия, циклы и события.",
                ],
                [
                  "Сайт о том, что нравится",
                  "JavaScript",
                  "Собственный дизайн, кнопки и интерактивные элементы. И ссылка, которой можно поделиться.",
                ],
                [
                  "Сервис с собственным API",
                  "Go",
                  "Приложение принимает запросы и возвращает данные. Первый взгляд на серверную разработку.",
                ],
              ].map(([title, name, text], i) => (
                <article key={name}>
                  <ProjectPreview type={i} />
                  <div className="project-meta">
                    <span>
                      0{i + 1} / {name}
                    </span>
                    <ArrowUpRight size={19} />
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
            <div className="learning-path">
              <span>Первая идея</span>
              <ArrowRight />
              <span>Работающая логика</span>
              <ArrowRight />
              <span>Самостоятельный код</span>
              <ArrowRight />
              <span>
                Свой продукт <Sparkles size={16} />
              </span>
            </div>
          </div>
        </section>
        <section className="section section-space trust-section reveal">
          <div>
            <span className="eyebrow">ЗА ТЕХНОЛОГИЯМИ — ЧЕЛОВЕК</span>
            <h2>
              Внимание к ребёнку.
              <br />
              Ясность для родителя.
            </h2>
            <p>
              У каждого свой темп и свои вопросы. Поэтому мы начинаем со
              знакомства и выстраиваем движение от простого к сложному.
            </p>
            <LinkButton href="#enroll" secondary>
              Познакомиться с преподавателем
            </LinkButton>
            <div className="trust-benefits">
              <div>
                <ShieldCheck />
                <strong>Программа под ребёнка</strong>
                <span>Учитываем интересы, опыт и темп.</span>
              </div>
              <div>
                <Code2 />
                <strong>Прогресс на практике</strong>
                <span>Обсуждаем проекты и следующие шаги.</span>
              </div>
            </div>
          </div>
          <article className="teacher-card">
            <div className="teacher-header">
              <span className="teacher-avatar">
                <img
                  src="/intro-portrait.jpg"
                  width="80"
                  height="80"
                  alt="Данил Ф., сооснователь IT-направления"
                  loading="lazy"
                />
                <span>
                  <Code2 size={18} />
                </span>
              </span>
              <div>
                <h3>Данил Ф.</h3>
                <p>Сооснователь · IT-направление</p>
              </div>
            </div>
            <div className="teacher-principle">
              Понять, почему код работает.
              <br />И захотеть сделать что-то своё.
            </div>
            <p>
              Системный аналитик и Frontend-разработчик. Показывает, как
              технологии работают изнутри: от игр к созданию IT-продуктов.
            </p>
            <div className="teacher-tags">
              <span>Понятные объяснения</span>
              <span>Практика и обратная связь</span>
            </div>
          </article>
        </section>
        <ItCoursePricing onChoose={chooseProgram} />
        <section id="faq" className="section faq-section reveal">
          <div>
            <span className="eyebrow">ДАВАЙТЕ РАЗБЕРЁМСЯ</span>
            <h2>
              Хорошие вопросы.
              <br />
              Честные ответы.
            </h2>
            <p>
              Осталось что-то ещё?{" "}
              <a href={CONTACT_PHONE_HREF}>
                Позвоните нам <ArrowUpRight size={15} />
              </a>
            </p>
          </div>
          <div className="faq-list">
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <ChevronDown size={19} />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
        <section id="enroll" className="section enroll-section reveal">
          <div className="enroll-copy">
            <span className="eyebrow">БОЛЬШОЕ НАЧИНАЕТСЯ С ЛЮБОПЫТСТВА</span>
            <h2>
              А что создаст
              <br />
              <span>ваш ребёнок?</span>
            </h2>
            <p>
              Начнём с бесплатного знакомства: обсудим интересы ребёнка и
              ответим на ваши вопросы. Готовиться заранее не нужно.
            </p>
            <div className="trial-facts">
              <span>20–30 минут</span>
              <span>Полностью бесплатно</span>
              <span>Онлайн-знакомство</span>
            </div>
            <div className="enroll-checks">
              <span>
                <Check />
                Подберём направление и уровень
              </span>
              <span>
                <Check />
                Обсудим формат, расписание и стоимость
              </span>
            </div>
            <span className="enroll-decoration" aria-hidden="true">
              {"{"}
              <Sparkles />
              {"}"}
            </span>
          </div>
          <div className="enroll-form">
            {success ? (
              <div className="form-success" role="status">
                <span>
                  <Check size={32} />
                </span>
                <h3>Начало положено!</h3>
                <p>
                  Заявка отправлена. Команда Люмики позвонит по указанному
                  номеру, чтобы согласовать бесплатное знакомство на 20–30
                  минут.
                </p>
                <button
                  className="studio-button secondary"
                  onClick={() => setSuccess(false)}
                >
                  Отправить ещё одну заявку
                </button>
              </div>
            ) : (
              <>
                <h3>Запись на пробное занятие</h3>
                <p>Бесплатно · 20–30 минут · без подготовки</p>
                <label className="program-label" htmlFor="selected-program">
                  Направление
                </label>
                <select
                  id="selected-program"
                  value={program}
                  onChange={(e) => chooseProgram(e.target.value)}
                >
                  <option>Подбор программы</option>
                  {courses.map((c) => (
                    <option key={c.name}>{c.name}</option>
                  ))}
                </select>
                {pricedCourse && (
                  <div className="it-enroll-price" aria-live="polite">
                    <strong>
                      {formatRubles(pricedCourse.total)} ₽ за курс{" "}
                      {pricedCourse.name}
                    </strong>
                    {pricedCourse.count} занятий ×{" "}
                    {formatRubles(pricedCourse.perLesson)} ₽ · по{" "}
                    {pricedCourse.duration} минут
                  </div>
                )}
                <LeadForm
                  id="lead-form"
                  showTitle={false}
                  showSocialProof={false}
                  initialData={{
                    selectedProgram: pricedCourse
                      ? describeItCourse(pricedCourse)
                      : program,
                    selectedTariff: pricedCourse ? "Стандарт" : "",
                  }}
                  submitLabel="Записаться на пробное занятие ↗"
                  onSuccess={() => setSuccess(true)}
                />
                <p className="form-phone">
                  Или позвоните:{" "}
                  <a href={CONTACT_PHONE_HREF}>{CONTACT_PHONE}</a>
                </p>
              </>
            )}
          </div>
        </section>
      </main>
      <footer className="section studio-footer">
        <div>
          <Brand />
          <p>Место, где любопытство становится умением.</p>
        </div>
        <a href={CONTACT_PHONE_HREF}>{CONTACT_PHONE}</a>
        <span>© {new Date().getFullYear()} Люмика</span>
        <a href="#top" className="back-top" aria-label="Наверх">
          <ArrowRight size={19} />
        </a>
      </footer>
    </div>
  );
}
