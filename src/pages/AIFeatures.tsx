import { useState, useEffect, useRef } from "react";
import { Sparkles, Camera, MessageSquare, TrendingUp, Upload, Send, Brain, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/store";
import { sendChatMessage, addUserMessage, fetchAIInsights } from "@/store/slices/aiSlice";

const AIFeatures = () => {
  const dispatch = useAppDispatch();
  const { chatMessages, insights, isProcessing } = useAppSelector((state) => state.ai);
  const [activeTab, setActiveTab] = useState("chat");
  const [chatMessage, setChatMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(fetchAIInsights());
  }, [dispatch]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSendMessage = async () => {
    if (!chatMessage.trim() || isProcessing) return;
    
    dispatch(addUserMessage(chatMessage));
    const message = chatMessage;
    setChatMessage("");
    
    await dispatch(sendChatMessage(message));
  };

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
              {insights.length > 0 ? (
                <div className="space-y-4">
                  {insights.map((insight) => (
                    <div key={insight.id} className={`p-6 rounded-xl border ${
                      insight.type === 'saving' ? 'bg-success/10 border-success/20' :
                      insight.type === 'warning' ? 'bg-warning/10 border-warning/20' :
                      insight.type === 'prediction' ? 'bg-primary/10 border-primary/20' : 
                      'bg-accent/10 border-accent/20'
                    }`}>
                      <div className="flex items-center space-x-3 mb-2">
                        {insight.type === 'saving' && <Sparkles className="w-5 h-5 text-success" />}
                        {insight.type === 'warning' && <Lightbulb className="w-5 h-5 text-warning" />}
                        {insight.type === 'prediction' && <TrendingUp className="w-5 h-5 text-primary" />}
                        {insight.type === 'recommendation' && <Brain className="w-5 h-5 text-accent" />}
                        <h3 className="text-lg font-semibold text-foreground">{insight.title}</h3>
                      </div>
                      <p className="text-foreground">{insight.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 text-center">
                  <p className="text-muted-foreground">No insights available yet. Add more expenses to get personalized financial advice!</p>
                </div>
              )}
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
                  {chatMessages.length === 0 && (
                    <div className="text-center text-muted-foreground py-8">
                      <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Ask me anything about your finances!</p>
                    </div>
                  )}
                  {chatMessages.map((message) => (
                    <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`rounded-2xl p-4 max-w-xs ${
                        message.role === 'user' 
                          ? 'bg-gradient-primary text-primary-foreground rounded-tr-sm' 
                          : 'bg-card border border-border text-foreground rounded-tl-sm'
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  {isProcessing && (
                    <div className="flex justify-start">
                      <div className="bg-card border border-border rounded-2xl rounded-tl-sm p-4 max-w-xs">
                        <p className="text-sm text-muted-foreground">Thinking...</p>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Ask about your spending, budgets, or financial goals..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                    className="min-h-[60px] bg-background/50 border-border"
                    disabled={isProcessing}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={isProcessing || !chatMessage.trim()}
                    className="bg-gradient-primary text-primary-foreground shadow-glow-primary hover:opacity-90"
                  >
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
