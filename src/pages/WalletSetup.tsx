
import { useState } from "react";
import { Button } from "@/components/ui/button";
import BlurContainer from "@/components/ui/BlurContainer";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { generateWallet } from "@/lib/cryptoApi";
import { useNavigate } from "react-router-dom";
import { CreditCard, Wallet, ArrowRight } from "lucide-react";

const WalletSetup = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [step, setStep] = useState(1);
  const [wallet, setWallet] = useState<{privateKey: string, address: string} | null>(null);
  const [seedPhraseConfirmed, setSeedPhraseConfirmed] = useState(false);
  const [privateKey, setPrivateKey] = useState("");
  const navigate = useNavigate();

  const handleCreateWallet = () => {
    const newWallet = generateWallet();
    setWallet(newWallet);
    setStep(2);
  };

  const handleImportWallet = () => {
    // In a real app, this would validate and import based on the private key
    const mockAddress = '0x' + Array.from({length: 40}, () => 
      Math.floor(Math.random() * 16).toString(16)).join('');
    
    setWallet({
      privateKey,
      address: mockAddress
    });
    
    navigate("/");
  };

  const handleConfirmSeedPhrase = () => {
    setSeedPhraseConfirmed(true);
  };

  const handleFinishSetup = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-crypto-soft-blue/20 to-crypto-soft-purple/20 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-slide-down">
          <Wallet className="w-12 h-12 text-crypto-blue mx-auto mb-4" />
          <h1 className="text-3xl font-bold font-display mb-2">Glimpse Wallet</h1>
          <p className="text-muted-foreground">Secure. Simple. Seamless.</p>
        </div>
      
        <BlurContainer className="mb-6 animate-scale-in" intensity="heavy">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="create">Create Wallet</TabsTrigger>
              <TabsTrigger value="import">Import Wallet</TabsTrigger>
            </TabsList>
            
            <TabsContent value="create" className="p-4 animate-fade-in">
              {step === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-center">Create a New Wallet</h2>
                    <p className="text-muted-foreground text-center">
                      Generate a new wallet to store your cryptocurrencies
                    </p>
                  </div>
                  
                  <Card className="neo-morphism overflow-hidden border-0">
                    <CardContent className="p-6 flex items-center">
                      <div className="h-12 w-12 rounded-full bg-crypto-soft-blue flex items-center justify-center mr-4">
                        <CreditCard className="h-6 w-6 text-crypto-blue" />
                      </div>
                      <div>
                        <h3 className="font-medium">New Wallet</h3>
                        <p className="text-sm text-muted-foreground">
                          Generate a secure wallet with a private key
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Button 
                    className="w-full py-6 bg-crypto-blue hover:bg-crypto-blue/90"
                    onClick={handleCreateWallet}
                  >
                    Create Wallet
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              )}
              
              {step === 2 && wallet && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-center">Backup Your Wallet</h2>
                    <p className="text-muted-foreground text-center">
                      Store this private key in a secure place - it's the only way to recover your wallet
                    </p>
                  </div>
                  
                  <Card className="neo-morphism overflow-hidden border-0">
                    <CardContent className="p-4">
                      <div className="bg-crypto-soft-gray p-3 rounded-lg text-sm font-mono break-all">
                        {wallet.privateKey}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {!seedPhraseConfirmed ? (
                    <Button 
                      className="w-full py-6 bg-crypto-blue hover:bg-crypto-blue/90"
                      onClick={handleConfirmSeedPhrase}
                    >
                      I've Saved My Private Key
                    </Button>
                  ) : (
                    <Button 
                      className="w-full py-6 bg-crypto-blue hover:bg-crypto-blue/90"
                      onClick={handleFinishSetup}
                    >
                      Complete Setup
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  )}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="import" className="p-4 animate-fade-in">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-center">Import Existing Wallet</h2>
                  <p className="text-muted-foreground text-center">
                    Enter your private key to access your wallet
                  </p>
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm font-medium">Private Key</label>
                  <Input
                    className="w-full font-mono"
                    placeholder="Enter private key"
                    value={privateKey}
                    onChange={(e) => setPrivateKey(e.target.value)}
                  />
                </div>
                
                <Button 
                  className="w-full py-6 bg-crypto-blue hover:bg-crypto-blue/90"
                  onClick={handleImportWallet}
                  disabled={!privateKey}
                >
                  Import Wallet
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </BlurContainer>
        
        <p className="text-center text-sm text-muted-foreground animate-fade-in">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default WalletSetup;
