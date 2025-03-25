
import { useState, useEffect } from 'react';

// Types
export interface CryptoPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

export interface Transaction {
  id: string;
  type: 'send' | 'receive';
  amount: number;
  currency: string;
  timestamp: number;
  address: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface WalletBalance {
  currency: string;
  symbol: string;
  amount: number;
  value: number;
  image: string;
}

// Mock data for development
const mockCryptoPrices: CryptoPrice[] = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    current_price: 45342.12,
    price_change_percentage_24h: 2.34,
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    current_price: 2456.78,
    price_change_percentage_24h: -1.12,
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
  },
  {
    id: 'solana',
    symbol: 'sol',
    name: 'Solana',
    current_price: 123.45,
    price_change_percentage_24h: 5.67,
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
  },
  {
    id: 'cardano',
    symbol: 'ada',
    name: 'Cardano',
    current_price: 0.53,
    price_change_percentage_24h: 0.32,
    image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
  },
];

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'receive',
    amount: 0.25,
    currency: 'BTC',
    timestamp: Date.now() - 3600000, // 1 hour ago
    address: '0x1a2b3c4d5e6f...',
    status: 'completed',
  },
  {
    id: '2',
    type: 'send',
    amount: 1.5,
    currency: 'ETH',
    timestamp: Date.now() - 86400000, // 1 day ago
    address: '0x6f5e4d3c2b1a...',
    status: 'completed',
  },
  {
    id: '3',
    type: 'receive',
    amount: 50,
    currency: 'SOL',
    timestamp: Date.now() - 259200000, // 3 days ago
    address: '0x3c2b1a6f5e4d...',
    status: 'completed',
  },
  {
    id: '4',
    type: 'send',
    amount: 0.05,
    currency: 'BTC',
    timestamp: Date.now() - 604800000, // 1 week ago
    address: '0x4d5e6f1a2b3c...',
    status: 'completed',
  },
];

const mockWalletBalances: WalletBalance[] = [
  {
    currency: 'Bitcoin',
    symbol: 'BTC',
    amount: 0.75,
    value: 34006.59,
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
  },
  {
    currency: 'Ethereum',
    symbol: 'ETH',
    amount: 4.2,
    value: 10318.48,
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
  },
  {
    currency: 'Solana',
    symbol: 'SOL',
    amount: 50,
    value: 6172.50,
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
  },
];

// Hooks
export const useCryptoPrices = () => {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // In a real app, we would fetch from a real API
        // const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1');
        // const data = await response.json();
        
        // Using mock data for now
        setPrices(mockCryptoPrices);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch cryptocurrency prices');
        setLoading(false);
      }
    };

    fetchPrices();
    
    // Simulating real-time updates with an interval
    const interval = setInterval(() => {
      setPrices(prevPrices => 
        prevPrices.map(price => ({
          ...price,
          current_price: price.current_price * (1 + (Math.random() * 0.004 - 0.002)),
          price_change_percentage_24h: price.price_change_percentage_24h + (Math.random() * 0.4 - 0.2),
        }))
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return { prices, loading, error };
};

export const useTransactions = () => {
  // In a real app, we would fetch from a blockchain API
  return { transactions: mockTransactions, loading: false };
};

export const useWalletBalances = () => {
  // In a real app, we would calculate this from blockchain data
  const [balances, setBalances] = useState(mockWalletBalances);
  const { prices } = useCryptoPrices();
  
  useEffect(() => {
    if (prices.length > 0) {
      setBalances(prevBalances => 
        prevBalances.map(balance => {
          const price = prices.find(p => p.symbol === balance.symbol.toLowerCase());
          return {
            ...balance,
            value: price ? balance.amount * price.current_price : balance.value
          };
        })
      );
    }
  }, [prices]);

  return { balances, loading: false };
};

export const getTotalBalance = (balances: WalletBalance[]) => {
  return balances.reduce((total, balance) => total + balance.value, 0);
};

// Send cryptocurrency function
export const sendCrypto = (
  amount: number, 
  currency: string, 
  recipientAddress: string
): Promise<Transaction> => {
  // In a real app, this would use a blockchain library to create and broadcast transactions
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      const newTransaction: Transaction = {
        id: `tx_${Date.now()}`,
        type: 'send',
        amount,
        currency,
        timestamp: Date.now(),
        address: recipientAddress,
        status: 'pending',
      };
      
      // Add transaction to mock data
      mockTransactions.unshift(newTransaction);
      
      // Simulate transaction confirmation
      setTimeout(() => {
        const index = mockTransactions.findIndex(tx => tx.id === newTransaction.id);
        if (index !== -1) {
          mockTransactions[index].status = 'completed';
        }
      }, 5000);
      
      resolve(newTransaction);
    }, 1000);
  });
};

// Placeholder for wallet generation functionality
export const generateWallet = () => {
  // In a real app, this would use a library like ethers.js or web3.js
  const mockPrivateKey = Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('');
  const mockAddress = '0x' + Array.from({length: 40}, () => Math.floor(Math.random() * 16).toString(16)).join('');
  
  return {
    privateKey: mockPrivateKey,
    address: mockAddress,
  };
};
