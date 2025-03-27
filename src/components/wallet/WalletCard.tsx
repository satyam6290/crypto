
import { useWalletBalances, getTotalBalance } from "@/lib/cryptoApi";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import BlurContainer from "../ui/BlurContainer";
import { ArrowDown, ArrowUp, CreditCard } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useIsMobile, useIsTablet, useIsLaptop } from "@/hooks/use-mobile";

interface WalletCardProps {
  className?: string;
}

const WalletCard = ({ className }: WalletCardProps) => {
  const { balances, loading } = useWalletBalances();
  const totalBalance = getTotalBalance(balances);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isLaptop = useIsLaptop();

  return (
    <BlurContainer className={cn("overflow-hidden", className)} intensity="heavy">
      <CardHeader className="pb-2 sm:pb-3 lg:pb-4">
        <div className="flex justify-between items-center">
          <div className="space-y-1 sm:space-y-2">
            <p className="text-xs sm:text-sm lg:text-base font-medium text-muted-foreground">Total Balance</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold font-display tracking-tight animate-slide-up">
              ${totalBalance.toLocaleString('en-US', { maximumFractionDigits: 2 })}
            </h2>
          </div>
          <CreditCard className="text-muted-foreground h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
        </div>
      </CardHeader>
      <CardContent className="pb-3 sm:pb-4 lg:pb-5">
        <div className="flex gap-2 sm:gap-3 lg:gap-4 mb-3 sm:mb-4 lg:mb-5">
          <Button 
            variant="outline" 
            className="flex-1 py-4 sm:py-5 lg:py-6 bg-white/80 text-crypto-blue border-crypto-soft-blue group transition-all"
            asChild
          >
            <Link to="/send">
              <ArrowUp className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 mr-2 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-sm sm:text-base lg:text-lg">Send</span>
            </Link>
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 py-4 sm:py-5 lg:py-6 bg-white/80 text-crypto-blue border-crypto-soft-blue group transition-all"
            asChild
          >
            <Link to="/receive">
              <ArrowDown className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 mr-2 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-sm sm:text-base lg:text-lg">Receive</span>
            </Link>
          </Button>
        </div>
        
        <div className="space-y-2 sm:space-y-3 lg:space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="h-14 sm:h-16 lg:h-18 bg-gray-100 animate-pulse rounded-xl"></div>
            ))
          ) : (
            balances.map((balance) => (
              <Card key={balance.symbol} className="neo-morphism overflow-hidden">
                <CardContent className="p-2 sm:p-3 lg:p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-full overflow-hidden mr-2 sm:mr-3 lg:mr-4 bg-white p-1 flex items-center justify-center">
                      <img
                        src={balance.image}
                        alt={balance.currency}
                        className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm sm:text-base lg:text-lg">{balance.currency}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {balance.amount.toLocaleString('en-US', { maximumFractionDigits: 8 })} {balance.symbol}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm sm:text-base lg:text-lg">${balance.value.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
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
