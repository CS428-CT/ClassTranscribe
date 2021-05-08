/* eslint react/prop-types: "off" */
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { STACK_SCREENS } from './index'
import StarredContainer from '../StarredContainer/StarredContainer'
import HistoryContainer from '../HistoryContainer/HistoryContainer'
import CoursePlaylistsContainer from '../CoursePlaylistsContainer/CoursePlaylistsContainer'
import VideoContainer from '../VideoContainer/VideoContainer'
import PlaylistContainer from '../PlaylistContainer/PlaylistContainer'
import DownloadContainer from '../DownloadContainer/DownloadContainer'
import SearchContainer from '../SearchContainer/SearchContainer'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

/**
 * Wraps the Starred container so that it can
 * receive the proper props
 */
const StarredView = ({ navigation }) => {
  return <StarredContainer navigation={navigation} />
}

/**
 * Wraps the History container so that it can
 * receive the proper props
 */
const StarView = ({ navigation }) => {
  return <HistoryContainer navigation={navigation} />
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
const HistoryNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={STACK_SCREENS.HISTORY}>
      <Stack.Screen name={STACK_SCREENS.HISTORY} component={StarView} />
      <Stack.Screen name={STACK_SCREENS.COURSE_PLAYLISTS} component={CoursePlaylistsView} />
      <Stack.Screen name={STACK_SCREENS.PLAYLIST} component={PlaylistView} />
      <Stack.Screen name={STACK_SCREENS.VIDEO} component={VideoView} />
      <Stack.Screen name={STACK_SCREENS.DOWNLOAD} component={DownloadView} />
    </Stack.Navigator>
  )
}

/**
 * The navigator of the starred tab. Contains a stack navigator.
 */
const StarredNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={STACK_SCREENS.STARRED}>
      <Stack.Screen
        name={STACK_SCREENS.STARRED}
        component={StarredView}
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
 * The navigator for the search tab. Contains a stack navigator.
 */
const SearchNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={STACK_SCREENS.SEARCH}>
      <Stack.Screen name={STACK_SCREENS.SEARCH} component={SearchContainer} />
    </Stack.Navigator>
  )
}

/**
 * This is the root navigator for the entire application.
 * Contains a starred tab, search tab, and downloads tab. Within each tab, there may be additional navigators
 * such as a stack navigator.
 */
const CTNavigationContainer = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName={STACK_SCREENS.STARRED}>
        <Tab.Screen
          name={STACK_SCREENS.SEARCH}
          component={SearchNavigator}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="text-search" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name={STACK_SCREENS.STARRED}
          component={StarredNavigator}
          options={{
            tabBarLabel: 'Starred',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="star" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name={STACK_SCREENS.HISTORY}
          component={HistoryNavigator}
          options={{
            tabBarLabel: 'History',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="calendar-clock" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name={STACK_SCREENS.DOWNLOAD}
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
