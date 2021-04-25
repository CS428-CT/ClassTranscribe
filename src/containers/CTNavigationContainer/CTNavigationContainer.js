/* eslint react/prop-types: "off" */
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { STACK_SCREENS } from './index'
import Home from '../HomeContainer/Home'
import Starred from '../StarredContainer/Starred'
import CoursePlaylistsContainer from '../CoursePlaylistsContainer/CoursePlaylistsContainer'
import VideoContainer from '../VideoContainer/VideoContainer'
import PlaylistContainer from '../PlaylistContainer/PlaylistContainer'
import DownloadContainer from '../DownloadContainer/DownloadContainer'
import SearchContainer from '../SearchContainer/SearchContainer'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

/**
 * Wraps the Home container so that it can
 * receive the proper props
 */
const HomeView = ({ navigation, route }) => {
  return <Home starred={route.params.starred} navigation={navigation} />
}

/**
 * Wraps the Starred container so that it can
 * receive the proper props
 */
const StarView = ({ navigation }) => {
  return <Starred navigation={navigation} />
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
const VideoView = ({ route }) => {
  return (
    <VideoContainer
      videos={route.params.videos}
      index={route.params.index}
      downloaded={route.params.downloaded}
    />
  )
}

/**
 * Wraps the DownloadContainer so that it can
 * receive the proper props
 */
const DownloadView = ({ navigation }) => {
  return <DownloadContainer navigation={navigation} />
}

/**
 * The navigator of the starred tab. Contains a stack navigator.
 */
const StarredNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={STACK_SCREENS.STARRED}>
      <Stack.Screen name={STACK_SCREENS.STARRED} component={StarView} initialParams={{}} />
      <Stack.Screen name={STACK_SCREENS.COURSE_PLAYLISTS} component={CoursePlaylistsView} />
      <Stack.Screen name={STACK_SCREENS.PLAYLIST} component={PlaylistView} />
      <Stack.Screen name={STACK_SCREENS.VIDEO} component={VideoView} />
      <Stack.Screen name={STACK_SCREENS.DOWNLOAD} component={DownloadView} />
    </Stack.Navigator>
  )
}

/**
 * The navigator of the home tab. Contains a stack navigator.
 */
const HomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={STACK_SCREENS.HOME}>
      <Stack.Screen
        name={STACK_SCREENS.HOME}
        component={HomeView}
        initialParams={{ starred: true }}
      />
      <Stack.Screen name={STACK_SCREENS.COURSE_PLAYLISTS} component={CoursePlaylistsView} />
      <Stack.Screen name={STACK_SCREENS.PLAYLIST} component={PlaylistView} />
      <Stack.Screen name={STACK_SCREENS.VIDEO} component={VideoView} />
      <Stack.Screen name={STACK_SCREENS.DOWNLOAD} component={DownloadView} />
    </Stack.Navigator>
  )
}

/**
 * The navigator for the download tab. Contains a stack navigator.
 */
const DownloadNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={STACK_SCREENS.DOWNLOAD}>
      <Stack.Screen name={STACK_SCREENS.DOWNLOAD} component={DownloadView} />
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
        <Tab.Screen
          name="Search"
          component={SearchContainer}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="text-search" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeNavigator}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="star" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Starred"
          component={StarredNavigator}
          options={{
            tabBarLabel: 'Starred courses',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="star" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Download"
          component={DownloadNavigator}
          options={{
            tabBarLabel: 'Download',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="download" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default CTNavigationContainer
