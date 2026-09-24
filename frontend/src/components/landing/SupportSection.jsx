'use client'

import {
  ArrowDown,
  Crown,
  GraduationCap,
  MessageCircle,
  User,
  UserCog,
} from 'lucide-react'
import SectionShell from './ui/SectionShell'
import RevealOnScroll from './ui/RevealOnScroll'
import WaveAccent from './ui/WaveAccent'
import {
  SUPPORT_EYEBROW,
  SUPPORT_ROLES,
  SUPPORT_SUB,
} from '../../data/landingContent'

/**
 * Soft Umschool-style planets (white discs + tinted icon wells).
 * orbitPct — orbit diameter %; duration — seconds per revolution.
 */
const PLANETS = [
  {
    short: 'Основатели',
    Icon: Crown,
    orbitPct: 48,
    duration: 20,
    start: -35,
    iconWell: 'bg-ums-tint text-ums-accent',
    ring: 'rgba(124,145,249,0.22)',
    dot: 'bg-ums-accent',
    chip: 'border-ums-accent/25 bg-ums-tint text-ums-accent',
    line: 'from-ums-accent/50 to-ums-accent/10',
  },
  {
    short: 'Менеджер',
    Icon: UserCog,
    orbitPct: 64,
    duration: 28,
    start: 55,
    iconWell: 'bg-[#fff1ef] text-ums-coral',
    ring: 'rgba(255,107,91,0.2)',
    dot: 'bg-ums-coral',
    chip: 'border-ums-coral/25 bg-[#fff1ef] text-ums-coral',
    line: 'from-ums-coral/50 to-ums-coral/10',
  },
  {
    short: 'Куратор',
    Icon: GraduationCap,
    orbitPct: 78,
    duration: 36,
    start: 155,
    iconWell: 'bg-[#f4f4f5] text-[#111]',
    ring: 'rgba(124,145,249,0.16)',
    dot: 'bg-[#111]',
    chip: 'border-[#e4e4e7] bg-[#f4f4f5] text-[#111]',
    line: 'from-[#111]/35 to-[#111]/5',
  },
  {
    short: 'Онлайн',
    Icon: MessageCircle,
    orbitPct: 84,
    duration: 46,
    start: 245,
    iconWell: 'bg-emerald-50 text-emerald-600',
    ring: 'rgba(16,185,129,0.2)',
    dot: 'bg-emerald-500',
    chip: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    line: 'from-emerald-500/45 to-emerald-500/10',
  },
]

function OrbitPlanet({ planet }) {
  const { short, Icon, orbitPct, duration, start, iconWell } = planet

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 z-[2]"
      style={{
        width: `${orbitPct}%`,
        height: `${orbitPct}%`,
        transform: `translate(-50%, -50%) rotate(${start}deg)`,
      }}
    >
      <div
        className="support-solar-spin absolute inset-0"
        style={{ '--orbit-duration': `${duration}s` }}
      >
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
          <div style={{ transform: `rotate(${-start}deg)` }}>
            <div
              className="support-solar-spin-rev flex flex-col items-center gap-1.5"
              style={{ '--orbit-duration': `${duration}s` }}
            >
              <div className="relative flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full border border-[#e8ebfa] bg-white shadow-[0_6px_20px_rgba(124,145,249,0.12)] sm:h-14 sm:w-14">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full sm:h-10 sm:w-10 ${iconWell}`}
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden />
                </span>
              </div>

              <span className="whitespace-nowrap rounded-full border border-[#e8ebfa] bg-white/95 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-[#111] shadow-[0_3px_10px_rgba(0,0,0,0.05)] sm:text-[11px]">
                {short}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SupportHub() {
  return (
    <div
      className="relative mx-auto w-full max-w-[380px] sm:max-w-[520px]"
      role="img"
      aria-label="Солнечная система поддержки: ученик в центре, роли команды вращаются по орбитам"
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <div className="relative h-full w-full scale-[0.92] sm:scale-100">
          <div
            className="pointer-events-none absolute inset-[6%] rounded-full bg-[radial-gradient(circle_at_50%_42%,rgba(124,145,249,0.12)_0%,rgba(255,255,255,0.9)_55%,transparent_72%)]"
            aria-hidden
          />

          {PLANETS.map((p) => (
            <div
              key={`ring-${p.short}`}
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed"
              style={{
                width: `${p.orbitPct}%`,
                height: `${p.orbitPct}%`,
                borderColor: p.ring,
              }}
              aria-hidden
            />
          ))}

          <div className="absolute left-1/2 top-1/2 z-[4] -translate-x-1/2 -translate-y-1/2">
            <div className="relative flex items-center justify-center">
              <span
                className="support-sun-pulse pointer-events-none absolute -inset-6 rounded-full bg-ums-accent/20 blur-2xl"
                aria-hidden
              />
              <span
                className="pointer-events-none absolute -inset-3 rounded-full border border-dashed border-ums-accent/30"
                aria-hidden
              />
              <span
                className="pointer-events-none absolute -inset-1.5 rounded-full bg-gradient-to-br from-ums-tint via-white to-[#fff1ef]"
                aria-hidden
              />

              <div className="relative flex h-[5.75rem] w-[5.75rem] items-center justify-center rounded-full border border-white bg-gradient-to-b from-white to-[#f3f5ff] shadow-[0_12px_36px_rgba(124,145,249,0.22)] sm:h-[6.5rem] sm:w-[6.5rem]">
                <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-ums-accent to-[#9aa8f9] text-white shadow-[0_8px_20px_rgba(124,145,249,0.35)] sm:h-16 sm:w-16">
                  <User className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={2} aria-hidden />
                  <span
                    className="absolute bottom-1 right-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-400"
                    aria-hidden
                  />
                </span>
              </div>

              <span className="absolute -bottom-2 left-1/2 z-[1] -translate-x-1/2 whitespace-nowrap rounded-full border border-[#dce3ff] bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-ums-accent shadow-[0_6px_16px_rgba(124,145,249,0.18)] sm:-bottom-2.5 sm:px-3.5 sm:text-[11px]">
                Ученик
              </span>
            </div>
          </div>

          {PLANETS.map((planet) => (
            <OrbitPlanet key={planet.short} planet={planet} />
          ))}
        </div>
      </div>
    </div>
  )
}

function SupportRoleCard({ item, planet, index }) {
  const Icon = planet.Icon

  return (
    <div className="flex h-full flex-col items-center">
      {/* Bridge from solar system → card */}
      <div className="mb-1 flex flex-col items-center">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wide sm:text-[11px] ${planet.chip}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${planet.dot}`} aria-hidden />
          {planet.short}
        </span>

        <div className="mt-2 flex flex-col items-center" aria-hidden="true">
          <div className={`h-7 w-px bg-gradient-to-b ${planet.line}`} />
          <ArrowDown className="h-4 w-4 text-ums-accent/55" strokeWidth={2.2} />
        </div>
      </div>

      {/* pt-6 reserves space so the floating icon is never clipped */}
      <div className="relative mt-1 flex w-full flex-1 flex-col pt-6">
        <div
          className={`absolute left-1/2 top-6 z-[2] flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white shadow-[0_8px_20px_rgba(124,145,249,0.14)] ${planet.iconWell}`}
        >
          <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
        </div>

        <article className="group flex w-full flex-1 flex-col rounded-[26px] border border-[#e8ebfa] bg-white pt-9 shadow-[0_4px_24px_rgba(124,145,249,0.06)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-ums-accent/35 hover:shadow-[0_12px_32px_rgba(124,145,249,0.12)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:rounded-[28px]">
          <div className="flex flex-1 flex-col px-5 pb-5 text-center sm:px-6 sm:pb-6">
            <div className="mb-3 flex items-center justify-center gap-2">
              <span className="font-display text-[11px] font-bold tabular-nums tracking-wider text-ums-accent/40">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span
                className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] ${planet.chip}`}
              >
                {item.tag}
              </span>
            </div>

            <h3 className="mb-2 font-display text-[1.05rem] font-bold leading-snug tracking-tight text-[#111]">
              {item.role}
            </h3>
            <p className="text-sm leading-relaxed text-ums-muted">{item.description}</p>
          </div>
        </article>
      </div>
    </div>
  )
}

export default function SupportSection() {
  return (
    <SectionShell id="support" variant="white">
      <RevealOnScroll>
        <div className="relative mx-auto mb-8 max-w-3xl text-center sm:mb-10">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-ums-accent">
            {SUPPORT_EYEBROW}
          </p>
          <h2 className="section-heading">
            Целая команда заботы вокруг <WaveAccent variant="arc">одного ученика</WaveAccent>
          </h2>
          <p className="section-sub mx-auto">{SUPPORT_SUB}</p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-emerald-700">
            <span className="relative flex h-2 w-2">
              <span className="hero-status-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Живые люди, не бот
          </div>
        </div>

        <SupportHub />

        {/* Hub → cards bridge */}
        <div className="mb-6 mt-2 flex flex-col items-center sm:mb-8" aria-hidden="true">
          <div className="h-8 w-px bg-gradient-to-b from-ums-accent/40 to-ums-accent/10" />
          <ArrowDown className="h-5 w-5 text-ums-accent/60" strokeWidth={2.2} />
          <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-ums-muted">
            Кто за что отвечает
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-4 lg:gap-6">
          {SUPPORT_ROLES.map((item, i) => (
            <SupportRoleCard
              key={item.role}
              item={item}
              planet={PLANETS[i]}
              index={i}
            />
          ))}
        </div>
      </RevealOnScroll>
    </SectionShell>
  )
}
