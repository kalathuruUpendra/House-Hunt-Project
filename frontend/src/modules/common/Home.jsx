import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav, Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import p1 from '../../images/p1.jpg'
import p2 from '../../images/p2.jpg'
import p3 from '../../images/p3.jpg'
import p4 from '../../images/p4.jpg'
import AllPropertiesCards from '../user/AllPropertiesCards';

const Home = () => {
   const [index, setIndex] = useState(0);
   const [scrolled, setScrolled] = useState(false);

   const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
   };

   useEffect(() => {
      const handleScroll = () => {
         const isScrolled = window.scrollY > 10;
         setScrolled(isScrolled);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   return (
      <>
         <Navbar 
            expand="lg" 
            className={`modern-navbar ${scrolled ? 'scrolled' : ''}`}
            style={{
               background: scrolled 
                  ? 'rgba(255, 255, 255, 0.95)' 
                  : 'rgba(255, 255, 255, 0.1)',
               backdropFilter: 'blur(20px)',
               borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
               transition: 'all 0.3s ease',
               position: 'fixed',
               top: 0,
               width: '100%',
               zIndex: 1000,
               padding: '15px 0'
            }}
         >
            <Container fluid>
               <Navbar.Brand>
                  <h2 style={{
                     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                     WebkitBackgroundClip: 'text',
                     WebkitTextFillColor: 'transparent',
                     backgroundClip: 'text',
                     fontWeight: '800',
                     fontSize: '2rem',
                     margin: 0
                  }}>
                     🏠 HouseHunt
                  </h2>
               </Navbar.Brand>
               <Navbar.Toggle aria-controls="navbarScroll" />
               <Navbar.Collapse id="navbarScroll">
                  <Nav
                     className="me-auto my-2 my-lg-0"
                     style={{ maxHeight: '100px' }}
                     navbarScroll
                  >
                  </Nav>
                  <Nav style={{ gap: '20px' }}>
                     <Link 
                        to={'/'} 
                        style={{
                           color: scrolled ? '#333' : 'white',
                           fontWeight: '600',
                           textDecoration: 'none',
                           padding: '10px 20px',
                           borderRadius: '25px',
                           transition: 'all 0.3s ease',
                           background: 'rgba(255, 255, 255, 0.1)',
                           backdropFilter: 'blur(10px)'
                        }}
                        onMouseEnter={(e) => {
                           e.target.style.transform = 'translateY(-2px)';
                           e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                           e.target.style.transform = 'translateY(0)';
                           e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                        }}
                     >
                        Home
                     </Link>
                     <Link 
                        to={'/login'}
                        style={{
                           color: scrolled ? '#333' : 'white',
                           fontWeight: '600',
                           textDecoration: 'none',
                           padding: '10px 20px',
                           borderRadius: '25px',
                           transition: 'all 0.3s ease',
                           background: 'rgba(255, 255, 255, 0.1)',
                           backdropFilter: 'blur(10px)'
                        }}
                        onMouseEnter={(e) => {
                           e.target.style.transform = 'translateY(-2px)';
                           e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                           e.target.style.transform = 'translateY(0)';
                           e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                        }}
                     >
                        Login
                     </Link>
                     <Link 
                        to={'/register'}
                        style={{
                           color: 'white',
                           fontWeight: '600',
                           textDecoration: 'none',
                           padding: '10px 25px',
                           borderRadius: '25px',
                           transition: 'all 0.3s ease',
                           background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                           boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                        }}
                        onMouseEnter={(e) => {
                           e.target.style.transform = 'translateY(-2px)';
                           e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                           e.target.style.transform = 'translateY(0)';
                           e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                        }}
                     >
                        Register
                     </Link>
                  </Nav>

               </Navbar.Collapse>
            </Container>
         </Navbar>


         <div style={{ background: '#f4f4f4', minHeight: '100vh', paddingTop: '90px' }}>
            <div className='home-body'>
               <Carousel 
                  activeIndex={index} 
                  onSelect={handleSelect}
                  interval={5000}
                  pause={false}
                  style={{ height: '100%' }}
               >
                  <Carousel.Item>
                    <img
                      src={p1}
                      alt="Luxury Modern Properties"
                      style={{
                        filter: 'brightness(1)',
                        transition: 'transform 8s ease-in-out'
                      }}
                    />
                    <div
                      className="content-home"
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        height: '100%',
                        width: '55%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-start',
                        padding: '60px 60px 0 0',
                        zIndex: 2,
                        pointerEvents: 'none'
                      }}
                    >
                      <p style={{
                        fontSize: '3.2rem',
                        fontWeight: 900,
                        marginBottom: 18,
                        color: '#f8fafc',
                        letterSpacing: '1px',
                        textAlign: 'right',
                        textShadow: '0 4px 24px rgba(31,38,135,0.18), 0 1px 2px #2222'
                      }}>
                        Unlock Your Dream Home
                      </p>
                      <div className="hero-subtitle" style={{
                        fontSize: '1.35rem',
                        color: '#e0e7ff',
                        fontWeight: 500,
                        marginBottom: 28,
                        maxWidth: 480,
                        lineHeight: 1.5,
                        textAlign: 'right',
                        textShadow: '0 2px 8px rgba(31,38,135,0.10)'
                      }}>
                        Discover handpicked luxury homes and modern spaces that fit your lifestyle. Your perfect match is just a click away.
                      </div>
                      <div style={{ pointerEvents: 'auto' }}>
                        <Link to="/register" className="hero-cta">
                          <span style={{
                            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                            color: '#222',
                            fontWeight: 700,
                            borderRadius: 20,
                            padding: '12px 38px',
                            fontSize: '1.2rem',
                            boxShadow: '0 4px 18px rgba(31,38,135,0.10)',
                            textDecoration: 'none'
                          }}>
                            Start Your Journey
                          </span>
                        </Link>
                      </div>
                    </div>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      src={p2}
                      alt="Premium Real Estate"
                      style={{
                        filter: 'brightness(0.8)',
                        transition: 'transform 8s ease-in-out'
                      }}
                    />
                    <div
                      className="content-home"
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        height: '100%',
                        width: '55%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-start',
                        padding: '60px 60px 0 0',
                        zIndex: 2,
                        pointerEvents: 'none'
                      }}
                    >
                      <p style={{
                        fontSize: '3.2rem',
                        fontWeight: 900,
                        marginBottom: 18,
                        color: '#f8fafc',
                        letterSpacing: '1px',
                        textAlign: 'right',
                        textShadow: '0 4px 24px rgba(31,38,135,0.18), 0 1px 2px #2222'
                      }}>
                        Live Where It Matters
                      </p>
                      <div className="hero-subtitle" style={{
                        fontSize: '1.35rem',
                        color: '#e0e7ff',
                        fontWeight: 500,
                        marginBottom: 28,
                        maxWidth: 480,
                        lineHeight: 1.5,
                        textAlign: 'right',
                        textShadow: '0 2px 8px rgba(31,38,135,0.10)'
                      }}>
                        Explore homes in top neighborhoods with world-class amenities and vibrant communities.
                      </div>
                      <div style={{ pointerEvents: 'auto' }}>
                        <Link to="/login" className="hero-cta">
                          <span style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: '#fff',
                            fontWeight: 700,
                            borderRadius: 20,
                            padding: '12px 38px',
                            fontSize: '1.2rem',
                            boxShadow: '0 4px 18px rgba(31,38,135,0.10)',
                            textDecoration: 'none'
                          }}>
                            Browse Properties
                          </span>
                        </Link>
                      </div>
                    </div>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      src={p3}
                      alt="Modern Architecture"
                      style={{
                        filter: 'brightness(0.8)',
                        transition: 'transform 8s ease-in-out'
                      }}
                    />
                    <div
                      className="content-home"
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        height: '100%',
                        width: '55%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-start',
                        padding: '60px 60px 0 0',
                        zIndex: 2,
                        pointerEvents: 'none'
                      }}
                    >
                      <p style={{
                        fontSize: '3.2rem',
                        fontWeight: 900,
                        marginBottom: 18,
                        color: '#f8fafc',
                        letterSpacing: '1px',
                        textAlign: 'right',
                        textShadow: '0 4px 24px rgba(31,38,135,0.18), 0 1px 2px #2222'
                      }}>
                        Experience Smart Living
                      </p>
                      <div className="hero-subtitle" style={{
                        fontSize: '1.35rem',
                        color: '#e0e7ff',
                        fontWeight: 500,
                        marginBottom: 28,
                        maxWidth: 480,
                        lineHeight: 1.5,
                        textAlign: 'right',
                        textShadow: '0 2px 8px rgba(31,38,135,0.10)'
                      }}>
                        Step into the future with smart homes featuring advanced technology and sustainable design.
                      </div>
                      <div style={{ pointerEvents: 'auto' }}>
                        <Link to="/register" className="hero-cta">
                          <span style={{
                            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                            color: '#fff',
                            fontWeight: 700,
                            borderRadius: 20,
                            padding: '12px 38px',
                            fontSize: '1.2rem',
                            boxShadow: '0 4px 18px rgba(31,38,135,0.10)',
                            textDecoration: 'none'
                          }}>
                            Learn More
                          </span>
                        </Link>
                      </div>
                    </div>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      src={p4}
                      alt="Exclusive Properties"
                      style={{
                        filter: 'brightness(0.8)',
                        transition: 'transform 8s ease-in-out'
                      }}
                    />
                    <div
                      className="content-home"
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        height: '100%',
                        width: '55%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-start',
                        padding: '60px 60px 0 0',
                        zIndex: 2,
                        pointerEvents: 'none'
                      }}
                    >
                      <p style={{
                        fontSize: '3.2rem',
                        fontWeight: 900,
                        marginBottom: 18,
                        color: '#f8fafc',
                        letterSpacing: '1px',
                        textAlign: 'right',
                        textShadow: '0 4px 24px rgba(31,38,135,0.18), 0 1px 2px #2222'
                      }}>
                        Get Exclusive Access
                      </p>
                      <div className="hero-subtitle" style={{
                        fontSize: '1.35rem',
                        color: '#e0e7ff',
                        fontWeight: 500,
                        marginBottom: 28,
                        maxWidth: 480,
                        lineHeight: 1.5,
                        textAlign: 'right',
                        textShadow: '0 2px 8px rgba(31,38,135,0.10)'
                      }}>
                        Unlock special deals and off-market listings before anyone else. Be the first to know.
                      </div>
                      <div style={{ pointerEvents: 'auto' }}>
                        <Link to="/register" className="hero-cta">
                          <span style={{
                            background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                            color: '#222',
                            fontWeight: 700,
                            borderRadius: 20,
                            padding: '12px 38px',
                            fontSize: '1.2rem',
                            boxShadow: '0 4px 18px rgba(31,38,135,0.10)',
                            textDecoration: 'none'
                          }}>
                            Join Now
                          </span>
                        </Link>
                      </div>
                    </div>
                  </Carousel.Item>
               </Carousel>
            </div>

            {/* Enhanced Hero Section in English */}
            <section
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
                padding: '70px 0 40px 0',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                zIndex: 2,
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.04)'
              }}
            >
              <h1
                style={{
                  fontSize: '3.2rem',
                  fontWeight: 900,
                  background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '18px',
                  letterSpacing: '1px',
                  textAlign: 'center',
                  lineHeight: 1.1
                }}
              >
                Find Your <span style={{ color: '#f5576c', WebkitTextFillColor: 'unset', background: 'unset' }}>Perfect Home</span><br />
                With Ease and Confidence
              </h1>
              <p
                style={{
                  fontSize: '1.35rem',
                  color: '#444',
                  fontWeight: 500,
                  marginBottom: '32px',
                  maxWidth: '700px',
                  textAlign: 'center',
                  lineHeight: 1.7,
                  letterSpacing: '0.2px'
                }}
              >
                Discover thousands of modern properties, handpicked to fit every lifestyle. Whether you’re searching for a cozy apartment, a luxury villa, or a downtown studio, HouseHunt helps you find the right place, faster and smarter.
              </p>
              <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  <Button
                    style={{
                      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                      border: 'none',
                      borderRadius: '25px',
                      padding: '14px 36px',
                      fontWeight: '700',
                      fontSize: '1.15rem',
                      color: '#222',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.13)',
                      transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
                      marginBottom: '8px'
                    }}
                    onMouseEnter={e => {
                      e.target.style.transform = 'translateY(-3px)';
                      e.target.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.18)';
                    }}
                    onMouseLeave={e => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.13)';
                    }}
                  >
                    Start By Registering as Owner
                  </Button>
                </Link>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="outlined"
                    style={{
                      border: '2px solid #667eea',
                      borderRadius: '25px',
                      padding: '14px 36px',
                      fontWeight: '700',
                      fontSize: '1.15rem',
                      color: '#667eea',
                      background: '#fff',
                      boxShadow: '0 4px 15px rgba(102,126,234,0.08)',
                      transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
                      marginBottom: '8px'
                    }}
                    onMouseEnter={e => {
                      e.target.style.background = '#f4f6fa';
                      e.target.style.color = '#222';
                    }}
                    onMouseLeave={e => {
                      e.target.style.background = '#fff';
                      e.target.style.color = '#667eea';
                    }}
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
              <div style={{
                marginTop: '38px',
                color: '#888',
                fontSize: '1.08rem',
                fontWeight: 500,
                textAlign: 'center'
              }}>
                <span>Are you a property owner? </span>
                <Link to="/register" style={{ color: '#f5576c', fontWeight: 700, textDecoration: 'none' }}>
                  List your property for free
                </Link>
              </div>
            </section>

            {/* Section propriétés */}
            <div className='property-content'>
               <Container style={{ position: 'relative', zIndex: 1, marginTop: '40px' }}>
                  <AllPropertiesCards />
               </Container>
            </div>
         </div>
      </>
   )
}

export default Home
