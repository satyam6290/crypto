
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BlurContainer from "@/components/ui/BlurContainer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useWalletBalances } from "@/lib/cryptoApi";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Send = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { balances } = useWalletBalances();
  const [selectedCrypto, setSelectedCrypto] = useState(balances[0]);
  const [showCryptoSelector, setShowCryptoSelector] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!recipientAddress) {
      toast({
        title: "Error",
        description: "Please enter a recipient address",
        variant: "destructive",
      });
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    if (parseFloat(amount) > selectedCrypto.amount) {
      toast({
        title: "Error",
        description: `Insufficient ${selectedCrypto.symbol} balance`,
        variant: "destructive",
      });
      return;
    }

    // Simulate sending crypto
    setSending(true);
    
    // Simulate network delay
    setTimeout(() => {
      toast({
        title: "Transaction sent",
        description: `${amount} ${selectedCrypto.symbol} sent to ${recipientAddress.substring(0, 6)}...${recipientAddress.substring(recipientAddress.length - 4)}`,
      });
      setSending(false);
      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-crypto-soft-blue/20 to-crypto-soft-purple/20">
      <Header />
      
      <main className="pt-24 pb-20 px-4 mx-auto max-w-md">
        <div className="mb-6">
          <h1 className="text-2xl font-bold font-display">Send Crypto</h1>
          <p className="text-muted-foreground">Send crypto to another wallet</p>
        </div>
        
        <BlurContainer className="overflow-hidden">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="crypto">Select Cryptocurrency</Label>
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
                          Balance: {selectedCrypto.amount.toLocaleString('en-US', { maximumFractionDigits: 8 })} {selectedCrypto.symbol}
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
                              {balance.amount.toLocaleString('en-US', { maximumFractionDigits: 8 })} {balance.symbol}
                            </p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient Address</Label>
              <Input 
                id="recipient" 
                placeholder="Enter or paste address"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="amount">Amount</Label>
                <button 
                  type="button" 
                  className="text-xs text-crypto-blue"
                  onClick={() => setAmount(selectedCrypto.amount.toString())}
                >
                  Use max
                </button>
              </div>
              <div className="flex">
                <Input 
                  id="amount" 
                  type="number"
                  min="0"
                  step="0.00000001"
                  placeholder="0.0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="rounded-r-none"
                />
                <div className="bg-muted px-3 flex items-center border border-l-0 rounded-r-md">
                  {selectedCrypto.symbol}
                </div>
              </div>
              {amount && (
                <p className="text-xs text-muted-foreground">
                  ≈ ${(parseFloat(amount) * (selectedCrypto.value / selectedCrypto.amount)).toLocaleString('en-US', { maximumFractionDigits: 2 })}
                </p>
              )}
            </div>
            
            <Button 
              className="w-full group" 
              onClick={handleSend}
              disabled={sending}
            >
              {sending ? (
                <div className="flex items-center">
                  <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                  Sending...
                </div>
              ) : (
                <>
                  Send
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </CardContent>
        </BlurContainer>
      </main>
      
      <Footer />
    </div>
  );
};

export default Send;
