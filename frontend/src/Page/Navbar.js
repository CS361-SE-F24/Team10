import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'; 
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';

export const Navbar = ({ user = { isAdmin: false }, setCurrentUser }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    setCurrentUser({ id: 0, isAdmin: false });
    navigate("/login");
  };

  return (
    <div>
      {/* First Navbar */}
      <AppBar position="static" sx={{ backgroundColor: '#11009E', boxShadow: 'none' }}>
        <Toolbar sx={{
          justifyContent: 'space-between',
          minHeight: '48px',
          padding: '0 16px',
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
            onClick={handleClickOpen}
            color="inherit"
            sx={{ textTransform: 'none' }}
          >
            LOG OUT
          </Button>
        </Toolbar>
      </AppBar>

      {/* Second Navbar (sub-header) */}
      <AppBar position="static" sx={{ backgroundColor: '#D9E3FF', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h8" sx={{ flexGrow: 1, textAlign: 'left', color: '#1B3C73' }}>
            COMPUTER SCIENCE CMU <br />
            STUDENT PROGRESS TRACKING SYSTEM
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        className="custom-dialog"
      >
        <DialogTitle>
          {"คุณแน่ใจใช่หรือไม่ ?"} <br />
          {"ว่าจะออกจากระบบ"}
        </DialogTitle>
        <DialogActions>
          <Button 
            onClick={handleClose} 
            className="cancel-button" // เพิ่ม class สำหรับปุ่มยกเลิก
          >
            ยกเลิก
          </Button>
          <Button 
            onClick={handleLogout} 
            className="confirm-button" // เพิ่ม class สำหรับปุ่มยืนยัน
          >
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
