import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Card, Modal, Carousel, Col, Form, InputGroup, Row, Spinner, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import { motion } from 'framer-motion';

const EnhancedAllPropertiesCards = ({ loggedIn }) => {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <Container className="my-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-5"
      >
        <h3 style={{
          fontSize: '3rem',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '1rem'
        }}>
          Explore Premium Properties
        </h3>
        <p style={{
          fontSize: '1.2rem',
          color: 'rgba(255, 255, 255, 0.8)',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Discover your perfect home from our curated collection of luxury properties
        </p>
      </motion.div>

      {/* Enhanced Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="filter-container"
      >
        <Form.Control
          type="text"
          placeholder="🔍 Search by Address"
          value={filterPropertyAddress}
          onChange={(e) => setPropertyAddress(e.target.value)}
        />
        <Form.Select value={filterPropertyAdType} onChange={(e) => setPropertyAdType(e.target.value)}>
          <option value="">All Ad Types</option>
          <option value="sale">For Sale</option>
          <option value="rent">For Rent</option>
        </Form.Select>
        <Form.Select value={filterPropertyType} onChange={(e) => setPropertyType(e.target.value)}>
          <option value="">All Property Types</option>
          <option value="commercial">Commercial</option>
          <option value="land/plot">Land/Plot</option>
          <option value="residential">Residential</option>
        </Form.Select>
      </motion.div>

      {/* Enhanced Properties Grid */}
      {loading ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-5"
        >
          <div className="loading-spinner"></div>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginTop: '1rem' }}>
            Loading amazing properties for you...
          </p>
        </motion.div>
      ) : filteredProperties.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="property-content"
        >
          {filteredProperties.map((property, propertyIndex) => (
            <motion.div
              key={property._id}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                scale: 1.03,
                rotateY: 5
              }}
              whileTap={{ scale: 0.98 }}
              className="glass-card property-card"
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <motion.img
                  src={`http://localhost:8001${property.propertyImage[0]?.path}`}
                  alt="Property"
                  style={{ 
                    width: '100%',
                    height: '250px', 
                    objectFit: 'cover',
                    borderRadius: '15px 15px 0 0'
                  }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '8px 15px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  textTransform: 'capitalize'
                }}>
                  {property.propertyAdType}
                </div>
              </div>
              
              <div style={{ padding: '1.5rem' }}>
                <motion.h5 
                  style={{
                    color: 'white',
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    marginBottom: '1rem',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: propertyIndex * 0.1 }}
                >
                  📍 {property.propertyAddress}
                </motion.h5>
                
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Type:</span>
                    <span style={{ 
                      color: 'white',
                      fontWeight: '600',
                      textTransform: 'capitalize'
                    }}>
                      {property.propertyType}
                    </span>
                  </div>
                  
                  {loggedIn && (
                    <>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        marginBottom: '0.5rem'
                      }}>
                        <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Status:</span>
                        <span style={{ 
                          color: property.isAvailable === 'Available' ? '#4ade80' : '#ef4444',
                          fontWeight: '600'
                        }}>
                          {property.isAvailable}
                        </span>
                      </div>
                      
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        marginBottom: '1rem'
                      }}>
                        <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Price:</span>
                        <span style={{ 
                          color: '#fbbf24',
                          fontWeight: '700',
                          fontSize: '1.1rem'
                        }}>
                          ₹{property.propertyAmt}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {loggedIn ? (
                  property.isAvailable === "Available" ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-modern"
                      onClick={() => handleShow(property._id)}
                      style={{
                        width: '100%',
                        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                        border: 'none',
                        padding: '12px 20px',
                        borderRadius: '25px',
                        color: 'white',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      View Details & Book
                    </motion.button>
                  ) : (
                    <div style={{
                      textAlign: 'center',
                      padding: '12px',
                      background: 'rgba(255, 0, 0, 0.1)',
                      borderRadius: '15px',
                      color: '#ef4444',
                      fontWeight: '600'
                    }}>
                      Not Available
                    </div>
                  )
                ) : (
                  <div style={{
                    textAlign: 'center',
                    padding: '12px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '15px',
                    color: 'rgba(255, 255, 255, 0.8)'
                  }}>
                    <Link to="/login" style={{ color: '#4facfe', textDecoration: 'none' }}>
                      Login to view details
                    </Link>
                  </div>
                )}
              </div>

              {/* Enhanced Modal */}
              <Modal show={show && propertyOpen === property._id} onHide={handleClose} size="lg">
                <Modal.Header 
                  closeButton 
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none'
                  }}
                >
                  <Modal.Title style={{ fontWeight: '700' }}>🏠 Property Details</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#1a1a1a', color: 'white' }}>
                  <Carousel activeIndex={index} onSelect={handleSelect} style={{ marginBottom: '2rem' }}>
                    {property.propertyImage.map((img, idx) => (
                      <Carousel.Item key={idx}>
                        <img
                          src={`http://localhost:8001${img.path}`}
                          alt={`Property ${idx + 1}`}
                          className="d-block w-100"
                          style={{ 
                            height: '300px', 
                            objectFit: 'cover',
                            borderRadius: '15px'
                          }}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                  
                  <Row className="mb-4">
                    <Col md={6}>
                      <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                        <h6 style={{ color: '#4facfe', marginBottom: '1rem' }}>Property Information</h6>
                        <p><strong>Owner Contact:</strong> {property.ownerContact}</p>
                        <p><strong>Availability:</strong> {property.isAvailable}</p>
                        <p><strong>Price:</strong> ₹{property.propertyAmt}</p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                        <h6 style={{ color: '#4facfe', marginBottom: '1rem' }}>Location & Details</h6>
                        <p><strong>Location:</strong> {property.propertyAddress}</p>
                        <p><strong>Type:</strong> {property.propertyType}</p>
                        <p><strong>Ad Type:</strong> {property.propertyAdType}</p>
                      </div>
                    </Col>
                  </Row>
                  
                  <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                    <h6 style={{ color: '#4facfe', marginBottom: '1rem' }}>Additional Information</h6>
                    <p>{property.additionalInfo}</p>
                  </div>
                  
                  <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <h5 style={{ color: '#4facfe', marginBottom: '1.5rem' }}>📋 Your Booking Details</h5>
                    <Form onSubmit={(e) => {
                      e.preventDefault();
                      handleBooking('pending', property._id, property.ownerId);
                    }}>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Full Name</Form.Label>
                            <Form.Control
                              required
                              name="fullName"
                              value={userDetails.fullName}
                              onChange={handleChange}
                              style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                color: 'white',
                                borderRadius: '10px'
                              }}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Phone</Form.Label>
                            <Form.Control
                              required
                              name="phone"
                              value={userDetails.phone}
                              onChange={handleChange}
                              style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                color: 'white',
                                borderRadius: '10px'
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn-modern"
                        style={{
                          width: '100%',
                          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                          border: 'none',
                          padding: '15px',
                          borderRadius: '25px',
                          color: 'white',
                          fontWeight: '600',
                          fontSize: '1.1rem'
                        }}
                      >
                        📋 Submit Booking Request
                      </motion.button>
                    </Form>
                  </div>
                </Modal.Body>
              </Modal>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-5"
        >
          <div style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'var(--backdrop-blur)',
            borderRadius: 'var(--border-radius)',
            padding: '3rem',
            border: '1px solid var(--glass-border)'
          }}>
            <h4 style={{ color: 'white', marginBottom: '1rem' }}>No Properties Found</h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Try adjusting your search filters to find more properties
            </p>
          </div>
        </motion.div>
      )}
    </Container>
  );
};

export default EnhancedAllPropertiesCards;