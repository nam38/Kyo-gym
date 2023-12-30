import React, { useEffect, useState } from 'react';
import { Button, Table, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../AuthContext';
import { request } from '../../../utils/axiosInstance';

const CustomerComponent = () => {
  const navigate = useNavigate();
  // GET USER INFO
  const { user } = useAuth();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const res = await request.get('/customer/list');
      setUserData(res.content);
    } catch (error) {
      console.log('Error fetching user information', error);
    }
  };

  const handleDeleteUser = async (customerId) => {
    try {
      await request.remove(`/customer/delete/${customerId}`);
      fetchUserData();
    } catch (error) {
      console.log('Error deleting user', error);
    }
  };

  if (userData?.length === 0) {
    return <h1 className='text-center pt-4'>No customers yet</h1>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Day of Birth</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        {userData.map((record) => (
          <TableRow key={record.customerId}>
            <TableCell>{record.customerName}</TableCell>
            <TableCell>{record.dateOfBirth}</TableCell>
            <TableCell>{record.customerAddress}</TableCell>
            <TableCell>{record.customerPhone}</TableCell>
            <TableCell>{record.customerEmail}</TableCell>
            <TableCell>
              <IconButton
                color='primary'
                onClick={() => navigate(`/editcustomer/${record.customerId}`)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color='primary'
                onClick={() => handleDeleteUser(record.customerId)}
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </TableContainer>
  );
};

export default CustomerComponent;
