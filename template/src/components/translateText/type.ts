import {TextProps} from 'react-native';

export type TranslateProps = TextProps & {
  text: string;
  isRequiredLabel?: boolean;
  ignoreTranslate?: boolean;
};
