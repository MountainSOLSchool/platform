import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs';
import { Shot } from './components/Shot';

const themeComponents = getThemeComponents();

// `Shot` is registered globally so every MDX page can drop a screenshot
// placeholder with `<Shot slug="..." caption="..." />` — no per-file import.
export function useMDXComponents(components) {
    return {
        ...themeComponents,
        Shot,
        ...components,
    };
}
