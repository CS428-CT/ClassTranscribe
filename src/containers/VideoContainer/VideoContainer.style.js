import { StyleSheet, Dimensions } from 'react-native'

const VideoStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    paddingLeft: 10,
    textAlign: 'left',
    alignSelf: 'stretch',
  },
  videoLoading: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('screen').width * 0.5625,
    backgroundColor: 'black',
  },
  video: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('screen').width * 0.5625,
  },
  input: {
    width: 320,
  },
  buttonContainer: {
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
})

export default VideoStyle
