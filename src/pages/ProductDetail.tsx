import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  ShoppingCart,
  Heart,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Zap,
  ArrowLeft,
  ChevronRight,
  MessageSquare
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useStore } from "@/src/store/useStore";
import api from "@/src/lib/api";
import { toast } from "sonner";
import { motion } from "motion/react";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useStore();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const resp = await api.get(`/products/${id}`);
      return resp.data;
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <Skeleton className="aspect-square rounded-[40px]" />
          <div className="space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-14 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return <div className="text-center py-24 uppercase font-bold tracking-widest text-4xl">Product Not Found</div>;

  return (
    <div className="min-h-screen bg-background pb-24 pt-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Gallery */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square overflow-hidden rounded-[40px] bg-muted shadow-2xl"
            >
              <img
                src={product.images?.[selectedImage]?.url || "https://picsum.photos/seed/placeholder/800/800"}
                alt={product.name}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
              {product.images?.map((img: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square w-24 flex-shrink-0 overflow-hidden rounded-2xl border-2 transition-all ${
                    selectedImage === idx ? "border-primary p-0.5" : "border-transparent opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
                  }`}
                >
                  <img src={img.url} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="mb-6 space-y-4 border-b pb-8">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="rounded-full border-primary/20 bg-primary/5 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                  {product.category?.name}
                </Badge>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-sm">{product.rating}</span>
                  <span className="text-muted-foreground text-xs">(128 Reviews)</span>
                </div>
              </div>
              <h1 className="text-5xl font-black tracking-tight md:text-6xl uppercase leading-none">{product.name}</h1>
              <p className="text-4xl font-black text-primary">${product.price.toLocaleString()}</p>
              <p className="text-muted-foreground leading-relaxed text-lg">{product.description}</p>
            </div>

            <div className="mb-8 flex flex-wrap gap-4">
              <Button
                size="lg"
                className="flex-1 rounded-[24px] h-16 font-bold uppercase tracking-widest transition-all hover:scale-[1.02] shadow-xl shadow-primary/20"
                onClick={() => {
                  addToCart(product);
                  toast.success(`${product.name} added to cart`);
                }}
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="aspect-square h-16 rounded-[24px] p-0 border-muted-foreground/20 hover:border-primary transition-colors">
                <Heart className="h-6 w-6" />
              </Button>
            </div>

            {/* Value Props */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 rounded-3xl bg-muted/30 p-4 border border-muted-foreground/5">
                <div className="rounded-full bg-background p-2 shadow-sm"><ShieldCheck className="h-5 w-5 text-blue-500" /></div>
                <div className="text-[10px] font-bold uppercase tracking-widest">Authentic <br/> Guaranteed</div>
              </div>
              <div className="flex items-center space-x-3 rounded-3xl bg-muted/30 p-4 border border-muted-foreground/5">
                <div className="rounded-full bg-background p-2 shadow-sm"><Truck className="h-5 w-5 text-green-500" /></div>
                <div className="text-[10px] font-bold uppercase tracking-widest">Global <br/> Free Shipping</div>
              </div>
              <div className="flex items-center space-x-3 rounded-3xl bg-muted/30 p-4 border border-muted-foreground/5">
                <div className="rounded-full bg-background p-2 shadow-sm"><RotateCcw className="h-5 w-5 text-orange-500" /></div>
                <div className="text-[10px] font-bold uppercase tracking-widest">30-Day <br/> NextGen Return</div>
              </div>
              <div className="flex items-center space-x-3 rounded-3xl bg-muted/30 p-4 border border-muted-foreground/5">
                <div className="rounded-full bg-background p-2 shadow-sm"><Zap className="h-5 w-5 text-purple-500" /></div>
                <div className="text-[10px] font-bold uppercase tracking-widest">Premium <br/> Aftercare</div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews / Tabs Section */}
        <div className="mt-24">
          <div className="border-b mb-12 flex space-x-12 pb-4">
            <button className="text-sm font-bold uppercase tracking-widest border-b-2 border-primary pb-4">Specifications</button>
            <button className="text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors pb-4">Reviews (128)</button>
            <button className="text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors pb-4">Shipping Policy</button>
          </div>
          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground text-lg leading-relaxed">
              Every {product.name} is meticulously inspected by our expert team. From the titanium finish of the latest smartphones to the precision-engineered parts of our luxury vehicles, standard excellence is our minimum.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
