"use client";

import PrivacyLink from "../components/PrivacyLink";

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
import ReferenceHero from "../components/ReferenceHero";
import CourseDirections from "../components/CourseDirections";
import CourseFinder from "../components/CourseFinder";
import TeacherReference from "../components/TeacherReference";

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
    "Ребёнок начнет выполнять и объяснить задания самостоятельно. Обсуждаем пройденные темы, показываем проекты и объясняем, над чем работаем дальше. Сложность растёт по мере освоения материала.",
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

export default function LandingPage() {
  const [menu, setMenu] = useState(false);
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
      <header className="studio-header ref-header">
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
        <ReferenceHero renderProject={(type) => <ProjectPreview type={type} hero />} />
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
        <CourseDirections courses={courses} onChoose={(name) => { chooseProgram(name); setSuccess(false); }} />
        <CourseRoadmap onChoose={chooseProgram} />
        <CourseFinder
          courses={courses}
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
        <TeacherReference />
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
          <p><PrivacyLink /></p>
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
