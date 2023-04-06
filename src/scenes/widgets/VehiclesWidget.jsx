import React, {useState, useEffect} from 'react'
import { Box, Typography, useMediaQuery, useTheme, Button, FormControl, MenuItem, Select, InputLabel } from '@mui/material'
import { useSelector } from 'react-redux';
import FlexBetween from 'components/FlexBetween';
import { useNavigate } from 'react-router-dom';
function VehiclesWidget() {
  const [vehicles, setVehicles] = useState([]);
    const isNonMobile = useMediaQuery("(min-width: 1000px)");
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const navigate = useNavigate();
    const [days, setDays] = useState(1);
    const theme = useTheme();
  const primerylight = theme.palette.primary.light;
  const handleChange = (event) => {
      setDays(event.target.value);
  }

  const handleBooking = async(v_no) => {
      if(days===0){
        alert("Please select no. of days");
      }else{
        const response = await fetch('https://hridayeshbhatia.pythonanywhere.com/vehicle-data/rent-vehicle/',
      {
        method : "PUT",
        "headers": { 
              Authorization: `Bearer ${token.access}` , 
              "Content-Type": "application/json"
            },
        "body": JSON.stringify({days: days, vehicle_number: v_no})
      });
      const data = await response.json();
      if(response.status == 400 || response.status == 401){
        alert('Something Went Wrong');
      }
      else{
        navigate("/bookings");
      }

      }
      
  }
  const getData = async() => {
    const data = await fetch("https://hridayeshbhatia.pythonanywhere.com/vehicle-data/")
    const vehicleData = await data.json();
    setVehicles(vehicleData);
    console.log(vehicleData);
}
useEffect(() =>{
    getData();
} ,[])
  return (
    <Box
        sx={{display: "flex", flexWrap: "wrap",justifyContent: "space-between",
    alignItems: "center"}}
        width="95%"
        padding="2.5%"
        gap = "2.5%"
        >
        {isNonMobile ? (vehicles.map((car) => <Box padding="2%"
            width = "31%"
          backgroundColor={primerylight}
          >
                <Typography>Agency : {car.agency}</Typography>
                <Typography>Vehicle Name : {car.Vehicle_model}</Typography>
                <Typography>Vehicle Number : {car.Vehicle_number}</Typography>
                <Typography>Seating Capacity : {car.seating_capacity}</Typography>
                <Typography>Rent Per Day : {car.rent_per_day}</Typography>
                {user ? user.user_type === 'User' ? (
                  <>
                  <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Age</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={1}
                        label="Age"
                        onChange={handleChange}
                      >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                      </Select>
                    </FormControl>
                  <Button onClick={() => {handleBooking(car.Vehicle_number)}} >Rent</Button></>
                  
                ) :
                 (<></>) : 
                 (<></>)}
          </Box>)
          
        ) : (vehicles.map((car) =>
          <Box padding="2.5%"
            width = "45%"
          backgroundColor={primerylight}
          >
                <Typography>Agency : {car.agency}</Typography>
                <Typography>Vehicle Name : {car.Vehicle_model}</Typography>
                <Typography>Vehicle Number : {car.Vehicle_number}</Typography>
                <Typography>Seating Capacity : {car.seating_capacity}</Typography>
                <Typography>Rent Per Day : {car.rent_per_day}</Typography>
                {user ? user.user_type === 'User' ? (<>
                  <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Age</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={1}
                        label="Age"
                        onChange={handleChange}
                      >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                      </Select>
                    </FormControl>
                    <Button onClick={() => {handleBooking(car.Vehicle_number)}} >Rent</Button></>) :
                 (<></>) : 
                 (<></>)}
          </Box>)
        )}
        </Box>
    
    
  )
}

export default VehiclesWidget;
