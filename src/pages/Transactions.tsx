
import TransactionList from "@/components/wallet/TransactionList";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useIsMobile, useIsTablet, useIsLaptop, useIsDesktop } from "@/hooks/use-mobile";

const Transactions = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isLaptop = useIsLaptop();
  const isDesktop = useIsDesktop();

  return (
    <div className="min-h-screen bg-gradient-to-b from-crypto-soft-blue/20 to-crypto-soft-purple/20">
      <Header />
      
      <main className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-16 sm:pb-20 md:pb-24 lg:pb-28 px-3 sm:px-4 md:px-6 lg:px-8 mx-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl xl:max-w-6xl">
        <div className="mb-4 sm:mb-5 md:mb-6 lg:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-display">Transaction History</h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground">View all your wallet activities</p>
        </div>
        
        <TransactionList showViewAll={false} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Transactions;
