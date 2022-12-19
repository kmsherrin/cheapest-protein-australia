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
} from "@chakra-ui/react";
import Link from "next/link";

const ContactPage = () => {
  return (
    // <Container>
    <Stack
      as={Box}
      textAlign="center"
      spacing={{ base: 8, md: 14 }}
      gap={28}
      pt={{ base: 16, md: 30 }}
      w="full"
      minHeight={{ base: "80vh", md: "88vh" }}
    >
      <Stack as={Box} maxWidth="3xl" textAlign="center" mx="auto" style={{}}>
        <Heading
          fontWeight={600}
          fontSize={{ base: "4xl", sm: "4xl", md: "6xl" }}
          lineHeight="110%"
        >
          Contact
        </Heading>
        <Text color={useColorModeValue("gray.500", "gray.200")} pt={6}>
          Hi, If you want to get in contact, please send an email through to
          cheap.protein.australia.app@gmail.com
        </Text>
      </Stack>
    </Stack>
  );
};

export default ContactPage;
