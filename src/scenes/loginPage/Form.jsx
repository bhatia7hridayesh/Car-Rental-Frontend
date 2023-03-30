import { useState } from "react";
import { Box, 
    Button, 
    TextField,
    useMediaQuery,
    Typography,
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
    password: yup.string().required('required')
});

const initaliValuesLogin = {
    email: "",
    password: ""
};

const Form = () => {
    const [pageType, setPageType] = useState("login");
    const [type, setType] = useState('');
    const {palette} = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("min-wdth: 600px");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const login = async(values, onSubmitProps) => {
        const loginResponse = await fetch(
            "https://hridayeshbhatia.pythonanywhere.com/login/",
            {
                "method": "POST",
                "headers": {"Content-Type": "application/json"},
                "body": JSON.stringify(values)
            }
        );
        
        if(loginResponse.status==401){
            alert("Enter Valid Credentials");
        }else{
            const loggedIn = await loginResponse.json();
        onSubmitProps.resetForm();
        if (loggedIn) {
            dispatch(
                setLogin({
                    token: loggedIn
                })
            );
            const profile_data = await fetch("https://hridayeshbhatia.pythonanywhere.com/user/profile/", {
                method: "GET",
                headers: { Authorization: `Bearer ${loggedIn.access}` },
            });
            const data = await profile_data.json();
            dispatch(setUser({
                user: data
            }))
            navigate("/");
        }
        }
        
    }
    const handleFormSubmit = async (values, onSubmitProps) => {
        await login(values, onSubmitProps);
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initaliValuesLogin}
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
                        
                    </Box>

                    {/*Login / Register buttons */}
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
                        >LOGIN
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
                        >Don't Have an account? SignUp here.
                        </Typography>
                    </Box>
                </form>
            )}

        </Formik>
    )
};

export default Form;
