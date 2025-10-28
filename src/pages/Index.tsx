import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { BarChart3, Users, ClipboardCheck, MapPin, TrendingUp, Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Real-time Analytics",
      description: "Track voter sentiment and campaign performance across all constituencies"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Voter Management",
      description: "Comprehensive database for managing voter information and family records"
    },
    {
      icon: <ClipboardCheck className="h-8 w-8" />,
      title: "Survey Builder",
      description: "Create and deploy custom surveys with dynamic form builder"
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Booth Management",
      description: "Organize polling booths and assign agents efficiently"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Live Monitoring",
      description: "Monitor survey responses and booth activities in real-time"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Role-based Access",
      description: "Multi-level access control for admins, moderators, and agents"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">ElectionHub</span>
          </div>
          <Button onClick={() => navigate("/login")}>
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container px-4 py-20 md:px-6 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in">
            Manage Your Electoral Campaign
            <span className="text-primary"> Efficiently</span>
          </h1>
          <p className="mb-8 text-lg text-muted-foreground sm:text-xl md:text-2xl animate-fade-in">
            Comprehensive platform for managing constituencies, voters, surveys, and booth operations - all in one place
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center animate-fade-in">
            <Button size="lg" onClick={() => navigate("/login")} className="text-lg">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="text-lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container px-4 py-20 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Everything You Need to Win
            </h2>
            <p className="text-lg text-muted-foreground">
              Powerful tools designed for modern electoral campaigns
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="p-6 transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 py-20 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8 md:p-12">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Ready to Transform Your Campaign?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join successful campaigns using our platform to manage their operations
            </p>
            <Button size="lg" onClick={() => navigate("/login")} className="text-lg">
              Sign In to Your Dashboard
            </Button>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background py-8">
        <div className="container px-4 text-center text-sm text-muted-foreground md:px-6">
          <p>© 2025 ElectionHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
