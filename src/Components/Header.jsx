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

function Header() {
    const [openNav, setOpenNav] = useState(false);
  return (
    <div>
         <MDBNavbar fixed='top' bgColor='light' expand='lg' >
    <MDBContainer fluid >
      <MDBNavbarBrand href='/'>
      <h2 style={{fontFamily:'serif'}}>Magic Touch</h2>
      </MDBNavbarBrand>
      
      <MDBCollapse navbar open={openNav} >
        <MDBNavbarNav className='justify-content-evenly'>
          <MDBNavbarItem>
            <MDBNavbarLink active aria-current='page' href='#home'>
             <h4> Home</h4>
            </MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBNavbarLink href='#about'> <h4>About Us</h4> </MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBNavbarLink href='#services'> <h4>Services</h4> </MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBNavbarLink href='#testimonials'> <h4>Testimonials</h4> </MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
          <MDBNavbarLink href='#contact'> <h4>Contact</h4></MDBNavbarLink>
          </MDBNavbarItem>
          
        </MDBNavbarNav>
      </MDBCollapse>
      <a className='textDecoration-none btn  me-3' href="/login"> Login  <i className='fa-solid fa-sign-in textDecoration-none'></i> </a>
    </MDBContainer>

  </MDBNavbar>
  </div>
  )
}

export default Header