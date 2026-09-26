"use client";

import PrivacyLink from "../../components/PrivacyLink";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Braces,
  Check,
  Calculator,
  Atom,
  PenLine,
  Landmark,
  Scale,
  Languages,
  BookOpen,
  Compass,
  MessageCircle,
  ShieldCheck,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { trackFunnel } from "../../lib/funnelAnalytics";
import "../../components/CourseRoadmap.css";
import DirectionSwitch from "../../components/DirectionSwitch";
import LeadForm from "../../components/landing/LeadForm";
import {
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  TEACHERS,
} from "../../data/landingContent";
import { SERVICE_LEVELS, LESSON_PACKAGES } from "../../data/lessonPackages";
import "../studio.css";
import "../studio-polish.css";
import "./school.css";
import ReferenceHero from "../../components/ReferenceHero";

const subjects = [
  {
    name: "Математика",
    icon: Calculator,
    sign: "x² + y²",
    caption: "Логика вместо страха формул",
    text: "От пробелов в алгебре до задач второй части. Учимся видеть способ решения и объяснять каждый шаг.",
    tags: ["Алгебра и геометрия", "База и профиль"],
  },
  {
    name: "Физика",
    icon: Atom,
    sign: "F = ma",
    caption: "Понимать, как устроен мир",
    text: "Явления, схемы и задачи: связываем формулы с тем, что происходит вокруг. Практикуемся на школьных и экзаменационных заданиях.",
    tags: ["Законы и явления", "Решение задач"],
  },
  {
    name: "Русский язык",
    icon: PenLine,
    sign: "А → Я",
    caption: "Мысли, которые звучат точно",
    text: "Орфография, пунктуация, сочинения и анализ текста. Разбираем правила и учимся применять их самостоятельно.",
    tags: ["Грамотность", "Сочинение"],
  },
  {
    name: "История",
    icon: Landmark,
    sign: "XIX → XX",
    caption: "За датами — связи и смыслы",
    text: "От событий к пониманию эпох. Выстраиваем хронологию, разбираем причины и последствия, работаем с источниками.",
    tags: ["Хронология", "Источники и аргументы"],
  },
  {
    name: "Обществознание",
    icon: Scale,
    sign: "человек ↔ общество",
    caption: "Разбираться в жизни общества",
    text: "Право, политика и экономика через понятные примеры. Учимся аргументировать позицию и отвечать по существу.",
    tags: ["Кейсы и понятия", "Аргументация"],
  },
  {
    name: "Английский язык",
    icon: Languages,
    sign: "Hello, world.",
    caption: "Язык для общения и экзаменов",
    text: "Грамматика, лексика, письмо и аудирование. Добавляем разговорную практику и разбираем экзаменационные форматы.",
    tags: ["Speaking & listening", "Grammar & writing"],
  },
];
const goals = [
  "Подтянуть знания",
  "Подготовиться к ОГЭ",
  "Подготовиться к ЕГЭ",
];
const faq = [
  [
    "Сколько стоит знакомство и нужно ли готовиться?",
    "Знакомство полностью бесплатное и длится 20–30 минут. Обсудим вашу задачу, опыт ребёнка и формат занятий. Это беседа, готовиться и выполнять задания заранее не нужно.",
  ],
  [
    "Можно заниматься только одним предметом?",
    "Да. Можно выбрать один предмет или несколько. Начинаем с цели и уровня ученика, затем обсуждаем посильную нагрузку и расписание.",
  ],
  [
    "Чем подготовка к экзамену отличается от школьной программы?",
    "В школьной программе разбираем текущие темы и пробелы. В подготовке к ОГЭ или ЕГЭ добавляем работу с форматом заданий, критериями ответа и разбором пробных вариантов.",
  ],
  [
    "Как проходят занятия?",
    "Онлайн с преподавателем. Разбираем тему, решаем задачи, обсуждаем ошибки и закрепляем материал. Для занятий нужен компьютер или ноутбук, интернет и микрофон.",
  ],
  [
    "Как родитель узнает о прогрессе?",
    "Через обратную связь: что уже получается, какие темы требуют практики и над чем работаем дальше. На знакомстве обсудим удобный формат общения.",
  ],
  [
    "Как выбрать пакет занятий?",
    "Ориентируемся на задачу: отдельная тема, пробелы за четверть или подготовка к экзамену. Цены и пакеты ниже взяты из текущей программы Люмики; окончательный план и условия согласуем до оплаты.",
  ],
  [
    "Можно совмещать школьные предметы и программирование?",
    "Да. Это два направления одной школы. Для программирования есть отдельная страница: переключатель сверху всегда поможет вернуться. Совместную нагрузку обсудим на консультации.",
  ],
];
function Button({
  children,
  href = "#school-enroll",
  onClick,
  secondary = false,
}) {
  return (
    <a
      className={`studio-button ${secondary ? "secondary" : ""}`}
      href={href}
      onClick={onClick}
    >
      {children}
      <ArrowUpRight size={19} />
    </a>
  );
}
function Brand() {
  return (
    <Link
      href="/school"
      className="brand"
      aria-label="Люмика — школа и экзамены"
    >
      <span className="brand-symbol">
        <Braces size={24} />
      </span>
      люмика<span className="brand-dot">®</span>
    </Link>
  );
}
export default function SchoolPage() {
  const [menu, setMenu] = useState(false),
    [subject, setSubject] = useState("Математика"),
    [grade, setGrade] = useState("9"),
    [goal, setGoal] = useState(goals[0]),
    [level, setLevel] = useState("standard"),
    [count, setCount] = useState(8),
    [success, setSuccess] = useState(false);
  const selected =
    LESSON_PACKAGES[level].find((p) => p.count === count) ||
    LESSON_PACKAGES[level][0];
  const tier = SERVICE_LEVELS.find((t) => t.id === level);
  const teacher = TEACHERS.find((t) => t.name === "Николай К.");
  const program = `Школа и экзамены · ${subject} · ${grade} класс · ${goal} · ${count} занятий`;
  const money = (n) => new Intl.NumberFormat("ru-RU").format(n);
  const chooseSubject = (name) => {
    setSubject(name);
    trackFunnel("course_select", name);
    setSuccess(false);
  };
  const changeGrade = (value) => {
    setGrade(value);
    setSuccess(false);
    if (
      (goal === goals[1] && value !== "9") ||
      (goal === goals[2] && !["10", "11"].includes(value))
    )
      setGoal(goals[0]);
  };
  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.06 },
    );
    document
      .querySelectorAll(".school-site .reveal")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return (
    <div className="studio school-site" id="school-top">
      <a href="#school-main" className="skip-link">
        К содержимому
      </a>
      <header className="studio-header ref-header">
        <DirectionSwitch active="school" />
        <div className="header-inner">
          <Brand />
          <nav
            id="school-navigation"
            className={menu ? "nav-open" : ""}
            aria-label="Навигация школьного направления"
          >
            {[
              ["#subjects", "Предметы"],
              ["#school-method", "Как учим"],
              ["#school-pricing", "Стоимость"],
              ["#school-faq", "Вопросы"],
            ].map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenu(false)}>
                {label}
              </a>
            ))}
          </nav>
          <a
            className="header-cta"
            href="#school-enroll"
            onClick={() => setMenu(false)}
          >
            Обсудить обучение
            <ArrowUpRight size={16} />
          </a>
          <button
            className="menu-toggle"
            aria-label={menu ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menu}
            aria-controls="school-navigation"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="school-main">
        <ReferenceHero school />
        <div className="section school-principles">
          <div>
            <Compass />
            <span>
              <strong>Сначала понимаем задачу</strong>Узнаём уровень и цель
              ученика.
            </span>
          </div>
          <div>
            <BookOpen />
            <span>
              <strong>Затем выстраиваем путь</strong>От знакомого к более
              сложному.
            </span>
          </div>
          <div>
            <MessageCircle />
            <span>
              <strong>И остаёмся на связи</strong>Обсуждаем успехи и трудности.
            </span>
          </div>
        </div>
        <section id="subjects" className="section section-space reveal">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                ШЕСТЬ ПРЕДМЕТОВ. ОДИН ПОНЯТНЫЙ ПОДХОД.
              </span>
              <h2>
                Уверенность начинается
                <br />с понимания.
              </h2>
            </div>
            <p>
              Один сложный предмет или несколько направлений — составим
              программу под вашу задачу.
            </p>
          </div>
          <div className="school-subjects">
            {subjects.map((s, i) => (
              <article
                className={`school-subject subject-tone-${i % 3}`}
                key={s.name}
              >
                <div className="school-subject-top">
                  <s.icon size={26} />
                  <span>0{i + 1} / ПРЕДМЕТ</span>
                </div>
                <div className="subject-symbol" aria-hidden="true">
                  {s.sign}
                </div>
                <h3>{s.name}</h3>
                <strong>{s.caption}</strong>
                <p>{s.text}</p>
                <div className="subject-tags">
                  {s.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <a
                  href="#school-finder"
                  onClick={() => chooseSubject(s.name)}
                  aria-label={`Подобрать программу: ${s.name}`}
                >
                  Подобрать программу
                  <ArrowUpRight size={19} />
                </a>
              </article>
            ))}
          </div>
        </section>
        <section id="school-finder" className="section school-finder reveal">
          <div>
            <span className="eyebrow">НЕ БОЛЬШЕ ЗАНЯТИЙ. БОЛЬШЕ ЯСНОСТИ.</span>
            <h2>
              Какая задача
              <br />
              сейчас важнее?
            </h2>
            <p>
              Выберите предмет, класс и цель. Это отправная точка — точный план
              составим после знакомства.
            </p>
            <div className="finder-note">
              <ShieldCheck size={18} />
              Подбор без регистрации
            </div>
            <div className="school-route-note">
              <Compass size={25} />
              <span>
                Интересы и нагрузка ребёнка важнее универсальной программы.
              </span>
            </div>
          </div>
          <div className="school-picker">
            <label htmlFor="school-subject">01 · Предмет</label>
            <select
              id="school-subject"
              value={subject}
              onChange={(e) => chooseSubject(e.target.value)}
            >
              {subjects.map((s) => (
                <option key={s.name}>{s.name}</option>
              ))}
            </select>
            <label htmlFor="school-grade">
              02 · В каком классе учится ребёнок?
            </label>
            <select
              id="school-grade"
              value={grade}
              onChange={(e) => changeGrade(e.target.value)}
            >
              {["1–4", "5", "6", "7", "8", "9", "10", "11"].map((g) => (
                <option key={g} value={g}>
                  {g} класс
                </option>
              ))}
            </select>
            <fieldset>
              <legend>03 · Ваша цель</legend>
              <div className="school-goals">
                {goals.map((g, i) => (
                  <button
                    key={g}
                    type="button"
                    aria-pressed={goal === g}
                    disabled={
                      (i === 1 && grade !== "9") ||
                      (i === 2 && !["10", "11"].includes(grade))
                    }
                    onClick={() => {
                      setGoal(g);
                      setSuccess(false);
                    }}
                  >
                    {g}
                  </button>
                ))}
              </div>
              <p>ОГЭ — для 9 класса, ЕГЭ — для 10–11 классов.</p>
            </fieldset>
            <div className="school-recommendation" aria-live="polite">
              <span className="eyebrow">ВАША ТОЧКА СТАРТА</span>
              <h3>
                {subject} · {grade} класс
              </h3>
              <p>
                {goal === goals[0]
                  ? "Начнём с текущих тем и выясним, где возникают трудности. Затем закрепим базу на практике."
                  : goal === goals[1]
                    ? "Посмотрим, какие задания ОГЭ уже получаются, и составим план работы с темами и форматом экзамена."
                    : "Оценим готовность по темам, определим приоритеты и добавим практику с экзаменационными заданиями."}
              </p>
              <Button onClick={() => setSuccess(false)}>
                Обсудить этот план
              </Button>
            </div>
          </div>
        </section>
        <section id="school-method" className="section section-space reveal">
          <div className="section-heading">
            <div>
              <span className="eyebrow">ОПОРА ВМЕСТО ПОСТОЯННОГО КОНТРОЛЯ</span>
              <h2>
                Учебный ритм,
                <br />в котором всё понятно.
              </h2>
            </div>
            <p>
              Из вашего вопроса вырастает план. Из практики — навык. Из обратной
              связи — понимание следующего шага.
            </p>
          </div>
          <div className="school-method-grid">
            <div className="school-orbit">
              <span className="orbit-label">КОМАНДА ВОКРУГ УЧЕНИКА</span>
              <div className="orbit-ring ring-one" />
              <div className="orbit-ring ring-two" />
              <div className="orbit-core">
                <BookOpen size={31} />
                <strong>Ученик</strong>
                <span>в центре внимания</span>
              </div>
              <span className="orbit-person person-one">
                <BookOpen />
                Преподаватель
              </span>
              <span className="orbit-person person-two">
                <Compass />
                Куратор
              </span>
              <span className="orbit-person person-three">
                <MessageCircle />
                Родитель
              </span>
              <p>Объясняем. Поддерживаем. Обсуждаем прогресс.</p>
            </div>
            <div className="lesson-steps">
              {[
                [
                  "01",
                  "Находим точку старта",
                  "Знакомимся, обсуждаем цель и разбираемся, что уже получается.",
                ],
                [
                  "02",
                  "Учимся через практику",
                  "Разбор темы → задача → обсуждение решения. Ошибки становятся подсказкой, что повторить.",
                ],
                [
                  "03",
                  "Закрепляем и сверяемся",
                  "Практикуемся между занятиями, получаем обратную связь и корректируем план.",
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
        <section className="school-mentor-zone">
          <div className="section school-mentor">
            <div>
              <span className="eyebrow">ЗА ПРОГРАММОЙ СТОЯТ ЛЮДИ</span>
              <h2>
                Понятно ребёнку.
                <br />
                Спокойнее родителю.
              </h2>
              <p>
                Объясняем смысл, а не просим заучить ответ. Держим в фокусе
                посильную нагрузку и самостоятельность.
              </p>
            </div>
            <article>
              <div className="school-mentor-top">
                <span>
                  <img
                    src="/nikolay-portrait.jpg"
                    alt="Николай К., сооснователь школьного направления"
                    width="64"
                    height="64"
                    loading="lazy"
                  />
                </span>
                <div>
                  <h3>{teacher.name}</h3>
                  <p>Сооснователь · фундаментальный трек</p>
                </div>
              </div>
              <p>
                Математика, физика и русский язык как понятные логические
                системы. Работа над школьной базой и подготовкой к ОГЭ и ЕГЭ.
              </p>
              <div className="subject-tags">
                <span>Понятные объяснения</span>
                <span>Движение по шагам</span>
              </div>
            </article>
          </div>
        </section>
        <section id="school-pricing" className="section section-space reveal">
          <div className="section-heading">
            <div>
              <span className="eyebrow">ФОРМАТ ПОД ВАШУ ЗАДАЧУ</span>
              <h2>
                Понятные условия.
                <br />
                Без сложного выбора.
              </h2>
            </div>
            <p>
              Форматы и пакеты из программы Люмики. До оплаты обсудим нагрузку,
              расписание и условия занятий.
            </p>
          </div>
          <div className="school-pricing-grid">
            <div className="school-tiers">
              {SERVICE_LEVELS.map((t) => (
                <button
                  key={t.id}
                  aria-pressed={level === t.id}
                  onClick={() => {
                    setLevel(t.id);
                    setSuccess(false);
                  }}
                >
                  <div>
                    <span>{t.name}</span>
                    <strong>{t.duration}</strong>
                    <i>{level === t.id ? <Check size={17} /> : null}</i>
                  </div>
                  <p>
                    {t.id === "standard"
                      ? "Индивидуальная программа, фокус на теме и обратная связь родителю."
                      : "Более продолжительный разбор и поддержка в мессенджере между занятиями."}
                  </p>
                </button>
              ))}
            </div>
            <div className="school-package">
              <span className="eyebrow">КОЛИЧЕСТВО ЗАНЯТИЙ</span>
              <div className="package-options">
                {LESSON_PACKAGES[level].map((p) => (
                  <button
                    key={p.count}
                    aria-pressed={count === p.count}
                    onClick={() => {
                      setCount(p.count);
                      setSuccess(false);
                    }}
                  >
                    {p.count}
                  </button>
                ))}
              </div>
              <div className="package-price" aria-live="polite">
                <strong>
                  {money(selected.current)} <span>₽</span>
                </strong>
                <p>
                  {money(selected.perLesson)} ₽ за занятие · {tier.duration}
                </p>
              </div>
              <p className="package-explanation">
                {count <= 8
                  ? "Для разбора отдельных тем и ближайших учебных задач."
                  : count === 16
                    ? "Для последовательной работы с пробелами и закрепления материала."
                    : "Для долгосрочного учебного плана и подготовки к экзаменам."}
              </p>
              <Button onClick={() => setSuccess(false)}>
                Обсудить пакет<small>{count} занятий</small>
              </Button>
              <p className="package-footnote">
                Оставление заявки не обязывает к покупке.
              </p>
            </div>
          </div>
        </section>
        <section id="school-faq" className="section faq-section reveal">
          <div>
            <span className="eyebrow">ОТВЕЧАЕМ ПО СУЩЕСТВУ</span>
            <h2>
              Перед началом
              <br />
              важно разобраться.
            </h2>
            <p>
              Можно и просто позвонить:
              <br />
              <a href={CONTACT_PHONE_HREF}>{CONTACT_PHONE}</a>
            </p>
          </div>
          <div className="faq-list">
            {faq.map(([q, a]) => (
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
        <section id="school-enroll" className="section enroll-section reveal">
          <div className="enroll-copy">
            <span className="eyebrow">НАЧНЁМ С ВАШЕЙ ЗАДАЧИ</span>
            <h2>
              Первый шаг —<br />
              <span>поговорить.</span>
            </h2>
            <p>
              Расскажите, что сейчас даётся трудно. Вместе найдём точку старта и
              обсудим подходящий формат.
            </p>
            <div className="trial-facts">
              <span>20–30 минут</span>
              <span>Полностью бесплатно</span>
              <span>Онлайн-знакомство</span>
            </div>
            <div className="enroll-checks">
              <span>
                <Check />
                Уточним цель и уровень
              </span>
              <span>
                <Check />
                Обсудим расписание и стоимость
              </span>
              <span>
                <Check />
                Ответим на вопросы об обучении
              </span>
            </div>
            <div className="school-selection-summary">
              <BookOpen />
              <div>
                <strong>
                  {subject} · {grade} класс
                </strong>
                <span>{goal}</span>
                <small>
                  {tier.name} · {count} занятий
                </small>
              </div>
              <a href="#school-finder">
                Изменить
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
          <div className="enroll-form">
            {success ? (
              <div className="form-success" role="status">
                <span>
                  <Check size={30} />
                </span>
                <h3>Заявка отправлена</h3>
                <p>
                  Команда Люмики позвонит по указанному номеру, чтобы
                  согласовать бесплатное знакомство на 20–30 минут.
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
                <h3>Знакомство с Люмикой</h3>
                <p>Бесплатное знакомство на 20–30 минут.</p>
                <LeadForm
                  id="school-lead-form"
                  showTitle={false}
                  showSocialProof={false}
                  initialData={{
                    selectedProgram: program,
                    selectedTariff: tier.name,
                  }}
                  submitLabel="Обсудить обучение ↗"
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
        <div className="section school-crosslink">
          <CodeBadge />
          <div>
            <span>А если хочется создавать своё?</span>
            <strong>У Люмики есть целый мир программирования.</strong>
          </div>
          <Link href="/">
            Перейти в IT
            <ArrowUpRight size={20} />
          </Link>
        </div>
      </main>
      <footer className="section studio-footer">
        <div>
          <Brand />
          <p>Одна школа. Разные пути к «я могу».</p>
          <p><PrivacyLink /></p>
        </div>
        <a href={CONTACT_PHONE_HREF}>{CONTACT_PHONE}</a>
        <span>© {new Date().getFullYear()} Люмика</span>
        <a href="#school-top" className="back-top" aria-label="Наверх">
          <ArrowRight size={19} />
        </a>
      </footer>
    </div>
  );
}
function CodeBadge() {
  return (
    <span className="school-code-badge">
      <Braces size={28} />
    </span>
  );
}
