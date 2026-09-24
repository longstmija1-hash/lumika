'use client'

import {
  BookOpen,
  Heart,
  Lightbulb,
  LineChart,
  PlayCircle,
  ScrollText,
} from 'lucide-react'
import SectionShell from './ui/SectionShell'
import RevealOnScroll from './ui/RevealOnScroll'
import WaveAccent from './ui/WaveAccent'
import { PLATFORM_FEATURES, PLATFORM_SUB } from '../../data/landingContent'

const ICONS = [BookOpen, Lightbulb, LineChart, Heart, PlayCircle, ScrollText]

const CARD_TONES = [
  {
    badge: 'bg-ums-accent text-white shadow-[0_10px_24px_rgba(124,145,249,0.35)] -rotate-2',
    card: 'bg-white border-[#dce3ff]',
    icon: 'bg-ums-tint text-ums-accent',
    zigzag: false,
  },
  {
    badge: 'bg-ums-coral text-white shadow-[0_10px_24px_rgba(255,107,91,0.32)] rotate-[2deg]',
    card: 'bg-[#e8ecff] border-[#dce3ff]',
    icon: 'bg-white text-ums-coral',
    zigzag: true,
  },
  {
    badge: 'bg-[#111] text-white shadow-[0_10px_24px_rgba(17,17,17,0.2)] -rotate-1',
    card: 'bg-white border-[#ececec]',
    icon: 'bg-ums-tint text-ums-accent',
    zigzag: false,
  },
  {
    badge: 'bg-ums-accent text-white shadow-[0_10px_24px_rgba(124,145,249,0.35)] rotate-[1.5deg]',
    card: 'bg-[#fff1ef] border-[#ffd5cf]',
    icon: 'bg-white text-ums-coral',
    zigzag: true,
  },
  {
    badge: 'bg-ums-coral text-white shadow-[0_10px_24px_rgba(255,107,91,0.32)] -rotate-[2.5deg]',
    card: 'bg-white border-[#dce3ff]',
    icon: 'bg-ums-tint text-ums-accent',
    zigzag: false,
  },
  {
    badge: 'bg-[#eef1ff] text-ums-accent border border-[#dce3ff] shadow-[0_8px_20px_rgba(124,145,249,0.18)] rotate-1',
    card: 'bg-white border-[#dce3ff]',
    icon: 'bg-[#fff1ef] text-ums-coral',
    zigzag: true,
  },
]

function ZigzagEdge() {
  return (
    <div
      className="pointer-events-none absolute inset-x-4 bottom-0 h-2.5 opacity-90"
      style={{
        backgroundImage:
          'repeating-linear-gradient(-45deg, transparent, transparent 4px, rgba(124,145,249,0.4) 4px, rgba(124,145,249,0.4) 8px)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)',
        maskImage:
          'linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)',
      }}
      aria-hidden="true"
    />
  )
}

function FeatureCard({ feature, index }) {
  const Icon = ICONS[index]
  const tone = CARD_TONES[index % CARD_TONES.length]
  const number = String(index + 1).padStart(2, '0')

  return (
    <article className="group relative pt-7 sm:pt-8">
      <div
        className={`absolute left-1/2 top-0 z-10 flex min-w-[4.5rem] -translate-x-1/2 items-center justify-center rounded-2xl px-4 py-2 font-display text-lg font-bold tabular-nums tracking-tight transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:-translate-x-1/2 sm:min-w-[5rem] sm:px-5 sm:py-2.5 sm:text-xl ${tone.badge}`}
      >
        {number}
      </div>

      <div
        className={`relative flex h-full min-h-[11.5rem] flex-col rounded-[28px] border px-5 pb-6 pt-11 text-center shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-[transform,box-shadow,border-color] duration-200 group-hover:-translate-y-1 group-hover:shadow-[0_12px_32px_rgba(124,145,249,0.12)] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 sm:min-h-[12.5rem] sm:rounded-[32px] sm:px-6 sm:pb-7 sm:pt-12 ${tone.card}`}
      >
        <div
          className={`mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-2xl transition-transform duration-200 group-hover:scale-105 ${tone.icon}`}
        >
          <Icon className="h-5 w-5" strokeWidth={2.1} aria-hidden="true" />
        </div>

        <h3 className="mb-2 font-display text-[0.98rem] font-bold leading-snug tracking-tight text-[#111] sm:text-[1.05rem]">
          {feature.title}
        </h3>

        <p className="mx-auto max-w-[16rem] flex-1 text-sm leading-relaxed text-ums-muted">
          {feature.description}
        </p>

        {tone.zigzag && <ZigzagEdge />}
      </div>
    </article>
  )
}

export default function PlatformFeaturesSection() {
  return (
    <SectionShell id="how" variant="tint" topEdge="scallop" bottomEdge="scallop">
      <RevealOnScroll>
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-ums-accent">
            Как устроена платформа
          </p>
          <h2 className="section-heading">
            Учёба, в которую хочется <WaveAccent variant="ripple">возвращаться</WaveAccent>
          </h2>
          <p className="section-sub mx-auto">{PLATFORM_SUB}</p>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-6">
          {PLATFORM_FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </RevealOnScroll>
    </SectionShell>
  )
}
