import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom';
import img from '../assets/salon.webp';
import { baseUrl } from '../services/baseUrl';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, deleteFromWishlist } from '../Redux/Slice/wishlistSlice';
import { addToBooking } from '../Redux/Slice/bookingSlice';

function ServiceCard({service}) {
  console.log(service);
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

const dispatch=useDispatch()
const handleBooking = (service)=>{
  //add to cart
  dispatch(addToBooking(service))
  //remove from wishlist
  dispatch(deleteFromWishlist(service.title))
}
const wishlistArray = useSelector((state)=>state.wishlistReducer)


const handleAddToWishlist = (service)=>{
  //check if the service is available in the wishlist
   const isService = wishlistArray.some((wishlistService)=>wishlistService.title === service.title)
   if(isService){
     alert("Service is available in wishlist")
   }
   else{
     dispatch(addToWishlist(service))
   }
}

const bookingArray = useSelector((state)=>state.bookingReducer)
const handleAddToBooking = (service)=>{
  //check if the service is available in the booking
  const isBooking = bookingArray.some((bookingService)=>bookingService.title === service.title)
  if(isBooking){
    alert("Service is available in Booking")
  }
  else{
    dispatch(addToBooking(service))
  }
}

  return (
    <div>
<Card onClick={handleShow} style={{ width: '250px',height:'230px'}} className='mb-3'>
      <Card.Img variant="top" height={'180px'}  src={service?`${baseUrl}/uploads/${service.serviceImage}` :"empty image"} />
      <Card.Body>
        <Card.Title className='text-center'> {service.type} </Card.Title>
      </Card.Body>
    </Card>


<Modal show={show} onHide={handleClose}>
<Modal.Header closeButton>
  <Modal.Title> {service.type}</Modal.Title>
</Modal.Header>
<Modal.Body>
    <Row>
        <Col>
        <img width={'100%'} typeof='file' src={service?`${baseUrl}/uploads/${service.serviceImage}` :"empty image"} alt="" />
        </Col>
        <Col>
        <h3>{service.title}</h3>
        <h5>Time Taken : {service.time}</h5>
        <h5>Price : &#8377; {service.price} </h5>
    <a onClick={()=>handleAddToWishlist (service)} >  <i className='fa-solid fa-heart fs-2 text-danger ms-4 me-4'></i> </a>
    
        <button onClick={()=>handleAddToBooking(service)} className='btn mt-4 bg-secondary  ms-5'>BOOK NOW</button>
        
        </Col>
    </Row>
</Modal.Body>

</Modal>
    </div>
  )
}

export default ServiceCard