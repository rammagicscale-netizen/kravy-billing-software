//src/app/checkout/page.jsx
"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";


export default function CheckoutPage() {
  const { cartItems, addToCart, removeFromCart, totalAmount, clearCart } = useCart();
  const [showPrinterModal, setShowPrinterModal] = useState(false);

  const printerPrice = 1999;
  const printerAdded = cartItems.some((item) => item.id === "printer");

  const addPrinter = () => {
    if (printerAdded) return;

    addToCart({
      id: "printer",
      name: "Thermal Printer (58mm)",
      price: printerPrice,
      quantity: 1,
    });
  };

  const removePrinter = () => {
    removeFromCart("printer");
  };

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

const handlePayment = async () => {

  if (!cartItems.length) return;

  if (!customer.name || !customer.phone) {
    alert("Please enter customer name and mobile number");
    return;
  }

  try {

    const response = await axios.post("/api/phonepe", {
      amount: totalAmount,
      customer,
      items: cartItems
    });

    if (response.data.url) {
      window.location.href = response.data.url;
    }

  } catch (error) {
    console.error("Payment Error:", error);
  }

};

  const [customer, setCustomer] = useState({
  name: "",
  phone: "",
  email: "",
});
const handleCustomerChange = (e) => {
  setCustomer({
    ...customer,
    [e.target.name]: e.target.value,
  });
};
  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      {/* Customer Details */}
<div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
  <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
    Customer Details
  </h2>

  <div className="grid gap-4 sm:grid-cols-2">
    
    <input
      type="text"
      name="name"
      placeholder="Customer Name"
      value={customer.name}
      onChange={handleCustomerChange}
      className="w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
    />

    <input
      type="tel"
      name="phone"
      placeholder="Mobile Number"
      value={customer.phone}
      onChange={handleCustomerChange}
      className="w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
    />

    <input
      type="email"
      name="email"
      placeholder="Email (optional)"
      value={customer.email}
      onChange={handleCustomerChange}
      className="w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 sm:col-span-2"
    />

  </div>
</div>
      {cartItems.length === 0 ? (
        <div className="border rounded-xl p-6 text-center border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            Your cart is empty.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-semibold"
          >
            Back to Home
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-3 mb-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatCurrency(item.price)} × {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          {/* Thermal Printer Suggestion */}
          <div className="border rounded-xl p-4 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700 mb-6">
            <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-3">
              🧾 Recommended Add-On
            </h3>
            
            <div className="flex gap-4 mb-3">
              {/* Printer Image */}
              <div className="flex-shrink-0">
                <img
                  src="/assets/printer.png"
                  alt="Thermal Printer"
                  className="w-24 h-24 object-cover rounded-lg bg-white dark:bg-gray-700 border border-amber-200 dark:border-amber-700"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIGZpbGw9IiNGRkYiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjIwIiBmaWxsPSIjQ0NBIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UHJpbnRlcjwvdGV4dD48L3N2Zz4=";
                  }}
                />
              </div>

              {/* Details */}
              <div className="flex-1">
                <p className="text-xs text-amber-800 dark:text-amber-200 mb-2">
                  Add a 58mm thermal printer for instant bill printing. USB/Bluetooth supported.
                </p>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                      Thermal Printer
                    </p>
                    <button
                      onClick={() => setShowPrinterModal(true)}
                      className="text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100"
                      title="View full details"
                    >
                      ℹ️
                    </button>
                  </div>
                  <p className="text-sm font-bold text-amber-700 dark:text-amber-300">
                    {formatCurrency(printerPrice)}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  {!printerAdded ? (
                    <button
                      onClick={addPrinter}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-600 hover:bg-amber-700 text-white transition-colors"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <>
                      <span className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-400 text-white">
                        Added ✓
                      </span>
                      <button
                        onClick={removePrinter}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500 hover:bg-red-600 text-white transition-colors"
                      >
                        Remove
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Total payable
            </span>
            <span className="text-xl font-semibold text-gray-900 dark:text-white">
              {formatCurrency(totalAmount)}
            </span>
          </div>

          <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 px-4 py-3 text-xs text-emerald-900 dark:text-emerald-100 mb-4">
            Payments are secured by PhonePe. Your transaction will be processed via a secure payment gateway.
          </div>

          <button
            onClick={handlePayment}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg text-sm font-semibold mb-3 shadow-md hover:scale-[1.01] transition-all"
          >
            Pay Now with PhonePe
          </button>

          <Link
            href="/"
            className="block w-full text-center text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ← Back to Home
          </Link>
        </>
      )}

      {/* Printer Details Modal */}
      {showPrinterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Thermal Printer Details
                </h3>
                <button
                  onClick={() => setShowPrinterModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>

              {/* Printer Image */}
              <div className="mb-4">
                <img
                  src="/assets/printer.png"
                  alt="Thermal Printer TP-58"
                  className="w-full h-48 object-cover rounded-lg bg-gray-100 dark:bg-gray-700"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Q0E0QUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7ByaW50ZXI8L3RleHQ+Cjwvc3ZnPg==";
                  }}
                />
              </div>

              {/* Product Details */}
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Model: Kravy TP-58
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    58mm Thermal Receipt Printer
                  </p>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                    Specifications:
                  </h5>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Print Width: 48mm (58mm paper)</li>
                    <li>• Print Speed: 90mm/sec</li>
                    <li>• Connectivity: USB + Bluetooth</li>
                    <li>• Paper Type: Thermal paper roll</li>
                    <li>• Power: DC 12V/2A adapter included</li>
                    <li>• Auto-cutter included</li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                    Features:
                  </h5>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Perfect for restaurant billing</li>
                    <li>• Compatible with Kravy Billing Software</li>
                    <li>• Fast printing for quick service</li>
                    <li>• Easy Bluetooth pairing</li>
                    <li>• Compact design</li>
                  </ul>
                </div>

                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(printerPrice)}
                    </span>
                    {!printerAdded ? (
                      <button
                        onClick={() => {
                          addPrinter();
                          setShowPrinterModal(false);
                        }}
                        className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors"
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <span className="px-4 py-2 bg-gray-400 text-white rounded-lg font-medium">
                        Already Added ✓
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
