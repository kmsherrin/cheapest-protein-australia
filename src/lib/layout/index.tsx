import { Box } from "@chakra-ui/react";
import type { ReactNode } from "react";

import Navbar from "lib/components/Navbar";

import Footer from "./Footer";
import Header from "./Header";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box margin="0 auto" transition="0.5s ease-out" h="full">
      {/* <Header /> */}
      <Navbar />
      <Box as="main" marginY={22}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
