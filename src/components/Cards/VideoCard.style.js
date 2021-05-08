import { StyleSheet } from 'react-native'

const VideoCardStyle = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: '2%',
    marginBottom: '2%',
    backgroundColor: 'white',
    width: '95%',
    borderRadius: 5,
    alignContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  
  leftText: {
    textAlign: 'left',
    paddingLeft: 10,
    maxWidth: '60%',
  },

  rightText: {
    textAlign: 'right',
    paddingRight: 10,
    color: '#333'
  },
})

export default VideoCardStyle
