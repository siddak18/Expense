import React from 'react'
import '../css/income.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from 'react-redux';
import { usename } from './Login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons';
ChartJS.register(ArcElement, Tooltip, Legend);
const Income = () => {
  const name=usename;
  const a=useSelector(state=>state.expense);
  const type=[];
  const value=[];
  let hasmap={};
  let inc=0;
  a.map(item=>{
    if(item.category==="income"){
      inc+=parseInt(item.amount);
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
            label:'',
            data:value,
            backgroundColor:[
              "#00FF0088", // 100% opacity
              "#00FF0077",
              "#00FF0066",
              "#00FF0055",
              "#00FF0044",
              "#00FF0033",
              "#00FF0022",
              "#00FF0011",
              "#00FF000A",
              "#00FF0005"  // 10% opacity
            ]
        }]
    }
    const options = {
        plugins: {
            legend: {
                display: true // Hide the legend
            }
        }
    };
  return (
    <div className='income1'>
     <h1>Income</h1>
     <h3><FontAwesomeIcon icon={faRupeeSign}></FontAwesomeIcon> {inc}</h3>
     <div className='income2'>
       {/* <div style={{display:'flex',alignItems:'center'}}>
        
  */}
     <div className='incomechart'>

       <Doughnut data={data} options={options} style={{display:'flex',height:'100px',width:'100%'}}></Doughnut>
     </div>
     </div>
    </div>
  
  )
}

export default Income