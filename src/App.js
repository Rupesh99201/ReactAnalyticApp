import logo from './logo.svg';
import React,{Component} from 'react';
import './App.css';
import Chart from './components/chart';
import ChartType from './components/chartType';
// import Pie from './components/Piechart';
import Legend from './components/LegendExample';
import {Pie} from 'react-chartjs-2';


class App  extends Component{
  constructor(props){
    super(props);
    this.state ={
        chartData:{}
    }
}
componentWillMount(){
  this.getChartData();
}

getChartData = () =>{
  //ajax call here
  this.setState(
      {
        chartData:{
        labels:['Boston','springField','New York','Cambridge','New Bedford'],
        datasets:[
            {
                label:'Population',
                data:[
                    61987,
                    145623,
                    782644,
                    258495,
                    582847
                ],
                backgroundColor:[
                    'rgb(63, 191, 127)',
                    'rgb(63, 191, 191)',
                    'rgb(63, 63, 191)',
                    'rgb(63, 127, 191)',
                    'rgb(191, 191, 63)',
                    'rgb(63, 63, 191)'						
                ]
            }
        ]
      }
    }
  );
}

  render(){ 
  return (
    <div>
     {/* <Chart chartData={this.state.chartData} location="New York" legendPosition = "bottom"/>
     <ChartType /> */}
     {/* <Piechart /> */}
     {/* <div style={{height: '500px', width: '500px', backgroundColor: 'black', position: 'relative'}}>
        <Pie data={data} height={150} width={200} options={options}/>
      </div> */}
    {/* <h2>Legend Handlers Example</h2>
        <p>Hover over label and click</p>
        <Pie data={this.chartData} legend={this.state.legend} /> */}
        <Legend />

    </div>
  );
}
}

export default App;
