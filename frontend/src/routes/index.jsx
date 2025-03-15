import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import App from '../App';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import About from '../pages/About';
import Adopt from '../pages/Adopt';
import Donate from '../pages/Donate';
import Volunteer from '../pages/Volunteer';
import Admin from '../pages/AdminPanel';
import Help from '../pages/Help&Support';

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "login",
                element : <Login/>
            },
            {
                path : "forgot-password",
                element : <ForgotPassword/>
            },
            {
                path : "sign-up",
                element : <SignUp/>
            },
            {
                path : "about",
                element : <div>About</div>
            },
            {
                path : "adopt",
                element : <div>Adopt</div>
            },
            {
                path : "donate",
                element : <div>Donate</div>
            },
            {
                path : "volunteer",
                element : <div>Volunteer</div>
            },
            {
                path : "help",
                element : <div>Help&Support</div>
            },
            {
                path : "admin",
                element : <Admin/>
            },
            {
                path : "*",
                element : <div>Not Found</div>
            },
        ]
    }
]);

export default router;
