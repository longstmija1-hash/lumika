'use client'

import { useState } from 'react'
import { Check, Gift, Plus } from 'lucide-react'
import { formatPrice } from '../../lib/formatPrice'
import {
  PRICING_HEADING,
  PRICING_SUB,
  PRICING_TRUST_POINTS,
  HONEST_HOUR_UTP,
  SERVICE_LEVELS,
  LESSON_PACKAGES,
  WEBINARS_PRICING,
  COURSES_PRICING,
  TARIFF_MODAL_MAP,
} from '../../data/lessonPackages'

function ServiceLevelCard({ level, selected, onSelect }) {
  const isDark = level.dark

  return (
    <button
      type="button"
      onClick={() => onSelect(level.id)}
      className={`relative w-full text-left rounded-[24px] p-5 sm:p-6 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ums-accent focus-visible:ring-offset-2 ${
        isDark
          ? selected
            ? 'bg-[#111] text-white ring-2 ring-ums-accent shadow-[0_12px_40px_rgba(17,17,17,0.25)]'
            : 'bg-[#111] text-white border border-[#333] hover:ring-1 hover:ring-white/20'
          : selected
            ? 'bg-white border-2 border-ums-accent shadow-[0_8px_32px_rgba(124,145,249,0.18)]'
            : 'bg-white border border-[#ececec] hover:border-ums-accent/40'
      }`}
      aria-pressed={selected}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h3 className={`text-xl sm:text-2xl font-black ${isDark ? 'text-white' : 'text-[#111]'}`}>
            {level.name}
          </h3>
          <span
            className={`inline-block mt-2 px-2.5 py-1 rounded-full text-xs font-bold ${
              isDark ? 'bg-white/15 text-white/90' : 'bg-ums-tint text-ums-accent'
            }`}
          >
            {level.duration}
          </span>
        </div>
        <span
          className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
            selected
              ? isDark
                ? 'border-white bg-white'
                : 'border-ums-accent bg-ums-accent'
              : isDark
                ? 'border-white/40'
                : 'border-[#d1d5db]'
          }`}
          aria-hidden
        >
          {selected && (
            <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#111]' : 'bg-white'}`} />
          )}
        </span>
      </div>

      {level.includesTier && (
        <p className={`text-sm mb-3 ${isDark ? 'text-white/75' : 'text-ums-muted'}`}>
          Всё, что входит в тариф «{level.includesTier}», и ещё:
        </p>
      )}

      <ul className="space-y-2">
        {level.features.map((feature) => (
          <li
            key={feature}
            className={`flex items-start gap-2 text-sm leading-snug ${
              isDark ? 'text-white/85' : 'text-[#374151]'
            }`}
          >
            {level.includesTier ? (
              <Plus
                className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-[#7dffb2]' : 'text-ums-accent'}`}
                aria-hidden
              />
            ) : (
              <Check
                className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-white/70' : 'text-[#111]'}`}
                strokeWidth={2.5}
                aria-hidden
              />
            )}
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <p className={`mt-4 text-xs ${isDark ? 'text-white/50' : 'text-ums-muted'}`}>
        {level.durationNote}
      </p>
    </button>
  )
}

function PackageRow({ pkg, levelName, onSelect, inBonusBlock = false }) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)_minmax(0,1fr)_auto] gap-3 sm:gap-4 items-center px-4 sm:px-6 py-4 sm:py-5 ${
        inBonusBlock ? '' : 'border-b border-[#ececec] last:border-b-0'
      }`}
    >
      <div>
        {pkg.popular && (
          <span className="inline-block mb-1.5 px-2 py-0.5 rounded-md bg-ums-accent text-white text-[10px] font-bold uppercase tracking-wide">
            Популярный
          </span>
        )}
        <div className="font-bold text-[#111] text-base sm:text-lg">
          {pkg.count} {pkg.count === 1 ? 'занятие' : pkg.count < 5 ? 'занятия' : 'занятий'}
        </div>
        {pkg.bonus > 0 && (
          <div className="text-xs text-ums-muted mt-0.5">+{pkg.bonus} в подарок</div>
        )}
      </div>

      <p className="text-sm text-ums-muted leading-snug">{pkg.goal}</p>

      <div>
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-xl sm:text-2xl font-black text-[#111] tracking-tight">
            {formatPrice(pkg.current)} ₽
          </span>
          <span className="text-sm text-[#9ca3af] line-through">{formatPrice(pkg.original)} ₽</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-1">
          <span className="text-xs text-ums-muted">{formatPrice(pkg.perLesson)} ₽ / занятие</span>
          <span className="px-1.5 py-0.5 rounded bg-[#f0f0f0] text-[#111] text-xs font-bold">
            −{pkg.discount}%
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onSelect}
        className={`w-full sm:w-auto shrink-0 px-5 py-2.5 rounded-full text-sm font-bold transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ums-accent focus-visible:ring-offset-2 ${
          pkg.popular
            ? 'bg-ums-accent text-white hover:bg-[#6a7fe8]'
            : 'bg-[#111] text-white hover:bg-[#222]'
        }`}
      >
        Выбрать
      </button>
    </div>
  )
}

export default function PricingMatrixSection({ onOpenModal }) {
  const [serviceLevel, setServiceLevel] = useState('standard')
  const packages = LESSON_PACKAGES[serviceLevel] || []
  const bonusPackages = packages.filter((p) => p.bonusBlock)
  const regularPackages = packages.filter((p) => !p.bonusBlock)

  const handleSelect = (pkg) => {
    const level = SERVICE_LEVELS.find((l) => l.id === serviceLevel)
    onOpenModal?.({
      selectedTariff: TARIFF_MODAL_MAP[serviceLevel] || serviceLevel,
 selectedProgram: `${level?.name}, ${pkg.count} занятий, ${pkg.goal}`,
    })
  }

  return (
    <section id="pricing" className="landing-section py-8 sm:py-16 md:py-24 px-4 bg-[#f7f7f7]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-[1.35rem] sm:text-4xl md:text-[2.75rem] font-black text-[#111] text-center mb-2 sm:mb-4 leading-snug sm:leading-tight font-display tracking-tight uppercase">
          {PRICING_HEADING}
        </h2>
        <p className="text-center text-ums-muted text-[0.95rem] sm:text-base max-w-2xl mx-auto mb-5 sm:mb-8 leading-relaxed">
          {PRICING_SUB}
        </p>

        <ul className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-x-6 sm:gap-y-2 mb-6 sm:mb-8">
          {PRICING_TRUST_POINTS.map((point) => (
            <li key={point} className="flex items-center gap-2 text-sm text-[#374151]">
              <Check className="w-4 h-4 text-ums-accent shrink-0" strokeWidth={2.5} aria-hidden />
              {point}
            </li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ums-accent text-white text-sm font-bold shadow-[0_4px_16px_rgba(124,145,249,0.35)]">
            {HONEST_HOUR_UTP.badge}
          </span>
          <p className="text-sm text-ums-muted text-center max-w-md">{HONEST_HOUR_UTP.short}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-5 mb-8 sm:mb-10">
          {SERVICE_LEVELS.map((level) => (
            <ServiceLevelCard
              key={level.id}
              level={level}
              selected={serviceLevel === level.id}
              onSelect={setServiceLevel}
            />
          ))}
        </div>

        <div className="bg-white border border-[#ececec] rounded-[28px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden mb-5 sm:mb-8">
          <div className="hidden sm:grid sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)_minmax(0,1fr)_auto] gap-4 px-6 py-3 bg-[#fafafa] border-b border-[#ececec] text-xs font-bold uppercase tracking-wide text-ums-muted">
            <span>Пакет</span>
            <span>Цель</span>
            <span>Стоимость</span>
            <span className="sr-only">Действие</span>
          </div>

          {regularPackages.map((pkg) => (
            <PackageRow
              key={pkg.id}
              pkg={pkg}
              levelName={serviceLevel}
              onSelect={() => handleSelect(pkg)}
            />
          ))}
        </div>

        {bonusPackages.length > 0 && (
          <div className="rounded-[28px] border border-[#ffd4c8] bg-gradient-to-br from-[#fff4f0] to-[#ffe8e0] overflow-hidden mb-8 sm:mb-10">
            <div className="flex flex-wrap items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 border-b border-[#ffd4c8]/60 bg-white/40">
              <Gift className="w-5 h-5 text-ums-coral shrink-0" aria-hidden />
              <p className="text-sm font-semibold text-[#111]">
                {bonusPackages[0].giftNote}
              </p>
            </div>
            {bonusPackages.map((pkg) => (
              <PackageRow
                key={pkg.id}
                pkg={pkg}
                levelName={serviceLevel}
                onSelect={() => handleSelect(pkg)}
                inBonusBlock
              />
            ))}
          </div>
        )}

        <p className="text-center text-xs text-ums-muted mb-8 sm:mb-10 max-w-xl mx-auto">
          {HONEST_HOUR_UTP.note}
        </p>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
          <div className="bg-white border border-[#ececec] rounded-[24px] p-5 sm:p-6">
            <h3 className="font-bold text-[#111] mb-3">{WEBINARS_PRICING.title}</h3>
            <div className="rounded-2xl border border-ums-accent/20 bg-gradient-to-r from-ums-tint/80 to-white px-4 py-3.5">
              <p className="text-sm text-ums-muted mb-1">{WEBINARS_PRICING.items[0]?.label}</p>
              <p className="text-xl sm:text-2xl font-black text-ums-accent leading-none">
                {WEBINARS_PRICING.items[0]?.price}
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#ececec] rounded-[24px] p-5 sm:p-6">
            <h3 className="font-bold text-[#111] mb-1">{COURSES_PRICING.title}</h3>
            <p className="text-2xl font-black text-ums-accent mb-2">{COURSES_PRICING.price}</p>
            <p className="text-sm text-ums-muted mb-2">{COURSES_PRICING.note}</p>
            <p className="text-xs text-ums-muted">{COURSES_PRICING.hint}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
