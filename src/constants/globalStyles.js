import {Dimensions} from 'react-native';

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width,
};

const guidelineBaseWidth = 375;
// const guidelineBaseHeight = 667;

export const scale = (size) =>
  (dimensions.fullWidth / guidelineBaseWidth) * size;

export const colors = {
  cherry: '#312C51',
  mulled: '#48426D',
  marzipan: '#F0C38E',
  wax: '#F1AA9B',
};

export const text = {
  small: {
    fontSize: scale(12),
  },
  medium: {
    fontSize: scale(14),
  },
  big: {
    fontSize: scale(20),
    fontWeight: '500',
  },
};
