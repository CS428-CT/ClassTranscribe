/* eslint react/prop-types: "off" */
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { STACK_SCREENS } from './index'
import Home from '../HomeContainers/Home'
import CoursePlaylistsContainer from '../CoursePlaylistsContainer/CoursePlaylistsContainer'
import VideoContainer from '../VideoContainer/VideoContainer'
import UniversityListContainer from '../UniversityListContainer/UniversityListContainer'
import PlaylistContainer from '../PlaylistContainer/PlaylistContainer'
import DepartmentListContainer from '../DepartmentListContainer/DepartmentListContainer'
import CourseListContainer from '../CourseListContainer/CourseListContainer'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

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
 * Wraps the UniversityListContainer so that it can
 * receive the proper props
 */
const UniversityListView = ({ navigation }) => {
  return <UniversityListContainer navigation={navigation} />
}

/**
 * Wraps the DepartmentListContainer so that it can
 * receive the proper props
 */
const DepartmentListView = ({ navigation, route }) => {
  return (
    <DepartmentListContainer universityId={route.params.universityId} navigation={navigation} />
  )
}

/**
 * Wraps the CourseListContainer so that it can
 * receive the proper props
 */
const CourseListView = ({ navigation, route }) => {
  return (
    <CourseListContainer
      departmentId={route.params.departmentId}
      acronym={route.params.acronym}
      navigation={navigation}
    />
  )
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
  return (
    <VideoContainer videos={route.params.videos} index={route.params.rec} navigation={navigation} />
  )
}

/**
 * The navigator of the Course tab. Contains a stack navigator.
 */
const CourseNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={STACK_SCREENS.UNIVERSITY_LIST}>
      <Stack.Screen name={STACK_SCREENS.UNIVERSITY_LIST} component={UniversityListView} />
      <Stack.Screen name={STACK_SCREENS.DEPT_LIST} component={DepartmentListView} />
      <Stack.Screen name={STACK_SCREENS.COURSE_LIST} component={CourseListView} />
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
        <Tab.Screen
          name="Course"
          component={CourseNavigator}
          options={{
            tabBarLabel: 'Course',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="school" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeNaivgator}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Video"
          component={VideoView}
          options={{
            tabBarLabel: 'Video',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="video" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default CTNavigationContainer
