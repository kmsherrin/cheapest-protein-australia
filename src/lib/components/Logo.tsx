import { useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";

function Logo() {
  return (
    <div>
      <Link href="/">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
            pointer: "cursor",
          }}
        >
          <img w="20" src="/aus-logo.svg" />
          <span
            style={{
              fontFamily: "'Fira Sans', sans-serif",
              fontWeight: "800",
              //   color: "#292929",
              color: useColorModeValue("#292929", "#edeeee"),
              fontStyle: "italic",
            }}
          >
            CHEAPEST PROTEIN FINDER
          </span>
        </div>
      </Link>
    </div>
  );
}
export default Logo;
