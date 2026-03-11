"use client";

import React from "react";
import { motion } from "framer-motion";
import DownloadDropdown from "../../dropdown";

const Card = ({ image, index, slug }) => {
  return (
    <motion.figure
      key={image._id || index}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-md bg-white dark:bg-zinc-900 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent group"
    >
      <div className="relative">
        <motion.img
          loading="lazy"
          width="400"
          height="300"
          src={image.image_url}
          alt={
            image.title
              ? `${image.title} - Restaurant Billing Software Feature | Kravy`
              : "Kravy restaurant billing software dashboard feature"
          }
          className="w-full h-56 sm:h-64 object-cover rounded-md group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-md" />

        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300">
          <DownloadDropdown
            withWatermarkUrl={image.image_url}
            withoutWatermarkUrl={`https://billing.kravy.in/dashboard?search=${slug}`}
            title={image.title}
          />
        </div>
      </div>

      {image.title && (
        <figcaption className="absolute bottom-3 left-3 right-3 text-sm font-semibold text-white drop-shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {image.title}
        </figcaption>
      )}

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ImageObject",
          contentUrl: image.image_url,
          name: image.title || "Kravy Billing Software Feature",
          description:
            image.title ||
            "Restaurant billing software feature from Kravy POS system",
          creator: {
            "@type": "Organization",
            name: "Kravy",
            url: "https://kravy.in",
          },
          publisher: {
            "@type": "Organization",
            name: "Kravy",
            url: "https://kravy.in",
          },
          creditText: "Kravy Restaurant Billing Platform",
          copyrightNotice: "© Kravy",
          license: "https://kravy.in/terms",
        })}
      </script>
    </motion.figure>
  );
};

export default Card;