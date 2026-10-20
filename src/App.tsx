import { useState } from 'react'
import {
  Background,
  Controls,
  Panel,
  ReactFlow,
  type ReactFlowInstance,
} from '@xyflow/react'
import { connections, people } from './data/lineage'
import { createLineageGraph, type PersonNode } from './graph/createLineageGraph'
import { PersonCard } from './graph/PersonCard'

const { nodes, edges } = createLineageGraph(people, connections)
const nodeTypes = { person: PersonCard }
const focusOptions = {
  nodes: [{ id: 'muhammad-ibn-abdullah' }],
  minZoom: 1,
  maxZoom: 1,
}
const viewButtonClassName =
  'min-h-11 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:opacity-50'

function App() {
  const [flow, setFlow] = useState<ReactFlowInstance<PersonNode> | null>(null)

  return (
    <main className="flex h-svh flex-col">
      <header className="border-b border-stone-200 bg-white px-6 py-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          Tabaqat
        </h1>
        <p className="mt-1 text-sm text-stone-600">
          {people.length} people and {connections.length} father-to-child
          connections. Drag the canvas to explore; scroll or pinch to zoom.
        </p>
      </header>
      <section className="min-h-0 flex-1" aria-label="Lineage tree">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          nodesFocusable={false}
          edgesFocusable={false}
          edgesReconnectable={false}
          deleteKeyCode={null}
          onInit={setFlow}
          fitView
          fitViewOptions={focusOptions}
          minZoom={0.02}
          maxZoom={2}
        >
          <Background color="#d6d3d1" gap={24} />
          <Controls showFitView={false} showInteractive={false} />
          <Panel position="top-right">
            <div
              className="flex divide-x divide-stone-200 rounded-lg border border-stone-300 bg-white shadow-sm"
              role="group"
              aria-label="Tree view controls"
            >
              <button
                type="button"
                className={viewButtonClassName}
                disabled={!flow}
                onClick={() => void flow?.fitView({ ...focusOptions, duration: 300 })}
              >
                Reset view
              </button>
              <button
                type="button"
                className={viewButtonClassName}
                disabled={!flow}
                onClick={() => void flow?.fitView({
                  padding: 0.2,
                  minZoom: 0.02,
                  maxZoom: 1,
                  duration: 300,
                })}
              >
                Fit all
              </button>
            </div>
          </Panel>
        </ReactFlow>
      </section>
    </main>
  )
}

export default App
