/* App.js */
import React from 'react';
import CanvasJSReact from './canvasjs.react';
var Component = React.Component;
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class Barchat extends Component {	
	render() {
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "dark1", // "light1", "dark1", "dark2"
			title:{
				text: "Percentage of activity summary"
			},
			data: this.props.data
		}
		
		return (
		<div>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
 
export default Barchat;