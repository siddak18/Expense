import React, { useEffect, useState } from 'react'
import '../css/mat.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faRupeeSign, faTrash } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import {nanoid} from 'nanoid'
import { usename } from './Login';
import { add, get ,deleteans} from '../api/apis';
import { useLocation, useParams } from 'react-router-dom';

library.add(fas);
let arr=[];
const Math = () => {
  const location=useLocation();
  const username=location.state?.usename;
  const {res}=useParams();
  const [cat1,setcat1]=useState("");
  const [cat2,setcat2]=useState("");
  const [amount,setamount]=useState("");
  const [date,setdate]=useState("");
  const dispatch=useDispatch();
  let a=useSelector(state=>state.expense);
   let balance=0;
   useEffect(()=>{
    dispatch(get(username));
   },[]);
   useEffect(()=>{
calculateBalance();
   },[]);
   const calculateBalance = () => {
    let balance = 0;
    
    a.forEach(item => {
      if (item.category=== 'income') {
        balance += item.amount;
      } else {
        balance -= item.amount;
      }
    });
    return balance;
  };
  
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
    
  //   switch (name) {
  //     case 'cat1':
  //       setCat1(value);
  //       break;
  //     case 'cat2':
  //       setCat2(value);
  //       break;
  //     case 'amount':
  //       setAmount(value);
  //       break;
  //     case 'date':
  //       setDate(value);
  //       break;
  //     default:
  //       break;
  //   }
  // };
  
  const getRandomId = () => {
    return nanoid(8);
  };
  
  // const handleSubmit = () => {
  //   const randomId = getRandomId();
  //   const info = {
  //     category: cat1,
  //     category2: cat2,
  //     amount: parseInt(amount),
  //     date: date,
  //     id: randomId,
  //     userid: res
  //   };
    
  //   dispatch(add(info, username));
    
  //   setAmount('');
  //   setCat1('');
  //   setCat2('');
  //   setDate('');
  // };
  
  // const handleDelete = (id) => {
  //   dispatch(deleteans(id, username));
  // };

   const handelchange=(e)=>{
   const name=e.target.name;
   const value=e.target.value;
   switch(name){
    case "cat1":
    setcat1(value);
    break;
    case "cat2":
    setcat2(value);
    break;
    case "amount":
    setamount(value);
    break;
    case "date":
    setdate(value);
    break;
    case "income":
    setcat1(value);
    break;
    default:
    return null;
   }
   }
   const getrandom=()=>{
    return nanoid(8);
   }
   const submitdata=()=>{
    let random=getrandom();
    const info={
      category:cat1,
      category2:cat2,
      amount:parseInt(amount),
      date:date,
      id:random,
      userid:res
    }
    if(cat1.length==0||cat2.length==0||amount.length==0||date.length==0){
      alert("Please fill all the fields");
    }else{
  // dispatch({type:"ADD",payload:info});
     dispatch(add(info,username));
     
    setamount("");
    setcat1("");
    setcat2("");
    setdate("");
    arr.push(info);
    //console.log(arr);
    }
   }

   const handleDelete=(id)=>{
    dispatch(deleteans(id,username));
    console.log(id);
   }
  return (
    <div className='math1'>
       <h1 >Expense Tracker</h1>
       {/* <h4>powered by speechly</h4> */}
       <div className='math2'>
       <h2>Total Balance <FontAwesomeIcon icon={faRupeeSign}></FontAwesomeIcon> {calculateBalance()}</h2>
       {/* <p>Try saying <br />Add Expense for $50 in category travel for <br />Thursday</p> */}
       </div>
       <div className='math3'>
        <div className='math45'>
       <div className='math4'>
       <p>Type</p>
       <select id='type' name='cat1' onChange={handelchange} value={cat1} required>
       <option value="income" name='cat1' >Income</option>
       <option value="expense" name='cat1'>Expense</option>
       </select>
       </div>
       <div className='math6'>
       <input type="text" name='cat2' placeholder='where' onChange={handelchange}  required/>
       </div>
       </div>
       <div className='math67'>
       <div className='math6'>
       <input type="number" placeholder='Amount' name='amount' onChange={handelchange} value={amount} className='mathh'/>
       </div>
       <div className='math7'>
       <div className='math8'>
       <p>Date</p>
       <input type="date" name="date" id="" onChange={handelchange} value={date}/>
       </div>
       </div>
       </div>
       <div className='math9'>
         <button onClick={submitdata}>Create</button>
       </div>
       </div>
       <div className='math10'>

        {
         a.map((item,idx)=>{
            return <div className='math101' key={idx}>
            <div className='co'>
            <FontAwesomeIcon icon={['fas', 'circle']} style={{ color: item.category==="income"?'green':'red' ,height:'30px',width:'100%'}} />
            </div>
            <div className='det'>
              <div className='det1'>
                <h3>{item.category2}</h3>
                <p>${item.amount} {item.date}</p>
              </div>
            </div>
            <div className='ic' onClick={() => handleDelete(item.id)}>
               <FontAwesomeIcon icon={faTrash} style={{width:'100%'}}></FontAwesomeIcon>
            </div>
         </div>
          })
        }
       </div>
    </div>
  )
}

export default Math