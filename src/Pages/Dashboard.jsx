import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import MyService from '../Components/MyService';
import AddService from '../Components/AddService';
import { Link } from 'react-router-dom';


function Dashboard() {

  const existingUser = JSON.parse(sessionStorage.getItem("existingUser"));

  return (
    <div className='m-2 '>
      <div >
<Row>

  <h1 className='mt-4'>Welcome <span className='text-secondary'> {existingUser.username}</span></h1>

  <div className='d-flex mt-1'>
            <h3 className='ms-3' > My Services</h3>
             <Link to={'/'}>
             <button style={{width:'80px'}} className='btn btn-primary float-end m-2'>Home</button>
             </Link>
            <div className=' ms-auto'>
     <AddService/>
            {/* Add service component */}
            </div>
              <Link to={'/allbooking'}>
           <button className='btn  btn-dark'> View Bookings</button>
           </Link>
        </div>
   <div className='d-flex ms-auto' style={{display:'flex',flexDirection:'row'}}>
   <MyService   />
  </div>
   

  {/* My Services */}
  
</Row>
      </div>
    </div>
  )
}

export default Dashboard