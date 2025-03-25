
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BlurContainer from "../ui/BlurContainer";
import { cn } from "@/lib/utils";

interface QRScannerProps {
  onScan: (data: string) => void;
  className?: string;
}

const QRScanner = ({ onScan, className }: QRScannerProps) => {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startScanning = () => {
    setScanning(true);
    setError(null);
    
    // Simulate successful scan after 2 seconds
    setTimeout(() => {
      const mockAddress = '0x' + Array.from({length: 40}, () => 
        Math.floor(Math.random() * 16).toString(16)).join('');
      onScan(mockAddress);
      setScanning(false);
    }, 2000);
  };

  return (
    <BlurContainer className={cn("", className)}>
      <div className="p-4">
        <h3 className="text-lg font-medium mb-3">Scan QR Code</h3>
        
        <Card className="overflow-hidden border-0 animate-scale-in">
          <CardContent className="p-0">
            <div className="aspect-square w-full bg-neutral-100 relative">
              {scanning ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 border-4 border-crypto-blue border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <p className="text-center text-muted-foreground mb-4">
                    Scan a QR code to get wallet address
                  </p>
                  <Button 
                    onClick={startScanning}
                    className="bg-crypto-blue hover:bg-crypto-blue/90"
                  >
                    Start Camera
                  </Button>
                </div>
              )}
              
              {/* Scan overlay animation */}
              {scanning && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 border-2 border-crypto-blue rounded-lg"></div>
                  <div className="absolute w-full h-0.5 bg-crypto-blue/70 animate-ping top-1/2 left-0 transform -translate-y-1/2"></div>
                  
                  {/* Corner markers */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-crypto-blue"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-crypto-blue"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-crypto-blue"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-crypto-blue"></div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {error && (
          <div className="mt-3 text-red-500 text-sm">
            {error}
          </div>
        )}
        
        <div className="mt-4 text-center text-xs text-muted-foreground">
          Point your camera at a QR code to scan
        </div>
      </div>
    </BlurContainer>
  );
};

export default QRScanner;
