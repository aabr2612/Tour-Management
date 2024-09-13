import React, { useEffect, useState, useContext } from "react";
import CommonSection from "../Shared/CommonSection";
import "../styles/Tour.css";
import Newsletter from "../Shared/Newsletter";
import { Container, Row, Col, Table, Button } from "reactstrap";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../context/AuthContext";
import "../styles/Mybookings.css"; 

const BookingTable = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(""); 

  // Fetch booking data from the API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/booking/${user.username}`);
        setBookings(response.data.data); 
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchBookings();
  }, [user.username]);

  // Handle delete booking
  const handleDelete = async (bookingId) => {
    
      try {
        await axios.delete(`${BASE_URL}/booking/${bookingId}`);
        setBookings(bookings.filter((booking) => booking._id !== bookingId));
        setMessage("Deleted successfully!"); // Set custom message
      } catch (error) {
        console.error("Failed to delete booking", error);
        setError(true);
        setMessage("Failed to delete booking. Please try again."); // Set error message
      }
    
  };

  useEffect(() => {
    // Hide message after 3 seconds
    if (message) {
      const timer = setTimeout(() => {
        setMessage(""); // Clear the message
      }, 7000);

      // Clean up timer on component unmount
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader" />
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  if (error) {
    return <div className="error__msg">Error loading booking details. Check your network</div>;
  }

  return (
    <div>
      <CommonSection title={"Booking Details"} />
      <section className="mt-4">
        <Container>
          <Row>
            <Col lg="12">
              <h2 className="table-heading">Your Booking Information</h2>
              {/* Display custom message if exists */}
              {message && (
                <div className={`custom-message show ${error ? "error" : "success"}`}>
                  {message}
                </div>
              )}
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Tour Name</th>
                    <th>Full Name</th>
                    <th>Group Size</th>
                    <th>Phone</th>
                    <th>Booking Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking, index) => (
                    <tr key={booking._id}>
                      <td>{index + 1}</td>
                      <td>{booking.tourName}</td>
                      <td>{booking.fullName}</td>
                      <td>{booking.groupSize}</td>
                      <td>{booking.phone}</td>
                      <td>{new Date(booking.bookAt).toLocaleDateString()}</td>
                      <td>
                        <Button
                          color="danger"
                          className="delete-btn"
                          onClick={() => handleDelete(booking._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter />
    </div>
  );
};

export default BookingTable;
