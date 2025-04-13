import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "../components/ui/use-toast";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // This is a mock login function
    // In a real app, this would communicate with a backend
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock validation
        if (email === "demo@home4tails.com" && password === "password") {
          const user = {
            id: "123",
            name: "Demo User",
            email: "demo@home4tails.com",
            avatar: "https://i.pravatar.cc/150?img=32",
          };
          setCurrentUser(user);
          localStorage.setItem("user", JSON.stringify(user));
          toast({
            title: "Login Successful",
            description: "Welcome back to Home4Tails!",
          });
          resolve(user);
        } else {
          toast({
            title: "Login Failed",
            description: "Invalid email or password",
            variant: "destructive",
          });
          reject(new Error("Invalid email or password"));
        }
      }, 1000);
    });
  };

  const register = (name, email, password) => {
    // Mock registration
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = {
          id: "123",
          name,
          email,
          avatar: "https://i.pravatar.cc/150?img=32",
        };
        setCurrentUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        toast({
          title: "Registration Successful",
          description: "Welcome to Home4Tails!",
        });
        resolve(user);
      }, 1000);
    });
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
