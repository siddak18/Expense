import '../App.css'
import React from 'react'
import Income from './Income'
import Math from './Math'
import Expense from './Expense'
import '../App.css'
const Home = () => {
  return (
    <div className='home' style={{width:'100%',display:'flex'}}>
<Income></Income>
<Math></Math>
<Expense></Expense>
 
    </div>
  )
}

export default Home