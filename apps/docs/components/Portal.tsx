import type { ReactNode } from 'react';

// Base URL of the live enrollment portal. Override via NEXT_PUBLIC_PORTAL_BASE
// if the domain ever changes.
const PORTAL_BASE =
    process.env.NEXT_PUBLIC_PORTAL_BASE ?? 'https://enrollment.mountainsol.org';

export interface PortalProps {
    /** Route on the live portal, e.g. "/admin/classes/management". */
    path: string;
    /** Link text. Defaults to the path. */
    children?: ReactNode;
}

/**
 * Links to a real screen in the live enrollment portal, opening in a new tab so
 * the guide stays put. Usage in MDX (registered globally, no import needed):
 *   <Portal path="/admin/classes/management">Manage Classes</Portal>
 */
export function Portal({ path, children }: PortalProps) {
    return (
        <a
            href={`${PORTAL_BASE}${path}`}
            target="_blank"
            rel="noopener noreferrer"
        >
            {children ?? path}
        </a>
    );
}

export default Portal;
