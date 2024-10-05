import "../css/Admin.css";
import * as React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Grid } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Select, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

export const Admin = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
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

    fetchData();
  }, []);

  const handleView = (stdID) => {
    navigate('/', { state: { stdID } });
  }

  // Function to handle edit
  const handleEdit = (stdID) => {
    navigate('/studentfix', { state: { stdID } }); // Using state to pass stdID
  };


  // Function to handle delete
  const handleDelete = (stdID) => {
    // Add delete functionality here (e.g., API call to delete student)
    console.log(`Delete student with ID: ${stdID}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Grid container spacing={10} sx={{ px: 1 }} >
        <Grid item xs={12} md={4} sm={6} lg={4}>
          <Box className="admin-header">
            <Box className="left-container">
              <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="ปริญญาโท" />
                <FormControlLabel control={<Checkbox defaultChecked />} label="ปริญญาเอก" />
              </FormGroup>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} sm={6} lg={4}>
          <Box className="mid-container">
            <Select defaultValue={10}>
              <MenuItem value={10}>Degree</MenuItem>
              <MenuItem value={20}>Progress</MenuItem>
              <MenuItem value={30}>Features</MenuItem>
            </Select>
          </Box></Grid>
        <Grid item xs={12} md={4} sm={6} lg={4}>
          <Box className="right-container">
            <button onClick={() => navigate("/addstudent")}>เพิ่มนักศึกษา</button>
            {/* <button onClick={() => navigate("/addcourse")}>Add course</button> */}
            <button onClick={() => navigate("/alladmin")}>รวม admin</button>
          </Box>
        </Grid>
      </Grid >





      <div className="admin-table-container">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Student ID</TableCell>
                <TableCell>Degree</TableCell>
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
                  <TableCell>{student.progress}</TableCell>
                  <TableCell>
                    <div>
                      <Button variant="contained" onClick={() => handleView(student.stdID)}>
                        View
                      </Button>
                      <Button variant="contained" onClick={() => handleEdit(student.stdID)}>
                        Edit
                      </Button>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(student.stdID)} // Pass the admin info to the delete handler
                        sx={{
                          color: 'red',
                          '&:hover': {
                            color: 'orange',
                          },
                        }}
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
