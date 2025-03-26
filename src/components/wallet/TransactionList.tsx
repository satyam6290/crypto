
import { useTransactions, Transaction } from "@/lib/cryptoApi";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import BlurContainer from "../ui/BlurContainer";
import { format } from "date-fns";
import { useIsMobile } from "@/hooks/use-mobile";

interface TransactionListProps {
  limit?: number;
  className?: string;
  showViewAll?: boolean;
}

const TransactionList = ({ limit, className, showViewAll = true }: TransactionListProps) => {
  const { transactions, loading } = useTransactions();
  const isMobile = useIsMobile();
  const displayTransactions = limit ? transactions.slice(0, limit) : transactions;

  const formatAddress = (address: string) => {
    // Shorter format for mobile screens
    if (isMobile) {
      return `${address.substring(0, 4)}...${address.substring(address.length - 3)}`;
    }
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <BlurContainer className={cn("w-full max-w-full overflow-hidden", className)}>
      <div className="p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-medium mb-2 sm:mb-3">Recent Transactions</h3>
        <div className="space-y-2 sm:space-y-3">
          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="h-14 sm:h-16 bg-gray-100 animate-pulse rounded-xl"></div>
            ))
          ) : displayTransactions.length > 0 ? (
            displayTransactions.map((transaction, index) => (
              <TransactionItem 
                key={transaction.id} 
                transaction={transaction} 
                formatAddress={formatAddress}
                delay={index * 0.05}
              />
            ))
          ) : (
            <div className="text-center py-3 sm:py-4 text-muted-foreground">
              No transactions yet
            </div>
          )}
        </div>
        
        {showViewAll && transactions.length > (limit || 0) && (
          <div className="mt-2 sm:mt-3 text-center">
            <a href="/transactions" className="text-xs sm:text-sm text-crypto-blue hover:underline">
              View all transactions
            </a>
          </div>
        )}
      </div>
    </BlurContainer>
  );
};

interface TransactionItemProps {
  transaction: Transaction;
  formatAddress: (address: string) => string;
  delay: number;
}

const TransactionItem = ({ transaction, formatAddress, delay }: TransactionItemProps) => {
  const isReceived = transaction.type === 'receive';
  
  return (
    <Card className="overflow-hidden shadow-sm border-0 animate-slide-up" style={{ animationDelay: `${delay}s` }}>
      <CardContent className="p-2 sm:p-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className={cn(
            "h-8 w-8 sm:h-10 sm:w-10 rounded-full mr-2 sm:mr-3 flex items-center justify-center",
            isReceived ? "bg-green-50" : "bg-red-50"
          )}>
            {isReceived ? (
              <ArrowDown className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
            ) : (
              <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
            )}
          </div>
          <div>
            <p className="font-medium text-sm sm:text-base">
              {isReceived ? "Received" : "Sent"} {transaction.currency}
            </p>
            <p className="text-xs text-muted-foreground truncate max-w-[120px] sm:max-w-[180px] md:max-w-none">
              {formatAddress(transaction.address)} • {format(new Date(transaction.timestamp), 'MMM dd')}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className={cn(
            "font-medium text-sm sm:text-base",
            isReceived ? "text-green-500" : "text-red-500"
          )}>
            {isReceived ? "+" : "-"}{transaction.amount} {transaction.currency}
          </p>
          <p className="text-xs text-muted-foreground capitalize">
            {transaction.status}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionList;
