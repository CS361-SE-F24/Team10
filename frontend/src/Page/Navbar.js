import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'; // assuming you're using react-router-dom
import Box from '@mui/material/Box';

export const Navbar = ({ user = { isAdmin: false }, setCurrentUser }) => {
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      setCurrentUser({ id: 0, isAdmin: false });
      navigate("/login");
    }
  };

  return (
    <div>
      {/* First Navbar */}
      <AppBar position="static" sx={{ backgroundColor: '#0d47a1', boxShadow: 'none' }}>
        <Toolbar sx={{
          justifyContent: 'space-between',
          minHeight: '48px', // Adjust this value to make the toolbar smaller
          padding: '0 16px', // Optional padding for spacing
        }}>
          {/* Brand Links */}
          <Box>
            <Button
              component={Link}
              to={user.isAdmin ? "/admin" : "/"}
              color="inherit"
            >
              HOME
            </Button>
          </Box>
          {/* Logout Button */}
          <Button
            component={Link}
            to="#"
            onClick={handleLogout}
            color="inherit"
            sx={{ textTransform: 'none' }} // removes uppercase transformation
          >
            LOG OUT
          </Button>
        </Toolbar>
      </AppBar>

      {/* Second Navbar (sub-header) */}
      <AppBar position="static" sx={{ backgroundColor: '#9e9e9e', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h8" sx={{ flexGrow: 1, textAlign: 'left', color: 'white' }}>
            COMPUTER SCIENCE CMU <br />
            STUDENT PROGRESS TRACKING SYSTEM
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
