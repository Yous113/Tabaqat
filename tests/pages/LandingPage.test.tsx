// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'
import { LandingPage } from '../../src/pages/LandingPage'
import type { PeriodDefinition } from '../../src/data/types'

afterEach(cleanup)

const periods: PeriodDefinition[] = [
  { id: 'rashidun', title: 'Rashidun', description: 'The Rashidun period', focusId: 'abu-bakr', memberIds: [] },
  { id: 'umayyad', title: 'Umayyad', description: 'The Damascus caliphate', focusId: 'muawiyah-ibn-sakhr', memberIds: [] },
  { id: 'abbasid', title: 'Abbasid', description: 'The Baghdad caliphate', focusId: 'abu-al-abbas-ibn-muhammad', memberIds: [] },
]

test('the chooser offers exactly three shareable period links', () => {
  render(<LandingPage periods={periods} />)

  expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Islamic history')
  expect(screen.getAllByRole('link')).toHaveLength(3)
  expect(screen.getByRole('link', { name: 'Explore Rashidun lineage tree' }).getAttribute('href')).toBe('/periods/rashidun')
  expect(screen.getByRole('link', { name: 'Explore Umayyad lineage tree' }).getAttribute('href')).toBe('/periods/umayyad')
  expect(screen.getByRole('link', { name: 'Explore Abbasid lineage tree' }).getAttribute('href')).toBe('/periods/abbasid')
})
