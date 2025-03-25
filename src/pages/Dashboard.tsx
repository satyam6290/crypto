
import { useState } from "react";
import { useCryptoPrices } from "@/lib/cryptoApi";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BlurContainer from "@/components/ui/BlurContainer";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, BarChart } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Dashboard = () => {
  const [chartType, setChartType] = useState<"line" | "bar">("line");
  const { prices, loading } = useCryptoPrices();

  // Generate some sample data for the charts
  const generateChartData = () => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const data = [];

    for (let i = 0; i < 7; i++) {
      const entry: Record<string, any> = { name: days[i] };
      
      prices.forEach(crypto => {
        // Generate a random value based on current price
        const randomFactor = 0.95 + (Math.random() * 0.1); // +/- 5%
        entry[crypto.symbol] = Math.round(crypto.current_price * randomFactor * 100) / 100;
      });
      
      data.push(entry);
    }

    return data;
  };

  const chartData = prices.length ? generateChartData() : [];

  // Create color map for the chart
  const colorMap: Record<string, string> = {
    btc: "#F7931A",
    eth: "#627EEA",
    sol: "#00FFA3",
    ada: "#0033AD",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-crypto-soft-blue/20 to-crypto-soft-purple/20">
      <Header />
      
      <main className="pt-24 pb-20 px-4 mx-auto max-w-md">
        <h1 className="text-2xl font-bold mb-4">Market Trends</h1>
        
        <Tabs defaultValue="price" className="w-full mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="price">Price Charts</TabsTrigger>
            <TabsTrigger value="volume">Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="price" className="animate-fade-in">
            <BlurContainer className="p-4 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Price Trends</h3>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setChartType("line")} 
                    className={`p-1.5 rounded-md ${chartType === "line" ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}
                  >
                    <LineChart size={18} />
                  </button>
                  <button 
                    onClick={() => setChartType("bar")} 
                    className={`p-1.5 rounded-md ${chartType === "bar" ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}
                  >
                    <BarChart size={18} />
                  </button>
                </div>
              </div>
              
              <div className="h-64 w-full">
                {loading ? (
                  <div className="h-full w-full flex items-center justify-center">
                    <p className="text-muted-foreground">Loading chart data...</p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    {chartType === "line" ? (
                      <RechartsLineChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Legend />
                        {prices.map(crypto => (
                          <Line 
                            key={crypto.id}
                            type="monotone" 
                            dataKey={crypto.symbol} 
                            name={crypto.name}
                            stroke={colorMap[crypto.symbol] || "#8884d8"} 
                            activeDot={{ r: 6 }} 
                          />
                        ))}
                      </RechartsLineChart>
                    ) : (
                      <RechartsBarChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Legend />
                        {prices.map(crypto => (
                          <Bar 
                            key={crypto.id}
                            dataKey={crypto.symbol} 
                            name={crypto.name}
                            fill={colorMap[crypto.symbol] || "#8884d8"} 
                          />
                        ))}
                      </RechartsBarChart>
                    )}
                  </ResponsiveContainer>
                )}
              </div>
            </BlurContainer>
          </TabsContent>
          
          <TabsContent value="volume" className="animate-fade-in">
            <BlurContainer className="p-4">
              <h3 className="font-medium mb-4">7-Day Performance</h3>
              <div className="space-y-3">
                {loading ? (
                  Array(4).fill(0).map((_, i) => (
                    <div key={i} className="h-16 bg-gray-100 animate-pulse rounded-xl"></div>
                  ))
                ) : (
                  prices.map(crypto => (
                    <Card key={crypto.id} className="p-3 shadow-sm border-0">
                      <div className="flex items-center justify-between">
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
                        <div className="w-24 h-12">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                              <defs>
                                <linearGradient id={`color${crypto.id}`} x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor={colorMap[crypto.symbol] || "#8884d8"} stopOpacity={0.8}/>
                                  <stop offset="95%" stopColor={colorMap[crypto.symbol] || "#8884d8"} stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <Area 
                                type="monotone" 
                                dataKey={crypto.symbol} 
                                stroke={colorMap[crypto.symbol] || "#8884d8"} 
                                fillOpacity={1}
                                fill={`url(#color${crypto.id})`} 
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </BlurContainer>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
