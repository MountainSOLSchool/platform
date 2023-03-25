/* eslint-disable prettier/prettier */

import { useEffect } from "react";
import * as d3 from 'd3';



const colors = {
    selected0: '#00aa55',
    selected1: '#005555',
    completed0: '#00aaaa',
    completed1: '#00aaaa',

}

const units = [
    {
        "name": 'Surthrival 1.1: Personal and group safety',
        "URL": "r4X1YxigB3y5vgyuY3HU",
        "category": "Surthrival"
    },
    {
        "name": "Surthrival 1.2: Deescalation",
        "URL": "VIOIwcg8semiuoZvqrDz",
        "category": "Surthrival"
    },
    {
        "name": "Surthrival 1.3: Knife Safety",
        "URL": "7R0ZvJiL6V1LZWWXaTMB",
        "category": "Surthrival"
    },
    {
        "name": "Medic 1.1: Basic first aid I",
        "URL": "dW37QdAucaYfRDCcamd4",
        "category": "Medic"
    },
    {
        "name": "Medic 1.2: Basic first aid II",
        "URL": "PtUZKsO1S5RT8jTGepU2",
        "category": "Medic"
    },
    {
        "name": "Navigation 1.1 Intro to the map and compass",
        "URL": "LtpeTP057a4lrAv0uVk0",
        "category": "Navigation"
    },
    {
        "name": "Navigation 1.2: Off-trail navigation",
        "URL": "vLqkFHw4lh0Hhxkhs1Jz",
        "category": "Navigation"
    },
    {
        "name": "Fire 1: Basic firebuilding",
        "URL": "MViHvnge0OghyBwgIU7j",
        "category": "Fire"
    },
    {
        "name": "Fire 2.3: Cookfires",
        "URL": "qM5ZYnpRP7EN82cyfHga",
        "category": "Fire"
    },
    {
        "name": "Food 1.1: Intro to foraging and water",
        "URL": "S5XcEBn4r1rvSHefGv8e",
        "category": "Food"
    },
    {
        "name": "Shelter 1.1: Basic tarpology",
        "URL": "jQ6gBqnA1OrcvLrP1Bg1",
        "category": "Food"
    },
    {
        "name": "Herbalism 1.1: Practical herbalism",
        "URL": "LpY0xbdjBZf9MgjECs57",
        "category": "Herbalism"
    },
    {
        "name": "Community 1.1: Diversity and support systems",
        "URL": "7t8i3KtPnUvS6ir0k5pj",
        "category": "Community"
    },
    {
        "name": "Community elective - give back, help build SOL",
        "URL": "HHwX56kM8sqwQVAFGEUp",
        "category": "Community"
    }
]

function SmartTreeChart() {

    // [x] GET UNITS ARRAY
    // [x] GET STUDENT PROFILE
    // [x] FIND COMPLETED UNITS
    // [] COMPARE STUDENT UNITS TO PREREQS AND MARK ALL COMPLETED, INCOMPLETE, AND UNAVAILABLE CLASSES
    // [x] SORT INTO HIERARCHY
    // [x] IF LOADING MULTIPLE NODES FOR ANY CATEGORY, GENERATE NEW CATEGORY BRANCH
    // [] ? SHOW ONE NODE DEEP FOR CLASSES THAT ARE NOT AVAILABLE ?

    const studentName = "Student"

    const paths = [
        {
            "path": "IJ9LKndreKUve8D9LMXk",
            "name": "Scout",
            "units": [
                "hoDupoWZ6o425JCmMWqb", "LYh80lrjwoiFlRLlCtap", "kMDpEfLwCLZRieOu4T7X", "auOoXOqZVJaVIRia7hUW"

            ]
        },
        {
            "path": "U2CcmKVLlpNt90roUJbN",
            "name": "Herbalism",
            "units": []
        },
        {
            "path": "fynDmaqEwBm9gGBmPEQR",
            "name": "Lobo",
            "units": []
        },
        {
            "path": "gVO0nWEW0W0OFVZjPv7R",
            "name": "Medic",
            "units": []
        },
        {
            "path": "pRtteXyBRFO4P8c2vYIY",
            "name": "Mountain Medic",
            "units": [
                "r4X1YxigB3y5vgyuY3HU", "VIOIwcg8semiuoZvqrDz", "7R0ZvJiL6V1LZWWXaTMB", "dW37QdAucaYfRDCcamd4",
                "PtUZKsO1S5RT8jTGepU2", "LtpeTP057a4lrAv0uVk0", "vLqkFHw4lh0Hhxkhs1Jz", "MViHvnge0OghyBwgIU7j",
                "qM5ZYnpRP7EN82cyfHga", "S5XcEBn4r1rvSHefGv8e", "jQ6gBqnA1OrcvLrP1Bg1", "LpY0xbdjBZf9MgjECs57",
                "7t8i3KtPnUvS6ir0k5pj", "HHwX56kM8sqwQVAFGEUp"
            ]
        },
        {
            "path": "vbjJV4lLEY20danVPzza",
            "name": "Provider",
            "units": []
        }
    ]

    const completeUnits = [
        "r4X1YxigB3y5vgyuY3HU", "VIOIwcg8semiuoZvqrDz", "7R0ZvJiL6V1LZWWXaTMB", "dW37QdAucaYfRDCcamd4",
        "PtUZKsO1S5RT8jTGepU2", "LtpeTP057a4lrAv0uVk0", "vLqkFHw4lh0Hhxkhs1Jz", "MViHvnge0OghyBwgIU7j",
        "qM5ZYnpRP7EN82cyfHga", "S5XcEBn4r1rvSHefGv8e", "jQ6gBqnA1OrcvLrP1Bg1", "LpY0xbdjBZf9MgjECs57",
        "7t8i3KtPnUvS6ir0k5pj", "HHwX56kM8sqwQVAFGEUp"
    ];

    const treeUnits: Array<{ name: string, URL: string, category: string }> = [];
    completeUnits.forEach(URL => {
        let unit = units.find(unit => unit["URL"] === URL)
        treeUnits.push(unit)
    }
    );

    const treePaths: Array<{ name: string; children: any[] }> = [];

    paths.forEach(path => {
        completeUnits.forEach(URL => {
            if (path['units'].includes(URL)) {
                let unit = treeUnits.find(unit => unit["URL"] === URL);
                let treePath = treePaths.find(treePath => treePath["name"] === path["name"]);
                if (treePath !== undefined) {
                    treePath['children'].push(unit)
                }
                else {
                    let newPath = {
                        'name': path['name'],
                        'children': [unit]
                    }
                    treePaths.push(newPath)
                }
            }
        });

        let treePath = treePaths.find(treePath => treePath["name"] === path["name"])
        if (treePath === undefined) { return }

        let categories = [];
        treePath["children"].forEach(unit => {
            let category = categories.find(category => category['name'] === unit['category'])
            if (category) {
                category['children'].push(unit)
            }
            else {
                category = Object.assign({}, {
                    name: unit['category'],
                    children: [unit]
                })
                categories.push(category)
            }
        })
        categories.forEach((category, index) => {
            if (category['children'].length === 1) {
                console.log("unpacking: ", category['children'][0])
                categories[index] = category['children'][0]
            }
        })
        treePath['children'] = categories;

    });

    const smartTreeData = {
        "name": studentName,
        "children": treePaths
    }

    const treeData = {
        "name": "Student",
        "children": [
            {
                "name": "Mountain Medic",
                "children": [
                    {
                        "name": "Surthrival",
                        "children": [
                            {
                                "name": "Personal and group safety"
                            },
                            {
                                "name": "Deescalation"
                            },
                            {
                                "name": "Knife Safety"
                            }
                        ]
                    },
                    {
                        "name": "Medic",
                        "children": [
                            {
                                "name": "Basic first aid 1"
                            },
                            {
                                "name": "Basic first aid 2"
                            }
                        ]
                    },
                    {
                        "name": "Navigation",
                        "children": [
                            {
                                "name": "Intro to navigation"
                            },
                            {
                                "name": "Off-trail navigation"
                            }
                        ]
                    },
                    {
                        "name": "Fire",
                        "children": [
                            {
                                "name": "Basic firebuilding"
                            },
                            {
                                "name": "Cookfires"
                            }
                        ]
                    },
                    {
                        "name": "Intro to foraging and water"
                    },
                    {
                        "name": "Basic tarpology"
                    },
                    {
                        "name": "Practical herbalism"
                    },
                    {
                        "name": "Community",
                        "children": [
                            {
                                "name": "Diversity and support systems"
                            },
                            {
                                "name": "Community Project"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "Scout",
                "children": [
                    {
                        "name": "Debris huts"
                    },
                    {
                        "name": "Navigation",
                        "children": [
                            {
                                "name": "Intro to orienteering"
                            },
                            {
                                "name": "Advanced orienteering"
                            }
                        ]
                    },
                    {
                        "name": "Surthrival",
                        "children": [
                            {
                                "name": "Stealth"
                            },
                            {
                                "name": "Tracking"
                            },
                            {
                                "name": "Minimalist adventuring"
                            },
                        ]
                    },
                    {
                        "name": "Fire",
                        "children": [
                            {
                                "name": "Wet fires"
                            },
                            {
                                "name": "Minimalist fires"
                            }
                        ]
                    },
                    {
                        "name": "Food",
                        "children": [
                            {
                                "name": "Food or Fire Elective"
                            },
                            {
                                "name": "Wilderness Food Prep"
                            }
                        ]
                    },
                    {
                        "name": "Community",
                        "children": [
                            {
                                "name": "Leadership and teamwork"
                            },
                            {
                                "name": "Environmental Stewardship"
                            },
                            {
                                "name": "Communication and radio"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "Provider",
                "children": [
                    {
                        "name": "Food",
                        "children": [
                            {
                                "name": "Wilderness Food Prep"
                            },
                            {
                                "name": "Food Preservation"
                            },
                            {
                                "name": "Food Elective"
                            }
                        ]
                    },
                    {
                        "name": "Nutrition and Fitness"
                    },
                    {
                        "name": "Shelter",
                        "children": [
                            {
                                "name": "Knots Intensive"
                            },
                            {
                                "name": "Advanced tarpology"
                            },
                            {
                                "name": "Shelter Elective"
                            }
                        ]
                    },
                    {
                        "name": "Community",
                        "children": [
                            {
                                "name": "Leadership and teamwork"
                            },
                            {
                                'name': 'Environmental Stewardship'
                            }
                        ]
                    },
                    {
                        "name": "Intro to gardening"
                    },
                    {
                        "name": "Surthrival",
                        "children": [
                            {
                                "name": "Campsite Tools and Firewood"
                            },
                            {
                                "name": "Independent craftmanship project"
                            }
                        ]
                    },
                    {
                        "name": "Communication",
                        "children": [
                            {
                                "name": "Radio communication"
                            },
                            {
                                "name": "Comms Elective"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "Medic",
                "children": [
                    {
                        "name": "Medic",
                        "children": [
                            {
                                "name": "Intermediate first aid 1"
                            },
                            {
                                "name": "Intermediate first aid 2"
                            },
                            {
                                "name": "Intro to water rescue / Elective"
                            },
                            {
                                "name": "Wound management / Case study"
                            },
                            {
                                "name": "Nutrition / Elective"
                            },
                            {
                                "name": "Independent Medical Practice"
                            },
                            {
                                "name": "Final Scenario"
                            }
                        ]
                    },
                    {
                        "name": "Community",
                        "children": [
                            {
                                "name": "Leadership and teamwork"
                            },
                            {
                                "name": "Environmental Stewardship"
                            },
                            {
                                "name": "Communication and radio"
                            }
                        ]
                    },
                    {
                        "name": "Herbalism",
                        "children": [
                            {
                                "name": "External preparations"
                            },
                            {
                                "name": "Internal preparations"
                            }
                        ]
                    },
                    {
                        "name": "Intro to gardening"
                    }
                ]
            }
        ]
    }

    const margin = { top: 20, right: 280, bottom: 20, left: 80 }

    const chartHeight = (completeUnits.length * 60) - margin.top - margin.bottom;
    const chartWidth = 1000 - margin.left - margin.right;
    const treemap = d3.tree().size([chartHeight, chartWidth])
    let nodes = d3.hierarchy(smartTreeData, (d: any) => d.children);
    nodes = treemap(nodes);

    function render() {
        d3.select(".smart-tree-container")
        d3.selectAll("svg").remove();

        const svg = d3.select(".smart-tree-container").append("svg")
            .attr("width", chartWidth + margin.left + margin.right)
            .attr("height", chartHeight + margin.top + margin.bottom),
            g = svg.append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

        g.selectAll(".link")
            .data(nodes.descendants().slice(1))
            .enter().append("path")
            .attr("class", "link")
            .style("stroke", "#00aaaa80")
            .style("fill", "none")
            .style("stroke-width", "6px")
            .attr("d", (d: any) => ` M ${d.y} , ${d.x} C ${(d.y + d.parent.y) / 2} , ${d.x} ${(d.y + d.parent.y) / 2} , ${d.parent.x} ${d.parent.y} , ${d.parent.x} `);

        const node = g.selectAll(".node")
            .data(nodes.descendants())
            .enter().append("g")
            .attr("class", d => "node" + (d.children ? " node--internal" : " node--leaf"))
            .attr("transform", (d: any) => `translate( ${d.y} , ${d.x} )`);

        node.append("circle")
            .attr("r", 10)
            .style("cursor", "pointer")
            .on("click", (e: any) => {
                console.log(e.target)
                d3.selectAll("circle")
                    .classed("tree-node-selected", false)

                d3.select(e.target)
                    .classed("tree-node-selected", true);
            });


        node.append("text")
            .attr("dy", ".35em")
            .attr("x", d => d.children ? -15 : 15)
            .attr("y", d => d.children && d.depth !== 0 ? -15 : 0)
            .style("text-anchor", d => d.children ? "end" : "start")
            .style("fill", "black")
            .style("font-weight", "500")
            .text(d => d.data.name);

    }
    useEffect(() => render(), [smartTreeData])

    return (
        <div className="smart-tree-wrapper">
            <h1>HELLO THERE</h1>
            <div className="smart-tree-container"></div>
        </div>
    )
}

function TreeChart() {

    const exampleStudent = {

    }

    const treeData = {
        "name": "Student",
        "children": [
            {
                "name": "Mountain Medic",
                "children": [
                    {
                        "name": "Surthrival",
                        "children": [
                            {
                                "name": "Personal and group safety"
                            },
                            {
                                "name": "Deescalation"
                            },
                            {
                                "name": "Knife Safety"
                            }
                        ]
                    },
                    {
                        "name": "Medic",
                        "children": [
                            {
                                "name": "Basic first aid 1"
                            },
                            {
                                "name": "Basic first aid 2"
                            }
                        ]
                    },
                    {
                        "name": "Navigation",
                        "children": [
                            {
                                "name": "Intro to navigation"
                            },
                            {
                                "name": "Off-trail navigation"
                            }
                        ]
                    },
                    {
                        "name": "Fire",
                        "children": [
                            {
                                "name": "Basic firebuilding"
                            },
                            {
                                "name": "Cookfires"
                            }
                        ]
                    },
                    {
                        "name": "Intro to foraging and water"
                    },
                    {
                        "name": "Basic tarpology"
                    },
                    {
                        "name": "Practical herbalism"
                    },
                    {
                        "name": "Community",
                        "children": [
                            {
                                "name": "Diversity and support systems"
                            },
                            {
                                "name": "Community Project"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "Scout",
                "children": [
                    {
                        "name": "Debris huts"
                    },
                    {
                        "name": "Navigation",
                        "children": [
                            {
                                "name": "Intro to orienteering"
                            },
                            {
                                "name": "Advanced orienteering"
                            }
                        ]
                    },
                    {
                        "name": "Surthrival",
                        "children": [
                            {
                                "name": "Stealth"
                            },
                            {
                                "name": "Tracking"
                            },
                            {
                                "name": "Minimalist adventuring"
                            },
                        ]
                    },
                    {
                        "name": "Fire",
                        "children": [
                            {
                                "name": "Wet fires"
                            },
                            {
                                "name": "Minimalist fires"
                            }
                        ]
                    },
                    {
                        "name": "Food",
                        "children": [
                            {
                                "name": "Food or Fire Elective"
                            },
                            {
                                "name": "Wilderness Food Prep"
                            }
                        ]
                    },
                    {
                        "name": "Community",
                        "children": [
                            {
                                "name": "Leadership and teamwork"
                            },
                            {
                                "name": "Environmental Stewardship"
                            },
                            {
                                "name": "Communication and radio"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "Provider",
                "children": [
                    {
                        "name": "Food",
                        "children": [
                            {
                                "name": "Wilderness Food Prep"
                            },
                            {
                                "name": "Food Preservation"
                            },
                            {
                                "name": "Food Elective"
                            }
                        ]
                    },
                    {
                        "name": "Nutrition and Fitness"
                    },
                    {
                        "name": "Shelter",
                        "children": [
                            {
                                "name": "Knots Intensive"
                            },
                            {
                                "name": "Advanced tarpology"
                            },
                            {
                                "name": "Shelter Elective"
                            }
                        ]
                    },
                    {
                        "name": "Community",
                        "children": [
                            {
                                "name": "Leadership and teamwork"
                            },
                            {
                                'name': 'Environmental Stewardship'
                            }
                        ]
                    },
                    {
                        "name": "Intro to gardening"
                    },
                    {
                        "name": "Surthrival",
                        "children": [
                            {
                                "name": "Campsite Tools and Firewood"
                            },
                            {
                                "name": "Independent craftmanship project"
                            }
                        ]
                    },
                    {
                        "name": "Communication",
                        "children": [
                            {
                                "name": "Radio communication"
                            },
                            {
                                "name": "Comms Elective"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "Medic",
                "children": [
                    {
                        "name": "Medic",
                        "children": [
                            {
                                "name": "Intermediate first aid 1"
                            },
                            {
                                "name": "Intermediate first aid 2"
                            },
                            {
                                "name": "Intro to water rescue / Elective"
                            },
                            {
                                "name": "Wound management / Case study"
                            },
                            {
                                "name": "Nutrition / Elective"
                            },
                            {
                                "name": "Independent Medical Practice"
                            },
                            {
                                "name": "Final Scenario"
                            }
                        ]
                    },
                    {
                        "name": "Community",
                        "children": [
                            {
                                "name": "Leadership and teamwork"
                            },
                            {
                                "name": "Environmental Stewardship"
                            },
                            {
                                "name": "Communication and radio"
                            }
                        ]
                    },
                    {
                        "name": "Herbalism",
                        "children": [
                            {
                                "name": "External preparations"
                            },
                            {
                                "name": "Internal preparations"
                            }
                        ]
                    },
                    {
                        "name": "Intro to gardening"
                    }
                ]
            }
        ]
    }
    const margin = { top: 20, right: 280, bottom: 20, left: 80 }

    const chartHeight = 1800 - margin.top - margin.bottom;
    const chartWidth = 1000 - margin.left - margin.right;
    const detailsWidth = (600);
    const treemap = d3.tree().size([chartHeight, chartWidth])
    let nodes = d3.hierarchy(treeData, (d: any) => d.children);
    nodes = treemap(nodes);


    function selectNode(e: Event) {
        console.log(e)
    }

    useEffect(() => {
        d3.select("chart-container")
        d3.selectAll("svg").remove();

        const svg = d3.select(".chart-container").append("svg")
            .attr("width", chartWidth + margin.left + margin.right)
            .attr("height", chartHeight + margin.top + margin.bottom),
            g = svg.append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

        g.selectAll(".link")
            .data(nodes.descendants().slice(1))
            .enter().append("path")
            .attr("class", "link")
            .style("stroke", "#00aaaa80")
            .style("fill", "none")
            .style("stroke-width", "6px")
            .attr("d", (d: any) => ` M ${d.y} , ${d.x} C ${(d.y + d.parent.y) / 2} , ${d.x} ${(d.y + d.parent.y) / 2} , ${d.parent.x} ${d.parent.y} , ${d.parent.x} `);

        const node = g.selectAll(".node")
            .data(nodes.descendants())
            .enter().append("g")
            .attr("class", d => "node" + (d.children ? " node--internal" : " node--leaf"))
            .attr("transform", (d: any) => `translate( ${d.y} , ${d.x} )`);

        node.append("circle")
            .attr("r", 10)
            .style("cursor", "pointer")
            .on("click", (e: any) => {
                console.log(e.target)
                d3.selectAll("circle")
                    .classed("tree-node-selected", false)

                d3.select(e.target)
                    .classed("tree-node-selected", true);
            });


        node.append("text")
            .attr("dy", ".35em")
            .attr("x", d => d.children ? -15 : 15)
            .attr("y", d => d.children && d.depth !== 0 ? -15 : 0)
            .style("text-anchor", d => d.children ? "end" : "start")
            .style("fill", "black")
            .style("font-weight", "500")
            .text(d => d.data.name);

    }, [chartHeight, chartWidth, margin.top, margin.right, margin.bottom, margin.left, nodes])

    return (
        <div className='tree-chart'>
            <div className='chart-container'></div>
            <div className='details-container' style={{ "width": detailsWidth, "height": chartHeight + margin.top + margin.bottom }}></div>
        </div>
    )
}

export default TreeChart


export { SmartTreeChart };