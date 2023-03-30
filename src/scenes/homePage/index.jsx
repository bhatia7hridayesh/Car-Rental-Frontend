import { Box, Typography, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import VehiclesWidget from "scenes/widgets/VehiclesWidget";
const HomePage = () => {
    const isNonMobile = useMediaQuery("(min-width: 1000px)");
    
    const user = useSelector((state) => state.user);
    console.log(user);
    return (
        
        <Box>
            <Navbar />
            
            <Box
            width="100%"
            p="2rem 6%"
            display = {isNonMobile ? "flex": "block"}
            gap="0.5rem"
            justifyContent="space-between"
            >
                <Box width="100%">
                    <Typography
                    variant='h5'
                    >
                        Available Cars for Rent
                    </Typography>
                        <VehiclesWidget />
                </Box>
            </Box>
        </Box>
    )
}
export default HomePage;