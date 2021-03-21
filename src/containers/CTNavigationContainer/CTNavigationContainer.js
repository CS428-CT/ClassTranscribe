import * as React from 'react'
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { STACK_SCREENS } from './index'
import Home from '../HomeContainers/Home'
import CoursePlaylistsContainer from '../CoursePlaylistsContainer/CoursePlaylistsContainer'
import VideoContainer from '../VideoContainer/VideoContainer'
import UniversityListContainer from '../UniversityListContainer/UniversityListContainer'
import VideoStyle from '../VideoContainer/VideoContainer.style'
import PlaylistContainer from '../PlaylistContainer/PlaylistContainer'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const UniversityListView = ({ navigation, route }) => {
  return <UniversityListContainer /*universityid= {route.params.universityId}/**/ navigation={navigation} />
}

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
const VideoView = ({ navigation, route }) => {
  return <VideoContainer url={route.params.url} />
}

/**
 * The navigator of the home tab. Contains a stack navigator.
 */
const HomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={STACK_SCREENS.UNIVERSITY_LIST}>
      <Stack.Screen name={STACK_SCREENS.UNIVERSITY_LIST} component={UniversityListView} />
      <Stack.Screen name={STACK_SCREENS.HOME} component={Home} />
      <Stack.Screen name={STACK_SCREENS.COURSE_PLAYLISTS} component={CoursePlaylistsView} />
      <Stack.Screen name={STACK_SCREENS.PLAYLIST} component={PlaylistView} />
      <Stack.Screen name={STACK_SCREENS.VIDEO} component={VideoView} />
    </Stack.Navigator>
  )
}

/**
 * This is the root navigator for the entire application.
 * Contains a home tab and a video tab. Within each tab, there may be additional navigators
 * such as a stack navigator.
 */
const CTNavigationContainer = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="HomeNavigator" component={HomeNavigator} />
        <Tab.Screen name="Video" component={VideoView} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default CTNavigationContainer
