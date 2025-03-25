
import TransactionList from "@/components/wallet/TransactionList";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Transactions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-crypto-soft-blue/20 to-crypto-soft-purple/20">
      <Header />
      
      <main className="pt-24 pb-20 px-4 mx-auto max-w-md">
        <div className="mb-6">
          <h1 className="text-2xl font-bold font-display">Transaction History</h1>
          <p className="text-muted-foreground">View all your wallet activities</p>
        </div>
        
        <TransactionList showViewAll={false} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Transactions;
