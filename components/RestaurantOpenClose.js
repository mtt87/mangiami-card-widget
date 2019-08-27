import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Flex, Text } from 'rebass';
import { MdAccessTime } from 'react-icons/md';
import {
  format,
  isAfter,
  isWithinInterval,
  parse,
  differenceInMinutes,
  setHours,
  setMinutes,
  getHours,
  getMinutes,
  addDays,
  toDate,
} from 'date-fns';
import { Colors } from '../theme';

function formattedOpenClose(tradingHours, now = new Date()) {
  const dateToCheck = format(now, 'EEEE');
  if (!tradingHours || !tradingHours[dateToCheck] || tradingHours[dateToCheck].length === 0) {
    return {
      color: Colors.RED,
      string: 'Chiuso oggi',
    };
  }
  let result;
  if (tradingHours[dateToCheck] && tradingHours[dateToCheck].length > 0) {
    for (let i = 0; i < tradingHours[dateToCheck].length; i += 1) {
      const openRange = tradingHours[dateToCheck][i];
      const timeToCheck = new Date(now);
      let openStart = parse(openRange.Start, 'HHmm', new Date());
      let openEnd = parse(openRange.Finish, 'HHmm', new Date());
      openStart = setHours(setMinutes(now, getMinutes(openStart)), getHours(openStart));
      openEnd = setHours(setMinutes(now, getMinutes(openEnd)), getHours(openEnd));
      if (parseInt(openRange.Finish, 10) < parseInt(openRange.Start, 10)) {
        openEnd = addDays(openEnd, 1);
      }
      if (
        isWithinInterval(timeToCheck, {
          start: toDate(openStart),
          end: toDate(openEnd),
        })
      ) {
        result = {
          color: Colors.GREEN,
          string: 'Aperto',
        };
        break;
      }
      // it's not open let's see if it opens later
      if (!isAfter(now, openEnd)) {
        if (differenceInMinutes(openStart, now) > 59) {
          result = {
            color: Colors.ORANGE,
            string: `Apre alle ${format(openStart, 'HH:mm')}`,
          };
        } else {
          result = {
            color: Colors.ORANGE,
            string: `Apre tra ${differenceInMinutes(openStart, now)} min`,
          };
        }
        break;
      } else {
        result = {
          color: Colors.RED,
          string: 'Chiuso',
        };
      }
    }
  }
  return result;
}

const RestaurantOpenClose = ({ tradingHours, withIcon = true, ...props }) => {
  const [color, setColor] = useState(null);
  const [string, setString] = useState(null);
  useEffect(() => {
    try {
      const { color: c, string: s } = formattedOpenClose(tradingHours, new Date());
      setColor(c);
      setString(s);
    } catch (err) {
      //
    }
  }, [tradingHours]);
  if (!color || !string) {
    return null;
  }
  return (
    <Flex flexDirection="row" alignItems="center">
      {withIcon && <MdAccessTime style={{ marginRight: 5 }} name="android-time" size={20} color={Colors.BLACK} />}
      <Text fontSize={[1, 2]} lineHeight={1.4} color={color} fontWeight="600" {...props}>
        {string}
      </Text>
    </Flex>
  );
};

RestaurantOpenClose.propTypes = {
  tradingHours: PropTypes.shape().isRequired,
};

export default RestaurantOpenClose;
