import { createBrowserRouter } from "react-router-dom";
import App from '../App';

// Public
import Home from "../pages/public/Home";
import Help from '../pages/public/Help&Support';

// Auth
import Login from '../pages/public/Login';
import SignUp from '../pages/public/SignUp';
import ForgotPassword from '../pages/public/ForgotPassword';

// Admin
import Admin from '../pages/admin/AdminPanel';
import AdminAllUsers from "../pages/admin/AdminAllUsers";
import AdminAllVolunteers from "../pages/admin/AdminAllVolunteers";


const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            // ----- Public Routes -----
            {
                path : "",
                element : <Home/>
            },
            {
                path : "help",
                element : <Help/>
            },

            // ----- Auth Routes -----
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

            // ----- Admin Routes -----
            {
                path : "admin",
                element : <Admin/>
            },
            {
                path : "admin/users",
                element : <AdminAllUsers/>
            },
            {
                path : "admin/volunteers",
                element : <AdminAllVolunteers/>
            },

            // ----- 404 - NOT FOUND -----
            {
                path : "*",
                element : <div>Not Found</div>
            },
        ]
    }
]);

export default router;
