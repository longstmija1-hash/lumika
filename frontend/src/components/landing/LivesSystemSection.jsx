'use client'

import { Heart, Skull } from 'lucide-react'
import SectionShell from './ui/SectionShell'
import UmsCard from './ui/UmsCard'
import WaveAccent from './ui/WaveAccent'
import {
  LIVES_ROWS,
  LIVES_BODY,
  LIVES_FOOTNOTE,
} from '../../data/landingContent'

function LivesIcon({ count }) {
  if (count === 0) return <Skull className="w-6 h-6 text-[#111]" aria-hidden />
  return (
    <div className="flex gap-0.5">
      {[0, 1, 2].map((i) => (
        <Heart
          key={i}
          className={`w-5 h-5 ${i < count ? 'text-[#111] fill-[#111]/10' : 'text-[#d1d5db]'}`}
          aria-hidden
        />
      ))}
    </div>
  )
}

export default function LivesSystemSection() {
  return (
    <SectionShell id="lives" variant="tint" topEdge="pulse" bottomEdge="pulse">
      <div className="max-w-3xl mx-auto">
        <UmsCard padding="lg" hover={false}>
          <h2 className="section-heading text-2xl md:text-3xl mb-4">
            Дисциплина работает сама. <WaveAccent variant="bounce">Без нервов родителей</WaveAccent>.
          </h2>
          <p className="text-ums-muted mb-6">{LIVES_BODY}</p>
          <div className="space-y-3">
            {LIVES_ROWS.map((row) => (
              <div
                key={row.label}
                className="flex items-start gap-4 p-4 rounded-[20px] bg-[#fafafa] border border-ums-border"
              >
                <LivesIcon count={row.lives} />
                <div>
                  <div className="font-semibold text-[#111] text-sm">{row.label}</div>
                  <div className="text-ums-muted text-xs mt-0.5">{row.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-ums-muted text-sm mt-6 pt-6 border-t border-ums-border">{LIVES_FOOTNOTE}</p>
        </UmsCard>
      </div>
    </SectionShell>
  )
}
