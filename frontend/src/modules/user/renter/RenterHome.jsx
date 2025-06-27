import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import { UserContext } from '../../../App';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AllPropertiesCards from '../AllPropertiesCards';
import AllProperty from './AllProperties';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const RenterHome = () => {
  const user = useContext(UserContext)
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!user) {
    return null
  }

  const handleLogOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f4f6fa',
      fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif"
    }}>
      <Navbar expand="lg" style={{
        background: 'rgba(255,255,255,0.95)',
        borderBottom: '1px solid #e0e0e0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        padding: '10px 0'
      }}>
        <Container fluid>
          <Navbar.Brand>
            <h2 style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: '800',
              fontSize: '2rem',
              margin: 0,
              letterSpacing: '1px'
            }}>
              🏠 HouseHunt
            </h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll />
            <Nav style={{ alignItems: 'center', gap: '20px' }}>
              <span style={{
                fontWeight: 600,
                color: '#333',
                fontSize: '1.1rem',
                marginRight: '10px'
              }}>
                Hello, {user.userData.name}
              </span>
              <Link
                onClick={handleLogOut}
                to={'/'}
                style={{
                  color: '#fff',
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  padding: '8px 22px',
                  borderRadius: '20px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  transition: 'background 0.2s'
                }}
              >
                Log Out
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Box sx={{
        width: '100%',
        maxWidth: 1500,
        margin: '40px auto 0 auto',
        background: '#fff',
        borderRadius: '24px',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.08)',
        padding: { xs: 2, md: 4 },
        minHeight: '70vh'
      }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            textColor="primary"
            indicatorColor="primary"
            sx={{
              '& .MuiTab-root': {
                fontWeight: 700,
                fontSize: '1.1rem',
                fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif",
                color: '#555'
              },
              '& .Mui-selected': {
                color: '#667eea !important'
              },
              '& .MuiTabs-indicator': {
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                height: 4,
                borderRadius: 2
              }
            }}
          >
            <Tab label="All Properties" {...a11yProps(0)} />
            <Tab label="Booking History" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Container>
            <AllPropertiesCards loggedIn={user.userLoggedIn} />
          </Container>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Container>
            <AllProperty />
          </Container>
        </CustomTabPanel>
      </Box>
    </div>
  )
}

export default RenterHome

