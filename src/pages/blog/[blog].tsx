/* eslint-disable react/jsx-no-target-blank */
import { Flex, Text, Heading, Box, Stack } from "@chakra-ui/react";
import { NextSeo } from "next-seo";

import { getAllBlogs, getBlogData } from "lib/blogs";

interface BlogData {
  title: string;
  date: string;
  blog: string;
  contentHtml: string;
  blurb: string;
  coverImage: string;
}

export default function BlogPost({ blogData }: { blogData: BlogData }) {
  if (!blogData) {
    // fix Next bug while building
    // "Error occurred prerendering page "/[...slug]". Read more: https://err.sh/next.js/prerender-error"
    // https://github.com/vercel/next.js/issues/12846
    return null;
  }

  return (
    <>
      <NextSeo title={`${blogData.title}`} />

      <Flex
        direction="column"
        // alignItems="center"
        justifyContent="center"
        minHeight="70vh"
        gap={4}
        mb={8}
        w="full"
        px={3}
      >
        <Flex
          direction="column"
          maxWidth="5xl"
          textAlign="center"
          justifyContent="center"
          mx="auto"
          gap={5}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "4xl", sm: "4xl", md: "6xl" }}
          >
            {blogData.title}
          </Heading>
          <Text fontWeight="400" fontSize="xl">
            {blogData.date}
          </Text>
          <Text fontWeight="400" fontSize="lg">
            {blogData.blurb}
          </Text>
          <img
            style={{ maxWidth: "600px", margin: "auto" }}
            src={blogData.coverImage}
            alt=""
          />

          <br />
          <hr />
          <br />
          <div
            className="markdown"
            dangerouslySetInnerHTML={{ __html: blogData.contentHtml }}
          />
        </Flex>
      </Flex>
    </>
  );
}

export async function getStaticPaths() {
  const paths = getAllBlogs();
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const blogData = await getBlogData(params.blog);
  return {
    props: {
      blogData,
    },
    revalidate: 86400, // In seconds
  };
}
