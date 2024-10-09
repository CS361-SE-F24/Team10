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
import SchoolIcon from '@mui/icons-material/School';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

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
        <Grid item xs={6} md={6}>
          <Box className="admin-page-header">
            <Box className="left-container">
              <FormGroup>
                {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Master Degree" />
                <FormControlLabel control={<Checkbox defaultChecked />} label="PHD Degree" /> */}
                <Button
                  variant="contained"
                  onClick={() => navigate("/alumni")}
                  startIcon={<SchoolIcon />}
                  sx={{
                    justifyContent: 'center',
                    width: '200px',
                    height: '50px',
                    fontSize: '16px',
                    '@media (max-width: 900px)': {
                      width: '150px',
                      height: '45px',
                      fontSize: '14px',
                    },
                    '@media (max-width: 600px)': {
                      width: '120px',
                      height: '40px',
                      fontSize: '12px',
                    },
                  }}
                >
                  Alumni
                </Button>
              </FormGroup>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={6} md={6}>
          <Box className="right-container"
            sx={{
              display: 'flex',
              padding: '5px',
              flexDirection: 'column',
              alignItems: 'flex-end', // Align to the right horizontally
              justifyContent: 'center', // Center vertically within the container
              gap: '10px',
              height: '100%', // Ensure the container has enough height for vertical centering
            }}
          >
            <Button
              variant="contained"
              onClick={() => navigate("/addstudent")}
              startIcon={<AddIcon />}
              sx={{
                width: '200px',
                height: '50px',
                fontSize: '16px',
                '@media (max-width: 900px)': {
                  width: '150px',
                  height: '45px',
                  fontSize: '14px',
                },
                '@media (max-width: 600px)': {
                  width: '120px',
                  height: '40px',
                  fontSize: '12px',
                },
              }}
            >
              เพิ่มนักศึกษา
            </Button>

            <Button
              variant="contained"
              onClick={() => navigate("/alladmin")}
              startIcon={<SupervisorAccountIcon />}
              sx={{
                width: '200px',
                height: '50px',
                fontSize: '16px',
                '@media (max-width: 900px)': {
                  width: '150px',
                  height: '45px',
                  fontSize: '14px',
                },
                '@media (max-width: 600px)': {
                  width: '120px',
                  height: '40px',
                  fontSize: '12px',
                },
              }}
            >
              รวม admin
            </Button>
          </Box>

        </Grid>
      </Grid>




      <div className="admin-table-container" style={{ marginTop: '20px' }}>
        <TableContainer component={Paper} sx={{ maxHeight: 440, overflow: 'auto', }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: '#11009E', // Header background color
                    color: 'white', // Header text color
                    textAlign: 'center',
                  }}
                >
                  No.
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: '#11009E',
                    color: 'white',
                    textAlign: 'center',
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: '#11009E',
                    color: 'white',
                    textAlign: 'center',
                  }}
                >
                  Student ID
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: '#11009E',
                    color: 'white',
                    textAlign: 'center',
                  }}
                >
                  Degree
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: '#11009E',
                    color: 'white',
                    textAlign: 'center',
                  }}
                >
                  Tel
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: '#11009E',
                    color: 'white',
                    textAlign: 'center',
                  }}
                >
                  Progress
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: '#11009E',
                    color: 'white',
                    textAlign: 'center',
                  }}
                >
                  Edit
                </TableCell>
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
                        sx={{ color: '#11009E', '&:hover': { color: 'cyan' } }}
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