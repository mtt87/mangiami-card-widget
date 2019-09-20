import React from 'react';
import { Flex, Box } from 'rebass';
import { useRouter } from 'next/router';
import CardFoodRestaurant from '../components/Card';

const Home = () => {
  const router = useRouter();
  const { id, ids } = router.query;
  if (!id && !ids) {
    return null;
  }
  if (id) {
    return (
      <Flex width={1} justifyContent="center">
        <Box px={2} width={[1, 400]}>
          <CardFoodRestaurant foodImageId={id} />
        </Box>
      </Flex>
    );
  }
  if (ids.length > 0) {
    return (
      <Flex flexDirection={["column", "row"]} width={1} justifyContent="center">
        {ids.map(i => (
          <Box key={i} px={[1, 2]} py={2} width={[1, 400]}>
            <CardFoodRestaurant foodImageId={i} />
          </Box>
        ))}
      </Flex>
    );
  }
  return <p>Error id or ids missing</p>;
};

export default Home;
