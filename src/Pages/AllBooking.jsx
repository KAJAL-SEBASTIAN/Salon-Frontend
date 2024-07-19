import React, { useEffect, useState } from 'react';
import { userBookingAPI } from '../services/allAPIs';
import { Col, Row } from 'react-bootstrap';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from 'mdb-react-ui-kit';
import { baseUrl } from '../services/baseUrl';
import { Link } from 'react-router-dom';

function AllBooking() {
  const [userBookings, setUserBookings] = useState([]);
  

  const getAllUsersBookings = async () => {
      const result = await userBookingAPI()
      console.log(result);
     if(result.status===200){
      setUserBookings(result.data)
      console.log(userBookings);
     }
     else{
      console.log("API fetching error");
     }
  };

  useEffect(() => {
    getAllUsersBookings();
  },[]);

  return (
    <div>
      <h2 className='text-center'>Bookings</h2>
    <Link to={'/admin-dashboard'}>
    <button className='btn btn-secondary float-end m-3'>Go Back</button>
    </Link>
      <Row>
        {userBookings.length > 0 ? (
          userBookings.map((booking) => (
            <Col key={booking._id} md={4} >
              <MDBCard className="ms-5 mt-3" style={{width:'300px',height:'300px'}} >
                <MDBCardBody>
                  <MDBCardTitle>
                    Booking Id: {booking._id} <br />
                    Scheduled Time: {booking.userTime}
                  </MDBCardTitle>
                  <MDBCardText>
                    <strong>Date:</strong> {booking.date}<br />
                    <strong>Total Service:</strong> {booking.totalServices}<br />
                    <strong>Total Price:</strong> {booking.totalPrice}<br />
                    <strong>Services:</strong>
                    {booking.services && booking.services.length > 0 ? (
      booking.services.map((service, index) => (
        <li key={index}>
          {service.title} - {service.type}
        </li>
      ))
    ) : (
      <p>No services found for this booking</p>
    )}
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </Col>
          ))
        ) : (
          <p>No bookings available</p>
        )}
      </Row>
    </div>
  );
}

export default AllBooking;
