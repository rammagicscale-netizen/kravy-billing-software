// "use client";

// export const dynamic = "force-dynamic";

// import Link from "next/link";
// import { CheckCircle2, Download } from "lucide-react";
// import { useCart } from "@/context/CartContext";
// import { useEffect } from "react";
// import { useSearchParams } from "next/navigation";

// export default function SuccessPage() {
//     const { clearCart } = useCart();
//     const searchParams = useSearchParams();

//     const orderId = searchParams.get("orderId");

//     useEffect(() => {
//         clearCart();
//     }, [clearCart]);

//     return (
//         <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">

//             <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-6" />

//             <h1 className="text-3xl font-bold mb-2">
//                 Payment Successful!
//             </h1>

//             <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
//                 Thank you for choosing Kravy. Your subscription has been activated.
//                 Our team will contact you shortly for onboarding.
//             </p>

//             {/* Download Invoice */}
//             {orderId && (
//                 <a
//                     href={`/api/invoice/${orderId}`}
//                     className="flex items-center gap-2 px-6 py-3 mb-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
//                 >
//                     <Download size={18} />
//                     Download Invoice
//                 </a>
//             )}

//             <Link
//                 href="/"
//                 className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold shadow-md hover:bg-emerald-700 transition-all"
//             >
//                 Go to Home
//             </Link>

//         </div>
//     );
// }


//src/app/checkout/success/page.jsx

import { Suspense } from "react";
import SuccessClient from "./SuccessClient";

export const dynamic = "force-dynamic";

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <SuccessClient />
    </Suspense>
  );
}