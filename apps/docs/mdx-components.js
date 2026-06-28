import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs';
import { Shot } from './components/Shot';
import { Portal } from './components/Portal';

const themeComponents = getThemeComponents();

// `Shot` and `Portal` are registered globally so every MDX page can use
// `<Shot slug="..." />` (screenshot placeholder) and
// `<Portal path="/admin/...">…</Portal>` (link to the live portal) without
// a per-file import.
export function useMDXComponents(components) {
    return {
        ...themeComponents,
        Shot,
        Portal,
        ...components,
    };
}
