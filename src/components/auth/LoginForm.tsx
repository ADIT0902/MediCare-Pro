import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Heart, User, Stethoscope, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();
  const { toast } = useToast();

  const demoAccounts = [
    { role: 'Admin', email: 'admin@hospital.com', icon: Shield, color: 'bg-red-500' },
    { role: 'Doctor', email: 'doctor@hospital.com', icon: Stethoscope, color: 'bg-blue-500' },
    { role: 'Patient', email: 'patient@hospital.com', icon: User, color: 'bg-green-500' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast({
        title: "Login Successful",
        description: "Welcome to MediCare Pro!"
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Title */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-12 w-12 text-red-500 mr-2" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              MediCare Pro
            </h1>
          </div>
          <p className="text-gray-600">AI-Powered Hospital Management System</p>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Demo Accounts</CardTitle>
            <CardDescription>
              Click on any role to try the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {demoAccounts.map((account) => (
                <Button
                  key={account.role}
                  variant="outline"
                  className="w-full justify-start h-auto p-4"
                  onClick={() => handleDemoLogin(account.email)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${account.color}`}>
                      <account.icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">{account.role}</p>
                      <p className="text-sm text-gray-500">{account.email}</p>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">
              Password for all demo accounts: <code className="bg-gray-100 px-1 rounded">demo123</code>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;