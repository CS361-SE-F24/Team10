import "../css/Admin.css";
import * as React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Select, MenuItem, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

export const Admin = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:56733/data");
      setStudents(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Call fetchData when the component mounts
  }, []);

  const handleView = (stdID) => {
    navigate('/', { state: { stdID } });
  }

  const handleEdit = (stdID) => {
    navigate('/studentfix', { state: { stdID } });
  };

  const handleDelete = async (stdID) => {
    // Confirm the deletion action from the user
    const confirmDelete = window.confirm(`Are you sure you want to delete student with ID: ${stdID}?`);
    
    if (confirmDelete) {
      try {
        // Send DELETE request to the backend
        await axios.delete(`http://localhost:56733/deleteStudent/${stdID}`);
        
        // Call fetchData to refresh the student list after deletion
        await fetchData();
        alert(`Student with ID: ${stdID} has been deleted successfully.`);
      } catch (error) {
        console.error("Error deleting student:", error);
        alert("An error occurred while trying to delete the student.");
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Grid container spacing={2} sx={{ px: 1 }}>
        <Grid item xs={12} md={4}>
          <Box className="admin-header">
            <FormGroup>
              <FormControlLabel control={<Checkbox defaultChecked />} label="ปริญญาโท" />
              <FormControlLabel control={<Checkbox defaultChecked />} label="ปริญญาเอก" />
            </FormGroup>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box className="mid-container">
            <Select defaultValue={10} fullWidth>
              <MenuItem value={10}>Degree</MenuItem>
              <MenuItem value={20}>Progress</MenuItem>
              <MenuItem value={30}>Features</MenuItem>
            </Select>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box className="right-container">
            <Button variant="contained" onClick={() => navigate("/addstudent")} startIcon={<AddIcon />}>
              เพิ่มนักศึกษา
            </Button>
            <Button variant="contained" onClick={() => navigate("/alladmin")} startIcon={<AddIcon />}>
              รวม admin
            </Button>
          </Box>
        </Grid>
      </Grid>

      <div className="admin-table-container" style={{ marginTop: '20px' }}>
        <TableContainer component={Paper} sx={{ maxHeight: 440, overflow: 'auto' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Student ID</TableCell>
                <TableCell>Degree</TableCell>
                <TableCell>Tel</TableCell>
                <TableCell>Progress</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.stdID}>
                  <TableCell>{student.no}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.stdID}</TableCell>
                  <TableCell>{student.degree}</TableCell>
                  <TableCell>{student.tel}</TableCell>
                  <TableCell>{student.progress}</TableCell>
                  <TableCell>
                    <div>
                      <IconButton
                        size="small"
                        onClick={() => handleView(student.stdID)}
                        sx={{ color: 'indigo', '&:hover': { color: 'cyan' } }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(student.stdID)}
                        sx={{ color: 'black', '&:hover': { color: 'yellow' } }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(student.stdID)}
                        sx={{ color: 'red', '&:hover': { color: 'orange' } }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};
