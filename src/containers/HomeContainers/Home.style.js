import { StyleSheet } from 'react-native'

const HomeStyle = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    flexWrap: 'wrap', 
    width:'100%' 
  },
  placeholder: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  seperator: {
    height: 2,
    width: '100%',
    backgroundColor: '#CED0CD',
  },
})

export default HomeStyle
