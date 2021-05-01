import { StyleSheet } from 'react-native'

const StarredStyle = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '98%',
  },

  historyListItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '98%',
    marginBottom: 2,
  },

  historyWatchList: {
    marginTop: 8,
    marginLeft: 8,
    marginBottom: 40,
    paddingBottom: 0,
    alignContent: 'center',
    borderBottomColor: '#999',
    borderBottomWidth: 2,
  },

  viewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 5,
  },

  dropdown: {
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

export default StarredStyle
