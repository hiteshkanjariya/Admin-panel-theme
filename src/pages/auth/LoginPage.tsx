import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Shield, ArrowRight, Eye, EyeOff, Sparkles, Lock, Mail, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    const result = await login(data.email, data.password);
    setIsLoading(false);

    if (result.success) {
      toast.success('Welcome back!');
      navigate('/dashboard');
    } else {
      toast.error(result.error || 'Login failed');
    }
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-background">
      {/* Animated Background */}
      <div className="fixed inset-0 mesh-gradient opacity-60" />
      <div className="fixed inset-0 noise-overlay" />
      
      {/* Floating Orbs */}
      <div className="fixed top-20 left-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-float" />
      <div className="fixed bottom-20 right-20 h-96 w-96 rounded-full bg-primary/15 blur-3xl animate-float-delayed" />
      <div className="fixed top-1/2 left-1/3 h-64 w-64 rounded-full bg-primary/10 blur-3xl animate-pulse-slow" />

      {/* Left Panel - Branding */}
      <div className="relative hidden w-1/2 flex-col justify-between p-12 lg:flex">
        {/* Gradient overlay for left panel */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary to-primary/80" />
        <div className="absolute inset-0 noise-overlay opacity-50" />
        
        {/* Decorative shapes */}
        <div className="absolute top-0 right-0 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full border border-primary-foreground/20 opacity-40" />
        <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full border border-primary-foreground/10 opacity-30" />
        <div className="absolute top-1/3 right-20 h-32 w-32 rounded-full bg-primary-foreground/10 blur-2xl animate-pulse-slow" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-foreground/20 backdrop-blur-sm border border-primary-foreground/20 shadow-glow">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-display text-2xl font-bold text-primary-foreground tracking-tight">
              AdminHub
            </span>
          </div>
        </div>

        <div className="relative z-10 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 backdrop-blur-sm border border-primary-foreground/10">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">Enterprise Ready</span>
            </div>
            <h1 className="font-display text-5xl font-bold text-primary-foreground leading-tight">
              Manage your<br />
              platform with<br />
              <span className="relative">
                confidence
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 10C50 2 150 2 198 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary-foreground/40" />
                </svg>
              </span>
            </h1>
          </div>
          <p className="max-w-md text-lg text-primary-foreground/80 leading-relaxed">
            A powerful admin dashboard with complete user management, real-time analytics, and endless customization.
          </p>
          
          {/* Feature pills */}
          <div className="flex flex-wrap gap-3">
            {['Analytics', 'User Management', 'Security', 'Customizable'].map((feature) => (
              <span 
                key={feature}
                className="rounded-lg bg-primary-foreground/10 px-3 py-1.5 text-sm text-primary-foreground border border-primary-foreground/10 backdrop-blur-sm"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-4">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i}
                className="h-8 w-8 rounded-full bg-primary-foreground/20 border-2 border-primary ring-2 ring-primary flex items-center justify-center text-xs font-medium text-primary-foreground"
              >
                {['JD', 'AK', 'SM', '+9'][i - 1]}
              </div>
            ))}
          </div>
          <p className="text-sm text-primary-foreground/70">
            Trusted by 10k+ teams worldwide
          </p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="relative flex w-full items-center justify-center p-6 lg:w-1/2 lg:p-12">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          {/* Mobile Logo */}
          <div className="flex items-center gap-3 lg:hidden">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary shadow-glow">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold">AdminHub</span>
          </div>

          {/* Form Card */}
          <div className="glass-strong rounded-2xl p-8 shadow-2xl">
            <div className="space-y-2 mb-8">
              <h2 className="font-display text-3xl font-bold tracking-tight">Welcome back</h2>
              <p className="text-muted-foreground">
                Sign in to continue to your dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    {...register('email')}
                    className={`pl-10 h-12 bg-secondary/50 border-border/50 focus:bg-background transition-colors ${errors.email ? 'border-destructive focus:border-destructive' : ''}`}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <span className="inline-block h-1 w-1 rounded-full bg-destructive" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    {...register('password')}
                    className={`pl-10 pr-10 h-12 bg-secondary/50 border-border/50 focus:bg-background transition-colors ${errors.password ? 'border-destructive focus:border-destructive' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <span className="inline-block h-1 w-1 rounded-full bg-destructive" />
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-300" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Sign in
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/signup" className="font-semibold text-primary hover:text-primary/80 transition-colors">
                  Create one
                </Link>
              </p>
            </div>
          </div>

          {/* Demo Accounts Card */}
          <div className="glass rounded-xl p-5 border border-border/30">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
                <Zap className="h-3.5 w-3.5 text-primary" />
              </div>
              <p className="text-sm font-semibold text-foreground">Quick Demo Access</p>
            </div>
            <div className="grid gap-2 text-sm">
              {[
                { role: 'Admin', email: 'admin@demo.com', pass: 'admin123', color: 'bg-destructive/10 text-destructive' },
                { role: 'Manager', email: 'manager@demo.com', pass: 'manager123', color: 'bg-warning/10 text-warning' },
                { role: 'User', email: 'user@demo.com', pass: 'user123', color: 'bg-success/10 text-success' },
              ].map((account) => (
                <div key={account.role} className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-secondary/50 transition-colors group">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${account.color}`}>
                      {account.role}
                    </span>
                    <span className="text-muted-foreground">{account.email}</span>
                  </div>
                  <code className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-mono group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    {account.pass}
                  </code>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
