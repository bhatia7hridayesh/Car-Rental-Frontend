import { Login } from "@mui/icons-material";
import { BrowserRouter,
  Navigate,
  Routes, Route
} from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import RegistrationPage from "scenes/registrationPage";
import MyCarsPage from "scenes/myCarsPage";
import AddCarsPage from "scenes/addCarsPage";
import BookingsPage from "scenes/bookingsPage.jsx";
function App() {
  const mode = useSelector( (state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  const user = useSelector((state) => state.user)
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route exact path="/" element={<HomePage/>}></Route>
            <Route  path="/authenticate" element={<LoginPage/>}></Route>
            <Route  path="/register" element={<RegistrationPage/>}></Route>
            <Route  path="/my-cars" element={<MyCarsPage/>}></Route>
            <Route path="/add-vehicle" element={<AddCarsPage/>}></Route>
            <Route path="/bookings" element={<BookingsPage/>}></Route>

            


          </Routes>
        </ThemeProvider>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
