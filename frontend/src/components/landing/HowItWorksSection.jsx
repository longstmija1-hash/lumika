'use client'

import {
  BookOpenCheck,
  ClipboardCheck,
  Coins,
  MessageSquareText,
  Trophy,
} from 'lucide-react'
import SectionShell from './ui/SectionShell'
import RevealOnScroll from './ui/RevealOnScroll'
import WaveAccent from './ui/WaveAccent'
import {
  HOW_IT_WORKS_EYEBROW,
  HOW_IT_WORKS_STEPS,
  HOW_IT_WORKS_SUB,
} from '../../data/landingContent'

const STEP_ICONS = [BookOpenCheck, ClipboardCheck, MessageSquareText, Coins, Trophy]

function StepCard({ step, index, Icon, compact = false }) {
  const locked = Boolean(step.locked)

  return (
    <article
      className={`flex h-full flex-col rounded-[22px] border transition-colors duration-200 ${
        compact ? 'p-3.5' : 'p-4 sm:p-5'
      } ${
        locked
          ? 'border-ums-coral/25 bg-gradient-to-b from-[#fff1ef] to-white'
          : 'border-[#e4e8f5] bg-[#f7f8fc] hover:border-ums-accent/30 hover:bg-white'
      }`}
    >
      <div className="mb-2.5 flex items-center justify-between gap-2 sm:mb-3">
        <span
          className={`flex items-center justify-center rounded-2xl border ${
            compact ? 'h-10 w-10' : 'h-11 w-11'
          } ${
            locked
              ? 'border-ums-coral/25 bg-white text-ums-coral'
              : 'border-[#dce3ff] bg-white text-ums-accent'
          }`}
        >
          <Icon className={compact ? 'h-4 w-4' : 'h-5 w-5'} strokeWidth={2} aria-hidden />
        </span>
        <span
          className={`font-display font-black tabular-nums ${compact ? 'text-xs' : 'text-sm'} ${
            locked ? 'text-ums-coral' : 'text-[#c5cce8]'
          }`}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <h3
        className={`mb-1 font-bold leading-snug text-[#111] ${
          compact ? 'text-[13px]' : 'text-sm sm:text-[15px]'
        }`}
      >
        {step.title}
      </h3>
      <p className={`leading-relaxed text-ums-muted ${compact ? 'text-[11px]' : 'text-xs sm:text-sm'}`}>
        {step.desc}
      </p>

      {locked && (
        <span className="mt-2.5 inline-flex w-fit rounded-full bg-ums-coral/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-ums-coral">
          Система жизней
        </span>
      )}
    </article>
  )
}

function MobileSnake() {
  return (
    <ol className="relative mx-auto max-w-md md:hidden">
      <div
        className="pointer-events-none absolute bottom-6 left-1/2 top-6 w-px -translate-x-1/2 bg-gradient-to-b from-ums-accent/30 via-[#dce3ff] to-ums-coral/40"
        aria-hidden
      />

      {HOW_IT_WORKS_STEPS.map((step, i) => {
        const Icon = STEP_ICONS[i] || BookOpenCheck
        const leftSide = i % 2 === 0

        return (
          <li key={step.title} className={`relative ${i > 0 ? 'mt-3' : ''}`}>
            <span
              className={`absolute left-1/2 top-6 z-[1] h-3.5 w-3.5 -translate-x-1/2 rounded-full ring-[5px] ring-white ${
                step.locked ? 'bg-ums-coral' : 'bg-ums-accent'
              }`}
              aria-hidden
            />

            <div className={`flex ${leftSide ? 'justify-start pr-[52%]' : 'justify-end pl-[52%]'}`}>
              <div className="w-full max-w-[15.5rem]">
                <StepCard step={step} index={i} Icon={Icon} compact />
              </div>
            </div>

            {i < HOW_IT_WORKS_STEPS.length - 1 && (
              <svg
                className="pointer-events-none absolute left-1/2 top-[calc(100%-2px)] z-0 h-5 w-16 -translate-x-1/2"
                viewBox="0 0 64 20"
                fill="none"
                aria-hidden
              >
                <path
                  d={leftSide ? 'M32 0 C32 10, 48 10, 48 20' : 'M32 0 C32 10, 16 10, 16 20'}
                  stroke="#dce3ff"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </li>
        )
      })}
    </ol>
  )
}

export default function HowItWorksSection() {
  return (
    <SectionShell id="process" variant="white" className="overflow-hidden">
      <RevealOnScroll>
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-12">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-ums-accent">
            {HOW_IT_WORKS_EYEBROW}
          </p>
          <h2 className="section-heading">
            Как устроена <WaveAccent variant="double">учёба</WaveAccent> каждую неделю
          </h2>
          <p className="section-sub mx-auto">{HOW_IT_WORKS_SUB}</p>
        </div>

        <MobileSnake />

        <ol className="relative mx-auto hidden max-w-5xl gap-3 md:grid md:grid-cols-5">
          <div
            className="pointer-events-none absolute left-[10%] right-[10%] top-[2.25rem] h-px bg-gradient-to-r from-transparent via-[#dce3ff] to-transparent"
            aria-hidden
          />

          {HOW_IT_WORKS_STEPS.map((step, i) => {
            const Icon = STEP_ICONS[i] || BookOpenCheck
            return (
              <li key={step.title} className="relative">
                <StepCard step={step} index={i} Icon={Icon} />
              </li>
            )
          })}
        </ol>
      </RevealOnScroll>
    </SectionShell>
  )
}
