import { Handle, Position, type NodeProps } from '@xyflow/react'
import { motion } from 'motion/react'
import { usePressFeedback } from '../ui/motion'
import type { PersonNode } from './createLineageGraph'
import { formatReign } from './formatReign'
import { periodAppearance } from './periodAppearance'

export function PersonCard({ data }: NodeProps<PersonNode>) {
  const { person, tenures = [], onOpen } = data
  const pressFeedback = usePressFeedback()
  const prophet = person.roles?.includes('prophet')
  const appearance = tenures[0] && periodAppearance[tenures[0].periodId]
  // Abbasid reigns stay in the details panel for now.
  const reigns = tenures.filter(({ periodId }) => periodId !== 'abbasid').flatMap(({ reigns }) => reigns).map(formatReign)
  const color = prophet ? 'border-amber-400 bg-emerald-950 text-white' : appearance?.card ?? 'border-stone-300 bg-[#fffdf8] text-stone-900 contrast-more:border-(--ink)'

  return (
    <article className="relative h-full w-full">
      <Handle type="target" position={Position.Top} isConnectable={false} />
      {/* The surface is pressable, not the article, so handles stay put and edges stay attached. */}
      <motion.button {...pressFeedback} type="button" onClick={() => onOpen?.(person.id)} aria-label={[person.name, ...reigns, 'view details'].join(' — ')}
        className={`nodrag flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl border px-3 py-3 text-center shadow-sm outline-offset-4 hover:brightness-95 focus-visible:outline-2 focus-visible:outline-emerald-700 ${color}`}>
        <span className="text-base leading-6 font-semibold">{person.name}{person.honorific && <span> {person.honorific}</span>}</span>
        {tenures.length > 0 && <span className="flex flex-wrap justify-center gap-1">
          {tenures.map((tenure) => <span key={`${tenure.periodId}:${tenure.status}`} className={`rounded-full border px-2 py-0.5 text-xs leading-4 font-medium ${periodAppearance[tenure.periodId].badge}`}>
            {periodAppearance[tenure.periodId].label} {tenure.status === 'claimant' ? 'claimant' : 'caliph'}
          </span>)}
        </span>}
        {reigns.map((reign) => <span key={reign} className="text-xs leading-4 font-medium">{reign}</span>)}
        {person.aliases?.length ? <span className={`text-sm leading-5 ${prophet ? 'text-white/80' : 'text-stone-600'}`}>{person.aliases.join(' · ')}</span> : null}
      </motion.button>
      <Handle type="source" position={Position.Bottom} isConnectable={false} />
    </article>
  )
}
