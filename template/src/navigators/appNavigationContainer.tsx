import React from 'react';
import {LinkingOptions, NavigationContainer} from '@react-navigation/native';

import RootStackNavigator from './rootStackNavigator';

const AppNavigationContainer = () => {

  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
};

export default AppNavigationContainer;
