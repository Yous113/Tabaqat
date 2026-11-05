import type { UserEvent } from '@testing-library/user-event'

// React Flow hides nodes until it can measure them, which jsdom cannot do, and a
// hidden element has no accessible name, so cards are found by their label.
export const card = (name: string) => {
  const button = document.querySelector<HTMLButtonElement>(`.react-flow__node button[aria-label^="${name}"]`)
  if (!button) throw new Error(`No person card for ${name}`)
  return button
}

// Keyboard, because a pointer press on a card reaches d3-zoom, which cannot handle jsdom's events.
export const choose = async (user: UserEvent, name: string) => {
  card(name).focus()
  await user.keyboard('{Enter}')
}
