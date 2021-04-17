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
      marginTop: '2%',
      marginBottom: '2%',
      justifyContent: 'space-between',
      paddingVertical: 4,
      paddingHorizontal: 4,
      borderRadius: 5,
  }
})

export default HomeStyle
