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
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const AllUsers = () => {
   const [allUser, setAllUser] = useState([]);

   useEffect(() => {
      getAllUser();
   }, []);

   const getAllUser = async () => {
      try {
         const response = await axios.get('http://localhost:8001/api/admin/getallusers', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
         });

         if (response.data.success) {
            setAllUser(response.data.data);
         } else {
            message.error(response.data.message);
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handleStatus = async (userid, status) => {
      try {
         await axios.post('http://localhost:8001/api/admin/handlestatus', { userid, status }, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
         }).then((res) => {
            if (res.data.success) {
               getAllUser();
            }
         });
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div style={{
         minHeight: '100vh',
         background: '#f4f6fa',
         fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif",
         padding: '40px 0'
      }}>
         <div style={{
            maxWidth: 1400,
            margin: '0 auto',
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
               All Users
            </Typography>
            <TableContainer component={Paper} sx={{
               borderRadius: '18px',
               boxShadow: '0 4px 18px rgba(31,38,135,0.06)'
            }}>
               <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                     <TableRow sx={{ background: '#f4f6fa' }}>
                        <TableCell sx={{ fontWeight: 700, color: '#555' }}>User ID</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 700, color: '#555' }}>Name</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 700, color: '#555' }}>Email</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 700, color: '#555' }}>Type</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 700, color: '#555' }}>Granted (Owners only)</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 700, color: '#555' }}>Actions</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {allUser.map((user) => (
                        <TableRow
                           key={user._id}
                           sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                              '&:hover': { background: '#f7f7fb' }
                           }}
                        >
                           <TableCell component="th" scope="row" sx={{ color: '#333', fontWeight: 500 }}>
                              {user._id}
                           </TableCell>
                           <TableCell align="center" sx={{ color: '#333', fontWeight: 500 }}>{user.name}</TableCell>
                           <TableCell align="center" sx={{ color: '#333', fontWeight: 500 }}>{user.email}</TableCell>
                           <TableCell align="center" sx={{ color: '#333', fontWeight: 500 }}>{user.type}</TableCell>
                           <TableCell align="center" sx={{ color: '#333', fontWeight: 500 }}>{user.granted}</TableCell>
                           <TableCell align="center">
                              {user.type === 'Owner' && user.granted === 'ungranted' ? (
                                 <Button onClick={() => handleStatus(user._id, 'granted')} size='small' variant="contained" color="success" sx={{ borderRadius: '12px', fontWeight: 600 }}>
                                    Grant
                                 </Button>
                              ) : user.type === 'Owner' && user.granted === 'granted' ? (
                                 <Button onClick={() => handleStatus(user._id, 'ungranted')} size='small' variant="outlined" color="error" sx={{ borderRadius: '12px', fontWeight: 600 }}>
                                    Ungrant
                                 </Button>
                              ) : null}
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </TableContainer>
         </div>
      </div>
   );
};

export default AllUsers;
