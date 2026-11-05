import { memo, useCallback, useMemo, useRef, useState, type FocusEvent } from 'react'
import { Background, Controls, Panel, ReactFlow, type ReactFlowInstance, type Viewport } from '@xyflow/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { connections, people, periods, tenures } from '../data/lineage'
import type { PeriodDefinition, PeriodId } from '../data/types'
import { createLineageGraph, type PersonNode } from './createLineageGraph'
import { selectPeriodLineage } from './selectPeriodLineage'
import { PersonCard } from './PersonCard'
import { PersonDetails } from './PersonDetails'
import { fitAllView, focusView, revealShift } from './treeView'
import { usePressFeedback } from '../ui/motion'
import { useIsDesktop } from '../ui/useIsDesktop'
import './periodTree.css'

const nodeTypes = { person: PersonCard }
/** Room left at the bottom for the hint and zoom controls when revealing a card, in px. */
const bottomControls = 72

/**
 * The React Flow canvas, memoised apart from the selection: re-rendering it on every
 * selection cost a dropped-frame hitch just as the details surface started to move.
 * `panelWidth` is read when needed, for the same reason.
 */
const TreeCanvas = memo(function TreeCanvas({ period, topInset, onOpen, panelWidth }: {
  period: PeriodDefinition
  topInset: number
  onOpen: (id: string) => void
  panelWidth: () => number
}) {
  const [flow, setFlow] = useState<ReactFlowInstance<PersonNode> | null>(null)
  const graph = useMemo(() => {
    const selected = selectPeriodLineage(people, connections, period)
    const graph = createLineageGraph(selected.people, selected.connections, tenures)
    return { ...graph, nodes: graph.nodes.map((node) => ({ ...node, data: { ...node.data, onOpen } })) }
  }, [period, onOpen])
  const pressFeedback = usePressFeedback()
  const duration = useReducedMotion() ? 0 : 250
  const covered = () => ({ top: topInset, right: panelWidth() })
  /** Where a reveal is still panning to, so a reader tabbing quickly is measured against that. */
  const panningTo = useRef<Viewport | null>(null)

  // Cards can't be tabbed to through React Flow, so its own follow-the-focus never runs.
  // Measured from the graph: the browser has already scrolled the pane to the focused
  // card by now, which React Flow undoes, so the card's on-screen position is about to change.
  function revealFocusedCard({ target, currentTarget }: FocusEvent<HTMLDivElement>) {
    const id = target.closest('.react-flow__node')?.getAttribute('data-id')
    if (!flow || !id || !target.matches(':focus-visible')) return
    const { x, y, zoom } = panningTo.current ?? flow.getViewport()
    const card = flow.getNodesBounds([id])
    const shift = revealShift({
      left: x + card.x * zoom,
      right: x + (card.x + card.width) * zoom,
      top: y + card.y * zoom,
      bottom: y + (card.y + card.height) * zoom,
    }, {
      left: 0,
      right: currentTarget.clientWidth - panelWidth(),
      top: topInset,
      bottom: currentTarget.clientHeight - bottomControls,
    })
    if (!shift) return
    const next = { x: x + shift.x, y: y + shift.y, zoom }
    panningTo.current = next
    void flow.setViewport(next, { duration })
    // Not when the pan resolves: a drag can interrupt it, and then it never does.
    setTimeout(() => { if (panningTo.current === next) panningTo.current = null }, duration)
  }

  return (
    <ReactFlow<PersonNode>
      nodes={graph.nodes} edges={graph.edges} nodeTypes={nodeTypes}
      nodesDraggable={false} nodesConnectable={false} elementsSelectable={false}
      nodesFocusable={false} edgesFocusable={false} edgesReconnectable={false}
      deleteKeyCode={null} onInit={setFlow} fitView fitViewOptions={focusView(period.focusId, { top: topInset, right: 0 })}
      onNodeClick={(_, node) => onOpen(node.id)} onFocus={revealFocusedCard}
      minZoom={0.02} maxZoom={2} panOnDrag zoomOnPinch
    >
      <Background color="#d8d1c1" gap={24} />
      <Controls className="material--thin" position="bottom-left" showFitView={false} showInteractive={false} />
      <Panel position="top-right">
        <div className="period-tree__controls material--thin" role="group" aria-label="Tree view controls">
          <motion.button {...pressFeedback} type="button" disabled={!flow} onClick={() => void flow?.fitView({ ...focusView(period.focusId, covered()), duration })}>Reset view</motion.button>
          <motion.button {...pressFeedback} type="button" disabled={!flow} onClick={() => void flow?.fitView({ ...fitAllView(covered()), duration })}>Fit all</motion.button>
        </div>
      </Panel>
      <Panel position="bottom-center" className="period-tree__hint material--thin type-caption">
        Drag to explore · Pinch to zoom · Tap a person
      </Panel>
    </ReactFlow>
  )
})

/** `topInset` is how much of the top of the tree a floating header covers, in px. */
export function PeriodTree({ periodId, topInset = 0 }: { periodId: PeriodId; topInset?: number }) {
  const period = periods.find(({ id }) => id === periodId)!
  const section = useRef<HTMLElement>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const openPerson = useCallback((id: string) => setSelectedId(id), [])
  const closePerson = useCallback(() => setSelectedId(null), [])
  // Zero on a phone, where the details are a modal sheet rather than a panel beside the tree.
  const panelWidth = useCallback(() => section.current?.querySelector<HTMLElement>('.details-panel')?.offsetWidth ?? 0, [])
  const selectedPerson = selectedId ? people.find(({ id }) => id === selectedId) : undefined
  const panelOpen = useIsDesktop() && selectedPerson !== undefined

  return (
    <section ref={section} aria-label={`${period.title} lineage tree`} data-panel-open={panelOpen ? '' : undefined} className="period-tree relative h-full min-h-0 w-full bg-[var(--parchment)]">
      <TreeCanvas period={period} topInset={topInset} onOpen={openPerson} panelWidth={panelWidth} />
      <AnimatePresence>
        {selectedPerson && <PersonDetails key="details" person={selectedPerson} tenures={tenures.filter(({ personId }) => personId === selectedPerson.id)} onClose={closePerson} onReopen={() => openPerson(selectedPerson.id)} />}
      </AnimatePresence>
    </section>
  )
}
