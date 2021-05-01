import { StyleSheet } from 'react-native'

const HomeStyle = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '98%',
  },

  viewStyle: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '2%',
    backgroundColor: 'white',
  },

  search: {
    width: '98%',
    marginBottom: '2%',
    justifyContent: 'space-between',
    paddingVertical: 4,
    paddingHorizontal: 4,
  },

  isHighlighted: {
    borderColor: 'black',
    borderWidth: 5,
  },

  departmentDropdown: {
    flex: 0,
    width: '95%',
    backgroundColor: '#FFF',
    borderBottomColor: '#333',
    borderColor: 'transparent',
    borderWidth: 0.5,
    overflow: 'hidden',
    marginBottom: 10,
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
