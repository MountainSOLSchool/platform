/* eslint-disable prettier/prettier */

import { useEffect, useState } from "react";
import * as d3 from 'd3';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "apps/portal-react/store/store";
import { requestPaths } from "apps/portal-react/store/paths";
import { requestUnits, overrideUnits } from "apps/portal-react/store/unitStore";


const colors = {
    selected0: '#00aa55',
    selected1: '#005555',
    completed0: '#00aaaa',
    completed1: '#00aaaa',

}

const MtnMedicUnits = [
    "r4X1YxigB3y5vgyuY3HU", "VIOIwcg8semiuoZvqrDz", "7R0ZvJiL6V1LZWWXaTMB", "dW37QdAucaYfRDCcamd4",
    "PtUZKsO1S5RT8jTGepU2", "LtpeTP057a4lrAv0uVk0", "vLqkFHw4lh0Hhxkhs1Jz", "MViHvnge0OghyBwgIU7j",
    "qM5ZYnpRP7EN82cyfHga", "S5XcEBn4r1rvSHefGv8e", "jQ6gBqnA1OrcvLrP1Bg1", "LpY0xbdjBZf9MgjECs57",
    "7t8i3KtPnUvS6ir0k5pj", "HHwX56kM8sqwQVAFGEUp"
];

function SmartTreeChart() {
    const dispatch = useDispatch()

    // [x] GET UNITS ARRAY
    // [x] GET STUDENT PROFILE
    // [x] FIND COMPLETED UNITS
    // [] COMPARE STUDENT UNITS TO PREREQS AND MARK ALL COMPLETED, INCOMPLETE, AND UNAVAILABLE CLASSES
    // [x] SORT INTO HIERARCHY
    // [x] IF LOADING MULTIPLE NODES FOR ANY CATEGORY, GENERATE NEW CATEGORY BRANCH
    // [] ? SHOW ONE NODE DEEP FOR CLASSES THAT ARE NOT AVAILABLE ?

    
    const paths = useSelector((state: RootState) => state.paths)
    const units = useSelector((state: RootState) => state.units);
    
    const student = useSelector((state: RootState) => state.student);
    const studentName = student['name'];
    const [completeUnits, setCompleteUnits] = useState([])

    /*
    const studentName = "Student"
    */


    function generateNodes() {
        const treeUnits = [];
        completeUnits.forEach(URL => {
            let unit = units.find(unit => unit["URL"] === URL);
            treeUnits.push(unit)
        }
        );
        const treePaths = [];

        paths.forEach(path => {
            completeUnits.forEach(URL => {
                if (path['units'].includes(URL)) {
                    let unit = units.find(unit => unit["URL"] === URL);
                    let treePath = treePaths.find(treePath => treePath['name'] === path['name']);
                    if (treePath === undefined) {
                        treePaths.push({
                            name: path['name'],
                            children: [unit]
                        })
                    }
                    else {
                        treePath.children.push(unit)
                    }
                }
            })
            let treePath = treePaths.find(treePath => treePath["name"] === path["name"])
            if (treePath === undefined) { return }
            
            let categories = [];
            treePath["children"].forEach(unit => {
                let category = categories.find(category => category['name'] === unit['category'])
                if (category) {
                    category['children'].push(unit)
                }
                else {
                    category = {
                        name: unit['category'],
                        children: [unit]
                    }
                    categories.push(category)
                }
            })
            categories.forEach((category, index) => {
                if (category['children'].length === 1) {
                    categories[index] = category['children'][0]
                }
            })
            treePath['children'] = categories;
    
        })
        

        const smartTreeData = {
            "name": studentName,
            "children": treePaths
        }

        //console.log("tree data => ", smartTreeData)
        //console.log("units => ", treeUnits)

        render(smartTreeData)
    }

    function render(data: {}) {

        const margin = { top: 20, right: 350, bottom: 20, left: 80 }

        const chartHeight = (completeUnits.length * 60) - margin.top - margin.bottom;
        const chartWidth = 1200 - margin.left - margin.right;
        const treemap = d3.tree().size([chartHeight, chartWidth])
        let nodes = d3.hierarchy(data, (d: any) => d.children);
        nodes = treemap(nodes);

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
            .style("stroke-width", "12px")
            .attr("d", (d: any) => ` M ${d.y} , ${d.x} C ${(d.y + d.parent.y) / 2} , ${d.x} ${(d.y + d.parent.y) / 2} , ${d.parent.x} ${d.parent.y} , ${d.parent.x} `);

        const node = g.selectAll(".node")
            .data(nodes.descendants())
            .enter().append("g")
            .attr("class", d => "node" + (d.children ? " node--internal" : " node--leaf"))
            .attr("transform", (d: any) => `translate( ${d.y} , ${d.x} )`);

        node.append("circle")
            .attr("r", 15)
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
            .attr("x", d => d.children ? -15 : 20)
            .attr("y", d => d.children && d.depth !== 0 ? -15 : 0)
            .style("text-anchor", d => d.children ? "end" : "start")
            .style("fill", "black")
            .style("font-weight", "500")
            .text(d => d.data.name);

    }
    useEffect(() => {
        if (paths.length > 0 && units.length > 0) {
            setCompleteUnits(student['completedUnits'])
            generateNodes()
        }
        else {
            dispatch( requestPaths() )
            dispatch( requestUnits() )
        }
    })

    return (
        <div className="smart-tree-wrapper">
            <h1>HELLO THERE</h1>
            <button onClick={ () => dispatch( overrideUnits( MtnMedicUnits ) ) }>MTN MEDIC ONLY</button>
            <div className="smart-tree-container"></div>
        </div>
    )
}

export { SmartTreeChart, MtnMedicUnits };