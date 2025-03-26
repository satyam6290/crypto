
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import BlurContainer from "./ui/BlurContainer";
import { Wallet, LineChart, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";
import { toast } from "sonner";

const AuthHeader = () => {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  return (
    <header className="w-full fixed top-0 z-50 px-4 py-3">
      <BlurContainer className="w-full max-w-md mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wallet className="w-6 h-6 text-crypto-blue" />
          <span className="font-display font-medium">Glimpse</span>
        </div>
        
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
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
                    "px-3 py-1.5 text-sm rounded-lg transition-all duration-300",
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
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/signin"
              className={cn(
                "px-3 py-1.5 text-sm rounded-lg transition-all duration-300",
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
                "px-3 py-1.5 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300",
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
