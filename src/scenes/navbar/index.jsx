import { useState } from "react";
import { Box, 
    IconButton, 
    InputBase, 
    Typography, 
    Select, 
    MenuItem, 
    FormControl, 
    useTheme ,
    useMediaQuery, 
    Button
} from "@mui/material";
import { Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { Link, useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeIcon from '@mui/icons-material/Home';
import { unstable_createStyleFunctionSx } from "@mui/system";

const Navbar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const mode = useSelector((state) => state.mode);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;

    const background = theme.palette.background.default;
    const primerylight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    return (<FlexBetween padding="1rem 6%" backgroundColor={alt}>
        <FlexBetween gap="1.75rem">
            <Typography
            fontWeight="bold"
            fontSize="clamp(1rem,2rem,2.25rem)"
            color="primary"
            onClick={() => navigate("/")}
            sx={{
                "&:hover": {
                    color: primerylight,
                    cursor: "pointer",
                },
            }}
            >Rident</Typography>
            {isNonMobileScreens && (
                <FlexBetween gap='1.3rem'>
                   <IconButton onClick={() => navigate("/")}>
                   <HomeIcon/>
                   </IconButton>
                    {user ? user.user_type === "User" ? (
                        <Typography
                        backgroundColor={neutralLight} 
                    borderRadius="9px" 
                    gap="3rem" padding="0.5rem 1rem"
                    sx={{
                        "&:hover": {
                        cursor: "pointer",
                            },
                        }}
                    onClick = {() => navigate('/bookings')}
                        >
                            Bookings
                        </Typography>
                    ) : (<>
                        <Typography
                        backgroundColor={neutralLight} 
                    borderRadius="9px" 
                    gap="3rem" padding="0.5rem 1rem"
                    sx={{
                    "&:hover": {
                        cursor: "pointer",
                            },
                        }}
                    onClick = {() => navigate('/bookings')}
                        >
                            Bookings
                        </Typography>
                        <Typography
                        backgroundColor={neutralLight} 
                        borderRadius="9px" 
                        gap="3rem" padding="0.5rem 1rem"
                        onClick = {() => navigate("/my-cars")}
                        sx={{
                            "&:hover": {
                                cursor: "pointer",
                                },
                            }}
                        >
                            My Cars
                        </Typography>
                        </>
                    ) : (<>
                        
                    </>)}
                </FlexBetween>
            )}
        </FlexBetween>
        {/* DESKTOP NAV */}
        {isNonMobileScreens ? (
            <FlexBetween gap="2rem" >
                <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode === "dark" ? (
                        <DarkMode sx={{fontSize: "25px"}}/>
                    ):
                    (
                        <LightMode sx={{ color: dark ,fontSize: "25px"}}/>
                    )}
                </IconButton>
                {user ? (<><Typography 
                backgroundColor={neutralLight} 
                    borderRadius="9px" 
                    gap="3rem" padding="0.1rem 1rem"
                >
                    Profile
                    <IconButton>
                        <AccountBoxIcon />
                    </IconButton>
                    
                </Typography>
                <Button onClick={() => {dispatch(setLogout())
                navigate("/authenticate")
                }}>
                    Logout
                </Button>
                </>) : 
                (<>
                    <Typography
                    backgroundColor={neutralLight} 
                    borderRadius="9px" 
                    gap="3rem" padding="0.3rem 1.5rem"
                    sx={{
                            "&:hover": {
                                cursor: "pointer",
                        },
                    }}
                    >
                    <Link
                    style={{textDecoration: 'none', color: mode === "light" ? "black" : "white"}}
                    to = "/authenticate"
                    >Login</Link>
                    </Typography>
                </>)}
                
            </FlexBetween>
        ):(
            <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
            <Menu />
            </IconButton>
        )}
        {/* MOBILE NAV */}
        {!isNonMobileScreens && isMobileMenuToggled && (
            <Box
                position="fixed"
                right= "0"
                bottom= "0"
                height="100%"
                zIndex="10"
                maxWidth="500px"
                minWIdth="300px"
                backgroundColor= {background}
            >
                {/*CLOSE ICON */}
                <Box 
                    display="flex" justifyContent="flex-end" p="1rem 2rem">
                    <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                        <Close/>
                    </IconButton>
                </Box>
                {/*Menu Items */}
                <FlexBetween display="flex" flexDirection="column" justifyContent="center" 
                    alignItems="center" gap="3rem" p="1rem 2rem">
                    <Typography
                        backgroundColor={neutralLight} 
                        borderRadius="9px" 
                        gap="3rem" padding="0.1rem 1rem"
                        onClick = {() => navigate("/")}
                    >
                        Home
                        <IconButton>
                   <HomeIcon/>
                   </IconButton>
                    </Typography>
                    {user ? user.user_type === "User" ? (
                        <Typography backgroundColor={neutralLight} 
                            borderRadius="9px" 
                            gap="3rem" padding="0.5rem 1rem"
                            sx={{
                                "&:hover": {
                                        cursor: "pointer",
                                    },
                                }}
                                onClick = {() => navigate('/bookings')}
                            >
                                Bookings
                        </Typography>
                    ) : (
                        <>
                        <Typography backgroundColor={neutralLight} 
                            borderRadius="9px" 
                            gap="3rem" padding="0.5rem 1rem"
                            sx={{
                                "&:hover": {
                                        cursor: "pointer",
                                    },
                                }}
                                onClick = {() => navigate('/bookings')}
                            >
                                Bookings
                        </Typography>
                        <Typography backgroundColor={neutralLight} 
                    borderRadius="9px" 
                    gap="3rem" padding="0.5rem 1rem" onClick = {() => navigate("/my-cars")}
                    sx={{
                            "&:hover": {
                                cursor: "pointer",
                                },
                        }}
                    >
                        My Cars
                        </Typography>
                        </>
                    ) : (<>
                        
                    </>)}
                    {user ? (<><Typography 
                backgroundColor={neutralLight} 
                    borderRadius="9px" 
                    gap="3rem" padding="0.1rem 1rem"
                >
                    Profile
                    <IconButton>
                        <AccountBoxIcon />
                    </IconButton>
                    
                </Typography>
                <Button onClick={() => {dispatch(setLogout())
                navigate("/authenticate")
                }}>
                    Logout
                </Button></>) : 
                (<>
                    <Typography
                    backgroundColor={neutralLight} 
                    borderRadius="9px" 
                    gap="3rem" padding="0.3rem 1.5rem"
                    sx={{
                            "&:hover": {
                                cursor: "pointer",
                        },
                    }}
                    >
                    <Link
                    style={{textDecoration: 'none', color: mode === "light" ? "black" : "white"}}
                    to = "/authenticate"
                    >Login</Link>
                    </Typography>
                    
                </>)}
                    <IconButton onClick={() => dispatch(setMode())} sx={{fontSize: "25px"}}>
                        {theme.palette.mode === "dark" ? (
                            <DarkMode sx={{fontSize: "25px"}}/>
                        ):
                        (
                            <LightMode sx={{ color: dark ,fontSize: "25px"}}/>
                        )}
                    </IconButton>
                </FlexBetween>
            </Box>
        )}
    </FlexBetween>
        
    )
}
export default Navbar;