import { StyleSheet } from 'react-native'

const VideoStyle = StyleSheet.create({
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
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
    marginTop: '100%',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default VideoStyle
