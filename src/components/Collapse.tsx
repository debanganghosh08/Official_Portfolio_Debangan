import type { ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { crossFade, springSheet } from '../lib/motion';

interface CollapseProps {
  open: boolean;
  children: ReactNode;
  className?: string;
}

/**
 * A height reveal driven by a spring rather than a fixed-duration max-height
 * transition.
 *
 * Two reasons the spring is the right tool here. A scripted transition cannot
 * be grabbed and reversed mid-flight — toggling twice in quick succession makes
 * it finish the first pass before acknowledging the second — whereas a spring
 * always animates from wherever the element currently is on screen. And a
 * hard-coded max-height has to guess the content's tallest possible size, which
 * silently clips the moment the content grows.
 */
export const Collapse: React.FC<CollapseProps> = ({ open, children, className }) => {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          className={className}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={reduceMotion ? crossFade : springSheet}
          style={{ overflow: 'hidden' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
