import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const blogsDirectory = path.join(process.cwd(), "src/content/blogs");

export function getAllBlogs() {

  const files = fs.readdirSync(blogsDirectory);

  const blogs = files.map((file) => {

    const slug = file.replace(".md", "");
    const fullPath = path.join(blogsDirectory, file);
    const fileContent = fs.readFileSync(fullPath, "utf8");

    const { data } = matter(fileContent);

     return {
      slug,
      ...data
    };

  });

  return blogs.sort((a,b)=> new Date(b.date) - new Date(a.date));
}


export async function getBlogBySlug(slug) {
  const fullPath = path.join(blogsDirectory, `${slug}.md`);
  const fileContent = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContent);

  const processedContent = await remark()
    .use(html)
    .process(content);

  return {
    slug,
    ...data,
    content: processedContent.toString()
  };
}