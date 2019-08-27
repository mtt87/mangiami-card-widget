import defaultTheme from '@rebass/preset';

export const Colors = {
  RED: '#ED3B4F',
  BLACK: '#111',
  GREY: '#909090',
  LIGHT_GREY: '#FAFAFA',
  MEDIUM_GREY: '#F5F5F5',
  ORANGE: '#F7893E',
  GREEN: 'green',
};

export default {
  ...defaultTheme,
  colors: {
    RED: Colors.RED,
    BLACK: Colors.BLACK,
    GREY: Colors.GREY,
    LIGHT_GREY: Colors.LIGHT_GREY,
    MEDIUM_GREY: Colors.MEDIUM_GREY,
    ORANGE: Colors.ORANGE,
    GREEN: Colors.GREEN,
  },
};