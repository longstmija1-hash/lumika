'use client'

import { ArrowUpRight, BookOpen, Code2, Globe2 } from 'lucide-react'
import LeadForm from './LeadForm'
import UmsCard from './ui/UmsCard'
import UmsButton from './ui/UmsButton'
import WaveAccent from './ui/WaveAccent'
import { HERO_CONTENT } from '../../data/landingContent'

const TRACK_ICONS = {
  book: BookOpen,
  globe: Globe2,
  code: Code2,
}

const TRACK_TONES = {
  accent: 'bg-ums-tint text-ums-accent',
  soft: 'bg-[#f3f4f6] text-[#4b5563]',
  coral: 'bg-[#fff1ef] text-ums-coral',
}

function HeroTracks() {
  return (
    <div
      className="hero-reveal overflow-hidden rounded-[22px] border border-[#e8ebfa] bg-white/90 shadow-[0_4px_24px_rgba(124,145,249,0.08)] sm:rounded-[26px]"
      style={{ animationDelay: '160ms' }}
      aria-label="Три образовательных трека"
    >
      <div className="divide-y divide-[#eef0f8]">
        {HERO_CONTENT.tracks.map((track) => {
          const Icon = TRACK_ICONS[track.icon] || BookOpen
          const tone = TRACK_TONES[track.tone] || TRACK_TONES.accent

          return (
            <a
              key={track.id}
              href="#courses"
              className="group flex items-center gap-3.5 px-4 py-3.5 sm:gap-4 sm:px-5 sm:py-4 transition-colors duration-200 hover:bg-ums-tint/45 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ums-accent/35"
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-transform duration-200 group-hover:scale-[1.03] ${tone}`}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={2.1} aria-hidden="true" />
              </span>

              <div className="min-w-0 flex-1 text-left">
                <div className="text-[0.95rem] font-bold leading-none text-[#111] font-display tracking-tight">
                  {track.label}
                </div>
                <p className="mt-1.5 text-[12px] sm:text-[13px] leading-snug text-ums-muted">
                  {track.subjects.join(' · ')}
                </p>
              </div>

              <ArrowUpRight
                className="h-4 w-4 shrink-0 text-ums-accent/35 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ums-accent"
                aria-hidden="true"
              />
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default function HeroSection({ onOpenModal }) {
  return (
    <section
      id="hero"
      className="relative w-full flex flex-col overflow-hidden pt-[4.75rem] sm:pt-[5.5rem] md:pt-[6.25rem] bg-ums-bg lg:min-h-[100svh]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 45% at 50% 0%, rgba(124,145,249,0.18) 0%, transparent 58%), radial-gradient(ellipse 50% 35% at 50% 85%, rgba(255,107,91,0.05) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-3 sm:py-8 md:py-10 flex-grow">
        <div className="grid lg:grid-cols-2 gap-5 sm:gap-8 lg:gap-14 items-start lg:items-center">
          <div className="hero-copy mx-auto w-full max-w-md text-center sm:max-w-xl sm:text-left lg:mx-0 lg:max-w-none lg:pt-2">
            <div className="hero-reveal flex flex-col items-center gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-start sm:gap-x-3 sm:gap-y-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#dce3ff] bg-ums-tint px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-ums-accent">
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                  <span className="hero-status-ping absolute inline-flex h-full w-full rounded-full bg-ums-accent opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ums-accent" />
                </span>
                {HERO_CONTENT.badge}
              </span>
              <p className="hidden sm:block text-sm text-ums-muted leading-snug">
                {HERO_CONTENT.eyebrow}
              </p>
            </div>

            <h1
              className="hero-reveal mt-4 sm:mt-7 font-bold leading-[1.18] text-[#111] font-display tracking-tight text-balance"
              style={{ animationDelay: '80ms' }}
            >
              <span className="sm:hidden block text-[1.7rem]">
                <span className="block">{HERO_CONTENT.titleMobileLine1}</span>
                <WaveAccent className="mt-1 mx-auto">
                  {HERO_CONTENT.titleMobileAccent}
                </WaveAccent>
              </span>
              <span className="hidden sm:block text-[2.15rem] md:text-[2.65rem] lg:text-[2.85rem]">
                <span className="block">{HERO_CONTENT.titleLine1}</span>
                <span className="block">{HERO_CONTENT.titleLine2}</span>
                <WaveAccent className="mt-1">{HERO_CONTENT.titleAccentLine}</WaveAccent>
              </span>
            </h1>

            <p
              className="hero-reveal mt-3 sm:mt-5 text-[0.95rem] sm:text-lg text-ums-muted leading-relaxed mx-auto sm:mx-0 max-w-[20rem] sm:max-w-lg"
              style={{ animationDelay: '120ms' }}
            >
              <span className="sm:hidden">{HERO_CONTENT.subtitleMobile}</span>
              <span className="hidden sm:inline">{HERO_CONTENT.subtitle}</span>
            </p>

            <div className="mt-4 sm:mt-7">
              <HeroTracks />
            </div>

            <div
              className="hero-reveal mt-5 sm:mt-8 flex flex-col items-stretch sm:items-start gap-2.5 sm:gap-3"
              style={{ animationDelay: '220ms' }}
            >
              <UmsButton
                onClick={() => onOpenModal?.({})}
                className="w-full sm:w-auto min-h-12 shadow-[0_8px_24px_rgba(17,17,17,0.12)] hover:shadow-[0_10px_28px_rgba(17,17,17,0.16)] transition-shadow duration-200"
              >
                {HERO_CONTENT.primaryCta}
              </UmsButton>

              <a
                href="#courses"
                className="sm:hidden inline-flex items-center justify-center min-h-11 px-3 text-sm font-semibold text-ums-accent hover:text-[#5f74e8] transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ums-accent/40 rounded-full"
              >
                {HERO_CONTENT.secondaryCta}
              </a>

              <UmsButton
                variant="secondary"
                href="#courses"
                className="hidden sm:inline-flex w-auto"
              >
                {HERO_CONTENT.secondaryCta}
              </UmsButton>

              <p className="sm:hidden text-[12px] text-ums-muted leading-snug">
                {HERO_CONTENT.trustLine}
              </p>
            </div>
          </div>

          <div className="w-full lg:flex lg:items-center">
            <UmsCard hover={false} padding="sm" className="sm:!p-7 !rounded-[20px] sm:!rounded-[28px] w-full">
              <LeadForm variant="inline" id="hero-lead-form" />
            </UmsCard>
          </div>
        </div>
      </div>
    </section>
  )
}
