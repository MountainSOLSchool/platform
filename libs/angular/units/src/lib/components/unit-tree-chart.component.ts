import {
    afterRenderEffect,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    input,
    output,
    viewChild,
    ViewEncapsulation,
} from '@angular/core';
import * as d3 from 'd3';
import type { UnitTreeNode } from '../utilities/student-unit-tree';

export interface SelectedUnit {
    name: string;
    description: string;
}

type ChartNode = d3.HierarchyPointNode<UnitTreeNode> & {
    key?: number;
    x0?: number;
    y0?: number;
    collapsedChildren?: Array<ChartNode>;
};

// Layout units: the SVG scales to fit via its viewBox.
const WIDTH = 1200;
const MARGIN = { top: 20, right: 50, bottom: 20, left: 70 };
const ROW_HEIGHT = 35;

@Component({
    selector: 'sol-unit-tree-chart',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    // d3 creates the SVG at runtime, so its elements never get Angular's
    // scoping attribute. Selectors are prefixed with the host tag instead.
    encapsulation: ViewEncapsulation.None,
    styles: [
        `
            sol-unit-tree-chart {
                display: block;
                overflow-x: auto;
                --unit-locked: #ade8f4;
                --unit-unlocked: #48cae4;
                --unit-complete: #0077b6;
                --unit-blend: #2c9dc9;
            }
            sol-unit-tree-chart svg {
                display: block;
                width: 100%;
                height: auto;
                font: 500 15px sans-serif;
                user-select: none;
            }
            @media (max-width: 767px) {
                sol-unit-tree-chart svg {
                    /* Keeps labels readable; the chart scrolls sideways. */
                    min-width: 960px;
                }
            }
            sol-unit-tree-chart .node {
                cursor: pointer;
            }
            sol-unit-tree-chart .node circle {
                stroke-width: 1px;
                stroke: var(--sol-primary, #006633);
                transition: fill 200ms;
            }
            sol-unit-tree-chart .node text {
                fill: var(--sol-on-surface, #111);
            }
            sol-unit-tree-chart .locked circle {
                fill: var(--unit-locked);
            }
            sol-unit-tree-chart .unlocked circle {
                fill: var(--unit-unlocked);
            }
            sol-unit-tree-chart .complete circle {
                fill: var(--unit-complete);
            }
            sol-unit-tree-chart .partial circle {
                fill: url(#partial-gradient);
            }
            sol-unit-tree-chart .node.selected circle {
                fill: var(--sol-primary, #006633);
            }
            sol-unit-tree-chart .ghost {
                visibility: hidden;
                pointer-events: none;
            }
            sol-unit-tree-chart .link {
                fill: none;
                stroke-width: 12px;
                stroke-opacity: 0.8;
                stroke: var(--unit-unlocked);
            }
            sol-unit-tree-chart .link.locked {
                stroke: var(--unit-locked);
            }
            sol-unit-tree-chart .link.unlocked {
                stroke-opacity: 0.4;
            }
            sol-unit-tree-chart .link.complete {
                stroke: var(--unit-complete);
            }
            sol-unit-tree-chart .link.ghost {
                stroke-opacity: 0;
            }
        `,
    ],
    template: `<div #chart></div>`,
})
export class UnitTreeChartComponent {
    readonly tree = input.required<UnitTreeNode>();
    readonly unitSelect = output<SelectedUnit>();

    private readonly chart =
        viewChild.required<ElementRef<HTMLElement>>('chart');

    constructor() {
        afterRenderEffect(() =>
            this.#render(this.chart().nativeElement, this.tree())
        );
    }

    #render(container: HTMLElement, data: UnitTreeNode) {
        const root = d3.hierarchy(data) as ChartNode;
        const columnWidth =
            (WIDTH - MARGIN.right - MARGIN.left) / (1 + root.height);
        const layout = d3
            .tree<UnitTreeNode>()
            .nodeSize([ROW_HEIGHT, columnWidth]);
        // The tree reads root-at-left, so d3's x is the vertical axis.
        const diagonal = d3
            .linkHorizontal<unknown, { x: number; y: number }>()
            .x((d) => d.y)
            .y((d) => d.x);

        d3.select(container).selectAll('svg').remove();
        const svg = d3
            .select(container)
            .append('svg')
            .attr(
                'viewBox',
                [-MARGIN.left, -MARGIN.top, WIDTH, ROW_HEIGHT].join(' ')
            );

        const gradient = svg
            .append('defs')
            .append('linearGradient')
            .attr('id', 'partial-gradient')
            .attr('x1', '0%')
            .attr('y1', '0%')
            .attr('x2', '100%')
            .attr('y2', '100%');
        (
            [
                ['0%', '--unit-complete'],
                ['30%', '--unit-complete'],
                ['50%', '--unit-blend'],
                ['70%', '--unit-unlocked'],
                ['100%', '--unit-unlocked'],
            ] as const
        ).forEach(([offset, color]) =>
            gradient
                .append('stop')
                .attr('offset', offset)
                .style('stop-color', `var(${color})`)
        );

        const gLink = svg.append('g');
        const gNode = svg.append('g');

        const update = (source: ChartNode) => {
            layout(root);
            const nodes = root.descendants().reverse() as Array<ChartNode>;
            const links = root.links() as Array<
                d3.HierarchyPointLink<UnitTreeNode>
            >;

            let top = root;
            let bottom = root;
            root.eachBefore((node) => {
                if (node.x < top.x) top = node;
                if (node.x > bottom.x) bottom = node;
            });
            const height = bottom.x - top.x + MARGIN.top + MARGIN.bottom;
            const from = { x: source.x0 ?? 0, y: source.y0 ?? 0 };
            const to = { x: source.x, y: source.y };

            const transition = d3.transition().duration(300);
            svg.transition(transition).attr(
                'viewBox',
                [-MARGIN.left, top.x - MARGIN.top, WIDTH, height].join(' ')
            );

            const node = gNode
                .selectAll<SVGGElement, ChartNode>('g')
                .data(nodes, (d) => d.key ?? 0);

            const nodeEnter = node
                .enter()
                .append('g')
                .attr('class', (d) => `node ${d.data.status}`)
                .attr('transform', `translate(${from.y},${from.x})`)
                .attr('fill-opacity', 0)
                .on('click', (event: MouseEvent, d) => {
                    if (d.data.status === 'ghost') return;
                    gNode.selectAll('.node').classed('selected', false);
                    d3.select(event.currentTarget as SVGGElement).classed(
                        'selected',
                        true
                    );
                    if (d.data.description !== undefined) {
                        this.unitSelect.emit({
                            name: d.data.name,
                            description: d.data.description,
                        });
                    }
                    d.children = d.children ? undefined : d.collapsedChildren;
                    update(d);
                });

            nodeEnter.append('title').text((d) => d.data.name);
            nodeEnter.append('circle').attr('r', 15);
            nodeEnter
                .append('text')
                .attr('dy', '0.31em')
                .attr('x', (d) => (d.collapsedChildren ? -18 : 18))
                .attr('text-anchor', (d) =>
                    d.collapsedChildren ? 'end' : 'start'
                )
                .text((d) => d.data.name);

            node.merge(nodeEnter)
                .transition(transition)
                .attr('transform', (d) => `translate(${d.y},${d.x})`)
                .attr('fill-opacity', 1);

            node.exit()
                .transition(transition)
                .remove()
                .attr('transform', `translate(${to.y},${to.x})`)
                .attr('fill-opacity', 0);

            const link = gLink
                .selectAll<SVGPathElement, d3.HierarchyPointLink<UnitTreeNode>>(
                    'path'
                )
                .data(links, (d) => (d.target as ChartNode).key ?? 0);

            const linkEnter = link
                .enter()
                .append('path')
                .attr('class', (d) => `link ${d.target.data.status}`)
                .attr('d', () => diagonal({ source: from, target: from }));

            link.merge(linkEnter)
                .transition(transition)
                .attr('d', (d) => diagonal(d));

            link.exit()
                .transition(transition)
                .remove()
                .attr('d', () => diagonal({ source: to, target: to }));

            root.eachBefore((d: ChartNode) => {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        };

        root.x0 = columnWidth / 2;
        root.y0 = 0;
        (root.descendants() as Array<ChartNode>).forEach((d, i) => {
            d.key = i;
            d.collapsedChildren = d.children;
            if (d.data.status === 'locked') {
                d.children = undefined;
            }
        });

        update(root);
    }
}
