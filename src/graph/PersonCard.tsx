import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { PersonNode } from './createLineageGraph'

const roleAppearances = [
  {
    role: 'prophet',
    cardClassName: 'border-2 border-amber-400 bg-emerald-950 text-white',
  },
  {
    role: 'rashidun-caliph',
    label: 'Rashidun caliph',
    cardClassName: 'border border-amber-600 bg-amber-50 text-amber-950',
    badgeClassName: 'border-amber-300 bg-amber-100 text-amber-900',
  },
]

export function PersonCard({ data }: NodeProps<PersonNode>) {
  const { person } = data
  const appearances = roleAppearances.filter(({ role }) =>
    person.roles?.includes(role),
  )
  const badges = appearances.filter(({ label }) => label !== undefined)
  const cardClassName = appearances[0]?.cardClassName
    ?? 'border border-stone-300 bg-white text-stone-900'

  return (
    <article className={`flex h-full w-full flex-col items-center justify-center rounded-xl px-3 text-center shadow-sm ${cardClassName}`}>
      <Handle type="target" position={Position.Top} isConnectable={false} />
      <p className="text-base leading-6 font-semibold">
        {person.name}
        {person.honorific && <span> {person.honorific}</span>}
      </p>
      {badges.length > 0 && (
        <div className="mt-1 flex flex-wrap justify-center gap-1">
          {badges.map(({ role, label, badgeClassName }) => (
            <span
              key={role}
              className={`rounded-full border px-2 py-0.5 text-xs leading-4 font-medium ${badgeClassName}`}
            >
              {label}
            </span>
          ))}
        </div>
      )}
      {person.aliases && person.aliases.length > 0 && (
        <p className={`mt-1 text-sm leading-5 ${appearances.length > 0 ? 'opacity-80' : 'text-stone-600'}`}>
          {person.aliases.join(' · ')}
        </p>
      )}
      <Handle type="source" position={Position.Bottom} isConnectable={false} />
    </article>
  )
}
