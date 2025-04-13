import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { PetProvider } from "./contexts/PetContext";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import AdoptionListings from "./pages/AdoptionListings";
import AdoptNow from "./pages/AdoptNow";
import Donations from "./pages/Donations";
import Volunteer from "./pages/Volunteer";
import Profile from "./pages/Profile";
import FavoritePets from "./pages/FavoritePets";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <PetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="adopt" element={<AdoptionListings />} />
                <Route path="adopt/:id" element={<AdoptNow />} />
                <Route path="donate" element={<Donations />} />
                <Route path="volunteer" element={<Volunteer />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<NotFound />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="profile" element={<Profile />} />
                  <Route path="favorites" element={<FavoritePets />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </PetProvider>
    </AuthProvider>
  );
};

export default App;
