import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";

const blogsDirectory = path.join(process.cwd(), "blogs");

export function getAllBlogs() {
  const fileNames = fs.readdirSync(blogsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        blog: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export function getSortedBlogData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(blogsDirectory);
  const mdFileNames = fileNames.filter((fileName) => fileName.endsWith(".md"));

  const allBlogsData = mdFileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const blog = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(blogsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      blog,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allBlogsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    }
    return -1;
  });
}

export async function getBlogData(blog: string) {
  const fullPath = path.join(blogsDirectory, `${blog}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .use(remarkGfm)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    blog,
    contentHtml,
    ...matterResult.data,
  };
}
