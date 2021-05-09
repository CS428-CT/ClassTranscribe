import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '98%',
  },

  viewStyle: {
    flex: 1,
    paddingTop: '2%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  noCourses: {
    flex: 1,
    justifyContent: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
  },
})

export default styles
