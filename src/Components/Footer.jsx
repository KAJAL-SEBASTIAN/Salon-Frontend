import React from 'react'
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

function Footer() {
  return (
    <div>
      <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>


      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <MDBContainer className='text-center text-md-start mt-3' style={{height:'280px'}}>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon  className="me-3 fa-solid fa-heart" />
                Magic Touch
              </h6>
              <p>
               "Beauty is a reflection of your soul and the kindness in your heart"
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Services</h6>
              <p>
                 Facial
               </p>
               <p>
                 Haircare
               </p>
               <p>
                 Wax
               </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>   <MDBIcon icon="envelope" className="me-2" /> Email</h6>
              <p>
                magictouch@gmail.com
                <MDBIcon icon="phone" className="me-3" />
                 8901562816
              </p>
              <br />
              <p>
              <MDBIcon icon="home" className="me-2" />
                Address <br />
                Ground Floor, Thoppil Estate, Sahodhaya Rd, Janatha, Vyttila, Ernakulam,
                 Kerala 682019 
              </p>
             
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Opening Hours</h6>
              <p>
              Monday - Friday: 7am - 10pm 
              </p>
              <p>
              Saturday: 8am - 10pm
              </p>
              <p>
              Sunday: 8am - 11pm
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2024 Copyright:
        <a className='text-reset fw-bold' href='#'>
          magictouch.com
        </a>
      </div>
    </MDBFooter>
    </div>
  )
}

export default Footer