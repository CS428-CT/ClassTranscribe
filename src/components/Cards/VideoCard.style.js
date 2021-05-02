import { StyleSheet } from 'react-native'

const VideoCardStyle = StyleSheet.create({
  cardContainer: {
    display: 'flex',
<<<<<<< HEAD
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
  },
  rightText: {
    textAlign: 'right',
    paddingRight: 10,
=======
    width: '100%',
    backgroundColor: '#f5f5f5',
  },

  videoName: {
    fontWeight: 'bold',
    color: '#333',
  },

  ratio: {
    color: 'teal',
>>>>>>> fd3b230ae4615fb26c27889629767157dae4d478
  },
})

export default VideoCardStyle
