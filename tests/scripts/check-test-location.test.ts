import { spawnSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { afterEach, beforeEach, expect, test } from 'vitest'

const script = join(import.meta.dirname, '../../scripts/check-test-location.mjs')
let srcDir: string

function addFiles(...paths: string[]) {
  for (const path of paths) {
    mkdirSync(dirname(join(srcDir, path)), { recursive: true })
    writeFileSync(join(srcDir, path), '')
  }
}

function runCheck() {
  return spawnSync(process.execPath, [script, srcDir], { encoding: 'utf8' })
}

beforeEach(() => {
  srcDir = mkdtempSync(join(tmpdir(), 'src-'))
})

afterEach(() => rmSync(srcDir, { recursive: true, force: true }))

test('fails and lists test, spec, and __tests__ files under src', () => {
  addFiles(
    'graph/createLineageGraph.ts',
    'graph/createLineageGraph.test.ts',
    'App.spec.tsx',
    'data/__tests__/lineage.ts',
    'data/testimony.ts',
  )

  const result = runCheck()

  const listed = result.stderr.trim().split('\n').slice(1).map((line) => line.trim())

  expect(result.status).toBe(1)
  expect(listed).toEqual([
    join(srcDir, 'App.spec.tsx'),
    join(srcDir, 'data/__tests__/lineage.ts'),
    join(srcDir, 'graph/createLineageGraph.test.ts'),
  ])
})

test('passes when src holds only source files', () => {
  addFiles('graph/PersonCard.tsx', 'data/testimony.ts')

  expect(runCheck().status).toBe(0)
})
