import { message } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const AllProperty = () => {
   const [allProperties, setAllProperties] = useState([]);

   const getAllProperty = async () => {
      try {
         const response = await axios.get('http://localhost:8001/api/admin/getallproperties', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
         });

         if (response.data.success) {
            setAllProperties(response.data.data);
         } else {
            message.error(response.data.message);
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getAllProperty();
   }, []);

   return (
      <div style={{
         minHeight: '100vh',
         background: '#f4f6fa',
         fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif",
         padding: '40px 0'
      }}>
         <div style={{
            maxWidth: 1400,
            margin: '40px auto 0 auto',
            background: '#fff',
            borderRadius: '24px',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.08)',
            padding: '32px'
         }}>
            <Typography
               variant="h4"
               sx={{
                  fontWeight: 800,
                  color: "#222",
                  mb: 4,
                  textAlign: 'center',
                  letterSpacing: '1px'
               }}
            >
               All Properties
            </Typography>
            <TableContainer component={Paper} sx={{
               borderRadius: '18px',
               boxShadow: '0 4px 18px rgba(31,38,135,0.06)'
            }}>
               <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                     <TableRow sx={{ background: '#f4f6fa' }}>
                        <TableCell sx={{ fontWeight: 700, color: '#555' }}>Property ID</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 700, color: '#555' }}>Owner ID</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 700, color: '#555' }}>Property Type</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 700, color: '#555' }}>Property Ad Type</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 700, color: '#555' }}>Property Address</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 700, color: '#555' }}>Owner Contact</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 700, color: '#555' }}>Property Amt</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {allProperties.map((property) => (
                        <TableRow
                           key={property._id}
                           sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                              '&:hover': { background: '#f7f7fb' }
                           }}
                        >
                           <TableCell component="th" scope="row" sx={{ color: '#333', fontWeight: 500 }}>
                              {property._id}
                           </TableCell>
                           <TableCell align="center" sx={{ color: '#333', fontWeight: 500 }}>{property.ownerId}</TableCell>
                           <TableCell align="center" sx={{ color: '#333', fontWeight: 500 }}>{property.propertyType}</TableCell>
                           <TableCell align="center" sx={{ color: '#333', fontWeight: 500 }}>{property.propertyType}</TableCell>
                           <TableCell align="center" sx={{ color: '#333', fontWeight: 500 }}>{property.propertyAddress}</TableCell>
                           <TableCell align="center" sx={{ color: '#333', fontWeight: 500 }}>{property.ownerContact}</TableCell>
                           <TableCell align="center" sx={{ color: '#333', fontWeight: 500 }}>{property.propertyAmt}</TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </TableContainer>
         </div>
      </div>
   );
};

export default AllProperty;
