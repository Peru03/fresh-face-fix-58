import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, TrendingUp, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(6,182,212,0.1),transparent_50%)]" />
      
      <div className="relative">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-primary shadow-glow-primary mb-6">
              <Sparkles className="w-10 h-10 text-primary-foreground" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
              Smart Financial
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Management
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Track expenses, scan receipts with AI, and get personalized financial insights
              to take control of your money.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button className="bg-gradient-primary text-primary-foreground shadow-glow-primary hover:opacity-90 h-12 px-8">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="border-border h-12 px-8">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-5xl mx-auto">
            {[
              {
                icon: Sparkles,
                title: "AI-Powered Insights",
                description: "Scan receipts and get intelligent expense categorization",
                color: "text-primary",
              },
              {
                icon: TrendingUp,
                title: "Financial Tracking",
                description: "Monitor spending patterns and achieve your financial goals",
                color: "text-accent",
              },
              {
                icon: Zap,
                title: "Real-time Updates",
                description: "Stay on top of your finances with instant notifications",
                color: "text-success",
              },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-8 rounded-2xl bg-card/80 backdrop-blur-glass border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 rounded-xl bg-secondary flex items-center justify-center ${feature.color} mb-4`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
