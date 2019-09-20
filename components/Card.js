import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box, Text, Image, Link } from 'rebass';
import slugify from 'slugify';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Colors } from '../theme';

const GET_FOOD_IMAGE = gql`
  query getFoodImage($id: ID!) {
    getFoodImage(id: $id) {
      imageUrl
      title
      description
      price
      Restaurant {
        name
        logo
        cuisineType
      }
    }
  }
`;

const CardFoodRestaurant = ({ foodImageId }) => {
  const { loading, error, data } = useQuery(GET_FOOD_IMAGE, {
    variables: {
      id: foodImageId,
    },
  });

  if (loading) return null;
  if (error) return null;
  const { imageUrl, title, description, price, Restaurant } = data.getFoodImage;
  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      href={`https://mangiami.ch/ristoranti/${slugify(
        Restaurant.name.toLowerCase(),
      )}`}
      style={{ textDecoration: 'none' }}
    >
      <Flex
        flexDirection="column"
        height="100%"
        style={{ border: '1px solid #ddd' }}
        bg="#fff"
      >
        <Box bg="#fff" p={3}>
          <Flex flexDirection="row" alignItems="center">
            <Image
              alt="restaurant logo"
              style={{ border: '1px solid #ddd', borderRadius: 99999 }}
              width={50}
              height={50}
              src={Restaurant.logo}
            />
            <Flex mx={10} justifyContent="center" flexDirection="column">
              <Text lineHeight={1.3} color={Colors.BLACK} fontSize={[2, 3]}>
                {Restaurant.name}
              </Text>
              <Text lineHeight={1.3} color={Colors.GREY} fontSize={1}>
                {Restaurant.cuisineType}
              </Text>
            </Flex>
          </Flex>
        </Box>
        <Flex flexDirection="column">
          <Box width={1}>
            <img
              alt={title}
              src={imageUrl}
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: Colors.MEDIUM_GREY,
                margin: 0,
                borderBottom: '1px solid #eee',
              }}
            />
          </Box>
          <Box width={1} p={3}>
            <Flex mb={2} flexDirection="row">
              <Text
                flex="auto"
                fontWeight="600"
                fontSize={2}
                color={Colors.RED}
              >
                {title}
              </Text>
              {price > 0 && (
                <Text
                  width={110}
                  fontWeight="600"
                  textAlign="right"
                  color={Colors.RED}
                  fontSize={2}
                >
                  {`${Number(price).toFixed(2)} CHF`}
                </Text>
              )}
            </Flex>
            <Text color={Colors.BLACK} lineHeight={1.3} fontSize={1}>
              {description}
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Link>
  );
};

CardFoodRestaurant.propTypes = {
  foodImageId: PropTypes.string.isRequired,
};

export default CardFoodRestaurant;
