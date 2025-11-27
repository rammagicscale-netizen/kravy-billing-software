import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppBubble = () => {
  // ✅ Put your WhatsApp number here (without +)
  const phoneNumber = "919289507882"; // example: 91 + your number

  // ✅ Optional: default message when user clicks
  const message =
    "Hi Kravy team, I want to know more about the billing software.";

  const href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50"
    >
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] shadow-lg flex items-center justify-center hover:scale-105 transition-transform">
        <FaWhatsapp className="text-white text-3xl" />
      </div>
    </Link>
  );
};

export default WhatsAppBubble;
