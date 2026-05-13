import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { createServer as createViteServer } from "vite";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "nextgen-secure-secret-2026";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(helmet({
    contentSecurityPolicy: false,
  }));
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  // --- MIDDLEWARE ---
  const authenticateToken = (req: any, res: any, next: any) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: "Access denied" });
    try {
      const verified = jwt.verify(token, JWT_SECRET);
      req.user = verified;
      next();
    } catch (err) {
      res.status(403).json({ error: "Invalid token" });
    }
  };

  // --- API ROUTES ---

  // Auth
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { email, password, name } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { email, password: hashedPassword, name }
      });
      res.json({ success: true, user: { id: user.id, email: user.email, name: user.name } });
    } catch (error) {
      res.status(400).json({ success: false, error: "User already exists or registration failed" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
      res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
      res.json({ success: true, user: { id: user.id, email: user.email, name: user.name, role: user.role }, token });
    } else {
      res.status(401).json({ success: false, error: "Invalid credentials" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    res.clearCookie('token');
    res.json({ success: true });
  });

  // Products
  app.get("/api/products", async (req, res) => {
    const { category, search } = req.query;
    const products = await prisma.product.findMany({
      where: {
        AND: [
          category ? { category: { name: category as string } } : {},
          search ? { name: { contains: search as string } } : {},
        ]
      },
      include: { images: true, category: true }
    });
    res.json(products);
  });

  app.get("/api/products/:id", async (req, res) => {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: { images: true, category: true, reviews: { include: { user: true } } }
    });
    res.json(product);
  });

  // Categories
  app.get("/api/categories", async (req, res) => {
    const categories = await prisma.category.findMany();
    res.json(categories);
  });

  // Orders
  app.post("/api/orders", authenticateToken, async (req: any, res) => {
    const { items, totalPrice, addressId, paymentMethod } = req.body;
    try {
      const order = await prisma.order.create({
        data: {
          userId: req.user.id,
          totalPrice,
          addressId,
          items: {
            create: items.map((item: any) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price
            }))
          },
          payment: {
            create: {
              method: paymentMethod,
              amount: totalPrice,
              status: paymentMethod === "COD" ? "PENDING" : "PAID"
            }
          }
        }
      });
      res.json({ success: true, order });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to create order" });
    }
  });

  app.get("/api/user/orders", authenticateToken, async (req: any, res) => {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      include: { items: { include: { product: true } }, payment: true }
    });
    res.json(orders);
  });

  // Admin Dashboard Data
  app.get("/api/admin/stats", authenticateToken, async (req: any, res) => {
    if (req.user.role !== "ADMIN" && req.user.role !== "SUPER_ADMIN") {
      return res.status(403).json({ error: "Forbidden" });
    }
    const [userCount, orderCount, totalRevenue, products] = await Promise.all([
      prisma.user.count(),
      prisma.order.count(),
      prisma.order.aggregate({ _sum: { totalPrice: true } }),
      prisma.product.findMany({ take: 5, orderBy: { createdAt: 'desc' } })
    ]);
    res.json({ userCount, orderCount, totalRevenue: totalRevenue._sum.totalPrice || 0, recentProducts: products });
  });

  // --- VITE MIDDLEWARE ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[NextGen Market] Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
