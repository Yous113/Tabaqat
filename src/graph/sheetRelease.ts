/** How far a released gesture would keep travelling. Apple's exponential decay, at its scroll-like rate. */
function projectMomentum(velocity: number, decelerationRate = 0.998) {
  return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate)
}

/**
 * What a released sheet does. It closes if the drag would come to rest past halfway,
 * so a flick needs little distance and a throw back up cancels a long drag.
 * `distance` is how far down from open the sheet is, in px; `velocity` is in px/s, positive downward.
 */
export function sheetRelease({ distance, velocity, height }: { distance: number; velocity: number; height: number }) {
  return distance + projectMomentum(velocity) > height / 2 ? 'close' : 'spring back'
}
