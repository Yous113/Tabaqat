import { connections, people } from './data/lineage'

function App() {
  return (
    <main className="flex min-h-svh items-center justify-center px-6 py-12">
      <div className="w-full max-w-xl">
        <p className="text-sm font-medium tracking-widest text-emerald-800 uppercase">
          An exploration of early Islamic history
        </p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">
          Tabaqat
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-stone-700">
          Explore the lineage and family of the Prophet Muhammad ﷺ and the
          connections between the early generations of Muslims.
        </p>
        <p className="mt-8 border-t border-stone-300 pt-6 text-sm text-stone-600">
          {people.length} people and {connections.length} father-to-child
          connections. The interactive tree is coming next.
        </p>
      </div>
    </main>
  )
}

export default App
