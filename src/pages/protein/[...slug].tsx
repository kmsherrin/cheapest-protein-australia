/* eslint-disable react/jsx-no-target-blank */
import { Flex, Text, Heading, Box, Stack } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { PageNotFoundError } from "next/dist/shared/lib/utils";
import Head from "next/head";
import Image from "next/image";

import content from "../../../content";
import { DataTable } from "lib/components/DataTable";

interface ProductData {
  id: number;
  scraperId: {
    title: string;
  };
  textData: string;
  products: string;
}

interface IProduct {
  name: string;
  datasourceId: number;
  link: string;
  shipsFrom: string;
  packageSize: number;
  nutritional: {
    protein: number;
    fats: number;
    carbs: number;
  };
  flavours: string[];
}

interface IPage {
  title: string;
  description: string;
  subdescription: string;
  keywords: string;
  slug: string;
  content: string;
  products: IProduct[];
}

const priceCell = (tableData) => {
  if (tableData.row.original.data) {
    const d = JSON.parse(
      tableData.row.original.data[tableData.row.original.data.length - 1]
        .textData
    );
    if (d) {
      const price = d.find((obj) => obj.id === "Price");

      return Number(price.text_data.replace(/[^\d.-]/g, ""));
    }
  }
  return "No price";
};

const proteinValueCell = (tableData) => {
  if (tableData.row.original.data) {
    const d = JSON.parse(
      tableData.row.original.data[tableData.row.original.data.length - 1]
        .textData
    );
    if (d) {
      // get array element where the obj contains id equal to Price
      const price = d.find((obj) => obj.id === "Price");
      const number_data = price.text_data.replace(/[^\d.-]/g, "");

      if (number_data) {
        return (
          <b>
            {Number(
              (
                tableData.row.original.nutritional.protein /
                (number_data / tableData.row.original.packageSize)
              ).toFixed(2)
            )}
          </b>
        );
      }
    }
    return "";
  }
};

function proteinValueAccessor(row: any) {
  const d = JSON.parse(row.data[row.data.length - 1].textData);
  if (d) {
    // get array element where the obj contains id equal to Price
    const price = d.find((obj) => obj.id === "Price");
    const number_data = price.text_data.replace(/[^\d.-]/g, "");

    if (number_data) {
      return Number(
        (row.nutritional.protein / (number_data / row.packageSize)).toFixed(2)
      );
    }
  }
  return 0;
}

function proteinPriceAccessor(row: any) {
  const d = JSON.parse(row.data[row.data.length - 1].textData);
  if (d) {
    // get array element where the obj contains id equal to Price
    const price = d.find((obj) => obj.id === "Price");
    return Number(price.text_data.replace(/[^\d.-]/g, ""));
  }
  return 0;
}

export default function Page({ page }: { page: IPage }) {
  const columnHelper = createColumnHelper();

  const initialState = {
    sortBy: [{ id: "proteinValue", desc: true }],
  };

  return (
    <>
      <Head>
        <title>{page.title}</title>
      </Head>

      <Flex
        direction="column"
        // alignItems="center"
        // justifyContent="center"
        minHeight="70vh"
        gap={4}
        mb={8}
        w="full"
      >
        <Stack as={Box} maxWidth="5xl" textAlign="center" mx="auto" gap={4}>
          <Heading
            fontWeight={600}
            fontSize={{ base: "4xl", sm: "4xl", md: "6xl" }}
          >
            {page.title}
          </Heading>
          <Text fontWeight="400" fontSize="lg" maxW="2xl">
            {page.description}
          </Text>
          <Text fontWeight="400" fontSize="sm" maxW="2xl">
            {page.subdescription}
          </Text>
        </Stack>
        <Stack my={10} style={{ overflowX: "auto" }}>
          <DataTable
            initialState={initialState}
            data={page.products}
            defaultSorted={[
              {
                id: "proteinValue",
                desc: true,
              },
            ]}
            columns={[
              columnHelper.accessor("image", {
                cell: (tableProps) => (
                  <img
                    src={tableProps.row.original.image}
                    height={60}
                    width={60}
                    alt="Product image"
                  />
                ),
                header: "Image",
              }),

              columnHelper.accessor("name", {
                cell: (info) => (
                  <a
                    href={info.row.original.link}
                    target="_blank"
                    rel="nofollow"
                  >
                    {info.row.original.name}
                  </a>
                ),
                header: "Product",
              }),

              columnHelper.accessor(proteinValueAccessor, {
                id: "proteinValue",
                cell: (tableProps) => proteinValueCell(tableProps),
                header: "Protein per $ (g per $)",
                meta: {
                  isNumeric: true,
                },
              }),

              columnHelper.accessor(proteinPriceAccessor, {
                cell: (tableProps) => priceCell(tableProps),
                header: "Price",
              }),

              columnHelper.accessor("packageSize", {
                cell: (info) => info.getValue(),
                header: "Package Size (kg)",
                meta: {
                  isNumeric: true,
                },
              }),

              columnHelper.accessor("nutritional.protein", {
                cell: (info) => info.getValue(),
                header: "Protein (g per 100g)",
                meta: {
                  isNumeric: true,
                },
              }),

              columnHelper.accessor("nutritional.fats", {
                cell: (info) => info.getValue(),
                header: "Fats (g per 100g)",
                meta: {
                  isNumeric: true,
                },
              }),

              columnHelper.accessor("nutritional.carbs", {
                cell: (info) => info.getValue(),
                header: "Carbs (g per 100g)",
                meta: {
                  isNumeric: true,
                },
              }),

              columnHelper.accessor("shipsFrom", {
                cell: (info) => info.getValue(),
                header: "Ships From",
                meta: {
                  isNumeric: false,
                },
              }),
            ]}
          />
        </Stack>
        <Stack textAlign="center" mx="auto" gap={4}>
          <Text fontWeight="400" fontSize="xs" maxW="2xl">
            Nutritional values are all based on the Vanilla flavouring versions
            of the products. As this is probably the most popular...
          </Text>
          <Text fontWeight="400" fontSize="xs" maxW="2xl">
            Get in contact if you have any other reputable and great value
            brands that should be listed! I'd be keen to check them out and add
            them to the list.
          </Text>
        </Stack>
      </Flex>
    </>
  );
}

export async function getStaticPaths() {
  const paths = content.pages.map((page) => {
    const slug = page.path.split("/").slice(1);
    return { params: { slug } };
  });
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const currentPath = `/${params.slug.join("/")}`;
  const page = content.pages.find((page) => page.path === currentPath) || {
    notfound: true,
  };

  const productIds = page.products.map((product) => product.datasourceId);
  // turn array to comma separated string
  const productIdsString = productIds.join(",");
  const response = await fetch(
    `${process.env.DATA_FETCH_URL}/api/fetchResults?scraper_ids=${productIdsString}&user_id=09ffafd3-3450-4752-a517-e4259eb22c89`
  );

  console.log(response);

  if (response.ok) {
    const productData = await response.json();
    console.log(productData);

    page.products.forEach((product, index) => {
      page.products.data = [];
      const filteredProductData = productData.filter(
        (row) => row.scraperId === product.datasourceId
      );

      // sort filteredproductdata
      filteredProductData.sort((a, b) => {
        return a.id - b.id;
      });
      page.products[index].data = filteredProductData;
    });

    return { props: { page } };
  }

  return { props: { page } };
}
