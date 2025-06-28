
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import Balloon from '@/components/Balloon';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation - allow any input but require something
    if (username.trim() && password.trim()) {
      toast.success("Login successful! Welcome to the celebration!");
      navigate('/home');
    } else {
      toast.error("Please enter a username and password.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-celebration-pink/20 via-celebration-blue/10 to-celebration-purple/20 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background balloons */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <Balloon 
            key={i} 
            color={['celebration-pink', 'celebration-yellow', 'celebration-blue', 'celebration-purple', 'celebration-green'][i % 5]} 
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 60}%`,
              animationDelay: `${i * 0.5}s`
            }} 
          />
        ))}
      </div>

      <Card className="w-full max-w-md bg-white/80 backdrop-blur-md relative animate-pulse-scale shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl text-celebration-pink">Welcome!</CardTitle>
          <CardDescription className="text-lg">Enter the celebration space for your best friend</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1" htmlFor="username">Username</label>
                <Input 
                  id="username"
                  type="text" 
                  placeholder="Enter any username" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  className="border-celebration-purple/30 focus:border-celebration-purple"
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1" htmlFor="password">Password</label>
                <Input 
                  id="password"
                  type="password" 
                  placeholder="Enter any password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-celebration-purple/30 focus:border-celebration-purple"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleLogin} 
            className="w-full bg-gradient-to-r from-celebration-pink to-celebration-purple hover:opacity-90 transition-all"
          >
            Enter the Celebration
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
