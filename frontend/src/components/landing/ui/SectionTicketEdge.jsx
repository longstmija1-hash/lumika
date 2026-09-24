/** Ticket perforation edge — zigzag tear, distinct from scallop waves */

const VIEW_W = 1440
const VIEW_H = 24
const TOOTH = 24

function buildTicketPath() {
  let d = `M0,12 L0,0`
  for (let x = TOOTH; x <= VIEW_W; x += TOOTH) {
    d += ` L${x - TOOTH / 2},12 L${x},0`
  }
  d += ` L${VIEW_W},12 L${VIEW_W},${VIEW_H} L0,${VIEW_H} Z`
  return d
}

const TICKET_PATH = buildTicketPath()

export default function SectionTicketEdge({ fill = '#eef1ff', edge = 'top' }) {
  const isTop = edge === 'top'

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 z-[1] h-5 sm:h-6 md:h-7 ${
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
          d={TICKET_PATH}
          fill={fill}
          transform={isTop ? undefined : `scale(1,-1) translate(0,-${VIEW_H})`}
        />
      </svg>
    </div>
  )
}
