import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Zap, Shield, BarChart3, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built for speed with modern architecture and optimized performance.',
  },
  {
    icon: Shield,
    title: 'Secure by Default',
    description: 'Enterprise-grade security with JWT authentication and encrypted data.',
  },
  {
    icon: BarChart3,
    title: 'Powerful Analytics',
    description: 'Track your productivity with built-in insights and reporting.',
  },
];

const benefits = [
  'Full CRUD operations for tasks',
  'Real-time updates and sync',
  'Search and filter capabilities',
  'User profile management',
  'Mobile-responsive design',
  'Dark mode support ready',
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">T</span>
            </div>
            <span className="font-semibold text-lg">TaskFlow</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
            <Zap className="h-4 w-4" />
            Scalable • Secure • Modern
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-slide-up">
            Manage Tasks with
            <span className="block gradient-text">Effortless Control</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '100ms' }}>
            A powerful, scalable task management platform built with modern technologies. 
            Secure authentication, intuitive dashboard, and seamless productivity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <Link to="/signup">
              <Button size="lg" className="gap-2 shadow-glow">
                Start Free Today
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                Sign In to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Modern Teams</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything you need to stay organized and productive, without the complexity.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-card p-8 rounded-xl border border-border card-hover animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Everything You Need to
                <span className="block gradient-text">Stay Productive</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                TaskFlow combines powerful features with an intuitive interface, 
                so you can focus on what matters most—getting things done.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border border-border">
              <div className="bg-card rounded-xl shadow-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">My Tasks</span>
                  <span className="text-sm text-muted-foreground">3 active</span>
                </div>
                {['Design homepage mockup', 'Review pull requests', 'Update documentation'].map((task, i) => (
                  <div key={task} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className={`h-4 w-4 rounded-full border-2 ${i === 0 ? 'bg-success border-success' : 'border-muted-foreground'}`} />
                    <span className={`text-sm ${i === 0 ? 'line-through text-muted-foreground' : ''}`}>{task}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Join thousands of users who trust TaskFlow for their task management needs.
          </p>
          <Link to="/signup">
            <Button size="lg" className="gap-2 shadow-glow">
              Create Free Account
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>© 2026 TaskFlow. Built with React, TailwindCSS & Lovable Cloud.</p>
        </div>
      </footer>
    </div>
  );
}
