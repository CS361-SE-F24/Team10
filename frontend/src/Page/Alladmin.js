import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import "../css/Alladmin.css";
import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';


export const Alladmin = () => {
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
          <CustomButton variant="outlined" startIcon={<AddIcon />}>
            เพิ่ม Admin
          </CustomButton>
        </Box>
      </Box>


      <Box className="container">
        <Card className="card" sx={{ maxWidth: 320 }}>
          <CardMedia sx={{ height: 140 }} image="/static/images/cards/contemplative-reptile.jpg" title="green iguana" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">Admin3</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
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

        <Card className="card" sx={{ maxWidth: 320 }}>
          <CardMedia sx={{ height: 140 }} image="/static/images/cards/contemplative-reptile.jpg" title="green iguana" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">Admin3</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
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


        <Card className="card" sx={{ maxWidth: 320 }}>
          <CardMedia sx={{ height: 140 }} image="/static/images/cards/contemplative-reptile.jpg" title="green iguana" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">Admin3</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
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


        <Card className="card" sx={{ maxWidth: 320 }}>
          <CardMedia sx={{ height: 140 }} image="/static/images/cards/contemplative-reptile.jpg" title="green iguana" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">Admin3</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
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

      </Box>
    </>
  );
}
