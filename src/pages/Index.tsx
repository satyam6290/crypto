
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
import { useIsMobile, useIsTablet, useIsLaptop, useIsDesktop } from "@/hooks/use-mobile";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { isAuthenticated } = useAuth();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isLaptop = useIsLaptop();
  const isDesktop = useIsDesktop();

  return (
    <div className="min-h-screen bg-gradient-to-b from-crypto-soft-blue/20 to-crypto-soft-purple/20">
      <AuthHeader />
      
      <main className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-16 sm:pb-20 md:pb-24 lg:pb-28 px-3 sm:px-4 md:px-6 lg:px-8 mx-auto max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
        {isAuthenticated ? (
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6 lg:mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="market">Market</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                <WalletCard className="md:col-span-2" />
                <TransactionList limit={3} className="mt-4 md:mt-0" />
                <div className="hidden md:block">
                  <CryptoPriceCard />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="market" className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 animate-fade-in">
              <CryptoPriceCard />
            </TabsContent>
          </Tabs>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 py-6 sm:py-10 md:py-12 lg:py-16">
            <div className="text-center space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Welcome to Glimpse</h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl">
                A secure crypto wallet with real-time market data and easy-to-use transaction features
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
              <Button asChild size="lg" className="w-full">
                <Link to="/signin" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4 sm:h-5 sm:w-5" />
                  Sign In
                </Link>
              </Button>
              
              <Button asChild size="lg" variant="outline" className="w-full">
                <Link to="/signup" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4 sm:h-5 sm:w-5" />
                  Sign Up
                </Link>
              </Button>
            </div>
            
            <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                <CryptoPriceCard className="lg:col-span-2" />
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
