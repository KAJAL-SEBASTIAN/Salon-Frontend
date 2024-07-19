import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import img from '../assets/salon.webp';
import { baseUrl } from '../services/baseUrl';
import { updateUserServiceAPI } from '../services/allAPIs';
import { editServiceContextApi } from '../ContextAPI/ContextShare';

function EditService({ service }) {

  const {editServiceRes,setEditServiceRes} = useContext(editServiceContextApi)

  console.log(service);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //to hold service details from the form
  const [serviceDetails, setServiceDetails] = useState({
    id:service._id,
    type: service.type,
    title: service.title,
    time: service.time,
    price: service.price,
    serviceImage: "",
  })

  //to hold image file data converted into url
  const [preview, setPreview] = useState("")
  // console.log(preview);

  useEffect(() => {
    if (serviceDetails.serviceImage) {
      setPreview(URL.createObjectURL(serviceDetails.serviceImage));
    }
  }, [serviceDetails.serviceImage]);

  console.log(serviceDetails);

  const updateService = async () => {
    const {id, type, title, time, price, serviceImage } = serviceDetails

    // if(!type || !title || !time || !price || !serviceImage){
    //   alert("Please fill the form")
    // }
    // else{
    //api call
    const reqBody = new FormData();
    reqBody.append("type", type);
    reqBody.append("title", title);
    reqBody.append("time", time);
    reqBody.append("price", price);
    preview?reqBody.append("serviceImage",serviceImage):reqBody.append("serviceImage",service.serviceImage);

    //get token
    const token = sessionStorage.getItem("token")
    console.log(token);
    if (preview) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
      //api call
      const result = await updateUserServiceAPI(id,reqBody, reqHeader)
      console.log(result);
      if (result.status == 200) {
        console.log(result.data);//successfully updated
      setEditServiceRes(result.data)
      alert("Service updated successfully")
      handleClose()
      }
      else {
        console.log(result.response.data);//error messag
        setEditServiceRes(result.response.data)
      }
    }
    else{
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      //api call
      const result = await updateUserServiceAPI(id,reqBody, reqHeader)
      console.log(result);
      if (result.status == 200) {
        console.log(result.data);//successfully updated
        setEditServiceRes(result.data)
      alert("Service updated successfully")
      handleClose()
      }
      else {
        console.log(result.response.data);//error message
        setEditServiceRes(result.response.data)
      }
    }
  }
  // }
  return (
    <div>
      <p onClick={handleShow} className=''>
        <i className='fa-solid fa-pen'></i>
      </p>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton style={{ backgroundColor: '#eaf3f3' }}>
          <Modal.Title>Service Details</Modal.Title>
        </Modal.Header >
        <Modal.Body style={{ backgroundColor: '#eaf3f3' }}>
          <div className='d-flex justify-content-evenly'>
            <label>
              <input onChange={e => setServiceDetails({ ...serviceDetails, serviceImage: e.target.files[0] })} type="file" style={{ display: 'none' }} />
              <img width={'350px'} height={'300px'} src={preview ? preview : `${baseUrl}/uploads/${service.serviceImage}`} alt="" />
            </label>

            <div>
              <input value={serviceDetails.type} onChange={e => setServiceDetails({ ...serviceDetails, type: e.target.value })} type="text" placeholder='Service Type' style={{ width: '300px' }} className='form-control mb-3 mt-5' />
              <input value={serviceDetails.title} onChange={e => setServiceDetails({ ...serviceDetails, title: e.target.value })} type="text" placeholder='Service Title' className='form-control mb-3' />
              <input value={serviceDetails.time} onChange={e => setServiceDetails({ ...serviceDetails, time: e.target.value })} type="text" placeholder='Time Taken' className='form-control mb-3' />
              <input value={serviceDetails.price} onChange={e => setServiceDetails({ ...serviceDetails, price: e.target.value })} type="text" placeholder='Price' className='form-control mb-3' />
            </div>


          </div>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#eaf3f3' }}>
          <Button onClick={updateService} style={{ backgroundColor: '#eaf3f3', color: 'black', }}>
            Update
          </Button>

        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default EditService