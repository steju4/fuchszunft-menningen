import { createLucideIcon } from 'lucide-react';

// Bisherige SVG-Formen aus lucide-react 1.24.0 beibehalten.
// Die Komponenten selbst verwenden weiterhin die aktuelle Lucide-Version.
// Lizenz und Urheberhinweise: ZunftIcons.LICENSE.
export const Calendar = createLucideIcon({
  name: 'calendar',
  size: 24,
  node: [
    ['path', { d: 'M8 2v4', key: '1cmpym' }],
    ['path', { d: 'M16 2v4', key: '4m81vk' }],
    ['rect', { width: '18', height: '18', x: '3', y: '4', rx: '2', key: '1hopcy' }],
    ['path', { d: 'M3 10h18', key: '8toen8' }],
  ],
});

export const BookOpen = createLucideIcon({
  name: 'book-open',
  size: 24,
  node: [
    ['path', { d: 'M12 7v14', key: '1akyts' }],
    ['path', {
      d: 'M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z',
      key: 'ruj8y',
    }],
  ],
});

export const Music = createLucideIcon({
  name: 'music',
  size: 24,
  node: [
    ['path', { d: 'M9 18V5l12-2v13', key: '1jmyc2' }],
    ['circle', { cx: '6', cy: '18', r: '3', key: 'fqmcym' }],
    ['circle', { cx: '18', cy: '16', r: '3', key: '1hluhg' }],
  ],
});
