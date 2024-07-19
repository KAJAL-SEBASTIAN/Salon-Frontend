import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {Badge} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { deleteFromWishlist } from '../Redux/Slice/wishlistSlice';
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
import { addToBooking, deleteFromBooking, emptyBooking } from '../Redux/Slice/bookingSlice';
import { baseUrl } from '../services/baseUrl';
import { addBookingAPI } from '../services/allAPIs';

function Booking() {
 

//to hold date and time details 
const[bookingInputs,setBookingInputs]=useState({
  date:'',userTime:''
})
console.log(bookingInputs);


  const [openNav, setOpenNav] = useState(false);
      
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch()
  const handleBooking = (service)=>{
    //add to cart
    dispatch(addToBooking(service))
    //remove from wishlist
    dispatch(deleteFromWishlist(service.title))
  }

const wishlistArray = useSelector((state)=>state.wishlistReducer)
  const bookingArray=useSelector((state)=>state.bookingReducer)

//to hold total price of services
const [total,setTotal] =useState(0)

const getBookedTotal = ()=>{
  if(bookingArray.length>0){
    setTotal(bookingArray.map(service=>Number(service.price)).reduce((p1,p2)=>p1+p2))
  }
  else{
    setTotal(0)
  }
}

useEffect(()=>{
  getBookedTotal()
},[bookingArray])

   //to hold token from sessionStorage
   const [token,setToken] = useState("")

   //to get token
   useEffect(()=>{
    if(sessionStorage.getItem("token")){
     setToken(sessionStorage.getItem("token"))
    }
   },[])

const [bookedDetails,setBookedDetails] = useState({})
console.log(bookedDetails);

useEffect(()=>{
  setBookedDetails({
    services:bookingArray,date:bookingInputs.date,userTime:bookingInputs.userTime,totalServices:bookingArray.length,totalPrice:total
  });
},[bookingArray,bookingInputs,total])

const emptyBookingList=()=>{
  dispatch(emptyBooking())

}

const bookingAdd = async()=>{
//api call
const reqBody = {
services:bookedDetails.services,
date:bookedDetails.date,
userTime:bookedDetails.userTime,
totalServices:bookedDetails.totalServices,
totalPrice:bookedDetails.totalPrice
}

//let reqHeader
const reqHeader = {
"Content-Type":"application/json",
"Authorization":`Bearer ${token}`//to send token from client to server side
}
const result = await addBookingAPI(reqBody,reqHeader);
console.log(result);
if(result.status===200){
  alert("service booked")
  sessionStorage.setItem("token",result.data.token)
  console.log(result.data);
  emptyBookingList()
  setBookingInputs({
    date: '',
    userTime: '',
  });
}
else{
  console.log(result.response.data);
}

}

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
      <a  > <i  className='fa fa-arrow-right fs-3'></i></a>
      <Badge  style={{width:'40px',height:'30px'}}  className='bg-secondary'> {bookingArray.length} </Badge>
      </Link>
      </form>
    <a className='textDecoration-none btn  me-3' href="/login"> Logout  <i className='fa-solid fa-right-from-bracket textDecoration-none'></i> </a>
  </MDBNavbar>
      <Row style={{marginTop:'140px'}}>
        <h2 className='text-center'>My Bookings</h2>
        <Col>
        <table className='m-5 border border-2 text-center' style={{width:'600px'}}>
          <thead>
            <tr>
             <th  className='border border-2 p-2'>Id</th>
              <th className='border border-2 p-2'>Type</th>
              <th className='border border-2 p-2'>Title</th>
              <th className='border border-2 p-2'>Image</th>
              <th className='border border-2 p-2'>Time</th>
              <th className='border border-2 p-2'>Price</th>
              <th className='border border-2 p-2'>Action</th>
            </tr>
          </thead>
          <tbody>
           {
            bookingArray.length>0?bookingArray.map((service,index)=>(
              <tr style={{marginTop:'140px'}}  >
                <td className='border border-2'>{index+1}</td>
                <td className='border border-2'>{service.type}</td>
                <td className='border border-2'>{service.title}</td>
                <td  className='border border-2'>
                  <img src={`${baseUrl}/uploads/${service.serviceImage}`} alt="" />
                </td>
                <td className='border border-2'>{service.time}</td>
                <td className='border border-2'>{service.price}</td>
                  <td className='border border-2'><i onClick={()=>dispatch(deleteFromBooking(service.title))} className='fa-solid fa-trash text-danger'></i></td>
              </tr>
            )):"Empty Booking"
           }

          </tbody>
        </table>
        </Col>
        
        <Col>
        <div className=' shadow border m-5 text-center p-3 bg-light'>
          <h3  className='text-center m-3'>Booking Summary</h3>
          <input value={bookingInputs.date} onChange={e=>setBookingInputs({...bookingInputs,date:e.target.value})} type="date" className='form-control w-50 text-center mb-3' placeholder='Choose date' style={{marginLeft
          :'120px'}} />
          <input value={bookingInputs.userTime} onChange={e=>setBookingInputs({...bookingInputs,userTime:e.target.value})} type="time" name='time' className='form-control inputs time w-50 text-center mb-3' required placeholder='Choose time' style={{marginLeft
          :'120px'}} />
          <h6 >Total booked services : {bookingArray.length} </h6>
          <h6 >Total Price :{total} </h6>
          <div className='text-center m-4'>
            <button onClick={bookingAdd} className='btn btn-secondary text-dark'> Book</button>
          </div>
        </div>
        </Col>

      </Row>

    </div>
  )
}

export default Booking
