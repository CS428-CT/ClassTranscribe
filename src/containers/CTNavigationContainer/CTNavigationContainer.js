import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../HomeContainers/Home'
const Tab = createBottomTabNavigator();

const CTNavigationContainer = () => {
    function DetailsScreen() {
        return (
          <View>
            <Text>Details!</Text>
          </View>
        );
      }
      
    function HomeScreen() {
        return (
            <View>
                <Text>Home!</Text>
            </View>
        );
    }

    return (
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Settings" component={Home} />
          </Tab.Navigator>
        </NavigationContainer>
      );
}

export default CTNavigationContainer;
