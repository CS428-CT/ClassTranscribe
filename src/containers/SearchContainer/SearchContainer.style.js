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

  input: {
      height: 40,
      margin: 12,
  }
})

export default HomeStyle
