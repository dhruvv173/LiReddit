import { Box, Flex, Link, Button, Heading } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isSerrver";
import { useRouter } from "next/router";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  // Check if the data is not available yet
  let body = null;
  //data is loading
  if (isServer() || fetching) {
  } else if (!data?.me) {
    //user not logged in
    body = (
      <>
        <NextLink href="/login" passHref legacyBehavior>
          <Link mr={3} color={"black"}>
            Login
          </Link>
        </NextLink>
        <NextLink href="/register" passHref legacyBehavior>
          <Link color={"black"}>Register</Link>
        </NextLink>
      </>
    );
  } else {
    //user is logged in
    body = (
      <Flex align="center">
        <NextLink href="/create-post" passHref legacyBehavior>
          <Button as={Link} mr={4} _hover={{ textDecoration: "none" }}>
            Create Post
          </Button>
        </NextLink>
        <Box mr={2}>{data.me.username}</Box>
        <Button
          variant="link"
          _hover={{ textDecoration: "none" }}
          onClick={async () => {
            await logout({});
            router.reload();
          }}
          isLoading={logoutFetching}
        >
          Logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex zIndex={1} position="sticky" top={0} bg="tan" p={4}>
      <Flex flex={1} m="auto" maxW={800} align="center">
        <NextLink href="/" passHref legacyBehavior>
          <Link _hover={{ textDecoration: "none" }}>
            <Heading>LiReddit</Heading>
          </Link>
        </NextLink>
        <Box ml={"auto"} color="black">
          {body}
        </Box>
      </Flex>
    </Flex>
  );
};
export default NavBar;
