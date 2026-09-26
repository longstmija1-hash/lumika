"use client";

import { useState, lazy, Suspense } from "react";
import Link from "next/link";
import PrivacyLink from "../../../components/PrivacyLink";
import { FaTelegramPlane } from "react-icons/fa";
import { Rocket, Check, Compass, Braces } from "lucide-react";
import LumikaLogo from "../../../components/Logo";
import UmsButton from "../../../components/landing/ui/UmsButton";
import UmsCard from "../../../components/landing/ui/UmsCard";
import "../../studio.css";
import "../../studio-polish.css";
import {
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
} from "../../../data/landingContent";

const OrderModal = lazy(() => import("../../../components/OrderModal"));

const Navbar = ({ openModal }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-ums-border shadow-sm h-14">
    <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
      <Link
        href="/"
        className="flex items-center shrink-0 cursor-pointer"
        style={{ textDecoration: "none" }}
      >
        <LumikaLogo size="md" link={false} />
      </Link>
      <div className="hidden md:flex items-center gap-8 text-sm text-ums-muted">
        <Link href="/" className="hover:text-[#111] transition-colors">
          На главную
        </Link>
        <PrivacyLink />
        <Link href="/#courses" className="hover:text-[#111] transition-colors">
          Все предметы
        </Link>
      </div>
      <UmsButton onClick={openModal} className="text-sm px-4 !py-2">
        Записаться
      </UmsButton>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="border-t border-ums-border py-12 px-4 bg-ums-bg">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <div className="mb-4">
          <LumikaLogo size="md" />
        </div>
        <p className="text-ums-muted text-sm">
          © 2026 ЛЮМИКА. Все права защищены.
        </p>
      </div>
      <div className="flex flex-col items-center md:items-end gap-5">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <a
            href={CONTACT_PHONE_HREF}
            className="text-[#111] text-xl hover:text-ums-muted transition-colors"
          >
            {CONTACT_PHONE}
          </a>
          <div className="flex items-center gap-5 text-2xl">
            <a
              href="https://t.me/BNp0D0KTpAnnA"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="text-[#9ca3af] hover:text-[#111] transition-all"
            >
              <FaTelegramPlane />
            </a>
            <a
              href="https://max.ru/u/f9LHodD0cOJH9YLhQHH7ahys0fzwdOZZfVcPexgH8nLQBtS8XZ0L9GN6yuI"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9ca3af] font-black text-xl tracking-widest hover:text-[#111] transition-all"
            >
              MAX
            </a>
          </div>
        </div>
        <Link
          href="/"
          className="text-sm text-ums-muted hover:text-[#111] transition-colors"
        >
          На главную
        </Link>
      </div>
    </div>
  </footer>
);

export default function ClientSubjectPage({ subject }) {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <div className="studio subject-page min-h-screen flex flex-col">
      <Navbar openModal={openModal} />

      <main className="flex-grow pt-[5.75rem] pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/#courses"
            className="inline-flex items-center text-ums-muted hover:text-[#111] transition-colors text-sm gap-2 mb-10"
          >
            ← Назад к списку направлений
          </Link>

          <div className="grid lg:grid-cols-2 gap-10 items-start mb-12">
            <div>
              <div className="subject-icon">
                <Compass size={30} />
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-4 text-[#111]">
                {subject.title}
              </h1>
              <p className="text-lg text-ums-muted leading-relaxed">
                {subject.description}
              </p>
            </div>
            <div className="subject-roadmap">
              <span className="eyebrow">ПУТЬ К РЕЗУЛЬТАТУ</span>
              <Braces className="subject-roadmap-icon" />
              <h2>
                Понять.
                <br />
                Попробовать.
                <br />
                <span>Сделать самому.</span>
              </h2>
              <div className="subject-roadmap-steps">
                <span>
                  <b>01</b> Знакомство и цель
                </span>
                <span>
                  <b>02</b> Практика с преподавателем
                </span>
                <span>
                  <b>03</b> Обратная связь
                </span>
              </div>
            </div>
          </div>

          <UmsCard padding="lg" className="mb-12">
            <h2 className="text-2xl font-bold text-[#111] mb-6">Почему мы?</h2>
            <ul className="grid md:grid-cols-2 gap-4">
              {subject.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-ums-muted">
                  <div className="mt-0.5 shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-[#fafafa] border border-ums-border">
                    <Check className="w-3.5 h-3.5 text-[#111]" aria-hidden />
                  </div>
                  <span className="leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </UmsCard>

          <div className="text-center">
            <UmsButton onClick={openModal} className="text-lg px-10 py-4 gap-2">
              <Rocket className="w-5 h-5" aria-hidden />
              Записаться на первый урок
            </UmsButton>
          </div>
        </div>
      </main>

      <Footer />

      <Suspense fallback={null}>
        <OrderModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          initialData={{ selectedProgram: subject.programName }}
        />
      </Suspense>
    </div>
  );
}
