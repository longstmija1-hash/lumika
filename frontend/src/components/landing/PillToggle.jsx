'use client'

export default function PillToggle({ options, value, onChange, size = 'md' }) {
  const trackPad = size === 'sm' ? 'p-1' : 'p-1.5'
  const btnPad = size === 'sm' ? 'px-3.5 py-2 sm:px-4' : 'px-5 py-2.5'
  const textSize = size === 'sm' ? 'text-xs sm:text-[13px]' : 'text-sm'

  return (
    <div className="flex justify-center">
      <div
        className={`inline-flex items-center rounded-full bg-ums-tint/70 border border-[#dce3ff] ${trackPad}`}
        role="tablist"
      >
        {options.map((opt) => {
          const active = value === opt.id
          const hasShort = Boolean(opt.shortLabel)
          return (
            <button
              key={opt.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange(opt.id)}
              className={`shrink-0 rounded-full ${btnPad} ${textSize} font-semibold leading-none whitespace-nowrap transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ums-accent focus-visible:ring-offset-2 ${
                active
                  ? 'bg-white text-[#111] shadow-[0_1px_3px_rgba(17,17,17,0.08)]'
                  : 'bg-transparent text-ums-muted hover:text-[#111]'
              }`}
            >
              {hasShort ? (
                <>
                  <span className="sm:hidden">{opt.shortLabel}</span>
                  <span className="hidden sm:inline">{opt.label}</span>
                </>
              ) : (
                opt.label
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
