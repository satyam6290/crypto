
import { useCryptoPrices, CryptoPrice } from "@/lib/cryptoApi";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import BlurContainer from "../ui/BlurContainer";

interface CryptoPriceCardProps {
  className?: string;
}

const CryptoPriceCard = ({ className }: CryptoPriceCardProps) => {
  const { prices, loading } = useCryptoPrices();

  return (
    <BlurContainer className={cn("", className)}>
      <div className="p-4">
        <h3 className="text-lg font-medium mb-3">Market Prices</h3>
        <div className="space-y-3">
          {loading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="h-14 bg-gray-100 animate-pulse rounded-xl"></div>
            ))
          ) : (
            prices.map((crypto, index) => (
              <PriceItem 
                key={crypto.id} 
                crypto={crypto} 
                delay={index * 0.05}
              />
            ))
          )}
        </div>
      </div>
    </BlurContainer>
  );
};

interface PriceItemProps {
  crypto: CryptoPrice;
  delay: number;
}

const PriceItem = ({ crypto, delay }: PriceItemProps) => {
  const priceChangeIsPositive = crypto.price_change_percentage_24h >= 0;
  
  return (
    <Card className="overflow-hidden shadow-sm border-0 animate-slide-up" style={{ animationDelay: `${delay}s` }}>
      <CardContent className="p-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full overflow-hidden mr-3 bg-white p-1">
            <img
              src={crypto.image}
              alt={crypto.name}
              className="h-8 w-8 object-contain"
              loading="lazy"
            />
          </div>
          <div>
            <p className="font-medium">{crypto.name}</p>
            <p className="text-xs text-muted-foreground uppercase">{crypto.symbol}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-medium">${crypto.current_price.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
          <p className={cn(
            "text-xs",
            priceChangeIsPositive ? "text-green-500" : "text-red-500"
          )}>
            {priceChangeIsPositive ? "+" : ""}
            {crypto.price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CryptoPriceCard;
