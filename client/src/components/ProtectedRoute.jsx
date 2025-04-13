import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../components/ui/use-toast";

const ProtectedRoute = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();

  if (!currentUser) {
    toast({
      title: "Access Denied",
      description: "Please log in to view this page",
      variant: "destructive",
    });
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
