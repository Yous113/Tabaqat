import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { PersonNode } from './createLineageGraph'

export function PersonCard({ data }: NodeProps<PersonNode>) {
  const { person } = data

  return (
    <article className="flex h-full w-full flex-col items-center justify-center rounded-xl border border-stone-300 bg-white px-3 text-center shadow-sm">
      <Handle type="target" position={Position.Top} isConnectable={false} />
      <p className="text-base leading-6 font-semibold text-stone-900">
        {person.name}
        {person.honorific && <span> {person.honorific}</span>}
      </p>
      {person.aliases && person.aliases.length > 0 && (
        <p className="mt-1 text-sm leading-5 text-stone-600">
          {person.aliases.join(' · ')}
        </p>
      )}
      <Handle type="source" position={Position.Bottom} isConnectable={false} />
    </article>
  )
}
