import { expect, test } from 'vitest'
import { resolveRoute } from '../src/navigation'

test('a shared period URL opens the named period', () => {
  expect(resolveRoute('/periods/abbasid')).toEqual({ kind: 'period', periodId: 'abbasid' })
})

test('the root URL opens the period chooser', () => {
  expect(resolveRoute('/')).toEqual({ kind: 'home' })
})
