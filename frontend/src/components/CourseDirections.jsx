"use client";

import {
  ArrowUpRight,
  Box,
  Check,
  Database,
  Gamepad2,
  Monitor,
  Terminal,
} from "lucide-react";
import "./CourseDirections.css";

const visuals = ["scratch", "javascript", "go"];
const icons = [Gamepad2, Box, Terminal];
const projectIcons = [Gamepad2, Monitor, Database];

function PencilAccent({ className = "" }) {
  return (
    <svg
      className={`cr-pencil ${className}`}
      viewBox="0 0 40 60"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m8 19 8-12M14 30l19-4M13 42l10 9M4 48l1 8"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function CourseDirections({ courses, onChoose }) {
  return (
    <section
      id="courses"
      className="section course-ref reveal"
      aria-labelledby="courses-title"
    >
      <div className="cr-heading">
        <h2 id="courses-title">
          У каждого создателя
          <br />
          свой первый шаг.
          <PencilAccent />
        </h2>
        <div className="cr-intro">
          <p>
            От визуальных блоков до собственного API.
            <br />
            Выбираем старт по готовности ребёнка, а не только по возрасту.
          </p>
          <svg viewBox="0 0 88 74" fill="none" aria-hidden="true">
            <path
              d="M78 4C72 35 44 48 34 29C24 9 12 39 33 38C54 36 30 62 7 65M13 57l-7 8 11 3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="cr-grid">
        {courses.map((course, index) => {
          const Icon = icons[index];
          const ProjectIcon = projectIcons[index];
          return (
            <article
              className={`cr-card cr-${visuals[index]}`}
              key={course.name}
              aria-labelledby={`cr-title-${index}`}
            >
              <div className="cr-top">
                <span className="cr-icon">
                  <Icon size={29} strokeWidth={2.5} />
                </span>
                <span className="cr-age">{course.age}</span>
              </div>
              <h3 id={`cr-title-${index}`} className="cr-name">
                {course.name}
                {index === 1 && <PencilAccent />}
              </h3>
              <p className="cr-tag">{course.tag}</p>
              <div className="cr-visual" aria-hidden="true">
                <img
                  src={`/courses/${visuals[index]}.webp`}
                  alt=""
                  width="1600"
                  height="865"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h4>{course.title}</h4>
              <p className="cr-description">
                {index === 0
                  ? "Для тех, кто любит придумывать и ещё не писал код. Собираем игры и мультфильмы из понятных визуальных блоков."
                  : course.text}
              </p>
              <ul className="cr-skills">
                {course.skills.map((skill) => (
                  <li key={skill}>
                    <span>
                      <Check size={16} strokeWidth={2.3} />
                    </span>
                    {skill}
                  </li>
                ))}
              </ul>
              <div className="cr-project">
                <p>ПРОЕКТ, КОТОРЫМ МОЖНО ГОРДИТЬСЯ</p>
                <div>
                  <ProjectIcon size={25} />
                  <strong>{course.project}</strong>
                </div>
              </div>
              <div className="cr-level">
                <span className="cr-bars" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                {index === 2 ? "Средний" : course.level}
              </div>
              <a
                className="cr-cta"
                href="#enroll"
                onClick={() => onChoose(course.name)}
              >
                Попробовать {course.name}
                <ArrowUpRight size={23} />
                {index === 1 && <PencilAccent />}
              </a>
            </article>
          );
        })}
      </div>
      <p className="cr-footnote">
        Возраст — ориентир. Программу и сложность уточняем после знакомства с
        ребёнком.
      </p>
    </section>
  );
}
