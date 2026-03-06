// "use client";

// import { useCart } from "@/context/CartContext";
// import { useRouter } from "next/navigation";

// export default function CheckoutPage() {
//   const router = useRouter();
//   const { cartItems, totalAmount, clearCart } = useCart();

//   const handlePayment = async () => {
//     if (!window.Razorpay) {
//       alert("Razorpay SDK not loaded!");
//       return;
//     }

//     const options = {
//       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//       amount: totalAmount * 100,
//       currency: "INR",
//       name: "Kravy Billing",
//       description: "Software Subscription",
//       theme: { color: "#10b981" },

//       handler: function (response) {
//         alert("Payment Success!");
//         clearCart();
//         router.push("/thank-you");
//       },

//       prefill: {
//         name: "User",
//         email: "user@example.com",
//       },
//     };

//     const payment = new window.Razorpay(options);
//     payment.open();
//   };

//   return (
//     <section className="max-w-3xl mx-auto px-6 py-20">
//       <h1 className="text-3xl font-bold mb-4">Checkout</h1>

//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           {cartItems.map((item) => (
//             <div
//               key={item.id + item.cycle}
//               className="border rounded-lg p-4 mt-4 dark:border-gray-700"
//             >
//               <p className="font-semibold">{item.name}</p>
//               <p>
//                 ₹{item.price} × {item.quantity}
//               </p>
//               <p className="text-sm text-gray-500">
//                 Billing: {item.cycle}
//               </p>
//             </div>
//           ))}

//           <p className="text-xl font-bold mt-6">
//             Total: ₹{totalAmount}
//           </p>

//           <button
//             onClick={handlePayment}
//             className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg text-lg font-semibold"
//           >
//             Pay Now
//           </button>
          
//         </>
//       )}
//     </section>
//   );
// }



"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, addToCart, clearCart } = useCart();

  const printerPrice = 1999;

  const printerAdded = cartItems.some((item) => item.id === "printer");

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const addPrinter = () => {
    if (printerAdded) return;

    addToCart({
      id: "printer",
      name: "Thermal Printer (58mm)",
      price: printerPrice,
      quantity: 1,
      cycle: "one-time",
    });
  };

  const handlePayment = () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: totalAmount * 100,
      currency: "INR",
      name: "Kravy Billing",
      description: "Billing Software Subscription",
      theme: { color: "#16a34a" },

      handler: function () {
        alert("Payment Successful 🎉");
        clearCart();
        router.push("/thank-you");
      },
    };

    const payment = new window.Razorpay(options);
    payment.open();
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-16">

      <h1 className="text-3xl font-bold mb-8">
        Checkout
      </h1>

      {/* Selected Items */}
      <div className="space-y-4 mb-10">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="border rounded-xl p-4 flex justify-between"
          >
            <p className="font-semibold">{item.name}</p>
            <p className="font-bold">₹{item.price}</p>
          </div>
        ))}
      </div>

      {/* Printer Suggestion (ALWAYS VISIBLE) */}
      <div className="border rounded-xl p-6 bg-green-50 mb-10">

        <h2 className="text-xl font-bold mb-2">
          Recommended Add-On 🧾
        </h2>

        <p className="text-gray-600 mb-4">
          Add a 58mm thermal printer for instant bill printing.
        </p>

        <div className="flex justify-between items-center">

          <div>
            <p className="font-semibold">
              Thermal Printer
            </p>
            <p className="text-gray-500">
              USB / Bluetooth Supported
            </p>
          </div>

          <button
            onClick={addPrinter}
            disabled={printerAdded}
            className={`px-5 py-2 rounded-lg font-semibold ${
              printerAdded
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {printerAdded ? "Added ✓" : "Add ₹1999"}
          </button>

        </div>

      </div>

      {/* Total */}
      <div className="flex justify-between text-xl font-bold mb-6">
        <span>Total</span>
        <span>₹{totalAmount}</span>
      </div>

      {/* Payment */}
      <button
        onClick={handlePayment}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-lg font-semibold"
      >
        Pay Now
      </button>

    </section>
  );
}