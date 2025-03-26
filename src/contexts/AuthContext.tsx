
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface User {
  email: string;
  isAuthenticated: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("auth_user");
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    // This is a placeholder for an actual authentication API call
    // In a real app, you would validate credentials against a backend
    
    // For demo purposes, we'll just simulate a successful login
    const newUser = {
      email,
      isAuthenticated: true,
    };
    
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem("auth_user", JSON.stringify(newUser));
  };

  const signup = async (email: string, password: string) => {
    // This is a placeholder for an actual registration API call
    // In a real app, you would register the user with a backend service
    
    // For demo purposes, we'll just simulate a successful registration
    const newUser = {
      email,
      isAuthenticated: true,
    };
    
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem("auth_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
