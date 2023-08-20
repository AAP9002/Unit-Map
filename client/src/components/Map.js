import cytoscape from "cytoscape";
import "./map.css"
import { useEffect } from "react";
import CourseData from "../templates/UOMCS.json"

function Map() {
    // const [userData, setUserData] = useState([]);

    useEffect(() => {
        var data = CourseData;
        console.log(data);
        //setUserData(data);

        var cy = cytoscape({
            container: document.getElementsByClassName('graph')[0],
            style: [
                {
                    selector: 'node',
                    style: {
                        'background-color': '#666',
                        'label': 'data(name)'
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
        },[]);

        const populateMap = (data) => {
            var units = data.Units
            var row = [0,0,0,0,0,0]
            units.forEach(element => {
                if(row[element.Year]>=0)
                {
                    row[element.Year] += 1
                    row[element.Year] = row[element.Year] * -1
                }
                else
                {
                    row[element.Year] -= 1
                    row[element.Year] = row[element.Year] * -1
                }

                cy.add({
                    group: 'nodes',
                    data: { id:element.Code, name: element.Code + " - "+element.Name, weight: element.Credits },
                    position: { x:700*element.Year, y: 60*row[element.Year] }
                });
            });
            units.forEach(element => {
                var edges = element.preReqs;
                var name = element.Code;
                edges.forEach(edge => {
                    cy.add({
                        group: 'edges',
                        data: { source: name, target: edge }
                    });
                });
            });

            cy.layout({ name: 'preset'}).run();
            cy.fit();
        }
        populateMap(data);
    }, []);

    return (<div className="graph"></div>);
}

export default Map;