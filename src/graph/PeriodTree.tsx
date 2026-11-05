import { useCallback, useMemo, useState } from 'react'
import { Background, Controls, Panel, ReactFlow, type ReactFlowInstance } from '@xyflow/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { connections, people, periods, tenures } from '../data/lineage'
import type { PeriodId } from '../data/types'
import { createLineageGraph, type PersonNode } from './createLineageGraph'
import { selectPeriodLineage } from './selectPeriodLineage'
import { PersonCard } from './PersonCard'
import { PersonDetails } from './PersonDetails'
import { usePressFeedback } from '../ui/motion'
import './periodTree.css'

const nodeTypes = { person: PersonCard }

/** `topInset` is how much of the top of the tree a floating header covers, in px. */
export function PeriodTree({ periodId, topInset = 0 }: { periodId: PeriodId; topInset?: number }) {
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
  const pressFeedback = usePressFeedback()
  const duration = useReducedMotion() ? 0 : 250
  const clearOfHeader = `${topInset + 16}px` as const
  const focusOptions = { nodes: [{ id: period.focusId }], minZoom: 1, maxZoom: 1, padding: { top: clearOfHeader } }
  const fitAllOptions = { minZoom: 0.02, maxZoom: 1, padding: { top: clearOfHeader, x: '5%', bottom: '15%' } } as const
  const selectedPerson = selectedId ? people.find(({ id }) => id === selectedId) : undefined

  return (
    <section aria-label={`${period.title} lineage tree`} data-details-open={selectedPerson ? '' : undefined} className="period-tree relative h-full min-h-0 w-full bg-[var(--parchment)]">
      <ReactFlow<PersonNode>
        nodes={graph.nodes} edges={graph.edges} nodeTypes={nodeTypes}
        nodesDraggable={false} nodesConnectable={false} elementsSelectable={false}
        nodesFocusable={false} edgesFocusable={false} edgesReconnectable={false}
        deleteKeyCode={null} onInit={setFlow} fitView fitViewOptions={focusOptions}
        onNodeClick={(_, node) => openPerson(node.id)}
        minZoom={0.02} maxZoom={2} panOnDrag zoomOnPinch
      >
        <Background color="#d8d1c1" gap={24} />
        <Controls className="material--thin" position="bottom-left" showFitView={false} showInteractive={false} />
        <Panel position="top-right">
          <div className="period-tree__controls material--thin" role="group" aria-label="Tree view controls">
            <motion.button {...pressFeedback} type="button" disabled={!flow} onClick={() => void flow?.fitView({ ...focusOptions, duration })}>Reset view</motion.button>
            <motion.button {...pressFeedback} type="button" disabled={!flow} onClick={() => void flow?.fitView({ ...fitAllOptions, duration })}>Fit all</motion.button>
          </div>
        </Panel>
        <Panel position="bottom-center" className="period-tree__hint material--thin type-caption">
          Drag to explore · Pinch to zoom · Tap a person
        </Panel>
      </ReactFlow>
      <AnimatePresence>
        {selectedPerson && <PersonDetails key="details" person={selectedPerson} tenures={tenures.filter(({ personId }) => personId === selectedPerson.id)} onClose={closePerson} />}
      </AnimatePresence>
    </section>
  )
}
