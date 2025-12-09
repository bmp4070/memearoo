import React from 'react';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/HomeScreen';
import { GalleryScreen } from '../screens/GalleryScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { MemeChallengeScreen } from '../screens/MemeChallengeScreen';
import { ResultScreen } from '../screens/ResultScreen';
import { AttemptDetailScreen } from '../screens/AttemptDetailScreen';
import { RootStackParamList, TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const navigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#0B1221',
    card: '#0F172A',
    text: '#E5E7EB',
  },
};

const TabsNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: '#A855F7',
      tabBarInactiveTintColor: '#9CA3AF',
      tabBarStyle: { backgroundColor: '#0F172A', borderTopColor: '#1F2937' },
      tabBarIcon: ({ color, size }) => {
        const iconName =
          route.name === 'Home'
            ? 'home'
            : route.name === 'Gallery'
              ? 'images'
              : 'settings';
        return <Ionicons name={iconName as keyof typeof Ionicons.glyphMap} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Gallery" component={GalleryScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);

export const AppNavigator = () => {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={TabsNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="MemeChallenge" component={MemeChallengeScreen} options={{ title: 'Meme Challenge' }} />
        <Stack.Screen name="Result" component={ResultScreen} options={{ title: 'Preview' }} />
        <Stack.Screen name="AttemptDetail" component={AttemptDetailScreen} options={{ title: 'Attempt' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
