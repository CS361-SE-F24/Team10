import * as React from 'react';
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
import "../css/Alladmin.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export const Alladmin = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // State for the dialog
  const [adminToDelete, setAdminToDelete] = useState(null); // State to track which admin to delete

  const handleClickOpen = (admin) => {
    setAdminToDelete(admin); // Set the admin to delete
    setOpen(true); // Open dialog
  };

  const handleClose = () => {
    setOpen(false); // Close dialog  
  };

  const handleDelete = () => {
    alert("ลบเรียบร้อยแล้ว"); // Example delete operation
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
            Add new admin <br />
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
          <Grid item xs={12} md={4} sm={6} lg={4}>
            <Card className="card-admin" >
              <CardMedia sx={{ height: 140 }} image="/static/images/cards/contemplative-reptile.jpg" title="green iguana" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">Admin3</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Data
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
                  onClick={() => handleClickOpen("Admin3")} // Pass the admin info to the delete handler
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
        </Grid>
      </Box>

      {/* Dialog for delete confirmation */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ยืนยันการลบ</DialogTitle>
        <DialogContent>
          <DialogContentText>
            คุณแน่ใจหรือว่าต้องการลบ {adminToDelete}?
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
}
