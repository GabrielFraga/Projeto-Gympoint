import React from 'react';
import { Image, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import CheckinIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import HelpIcon from 'react-native-vector-icons/MaterialIcons';

import logo from '~/assets/logo-horizontal.png';

import SignIn from './pages/SignIn';
import CheckIns from './pages/CheckIns';
import HelpOrders from './pages/HelpOrders';
import CreateHelpOrder from './pages/HelpOrders/create';
import ViewAnswer from './pages/HelpOrders/viewAnswer';

const LogoTitle = () => {
  return (
    <View>
      <Image source={logo} />
    </View>
  );
};
const check = createStackNavigator(
  {
    CheckIns,
  },
  {
    headerLayoutPreset: 'center',
    headerBackTitleVisible: false,
    defaultNavigationOptions: {
      headerTitle: <LogoTitle />,
    },
  },
);
const help = createStackNavigator(
  {
    HelpOrders,
    CreateHelpOrder,
    ViewAnswer,
  },
  {
    headerLayoutPreset: 'center',
    headerBackTitleVisible: false,
    defaultNavigationOptions: {
      headerTitle: <LogoTitle />,
    },
  },
);

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            CheckIns: {
              screen: check,
              navigationOptions: {
                tabBarLabel: 'Check-ins',
                tabBarIcon: ({ tintColor }) => (
                  <CheckinIcon
                    name="map-marker-check"
                    size={20}
                    color={tintColor}
                  />
                ),
              },
            },
            HelpOrders: {
              screen: help,
              navigationOptions: {
                tabBarLabel: 'Pedir Ajuda',
                tabBarIcon: ({ tintColor }) => (
                  <HelpIcon name="live-help" size={20} color={tintColor} />
                ),
              },
            },
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#ee4e62',
              inactiveTintColor: '#ccc',
            },
          },
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      },
    ),
  );
