import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export const Alladmin = () => {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);  // State for storing all admins
  const [open, setOpen] = useState(false); // State for the dialog
  const [adminToDelete, setAdminToDelete] = useState(null); // State to track which admin to delete

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get("http://localhost:56733/alladmins");  // Adjust the API endpoint if necessary
        console.log(response.data);

        setAdmins(response.data);  // Store the fetched admin data in state
      } catch (err) {
        console.error("Error fetching admins", err);
      }
    };

    fetchAdmins();  // Fetch admins when component mounts
  }, []);

  const handleClickOpen = (admin) => {
    setAdminToDelete(admin); // Set the admin to delete
    setOpen(true); // Open dialog
  };

  const handleClose = () => {
    setOpen(false); // Close dialog
  };

  const handleDelete = () => {
    alert(`ลบเรียบร้อยแล้ว ${adminToDelete.name}`); // Example delete operation
    setOpen(false); // Close dialog after deletion
  };

  const CustomButton = ({ children, ...props }) => {
    return (
      <Button {...props}>
        {children}
      </Button>
    );
  };

  return (
    <>
      <Box className="admin-header">
        <Box className="admin-text">
          <Typography variant="h8" sx={{ flexGrow: 1, textAlign: 'left' }}>
            Alladmin <br />
          </Typography>
        </Box>

        <Box className="admin-container">
          <CustomButton variant="outlined" startIcon={<AddIcon />} onClick={() => navigate("/addadmin")}>
            เพิ่ม Admin
          </CustomButton>
        </Box>
      </Box>

      <Box className="admin-card-container">
        <Grid container spacing={10}>
          {admins.map((admin, index) => (
            <Grid item xs={12} md={4} sm={6} lg={4} key={index}>
              <Card className="card-admin">
              <CardMedia
                sx={{
                  width: '100%', // ให้กว้างพอดีกับการ์ด
                  height: '300px', // ความสูงของการ์ด
                  '@media (max-width: 900px)': {
                    height: '250px', // ความสูงสำหรับหน้าจอที่เล็กกว่า 900px
                  },
                  '@media (max-width: 600px)': {
                    height: '200px', // ความสูงสำหรับหน้าจอที่เล็กกว่า 600px
                  },
                  margin: '0 auto',
                  objectFit: 'cover', // ทำให้รูปครอบคลุมพื้นที่การ์ดแบบสัดส่วน
                }}
                image={admin.picture ? `data:image/jpeg;base64,${admin.picture}` : "pic.png"}
                title={admin.name}
              />


                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {admin.name.split(" ")[0]}
                    <br />
                    {admin.name.split(" ")[1]}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Email: {admin.email} <br />
                    Tel: {admin.tel}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    size="small"
                    sx={{
                      color: 'indigo',
                      '&:hover': {
                        color: 'cyan',
                      },
                    }}
                  >
                    <VisibilityIcon />
                  </IconButton>

                  <IconButton
                    size="small"
                    sx={{
                      color: 'black',
                      '&:hover': {
                        color: 'yellow',
                      },
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleClickOpen(admin)}  // Pass the admin info to the delete handler
                    sx={{
                      color: 'red',
                      '&:hover': {
                        color: 'orange',
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Dialog for delete confirmation */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ยืนยันการลบ</DialogTitle>
        <DialogContent>
          <DialogContentText>
            คุณแน่ใจหรือว่าต้องการลบ {adminToDelete?.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            ไม่
          </Button>
          <Button onClick={handleDelete} color="error">
            ใช่
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
