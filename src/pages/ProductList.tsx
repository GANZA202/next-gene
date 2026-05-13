import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter, SlidersHorizontal, Grid, List as ListIcon, ShoppingCart, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useStore } from "@/src/store/useStore";
import api from "@/src/lib/api";
import { toast } from "sonner";

export default function ProductList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { addToCart } = useStore();

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", selectedCategory, searchTerm],
    queryFn: async () => {
      const resp = await api.get("/products", {
        params: { category: selectedCategory, search: searchTerm },
      });
      return resp.data;
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const resp = await api.get("/categories");
      return resp.data;
    },
  });

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="min-h-screen bg-muted/10 pb-24 pt-8">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight uppercase mb-4">Marketplace</h1>
          <p className="text-muted-foreground">Discover our latest tech and luxury arrivals.</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block space-y-8">
            <div>
              <h3 className="mb-4 font-bold uppercase tracking-wider text-xs">Search</h3>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Find products..."
                  className="w-full h-10 rounded-xl border border-input pl-9 text-sm"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-4 font-bold uppercase tracking-wider text-xs">Categories</h3>
              <div className="space-y-2">
                <Button
                  variant={selectedCategory === null ? "default" : "ghost"}
                  className="w-full justify-start rounded-xl"
                  onClick={() => setSelectedCategory(null)}
                >
                  All Products
                </Button>
                {categories?.map((cat: any) => (
                  <Button
                    key={cat.id}
                    variant={selectedCategory === cat.name ? "default" : "ghost"}
                    className="w-full justify-start rounded-xl"
                    onClick={() => setSelectedCategory(cat.name)}
                  >
                    {cat.name}
                  </Button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="lg:col-span-3">
            <div className="flex items-center justify-between mb-8 pb-4 border-b">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="rounded-full">
                  <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
                </Button>
                <div className="hidden sm:flex border rounded-full p-0.5 ml-2">
                   <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full bg-muted"><Grid className="h-4 w-4" /></Button>
                   <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full"><ListIcon className="h-4 w-4" /></Button>
                </div>
              </div>
              <span className="text-sm text-muted-foreground uppercase tracking-widest">{products?.length || 0} Products</span>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="overflow-hidden border-none shadow-sm rounded-[32px]">
                    <Skeleton className="aspect-square w-full" />
                    <CardContent className="p-6">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {products?.map((product: any) => (
                  <Card key={product.id} className="group overflow-hidden border-none bg-background shadow-sm hover:shadow-2xl transition-all duration-300 rounded-[32px]">
                    <Link to={`/products/${product.id}`} className="block relative aspect-square overflow-hidden bg-muted">
                      <img
                        src={product.images?.[0]?.url || "https://picsum.photos/seed/placeholder/800/800"}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-4 rounded-full bg-white/80 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => { e.preventDefault(); /* wishlist logic */ }}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      {product.stock < 5 && product.stock > 0 && (
                        <Badge className="absolute left-4 top-4 bg-orange-500 rounded-full border-none">Low Stock</Badge>
                      )}
                      {product.stock === 0 && (
                        <Badge className="absolute left-4 top-4 bg-red-500 rounded-full border-none">Sold Out</Badge>
                      )}
                    </Link>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{product.brand}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-bold">{product.rating}</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold line-clamp-1 mb-2">{product.name}</h3>
                      <p className="text-2xl font-black text-primary">${product.price.toLocaleString()}</p>
                    </CardContent>
                    <CardFooter className="px-6 pb-6 pt-0">
                      <Button
                        className="w-full rounded-2xl h-11 font-bold tracking-widest uppercase text-xs"
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock === 0}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" /> Add To Cart
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
