
import { useState } from "react";
import WalletCard from "@/components/wallet/WalletCard";
import CryptoPriceCard from "@/components/wallet/CryptoPrice";
import TransactionList from "@/components/wallet/TransactionList";
import AuthHeader from "@/components/AuthHeader";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-crypto-soft-blue/20 to-crypto-soft-purple/20">
      <AuthHeader />
      
      <main className="pt-20 sm:pt-24 pb-16 sm:pb-20 px-3 sm:px-4 mx-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
        {isAuthenticated ? (
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="market">Market</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4 sm:space-y-6 animate-fade-in">
              <WalletCard />
              <TransactionList limit={3} />
            </TabsContent>
            
            <TabsContent value="market" className="space-y-4 sm:space-y-6 animate-fade-in">
              <CryptoPriceCard />
            </TabsContent>
          </Tabs>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 py-6 sm:py-10">
            <div className="text-center space-y-2 sm:space-y-3">
              <h1 className="text-2xl sm:text-3xl font-bold">Welcome to Glimpse</h1>
              <p className="text-sm sm:text-base text-muted-foreground max-w-xs sm:max-w-sm">
                A secure crypto wallet with real-time market data and easy-to-use transaction features
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full max-w-xs sm:max-w-sm">
              <Button asChild size="lg" className="w-full">
                <Link to="/signin" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Link>
              </Button>
              
              <Button asChild size="lg" variant="outline" className="w-full">
                <Link to="/signup" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Sign Up
                </Link>
              </Button>
            </div>
            
            <div className="mt-6 sm:mt-8 space-y-6 sm:space-y-8 w-full">
              <CryptoPriceCard />
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
