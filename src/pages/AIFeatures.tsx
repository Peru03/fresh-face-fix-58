import { useState } from "react";
import { Sparkles, Camera, MessageSquare, TrendingUp, Upload, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AIFeatures = () => {
  const [activeTab, setActiveTab] = useState("receipt");
  const [chatMessage, setChatMessage] = useState("");

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">AI Features ✨</h1>
        <p className="text-muted-foreground">
          Leverage AI to scan receipts, get financial advice, and analyze your spending
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-secondary/50">
          <TabsTrigger value="receipt" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Camera className="w-4 h-4 mr-2" />
            Receipt Scanner
          </TabsTrigger>
          <TabsTrigger value="advice" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <TrendingUp className="w-4 h-4 mr-2" />
            Financial Advice
          </TabsTrigger>
          <TabsTrigger value="chat" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <MessageSquare className="w-4 h-4 mr-2" />
            AI Chatbot
          </TabsTrigger>
        </TabsList>

        {/* Receipt Scanner Tab */}
        <TabsContent value="receipt" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upload Section */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Upload className="w-5 h-5 mr-2 text-primary" />
                  Upload Receipt
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary transition-colors cursor-pointer">
                  <Camera className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-foreground font-medium mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-muted-foreground">
                    PNG, JPG or PDF (MAX. 5MB)
                  </p>
                </div>
                <Button className="w-full bg-gradient-primary text-primary-foreground shadow-glow-primary hover:opacity-90">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Scan Receipt
                </Button>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Sparkles className="w-5 h-5 mr-2 text-accent" />
                  Scanned Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-secondary/30">
                    <p className="text-sm text-muted-foreground mb-1">Merchant</p>
                    <p className="text-lg font-semibold text-foreground">Whole Foods Market</p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/30">
                    <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                    <p className="text-2xl font-bold text-foreground">$125.50</p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/30">
                    <p className="text-sm text-muted-foreground mb-1">Suggested Category</p>
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                      Food & Groceries
                    </span>
                  </div>
                  <Button variant="outline" className="w-full border-border">
                    Create Expense from Receipt
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Financial Advice Tab */}
        <TabsContent value="advice" className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <TrendingUp className="w-5 h-5 mr-2 text-success" />
                AI Financial Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  💡 This Month's Insights
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-success mr-2">✓</span>
                    <span className="text-foreground">
                      You're spending <strong>15% less</strong> on dining out compared to last month
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warning mr-2">⚠</span>
                    <span className="text-foreground">
                      Transport costs are <strong>20% above</strong> your monthly average
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-success mr-2">✓</span>
                    <span className="text-foreground">
                      You're on track to save <strong>$350</strong> this month
                    </span>
                  </li>
                </ul>
              </div>

              <Button className="w-full bg-gradient-primary text-primary-foreground shadow-glow-primary hover:opacity-90">
                <Sparkles className="w-4 h-4 mr-2" />
                Get Personalized Advice
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Chatbot Tab */}
        <TabsContent value="chat" className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <MessageSquare className="w-5 h-5 mr-2 text-accent" />
                Ask AI About Your Finances
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Chat History */}
                <div className="h-96 overflow-y-auto space-y-4 p-4 bg-secondary/20 rounded-xl">
                  <div className="flex justify-start">
                    <div className="bg-card border border-border rounded-2xl rounded-tl-sm p-4 max-w-xs">
                      <p className="text-sm text-foreground">
                        Hello! I'm your AI financial assistant. Ask me anything about your expenses!
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-gradient-primary rounded-2xl rounded-tr-sm p-4 max-w-xs">
                      <p className="text-sm text-primary-foreground">
                        How much did I spend on food this month?
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-card border border-border rounded-2xl rounded-tl-sm p-4 max-w-xs">
                      <p className="text-sm text-foreground">
                        You've spent <strong>$450</strong> on food this month, which is 18% of your total expenses.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Input */}
                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Ask about your spending, budgets, or financial goals..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="min-h-[60px] bg-background/50 border-border"
                  />
                  <Button className="bg-gradient-primary text-primary-foreground shadow-glow-primary hover:opacity-90">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIFeatures;
