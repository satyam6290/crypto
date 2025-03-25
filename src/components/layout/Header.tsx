
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import BlurContainer from "../ui/BlurContainer";
import { Wallet, LineChart } from "lucide-react";

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="w-full fixed top-0 z-50 px-4 py-3">
      <BlurContainer className="w-full max-w-md mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wallet className="w-6 h-6 text-crypto-blue" />
          <span className="font-display font-medium">Glimpse</span>
        </div>
        
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
      </BlurContainer>
    </header>
  );
};

export default Header;
