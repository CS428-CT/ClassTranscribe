/* eslint react/prop-types: "off" */
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { STACK_SCREENS } from './index'
import Home from '../HomeContainers/Home'
import CoursePlaylistsContainer from '../CoursePlaylistsContainer/CoursePlaylistsContainer'
import VideoContainer from '../VideoContainer/VideoContainer'
import PlaylistContainer from '../PlaylistContainer/PlaylistContainer'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

/**
 * Wraps the CoursePlaylistsContainer so that it can
 * receive the proper props
 */
const CoursePlaylistsView = ({ navigation, route }) => {
  return <CoursePlaylistsContainer courseId={route.params.courseId} navigation={navigation} />
}

/**
 * Wraps the PlaylistContainer so that it can
 * receive the proper props
 */
const PlaylistView = ({ navigation, route }) => {
  return <PlaylistContainer playlistId={route.params.playlistId} navigation={navigation} />
}

/**
 * Wraps the VideoContainer so that it can
 * receive the proper props
 */
const VideoView = ({ route }) => {
  return <VideoContainer url={route.params.url} />
}

/**
 * The navigator of the home tab. Contains a stack navigator.
 */
const HomeNaivgator = () => {
  return (
    <Stack.Navigator initialRouteName={STACK_SCREENS.HOME}>
      <Stack.Screen name={STACK_SCREENS.HOME} component={Home} />
      <Stack.Screen name={STACK_SCREENS.COURSE_PLAYLISTS} component={CoursePlaylistsView} />
      <Stack.Screen name={STACK_SCREENS.PLAYLIST} component={PlaylistView} />
      <Stack.Screen name={STACK_SCREENS.VIDEO} component={VideoView} />
    </Stack.Navigator>
  )
}

/**
 * This is the root naivagator for the entire application.
 * Contains a home tab and a video tab. Within each tab, there may be additional navigators
 * such as a stack navigator.
 */
const CTNavigationContainer = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="HomeNavigator" component={HomeNaivgator} />
        <Tab.Screen name="Video" component={VideoView} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default CTNavigationContainer
