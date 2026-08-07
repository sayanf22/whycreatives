import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if Supabase is properly configured
      if (!supabase) {
        throw new Error("Supabase client not initialized");
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Supabase auth error:", error);
        throw error;
      }

      if (data.user) {
        toast({
          title: "Success!",
          description: "Logged in successfully.",
        });
        navigate("/admindashboard");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage = error.message || "Failed to connect to authentication service. Please check your internet connection.";
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070707] flex items-center justify-center px-6">
      <Card className="w-full max-w-md p-8 border border-neutral-800 bg-[#0f0f0f] shadow-2xl rounded-2xl relative">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1a1a1a] rounded-full mb-4 border border-neutral-800">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Admin Login</h1>
          <p className="text-neutral-400 text-sm">Enter credentials to access the console</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-neutral-300 text-sm font-semibold mb-2">
              Email Address
            </label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#151515] border-neutral-800 text-white placeholder:text-neutral-500 h-12 focus:ring-1 focus:ring-white focus:border-white rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-neutral-300 text-sm font-semibold mb-2">
              Password
            </label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#151515] border-neutral-800 text-white placeholder:text-neutral-500 h-12 focus:ring-1 focus:ring-white focus:border-white rounded-lg"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black hover:bg-white/85 font-bold h-12 rounded-lg transition-all"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-sm text-neutral-500 hover:text-white transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </Card>
    </div>
  );
};

export default AdminLogin;
