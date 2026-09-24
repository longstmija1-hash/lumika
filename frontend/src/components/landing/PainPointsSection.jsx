'use client'

import { CalendarX2, Eye, Gamepad2, Hourglass } from 'lucide-react'
import SectionShell from './ui/SectionShell'
import UmsButton from './ui/UmsButton'
import RevealOnScroll from './ui/RevealOnScroll'
import WaveAccent from './ui/WaveAccent'
import {
  PAIN_POINTS,
  PAIN_POINTS_CTA,
  PAIN_POINTS_NOTE,
  PAIN_POINTS_SUB,
} from '../../data/landingContent'

const ICONS = [CalendarX2, Eye, Hourglass, Gamepad2]

/** Soft clay-style variants using brand palette only */
const CARD_TONES = [
  {
    card: 'bg-ums-accent text-white shadow-[0_12px_32px_rgba(124,145,249,0.28)]',
    iconWrap: 'bg-white text-ums-accent shadow-[0_8px_20px_rgba(124,145,249,0.35)]',
    number: 'text-white/70',
    quote: 'text-white/92',
    zigzag: false,
  },
  {
    card: 'bg-[#e8ecff] text-[#111] shadow-[0_10px_28px_rgba(124,145,249,0.12)]',
    iconWrap: 'bg-white text-ums-accent shadow-[0_8px_18px_rgba(124,145,249,0.2)]',
    number: 'text-ums-accent',
    quote: 'text-[#333]',
    zigzag: true,
  },
  {
    card: 'bg-[#fff1ef] text-[#111] shadow-[0_10px_28px_rgba(255,107,91,0.12)]',
    iconWrap: 'bg-white text-ums-coral shadow-[0_8px_18px_rgba(255,107,91,0.22)]',
    number: 'text-ums-coral',
    quote: 'text-[#333]',
    zigzag: false,
  },
  {
    card: 'bg-white text-[#111] border border-[#dce3ff] shadow-[0_10px_28px_rgba(0,0,0,0.04)]',
    iconWrap: 'bg-ums-tint text-ums-accent shadow-[0_8px_18px_rgba(124,145,249,0.18)]',
    number: 'text-ums-accent',
    quote: 'text-[#333]',
    zigzag: false,
  },
]

function PainCard({ item, index }) {
  const Icon = ICONS[index % ICONS.length]
  const tone = CARD_TONES[index % CARD_TONES.length]

  return (
    <article className="group relative pt-8">
      <div
        className={`absolute left-1/2 top-0 z-10 flex h-[3.75rem] w-[3.75rem] -translate-x-1/2 items-center justify-center rounded-full transition-transform duration-200 group-hover:-translate-y-0.5 ${tone.iconWrap}`}
        aria-hidden="true"
      >
        <Icon className="h-6 w-6" strokeWidth={2.1} />
      </div>

      <div
        className={`relative flex h-full min-h-[13.5rem] flex-col items-center rounded-[28px] px-5 pb-7 pt-12 text-center transition-transform duration-200 group-hover:-translate-y-1 sm:min-h-[14.5rem] sm:rounded-[32px] sm:px-6 sm:pb-8 sm:pt-14 ${tone.card}`}
      >
        <div
          className={`font-display text-xs font-bold tracking-[0.16em] tabular-nums ${tone.number}`}
        >
          {item.id}
        </div>

        <h3 className="mt-2 font-display text-[1.05rem] font-bold leading-snug tracking-tight sm:text-[1.15rem]">
          {item.label}
        </h3>

        <p
          className={`mt-3 max-w-[18rem] text-[0.95rem] font-medium leading-relaxed sm:text-base ${tone.quote}`}
        >
          {item.quote}
        </p>

        {tone.zigzag && (
          <div
            className="pointer-events-none absolute inset-x-5 bottom-0 h-2.5 opacity-80"
            style={{
              backgroundImage:
                'repeating-linear-gradient(-45deg, transparent, transparent 4px, rgba(124,145,249,0.35) 4px, rgba(124,145,249,0.35) 8px)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)',
              maskImage:
                'linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)',
            }}
            aria-hidden="true"
          />
        )}
      </div>
    </article>
  )
}

export default function PainPointsSection({ onScrollToForm }) {
  return (
    <SectionShell
      variant="tint"
      topEdge="ticket"
      bottomEdge="ticket"
      overlay={
        <>
          <span
            className="absolute -left-2 top-12 font-display text-[6rem] leading-none text-ums-accent/[0.07] sm:left-6 sm:top-16 sm:text-[8rem]"
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <span
            className="absolute -right-2 bottom-24 rotate-180 font-display text-[6rem] leading-none text-ums-coral/[0.06] sm:right-6 sm:bottom-28 sm:text-[8rem]"
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <div
            className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ums-accent/[0.04] blur-3xl"
            aria-hidden="true"
          />
        </>
      }
    >
      <RevealOnScroll>
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-16">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-ums-accent">
            Знакомые ситуации
          </p>
          <h2 className="section-heading">
            Мы знаем, с чем вы сталкиваетесь <WaveAccent variant="zigzag">каждый год</WaveAccent>
          </h2>
          <p className="section-sub mx-auto">{PAIN_POINTS_SUB}</p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 sm:gap-7 lg:gap-8">
          {PAIN_POINTS.map((item, i) => (
            <PainCard key={item.id} item={item} index={i} />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 text-center sm:mt-14">
          <p className="max-w-md text-sm text-ums-muted">{PAIN_POINTS_NOTE}</p>
          <UmsButton onClick={onScrollToForm} className="px-8">
            {PAIN_POINTS_CTA}
          </UmsButton>
        </div>
      </RevealOnScroll>
    </SectionShell>
  )
}
