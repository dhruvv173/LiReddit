import { withUrqlClient } from "next-urql";
import React from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import Layout from "../../components/Layout";
import { Box, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";
import EditDeletePostButtons from "../../components/EditDeletePostButtons";

const Post = ({}) => {
  const [{ data, fetching }] = useGetPostFromUrl();

  if (fetching) {
    return (
      <Layout>
        <Box alignItems="center" display="flex" justifyContent="center">
          <Text fontSize="4xl" mr={2}>
            Loading post
          </Text>
          <Spinner size="xl" />
        </Box>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>Could not find post</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Flex
        alignItems="flex-start"
        justifyContent="space-between"
        display="flex"
      >
        <Heading mb={4}>{data.post.title}</Heading>
        <EditDeletePostButtons
          id={data.post.id}
          creatorId={data.post.creator.id}
        />
      </Flex>
      <Box mb={4}>{data.post.text}</Box>
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
