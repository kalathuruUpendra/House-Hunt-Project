import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { message } from 'antd';

const Login = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    type: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data?.email || !data?.password) {
      return alert("Please fill all fields");
    } else {
      axios.post('http://localhost:8001/api/user/login', data)
        .then((res) => {
          if (res.data.success) {
            message.success(res.data.message);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            const isLoggedIn = JSON.parse(localStorage.getItem("user"));

            switch (isLoggedIn.type) {
              case "Admin":
                navigate("/adminhome");
                break;
              case "Renter":
                navigate("/renterhome");
                break;
              case "Owner":
                if (isLoggedIn.granted === 'ungranted') {
                  message.error('Your account is not yet confirmed by the admin');
                } else {
                  navigate("/ownerhome");
                }
                break;
              default:
                navigate("/login");
                break;
            }
            setTimeout(()=>{
              window.location.reload()
            },1000)
          } else {
            message.error(res.data.message);
          }
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            alert("User doesn't exist");
          }
          navigate("/login");
        });
    }
  };

  return (
    <>
      <Navbar 
        expand="lg" 
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
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
                  color: 'white',
                  fontWeight: '600',
                  textDecoration: 'none',
                  padding: '10px 20px',
                  borderRadius: '25px',
                  transition: 'all 0.3s ease',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                Home
              </Link>
              <Link 
                to={'/login'}
                style={{
                  color: 'white',
                  fontWeight: '600',
                  textDecoration: 'none',
                  padding: '10px 20px',
                  borderRadius: '25px',
                  transition: 'all 0.3s ease',
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)'
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
              >
                Register
              </Link>
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 20px 20px',
        position: 'relative'
      }}>
        <Container 
          component="main" 
          maxWidth={false}
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            borderRadius: '30px',
            border: '1px solid #bbb',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
            padding: '40px',
            animation: 'fadeInUp 0.8s ease-out',
            maxWidth: '500px', // Plus étroit
            margin: '0 auto'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar 
              sx={{ 
                bgcolor: 'transparent',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                width: 80,
                height: 80,
                marginBottom: 3,
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
              }}
            >
              <LockOutlinedIcon sx={{ fontSize: 40, color: "#222" }} />
            </Avatar>
            <Typography 
              component="h1" 
              variant="h4"
              sx={{
                color: "#222", // Texte noir
                fontWeight: 800,
                marginBottom: 4,
                textAlign: 'center'
              }}
            >
              Welcome Back
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>

              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={data.email}
                onChange={handleChange}
                autoComplete="email"
                autoFocus
                sx={{
                  '& .MuiOutlinedInput-root': {
                    background: '#f7f7f7',
                    borderRadius: '15px',
                    '& fieldset': {
                      borderColor: '#bbb',
                      borderWidth: 2
                    },
                    '&:hover fieldset': {
                      borderColor: '#888',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#667eea',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#555',
                    fontWeight: 600
                  },
                  '& .MuiInputBase-input': {
                    color: '#222',
                    fontWeight: 500,
                    padding: '15px'
                  }
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                value={data.password}
                onChange={handleChange}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    background: '#f7f7f7',
                    borderRadius: '15px',
                    '& fieldset': {
                      borderColor: '#bbb',
                      borderWidth: 2
                    },
                    '&:hover fieldset': {
                      borderColor: '#888',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#667eea',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#555',
                    fontWeight: 600
                  },
                  '& .MuiInputBase-input': {
                    color: '#222',
                    fontWeight: 500,
                    padding: '15px'
                  }
                }}
              />
              <Box mt={4}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    borderRadius: '15px',
                    padding: '15px',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    textTransform: 'none',
                    color: '#222',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 35px rgba(0, 0, 0, 0.15)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Sign In
                </Button>
              </Box>
              <Grid container spacing={2} sx={{ mt: 3 }}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ color: '#333' }}>
                    Forgot password?
                    <Link 
                      style={{ 
                        color: "#f5576c", 
                        marginLeft: '5px',
                        fontWeight: 600,
                        textDecoration: 'none'
                      }} 
                      to={'/forgotpassword'}
                    >
                      Click here
                    </Link>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ color: '#333' }}>
                    Need an account?
                    <Link 
                      style={{ 
                        color: "#667eea", 
                        marginLeft: '5px',
                        fontWeight: 600,
                        textDecoration: 'none'
                      }} 
                      to={'/register'}
                    >
                      Sign Up
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </div>
    </>
  )
}

export default Login
