import React, { useState } from 'react'
import './Auth.css'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../services/allAPIs'
import Header from '../Components/Header'

function Auth({register}) {

  const location = useNavigate()

const isRegisterForm = register?true:false

const [userData,setUserData] = useState({
  username:"",
  email:"",
  password:"",
  
})

const[userType,setUserType] = useState("");
const [secretKey,setSecretKey] = useState("")

 
    const registerData = async(e)=>{
      if(userType === "Admin" && secretKey !== "Kajal"){
        e.preventDefault();
        alert("Invalid Admin");
      }
      else{
        const {username,email,password} = userData
        if(!username || !email || !password){
          alert("Please fil the form")
        }
        else{
          const result = await registerAPI({...userData,userType,secretKey});
          console.log(result);
      
            if(result.status===200){
              alert(result.data)//user registration successfull
              location('/login');
            }
            else{
              alert(result.response.data)//user already registered
            }
      
        }
      
      
      }
      }
 

      
const loginData = async()=>{
  const {email,password} = userData
  if(!email || !password){
    alert("Please fill the form")
  }
  else{

     const result = await loginAPI(userData)
     console.log(result);
     if(result.status===200){
      alert("Login successfull")//user login successful
      sessionStorage.setItem("existingUser",JSON.stringify(result.data.user))
      sessionStorage.setItem("token",result.data.token)
           //navigate to different pages based on user type
            if(userType === 'Admin'){
            location('/admin-dashboard')
             }
          else{
           location('/user-dashboard')
           }
     }
     else{
      alert("Invalid user data")
     }
     
  }
}


  return (
    <div>
      <Header/>
  
    <div className='geeks  d-flex justify-content-center align-items-center' >
        <div className='container' > 
       <div className="row ">
     <div className="col-12 form hover-shadow  align-items-center justify-content-center text-center text-dark shadow" style={{height:'470px',width:'480px',marginLeft:'300px',backgroundColor:'bisque',marginTop:'150px'}}>
          <h2 style={{marginTop:'15px' }}>Magic Touch </h2>
          <h4 className='text-center text-dark ' style={{marginTop:'5px'}} >
            {
              isRegisterForm ?'Register here':'Login here'
            }
          </h4>
           
           {
            isRegisterForm ?null :
            <img  style={{borderRadius:'50%'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9EhdjDyKiPklzklEAf351YMC9B0c6STOr5m5pNWbeH9yvv5S1whaw3oZF2mryQoSN340&usqp=CAU" width={'150px'} height={'150px'} alt="" />
           }

           <form className=' p-2   align-items-center ' style={{marginLeft:'50px'}} >
    
        <div style={{display:'flex'}}>
         {
          isRegisterForm &&
          <h5 className='me-2'>Register As :</h5>
         }

        {
          isRegisterForm &&
          <input type="radio" name='UserType' value={'User'} onChange={(e)=>setUserType(e.target.value)} />
         }
       {
        isRegisterForm &&
        <h5 className='me-2'>User</h5>
       }
       
       {
          isRegisterForm &&
          <input type="radio" name='UserType' value={'Admin'}  onChange={(e)=>setUserType(e.target.value)} />
         }
       {
        isRegisterForm &&
        <h5>Admin</h5>
       }
        </div>
              {userType === "Admin"?
                
                isRegisterForm &&
                  <input type="text" onChange={(e)=>setSecretKey(e.target.value)} placeholder='Secret Key' className='form-control mb-3' style={{width:'350px'}} />
                 :null
            }
       
     

            {
            
              isRegisterForm &&
              <input type="text" value={userData.username} onChange={e=>setUserData({...userData,username:e.target.value})} placeholder='Username' className='form-control mb-2   text-dark' style={{width:'350px'}} />
            }
            <input type="email" value={userData.email} onChange={e=>setUserData({...userData,email:e.target.value})} placeholder='Email' className='form-control mb-2 text-dark' style={{width:'350px'}} />
            <input type="password" value={userData.password} onChange={e=>setUserData({...userData,password:e.target.value})} placeholder='Password' className='form-control mb-2  text-dark' style={{width:'350px'}} />
          
           </form>
           
           {
            isRegisterForm ?
            <div className='text-center '>
              <button onClick={registerData} className='btn btn-dark text-light' >Register</button>
              <Link to={'/login'} style={{textDecoration:'none',color:'black'}}>
              <p className='mt-2' >Already Register? please login from here...</p>
              </Link>
            </div>
            :
            <div className='text-center'>
            <button onClick={loginData} className='btn btn-dark text-light' >Login</button>
            <Link to={'/register'} style={{textDecoration:'none',color:'black'}}>
              <p className='mt-1' >New to here? Please Register...</p>
              </Link>
          </div>
           }
           

        </div>
       </div>

       <div className='text-end'>
        <Link  to={'/'} >
        <button className='btn btn-secondary' style={{marginBottom:'50px'}} >Go Back</button>
        </Link>
        
       </div>
      

        </div>
    </div>
    </div>
  )
}


export default Auth