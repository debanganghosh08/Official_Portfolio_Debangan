/**
 * One source of truth for the tab bar, shared by App and Navbar so the two
 * can never drift apart.
 *
 * `label` and `title` are separate on purpose: the nav bar has four siblings
 * competing for a fixed strip and needs a short, specific word, while the
 * section heading has the whole column and can say the full thing.
 */
export const TABS = [
  { id: 'about', label: 'About', title: 'About Me' },
  { id: 'career', label: 'Career', title: 'Career' },
  { id: 'education', label: 'Education', title: 'Education' },
  { id: 'projects', label: 'Projects', title: 'Projects' },
  { id: 'achievements', label: 'Achievements', title: 'Achievements' },
  { id: 'contact', label: 'Contact', title: 'Contact' },
] as const;

export type TabId = (typeof TABS)[number]['id'];
