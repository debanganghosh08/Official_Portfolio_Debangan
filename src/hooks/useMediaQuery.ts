import { useCallback, useSyncExternalStore } from 'react';

/**
 * Subscribe to a media query. Used for layout breakpoints that change
 * component behaviour, not just its styling — where a CSS-only answer
 * would leave JS-driven animation out of sync with the stylesheet.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}
