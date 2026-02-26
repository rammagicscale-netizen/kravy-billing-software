"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useEffect } from "react";

export default function SuccessPage() {
    const { clearCart } = useCart();

    useEffect(() => {
        clearCart();
    }, [clearCart]);

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-6" />
            <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
                Thank you for choosing Kravy. Your subscription has been activated.
                Our team will contact you shortly for onboarding.
            </p>
            <Link
                href="/"
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold shadow-md hover:bg-emerald-700 transition-all"
            >
                Go to Home
            </Link>
        </div>
    );
}
