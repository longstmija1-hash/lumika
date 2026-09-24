import SectionPulseEdge from './SectionPulseEdge'
import SectionScallopEdge from './SectionScallopEdge'
import SectionTicketEdge from './SectionTicketEdge'

function edgeFill(variant) {
  if (variant === 'tint') return '#eef1ff'
  if (variant === 'white') return '#ffffff'
  return '#f7f7f7'
}

export default function SectionShell({
  id,
  children,
  className = '',
  variant = 'muted',
  containerClassName = '',
  topEdge,
  bottomEdge,
  overlay,
}) {
  const bg =
    variant === 'white' ? 'bg-white' : variant === 'tint' ? 'bg-ums-tint' : 'bg-ums-bg'

  const fill = edgeFill(variant)

  function renderEdge(edge, position) {
    if (edge === 'scallop') return <SectionScallopEdge key={position} fill={fill} edge={position} />
    if (edge === 'ticket') return <SectionTicketEdge key={position} fill={fill} edge={position} />
    if (edge === 'pulse') return <SectionPulseEdge key={position} fill={fill} edge={position} />
    return null
  }

  return (
    <section
      id={id}
      className={`landing-section relative overflow-x-clip py-8 sm:py-14 md:py-24 px-4 ${bg} ${className}`}
    >
      {renderEdge(topEdge, 'top')}
      {renderEdge(bottomEdge, 'bottom')}

      {overlay && <div className="pointer-events-none absolute inset-0 z-[1]">{overlay}</div>}

      <div className={`relative z-[2] max-w-6xl mx-auto ${containerClassName}`}>{children}</div>
    </section>
  )
}
