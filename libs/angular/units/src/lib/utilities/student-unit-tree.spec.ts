import type { PathSummary, UnitSummary } from '@sol/ts/firebase/api-types';
import { buildStudentUnitTree, type UnitTreeNode } from './student-unit-tree';

const unit = (
    id: string,
    category: string,
    prereqUnitIds: Array<string> = []
): UnitSummary => ({
    id,
    name: `Unit ${id}`,
    description: `About ${id}`,
    category,
    isRepeatable: false,
    prereqUnitIds,
});

const path = (id: string, unitIds: Array<string>): PathSummary => ({
    id,
    name: `Path ${id}`,
    description: '',
    unitIds,
    electives: [],
});

const units = Object.fromEntries(
    [
        unit('a', 'Fire'),
        unit('b', 'Fire', ['a']),
        unit('c', 'Water'),
        unit('d', 'Water', ['c']),
    ].map((u) => [u.id, u])
);

function build(
    completedUnitIds: Array<string>,
    paths = [path('p', ['a', 'b', 'c', 'd'])]
) {
    return buildStudentUnitTree({
        studentName: 'Robin',
        completedUnitIds,
        paths,
        units,
    });
}

const statuses = (node: UnitTreeNode | undefined) =>
    node?.children?.map(({ name, status }) => `${name}:${status}`);

describe('buildStudentUnitTree', () => {
    it('puts the student at the root', () => {
        expect(build([]).name).toBe('Robin');
    });

    it('locks a path and everything in it when no unit is complete', () => {
        const [p] = build([]).children ?? [];

        expect(p.status).toBe('locked');
        expect(statuses(p)).toEqual(['Fire:locked', 'Water:locked']);
        expect(statuses(p.children?.[0])).toEqual([
            'Unit a:locked',
            'Unit b:locked',
        ]);
    });

    it('unlocks units whose prerequisites are complete once the path is started', () => {
        const [p] = build(['a']).children ?? [];
        const [fire, water] = p.children ?? [];

        expect(p.status).toBe('partial');
        expect(fire.status).toBe('partial');
        expect(statuses(fire)).toEqual(['Unit a:complete', 'Unit b:unlocked']);
        expect(water.status).toBe('unlocked');
        expect(statuses(water)).toEqual(['Unit c:unlocked', 'Unit d:locked']);
    });

    it('does not depend on where the first completed unit sits in the path', () => {
        const [p] = build(['d', 'c']).children ?? [];
        const [fire, water] = p.children ?? [];

        expect(statuses(fire)).toEqual(['Unit a:unlocked', 'Unit b:locked']);
        expect(water.status).toBe('complete');
    });

    it('marks a path complete when every category is complete', () => {
        const [p] = build(['a', 'b', 'c', 'd']).children ?? [];

        expect(p.status).toBe('complete');
    });

    it('pads a lone unit with a ghost so its branch bends toward the middle', () => {
        const [p] = build(['a'], [path('p', ['a', 'c', 'd'])]).children ?? [];
        const [fire, water] = p.children ?? [];

        expect(statuses(fire)).toEqual([':ghost', 'Unit a:complete']);
        expect(fire.status).toBe('complete');
        expect(water.children).toHaveLength(2);
    });

    it('puts the ghost after a lone unit in the lower half of the categories', () => {
        const [p] = build([], [path('p', ['a', 'b', 'c'])]).children ?? [];
        const [, water] = p.children ?? [];

        expect(statuses(water)).toEqual(['Unit c:locked', ':ghost']);
    });

    it('skips empty paths and units that no longer exist', () => {
        const tree = build([], [path('empty', []), path('p', ['a', 'gone'])]);

        expect(statuses(tree)).toEqual(['Path p:locked']);
        expect(tree.children?.[0].children?.[0].children).toHaveLength(2);
    });

    it('carries unit descriptions for the details panel', () => {
        const [p] = build(['a']).children ?? [];

        expect(p.children?.[0].children?.[0].description).toBe('About a');
    });
});
