-- NEXTGEN MARKET FULL MYSQL SCHEMA
-- Compatible with MySQL 8+ and phpMyAdmin

CREATE DATABASE IF NOT EXISTS nextgen_market;
USE nextgen_market;

-- Users Table
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role ENUM('USER', 'ADMIN', 'VENDOR') DEFAULT 'USER',
    avatar VARCHAR(255),
    isVerified BOOLEAN DEFAULT FALSE,
    otp VARCHAR(10),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Admin Table
CREATE TABLE admins (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'SUPER_ADMIN',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories
CREATE TABLE categories (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    image VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subcategories
CREATE TABLE subcategories (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    categoryId VARCHAR(36),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE CASCADE
);

-- Products
CREATE TABLE products (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(15, 2) NOT NULL,
    stock INT DEFAULT 0,
    categoryId VARCHAR(36),
    subcategoryId VARCHAR(36),
    brand VARCHAR(100),
    rating FLOAT DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (categoryId) REFERENCES categories(id),
    FOREIGN KEY (subcategoryId) REFERENCES subcategories(id)
);

-- Product Images
CREATE TABLE product_images (
    id VARCHAR(36) PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    productId VARCHAR(36),
    FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE
);

-- Orders
CREATE TABLE orders (
    id VARCHAR(36) PRIMARY KEY,
    userId VARCHAR(36),
    totalPrice DECIMAL(15, 2) NOT NULL,
    status ENUM('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED') DEFAULT 'PENDING',
    addressId VARCHAR(36),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
);

-- Order Items
CREATE TABLE order_items (
    id VARCHAR(36) PRIMARY KEY,
    orderId VARCHAR(36),
    productId VARCHAR(36),
    quantity INT NOT NULL,
    price DECIMAL(15, 2) NOT NULL,
    FOREIGN KEY (orderId) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES products(id)
);

-- Payments
CREATE TABLE payments (
    id VARCHAR(36) PRIMARY KEY,
    orderId VARCHAR(36) UNIQUE,
    method ENUM('STRIPE', 'PAYPAL', 'MOMO', 'COD') NOT NULL,
    status ENUM('PENDING', 'PAID', 'FAILED') DEFAULT 'PENDING',
    transactionId VARCHAR(255),
    amount DECIMAL(15, 2) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (orderId) REFERENCES orders(id)
);

-- Analytics Table
CREATE TABLE analytics (
    id VARCHAR(36) PRIMARY KEY,
    event_type VARCHAR(100),
    details JSON,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Activity Logs
CREATE TABLE activity_logs (
    id VARCHAR(36) PRIMARY KEY,
    userId VARCHAR(36),
    action VARCHAR(255),
    details TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
);

-- SEED DATA SAMPLES
INSERT INTO categories (id, name, description) VALUES
('cat-1', 'Smartphones', 'Latest mobile technology'),
('cat-2', 'Luxury Sport Cars', 'Ultra-premium performance vehicles'),
('cat-3', 'Laptops', 'High-performance work machines');

INSERT INTO products (id, name, description, price, stock, categoryId, brand, rating) VALUES
('prod-1', 'iPhone 15 Pro', 'Titanium design, A17 Pro chip', 999.00, 50, 'cat-1', 'Apple', 4.9),
('prod-2', 'Ferrari SF90', '1000cv Hybrid Supercar', 525000.00, 2, 'cat-2', 'Ferrari', 5.0),
('prod-3', 'MacBook Pro M3', 'Professional power unleashed', 2499.00, 20, 'cat-3', 'Apple', 4.8);

INSERT INTO product_images (id, url, productId) VALUES
('img-1', 'https://picsum.photos/seed/iphone/800/800', 'prod-1'),
('img-2', 'https://picsum.photos/seed/ferrari/800/800', 'prod-2'),
('img-3', 'https://picsum.photos/seed/macbook/800/800', 'prod-3');

-- Admin Account
INSERT INTO admins (id, email, password, name) VALUES
('adm-1', 'admin@nextgen.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Super Admin'); -- password is 'password'
