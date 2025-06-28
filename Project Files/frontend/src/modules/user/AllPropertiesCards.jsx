import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Card, Modal, Carousel, Col, Form, InputGroup, Row, Spinner, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { message } from 'antd';

const AllPropertiesCards = ({ loggedIn }) => {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [allProperties, setAllProperties] = useState([]);
  const [filterPropertyType, setPropertyType] = useState('');
  const [filterPropertyAdType, setPropertyAdType] = useState('');
  const [filterPropertyAddress, setPropertyAddress] = useState('');
  const [propertyOpen, setPropertyOpen] = useState(null);
  const [userDetails, setUserDetails] = useState({ fullName: '', phone: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleClose = () => setShow(false);

  const handleShow = (propertyId) => {
    setPropertyOpen(propertyId);
    setShow(true);
  };

  const getAllProperties = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:8001/api/user/getAllProperties');
      setAllProperties(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (status, propertyId, ownerId) => {
    try {
      const res = await axios.post(
        `http://localhost:8001/api/user/bookinghandle/${propertyId}`,
        { userDetails, status, ownerId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        handleClose();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProperties();
  }, []);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const filteredProperties = allProperties
    .filter((property) => filterPropertyAddress === '' || property.propertyAddress.toLowerCase().includes(filterPropertyAddress.toLowerCase()))
    .filter((property) => filterPropertyAdType === '' || property.propertyAdType.toLowerCase().includes(filterPropertyAdType.toLowerCase()))
    .filter((property) => filterPropertyType === '' || property.propertyType.toLowerCase().includes(filterPropertyType.toLowerCase()));

  return (
    <Container className="my-4">
      <h3 className="text-center mb-4">Explore Properties</h3>

      {/* Filters */}
      <Row className="g-3 justify-content-center mb-4">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search by Address"
            value={filterPropertyAddress}
            onChange={(e) => setPropertyAddress(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Select value={filterPropertyAdType} onChange={(e) => setPropertyAdType(e.target.value)}>
            <option value="">All Ad Types</option>
            <option value="sale">Sale</option>
            <option value="rent">Rent</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select value={filterPropertyType} onChange={(e) => setPropertyType(e.target.value)}>
            <option value="">All Property Types</option>
            <option value="commercial">Commercial</option>
            <option value="land/plot">Land/Plot</option>
            <option value="residential">Residential</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Properties */}
      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : filteredProperties.length > 0 ? (
        <Row className="g-4 justify-content-center">
          {filteredProperties.map((property) => (
            <Col md={4} lg={3} key={property._id}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={`http://localhost:8001${property.propertyImage[0]?.path}`}
                  alt="Property"
                  style={{ height: '180px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title className="text-truncate">{property.propertyAddress}</Card.Title>
                  <Card.Text>
                    <small><b>Type:</b> {property.propertyType}</small><br />
                    <small><b>Ad:</b> {property.propertyAdType}</small><br />
                    {loggedIn && (
                      <>
                        <small><b>Owner:</b> {property.ownerContact}</small><br />
                        <small><b>Status:</b> {property.isAvailable}</small><br />
                        <small><b>Amount:</b> ₹{property.propertyAmt}</small>
                      </>
                    )}
                  </Card.Text>

                  {loggedIn ? (
                    property.isAvailable === "Available" ? (
                      <>
                        <Button size="sm" variant="outline-primary" onClick={() => handleShow(property._id)}>Get Info</Button>
                        <Modal show={show && propertyOpen === property._id} onHide={handleClose} size="lg">
                          <Modal.Header closeButton>
                            <Modal.Title>Property Details</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Carousel activeIndex={index} onSelect={handleSelect}>
                              {property.propertyImage.map((img, idx) => (
                                <Carousel.Item key={idx}>
                                  <img
                                    src={`http://localhost:8001${img.path}`}
                                    alt={`Property ${idx + 1}`}
                                    className="d-block w-100"
                                    style={{ height: '300px', objectFit: 'cover' }}
                                  />
                                </Carousel.Item>
                              ))}
                            </Carousel>
                            <Row className="mt-3">
                              <Col>
                                <p><b>Owner Contact:</b> {property.ownerContact}</p>
                                <p><b>Availability:</b> {property.isAvailable}</p>
                                <p><b>Price:</b> ₹{property.propertyAmt}</p>
                              </Col>
                              <Col>
                                <p><b>Location:</b> {property.propertyAddress}</p>
                                <p><b>Type:</b> {property.propertyType}</p>
                                <p><b>Ad Type:</b> {property.propertyAdType}</p>
                              </Col>
                            </Row>
                            <p><b>Additional Info:</b> {property.additionalInfo}</p>
                            <hr />
                            <h5>Your Details</h5>
                            <Form onSubmit={(e) => {
                              e.preventDefault();
                              handleBooking('pending', property._id, property.ownerId);
                            }}>
                              <Row>
                                <Col md={6}>
                                  <Form.Group>
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                      required
                                      name="fullName"
                                      value={userDetails.fullName}
                                      onChange={handleChange}
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md={6}>
                                  <Form.Group>
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control
                                      required
                                      name="phone"
                                      type="tel"
                                      value={userDetails.phone}
                                      onChange={handleChange}
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>
                              <Button className="mt-3" type="submit" variant="success">Book Property</Button>
                            </Form>
                          </Modal.Body>
                        </Modal>
                      </>
                    ) : (
                      <Button size="sm" variant="outline-secondary" disabled>Not Available</Button>
                    )
                  ) : (
                    <>
                      <small className="text-muted d-block mb-2">Login to view contact details</small>
                      <Link to="/login">
                        <Button size="sm" variant="outline-dark">Get Info</Button>
                      </Link>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center mt-5">No properties found.</p>
      )}
    </Container>
  );
};

export default AllPropertiesCards;
