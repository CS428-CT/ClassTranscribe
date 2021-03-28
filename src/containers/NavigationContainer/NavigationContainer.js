import * as React from 'react'
import { BottomNavigation, Text } from 'react-native-paper'

const VideoRoute = () => <Text>Music</Text>
const AlbumsRoute = () => <Text>Albums</Text>
const RecentsRoute = () => <Text>Recents</Text>

const NavigationContainer = () => {
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'video', title: 'Video', icon: 'music' },
    { key: 'albums', title: 'Albums', icon: 'album' },
    { key: 'recents', title: 'Recents', icon: 'history' },
  ])

  const renderScene = BottomNavigation.SceneMap({
    video: VideoRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
  })

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  )
}

export default NavigationContainer
