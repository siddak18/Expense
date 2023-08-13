import React from 'react'
import '../css/income.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from 'react-redux';
import { faLeaf, faRupee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
ChartJS.register(ArcElement, Tooltip, Legend);
const Expense = () => {
  const a=useSelector(state=>state.expense);
  const type=[];
  const value=[];
  let hasmap={};
  let expensetotal=0;
  a.map(item=>{
    if(item.category==="expense"){
      expensetotal+=parseInt(item.amount);
      if(hasmap[item.category2]){
        hasmap[item.category2]+=parseInt(item.amount);
      }else{
        hasmap[item.category2]=parseInt(item.amount);
      }
    }
  });
  for(let key in hasmap){
    type.push(key);
    value.push(hasmap[key]);
  }
    const data={
        labels:type,
        datasets:[{
          cutoutPercentage: 20,
          aspectRatio:1,
          height:50,
          width:50,
          radius:'100%',
            label:'',
            data:value,
           backgroundColor: [
            "#ff0000", // Dark Red (100% opacity)
            "#bf2e2e",
            "#e10909d5",
            "#DA000055",
            "#F5000044",
            "#FF1A0033",
            "#FF330022",
            "#FF4D0011",
            "#FF66000A",
            "#FF800005"  // Light Red (10% opacity)
          ]
        }]
    }
    const color=['red','darkred','lightred','black','blue'];
    const options = {
        plugins: {
            legend: {
                display: true,
                align:'start',
                position:'top'// Hide the legend
            }
        }
    };
  return (
    <div className='income1'>
     <h1>Expense</h1>
     <h3><FontAwesomeIcon icon={faRupee}></FontAwesomeIcon> {expensetotal}</h3>
     {/* <div className='labels' style={{display:'flex',gap:'10px'}}>
      {
        type.map((item,idx)=>{
              return <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'2px'}}>
                <div style={{height:'10 px', width:'30px' ,backgroundColor: color[idx] }}>
                </div>
                <p style={{margin:'0',padding:'0',textAlign:'center',alignContent:'center',fontSize:'10px'}}>{item}</p>
              </div>
        })
      }
     </div> */}
     <div className='incomechart'>
       <Doughnut data={data} options={options} style={{display:'flex'}}></Doughnut>
     </div>
    </div>
  )
}

export default Expense