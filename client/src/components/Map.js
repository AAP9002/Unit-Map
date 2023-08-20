import cytoscape from "cytoscape";
import "./map.css"

function Map() {
    var cy = cytoscape({
        container: document.getElementsByClassName('graph')[0],
        elements: [ // list of graph elements to start with
            { // node a
                data: { id: 'a' }
            },
            { // node b
                data: { id: 'b' }
            },
            { // edge ab
                data: { id: 'ab', source: 'a', target: 'b' }
            }
        ],

        style: [ // the stylesheet for the graph
            {
                selector: 'node',
                style: {
                    'background-color': '#666',
                    'label': 'data(id)'
                }
            },

            {
                selector: 'edge',
                style: {
                    'width': 3,
                    'line-color': '#ccc',
                    'target-arrow-color': '#ccc',
                    'target-arrow-shape': 'triangle',
                    'curve-style': 'bezier'
                }
            }
        ],

        layout: {
            name: 'grid',
            rows: 1
        }
    });

    cy.add({
        group: 'nodes',
        data: { weight: 75 },
        position: { x: 10, y: 10 }
    });

    return (<div className="graph"></div>);
}

export default Map;