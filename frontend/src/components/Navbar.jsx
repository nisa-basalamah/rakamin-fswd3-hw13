import { Link } from "react-router-dom";
import { Box, Flex, Spacer } from "@chakra-ui/react";

function Navbar() {
  return (
    <>
      <Flex
        as="header"
        position="sticky"
        bgGradient="linear(to-l, blue.700, black)"
        top={0}
        zIndex={999}
        w="100%"
        p="20px"
      >
        <Box fontWeight="bold" color="white" px="11px">
          <Link color="teal.500" to="/">
            Home
          </Link>
        </Box>
        {!localStorage.getItem("accessToken") && (
          <Box fontWeight="bold" color="white" px="11px">
            <Link to="/register">Sign Up</Link>
          </Box>
        )}
        {localStorage.getItem("accessToken") && (
          <Box fontWeight="bold" color="white" px="11px">
            <Link
              onClick={() => {
                localStorage.removeItem("accessToken");
              }}
              to="/login"
            >
              Logout
            </Link>
          </Box>
        )}
      </Flex>
    </>
  );
}

export default Navbar;
