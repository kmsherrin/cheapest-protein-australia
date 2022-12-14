import { Flex, Link, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex as="footer" width="full" justifyContent="center" mt="auto">
      <Text fontSize="sm" color="gray.500">
        {new Date().getFullYear()} -{" "}
        <Link href="https://sznm.dev" isExternal rel="noopener noreferrer">
          made with ☕ by ken
        </Link>
      </Text>
    </Flex>
  );
};

export default Footer;
