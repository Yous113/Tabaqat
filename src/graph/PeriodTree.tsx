import { useCallback, useMemo, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { Background, Controls, Panel, ReactFlow, type ReactFlowInstance } from '@xyflow/react'
import { connections, people, periods, tenures } from '../data/lineage'
import type { PeriodId } from '../data/types'
import { createLineageGraph, type PersonNode } from './createLineageGraph'
import { selectPeriodLineage } from './selectPeriodLineage'
import { PersonCard } from './PersonCard'
import { PersonDetails } from './PersonDetails'
import './periodTree.css'

const nodeTypes = { person: PersonCard }
const buttonStyle = 'min-h-11 px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:opacity-50'

export function PeriodTree({ periodId }: { periodId: PeriodId }) {
  const period = periods.find(({ id }) => id === periodId)!
  const [flow, setFlow] = useState<ReactFlowInstance<PersonNode> | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const openPerson = useCallback((id: string) => setSelectedId(id), [])
  const closePerson = useCallback(() => setSelectedId(null), [])
  const graph = useMemo(() => {
    const selected = selectPeriodLineage(people, connections, period)
    const graph = createLineageGraph(selected.people, selected.connections, tenures)
    return { ...graph, nodes: graph.nodes.map((node) => ({ ...node, data: { ...node.data, onOpen: openPerson } })) }
  }, [period, openPerson])
  const focusOptions = { nodes: [{ id: period.focusId }], minZoom: 1, maxZoom: 1 }
  const selectedPerson = selectedId ? people.find(({ id }) => id === selectedId) : undefined

  return (
    <section aria-label={`${period.title} lineage tree`} data-details-open={selectedPerson ? '' : undefined} className="period-tree relative h-full min-h-0 w-full bg-[#f7f4ec]">
      <ReactFlow<PersonNode>
        nodes={graph.nodes} edges={graph.edges} nodeTypes={nodeTypes}
        nodesDraggable={false} nodesConnectable={false} elementsSelectable={false}
        nodesFocusable={false} edgesFocusable={false} edgesReconnectable={false}
        deleteKeyCode={null} onInit={setFlow} fitView fitViewOptions={focusOptions}
        onNodeClick={(_, node) => openPerson(node.id)}
        minZoom={0.02} maxZoom={2} panOnDrag zoomOnPinch
      >
        <Background color="#d8d1c1" gap={24} />
        <Controls position="bottom-left" showFitView={false} showInteractive={false} />
        <Panel position="top-right">
          <div className="flex divide-x divide-stone-200 overflow-hidden rounded-xl border border-stone-300 bg-[#fffdf7] shadow-sm" role="group" aria-label="Tree view controls">
            <button type="button" className={buttonStyle} disabled={!flow} onClick={() => void flow?.fitView({ ...focusOptions, duration: 250 })}>Reset view</button>
            <button type="button" className={buttonStyle} disabled={!flow} onClick={() => void flow?.fitView({ padding: 0.2, minZoom: 0.02, maxZoom: 1, duration: 250 })}>Fit all</button>
          </div>
        </Panel>
        <Panel position="bottom-center" className="pointer-events-none mb-5! max-w-[65%] rounded-lg bg-[#fffdf7]/90 px-3 py-2 text-center text-xs text-stone-600">
          Drag to explore · Pinch to zoom · Tap a person
        </Panel>
      </ReactFlow>
      <AnimatePresence>
        {selectedPerson && <PersonDetails key="details" person={selectedPerson} tenures={tenures.filter(({ personId }) => personId === selectedPerson.id)} onClose={closePerson} />}
      </AnimatePresence>
    </section>
  )
}
