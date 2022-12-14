import {
  Button,
  Box,
  HStack,
  useColorModeValue,
  Text,
  VStack,
  ListItem,
  ListIcon,
  List,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

import { PriceWrapper } from "./PriceWrapper";

export function ProteinCard({
  title,
  subtitle,
  listPoints,
  slug,
}: {
  title: string;
  subtitle: string;
  listPoints: string[];
  slug: string;
}) {
  return (
    <PriceWrapper>
      <Box py={4} px={12}>
        <Text fontWeight="500" fontSize="3xl">
          {title}
        </Text>
        <HStack justifyContent="center">
          <Text fontSize="2xl" fontWeight="600" pt={4}>
            {subtitle}
          </Text>
        </HStack>
      </Box>
      <VStack
        bg={useColorModeValue("gray.50", "gray.700")}
        py={4}
        borderBottomRadius="xl"
      >
        <List spacing={3} textAlign="start" px={12}>
          {listPoints.map((point, ind) => (
            <ListItem key={ind}>
              <ListIcon as={FaCheckCircle} color="green.500" />
              {point}
            </ListItem>
          ))}
        </List>
        <Box w="80%" pt={7}>
          <Link href={slug || "/"}>
            <Button w="full" colorScheme="blue" variant="outline">
              Find
            </Button>
          </Link>
        </Box>
      </VStack>
    </PriceWrapper>
  );
}
