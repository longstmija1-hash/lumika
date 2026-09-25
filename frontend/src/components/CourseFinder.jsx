"use client";
import { useState } from "react";
import {
  ArrowUpRight,
  GraduationCap,
  Heart,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import "./CourseFinder.css";

export default function CourseFinder({ courses, onChoose }) {
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
    <section
      id="finder"
      className="finder finder-ref section reveal"
      aria-labelledby="finder-title"
    >
      <div className="finder-intro">
        <span className="eyebrow">НЕ ЗНАЕТЕ, С ЧЕГО НАЧАТЬ?</span>
        <h2 id="finder-title">
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
        <div className="ff-mascot" aria-hidden="true">
          <img
            src="/finder/luma-books.webp"
            alt=""
            width="900"
            height="1200"
            loading="lazy"
          />
          <span className="ff-speech">
            Поможем выбрать
            <br />
            направление <Heart size={17} />
            <svg viewBox="0 0 40 45" fill="none">
              <path
                d="m6 22 8-17m5 28 16-10"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>
        <svg
          className="ff-trail"
          viewBox="0 0 480 290"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M8 270C54 67 109 67 145 126S212 266 290 143 196 84 293 232 387 68 472 100"
            stroke="currentColor"
            strokeWidth="9"
            strokeLinecap="round"
          />
        </svg>
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
            ["Игры", "Сайты", "Приложения", "Прикладное программирование"],
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
              <a
                className="ff-result-cta"
                href="#enroll"
                onClick={() => onChoose(course.name)}
              >
                Обсудить программу
                <ArrowUpRight size={20} />
              </a>
            </>
          ) : (
            <div className="ff-result-empty">
              <span className="ff-result-icon">
                <Sparkles size={27} />
              </span>
              <p>
                Ответьте по одному пункту —<br />и мы подскажем подходящий
                старт.
              </p>
              <svg
                className="ff-hint-arrow"
                viewBox="0 0 60 40"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 12c7 18 38 13 49 8m-9-8 11 8-10 11"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="ff-result-skeleton" aria-hidden="true">
                <GraduationCap size={30} />
                <span>
                  <i />
                  <i />
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
