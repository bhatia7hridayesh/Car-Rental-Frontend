import React, { useEffect, useState } from 'react';
import { Box, Button ,   useTheme, Typography, Modal, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from 'scenes/navbar';
import FlexBetween from 'components/FlexBetween';
import EditVehicleWidget from 'scenes/widgets/EditVehicleWidget';
function MyCarsPage() {
    const [cars, setCars] = useState([]);
    const mode = useSelector((state) => state.mode);
    const [sendingData, setSendingData] = useState({});
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width: 1000px)");
    const user = useSelector((state) => state.user);
    
    const token = useSelector((state) => state.token);
    const theme = useTheme();
    const light = theme.palette.primary.light;
    const dark = theme.palette.primary.dark;
    const primerylight = theme.palette.primary.light;

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleEdit = (Data) => {
        setSendingData(Data);
        handleOpen();
    }
    const myCarsData = async() => {
        const response = await fetch('https://hridayeshbhatia.pythonanywhere.com/vehicle-data/agency-vehicles/',{
            method: "GET",
            headers: { Authorization: `Bearer ${token.access}` },
        });
        const data = await response.json();
        console.log(data);
        setCars(data);
    }
    useEffect( () => {
        if(user && user.user_type == "Agency"){
            myCarsData();
        }else{
            navigate("/");
            
        }
        
    }, [])
  return (
    <Box>
      <Navbar/>
      <Box padding="2.5%">
      <Button padding="0.5rem 1.5rem" variant="contained" onClick= {() => navigate('/add-vehicle')} >Add Car + </Button>
      </Box>
      
      <FlexBetween
        width="95%"
        padding="2.5%"
        gap = "2.5%"
        >

      {isNonMobile ? (
            cars.map((car) => <Box
            width = "25%"
          backgroundColor={primerylight}
          >
                <Typography>VehicleName : {car.Vehicle_model}</Typography>
                <Typography>VehicleNumber : {car.Vehicle_number}</Typography>
                <Typography>Seats : {car.seating_capacity}</Typography>
                <Typography>Booking Status : {car.is_booked ? "Booked" : "Available"}</Typography>
                <Button  variant="contained" onClick={() => {handleEdit(car)}}>Edit</Button>
          </Box>)
          
          ) : ( cars.map((car) =><Box
            width = "30%"
          backgroundColor={primerylight}
          >
                <Typography>VehicleName : {car.Vehicle_model}</Typography>
                <Typography>VehicleNumber : {car.Vehicle_number}</Typography>
                <Typography>Seats : {car.seating_capacity}</Typography>
                <Typography>Booking Status : {car.is_booked ? "Booked" : "Available"}</Typography>
                <Button variant="contained" onClick={() => {handleEdit(car)}}>Edit</Button>
          </Box>))}
          </FlexBetween>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{
                position: 'absolute' ,
                top: '50%',
                left: "50%",
                transform: 'translate(-50%, -50%)',
                padding: '2%',
                border: "2px solid white",
                boxShadow: 24,
                background: mode === "Dark" ? dark : light,
            }}>
              <EditVehicleWidget id={sendingData.id} Vehicle_model={sendingData.Vehicle_model} Vehicle_number={sendingData.Vehicle_number} seating_capacity = {sendingData.seating_capacity} rent_per_day = {sendingData.rent_per_day} />
            </Box>
          </Modal>
    </Box>
  )
}

export default MyCarsPage;
