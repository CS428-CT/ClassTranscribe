import * as React from 'react'
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../HomeContainers/Home'
import VideoContainer from '../VideoContainer/VideoContainer'
import VideoStyle from '../VideoContainer/VideoContainer.style'

const Tab = createBottomTabNavigator()

function VideoView() {
  return (
    <View style={VideoStyle.container}>
      <VideoContainer />
    </View>
  )
}
const CTNavigationContainer = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />

        <Tab.Screen name="Video" component={VideoView} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default CTNavigationContainer
