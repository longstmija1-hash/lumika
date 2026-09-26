import Link from "next/link";
import policy from "../../data/privacyPolicy.json";
import styles from "./privacy.module.css";

export const metadata = {
  title: "Политика обработки персональных данных — ЛЮМИКА",
  description: "Порядок обработки и защиты персональных данных пользователей сайта Люмики.",
};

// Render only the simple formatting in the supplied document; no raw HTML.
function InlineText({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\(https?:\/\/[^)]+\))/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}><InlineText text={part.slice(2, -2)} /></strong>;
    }
    const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
    if (link) {
      const href = link[2] === "https://lumika.tech/privacy" ? "/privacy" : link[2];
      return <a key={index} href={href}>{link[1]}</a>;
    }
    return part;
  });
}

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="Люмика — главная"><span aria-hidden="true">{"{ }"}</span>ЛЮМИКА</Link>
        <nav aria-label="Направления школы"><Link href="/">Программирование</Link><Link href="/school">Школа и экзамены</Link></nav>
      </header>
      <main id="privacy-main" className={styles.document}>
        <span className={styles.eyebrow}>ДОКУМЕНТЫ ЛЮМИКИ</span>
        {policy.map((block, index) => {
          if (block.type === "title") return <h1 key={index}>{block.text}</h1>;
          if (block.type === "heading") return <h2 key={index} id={`section-${block.text.split(".")[0]}`}>{block.text}</h2>;
          if (block.type === "list") return <ul key={index}>{block.items.map((item, n) => <li key={n}><InlineText text={item} /></li>)}</ul>;
          return <p key={index}><InlineText text={block.text} /></p>;
        })}
      </main>
      <footer className={styles.footer}><Link href="/">← Вернуться на сайт</Link><span>© {new Date().getFullYear()} Люмика</span></footer>
    </div>
  );
}
