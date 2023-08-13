import axios from 'axios';

const url="https://expensetracker-760k.onrender.com";
// const url="http://localhost:8000"


export const call=async(user)=>{
    try{
         const res=await axios.post(url,user);
         console.log(res.data);
        console.log("vj ");
         return res.data;
    }catch(e){
    console.log(e.message);
}
}

export const validate=async(user)=>{
    try {
        const res=await axios.post(url+"/signup",user);
        return res.data;
    } catch (error) {
        console.log(error.message);
    }
}

export const add=(trans,res)=>async(dispatch)=>{
try {
    //const {id}=useParams();
    //console.log(id);
    const addnew=await axios.post(url+"/home/"+res,trans);
    dispatch({type:"ADD",payload:addnew.data});
} catch (error) {
    console.log(error.message);
}
    }

export const get=(name)=>async(dispatch)=>{
    try {
        const res=await axios.get(url+"/user/"+name);
        dispatch({type:'GET',payload:res.data});
        return res.data;
    } catch (error) {
        
    }
}

export const deleteans=(name,id)=>async(dispatch)=>{
    try {
        const res=await axios.delete(url+"/"+name+"/"+id);
        dispatch({type:"DELETE",payload:res.data});
    } catch (error) {
        
    }
}