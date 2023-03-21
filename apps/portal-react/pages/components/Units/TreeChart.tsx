/* eslint-disable prettier/prettier */

import { useEffect } from "react";
import * as d3 from 'd3';



const colors = {
    selected0: '#00aa55',
    selected1: '#005555',
    completed0: '#00aaaa',
    completed1: '#00aaaa',

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
    const margin = { top: 20, right: 240, bottom: 20, left: 80 }

    const chartHeight = 1800 - margin.top - margin.bottom;
    const chartWidth = d3.max([(0.5 * window.innerWidth), 850]) - margin.left - margin.right;
    const detailsWidth = (0.4 * window.innerWidth);
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
            .style("stroke", "black")
            .style("stroke-width", "2px")
            .style("fill", "whitesmoke")
            .style("cursor", "pointer")
            .on("click", (e: any) => {
                console.log(e.target)
                d3.select(e.target)
                    .transition()
                    .style("transform", `scale(1.25)`)
                    .style("fill", colors.selected0)
                    .style("stroke", colors.selected1)
                    .style("stroke-width", "2px")
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
            <h1 className='title'>TREE CHART DEMO</h1>
            <div className='chart-container'></div>
            <div className='details-container' style={{ "width": detailsWidth, "height": chartHeight + margin.top + margin.bottom }}></div>
        </div>
    )
}

export default TreeChart


export { };