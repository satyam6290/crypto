
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import BlurContainer from "./ui/BlurContainer";
import { Wallet, Menu, X, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { useIsMobile, useIsTablet, useIsLaptop } from "@/hooks/use-mobile";

const AuthHeader = () => {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isLaptop = useIsLaptop();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full fixed top-0 z-50 px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3">
      <BlurContainer className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl xl:max-w-6xl mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-crypto-blue" />
          <span className="font-display font-medium text-sm sm:text-base">Glimpse</span>
        </div>
        
        {isAuthenticated ? (
          <>
            <div className="hidden sm:flex items-center gap-4">
              <nav className="flex space-x-1">
                {[
                  { path: "/", label: "Home" },
                  { path: "/wallet", label: "Wallet" },
                  { path: "/dashboard", label: "Charts" },
                  { path: "/transactions", label: "Activity" },
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-lg transition-all duration-300",
                      isActive(item.path)
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="sm:hidden">
              <Button variant="ghost" size="sm" onClick={toggleMenu} className="text-muted-foreground p-1">
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
            
            {isMenuOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 px-3 sm:hidden">
                <BlurContainer className="w-full p-2 flex flex-col space-y-1 rounded-lg animate-fade-in">
                  {[
                    { path: "/", label: "Home" },
                    { path: "/wallet", label: "Wallet" },
                    { path: "/dashboard", label: "Charts" },
                    { path: "/transactions", label: "Activity" },
                  ].map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "px-3 py-2 text-sm rounded-lg transition-all duration-300",
                        isActive(item.path)
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Button variant="ghost" size="sm" onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }} className="text-muted-foreground justify-start px-3">
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Logout</span>
                  </Button>
                </BlurContainer>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/signin"
              className={cn(
                "px-3 py-1.5 text-xs sm:text-sm rounded-lg transition-all duration-300",
                isActive("/signin")
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className={cn(
                "px-3 py-1.5 text-xs sm:text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300",
              )}
            >
              Sign Up
            </Link>
          </div>
        )}
      </BlurContainer>
    </header>
  );
};

export default AuthHeader;
