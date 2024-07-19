import React, { useContext, useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import EditService from './EditService';
import { deleteUserServiceAPI, userServiceAPI } from '../services/allAPIs';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { addServiceContextApi } from '../ContextAPI/ContextShare';
import { editServiceContextApi } from '../ContextAPI/ContextShare';
import Card from 'react-bootstrap/Card';
import { baseUrl } from '../services/baseUrl';
import { Col } from 'react-bootstrap';

function MyService() {

  const {editServiceRes,setEditServiceRes} = useContext(editServiceContextApi)

  const {addServiceRes,setAddServiceRes} = useContext(addServiceContextApi)

  const [userServices,setUserService]=useState([])

const userService=async()=>{
const token = sessionStorage.getItem("token")
  if(token){
    const reqHeader={
      "Content-type":"multipart/form-data",
      "Authorization":`Bearer ${token}`
    }
    try{
    const  result = await userServiceAPI(reqHeader)
    console.log(result);
    setUserService(result.data)
    console.log(userServices);
    }
    catch(err){
      alert(err.message)
    }
  } 
}

useEffect(()=>{
userService()
},[addServiceRes,editServiceRes])

  
  const deleteService = async(pid)=>{
    const token = sessionStorage.getItem("token")

    if(token){
      const reqHeader = {
        "Content-type" : "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await deleteUserServiceAPI(pid,reqHeader)
      console.log(result);
      userService()
      toast.info("Service deleted successfully")
      // alert("Service deleted successfully")
    }
  }


  return (
    <div className='m-5'>

     <Row >
      {
        userServices.length>0?userServices.map((item)=>(
      <Col>
         <div style={{display:'flex',flexDirection:'row',marginTop:'20px'}}>
                <Card  style={{ width: '250px',height:'330px',textDecoration:'none',justifyContent:'center'}} className='mb-3 '>
   <Card.Img variant="top" height={'180px'} src={item?`${baseUrl}/uploads/${item.serviceImage}` :"empty image"} alt="" />
   <Card.Body>
     <Card.Title className='text-center'>Service Type: {item.type} </Card.Title>
         {item.title} <br />
        Price: {item.price} <br />
        Time taken:  {item.time} <br />
     <button className='btn me-2 text-center' style={{height:'35px'}}>
         <EditService service={item} />
        </button>
         <button onClick={()=>deleteService(item?._id)} className='btn'><i className='fa-solid fa-trash'></i></button>
   </Card.Body>
  </Card>
         </div>
      
      </Col>
        )):"Can't fetch"
      }
     </Row>
     
   
        
    {/* </div> */}
    <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>

    </div>
  )
}

export default MyService