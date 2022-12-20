import {
  Box,
  Button,
  Container,
  createIcon,
  Heading,
  Icon,
  Stack,
  useColorModeValue,
  Text,
  Flex,
  Wrap,
  Badge,
} from "@chakra-ui/react";
import Link from "next/link";

import { getSortedBlogData } from "lib/blogs";

const ContactPage = ({ allBlogData }) => {
  return (
    // <Container>
    <Stack
      as={Box}
      textAlign="center"
      spacing={{ base: 8, md: 14 }}
      gap={28}
      pt={{ base: 16, md: 30 }}
      px={2}
      w="full"
      minHeight={{ base: "80vh", md: "88vh" }}
    >
      <Stack as={Box} maxWidth="3xl" textAlign="center" mx="auto">
        <Heading
          fontWeight={600}
          fontSize={{ base: "4xl", sm: "4xl", md: "6xl" }}
          lineHeight="110%"
        >
          Blogs
        </Heading>
        <br />
        <hr />
        <br />
        <ul>
          {allBlogData.map(({ blog, date, title, blurb, coverImage }) => (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 2fr",
                gap: "16px",
                maxHeight: "320px",
                border: "1px solid rgb(65, 72, 85, 0.5)",
                borderRadius: "5px",
                padding: "6px",
              }}
            >
              <div style={{ display: "grid", placeItems: "center" }}>
                <img
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    borderRadius: "5px",
                    margin: "auto",
                  }}
                  src={`${coverImage}`}
                  alt={title}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Link
                  style={{
                    fontSize: "1.5rem",
                    textAlign: "left",
                    fontWeight: "600",
                  }}
                  href={`/blog/${blog}`}
                >
                  {title}
                </Link>
                <p
                  style={{
                    textAlign: "left",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    lineClamp: "3",
                    display: "-webkit-box",
                    WebkitLineClamp: "3",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {blurb}
                </p>
                <Badge
                  variant="outline"
                  style={{ marginLeft: "auto", marginTop: "8px" }}
                >
                  {date}
                </Badge>
              </div>
            </div>
          ))}
        </ul>
      </Stack>
    </Stack>
  );
};

export async function getStaticProps() {
  const allBlogData = getSortedBlogData();
  return {
    props: {
      allBlogData,
    },
  };
}

export default ContactPage;
