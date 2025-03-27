
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
import { useIsMobile, useIsTablet, useIsLaptop, useIsDesktop } from "@/hooks/use-mobile";

const Dashboard = () => {
  const [chartType, setChartType] = useState<"line" | "bar">("line");
  const { prices, loading } = useCryptoPrices();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isLaptop = useIsLaptop();
  const isDesktop = useIsDesktop();

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
      
      <main className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-16 sm:pb-20 md:pb-24 lg:pb-28 px-3 sm:px-4 md:px-6 lg:px-8 mx-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl xl:max-w-6xl">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 md:mb-8">Market Trends</h1>
        
        <Tabs defaultValue="price" className="w-full mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="price">Price Charts</TabsTrigger>
            <TabsTrigger value="volume">Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="price" className="animate-fade-in">
            <BlurContainer className="p-3 sm:p-4 md:p-5 lg:p-6 mb-4">
              <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-5">
                <h3 className="font-medium text-sm sm:text-base md:text-lg lg:text-xl">Price Trends</h3>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setChartType("line")} 
                    className={`p-1 sm:p-1.5 rounded-md ${chartType === "line" ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}
                  >
                    <LineChart size={isMobile ? 16 : isTablet ? 18 : 20} />
                  </button>
                  <button 
                    onClick={() => setChartType("bar")} 
                    className={`p-1 sm:p-1.5 rounded-md ${chartType === "bar" ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}
                  >
                    <BarChart size={isMobile ? 16 : isTablet ? 18 : 20} />
                  </button>
                </div>
              </div>
              
              <div className="h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 w-full">
                {loading ? (
                  <div className="h-full w-full flex items-center justify-center">
                    <p className="text-muted-foreground">Loading chart data...</p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    {chartType === "line" ? (
                      <RechartsLineChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis 
                          dataKey="name" 
                          tick={{ fontSize: isMobile ? 10 : isTablet ? 12 : 14 }} 
                          padding={{ left: 10, right: 10 }}
                        />
                        <YAxis 
                          tick={{ fontSize: isMobile ? 10 : isTablet ? 12 : 14 }}
                          width={isMobile ? 30 : isTablet ? 40 : 50}
                        />
                        <Tooltip />
                        <Legend 
                          wrapperStyle={{ 
                            fontSize: isMobile ? 10 : isTablet ? 12 : 14,
                            marginTop: isMobile ? 5 : 10,
                            paddingTop: isMobile ? 5 : 10
                          }} 
                        />
                        {prices.map(crypto => (
                          <Line 
                            key={crypto.id}
                            type="monotone" 
                            dataKey={crypto.symbol} 
                            name={crypto.name}
                            stroke={colorMap[crypto.symbol] || "#8884d8"} 
                            strokeWidth={isMobile ? 1.5 : 2}
                            activeDot={{ r: isMobile ? 4 : 6 }} 
                          />
                        ))}
                      </RechartsLineChart>
                    ) : (
                      <RechartsBarChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis 
                          dataKey="name" 
                          tick={{ fontSize: isMobile ? 10 : isTablet ? 12 : 14 }}
                          padding={{ left: 10, right: 10 }} 
                        />
                        <YAxis 
                          tick={{ fontSize: isMobile ? 10 : isTablet ? 12 : 14 }}
                          width={isMobile ? 30 : isTablet ? 40 : 50}
                        />
                        <Tooltip />
                        <Legend 
                          wrapperStyle={{ 
                            fontSize: isMobile ? 10 : isTablet ? 12 : 14,
                            marginTop: isMobile ? 5 : 10,
                            paddingTop: isMobile ? 5 : 10
                          }} 
                        />
                        {prices.map(crypto => (
                          <Bar 
                            key={crypto.id}
                            dataKey={crypto.symbol} 
                            name={crypto.name}
                            fill={colorMap[crypto.symbol] || "#8884d8"} 
                            barSize={isMobile ? 15 : isTablet ? 20 : 25}
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
            <BlurContainer className="p-3 sm:p-4 md:p-5 lg:p-6">
              <h3 className="font-medium mb-3 sm:mb-4 md:mb-5 text-sm sm:text-base md:text-lg lg:text-xl">7-Day Performance</h3>
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                {loading ? (
                  Array(4).fill(0).map((_, i) => (
                    <div key={i} className="h-12 sm:h-14 md:h-16 lg:h-18 bg-gray-100 animate-pulse rounded-xl"></div>
                  ))
                ) : (
                  prices.map(crypto => (
                    <Card key={crypto.id} className="p-2 sm:p-3 md:p-4 shadow-sm border-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full overflow-hidden mr-2 sm:mr-3 md:mr-4 bg-white p-1">
                            <img
                              src={crypto.image}
                              alt={crypto.name}
                              className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 object-contain"
                              loading="lazy"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-xs sm:text-sm md:text-base lg:text-lg">{crypto.name}</p>
                            <p className="text-xxs sm:text-xs text-muted-foreground uppercase">{crypto.symbol}</p>
                          </div>
                        </div>
                        <div className="w-20 sm:w-24 md:w-28 h-10 sm:h-12 md:h-14">
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
