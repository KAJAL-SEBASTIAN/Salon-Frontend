import React, { useState } from 'react'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBIcon,
    MDBCollapse
  } from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { baseUrl } from '../services/baseUrl';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { deleteFromWishlist } from '../Redux/Slice/wishlistSlice';
import Button from 'react-bootstrap/Button';
import { addToBooking } from '../Redux/Slice/bookingSlice';
import {Badge} from 'react-bootstrap'

function Wishlist({service}) {
  
  const handleBooking = (service)=>{
    //add to cart
    dispatch(addToBooking(service))
    //remove from wishlist
    dispatch(deleteFromWishlist(service.title))
  }
   const bookingArray = useSelector((state)=>state.bookingReducer)
 const [openNav, setOpenNav] = useState(false);
      
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

const wishlistArray = useSelector((state)=>state.wishlistReducer)
const dispatch = useDispatch()
  return (
    <div>
        <MDBNavbar fixed='top' bgColor='light' expand='lg' >
    <MDBContainer fluid >
      <MDBNavbarBrand href='/'>
      <h2 style={{fontFamily:'serif'}}>Magic Touch</h2>
      </MDBNavbarBrand>
      <MDBCollapse navbar open={openNav} >
      </MDBCollapse>
    </MDBContainer>
    <form className='d-flex w-auto'>
    <Link to={'/wishlist'}>
      <a >  <i className='fa-solid fa-heart fs-3 text-danger '></i> </a>
      <Badge className='bg-secondary ' style={{width:'40px',height:'30px'}}> {wishlistArray.length} </Badge>
      </Link>
      <Link to={'/booking'}>
      <a onClick={()=>handleBooking(service)}  > <i className='fa fa-arrow-right fs-3'></i></a>
      <Badge className='bg-secondary'  style={{width:'40px',height:'30px'}}> {bookingArray.length} </Badge>
      </Link>
      </form>
    <a className='textDecoration-none btn  me-3' href="/login"> Logout  <i className='fa-solid fa-right-from-bracket textDecoration-none'></i> </a>
  </MDBNavbar>

<div style={{marginTop:'140px'}}>
  <h1 className='text-center'>My Wishlists</h1>
  <Row className='m-4'>
    {
      wishlistArray.length>0?wishlistArray.map((service)=>(
        <Col>
        <Card onClick={handleShow} style={{ width: '250px',height:'230px'}} className='mb-3'>

      <Card.Img variant="top" height={'180px'}  src={service?`${baseUrl}/uploads/${service.serviceImage}` :"empty image"} />
      <Card.Body>
        <Card.Title className='text-center'> {service.type}: {service.title} </Card.Title>
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
        <button onClick={()=>dispatch(deleteFromWishlist(service.title))} className='btn mt-4 bg-secondary'> <i className='fa-solid fa-trash text-danger'></i></button>
      
        <a onClick={()=>handleBooking(service)} className='btn mt-4 bg-secondary  ms-5'>BOOOK NOW</a>

        
        </Col>
    </Row>
</Modal.Body> 
</Modal>
        </Col>
      )):
      <div className='text-center'>
        <img src="https://www.abayakart.com/assets/images/mobile/emptywishlist.svg" alt="" className='mt-4'/>
        <h4>Back to Home</h4>
        <Link to={'/user-dashboard'}>
        <button className='btn '>Home</button>
        </Link>
      </div>
    }
  </Row>
</div>

    </div>
  )
}

export default Wishlist