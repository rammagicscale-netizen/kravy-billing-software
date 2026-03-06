// "use client";

// export const dynamic = "force-dynamic";

// import Link from "next/link";
// import { XCircle } from "lucide-react";
// import { useSearchParams } from "next/navigation";
// import { useEffect } from "react";
// import axios from "axios";

// export default function FailedPage() {
//   const searchParams = useSearchParams();
//   const transactionId = searchParams.get("transactionId");

//   useEffect(() => {
//     if (!transactionId) return;

//     axios.post("/api/payment-failed", { transactionId }).catch(console.error);
//   }, [transactionId]);

//   return (
//     <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
//       <XCircle className="w-16 h-16 text-red-500 mb-6" />
//       <h1 className="text-3xl font-bold mb-2">Payment Failed</h1>

//       <p className="text-gray-600 mb-8 max-w-md">
//         We couldn&apos;t process your payment.
//       </p>

//       <div className="flex gap-4">
//         <Link href="/checkout" className="px-6 py-3 bg-black text-white rounded-lg">
//           Try Again
//         </Link>

//         <Link href="/contact" className="px-6 py-3 border rounded-lg">
//           Contact Support
//         </Link>
//       </div>
//     </div>
//   );
// }

import { Suspense } from "react";
import FailedClient from "./FailedClient";

export const dynamic = "force-dynamic";

export default function FailedPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <FailedClient />
    </Suspense>
  );
}