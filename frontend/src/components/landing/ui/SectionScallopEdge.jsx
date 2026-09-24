const SCALLOP_PATH =
  'M0,64 L0,36 C80,36 80,12 160,12 C240,12 240,40 320,40 C400,40 400,8 480,8 C560,8 560,36 640,36 C720,36 720,14 800,14 C880,14 880,38 960,38 C1040,38 1040,10 1120,10 C1200,10 1200,34 1280,34 C1360,34 1360,12 1440,12 L1440,64 Z'

export default function SectionScallopEdge({ fill = '#eef1ff', edge = 'top' }) {
  const isTop = edge === 'top'

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 z-[1] h-7 sm:h-9 md:h-11 ${
        isTop ? 'top-0 -translate-y-[calc(100%-1px)]' : 'bottom-0 translate-y-[calc(100%-1px)]'
      }`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={SCALLOP_PATH}
          fill={fill}
          transform={isTop ? undefined : 'scale(1,-1) translate(0,-64)'}
        />
      </svg>
    </div>
  )
}
