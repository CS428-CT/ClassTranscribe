import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../HomeContainers/Home'

const Tab = createBottomTabNavigator()

const CTNavigationContainer = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Settings" component={Home} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default CTNavigationContainer
