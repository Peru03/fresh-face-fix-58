import { useEffect } from "react";
import { DollarSign, TrendingUp, Receipt, Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchDashboardData } from "@/store/slices/dashboardSlice";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { stats, recentExpenses, isLoading } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  const defaultStats = [
    {
      title: "Total Spent",
      value: "$12,450.00",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-primary",
    },
    {
      title: "Transactions",
      value: "248",
      change: "+8.2%",
      trend: "up",
      icon: Receipt,
      color: "text-accent",
    },
    {
      title: "Budget Remaining",
      value: "$7,550.00",
      change: "-5.4%",
      trend: "down",
      icon: TrendingUp,
      color: "text-success",
    },
    {
      title: "Avg. Transaction",
      value: "$50.20",
      change: "+3.1%",
      trend: "up",
      icon: Calendar,
      color: "text-warning",
    },
  ];

  const displayStats = Array.isArray(stats) ? stats : defaultStats;
  const displayExpenses = recentExpenses || [
    { id: 1, description: "Grocery Shopping", amount: -125.50, category: "Food", date: "Today" },
    { id: 2, description: "Netflix Subscription", amount: -15.99, category: "Entertainment", date: "Yesterday" },
    { id: 3, description: "Gas Station", amount: -45.00, category: "Transport", date: "2 days ago" },
    { id: 4, description: "Restaurant", amount: -67.30, category: "Food", date: "3 days ago" },
  ];

  return (
    <div className="min-h-screen bg-background p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Welcome back, John! 👋</h1>
          <p className="text-muted-foreground">Here's what's happening with your finances today.</p>
        </div>
        <Button className="bg-gradient-primary text-primary-foreground shadow-glow-primary hover:opacity-90">
          Add Expense
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className="border-border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-secondary ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="flex items-center mt-2 text-sm">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="w-4 h-4 text-success mr-1" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-destructive mr-1" />
                  )}
                  <span
                    className={stat.trend === "up" ? "text-success" : "text-destructive"}
                  >
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground ml-2">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts & Recent Expenses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spending Chart */}
        <Card className="lg:col-span-2 border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Spending Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-secondary/30 rounded-lg">
              <p className="text-muted-foreground">Chart component will go here</p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Expenses */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Expenses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {displayExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div>
                  <p className="font-medium text-foreground">{expense.description}</p>
                  <p className="text-xs text-muted-foreground">{expense.category} • {expense.date}</p>
                </div>
                <span className="font-semibold text-destructive">${Math.abs(expense.amount).toFixed(2)}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Food", amount: 2450, percentage: 35, color: "bg-primary" },
              { name: "Transport", amount: 1200, percentage: 20, color: "bg-accent" },
              { name: "Entertainment", amount: 850, percentage: 15, color: "bg-success" },
              { name: "Other", amount: 1500, percentage: 30, color: "bg-warning" },
            ].map((category) => (
              <div key={category.name} className="p-4 rounded-lg bg-secondary/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{category.name}</span>
                  <span className="text-xs text-muted-foreground">{category.percentage}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full ${category.color}`}
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
                <p className="mt-2 text-lg font-semibold text-foreground">${category.amount}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
