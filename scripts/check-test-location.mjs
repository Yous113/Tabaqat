// Fails when test files live under src/. Tests belong in the top-level
// tests/ directory, mirroring src/ (see AGENTS.md).
import { readdirSync } from 'node:fs'
import { join, relative } from 'node:path'

const TEST_FILE_PATTERN = /\.(test|spec)\.[cm]?[jt]sx?$/
const srcDir = process.argv[2] ?? 'src'

const misplaced = readdirSync(srcDir, { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile())
  .map((entry) => join(entry.parentPath, entry.name))
  .filter((path) => {
    const relativePath = relative(srcDir, path)
    return TEST_FILE_PATTERN.test(relativePath) || relativePath.split(/[\\/]/).includes('__tests__')
  })
  .sort()

if (misplaced.length > 0) {
  console.error('Test files must live in tests/, not src/:')
  for (const path of misplaced) console.error(`  ${path}`)
  process.exit(1)
}

console.log(`No test files under ${srcDir}/.`)
