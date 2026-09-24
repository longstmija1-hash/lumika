/** Soft pulse / life-bar arches — distinct from scallop waves and ticket zigzags */

const VIEW_W = 1440
const VIEW_H = 48
const STEP = 96

function buildPulsePath() {
  let d = `M0,${VIEW_H} L0,28`
  for (let x = 0; x < VIEW_W; x += STEP) {
    const mid = x + STEP / 2
    const end = x + STEP
    d += ` C${x + 18},28 ${mid - 22},6 ${mid},6 C${mid + 22},6 ${end - 18},28 ${end},28`
  }
  d += ` L${VIEW_W},${VIEW_H} Z`
  return d
}

const PULSE_PATH = buildPulsePath()

export default function SectionPulseEdge({ fill = '#eef1ff', edge = 'top' }) {
  const isTop = edge === 'top'

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 z-[1] h-8 sm:h-10 md:h-12 ${
        isTop ? 'top-0 -translate-y-[calc(100%-1px)]' : 'bottom-0 translate-y-[calc(100%-1px)]'
      }`}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="none"
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={PULSE_PATH}
          fill={fill}
          transform={isTop ? undefined : `scale(1,-1) translate(0,-${VIEW_H})`}
        />
      </svg>
    </div>
  )
}
