import React,{Component} from 'react';
import { Bar,Line,Pie } from 'react-chartjs-2';

class Chart  extends Component{
    constructor(props){
        super(props);
        this.state ={
            chartData:this.props.chartData
        }
    }

    static defaultProps = {
        displayTitle:true,
        displayLegends:true,
        legendPosition:'right',
        location:'City'
    }

   render(){
       return(
           <div className="chart">
               <Bar
                data={this.state.chartData}
                width={100}
                height={300}
                options={{ maintainAspectRatio: true,
                    title:{
                        display:this.props.displayTitle,
                        text:'Largest Cities In '+this.props.location,
                        fontSize:25
                    },
                    Legends:{
                        display:this.props.displayLegends,
                        position:this.props.legendPosition
                    }
                }        
            }
                />
                <Line
                data={this.state.chartData}
             
                options={{ 
                    title:{
                        maintainAspectRatio: true,
                        display:this.props.displayTitle,
                        text:'Largest Cities In '+this.props.location,
                        fontSize:25
                    },
                    Legends:{
                        display:this.props.displayLegends,
                        position:this.props.legendPosition
                    }
                }        
            }
                />
            <Pie
                data={this.state.chartData}
             
                options={{ 
                    title:{
                        maintainAspectRatio: true,
                        display:this.props.displayTitle,
                        text:'Largest Cities In '+this.props.location,
                        fontSize:25
                    },
                    Legends:{
                        display:this.props.displayLegends,
                        position:this.props.legendPosition
                    }
                }        
            }
                />

            </div>
       )
   } 
}

export default Chart;