import { StyleSheet } from 'react-native'

const HomeStyle = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    flexWrap: 'wrap',
    width: '100%',
  },
  cardContainer: {
    width: '50%',
  },
  recContainer: {
    width: '50%',
  },

  viewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '3%',
  },
})

export default HomeStyle
