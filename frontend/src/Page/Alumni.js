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
import "../css/Alumni.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export const Alumni = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // State for the dialog
  const [adminToDelete, setAlumniToDelete] = useState(null); // State to track which alumni to delete

  const handleClickOpen = (alumni) => {
    setAlumniToDelete(alumni); // Set the alumni to delete
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
      <Box className="alumni-header">
        <Box className="alumni-text">
          <Typography variant="h6">
            Alumni Board<br />
          </Typography>
        </Box>
      </Box>

      <Box className="alumni-card-container">
        <Grid container spacing={10}>
          <Grid item xs={12} md={4} sm={6} lg={4}>
            <Card className="card-alumni" >
              <CardMedia sx={{ height: 140 }} image="/static/images/cards/contemplative-reptile.jpg" title="green iguana" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">Alumni3</Typography>
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
                  onClick={() => handleClickOpen("Alumni3")} // Pass the alumni info to the delete handler
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
