import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.recommendation.deleteMany();
  await prisma.productView.deleteMany();
  await prisma.review.deleteMany();
  await prisma.wishlist.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.order.deleteMany();
  await prisma.address.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.subcategory.deleteMany();
  await prisma.category.deleteMany();
  await prisma.admin.deleteMany();
  await prisma.user.deleteMany();

  // Create Admin
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.admin.create({
    data: {
      email: "admin@nextgen.com",
      password: hashedPassword,
      name: "Super Admin",
    },
  });

  // Categories
  const categories = [
    { name: "Smartphones", description: "Latest mobile devices" },
    { name: "Luxury Sport Cars", description: "Premium automotive excellence" },
    { name: "Cameras", description: "Professional photography gear" },
    { name: "Laptops", description: "High-performance computing" },
    { name: "Smart Watches", description: "Wearable tech" },
    { name: "Speakers", description: "Premium audio experience" },
    { name: "Gaming Devices", description: "Next-level gaming gear" },
  ];

  const createdCategories = [];
  for (const cat of categories) {
    const created = await prisma.category.create({ data: cat });
    createdCategories.push(created);
  }

  // Products
  const products = [
    {
      name: "iPhone 15 Pro",
      description: "Titanium design, A17 Pro chip, Action button, and a more versatile Pro camera system.",
      price: 999,
      brand: "Apple",
      stock: 50,
      categoryName: "Smartphones",
      images: ["https://picsum.photos/seed/iphone15/800/800"]
    },
    {
      name: "Samsung Galaxy S24 Ultra",
      description: "AI-powered smartphone with 200MP camera and built-in S Pen.",
      price: 1299,
      brand: "Samsung",
      stock: 45,
      categoryName: "Smartphones",
      images: ["https://picsum.photos/seed/s24/800/800"]
    },
    {
      name: "Ferrari SF90 Stradale",
      description: "Hybrid supercar with 1000cv and blistering performance.",
      price: 524000,
      brand: "Ferrari",
      stock: 2,
      categoryName: "Luxury Sport Cars",
      images: ["https://picsum.photos/seed/ferrari/800/800"]
    },
    {
      name: "Lamborghini Revuelto",
      description: "The first V12 hybrid plug-in HPEV super sports car.",
      price: 608000,
      brand: "Lamborghini",
      stock: 1,
      categoryName: "Luxury Sport Cars",
      images: ["https://picsum.photos/seed/lambo/800/800"]
    },
    {
      name: "MacBook Pro 16 M3 Max",
      description: "The most advanced chips ever built for a personal computer.",
      price: 3499,
      brand: "Apple",
      stock: 20,
      categoryName: "Laptops",
      images: ["https://picsum.photos/seed/macbook/800/800"]
    },
    {
      name: "Canon EOS R5",
      description: "Professional full-frame mirrorless flagship camera.",
      price: 3899,
      brand: "Canon",
      stock: 15,
      categoryName: "Cameras",
      images: ["https://picsum.photos/seed/canon/800/800"]
    },
    {
      name: "Sony Alpha a7 IV",
      description: "Beyond basic. For a new generation of image makers.",
      price: 2499,
      brand: "Sony",
      stock: 25,
      categoryName: "Cameras",
      images: ["https://picsum.photos/seed/sony/800/800"]
    },
    {
      name: "JBL Authentics 500",
      description: "High-fidelity smart home speaker with retro design.",
      price: 699,
      brand: "JBL",
      stock: 30,
      categoryName: "Speakers",
      images: ["https://picsum.photos/seed/jbl/800/800"]
    },
    {
      name: "Apple Watch Ultra 2",
      description: "The most rugged and capable Apple Watch ever.",
      price: 799,
      brand: "Apple",
      stock: 40,
      categoryName: "Smart Watches",
      images: ["https://picsum.photos/seed/applewatch/800/800"]
    }
  ];

  for (const p of products) {
    const category = createdCategories.find(c => c.name === p.categoryName);
    if (category) {
      const createdProduct = await prisma.product.create({
        data: {
          name: p.name,
          description: p.description,
          price: p.price,
          brand: p.brand,
          stock: p.stock,
          categoryId: category.id,
        }
      });

      for (const imgUrl of p.images) {
        await prisma.productImage.create({
          data: {
            url: imgUrl,
            productId: createdProduct.id
          }
        });
      }
    }
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
