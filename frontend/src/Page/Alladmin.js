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
import "../css/Alladmin.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';


export const Alladmin = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // ประกาศ state สำหรับ open  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false); // ฟังก์ชันปิด dialog  
  };

  const handleDelete = () => {
    alert("ลบเรียบร้อยแล้ว"); // ตัวอย่างการดำเนินการลบ  
    setOpen(false); // ปิด dialog หลังจากการลบ  
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
      <Box className="header">
        <Box className="header-container">
          <CustomButton variant="outlined" startIcon={<AddIcon />} onClick={() => navigate("/addadmin")}>
            เพิ่ม Admin
          </CustomButton>
        </Box>
      </Box>

      <Grid container spacing={10} sx={{px:1}} >

        <Grid item xs={12} md={4} sm={6} lg={3}>
          <Card className="card-admin" >
            <CardMedia sx={{ height: 140 }} image="/static/images/cards/contemplative-reptile.jpg" title="green iguana" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">Admin3</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Data
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" size="small" color="error" onClick={handleClickOpen}>
                delete
              </Button>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>ยืนยันการลบ</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    คุณแน่ใจหรือว่าต้องการลบ?
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
              <Button size="small" sx={{ color: 'yellow' }}>
                <EditIcon />
              </Button>
            </CardActions>
          </Card>
        </Grid>


        <Grid item xs={12} md={4} sm={6} lg={3}>
        <Card className="card-admin" >
          <CardMedia sx={{ height: 140 }} image="/static/images/cards/contemplative-reptile.jpg" title="green iguana" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">Admin3</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Data
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" size="small" color="error" onClick={handleClickOpen}>
              delete
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>ยืนยันการลบ</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  คุณแน่ใจหรือว่าต้องการลบ?
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
            <Button
              size="small"
              sx={{
                color: 'black', // สีปกติของไอคอน
                '&:hover': {
                  color: 'yellow', // สีของไอคอนเมื่อ hover
                },
              }}
            >
              <EditIcon />
            </Button>
          </CardActions>
        </Card>
        </Grid>


        <Grid item xs={12} md={4} sm={6} lg={3}>
          <Card className="card-admin" >
            <CardMedia sx={{ height: 140 }} image="/static/images/cards/contemplative-reptile.jpg" title="green iguana" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">Admin3</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Data
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" size="small" color="error" onClick={handleClickOpen}>
                delete
              </Button>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>ยืนยันการลบ</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    คุณแน่ใจหรือว่าต้องการลบ?
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


              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={4} sm={6} lg={3}>
          <Card className="card-admin" >
            <CardMedia sx={{ height: 140 }} image="/static/images/cards/contemplative-reptile.jpg" title="green iguana" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">Admin3</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Data
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" size="small" color="error" onClick={handleClickOpen}>
                delete
              </Button>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>ยืนยันการลบ</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    คุณแน่ใจหรือว่าต้องการลบ?
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

              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>

      </Grid>
    </>
  );
}

