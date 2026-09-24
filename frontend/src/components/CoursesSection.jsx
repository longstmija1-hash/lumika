'use client'

import { useState } from 'react'
import {
  Atom,
  BookOpen,
  Calculator,
  Check,
  ChevronRight,
  Code2,
  Globe2,
  Languages,
  Landmark,
  Library,
  Network,
  PenLine,
  Puzzle,
  Scale,
} from 'lucide-react'
import SectionShell from './landing/ui/SectionShell'
import UmsCard from './landing/ui/UmsCard'
import UmsButton from './landing/ui/UmsButton'
import PillToggle from './landing/PillToggle'
import WaveAccent from './landing/ui/WaveAccent'
import { COURSES_SUB } from '../data/landingContent'

const TRACK_ICONS = {
  foundation: BookOpen,
  humanities: Library,
  it: Code2,
}

const courses = [
  {
    id: 'foundation',
    level: 'Фундамент',
    age: 'школа и ОГЭ / ЕГЭ',
    tagline: 'Закрываем пробелы и готовим к ОГЭ/ЕГЭ на 85+',
    desc: 'Понятное объяснение сложных тем. Без зубрёжки: через логику и практику.',
    subjects: [
      {
        name: 'Математика',
        Icon: Calculator,
        hook: 'База и профиль без страха формул',
        detail:
          'От пробелов в алгебре до задач второй части. Контрольные, олимпиадный запас, ОГЭ и ЕГЭ.',
        topics: ['База', 'Профиль', 'Пробники'],
        format: '45–60 мин',
      },
      {
        name: 'Физика',
        Icon: Atom,
        hook: 'Понимаем явления, а не заучиваем',
        detail: 'Схемы, разборы и задачи в формате школьных контрольных и экзаменов.',
        topics: ['Олимпиады', 'Лабораторные', 'ОГЭ/ЕГЭ'],
        format: '45–60 мин',
      },
      {
        name: 'Русский язык',
        Icon: PenLine,
        hook: 'Пишем и аргументируем уверенно',
        detail: 'Орфография, сочинения, анализ текста с обратной связью куратора.',
        topics: ['Грамотность', 'Сочинение', 'ОГЭ/ЕГЭ'],
        format: '45–60 мин',
      },
    ],
    highlights: ['Оценки без стресса', 'Пробники ФИПИ', 'Поддержка куратора'],
    stat: { label: 'Предмета', value: '3' },
  },
  {
    id: 'humanities',
    level: 'Гуманитарный профиль',
    age: 'история · общество · английский',
    tagline: 'Общественные и языковые дисциплины: уверенные ответы на уроке и экзамене',
    desc: 'Разбираем факты, аргументацию и языковые навыки без зубрёжки списков.',
    subjects: [
      {
        name: 'История',
        Icon: Landmark,
        hook: 'Хронология и причинно-следственные связи',
        detail:
          'От дат и событий к пониманию эпох. Подготовка к ОГЭ и ЕГЭ с разбором типовых заданий.',
        topics: ['Хронология', 'ОГЭ/ЕГЭ', 'Эссе'],
        format: '45–60 мин',
      },
      {
        name: 'Обществознание',
        Icon: Scale,
        hook: 'Аргументация и понимание общества',
        detail: 'Политика, экономика, право: через кейсы и практику, а не сухую теорию.',
        topics: ['Аргументация', 'Кейсы', 'ОГЭ/ЕГЭ'],
        format: '45–60 мин',
      },
      {
        name: 'Английский язык',
        Icon: Languages,
        hook: 'Говорим, пишем, понимаем на слух',
        detail:
          'Грамматика, лексика и разговорная практика с акцентом на экзаменационные форматы.',
        topics: ['Speaking', 'Writing', 'ОГЭ/ЕГЭ'],
        format: '45–60 мин',
      },
    ],
    highlights: ['Аргументация без шаблонов', 'Разбор эссе', 'Разговорная практика'],
    stat: { label: 'Предмета', value: '3' },
  },
  {
    id: 'it',
    level: 'IT и профессия',
    age: 'от алгоритмики до продукта',
    tagline: 'От потребителя игр к создателю IT-продуктов',
    desc: 'Хард-скиллы на реальных задачах. Практика, которая остаётся с учеником.',
    subjects: [
      {
        name: 'Scratch',
        Icon: Puzzle,
        hook: 'Алгоритмика и логика через игры',
        detail: 'Спрайты, циклы, сюжет: первый опыт «я создаю», а не только потребляю.',
        topics: ['Логика', 'Игры', 'Проекты'],
        format: '7–12 лет',
      },
      {
        name: 'Frontend',
        Icon: Globe2,
        hook: 'Свой сайт и интерфейсы',
        detail: 'HTML, CSS, современный фронтенд: деплой и проект в портфолио на GitHub.',
        topics: ['HTML/CSS', 'UI', 'GitHub'],
        format: '12+ лет',
      },
      {
        name: 'Системная аналитика',
        Icon: Network,
        hook: 'Проектирование и архитектура',
        detail:
          'Учимся описывать системы, требования и логику продукта: навык, который ценят в IT.',
        topics: ['Требования', 'Схемы', 'Продукт'],
        format: '14+ лет',
      },
    ],
    highlights: ['Портфолио на GitHub', 'Реальные проекты', 'Менторство практиков'],
    stat: { label: 'Программы', value: '3' },
  },
]

const CATEGORY_OPTIONS = [
  { id: 'foundation', label: 'Фундамент', shortLabel: 'Школа' },
  { id: 'humanities', label: 'Гуманитарный профиль', shortLabel: 'Гуманитарии' },
  { id: 'it', label: 'IT и профессия', shortLabel: 'IT' },
]

function SubjectCardDesktop({ subject }) {
  const Icon = subject.Icon
  return (
    <article className="group h-full flex flex-col rounded-[22px] border border-[#e4e8f5] bg-white p-5 shadow-[0_2px_10px_rgba(17,17,17,0.03)] transition-colors duration-200 hover:border-ums-accent/35">
      <div className="flex items-start justify-between gap-3 mb-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ums-tint text-ums-accent">
          <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
        </span>
        <span className="shrink-0 text-[11px] font-medium px-2.5 py-1 rounded-lg bg-[#f7f8fc] text-ums-muted">
          {subject.format}
        </span>
      </div>
      <h4 className="font-display text-base font-bold text-[#111] leading-tight mb-1.5">
        {subject.name}
      </h4>
      <p className="text-sm font-semibold text-[#111] leading-snug mb-2">{subject.hook}</p>
      <p className="text-sm text-ums-muted leading-relaxed mb-4 flex-1">{subject.detail}</p>
      <div className="flex flex-wrap gap-1.5 mt-auto pt-1 border-t border-[#eef0f6]">
        {subject.topics.map((t) => (
          <span
            key={t}
            className="text-[11px] font-medium px-2 py-1 rounded-md bg-ums-tint/70 text-ums-accent"
          >
            {t}
          </span>
        ))}
      </div>
    </article>
  )
}

function SubjectRowMobile({ subject, open, onToggle }) {
  const Icon = subject.Icon
  return (
    <div className="rounded-2xl border border-[#e4e8f5] bg-white overflow-hidden shadow-[0_1px_4px_rgba(17,17,17,0.03)]">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-3.5 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ums-accent focus-visible:ring-inset active:bg-[#fafafa]"
        aria-expanded={open}
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ums-tint text-ums-accent shrink-0">
          <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <div className="font-bold text-[#111] text-sm leading-tight">{subject.name}</div>
          <div className="text-xs text-ums-muted mt-0.5 line-clamp-1">{subject.hook}</div>
        </div>
        <ChevronRight
          className={`w-4 h-4 text-ums-muted shrink-0 transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
          aria-hidden
        />
      </button>
      {open && (
        <div className="px-3.5 pb-3.5 pt-0 border-t border-[#eef0f6]">
          <p className="text-sm text-ums-muted leading-relaxed pt-3 mb-3">{subject.detail}</p>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {subject.topics.map((t) => (
              <span
                key={t}
                className="text-[11px] font-medium px-2 py-1 rounded-md bg-ums-tint/70 text-ums-accent"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-ums-muted">{subject.format}</p>
        </div>
      )}
    </div>
  )
}

export default function CoursesSection({ openModal }) {
  const [activeId, setActiveId] = useState('foundation')
  const [openSubject, setOpenSubject] = useState(null)
  const active = courses.find((c) => c.id === activeId) ?? courses[0]
  const TrackIcon = TRACK_ICONS[active.id] || BookOpen

  const handleCategory = (id) => {
    setActiveId(id)
    setOpenSubject(null)
  }

  return (
    <SectionShell id="courses" variant="white">
      <div className="text-center mb-6 sm:mb-10">
        <h2 className="section-heading">
          Выберите трек или соберите <WaveAccent variant="double">комплексную программу</WaveAccent>
        </h2>
        <p className="section-sub mx-auto text-base sm:text-lg">{COURSES_SUB}</p>
      </div>

      <div className="mb-6 sm:mb-8">
        <PillToggle options={CATEGORY_OPTIONS} value={activeId} onChange={handleCategory} size="sm" />
      </div>

      <UmsCard padding="none" className="mb-8 overflow-hidden" hover={false}>
        <div
          className="relative isolate overflow-hidden bg-ums-coral px-4 py-4 text-white sm:px-7 sm:py-5"
          aria-label={`${active.stat.value} ${active.stat.label}`}
        >
          <span
            className="pointer-events-none absolute -right-6 -top-10 h-28 w-28 rounded-full bg-white/20 blur-2xl"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute -bottom-10 left-8 h-24 w-36 rounded-full bg-[#ffd2ca]/50 blur-2xl"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute right-1/3 top-0 h-16 w-16 rounded-full bg-white/10 blur-xl"
            aria-hidden
          />
          <div className="relative z-[1] flex items-end gap-3 sm:gap-4">
            <span className="font-display text-5xl sm:text-6xl font-black leading-none tracking-tight tabular-nums">
              {active.stat.value}
            </span>
            <div className="min-w-0 pb-0.5 sm:pb-1">
              <p className="font-display text-sm sm:text-base font-bold uppercase tracking-[0.04em] leading-tight">
                {active.stat.label}
              </p>
              <p className="mt-1 text-xs sm:text-sm text-white/85 leading-snug">
                в программе трека «{active.level}»
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#f7f8fc]">
          <div className="border-b border-[#e4e8f5] bg-white px-4 py-5 sm:px-7 sm:py-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
              <div className="min-w-0 flex-1">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#dce3ff] bg-ums-tint/60 px-3 py-1">
                  <TrackIcon className="h-3.5 w-3.5 text-ums-accent" strokeWidth={2.25} aria-hidden />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ums-accent">
                    {active.age}
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-[1.85rem] font-black text-[#111] leading-[1.15] tracking-tight mb-3">
                  {active.level}
                </h3>
                <p className="text-base sm:text-lg font-semibold text-[#111] leading-snug mb-2 max-w-xl">
                  {active.tagline}
                </p>
                <p className="text-sm sm:text-[15px] text-ums-muted leading-relaxed max-w-xl">
                  {active.desc}
                </p>
              </div>

              <ul className="grid w-full gap-2 sm:w-[15.5rem] sm:shrink-0">
                {active.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2.5 rounded-2xl border border-[#e4e8f5] bg-[#f7f8fc] px-3.5 py-3"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ums-accent text-white">
                      <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                    </span>
                    <span className="text-sm font-medium text-[#111] leading-snug">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="px-4 py-5 sm:px-7 sm:py-7">
            <div className="mb-4 flex items-end justify-between gap-3 sm:mb-5">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-ums-muted mb-1">
                  Программа
                </p>
                <h4 className="font-display text-lg sm:text-xl font-bold text-[#111] leading-tight">
                  Что входит в трек
                </h4>
              </div>
              <span className="hidden sm:inline text-sm text-ums-muted">
                {active.subjects.length} направления
              </span>
            </div>

            <div className="sm:hidden space-y-2.5">
              {active.subjects.map((s) => (
                <SubjectRowMobile
                  key={s.name}
                  subject={s}
                  open={openSubject === s.name}
                  onToggle={() => setOpenSubject((prev) => (prev === s.name ? null : s.name))}
                />
              ))}
            </div>

            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {active.subjects.map((s) => (
                <SubjectCardDesktop key={s.name} subject={s} />
              ))}
            </div>
          </div>

          <div className="border-t border-[#e4e8f5] bg-white px-4 py-4 sm:px-7 sm:py-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-ums-muted leading-snug max-w-md">
                Подберём нагрузку и формат под ученика. Можно взять один трек или собрать комплекс.
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5 sm:shrink-0">
                <UmsButton
                  onClick={() => openModal({ selectedProgram: active.level })}
                  className="w-full sm:w-auto"
                >
                  Записаться
                </UmsButton>
                <UmsButton
                  variant="secondary"
                  onClick={() => openModal({ selectedProgram: 'Комплекс: несколько треков' })}
                  className="w-full sm:w-auto"
                >
                  Собрать комплекс
                </UmsButton>
              </div>
            </div>
          </div>
        </div>
      </UmsCard>
    </SectionShell>
  )
}
