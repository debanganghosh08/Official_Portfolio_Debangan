/**
 * Spring tokens, translated from Apple's damping/response model
 * (Designing Fluid Interfaces, WWDC 2018) into Motion's bounce/duration API.
 *
 *   damping 1.0 (critically damped, no overshoot) -> bounce 0
 *   damping 0.8 (slight overshoot)                -> bounce 0.2
 *
 * Response is not a duration: a spring has no fixed length, its settle time
 * emerges from the parameters. Motion's `duration` is the closest analogue.
 *
 * House rule: default to no overshoot. Reach for bounce only when the gesture
 * that preceded the animation actually carried momentum.
 */
import type { Transition } from 'motion/react';

/** Move / reposition. Apple ships damping 1.0, response 0.4. */
export const springMove: Transition = { type: 'spring', bounce: 0, duration: 0.4 };

/** Same curve, quicker — for small UI that has to feel immediate. */
export const springSnap: Transition = { type: 'spring', bounce: 0, duration: 0.28 };

/** Rotation. Apple ships damping 0.8, response 0.4. */
export const springRotate: Transition = { type: 'spring', bounce: 0.2, duration: 0.4 };

/** Drawer / sheet. Apple ships damping 0.8, response 0.3. */
export const springSheet: Transition = { type: 'spring', bounce: 0.2, duration: 0.3 };

/**
 * The reduced-motion equivalent. Deliberately not "no transition" — reduced
 * motion means a gentler, non-vestibular signal, not the absence of feedback.
 */
export const crossFade: Transition = { duration: 0.16, ease: 'easeOut' };

/** Resolve a transition against the user's motion preference. */
export function motionPref(t: Transition, reduce: boolean | null): Transition {
  return reduce ? crossFade : t;
}
