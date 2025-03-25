
import { useWalletBalances, getTotalBalance } from "@/lib/cryptoApi";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import BlurContainer from "../ui/BlurContainer";
import { ArrowDown, ArrowUp, CreditCard } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

interface WalletCardProps {
  className?: string;
}

const WalletCard = ({ className }: WalletCardProps) => {
  const { balances, loading } = useWalletBalances();
  const totalBalance = getTotalBalance(balances);

  return (
    <BlurContainer className={cn("overflow-hidden", className)} intensity="heavy">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Total Balance</p>
            <h2 className="text-3xl font-semibold font-display tracking-tight animate-slide-up">
              ${totalBalance.toLocaleString('en-US', { maximumFractionDigits: 2 })}
            </h2>
          </div>
          <CreditCard className="text-muted-foreground h-7 w-7" />
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex gap-3 mb-4">
          <Button 
            variant="outline" 
            className="flex-1 py-6 bg-white/80 text-crypto-blue border-crypto-soft-blue group transition-all"
            asChild
          >
            <Link to="/send">
              <ArrowUp className="h-6 w-6 mr-2 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Send</span>
            </Link>
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 py-6 bg-white/80 text-crypto-blue border-crypto-soft-blue group transition-all"
            asChild
          >
            <Link to="/receive">
              <ArrowDown className="h-6 w-6 mr-2 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Receive</span>
            </Link>
          </Button>
        </div>
        
        <div className="space-y-3 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="h-14 bg-gray-100 animate-pulse rounded-xl"></div>
            ))
          ) : (
            balances.map((balance) => (
              <Card key={balance.symbol} className="neo-morphism overflow-hidden">
                <CardContent className="p-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full overflow-hidden mr-3 bg-white p-1 flex items-center justify-center">
                      <img
                        src={balance.image}
                        alt={balance.currency}
                        className="h-8 w-8 object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{balance.currency}</p>
                      <p className="text-sm text-muted-foreground">
                        {balance.amount.toLocaleString('en-US', { maximumFractionDigits: 8 })} {balance.symbol}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${balance.value.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </BlurContainer>
  );
};

export default WalletCard;
