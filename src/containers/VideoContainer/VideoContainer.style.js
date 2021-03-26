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
    margin: 30,
  },
  input: {
    width: 320,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
})

export default VideoStyle
