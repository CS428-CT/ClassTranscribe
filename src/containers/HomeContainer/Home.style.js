import { StyleSheet } from 'react-native'

const HomeStyle = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '98%',
  },

  viewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '3%',
  },

  dropdown: {
    flex: 0, 
    width: '95%',
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderColor: '#333',
    borderWidth: 0.5,
    overflow: 'hidden',
  },

  // dropdown: {
  //   flex: 0, 
  //   width: '100%',
  //   zIndex: 2,
  // },

  noCourses: {
    flex: 1,
    justifyContent: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
  }
})

export default HomeStyle
