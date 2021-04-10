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
    color: 'white',
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
  modalTitle: {
    fontSize: 20,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  modalSubTitle: {
    color: '#333',
    fontSize: 13,
    marginBottom: 16,
  },
  modalHint: {
    color: '#333',
    fontSize: 13,
    marginBottom: 8,
    textAlign: 'center',
  },
})

export default VideoStyle
