"use client";
import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Gamepad2,
  Globe2,
  Terminal,
  Clock3,
} from "lucide-react";
import { IT_COURSE_PRICING, formatRubles } from "../data/itCoursePricing";
import "./ItCoursePricing.css";
import { trackFunnel } from "../lib/funnelAnalytics";

const icons = [Gamepad2, Globe2, Terminal];
export default function ItCoursePricing({ onChoose }) {
  const [index, setIndex] = useState(0);
  const course = IT_COURSE_PRICING[index];
  return (
    <section
      id="it-pricing"
      className="section section-space it-pricing reveal"
    >
      <div className="section-heading">
        <div>
          <span className="eyebrow">ВСЯ СТОИМОСТЬ — СРАЗУ</span>
          <h2>
            Один курс.
            <br />
            <span>Понятная сумма.</span>
          </h2>
        </div>
        <p>
          Фиксированный вводный курс с преподавателем и собственным проектом. Вы
          выбираете направление — стоимость всего курса уже рассчитана.
        </p>
      </div>
      <div className="it-pricing-grid">
        <div
          className="it-price-options"
          role="group"
          aria-label="Направление для расчёта стоимости"
        >
          {IT_COURSE_PRICING.map((item, i) => {
            const Icon = icons[i];
            return (
              <button
                key={item.name}
                type="button"
                aria-pressed={index === i}
                className={index === i ? "active" : ""}
                onClick={() => {
                  setIndex(i);
                  trackFunnel("course_select", item.name);
                }}
              >
                <span className={`it-price-icon it-price-icon-${i}`}>
                  <Icon />
                </span>
                <span className="it-price-option-text">
                  <strong>{item.name}</strong>
                  <span>
                    {item.count} занятий · {item.duration} минут
                  </span>
                </span>
                <span className="it-price-option-end">
                  <b>{formatRubles(item.total)} ₽</b>
                  <span>за весь курс</span>
                </span>
                <span className="it-price-check" aria-hidden="true">
                  {index === i && <Check size={15} />}
                </span>
              </button>
            );
          })}
          <p className="it-price-format">
            <Clock3 size={18} /> Индивидуально · онлайн · формат «Стандарт»
          </p>
        </div>
        <div className="it-price-detail">
          <div aria-live="polite" aria-atomic="true">
            <div className="it-price-kicker">
              <span>ВВОДНЫЙ КУРС / {course.name}</span>
              <span>Фиксированная цена</span>
            </div>
            <p className="it-price-total">
              {formatRubles(course.total)} <span>₽</span>
            </p>
            <p className="it-price-equation">
              {course.count} занятий × {formatRubles(course.perLesson)} ₽ ={" "}
              <strong>{formatRubles(course.total)} ₽</strong>
            </p>
            <div className="it-price-result">
              <span>ПРОЕКТ КУРСА</span>
              <h3>{course.result}</h3>
            </div>
            <ol className="it-price-stages">
              {course.stages.map((stage) => (
                <li key={stage}>{stage}</li>
              ))}
            </ol>
            <div className="it-price-timing">
              <span>
                При 1 занятии в неделю <b>{course.count} учебных недель</b>
              </span>
              <span>
                При 2 занятиях в неделю <b>{course.count / 2} учебных недель</b>
              </span>
            </div>
          </div>
          <a
            href="#enroll"
            className="studio-button"
            onClick={() => onChoose(course.name)}
          >
            Выбрать курс {course.name}
            <ArrowUpRight size={19} />
          </a>
          <p className="it-price-note">
            Полная стоимость указанного числа занятий. Календарный срок зависит
            от расписания и переносов. Заявка не обязывает к оплате.
          </p>
        </div>
      </div>
    </section>
  );
}
