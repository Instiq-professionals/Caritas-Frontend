import React from 'react';
import CanvasJSReact from './canvasjs.react';
var Component = React.Component;
//ar CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class Graph extends Component {
	constructor() {
		super();
		this.addSymbols = this.addSymbols.bind(this);
	}
	
	addSymbols(e) {
		var suffixes = ["", "K", "M", "B"];
		var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
		
		if(order > suffixes.length - 1)
			order = suffixes.length - 1;
 
		var suffix = suffixes[order];
		return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;	
	}
	
	render() {	
		const options = {
			animationEnabled: true,
			theme: "dark1", // "light1", "light2", "dark1", "dark2"
			title: {
				text: "Activity summary"
			},
			axisY: {
				title: "Number of Engagement",
				labelFormatter: this.addSymbols,
				scaleBreaks: {
				autoCalculate: true
			}
			},
			axisX: {
				title: "Activities",
				//labelAngle: 0
			},
			data: this.props.data
		}
						
		return (
		<div>
			<CanvasJSChart options = {options} 
				onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	} 			
}

export default Graph
 