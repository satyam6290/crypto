
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BlurContainer from "@/components/ui/BlurContainer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWalletBalances, generateWallet } from "@/lib/cryptoApi";
import { ChevronDown, Copy, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Receive = () => {
  const { toast } = useToast();
  const { balances } = useWalletBalances();
  const [selectedCrypto, setSelectedCrypto] = useState(balances[0]);
  const [showCryptoSelector, setShowCryptoSelector] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Get wallet address from the wallet generation function
  const { address } = generateWallet();

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    toast({
      title: "Address copied",
      description: "Wallet address copied to clipboard",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-crypto-soft-blue/20 to-crypto-soft-purple/20">
      <Header />
      
      <main className="pt-24 pb-20 px-4 mx-auto max-w-md">
        <div className="mb-6">
          <h1 className="text-2xl font-bold font-display">Receive Crypto</h1>
          <p className="text-muted-foreground">Receive crypto to your wallet</p>
        </div>
        
        <BlurContainer className="overflow-hidden">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-medium mb-2">Select Cryptocurrency</p>
              <div className="relative">
                <Card 
                  className="cursor-pointer" 
                  onClick={() => setShowCryptoSelector(!showCryptoSelector)}
                >
                  <CardContent className="p-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden mr-3 bg-white p-1 flex items-center justify-center">
                        <img
                          src={selectedCrypto.image}
                          alt={selectedCrypto.currency}
                          className="h-8 w-8 object-contain"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{selectedCrypto.currency}</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedCrypto.symbol}
                        </p>
                      </div>
                    </div>
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  </CardContent>
                </Card>
                
                {showCryptoSelector && (
                  <Card className="absolute left-0 right-0 top-full mt-1 z-10 max-h-60 overflow-auto shadow-lg">
                    <CardContent className="p-0">
                      {balances.map((balance) => (
                        <div 
                          key={balance.symbol}
                          className="p-3 flex items-center hover:bg-accent cursor-pointer"
                          onClick={() => {
                            setSelectedCrypto(balance);
                            setShowCryptoSelector(false);
                          }}
                        >
                          <div className="h-8 w-8 rounded-full overflow-hidden mr-3 bg-white p-1 flex items-center justify-center">
                            <img
                              src={balance.image}
                              alt={balance.currency}
                              className="h-6 w-6 object-contain"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{balance.currency}</p>
                            <p className="text-xs text-muted-foreground">
                              {balance.symbol}
                            </p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center py-4">
              <div className="w-56 h-56 bg-white p-4 rounded-lg mb-4 flex items-center justify-center">
                <div className="bg-crypto-blue rounded-lg p-2">
                  {/* This would be a real QR code in production */}
                  <svg 
                    width="200" 
                    height="200" 
                    viewBox="0 0 200 200" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="bg-white"
                  >
                    <rect x="20" y="20" width="40" height="40" fill="black" />
                    <rect x="140" y="20" width="40" height="40" fill="black" />
                    <rect x="20" y="140" width="40" height="40" fill="black" />
                    <rect x="70" y="20" width="10" height="10" fill="black" />
                    <rect x="120" y="20" width="10" height="10" fill="black" />
                    <rect x="70" y="170" width="10" height="10" fill="black" />
                    <rect x="20" y="70" width="10" height="10" fill="black" />
                    <rect x="170" y="70" width="10" height="10" fill="black" />
                    <rect x="120" y="120" width="40" height="40" fill="black" />
                    <rect x="70" y="70" width="60" height="10" fill="black" />
                    <rect x="70" y="120" width="10" height="10" fill="black" />
                    <rect x="90" y="140" width="10" height="10" fill="black" />
                  </svg>
                </div>
              </div>
              
              <p className="text-center text-sm mb-2">Your {selectedCrypto.symbol} Address</p>
              <p className="text-center text-xs text-muted-foreground mb-4 font-mono bg-muted px-3 py-2 rounded">
                {address}
              </p>
              
              <Button
                variant="outline"
                className="gap-2"
                onClick={handleCopyAddress}
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy Address
                  </>
                )}
              </Button>
            </div>
            
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
              <p className="font-medium mb-1">Important:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Only send {selectedCrypto.symbol} to this address</li>
                <li>Sending any other cryptocurrency may result in permanent loss</li>
                <li>Verify the address before sending large amounts</li>
              </ul>
            </div>
          </CardContent>
        </BlurContainer>
      </main>
      
      <Footer />
    </div>
  );
};

export default Receive;
