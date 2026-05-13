import { useQuery } from "@tanstack/react-query";
import {
  Users,
  ShoppingBag,
  TrendingUp,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Search,
  MoreVertical,
  Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/src/store/useStore";
import api from "@/src/lib/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

const chartData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4500 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 5500 },
];

export default function AdminDashboard() {
  const { user } = useStore();

  const { data: stats, isLoading } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const resp = await api.get("/admin/stats");
      return resp.data;
    },
    enabled: !!user && (user.role === "ADMIN" || user.role === "SUPER_ADMIN")
  });

  if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
    return <div className="flex h-[90vh] items-center justify-center font-black uppercase text-4xl">Access Denied</div>;
  }

  return (
    <div className="min-h-screen bg-muted/20 p-4 md:p-12">
      <div className="container mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tight">Enterprise <span className="text-primary italic">Intelligence</span></h1>
            <p className="text-muted-foreground text-sm uppercase font-bold tracking-widest mt-1">Real-time marketplace monitoring</p>
          </div>
          <div className="flex items-center space-x-4">
             <Button variant="outline" className="rounded-2xl h-12 uppercase text-[10px] font-bold tracking-widest">Export Reports</Button>
             <Button className="rounded-2xl h-12 uppercase text-[10px] font-bold tracking-widest"><Plus className="mr-2 h-4 w-4" /> Add Product</Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-background">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Users className="h-6 w-6" /></div>
                <Badge className="bg-green-100 text-green-700 rounded-full border-none">+12.5%</Badge>
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total Customers</h3>
              <p className="text-4xl font-black tracking-tight mt-1">{stats?.userCount || 0}</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-background">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl"><ShoppingBag className="h-6 w-6" /></div>
                <Badge className="bg-green-100 text-green-700 rounded-full border-none">+8.2%</Badge>
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Orders Processed</h3>
              <p className="text-4xl font-black tracking-tight mt-1">{stats?.orderCount || 0}</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-background">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl"><TrendingUp className="h-6 w-6" /></div>
                <Badge className="bg-red-100 text-red-700 rounded-full border-none">-2.1%</Badge>
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total Revenue</h3>
              <p className="text-4xl font-black tracking-tight mt-1">${stats?.totalRevenue.toLocaleString() || 0}</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-background">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-50 text-green-600 rounded-2xl"><Activity className="h-6 w-6" /></div>
                <Badge className="bg-blue-100 text-blue-700 rounded-full border-none">Active</Badge>
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">System Status</h3>
              <p className="text-4xl font-black tracking-tight mt-1">99.9%</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts & Analytics */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Card className="border-none shadow-sm rounded-[40px] overflow-hidden bg-background p-8">
            <CardHeader className="px-0 pt-0">
               <CardTitle className="uppercase tracking-tight text-xl">Revenue Growth</CardTitle>
               <CardDescription className="uppercase text-[10px] font-bold tracking-widest">Monthly performance analytics</CardDescription>
            </CardHeader>
            <div className="h-[300px] w-full pt-8">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip
                     contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                  />
                  <XAxis dataKey="name" hide />
                  <YAxis hide />
                  <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="border-none shadow-sm rounded-[40px] overflow-hidden bg-background p-8">
             <CardHeader className="px-0 pt-0 flex flex-row items-center justify-between space-y-0">
               <div>
                 <CardTitle className="uppercase tracking-tight text-xl">Inventory Status</CardTitle>
                 <CardDescription className="uppercase text-[10px] font-bold tracking-widest">Recent product activities</CardDescription>
               </div>
               <Button variant="ghost" size="icon" className="rounded-full"><MoreVertical className="h-4 w-4" /></Button>
             </CardHeader>
             <div className="mt-8">
               <Table>
                 <TableHeader>
                   <TableRow className="hover:bg-transparent border-muted">
                     <TableHead className="uppercase text-[10px] font-bold tracking-widest h-12">Product</TableHead>
                     <TableHead className="uppercase text-[10px] font-bold tracking-widest h-12">Status</TableHead>
                     <TableHead className="text-right uppercase text-[10px] font-bold tracking-widest h-12">Sales</TableHead>
                   </TableRow>
                 </TableHeader>
                 <TableBody>
                   {stats?.recentProducts?.map((p: any) => (
                     <TableRow key={p.id} className="border-muted hover:bg-muted/30 transition-colors">
                       <TableCell className="font-bold py-4">{p.name}</TableCell>
                       <TableCell>
                         <Badge variant={p.stock > 10 ? "secondary" : "destructive"} className="rounded-full uppercase text-[8px] tracking-widest">
                           {p.stock > 10 ? "In Stock" : "Low Stock"}
                         </Badge>
                       </TableCell>
                       <TableCell className="text-right font-black">${(Math.random() * 10000).toFixed(0)}</TableCell>
                     </TableRow>
                   ))}
                 </TableBody>
               </Table>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
