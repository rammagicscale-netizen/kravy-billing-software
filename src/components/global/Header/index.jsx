"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { useCart } from "@/context/CartContext";

// About dropdown config
const aboutNav = { title: "About Us", href: "/about" };

const aboutSubLinks = [
  { title: "Overview", href: "/about" },
  { title: "Our Team", href: "/about#team" },
  { title: "Goals & Vision", href: "/about#goals" },
  { title: "Careers", href: "/about#careers" },
];

// Desktop navigation (About is handled separately)
const navLinks = [
  { title: "Products", href: "/products" }, // ⭐ NEW main Products link
  { title: "Updates", href: "/updates" },
  { title: "FAQs", href: "/faqs" },
  { title: "Contact Us", href: "/contact" },
  { title: "Pricing", href: "/pricing" },
];

// Mobile navigation (About has its own dropdown, so not here)
const navMobileLinks = [
  { title: "Products", href: "/products" }, // ⭐ NEW in mobile too
  { title: "Updates", href: "/updates" },
  { title: "FAQs", href: "/faqs" },
  { title: "Contact Us", href: "/contact" },
  { title: "Privacy Policy", href: "/privacy-policy" },
  { title: "Terms & Conditions", href: "/terms-and-conditions" },
];

// Product list for mobile accordion
const productsList = [
  { id: "basic", name: "Kravy Billing Software Basic", priceLabel: "₹499/month", price: 499 },
  { id: "pos-pro", name: "Kravy POS System Pro", priceLabel: "₹899/month", price: 899 },
  { id: "inventory-addon", name: "Kravy Inventory Add-on", priceLabel: "₹299/month", price: 299 },
  { id: "analytics-pro", name: "Kravy Analytics Pro", priceLabel: "₹699/month", price: 699 },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [aboutMobileOpen, setAboutMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // ✅ for hydration-safe theme toggle

  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    totalItems,
    totalAmount,
  } = useCart();

  useEffect(() => {
    const closeOnScroll = () => {
      if (isOpen) setIsOpen(false);
    };
    window.addEventListener("scroll", closeOnScroll);
    return () => window.removeEventListener("scroll", closeOnScroll);
  }, [isOpen]);

  // ✅ mark component as mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  const formatCurrency = (v) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(v);

  const isActive = (href) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    if (href.startsWith("/about")) return pathname.startsWith("/about");
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* NAVBAR */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl px-6 rounded-xl backdrop-blur-md bg-white/70 dark:bg-darkBackground/40 border border-gray-200 dark:border-gray-500 shadow-lg">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link href="/">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xl font-extrabold cursor-pointer text-black dark:text-white"
            >
              Kravy<span className="text-green-500">.in</span>
            </motion.div>
          </Link>

          {/* Desktop Navbar */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* About dropdown (desktop) */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="relative group"
            >
              <button
                type="button"
                className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                  isActive(aboutNav.href)
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-700 dark:text-gray-200"
                }`}
              >
                {aboutNav.title}
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    isActive(aboutNav.href) ? "rotate-180" : "group-hover:rotate-180"
                  }`}
                />
              </button>

              {/* Dropdown panel */}
              <div className="absolute left-0 top-full mt-2 w-52 rounded-xl border border-slate-200 bg-white/95 shadow-lg backdrop-blur-md hidden group-hover:block group-focus-within:block dark:border-slate-700 dark:bg-slate-900/95">
                <div className="py-2">
                  {aboutSubLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block px-4 py-2 text-xs text-left hover:bg-slate-100 dark:hover:bg-slate-800 ${
                        isActive(item.href)
                          ? "text-green-600 dark:text-green-400"
                          : "text-slate-700 dark:text-slate-200"
                      }`}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Other links (Products, Updates, FAQs, Contact, Pricing) */}
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.08 }}
              >
                <Link
                  href={link.href}
                  className={`relative text-sm font-medium group transition-colors ${
                    isActive(link.href)
                      ? "text-green-600 dark:text-green-400"
                      : "text-gray-700 dark:text-gray-200"
                  }`}
                >
                  {link.title}
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 rounded-full bg-green-500 transition-all ${
                      isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* CTA */}
            <motion.a
              href="https://app.foodsnap.in/sign-up?redirect=%2Fpricing"
              target="_blank"
              className="hidden md:inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-md text-sm font-semibold shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Get Started
            </motion.a>

            {/* ✅ Theme Toggle (hydration-safe) */}
            <motion.button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              whileHover={{ scale: 1.05 }}
              aria-label="Toggle theme"
            >
              {!mounted ? (
                // render invisible icon until mounted to keep server & client HTML same
                <Sun size={20} className="opacity-0" />
              ) : theme === "dark" ? (
                <Sun size={20} />
              ) : (
                <Moon size={20} />
              )}
            </motion.button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-[18px] h-[18px] bg-green-500 text-white text-[10px] rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen((p) => !p)}
              className="md:hidden text-gray-800 dark:text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden mt-2 px-4 pb-4 space-y-2 border-t border-gray-300 dark:border-gray-700"
            >
              {/* About dropdown (mobile) */}
              <button
                onClick={() => setAboutMobileOpen((p) => !p)}
                className={`flex items-center justify-between w-full py-2 text-sm border-b border-gray-200 dark:border-gray-800 ${
                  isActive("/about")
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-800 dark:text-gray-100"
                }`}
              >
                <span>{aboutNav.title}</span>
                {aboutMobileOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              <AnimatePresence>
                {aboutMobileOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pl-3 space-y-1 overflow-hidden"
                  >
                    {aboutSubLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => {
                          setIsOpen(false);
                          setAboutMobileOpen(false);
                        }}
                        className={`block py-1.5 text-xs border-b border-gray-100 last:border-b-0 dark:border-gray-800 ${
                          isActive(item.href)
                            ? "text-green-600 dark:text-green-400"
                            : "text-gray-700 dark:text-gray-200"
                        }`}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Other mobile links (includes Products now) */}
              {navMobileLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 text-sm border-b border-gray-200 dark:border-gray-800 ${
                    isActive(link.href)
                      ? "text-green-600 dark:text-green-400"
                      : "text-gray-800 dark:text-gray-100"
                  }`}
                >
                  {link.title}
                </Link>
              ))}

              {/* Products Dropdown (mobile quick add to cart) */}
              <button
                onClick={() => setShowProducts((p) => !p)}
                className="flex justify-between items-center w-full py-2 text-left text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700"
              >
                <span>Quick Add Products</span>
                {showProducts ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              <AnimatePresence>
                {showProducts && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pl-3 space-y-3 mt-1"
                  >
                    {productsList.map((p) => (
                      <div
                        key={p.id}
                        className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-md"
                      >
                        <div>
                          <p className="text-sm font-semibold">{p.name}</p>
                          <p className="text-xs text-gray-500">{p.priceLabel}</p>
                        </div>

                        <button
                          onClick={() =>
                            addToCart({ id: p.id, name: p.name, price: p.price })
                          }
                          className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1.5 rounded-md"
                        >
                          Add
                        </button>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* CART DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/40"
              onClick={() => setIsCartOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-white dark:bg-darkBackground shadow-xl border-l border-gray-200 dark:border-gray-800 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-lg font-semibold">Your Cart</h2>
                <button onClick={() => setIsCartOpen(false)}>
                  <X size={22} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                {cartItems.length === 0 ? (
                  <p className="text-sm text-gray-500">Your cart is empty.</p>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between bg-gray-100 dark:bg-gray-900 p-3 rounded-lg"
                    >
                      <div>
                        <p className="text-sm font-semibold">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          {formatCurrency(item.price)}
                        </p>

                        <div className="flex items-center mt-2 gap-2">
                          <button
                            onClick={() => decreaseQty(item.id)}
                            className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full text-xs"
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => increaseQty(item.id)}
                            className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full text-xs"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-semibold">
                          {formatCurrency(item.quantity * item.price)}
                        </p>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs text-red-500 flex items-center gap-1 mt-2"
                        >
                          <Trash2 size={14} />
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-gray-300 dark:border-gray-800 p-4">
                <div className="flex justify-between mb-3">
                  <span>Total</span>
                  <span className="font-semibold">{formatCurrency(totalAmount)}</span>
                </div>

                <button
                  disabled={cartItems.length === 0}
                  onClick={() => {
                    if (!cartItems.length) return;
                    setIsCartOpen(false);
                    router.push("/checkout");
                  }}
                  className="block w-full text-center bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2 rounded-md font-semibold"
                >
                  Checkout
                </button>

                <button
                  onClick={clearCart}
                  className="w-full text-xs text-gray-500 mt-2 flex items-center justify-center gap-1"
                >
                  <Trash2 size={12} />
                  Clear Cart
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
