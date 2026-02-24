"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

const WHATSAPP_NUMBER = "919289507882"; // 👈 change to your number, e.g. 91XXXXXXXXXX

const products = [
  // MAIN HARDWARE + SETUPS
  {
    id: "smart-pos-bundle",
    name: "Kravy Smart POS",
    tag: "Best for busy restaurants",
    image: "/assets/setup1.png",
    rating: 4.8,
    reviewsCount: 64,
    originalPrice: 29999,
    salePrice: 24999,
    isFromPrice: false,
    billingCycle: "one-time setup",
    planLabel: "Device + printer + software",
    planStartsFrom: "Plan starts from ₹24,999",
    shortDescription:
      "Complete POS machine, thermal printer, and Kravy billing app.",
    features: [
      "Touchscreen POS with fast performance",
      "High-speed thermal printer",
      "GST-ready billing with KOT & discounts",
      "Ideal for restaurants, cafés & sweet shops",
    ],
  },
  {
    id: "billing-software",
    name: "Kravy Billing Software (Only Software)",
    tag: "Use your existing system",
    image: "/assets/setup2.png",
    rating: 4.7,
    reviewsCount: 112,
    originalPrice: 999,
    salePrice: 799,
    isFromPrice: true,
    billingCycle: "per month",
    planLabel: "Software subscription only",
    planStartsFrom: "Plan starts from ₹799 / month",
    shortDescription:
      "Billing and basic inventory on your own desktop, laptop or Android device.",
    features: [
      "Fast, simple billing screen",
      "Basic inventory & low stock alerts",
      "GST invoice formats & reports",
      "Perfect for small shops & counters",
    ],
  },
  {
    id: "printer-addon",
    name: "Thermal Printer Add-on",
    tag: "Works with Kravy software",
    image: "/assets/setup3.png",
    rating: 4.6,
    reviewsCount: 48,
    originalPrice: 5999,
    salePrice: 4999,
    isFromPrice: false,
    billingCycle: "one-time (hardware)",
    planLabel: "Printer only",
    planStartsFrom: "Plan starts from ₹4,999",
    shortDescription:
      "High-speed thermal printer for clear GST receipts & KOT tickets.",
    features: [
      "Fast printing for rush hours",
      "2\" & 3\" receipts (as per model)",
      "No-ink, low running cost",
      "Compact design for billing counter",
    ],
  },
  {
    id: "restaurant-full-setup",
    name: "Full Restaurant Setup",
    tag: "End-to-end solution",
    image: "/assets/setup4.png",
    rating: 4.9,
    reviewsCount: 37,
    originalPrice: null,
    salePrice: null,
    isFromPrice: true,
    billingCycle: "",
    planLabel: "Custom hardware + software",
    planStartsFrom: "Custom plans as per outlet",
    shortDescription:
      "Complete setup: POS, printer, menu configuration, training and onboarding.",
    features: [
      "Layout & flow consultation",
      "Menu & KOT configuration",
      "Table & counter billing setup",
      "Staff training & ongoing support",
    ],
  },

  // QUICK PRODUCTS (same as header quick add)
  {
    id: "basic",
    name: "Kravy Billing Software Basic",
    tag: "Starter plan",
    image: "/assets/sh1.png",
    rating: 4.5,
    reviewsCount: 52,
    originalPrice: 599,
    salePrice: 499,
    isFromPrice: true,
    billingCycle: "per month",
    planLabel: "For small outlets",
    planStartsFrom: "Plan starts from ₹499 / month",
    shortDescription:
      "For kirana, tiffin and small outlets starting with digital billing.",
    features: [
      "Simple GST-ready bills",
      "Basic stock tracking",
      "Daily sales summary",
      "Works on existing system",
    ],
  },
  {
    id: "pos-pro",
    name: "Kravy POS System Pro",
    tag: "For growing outlets",
    image: "/assets/sh2.png",
    rating: 4.7,
    reviewsCount: 89,
    originalPrice: 1099,
    salePrice: 899,
    isFromPrice: true,
    billingCycle: "per month",
    planLabel: "Advanced POS",
    planStartsFrom: "Plan starts from ₹899 / month",
    shortDescription:
      "Advanced POS for busy restaurants and retail stores with multiple counters.",
    features: [
      "Rush-hour optimised billing",
      "Multi-user & role-based access",
      "Category & item-wise analytics",
      "Discounts, offers & combos",
    ],
  },
  {
    id: "inventory-addon",
    name: "Kravy Inventory Add-on",
    tag: "Deep stock control",
    image: "/assets/sh3.png",
    rating: 4.4,
    reviewsCount: 41,
    originalPrice: 399,
    salePrice: 299,
    isFromPrice: true,
    billingCycle: "per month",
    planLabel: "Add-on module",
    planStartsFrom: "Plan starts from ₹299 / month",
    shortDescription:
      "Extra module for serious inventory tracking, wastage control and purchase history.",
    features: [
      "Stock in/out tracking",
      "Low stock alerts",
      "Unit & pack support",
      "Purchase & supplier mapping",
    ],
  },
  {
    id: "analytics-pro",
    name: "Kravy Analytics Pro",
    tag: "Smart reports",
    image: "/assets/sh4.png",
    rating: 4.6,
    reviewsCount: 33,
    originalPrice: 899,
    salePrice: 699,
    isFromPrice: true,
    billingCycle: "per month",
    planLabel: "Analytics layer",
    planStartsFrom: "Plan starts from ₹699 / month",
    shortDescription:
      "Analytics on top of your billing data to understand items, hours and outlet performance.",
    features: [
      "Daily/weekly/monthly dashboards",
      "Top & slow-moving item reports",
      "Peak hour analysis",
      "Outlet-wise comparison",
    ],
  },
];

const formatCurrency = (val) => {
  if (val == null) return "";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val);
};

const ProductsPage = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    if (!product.salePrice && product.salePrice !== 0) return; // skip custom price product
    addToCart({
      id: product.id,
      name: product.name,
      price: product.salePrice,
      image: product.image,
      quantity: 1,
    });
  };

  const buildWhatsAppLink = (product) => {
    const message = `
Hi Kravy team 👋,

I am interested in:
Product: ${product.name}
Plan: ${product.planStartsFrom}
Billing: ${product.billingCycle || "custom / one-time"}

Please share more details, demo and best offer for this product.
    `.trim();

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="container mx-auto px-4 py-10 md:py-16">
        {/* Top heading similar to Ezo "Collection: Products" */}
        <div className="mb-8 md:mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2">
            COLLECTION
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold">
            All Kravy Products
          </h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
            Hardware, software plans and add-ons designed for Indian
            restaurants, cafés and retail shops. Pick a product, add to cart or
            talk to us directly on WhatsApp.
          </p>
        </div>

        {/* Grid layout like store.ezobooks.in */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card
              key={product.id}
              className="flex flex-col overflow-hidden border-border/70 bg-card hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="relative w-full h-52 bg-muted/40">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  priority={product.id === "smart-pos-bundle"}
                />
              </div>

              {/* Content */}
              <CardContent className="pt-4 pb-3 flex-1 flex flex-col gap-3">
                {/* Name + tag */}
                <div>
                  <CardTitle className="text-base md:text-lg">
                    {product.name}
                  </CardTitle>
                  {product.tag && (
                    <p className="text-xs mt-1 text-primary/80 font-medium">
                      {product.tag}
                    </p>
                  )}
                </div>

                {/* Rating + small line like Ezo (optional) */}
                {(product.rating || product.reviewsCount) && (
                  <p className="text-[11px] text-muted-foreground">
                    ⭐ {product.rating?.toFixed(1)} / 5.0{" "}
                    {product.reviewsCount
                      ? `(${product.reviewsCount} reviews)`
                      : ""}
                  </p>
                )}

                {/* Prices in Ezo style */}
                <div className="mt-1">
                  {product.salePrice ? (
                    <>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-white">
                          {product.isFromPrice ? (
                            <span className="text-sm font-normal text-gray-400 mr-1">
                              From
                            </span>
                          ) : (
                            ""
                          )}
                          {formatCurrency(product.salePrice)}
                          {product.billingCycle && (
                            <span className="text-sm font-normal text-gray-400">
                              {" "}
                              / {product.billingCycle}
                            </span>
                          )}
                        </span>

                        {product.originalPrice && (
                          <span className="text-xs text-muted-foreground line-through">
                            {formatCurrency(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </>
                  ) : (
                    <span className="text-sm font-semibold">
                      Custom pricing (talk to us)
                    </span>
                  )}

                  <p className="text-[11px] text-emerald-400 mt-1">
                    {product.planStartsFrom}
                  </p>
                  <p className="text-xs mt-1 text-muted-foreground">
                    {product.planLabel}
                  </p>
                </div>

                {/* Short description + 2–3 key points (compact) */}
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-muted-foreground">
                    {product.shortDescription}
                  </p>
                  <ul className="list-disc list-inside space-y-0.5 text-[11px] text-muted-foreground">
                    {product.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>

              {/* Footer buttons like actions */}
              <CardFooter className="pt-0 pb-3 px-4 flex flex-col gap-2">
                <div className="flex gap-2">
                  {/* Add to Cart only if price is defined */}
                  <Button
                    size="sm"
                    className="flex-1"
                    disabled={!product.salePrice}
                    onClick={() => handleAddToCart(product)}
                  >
                    {product.salePrice ? "Add to Cart" : "Custom Plan"}
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    asChild
                    className="flex-1"
                  >
                    <Link href={buildWhatsAppLink(product)} target="_blank">
                      WhatsApp Enquiry
                    </Link>
                  </Button>
                </div>

                <Button
                  size="sm"
                  variant="ghost"
                  asChild
                  className="w-full text-xs"
                >
                  <Link href="/contact">Need help choosing? Talk to us</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Note at bottom */}
        <div className="max-w-3xl mx-auto mt-10 text-center text-xs md:text-sm text-muted-foreground">
          Prices shown are starting prices and can change based on device model,
          subscription duration, quantity and location. Our team will confirm
          final pricing after understanding your outlet needs.
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
