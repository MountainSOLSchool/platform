import fs from 'node:fs';
import path from 'node:path';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

// Resolve /public/screenshots regardless of whether the build runs with cwd at
// the workspace root or the app root (both happen across Nx / Next invocations).
function screenshotExists(slug: string): boolean {
    const candidates = [
        path.join(process.cwd(), 'apps/docs/public/screenshots', `${slug}.png`),
        path.join(process.cwd(), 'public/screenshots', `${slug}.png`),
    ];
    return candidates.some((p) => fs.existsSync(p));
}

export interface ShotProps {
    /**
     * Stable slug for this screenshot. The docs-screenshots automation (#258)
     * writes `public/screenshots/<slug>.png`; once it exists this component
     * renders the image in place of the placeholder — no prose changes needed.
     */
    slug: string;
    /** Caption shown under the image and inside the pending placeholder. */
    caption?: string;
}

export function Shot({ slug, caption }: ShotProps) {
    if (screenshotExists(slug)) {
        return (
            <figure className="sol-shot">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={`${BASE_PATH}/screenshots/${slug}.png`}
                    alt={caption ?? slug}
                />
                {caption ? <figcaption>{caption}</figcaption> : null}
            </figure>
        );
    }
    return (
        <aside
            className="sol-shot sol-shot--pending"
            data-shot={slug}
            role="note"
        >
            <strong>📷 Screenshot pending</strong>
            <span>{caption ?? slug}</span>
            <code>{slug}</code>
        </aside>
    );
}

export default Shot;
