import React, {Component} from 'react';
import {Graph} from './graph';
import './App.css';

// !!! IMPLEMENT ME
const canvasWidth = 400;
const canvasHeight = 400;

/**
 * GraphView
 */
class GraphView extends Component {
    /**
     * On mount
     */
    componentDidMount() {
        this.updateCanvas();
    }

    /**
     * On state update
     */
    componentDidUpdate() {
        this.updateCanvas();
    }

    /**
     * Render the canvas
     */
    updateCanvas() {
        let canvas = this.refs.canvas;
        let ctx = canvas.getContext('2d');

        ctx.fillStyle = 'gray';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        // !!! IMPLEMENT ME
        // compute connected components
        this.props.graph.vertexes.forEach(vert => {
            vert.edges.forEach(edge => {
                ctx.moveTo(vert.pos.x, vert.pos.y);
                ctx.lineTo(edge.destination.pos.x, edge.destination.pos.y)
                ctx.stroke();
            })
        });

        this.props.graph.vertexes.forEach(vert => {
            ctx.beginPath();
            ctx.arc(vert.pos.x, vert.pos.y, 10, 0, 2 * Math.PI);

            let r = Math.floor(Math.random() * 155) + 100;
            let g = Math.floor(Math.random() * 155) + 100;
            let b = Math.floor(Math.random() * 155) + 100;

            ctx.fillStyle = 'rgb(' + r + ', ' + g + ', ' + b + ')';
            ctx.fill();
            ctx.strokeStyle = 'blue';
            ctx.stroke();

            ctx.fillStyle = 'black';
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(vert.value, vert.pos.x, vert.pos.y);
        })

    }

    /**
     * Render
     */
    render() {
        return <canvas ref="canvas" width={canvasWidth} height={canvasHeight}></canvas>;
    }
}


/**
 * App
 */
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            graph: new Graph()
        };

        this.state.graph.randomize(2, 4, 80);
        // this.state.graph.bfs(this.state.graph.vertexes);
        this.state.graph.getConnectedComponents(this.state.graph.vertexes);
    }

    render() {
        return (
            <div className="App">
                <GraphView graph={this.state.graph}></GraphView>
            </div>
        );
    }
}

export default App;
