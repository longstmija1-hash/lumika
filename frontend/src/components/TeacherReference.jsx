import { ArrowRight, Code2, GraduationCap, ShieldCheck, Signal } from "lucide-react";
import "./TeacherReference.css";

function AccentStrokes({ className = "" }) {
  return (
    <svg className={`tr-strokes ${className}`} viewBox="0 0 56 54" fill="none" aria-hidden="true">
      <path d="M12 30 25 5M29 40 51 29" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export default function TeacherReference() {
  return (
    <section id="teacher" className="teacher-reference" aria-labelledby="teacher-title">
      <div className="tr-decoration" aria-hidden="true">
        <svg viewBox="0 0 1800 570" preserveAspectRatio="none">
          <path d="M790 372C872 295 968 302 911 407S973 494 1090 414M1589 310C1678 200 1681 117 1800 43" />
          <path className="tr-star" d="M1750 438Q1750 461 1772 461Q1750 461 1750 484Q1750 461 1728 461Q1750 461 1750 438Z" />
        </svg>
      </div>
      <div className="tr-copy">
        <span className="tr-eyebrow">ЗА ТЕХНОЛОГИЯМИ — ЧЕЛОВЕК</span>
        <h2 id="teacher-title">
          <span>Внимание к ребёнку.<AccentStrokes /></span>
          <br />Ясность для родителя.
        </h2>
        <p className="tr-intro">
          У каждого свой темп и свои вопросы. Поэтому мы начинаем со знакомства
          и выстраиваем движение от простого к сложному.
        </p>
        <a className="tr-cta" href="#enroll">
          Познакомиться с преподавателем <ArrowRight aria-hidden="true" />
        </a>
        <div className="tr-benefits">
          <div className="tr-benefit">
            <span className="tr-benefit-icon"><ShieldCheck aria-hidden="true" /></span>
            <div><h3>Программа под ребёнка</h3><p>Учитываем интересы, опыт и темп.</p></div>
          </div>
          <div className="tr-benefit">
            <span className="tr-benefit-icon"><Code2 aria-hidden="true" /></span>
            <div><h3>Прогресс на практике</h3><p>Обсуждаем проекты и следующие шаги.</p></div>
          </div>
        </div>
      </div>
      <article className="tr-profile" aria-labelledby="teacher-name">
        <AccentStrokes className="tr-profile-strokes" />
        <div className="tr-profile-header">
          <span className="tr-avatar">
            <img src="/intro-portrait.jpg" width="120" height="120" alt="Данил Ф., сооснователь IT-направления" loading="lazy" />
            <span><Code2 aria-hidden="true" /></span>
          </span>
          <div><h3 id="teacher-name">Данил Ф.</h3><p>Сооснователь · IT-направление</p></div>
        </div>
        <p className="tr-principle">
          <span>Понять, почему код работает</span><br />
          <span>и создать свой первый проект.</span>
          <svg viewBox="0 0 150 16" fill="none" aria-hidden="true"><path d="M3 12Q75 2 147 4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
        </p>
        <p className="tr-bio">Системный аналитик и Frontend-разработчик. Показывает, как технологии работают изнутри: от игр к созданию IT-продуктов.</p>
        <div className="tr-tags">
          <span><GraduationCap aria-hidden="true" />Понятные объяснения</span>
          <span><Signal aria-hidden="true" />Практика и обратная связь</span>
        </div>
      </article>
    </section>
  );
}
