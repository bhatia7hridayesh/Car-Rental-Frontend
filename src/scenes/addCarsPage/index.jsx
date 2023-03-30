import React from 'react'
import { Box, 
    Button, 
    TextField,
    useMediaQuery,
    Typography, FormControl, 
    useTheme, InputLabel, Select, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from 'scenes/navbar';
const addCarSchema = yup.object().shape({
    Vehicle_model: yup.string().required('required'),
    Vehicle_number: yup.string().required('required'),
    seating_capacity: yup.number().required('required') ,
    rent_per_day: yup.number().required('required')
});

const initalCarValues = {
    Vehicle_model: "",
    Vehicle_number: "",
    seating_capacity: 0,
    rent_per_day: 0
};

function AddCarsPage() {
    const {palette} = useTheme();
    const token = useSelector((state) => state.token);
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("min-wdth: 600px");
    const theme = useTheme();
    const isNonMobileScreans = useMediaQuery("min-width: 1000px");
    const addCar = async(values, onSubmitProps) => {
        const response = await fetch('https://hridayeshbhatia.pythonanywhere.com/vehicle-data/create/',
        {
            "method": "POST",
            "headers": { Authorization: `Bearer ${token.access}` , "Content-Type": "application/json"},
            "body": JSON.stringify(values)
        }
        );
        const data = await response.json();
        if(response.status == 400){
            alert("Invalid Data");
        }else{
            navigate("/my-cars");
        }
    };
    const handleFormSubmit = async (values, onSubmitProps) => {
        await addCar(values, onSubmitProps);
    };
  return (
    <>
        <Navbar/>
        <Box
    width={isNonMobileScreans ? "50%" : "93%"}
            p="2rem"
            m="2rem auto"
            borderRadius='1.5rem'
            backgroundColor={theme.palette.background.alt}>
        <Formik onSubmit={handleFormSubmit}
            initialValues={initalCarValues}
            validationSchema = {addCarSchema}
        > 
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box display="grid" gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0,1fr))"
                        sx= {{
                            " & > div": {gridColumn: isNonMobile ? undefined: "span 4"}
                        }}
                        >
                            <TextField 
                                label="Vehicle Model"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.full_name}
                                name ="Vehicle_model"
                                error={Boolean(touched.Vehicle_model) && Boolean(errors.Vehicle_model)}
                                helperText={touched.Vehicle_model && errors.Vehicle_model}
                                sx= {{
                                    gridColumn: "span 2"
                                }}
                            />
                            <TextField 
                                label="Vehicle Number"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.Vehicle_number}
                                name ="Vehicle_number"
                                error={Boolean(touched.Vehicle_number) && Boolean(errors.Vehicle_number)}
                                helperText={touched.Vehicle_number && errors.Vehicle_number}
                                sx= {{
                                    gridColumn: "span 2"
                                }}
                            />
                            <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Seating Capacity</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="seating_capacity"
                                value={values.seating_capacity}
                                label="Seating Capacity"
                                onChange={handleChange}
                            >
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField 
                                label="Rent Per Day"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.rent_per_day}
                                name ="rent_per_day"
                                error={Boolean(touched.rent_per_day) && Boolean(errors.rent_per_day)}
                                helperText={touched.rent_per_day && errors.rent_per_day}
                                sx= {{
                                    gridColumn: "span 2"
                                }}
                            />
                    </Box>
                        
                    <Box>
                        <Button
                        fullWidth
                        type="submit"
                        sx={{
                            m: "2rem 0",
                            p: "1rem",
                            backgroundColor: palette.primary.main,
                            color: palette.background.alt,
                            "&:hover": {color: palette.primary.main}
                        }}
                        >Add Vehicle
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    </Box>
    </>
    
  )
}

export default AddCarsPage;
