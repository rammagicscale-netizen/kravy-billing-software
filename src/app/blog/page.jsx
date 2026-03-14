import Link from "next/link";
import Image from "next/image";
import { getAllBlogs } from "@/lib/blog";

export default function BlogPage() {

  const blogs = getAllBlogs();

  return (
    <div className="max-w-7xl mx-auto px-5 py-20">

      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center
      text-gray-900 dark:text-white">
        Blog
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {blogs.map((blog) => (

          <Link
            key={blog.slug}
            href={`/blog/${blog.slug}`}
            className="group rounded-xl overflow-hidden border
            border-gray-200 dark:border-gray-800
            bg-white dark:bg-[#0f0f0f]
            hover:shadow-xl transition duration-300"
          >

            <div className="relative w-full h-48 overflow-hidden">

              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />

            </div>

            <div className="p-6">

              <h2 className="text-xl font-semibold mb-2
              text-gray-900 dark:text-white">
                {blog.title}
              </h2>

              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {blog.description}
              </p>

            </div>

          </Link>

        ))}

      </div>

    </div>
  );
}