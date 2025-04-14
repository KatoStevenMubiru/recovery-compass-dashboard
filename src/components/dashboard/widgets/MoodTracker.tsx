
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SmilePlus } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { weeklyProgressData } from "@/services/mockData";

export const MoodTracker = () => {
  return (
    <Card className="gradient-card border-0 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-primary flex items-center gap-2">
          <SmilePlus className="h-5 w-5" />
          Weekly Mood
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={weeklyProgressData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4ECDC4" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4ECDC4" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorCravings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF6B6B" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FF6B6B" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                domain={[0, 10]} 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickCount={6}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  border: 'none'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="mood" 
                stroke="#4ECDC4" 
                fillOpacity={1} 
                fill="url(#colorMood)" 
              />
              <Area 
                type="monotone" 
                dataKey="cravings" 
                stroke="#FF6B6B" 
                fillOpacity={1} 
                fill="url(#colorCravings)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center mt-2 text-xs gap-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#4ECDC4] mr-1"></div>
            <span>Mood (1-10)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#FF6B6B] mr-1"></div>
            <span>Cravings (1-10)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
