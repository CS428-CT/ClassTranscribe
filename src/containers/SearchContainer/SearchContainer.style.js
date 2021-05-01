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
    marginTop: '3%',
  },

  search: {
    width: '92%',
    marginBottom: '2%',
    justifyContent: 'space-between',
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderRadius: 5,
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
})

export default HomeStyle
