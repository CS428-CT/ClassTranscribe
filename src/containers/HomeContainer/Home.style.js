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
    backgroundColor: '#fff',
  },
  
  universityDropdown: {
    flex: 0,
    width: '95%',
    backgroundColor: '#FFF',
    borderBottomColor: '#333',
    borderColor: 'transparent',
    borderWidth: 0.5,
    overflow: 'hidden',
    marginTop: 5,
    marginBottom: 5,
  },

  noCourses: {
    flex: 1,
    justifyContent: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
  },
})

export default HomeStyle
