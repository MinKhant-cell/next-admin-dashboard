'use client';

import { useState } from 'react';
import { Sprout, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';


import PublicRoute from '@/components/public-route';
import { login } from '@/hooks/useAuth';
import Link from 'next/link';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
     //loginAlready
      await login(email.trim(), password.trim());

      
    } catch (err: any) {
      console.error('Login error:', err);
      const message = err.message || 'Invalid email or password. Please try again.';
      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PublicRoute>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-background">
        <div className="flex w-full max-w-sm flex-col gap-8">
          <Link href="/" className="flex items-center gap-3 self-center font-semibold text-lg">
            <div className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-lg">
              <Sprout className="size-6" />
            </div>
            {process.env.NEXT_PUBLIC_APP_NAME || 'Dashboard'}
          </Link>

          <Card className="p-8 shadow-lg">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold">Sign in to your account</h1>
              <p className="text-sm text-muted-foreground mt-2">
                Enter your credentials to access the dashboard
              </p>
            </div>

            {error && (
              <div className="mb-6 rounded-lg bg-destructive/10 p-4 text-sm text-destructive border border-destructive/20">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={submitting}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={submitting}
                  required
                  autoComplete="current-password"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-11 text-base"
                disabled={submitting || !email.trim() || !password.trim()}
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </Card>

          <p className="text-center text-xs text-muted-foreground">
            Secured by {process.env.NEXT_PUBLIC_APP_NAME || 'Dashboard'}
          </p>
        </div>
      </div>
    </PublicRoute>
  );
}