import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ServiceCard from '../Components/ServiceCard'
import { allServiceAPI } from '../services/allAPIs'
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
import {Badge} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { addToWishlist, deleteFromWishlist } from '../Redux/Slice/wishlistSlice'
import { addToBooking } from '../Redux/Slice/bookingSlice'

function Service({service}) {
  const bookingArray = useSelector((state)=>state.bookingReducer)
  const wishlistArray = useSelector((state)=>state.wishlistReducer)


  const dispatch = useDispatch()
  const handleBooking = (service)=>{
    //add to cart
    dispatch(addToBooking(service))
    //remove from wishlist
    dispatch(deleteFromWishlist(service.title))
  }
  const [openNav, setOpenNav] = useState(false);
    //to hold search value from the input box
  const [searchKey,setSearchKey] = useState("")
  console.log(searchKey);
     
  //api call to get service details
  const [allService,setAllService]= useState([])//to hold the all service details

  const getAllService=async()=>{
     const result = await allServiceAPI(searchKey)
     console.log(result);
     if(result.status===200){
        setAllService(result.data)
        console.log(allService);
     }
     else{
        console.log("Api fetching service details failed");
     }
  }

  useEffect(()=>{
   getAllService()
  },[searchKey])


    const existingUser = JSON.parse(sessionStorage.getItem("existingUser"));
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
      <a  >  <i className='fa-solid fa-heart fs-3 text-danger '></i> </a>
      <Badge className='bg-secondary ' style={{width:'40px',height:'30px'}}> {wishlistArray.length} </Badge>
      </Link>
      <Link to={'/booking'}>
      <a  > <i className='fa fa-arrow-right fs-3'></i></a>
      <Badge className='bg-secondary me-3' style={{width:'40px',height:'30px'}}> {bookingArray.length} </Badge>
      </Link>
      </form>
    <a className='textDecoration-none btn  me-3' href="/login"> Logout  <i className='fa-solid fa-right-from-bracket textDecoration-none'></i> </a>
  </MDBNavbar>
    <div  style={{marginTop:'110px'}}>
    
        <div className="container">
        <h1 >Welcome <span className='text-secondary'> {existingUser.username}</span></h1>
            <h2 className='text-center m-4'>All Services</h2>
            <div className='d-flex justify-content-center  w-100'>
                <div className='d-flex rounded mb-5 w-50'>
                    <input onChange={e=>setSearchKey(e.target.value)} type="text" placeholder='Search By Services' className='form-control' />
                    <i style={{marginLeft:'-30px'}} className='fa-solid fa-magnifying-glass fs-3 mt-1 me-5 text-secondary'></i>
                </div>

            </div>
<Row>
    {//array
        allService.length>0?allService.map(service=>(
            <Col>
              <ServiceCard  service={service}/> 
            </Col>
        )):"empty array"
    }

   
</Row>


        </div>
    </div>
    </div>
  )
}

export default Service