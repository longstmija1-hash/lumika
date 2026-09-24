'use client'

const SIZES = {
  sm: {
    text: 'text-[0.9rem] tracking-[0.08em]',
  },
  md: {
    text: 'text-[1rem] tracking-[0.1em]',
  },
  lg: {
    text: 'text-[1.15rem] tracking-[0.12em]',
  },
}

const BRAND = 'ЛЮМИКА'

/**
 * Логотип Люмика: спокойная вспышка + аккуратный wordmark.
 *
 * @param {boolean} [link=true] — если false, рендерит span (когда уже обёрнут в Link)
 */
export default function LumikaLogo({
  size = 'md',
  href = '/',
  className = '',
  link = true,
  onClick,
}) {
  const sz = SIZES[size] || SIZES.md

  const content = (
    <>
      <span
        className={`font-display font-bold leading-none text-[#121212] transition-colors duration-200 group-hover:text-ums-accent ${sz.text}`}
      >
        {BRAND}
      </span>
    </>
  )

  const sharedClass =
    `group inline-flex items-center cursor-pointer select-none rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ums-accent/40 focus-visible:ring-offset-2 ${className}`.trim()

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={sharedClass} aria-label="ЛЮМИКА — на главную">
        {content}
      </button>
    )
  }

  if (!link) {
    return <span className={sharedClass}>{content}</span>
  }

  return (
    <a href={href} className={sharedClass} aria-label="ЛЮМИКА — на главную">
      {content}
    </a>
  )
}

/** @deprecated use LumikaLogo */
export const ParallaxLogo = LumikaLogo
