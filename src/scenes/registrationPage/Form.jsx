import { useState } from "react";
import { Box, 
    Button, 
    TextField,
    useMediaQuery,
    Typography, FormControl, 
    useTheme, InputLabel, Select, MenuItem } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin, setUser } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import { Email } from "@mui/icons-material";
const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required('required'),
    password: yup.string().required('required'),
    password2: yup.string().required('required'),
    full_name: yup.string().required('required')
});

const initaliValuesRegister = {
    email: "",
    password: "",
    password2: "",
    full_name: "",
    user_type: ""
};

const Form = () => {
    const {palette} = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("min-wdth: 600px");
    const register = async(values, onSubmitProps) => {
        const response = await fetch('https://hridayeshbhatia.pythonanywhere.com/user/registration/',
        {
            "method": "POST",
            "headers": {"Content-Type": "application/json"},
            "body": JSON.stringify(values)
        }
        );
        const data = await response.json();
        if(response.status == 400){
            alert("A user with tihs email already exists or the password is too common or less than 8 characters");
        }
        else{
            
        console.log(data);
            alert('Register successfully');
            navigate('/authenticate');
        }
        
    }
    const handleFormSubmit = async (values, onSubmitProps) => {
        await register(values, onSubmitProps);
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initaliValuesRegister}
            validationSchema = {loginSchema}
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
                                    label="Full Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.full_name}
                                    name ="full_name"
                                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
                                    sx= {{
                                        gridColumn: "span 2"
                                    }}
                                />
                        <TextField 
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name ="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx= {{
                                gridColumn: "span 4"
                            }}
                        />
                        <TextField 
                            label="Password"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name ="password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx= {{
                                gridColumn: "span 4"
                            }}
                        />
                        <TextField 
                            label="Confirm Password"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password2}
                            name ="password2"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx= {{
                                gridColumn: "span 4"
                            }}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">User Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="user_type"
                                value={values.user_type}
                                label="User Type"
                                onChange={handleChange}
                            >
                                <MenuItem value="User">Customer</MenuItem>
                                <MenuItem value="Agency">Agency</MenuItem>
                            </Select>
                        </FormControl>

                        
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
                        >SIGNUP
                        </Button>

                        <Typography
                        sx= {{
                            textDecoration: "underline",
                            color: palette.primary.main,
                            "&: hover": {
                                cursor: "pointer",
                                color: palette.primary.light
                            }
                        }}
                        onClick={() => {navigate("/authenticate")}}
                        >Already have An Account ? Login Here
                        </Typography>
                    </Box>
                </form>
            )}

        </Formik>
    )
};

export default Form;
