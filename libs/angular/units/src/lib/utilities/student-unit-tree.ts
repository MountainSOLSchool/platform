import type { PathSummary, UnitSummary } from '@sol/ts/firebase/api-types';

/**
 * - `ghost`: an invisible spacer so a lone unit doesn't sit level with its
 *   category and the branch still bends.
 * - `partial`: a path or category with some, not all, units complete.
 */
export type UnitTreeStatus =
    'locked' | 'unlocked' | 'complete' | 'partial' | 'ghost';

export interface UnitTreeNode {
    name: string;
    status: UnitTreeStatus;
    /** Only unit (leaf) nodes have one; selecting them shows the details panel. */
    description?: string;
    children?: Array<UnitTreeNode>;
}

/**
 * Builds the student → path → category → unit tree for the units chart.
 *
 * A path unlocks once any of its units is complete. In an unlocked path, a
 * unit unlocks when all of its prerequisites are complete.
 */
export function buildStudentUnitTree({
    studentName,
    completedUnitIds,
    paths,
    units,
}: {
    studentName: string;
    completedUnitIds: ReadonlyArray<string>;
    paths: ReadonlyArray<PathSummary>;
    units: Readonly<Record<string, UnitSummary>>;
}): UnitTreeNode {
    const completed = new Set(completedUnitIds);

    return {
        name: studentName,
        status: 'unlocked',
        children: paths
            .filter(({ unitIds }) => unitIds.length > 0)
            .map((path) => buildPath(path, units, completed)),
    };
}

function buildPath(
    path: PathSummary,
    units: Readonly<Record<string, UnitSummary>>,
    completed: ReadonlySet<string>
): UnitTreeNode {
    const pathUnits = path.unitIds
        .map((id) => units[id])
        .filter((unit): unit is UnitSummary => !!unit);

    const pathStarted = pathUnits.some(({ id }) => completed.has(id));

    const unitNodes = pathUnits.map(
        (unit): UnitTreeNode & { category: string } => ({
            name: unit.name,
            description: unit.description,
            category: unit.category,
            status: completed.has(unit.id)
                ? 'complete'
                : pathStarted &&
                    unit.prereqUnitIds.every((id) => completed.has(id))
                  ? 'unlocked'
                  : 'locked',
        })
    );

    const categoryNames = [...new Set(unitNodes.map((u) => u.category))];
    const categories = categoryNames.map((categoryName, index) => {
        const children: Array<UnitTreeNode> = unitNodes
            .filter(({ category }) => category === categoryName)
            .map(({ name, description, status }) => ({
                name,
                description,
                status,
            }));

        const completeCount = children.filter(
            ({ status }) => status === 'complete'
        ).length;

        if (children.length === 1) {
            const ghost: UnitTreeNode = { name: '', status: 'ghost' };
            if (index >= categoryNames.length / 2) {
                children.push(ghost);
            } else {
                children.unshift(ghost);
            }
        }

        const status: UnitTreeStatus =
            completeCount === 0
                ? pathStarted
                    ? 'unlocked'
                    : 'locked'
                : completeCount ===
                    children.filter((c) => c.status !== 'ghost').length
                  ? 'complete'
                  : 'partial';

        return { name: categoryName, status, children };
    });

    return {
        name: path.name,
        status: !pathStarted
            ? 'locked'
            : categories.every(({ status }) => status === 'complete')
              ? 'complete'
              : 'partial',
        children: categories,
    };
}
