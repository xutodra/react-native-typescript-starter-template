import React from 'react';
import {
  createStackNavigator,
  StackCardInterpolationProps,
} from '@react-navigation/stack';

import { RootParamType } from './types/rootParamType';
import colors from 'themes/colors';

const RootStack = createStackNavigator<RootParamType>();

const modalOptions = {
  headerShown: false,
  cardStyle: { backgroundColor: colors.OVERLAY },
  cardOverlayEnabled: true,
  cardStyleInterpolator: (input: StackCardInterpolationProps) => {
    const progress = input.current.progress;
    return {
      cardStyle: {
        opacity: progress.interpolate({
          inputRange: [0, 0.5, 0.9, 1],
          outputRange: [0, 0.25, 0.7, 1],
        }),
      },
      overlayStyle: {
        opacity: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
          extrapolate: 'extend',
        }),
      },
    };
  },
};

const RootStackNavigator = () => {

  return (
    <>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
      </RootStack.Navigator>
    </>
  );
};

export default RootStackNavigator;