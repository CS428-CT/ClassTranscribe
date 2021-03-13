import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import LoginContainer from './src/containers/LoginContainer/LoginContainer'
import VideoContainer from './src/containers/VideoContainer/VideoContainer'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: '30%',
  },
})

export default function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false)

  const onAuthLevelChange = (isAuthenticated) => {
    setIsUserAuthenticated(isAuthenticated)
  }

  const renderApplication = () => {
    if (isUserAuthenticated) {
      // return <VideoContainer />
      return (
        // <View style={styles.container}>
        //   <Text style={styles.title}>PUT REST OF APPLICATION HERE!!!</Text>
        // </View>

        <View style={styles.container}>
          <VideoContainer />
        </View> 
        
        // <VideoContainer />

      )
    }

    return <LoginContainer onAuthLevelChange={onAuthLevelChange} />
  }
  return <SafeAreaView>{renderApplication()}</SafeAreaView>
}


// import React from 'react';
// import { View, StyleSheet, Button } from 'react-native';
// import { Video, AVPlaybackStatus } from 'expo-av';
// import VideoContainer from './src/containers/VideoContainer/VideoContainer'
// import styles from './src/containers/VideoContainer/VideoContainer.style'

// export default function App() {
//   const video = React.useRef(null);
//   const [status, setStatus] = React.useState({});
//   return (
//     <View style={styles.container}>
//       <Video
//         ref={video}
//         style={styles.video}
//         source={{
//           uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//         }}
//         useNativeControls
//         resizeMode="contain"
//         isLooping
//         onPlaybackStatusUpdate={status => setStatus(() => status)}
//       />
//       <View style={styles.buttons}>
//         <Button
//           title={status.isPlaying ? 'Pause' : 'Play'}
//           onPress={() =>
//             status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
//           }
//         />
//       </View>
//     </View>
//   );
// }
