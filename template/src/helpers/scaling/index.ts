import {Dimensions, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

let {width, height} = Dimensions.get('window');

const highDimension = width > height ? width : height;
const lowDimension = width > height ? height : width;

if (DeviceInfo.isTablet()) {
  width = highDimension;
  height = lowDimension;
} else {
  width = lowDimension;
  height = highDimension;
}

// Guideline sizes are based on standard ~5" screen mobile device
// IPhone X: 375x812
// Google Pixel 5: 393x851
const baseIPhone = {
  width: 375,
  height: 812
}

const baseGooglePix5 = {
  width: 393,
  height: 851
}

const baseTablet = {
  width: 1024,
  height: 768
}

const guidelineBaseWidth = Platform.select({
  ios: DeviceInfo.isTablet() ? baseTablet.width : baseIPhone.width,
  android: DeviceInfo.isTablet() ? baseTablet.width: baseGooglePix5.width,
}) || baseIPhone.width;
const guidelineBaseHeight = Platform.select({
  ios: DeviceInfo.isTablet() ? baseTablet.height : baseIPhone.height,
  android: DeviceInfo.isTablet() ? baseTablet.height: baseGooglePix5.height,
}) || baseIPhone.height;

const scale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;

const moderateScale = (size: number, factor = 0.5) => {
  return Math.round(scale(size));
}

const deviceWidth = width;
const deviceHeight = height;

export {scale, verticalScale, moderateScale, height, width, deviceWidth, deviceHeight};
