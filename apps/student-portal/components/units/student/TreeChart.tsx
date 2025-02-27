'use client';
import { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { requestPaths } from '../../../store/paths/pathsSlice';
import { requestUnits } from '../../../store/unit/unitSlice';
import { setStudentId } from '../../../store/student/studentSlice';
import { ProgressSpinner } from 'primereact/progressspinner';

const MtnMedicUnits = [
    'r4X1YxigB3y5vgyuY3HU',
    'VIOIwcg8semiuoZvqrDz',
    '7R0ZvJiL6V1LZWWXaTMB',
    'dW37QdAucaYfRDCcamd4',
    'PtUZKsO1S5RT8jTGepU2',
    'LtpeTP057a4lrAv0uVk0',
    'vLqkFHw4lh0Hhxkhs1Jz',
    'MViHvnge0OghyBwgIU7j',
    'qM5ZYnpRP7EN82cyfHga',
    'S5XcEBn4r1rvSHefGv8e',
    'jQ6gBqnA1OrcvLrP1Bg1',
    'LpY0xbdjBZf9MgjECs57',
    '7t8i3KtPnUvS6ir0k5pj',
    'HHwX56kM8sqwQVAFGEUp',
];

const Colors = {
    locked: '#ade8f4',
    unlocked: '#48cae4',
    complete: '#0077b6',
    text: 'black',
};

// DEFINE SIDEBAR CONTENT AND BEHAVIOR
const sidebarDefault = { header: 'Unit Name', description: 'Unit Description' };
const unitName = sidebarDefault.header;
const unitdescription = sidebarDefault.description;
const sidebarDimensions = {
    width: 400,
    paddingTop: '2rem',
    paddingHoriz: '1rem',
    fontSize: 15,
    headerFontSize: 25,
};

function SmartTreeChart(props: { studentId: string }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setStudentId(props.studentId));
    }, [props.studentId, dispatch]);

    // [x] GET UNITS ARRAY
    // [x] GET STUDENT PROFILE
    // [x] FIND COMPLETED UNITS
    // [X] COMPARE STUDENT UNITS TO PREREQS AND MARK ALL COMPLETED, INCOMPLETE, AND UNAVAILABLE CLASSES
    // [x] SORT INTO HIERARCHY
    // [x] IF LOADING MULTIPLE NODES FOR ANY CATEGORY, GENERATE NEW CATEGORY BRANCH
    // [] ? SHOW ONE NODE DEEP FOR CLASSES THAT ARE NOT AVAILABLE ?

    const paths = useSelector((state: RootState) => state.paths);
    const units = useSelector((state: RootState) => state.units);

    const student = useSelector((state: RootState) => state.student);
    const [completeUnits, setCompleteUnits] = useState([]);
    const [unitName, setUnitName] = useState(sidebarDefault.header);
    const [unitDescription, setUnitDescription] = useState(
        sidebarDefault.description
    );

    function generateNodes() {
        const animatedTreePaths = [];
        const treePaths = [];

        // MERGE DATA FROM PATHS AND UNITS
        paths.forEach((path) => {
            if (path.units === 'none') {
                return;
            }
            let newPath = Object.assign({}, path, {
                status: 'locked',
                children: [],
            });
            newPath.units.forEach((unit: string) => {
                let newUnit = Object.assign(
                    {},
                    units.find((e) => e['URL'] === unit),
                    { status: 'locked' }
                );

                // MARK COMPLETED UNITS
                if (completeUnits.includes(unit)) {
                    if (newPath.status === 'locked') {
                        newPath.status = 'unlocked';
                    }
                    newUnit.status = 'complete';
                } else {
                    // CHECK PREREQUISITES AND UNLOCK UNITS
                    if (
                        newUnit['prereqs'] === 'none' ||
                        !newUnit['prereqs']?.find(
                            (req: string) => !completeUnits.includes(req)
                        )
                    ) {
                        if (newPath.status !== 'locked') {
                            newUnit.status = 'unlocked';
                        }
                    }
                }
                newPath.children.push(newUnit);
            });

            // SORT CATEGORIES
            let categories = [];
            newPath['children'].forEach((unit) => {
                let category = categories.find(
                    (category) => category['name'] === unit['category']
                );
                if (category) {
                    category['children'].push(unit);
                } else {
                    category = {
                        name: unit['category'],
                        children: [unit],
                        status: (() => {
                            if (newPath.status === 'locked') {
                                return 'locked';
                            } else {
                                return 'unlocked';
                            }
                        })(),
                    };
                    categories.push(category);
                }
            });

            // ADD INVISIBLE NODES TO BEND NODES INWARD
            categories.forEach((category, index) => {
                if (category['children'].length === 1) {
                    // OFFSET UP OR DOWN
                    if (index >= categories.length / 2) {
                        category.children.push({
                            status: 'ghost',
                        });
                    } else {
                        category.children.unshift({
                            status: 'ghost',
                        });
                    }
                }
            });

            // CHECK COMPLETION OF CATEGORIES
            categories.forEach((category, index) => {
                if (
                    !category['children'].find(
                        (unit) =>
                            unit.status !== 'complete' &&
                            unit.status !== 'ghost'
                    )
                ) {
                    categories[index].status = 'complete';
                }
            });
            newPath['children'] = categories;

            // ACTIVE PATHS
            if (
                newPath.children.find(
                    (unit: { status: string }) => unit.status === 'complete'
                )
            ) {
                if (
                    !newPath.children.find(
                        (unit: { status: string }) => unit.status !== 'complete'
                    )
                ) {
                    newPath.status = 'complete';
                }
                animatedTreePaths.push(newPath);
                treePaths.push(newPath);
            } else {
                // INACTIVE PATHS
                animatedTreePaths.push(newPath);
                let lockedChildren = [...newPath.children];
                newPath = Object.assign({}, newPath, {
                    children: [],
                    lockedChildren: lockedChildren,
                });
                treePaths.push(newPath);
            }
        });

        const smartTreeData = {
            name: student.name,
            children: treePaths,
        };

        const animatedTreeData = {
            name: student.name,
            children: animatedTreePaths,
        };

        render(animatedTreeData);
    }

    function render(data) {
        // Specify the charts’ dimensions. The height is variable, depending on the layout.
        const width = 1200;
        const marginTop = 20;
        const marginRight = 50;
        const marginBottom = 20;
        const marginLeft = 70;

        // Rows are separated by dx pixels, columns by dy pixels. These names can be counter-intuitive
        // (dx is a height, and dy a width). This because the tree must be viewed with the root at the
        // “bottom”, in the data domain. The width of a column is based on the tree’s height.
        const root = d3.hierarchy(data);
        const dx = 35;
        const dy = (width - marginRight - marginLeft) / (1 + root.height);

        // Define the tree layout and the shape for links.
        const tree = d3.tree().nodeSize([dx, dy]);
        const diagonal = d3
            .linkHorizontal()
            .x((d) => (d as any).y)
            .y((d) => (d as any).x);

        d3.select('.smart-tree-container');
        d3.selectAll('svg').remove();
        // Create the SVG container, a layer for the links and a layer for the nodes.
        const svg = d3
            .select('.smart-tree-container')
            .append('svg')
            .attr('width', width)
            .attr('height', dx)
            .attr('viewBox', [-marginLeft, -marginTop, width, dx])
            .attr(
                'style',
                'max-width: 100%; height: auto; font: 10px sans-serif; user-select: none;'
            );

        const gLink = svg
            .append('g')
            .attr('fill', 'none')
            .attr('stroke', '#555')
            .attr('stroke-width', 12);

        const gNode = svg
            .append('g')
            .attr('cursor', 'pointer')
            .attr('pointer-events', 'all');

        function update(event, source) {
            const duration = event?.altKey ? 2500 : 300; // hold the alt key to slow down the transition
            const nodes = root.descendants().reverse();
            const links = root.links();

            // Compute the new tree layout.
            tree(root);

            let left = root;
            let right = root;
            root.eachBefore((node) => {
                if (node.x < left.x) left = node;
                if (node.x > right.x) right = node;
            });

            const height = right.x - left.x + marginTop + marginBottom;

            const transition = svg
                .transition()
                .duration(duration)
                .attr('height', height)
                .attr('viewBox', [
                    -marginLeft,
                    left.x - marginTop,
                    width,
                    height,
                ] as any)
                .tween(
                    'resize',
                    window.ResizeObserver
                        ? null
                        : () => () => svg.dispatch('toggle')
                );

            // Update the nodes…
            const node = gNode
                .selectAll('g')
                .data(nodes, (d: { id: string }) => d.id);

            // Enter any new nodes at the parent's previous position.
            const nodeEnter = node
                .enter()
                .append('g')
                .attr(
                    'transform',
                    (d) => `translate(${source.y0},${source.x0})`
                )
                .attr('fill-opacity', 0)
                .attr('stroke-opacity', 0)
                .on('click', (event, d) => {
                    d.children = d.children ? null : d['_children'];
                    update(event, d);
                });

            nodeEnter
                .append('circle')
                .attr('r', 15)
                .attr('fill', (d: any) => {
                    switch (d.data.status) {
                        case 'ghost':
                            return '#00000000';
                        case 'locked':
                            return Colors.locked;
                        case 'unlocked':
                            return Colors.unlocked;
                        case 'complete':
                            return Colors.complete;
                        default:
                            return Colors.unlocked;
                    }
                })
                .attr('stroke-width', 10)
                .on('click', (e: any) => {
                    let nodeData = e.target['__data__'].data;
                    if (nodeData.hasOwnProperty('description')) {
                        setUnitName(nodeData['name']);
                        setUnitDescription(nodeData['description']);
                        console.log(nodeData.name);
                    }
                    if (nodeData.status === 'ghost') {
                        return;
                    }
                    d3.selectAll('circle').classed('tree-node-selected', false);
                    d3.select(e.target).classed('tree-node-selected', true);
                });

            nodeEnter
                .append('text')
                .attr('dy', '0.31em')
                .attr('x', (d) => (d['_children'] ? -18 : 18))
                .attr('text-anchor', (d) => (d['_children'] ? 'end' : 'start'))
                .style('fill', (d: any) => {
                    switch (d.data.status) {
                        case 'ghost':
                            return '#00000000';
                        default:
                            return Colors.text;
                    }
                })
                .style('font-weight', '500')
                .style('font-size', 15)
                .text((d) => d.data.name);

            // Transition nodes to their new position.
            const nodeUpdate = node
                .merge(nodeEnter)
                .transition(transition)
                .attr('transform', (d) => `translate(${d.y},${d.x})`)
                .attr('fill-opacity', 1)
                .attr('stroke-opacity', 1);

            // Transition exiting nodes to the parent's new position.
            const nodeExit = node
                .exit()
                .transition(transition)
                .remove()
                .attr('transform', (d) => `translate(${source.y},${source.x})`)
                .attr('fill-opacity', 0)
                .attr('stroke-opacity', 0);

            // Update the links…
            const link = gLink
                .selectAll('path')
                .data(links, (d: { target: { id: string } }) => d.target.id);

            // Enter any new links at the parent's previous position.
            const linkEnter = link
                .enter()
                .append('path')
                .attr('d', (d) => {
                    const o = { x: source.x0, y: source.y0 };
                    return (diagonal as any)({ source: o, target: o });
                })
                .attr('stroke-opacity', (d: any) => {
                    switch (d.target.data.status) {
                        case 'unlocked':
                            return 0.4;
                        case 'locked':
                            return 0.8;
                        case 'completed':
                            return 0.8;
                        default:
                            return 0.8;
                    }
                })
                .style('stroke', (d: any) => {
                    switch (d.target.data.status) {
                        case 'ghost':
                            return '#00000000';
                        case 'locked':
                            return Colors.locked;
                        case 'unlocked':
                            return Colors.unlocked;
                        case 'complete':
                            return Colors.complete;
                        default:
                            return Colors.unlocked;
                    }
                });

            // Transition links to their new position.
            link.merge(linkEnter)
                .transition(transition)
                .attr('d', diagonal as any);

            // Transition exiting nodes to the parent's new position.
            link.exit()
                .transition(transition)
                .remove()
                .attr('d', (d) => {
                    const o = { x: source.x, y: source.y };
                    return (diagonal as any)({ source: o, target: o });
                });

            // Stash the old positions for transition.
            root.eachBefore((d) => {
                d['x0'] = d.x;
                d['y0'] = d.y;
            });
        }

        // Do the first update to the initial configuration of the tree
        root['x0'] = dy / 2;
        root['y0'] = 0;
        root.descendants().forEach((d, i) => {
            // @ts-ignore muatintg id on purpose for now
            d['id'] = i;
            d['_children'] = d.children;
            if (d.data.status) {
                if (d.data.status === 'locked') {
                    d.children = null;
                }
            }
        });

        update(null, root);

        return svg.node();
    }

    /*
    function render(fromData: {
        name: string;
        children: Array<{ name: string; children: Array<{}> }>;
    }) {
        let data = fromData;

        let nodeCount: number = 0;

        data.children.forEach((path) => {
            path.children.forEach((category) => {
                if (Object.hasOwn(category, 'children')) {
                    category['children'].forEach(() => {
                        nodeCount++;
                    });
                } else {
                    nodeCount++;
                }
            });
        });

        const margin = { top: 20, right: 350, bottom: 20, left: 80 };

        const chartHeight = nodeCount * 60 - margin.top - margin.bottom;
        const chartWidth = 1000 - margin.left - margin.right;
        const treemap = d3.tree().size([chartHeight, chartWidth]);
        let nodes = d3.hierarchy(data, (d: any) => d.children);
        nodes = treemap(nodes);

        d3.select('.smart-tree-container');
        d3.selectAll('svg').remove();

        const svg = d3
                .select('.smart-tree-container')
                .append('svg')
                .attr('width', chartWidth + margin.left + margin.right)
                .attr('height', chartHeight + margin.top + margin.bottom),
            g = svg
                .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

        g.selectAll('.link')
            .data(nodes.descendants().slice(1))
            .enter()
            .append('path')
            .attr('class', 'link')
            .style('stroke', (d: any) => {
                switch (d.data.status) {
                    case 'ghost':
                        return '#00000000';
                    case 'unlocked':
                        return '#00aaaa40';
                    case 'complete':
                        return '#00aaaa80';
                    default:
                        return '#00000080';
                }
            })
            .style('fill', 'none')
            .style('stroke-width', '12px')
            .attr(
                'd',
                (d: any) =>
                    ` M ${d.y} , ${d.x} C ${(d.y + d.parent.y) / 2} , ${d.x} ${
                        (d.y + d.parent.y) / 2
                    } , ${d.parent.x} ${d.parent.y} , ${d.parent.x} `
            );

        const node = g
            .selectAll('.node')
            .data(nodes.descendants())
            .enter()
            .append('g')
            .attr(
                'class',
                (d) => 'node' + (d.children ? ' node--internal' : ' node--leaf')
            )
            .attr('transform', (d: any) => `translate( ${d.y} , ${d.x} )`);

        node.append('circle')
            .attr('r', 15)
            .style('cursor', (d: any) => {
                switch (d.data.status) {
                    case 'ghost':
                        return 'default';
                    default:
                        return 'pointer';
                }
            })
            .style('fill', (d: any) => {
                switch (d.data.status) {
                    case 'ghost':
                        return '#00000000';
                    case 'locked':
                        return '#aaaaaa';
                    case 'unlocked':
                        return '#aaffff';
                    case 'complete':
                        return '#00aaaa';
                    default:
                        return '#000000aa';
                }
            })
            .on('click', (e: any) => {
                let nodeData = e.target['__data__'].data;
                if (nodeData.status === 'ghost') {
                    return;
                }
                let path = data.children.find(
                    (path) => path.name === nodeData.name
                );

                data.children = data.children.map((e) => {
                    if (Object.hasOwn(e, 'lockedChildren')) {
                        if (e.name === path.name && e.children.length === 0) {
                            e.children = e['lockedChildren'];
                        } else {
                            e.children = [];
                        }
                    }
                    return e;
                });

                d3.selectAll('circle').classed('tree-node-selected', false);

                d3.select(e.target).classed('tree-node-selected', true);

                render(data);
            });

        node.append('text')
            .attr('dy', '.35em')
            .attr('x', (d) => (d.children ? -15 : 20))
            .attr('y', (d) => (d.children && d.depth !== 0 ? -15 : 0))
            .style('text-anchor', (d) => (d.children ? 'end' : 'start'))
            .style('fill', (d: any) => {
                switch (d.data.status) {
                    case 'ghost':
                        return '#00000000';
                    default:
                        return 'black';
                }
            })
            .style('font-weight', '500')
            .text((d) => d.data.name);
    }
    */

    useEffect(() => {
        console.log('again');
        if (paths.length > 0 && units.length > 0) {
            setCompleteUnits(student['completedUnits']);
            generateNodes();
        } else {
            dispatch(requestPaths());
            dispatch(requestUnits());
        }
        return;
    }, [paths.length, units.length, student, dispatch, generateNodes]);

    return !student.name || !paths.length || !units.length ? (
        <ProgressSpinner></ProgressSpinner>
    ) : (
        <div className="smart-tree-wrapper">
            <h1>{student.name}&apos;s Units</h1>
            {/* <button onClick={() => dispatch(overrideUnits(MtnMedicUnits))}>
                MTN MEDIC ONLY
            </button>
            <button
                onClick={() => {
                    d3.select('.smart-tree-sidebar').style(
                        'transform',
                        'rotateY(180deg)'
                    );
                }}
            >
                FLIP SIDEBAR
            </button> */}
            <div
                style={{
                    display: 'inline-flex',
                }}
            >
                <div className="smart-tree-container"></div>
                <div
                    className="smart-tree-sidebar"
                    style={{
                        border: '2px solid black',
                        paddingLeft: sidebarDimensions.paddingHoriz,
                        paddingBottom: sidebarDimensions.paddingTop,
                        paddingTop: sidebarDimensions.paddingTop,
                        width: sidebarDimensions.width,
                        fontSize: sidebarDimensions.fontSize,
                    }}
                >
                    <h2 className="sidebar-header">{unitName}</h2>
                    <p className="sidebar-description">{unitDescription}</p>
                </div>
            </div>
        </div>
    );
}

export { SmartTreeChart, MtnMedicUnits };
