import { getBlogBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import Image from "next/image";

export async function generateMetadata({ params }) {

  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog not found"
    };
  }

  return {
    title: blog.title,
    description: blog.description,
  };
}

export default async function BlogDetail({ params }) {

  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-5 py-20">

      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
        {blog.title}
      </h1>

      <Image
        src={blog.image}
        width={1200}
        height={630}
        alt={blog.title}
        className="rounded-xl mb-8"
      />

      <div
        className="prose prose-lg max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

    </div>
  );
}