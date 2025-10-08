import { useState, useEffect } from "react";
import { Search, Calendar, DollarSign, Tag } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchExpenses } from "@/store/slices/expenseSlice";
import { AddExpenseDialog } from "@/components/AddExpenseDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Expenses = () => {
  const dispatch = useAppDispatch();
  const { expenses, isLoading, currentPage } = useAppSelector((state) => state.expenses);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    dispatch(fetchExpenses({ 
      page: currentPage, 
      category: selectedCategory !== "all" ? selectedCategory : undefined,
      search: searchQuery || undefined 
    }));
  }, [dispatch, currentPage, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Expenses</h1>
          <p className="text-muted-foreground">Track and manage your spending</p>
        </div>
        <AddExpenseDialog />
      </div>

      {/* Filters */}
      <Card className="border-border">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search expenses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 border-border"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-background/50 border-border">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="transport">Transport</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="shopping">Shopping</SelectItem>
              </SelectContent>
            </Select>

            {/* Date Filter */}
            <Button variant="outline" className="border-border">
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Expenses List */}
      <div className="space-y-4">
        {isLoading ? (
          <p className="text-center text-muted-foreground py-8">Loading expenses...</p>
        ) : expenses.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No expenses found. Add your first expense!</p>
        ) : (
          expenses.map((expense) => (
          <Card
            key={expense.id}
            className="border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center shadow-glow-accent">
                    <DollarSign className="w-6 h-6 text-accent-foreground" />
                  </div>

                  {/* Info */}
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">{expense.description}</h3>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Tag className="w-3 h-3 mr-1" />
                        {expense.category}
                      </span>
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(expense.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      {expense.hasReceipt && (
                        <span className="text-xs px-2 py-1 rounded-full bg-success/10 text-success">
                          Receipt
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Amount */}
                <div className="text-right">
                  <p className="text-2xl font-bold text-foreground">${expense.amount.toFixed(2)}</p>
                  <Button variant="ghost" size="sm" className="mt-1 text-primary hover:text-primary/80">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-2">
        <Button variant="outline" size="sm" className="border-border">
          Previous
        </Button>
        <Button variant="outline" size="sm" className="border-border bg-primary text-primary-foreground">
          1
        </Button>
        <Button variant="outline" size="sm" className="border-border">
          2
        </Button>
        <Button variant="outline" size="sm" className="border-border">
          3
        </Button>
        <Button variant="outline" size="sm" className="border-border">
          Next
        </Button>
      </div>
    </div>
  );
};

export default Expenses;
