import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "@/src/store/useStore";
import { Trash2, Plus, Minus, ArrowLeft, ArrowRight, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import api from "@/src/lib/api";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, user } = useStore();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 1000 ? 0 : 50;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please login to checkout");
      navigate("/login");
      return;
    }

    setIsCheckingOut(true);
    try {
      // Simulate order creation
      const orderData = {
        items: cart.map(item => ({ productId: item.id, quantity: item.quantity, price: item.price })),
        totalPrice: total,
        addressId: "temp-addr-id", // mock
        paymentMethod: "STRIPE"
      };

      await api.post("/orders", orderData);
      toast.success("Order placed successfully!");
      clearCart();
      navigate("/");
    } catch (error) {
      toast.error("Failed to process checkout");
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-muted p-12 text-muted-foreground">
            <Trash2 className="h-24 w-24 opacity-20" />
          </div>
        </div>
        <h1 className="text-4xl font-bold uppercase mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">Ready to start shopping for the future?</p>
        <Button size="lg" className="rounded-full px-12 h-14 font-bold">
          <Link to="/products" className="flex items-center justify-center h-full w-full">Back to Market</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/10 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex items-center justify-between">
           <h1 className="text-4xl font-black uppercase tracking-tight">Shopping <span className="text-primary italic">Bag</span></h1>
           <Button variant="ghost" onClick={() => navigate("/products")}>
             <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
           </Button>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <Card key={item.id} className="overflow-hidden border-none bg-background shadow-sm rounded-[32px]">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-6">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-28 w-28 rounded-2xl object-cover bg-muted"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 space-y-2">
                       <h3 className="text-xl font-bold tracking-tight">{item.name}</h3>
                       <p className="text-2xl font-black text-primary">${item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center space-x-1 bg-muted rounded-2xl p-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-xl hover:bg-background"
                        onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeFromCart(item.id)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-xl hover:bg-background"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button variant="ghost" size="icon" className="text-destructive rounded-full hover:bg-destructive/10" onClick={() => removeFromCart(item.id)}>
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary */}
          <div className="space-y-6">
            <Card className="border-none bg-background shadow-2xl rounded-[40px] overflow-hidden">
               <div className="bg-primary p-8 text-primary-foreground">
                 <h2 className="text-2xl font-bold uppercase tracking-widest">Order Summary</h2>
               </div>
               <CardContent className="p-8 space-y-6">
                 <div className="flex justify-between text-sm font-medium">
                   <span className="text-muted-foreground uppercase tracking-widest">Subtotal</span>
                   <span className="font-bold">${subtotal.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between text-sm font-medium">
                   <span className="text-muted-foreground uppercase tracking-widest">Shipping</span>
                   <span className="font-bold">{shipping === 0 ? "FREE" : `$${shipping.toLocaleString()}`}</span>
                 </div>
                 <Separator />
                 <div className="flex justify-between items-end">
                   <span className="text-lg font-bold uppercase tracking-widest">Total</span>
                   <span className="text-4xl font-black text-primary">${total.toLocaleString()}</span>
                 </div>
                 <Button
                   className="w-full h-16 rounded-[24px] text-lg font-bold uppercase tracking-widest shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all"
                   onClick={handleCheckout}
                   disabled={isCheckingOut}
                 >
                   {isCheckingOut ? "Processing..." : "Checkout Now"} <CreditCard className="ml-2 h-5 w-5" />
                 </Button>
                 <p className="text-center text-[10px] uppercase tracking-widest text-muted-foreground">
                   Secure encrypted checkout verified by Stripe & PayPal
                 </p>
               </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
