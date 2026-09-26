import "./PrivacyLink.css";

export default function PrivacyLink({ children = "Политика обработки персональных данных", newTab = false }) {
  return (
    <a href="/privacy" className="privacy-policy-link" target={newTab ? "_blank" : undefined} rel={newTab ? "noopener noreferrer" : undefined}>
      {children}
      {newTab && <span className="sr-only"> (откроется в новой вкладке)</span>}
    </a>
  );
}
