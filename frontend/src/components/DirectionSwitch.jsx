import { Code2, GraduationCap, ArrowUpRight } from "lucide-react";
import "./DirectionSwitch.css";

export default function DirectionSwitch({ active = "it" }) {
  return (
    <div className={`direction-bar direction-${active}`}>
      <div className="direction-inner">
        <span className="direction-caption">
          Одна школа.
          <br />
          <strong>Больше возможностей.</strong>
        </span>
        <div
          className="direction-switch"
          role="navigation"
          aria-label="Направления школы"
        >
          <span className="direction-slider" aria-hidden="true" />
          <a href="/" aria-current={active === "it" ? "page" : undefined}>
            <Code2 />
            <span>
              Программирование<small>Игры, сайты и настоящий код</small>
            </span>
            <ArrowUpRight className="direction-arrow" />
          </a>
          <a
            href="/school"
            aria-current={active === "school" ? "page" : undefined}
          >
            <GraduationCap />
            <span>
              Школа и экзамены<small>Предметы, ОГЭ и ЕГЭ</small>
            </span>
            <ArrowUpRight className="direction-arrow" />
          </a>
        </div>
        <span className="direction-hint">
          {active === "it" ? "Создаём новое" : "Разбираемся в сложном"}
          <i />
        </span>
      </div>
    </div>
  );
}
