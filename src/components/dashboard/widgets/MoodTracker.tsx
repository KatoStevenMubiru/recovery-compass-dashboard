import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SmilePlus } from "lucide-react";
import { useDailyCheckIn } from "@/hooks/useRecovery";
import { format, subDays } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import authService from "@/services/authService";
import { recoveryService } from "@/services/recoveryService";

interface WeeklyData {
  date: string;
  mood: number | null;
  cravings: number | null;
  mood_notes: string | null;
}

interface WeeklyResponse {
  weekly_data: WeeklyData[];
  averages: {
    mood_average: number | null;
    cravings_average: number | null;
  };
}

export const MoodTracker = () => {
  const { data: dailyCheckIn, isLoading: checkInLoading } = useDailyCheckIn();
  const { data: weeklyData, isLoading: weeklyLoading } =
    useQuery<WeeklyResponse>({
      queryKey: ["weekly-mood-cravings"],
      queryFn: () =>
        recoveryService.getWeeklyMoodCravings(authService.getAccessToken()),
    });

  const isLoading = checkInLoading || weeklyLoading;

  // Format the data for the chart
  const chartData =
    weeklyData?.weekly_data.map((entry) => ({
      day: format(new Date(entry.date), "EEE"),
      mood: entry.mood ?? 0,
      cravings: entry.cravings ?? 0,
    })) ?? [];

  return (
    <Card className="gradient-card border-0 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-primary flex items-center gap-2">
          <SmilePlus className="h-5 w-5" />
          Weekly Mood
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-3">
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        ) : chartData.length === 0 ? (
          <div className="text-center py-3">
            <p className="text-sm text-muted-foreground">
              No mood data available for the past week
            </p>
          </div>
        ) : (
          <>
            <div className="h-[200px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  barGap={8}
                >
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
                      backgroundColor: "white",
                      borderRadius: "0.5rem",
                      boxShadow:
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      border: "none",
                    }}
                  />
                  <Legend
                    verticalAlign="top"
                    height={36}
                    content={({ payload }) => (
                      <div className="flex justify-center gap-4 text-xs">
                        {payload?.map((entry, index) => (
                          <div key={index} className="flex items-center">
                            <div
                              className="w-3 h-3 rounded-full mr-1"
                              style={{ backgroundColor: entry.color }}
                            />
                            <span>{entry.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  />
                  <Bar
                    dataKey="mood"
                    fill="#4ECDC4"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={30}
                  />
                  <Bar
                    dataKey="cravings"
                    fill="#FF6B6B"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Today's Mood</span>
                <span className="font-medium">
                  {dailyCheckIn?.mood ?? "N/A"}/10
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Today's Cravings</span>
                <span className="font-medium">
                  {dailyCheckIn?.cravings ?? "N/A"}/10
                </span>
              </div>
              {weeklyData?.averages.mood_average && (
                <div className="flex justify-between text-sm">
                  <span>Weekly Mood Average</span>
                  <span className="font-medium">
                    {weeklyData.averages.mood_average.toFixed(1)}/10
                  </span>
                </div>
              )}
              {weeklyData?.averages.cravings_average && (
                <div className="flex justify-between text-sm">
                  <span>Weekly Cravings Average</span>
                  <span className="font-medium">
                    {weeklyData.averages.cravings_average.toFixed(1)}/10
                  </span>
                </div>
              )}
              {dailyCheckIn?.mood_notes && (
                <div className="text-sm text-muted-foreground mt-2">
                  <span className="font-medium">Notes:</span>{" "}
                  {dailyCheckIn.mood_notes}
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
