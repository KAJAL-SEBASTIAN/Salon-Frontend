import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import img from '../assets/salon.webp';
import { addServiceAPI } from '../services/allAPIs';
import { addServiceContextApi} from '../ContextAPI/ContextShare';

function AddService() {
    
  const {addServiceRes,setAddServiceRes} = useContext(addServiceContextApi)

     //to hold token from sessionStorage
    const [token,setToken] = useState("")

    //to get token
    useEffect(()=>{
     if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
     }
    },[])

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
     
    //to hold service details from the form
    const [serviceDetails,setServiceDetails] =useState({
type:"",title:"",time:"",price:"",serviceImage:""
    })

    //to hold image file data converted into url
    const [preview,setPreview]=useState("")
     console.log(preview);
    useEffect(()=>{
      if(serviceDetails.serviceImage){
        setPreview(URL.createObjectURL(serviceDetails.serviceImage))
      }
    },[serviceDetails.serviceImage])

    console.log(serviceDetails);

    const serviceAdd = async()=>{
        const{type,title,time,price,serviceImage}=serviceDetails
        if(!type || !title || !time || !price || !serviceImage){
            alert("Please fill the form")
        }
        else{
          //api call
     const reqBody = new FormData()
     reqBody.append("type",type)
     reqBody.append("title",title)
     reqBody.append("time",time)
     reqBody.append("price",price)
     reqBody.append("serviceImage",serviceImage)

      
     const reqHeader = {
            "Content-Type":"multipart/form-data",//it indicates the req contains a image file
             "Authorization":`Bearer ${token}` //send token from from client side to server side
          };
         
       
        //api call
        const result = await addServiceAPI(reqBody,reqHeader)
        console.log(result);
        if(result.status === 200){
          alert("Service added successfully...")
          setAddServiceRes(result.data)//contextAPI state value assigned
          console.log(result.data);
          handleClose() //to close the modal window
          setServiceDetails({ //after adding service setails, we need to set empty object to the state
         type:"",title:"",time:"",price:"",serviceImage:""
          })
          setPreview("") //img empty
        }
        else{
          console.log(result.response.data);
        }
      }
    };
  return (
    <div>
         <button  onClick={handleShow} className='btn btn-primary me-4'>Add Service</button>

         <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton style={{backgroundColor:'#eaf3f3'}}>
          <Modal.Title>Service Details</Modal.Title>
        </Modal.Header >
        <Modal.Body style={{backgroundColor:'#eaf3f3'}}>
          <div className='d-flex justify-content-evenly'>
            <label>
              <input onChange={e=>setServiceDetails({...serviceDetails,serviceImage:e.target.files[0] })} type="file" style={{display:'none'}} />
              <img  width={'350px'} height={'300px'} src={preview?preview:img} alt="" />
            </label>

          <div>
          <input value={serviceDetails.type} onChange={e=>setServiceDetails({...serviceDetails,type:e.target.value})} type="text" placeholder='Service Type' style={{width:'300px'}}  className='form-control mb-3 mt-5'/>
           <input value={serviceDetails.title} onChange={e=>setServiceDetails({...serviceDetails,title:e.target.value})} type="text" placeholder='Service Title' className='form-control mb-3' />
            <input  value={serviceDetails.time} onChange={e=>setServiceDetails({...serviceDetails,time:e.target.value})} type="text" placeholder='Time Taken'  className='form-control mb-3'/>
            <input  value={serviceDetails.price} onChange={e=>setServiceDetails({...serviceDetails,price:e.target.value})} type="text" placeholder='Price'  className='form-control mb-3'/>
        </div>

           
          </div>
        </Modal.Body>
        <Modal.Footer style={{backgroundColor:'#eaf3f3'}}>
          <Button onClick={serviceAdd} style={{backgroundColor:'#eaf3f3',color:'black',}}>
            Add
          </Button>
          
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AddService