import { Box, useColorModeValue } from "@chakra-ui/react";
import type { ReactNode } from "react";

export function PriceWrapper({ children }: { children: ReactNode }) {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={useColorModeValue("gray.200", "gray.500")}
      borderRadius="xl"
      w={{ base: "80%", lg: "xs" }}
    >
      {children}
    </Box>
  );
}
