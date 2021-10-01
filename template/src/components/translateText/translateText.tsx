import React from 'react';
import {Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import {TranslateProps} from './type';

const TranslateText: React.FunctionComponent<TranslateProps> = (
  props: TranslateProps,
) => {
  const {t} = useTranslation();
  const text = props.ignoreTranslate && props.text || t(props.text)
  return (
    <Text 
      {...props} 
      allowFontScaling={false}
    >
      {props.isRequiredLabel ? `${text}*` : text}
    </Text>
  );
};

TranslateText.displayName = 'TranslateText';
export default TranslateText;
