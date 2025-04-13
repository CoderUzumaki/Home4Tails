import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Menu, X, Heart, LogOut, User, Home, PawPrint, HeartHandshake, Coffee } from "lucide-react";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "Adopt", path: "/adopt", icon: <PawPrint size={18} /> },
    { name: "Donate", path: "/donate", icon: <HeartHandshake size={18} /> },
    { name: "Volunteer", path: "/volunteer", icon: <Coffee size={18} /> },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Home4Tails Logo" className="h-8" />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.path ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {currentUser ? (
            <div className="flex items-center gap-4">
              <Link
                to="/favorites"
                className="hidden md:flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Heart size={18} />
                <span>Favorites</span>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                      <AvatarFallback>{getInitials(currentUser.name)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{currentUser.name}</p>
                      <p className="text-xs text-muted-foreground">{currentUser.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer flex items-center gap-2">
                      <User size={16} />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/favorites" className="cursor-pointer flex items-center gap-2 md:hidden">
                      <Heart size={16} />
                      <span>Favorites</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer flex items-center gap-2"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" onClick={() => navigate("/login")}>
                Log in
              </Button>
              <Button onClick={() => navigate("/register")}>Sign up</Button>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 py-2 ${
                  location.pathname === link.path ? "text-primary" : "text-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}

            {currentUser ? (
              <>
                <Link
                  to="/favorites"
                  className="flex items-center gap-2 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart size={18} />
                  Favorites
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={18} />
                  Profile
                </Link>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  <LogOut size={18} className="mr-2" />
                  Log out
                </Button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 pt-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    navigate("/login");
                    setIsMenuOpen(false);
                  }}
                >
                  Log in
                </Button>
                <Button
                  className="w-full"
                  onClick={() => {
                    navigate("/register");
                    setIsMenuOpen(false);
                  }}
                >
                  Sign up
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
