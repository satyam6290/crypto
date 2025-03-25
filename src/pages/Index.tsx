
import { useState } from "react";
import WalletCard from "@/components/wallet/WalletCard";
import CryptoPriceCard from "@/components/wallet/CryptoPrice";
import TransactionList from "@/components/wallet/TransactionList";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-b from-crypto-soft-blue/20 to-crypto-soft-purple/20">
      <Header />
      
      <main className="pt-24 pb-20 px-4 mx-auto max-w-md">
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="market">Market</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 animate-fade-in">
            <WalletCard />
            <TransactionList limit={3} />
          </TabsContent>
          
          <TabsContent value="market" className="space-y-6 animate-fade-in">
            <CryptoPriceCard />
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
