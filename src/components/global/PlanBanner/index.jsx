// "use client";

// import React from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { COMPANY } from "@/constants";

// const APK_FILE = "/app-release.apk"; // change name here when you upload new version

// export default function PlanBanner() {
//   const handleDownloadClick = () => {
//     // Optional: track download count (non-blocking)
//     fetch("/api/track-apk-download", { method: "POST" }).catch(() => {});
//   };

//   return (
//     <section className="w-full bg-gradient-to-r from-emerald-50 via-white to-emerald-50 dark:from-[#061118] dark:to-[#05050a] py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-10">
//           {/* LEFT SECTION */}
//           <div>
//             <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
//               Starter Plan at just{" "}
//               <span className="text-emerald-500">₹1299</span>
//               <span className="block md:inline md:ml-2 text-base font-medium text-gray-500 dark:text-gray-300">
//                 / per year
//               </span>
//             </h3>

//             <ul className="mt-6 space-y-3">
//               <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
//                 <span className="inline-flex items-center justify-center w-7 h-7 bg-emerald-100 text-emerald-600 rounded-full">
//                   ✓
//                 </span>
//                 <span>Android device (1 device)</span>
//               </li>
//               <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
//                 <span className="inline-flex items-center justify-center w-7 h-7 bg-emerald-100 text-emerald-600 rounded-full">
//                   ✓
//                 </span>
//                 <span>1 business &amp; 1 user</span>
//               </li>
//             </ul>
//           </div>

//           {/* CENTER IMAGE */}
//           <div className="flex items-center justify-center">
//             <Image
//               src="/assets/banner-ad-image.png"
//               alt="Plan preview image"
//               width={420}
//               height={420}
//               className="w-full max-w-[420px] h-auto object-contain drop-shadow-xl"
//             />
//           </div>

//           {/* RIGHT SECTION – QR + BUTTON */}
//           <div className="flex flex-col items-center lg:items-end text-center lg:text-right gap-6">
//             <div className="bg-white/80 dark:bg-black/30 border border-emerald-100 dark:border-emerald-900 rounded-2xl px-4 py-4 shadow-md">
//               <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Scan to download app
//               </p>
//               <div className="flex justify-center">
//                 <Image
//                   src="/assets/kravy_apk_qr.png"
//                   alt="Download Kravy app via QR"
//                   width={150}
//                   height={150}
//                   className="rounded-xl"
//                 />
//               </div>
//               <p className="mt-2 text-[11px] text-gray-500 dark:text-gray-400">
//                 Open camera or any QR scanner to download APK.
//               </p>
//             </div>

//             {/* Download Button */}
//             <Link
//               href={APK_FILE}
//               download
//               onClick={handleDownloadClick}
//               className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 rounded-lg shadow hover:opacity-95"
//             >
//               <svg
//                 className="w-6 h-6 mr-2"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M12 5v14m0 0l-5-5m5 5l5-5" />
//               </svg>
//               Get it from our Website
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
