
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import BlurContainer from "../ui/BlurContainer";
import { Wallet, Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { useIsMobile, useIsTablet, useIsLaptop } from "@/hooks/use-mobile";

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isLaptop = useIsLaptop();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="w-full fixed top-0 z-50 px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3">
      <BlurContainer className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl xl:max-w-6xl mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-crypto-blue" />
          <span className="font-display font-medium text-sm sm:text-base">Glimpse</span>
        </div>
        
        <div className="hidden sm:block">
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
                  "px-2 sm:px-3 py-1.5 text-xs sm:text-sm md:text-sm rounded-lg transition-all duration-300",
                  isActive(item.path)
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="sm:hidden">
          <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-muted-foreground p-1">
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
            </BlurContainer>
          </div>
        )}
      </BlurContainer>
    </header>
  );
};

export default Header;
