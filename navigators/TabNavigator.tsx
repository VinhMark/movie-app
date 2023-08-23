import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import { COLOR, FONTSIZE, SPACING } from '../theme/theme';
import { StyleSheet, View } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import AccountScreen from '../screens/AccountScreen';
import TestScreen from '../screens/TestScreen';
import TicketScreen from '../screens/TicketScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLOR.Black,
          borderTopWidth: 0,
          height: SPACING.space_10 * 10,
        },
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={[styles.activeTabBackground, focused && { backgroundColor: COLOR.Orange }]}
              >
                <Octicons name='video' color={COLOR.White} size={FONTSIZE.size_30} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name='Search'
        component={SearchScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={[styles.activeTabBackground, focused && { backgroundColor: COLOR.Orange }]}
              >
                <Octicons name='search' color={COLOR.White} size={FONTSIZE.size_30} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name='Ticket'
        component={TicketScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={[styles.activeTabBackground, focused && { backgroundColor: COLOR.Orange }]}
              >
                <MaterialCommunityIcons
                  name='ticket-confirmation-outline'
                  color={COLOR.White}
                  size={FONTSIZE.size_30}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name='user'
        component={AccountScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={[styles.activeTabBackground, focused && { backgroundColor: COLOR.Orange }]}
              >
                <Feather name='user' color={COLOR.White} size={FONTSIZE.size_30} />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  activeTabBackground: {
    width: 66,
    height: 66,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.Black,
    padding: SPACING.space_18,
    borderRadius: SPACING.space_18 * 10,
  },
});
