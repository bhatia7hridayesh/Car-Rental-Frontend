
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Box, Typography, useMediaQuery, useTheme, Button } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import Navbar from 'scenes/navbar';
function BookingsPage() {
    const isNonMobile = useMediaQuery("(min-width: 1000px)");
    const [bookings, setBookings] = useState([]);
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const navigate = useNavigate();
    const theme = useTheme();
    const primerylight = theme.palette.primary.light;
    const getBookings = async() => {
        if (user.user_type == "User"){
            const response = await fetch('https://hridayeshbhatia.pythonanywhere.com/vehicle-data/user-bookings/',
            {method: "GET",
            headers: { Authorization: `Bearer ${token.access}` },}
            );
            const data = await response.json();
            console.log(data);
            if(response.status== 401){
                alert("Something Went Wrong");
            }
            else{
                setBookings(data);
            }
        }else{
            const response = await fetch('https://hridayeshbhatia.pythonanywhere.com/vehicle-data/booking-history/',
            {method: "GET",
            headers: { Authorization: `Bearer ${token.access}` },}
            );
            const data = await response.json();
            console.log(data);
            if(response.status== 401){
                alert("Something Went Wrong");
            }
            else{
                setBookings(data);
                
            }
        }
    }
    useEffect(() => {
        if(user == null){
            navigate("/authenticate");
        }else{
            getBookings()
        }
    }, []);
  return (
    <>
    <Navbar />
    <Box
        sx={{display: "flex", flexWrap: "wrap",justifyContent: "space-between",
          alignItems: "center"}}
        width="95%"
        padding="2.5%"
        gap = "2.5%"
        >
        {isNonMobile ? (bookings.map((car) => <Box padding="2%"
            width = "31%"
          backgroundColor={primerylight}
          sx={{ mb: "2%" }}
          >
                <Typography>{user.user_type == "User" ? (`Agency : ${car.vehicle.agency}`) : 
                (`Booked By : ${car.vehicle.booked_by}`)}</Typography>

                <Typography>Vehicle Name : {car.vehicle.vehicle_model}</Typography>
                <Typography>Vehicle Number : {car.vehicle.vehicle_number}</Typography>
                <Typography>Booked On : {car.booked_on}</Typography>
                <Typography>Booked Till : {car.returned_on}</Typography>
                <Typography>Total Rent : {car.amount_payable}</Typography>
          </Box>)
          
        ) : (bookings.map((car) =>
          <Box padding="2.5%"
            width = "45%"
          backgroundColor={primerylight}
          sx={{ mb: "2%" }}
          >
                <Typography>{user.user_type == "User" ? (`Agency : ${car.vehicle.agency}`) : 
                (`Booked By : ${car.vehicle.booked_by}`)}</Typography>

                <Typography>Vehicle Name : {car.vehicle.vehicle_model}</Typography>
                <Typography>Vehicle Number : {car.vehicle.vehicle_number}</Typography>
                <Typography>Booked On : {car.booked_on}</Typography>
                <Typography>Booked Till : {car.returned_on}</Typography>
                <Typography>Amount : {car.amount_payable}</Typography>
                
          </Box>)
        )}
        </Box>
        </>
  )
}

export default BookingsPage
