import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Shield } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast.success('Login successful!');
        // Navigation will be handled by the router based on role
        navigate('/dashboard');
      } else {
        toast.error('Invalid credentials. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <Card className="w-full max-w-md p-10 shadow-xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary shadow-md mb-6">
            <Shield className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold mb-3 tracking-tight">Assembly Constituencies</h1>
          <p className="text-lg text-muted-foreground font-medium">Management System</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="email" className="text-base font-semibold">Email or Mobile Number</Label>
            <Input
              id="email"
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-base"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="password" className="text-base font-semibold">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="text-base"
            />
          </div>

          <div className="flex items-center justify-end">
            <button type="button" className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors">
              Recover Password
            </button>
          </div>

          <div className="space-y-4">
            <Button 
              type="submit" 
              variant="secondary" 
              size="lg" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              size="lg" 
              className="w-full" 
              disabled={isLoading}
            >
              Login with OTP
            </Button>
          </div>
        </form>

        <div className="mt-8 p-6 bg-muted/50 rounded-2xl border-2 border-border">
          <p className="text-sm font-semibold text-foreground mb-3">Demo Credentials:</p>
          <div className="text-sm space-y-2 font-medium">
            <p><strong className="text-primary">L0:</strong> admin@system.com / admin123</p>
            <p><strong className="text-secondary">L1:</strong> acim@ac.com / acim123</p>
            <p><strong className="text-accent">L2:</strong> aci@ac118.com / aci123</p>
            <p><strong className="text-primary">L9 War Room:</strong> warroom@system.com / wrm123</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
