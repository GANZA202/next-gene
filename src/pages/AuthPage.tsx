import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useStore } from "@/src/store/useStore";
import api from "@/src/lib/api";
import { toast } from "sonner";
import { LogIn, UserPlus, Sparkles } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useStore();
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const data = isLogin ? { email, password } : { email, password, name };
      const resp = await api.post(endpoint, data);
      if (resp.data.success) {
        setUser(resp.data.user);
        toast.success(isLogin ? "Welcome back!" : "Account created successfully!");
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4 bg-muted/10">
      <div className="w-full max-w-[1000px] grid grid-cols-1 lg:grid-cols-2 rounded-[60px] overflow-hidden shadow-2xl bg-background border">
        {/* Left Side: Illustration */}
        <div className="hidden lg:flex flex-col justify-center p-12 bg-black text-white relative">
          <img
            src="https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=1000&auto=format&fit=crop"
            className="absolute inset-0 h-full w-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="relative z-10">
            <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center mb-8">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-5xl font-black uppercase tracking-tight mb-6">Experience <br/> The Future</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Join millions of users experiencing the next generation of online shopping. Real tech. Real luxury. Real fast.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 md:p-16">
          <div className="mb-12">
            <h1 className="text-3xl font-black uppercase tracking-tight mb-2">
              {isLogin ? "Sign In" : "Create Account"}
            </h1>
            <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">
              NextGen Market Access
            </p>
          </div>

          <Tabs defaultValue="login" onValueChange={(v) => setIsLogin(v === "login")} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 rounded-2xl p-1 bg-muted">
              <TabsTrigger value="login" className="rounded-xl font-bold uppercase text-[10px] tracking-widest">Login</TabsTrigger>
              <TabsTrigger value="register" className="rounded-xl font-bold uppercase text-[10px] tracking-widest">Register</TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "login" : "register"}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleAuth} className="space-y-6">
                  {!isLogin && (
                    <div className="space-y-2">
                      <Label className="uppercase text-[10px] font-bold tracking-widest" htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        className="h-12 rounded-xl"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label className="uppercase text-[10px] font-bold tracking-widest" htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      className="h-12 rounded-xl"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="uppercase text-[10px] font-bold tracking-widest" htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      className="h-12 rounded-xl"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full h-14 rounded-2xl font-bold uppercase tracking-widest text-xs" disabled={loading}>
                    {loading ? "Processing..." : isLogin ? "Sign In" : "Register Now"}
                  </Button>

                  <div className="relative my-8">
                    <Separator />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4 text-[10px] font-bold uppercase text-muted-foreground tracking-widest">
                      Or Continue With
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-12 rounded-xl text-xs font-bold uppercase tracking-wider">
                      Google
                    </Button>
                    <Button variant="outline" className="h-12 rounded-xl text-xs font-bold uppercase tracking-wider">
                      GitHub
                    </Button>
                  </div>
                </form>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
