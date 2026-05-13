import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Search, Menu, LogOut, MessageSquare, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/src/store/useStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import api from "@/src/lib/api";

export default function Navbar() {
  const { user, setUser, cart } = useStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await api.post("/auth/logout");
    setUser(null);
    navigate("/");
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 glass px-4 md:px-8">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold italic text-white transition-transform group-hover:scale-110">N</div>
            <span className="text-xl font-black tracking-tighter uppercase transition-colors">
              Nextgen <span className="text-primary">Market</span>
            </span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link to="/products" className="text-white/60 hover:text-white transition-colors">Store</Link>
            <Link to="/categories" className="text-white/60 hover:text-white transition-colors">Collections</Link>
            <Link to="/ai-guides" className="text-white/60 hover:text-white transition-colors">AI Forecast</Link>
            {user?.role === "ADMIN" && <Link to="/admin" className="text-white/60 hover:text-white transition-colors">Admin</Link>}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <input
              type="search"
              placeholder="Voice Search (Cmd+K)"
              className="h-9 w-64 rounded-full border border-white/10 bg-white/5 pl-10 pr-4 text-sm focus:outline-none focus:border-primary transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Mic className="h-4 w-4 text-primary animate-pulse" />
            </div>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" className="relative">
            <Link to="/cart" className="flex items-center justify-center h-full w-full">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -right-1 -top-1 px-1.5 py-0.5 text-[10px]" variant="destructive">
                  {totalItems}
                </Badge>
              )}
            </Link>
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>Dashboard</DropdownMenuItem>
                {user.role === "ADMIN" && (
                  <DropdownMenuItem onClick={() => navigate("/admin")}>Admin Panel</DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => navigate("/login")} variant="default" size="sm" className="rounded-full px-6">
              Sign In
            </Button>
          )}

          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
