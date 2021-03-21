import { StyleSheet } from 'react-native'

const CourseCardStyle = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  card: {
    marginVertical: 5,
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: '50%',
    height: '100%',
    borderRadius: 5,
  },
  container: {
    paddingVertical: 2,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  title: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    color: 'teal',
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor: 'white',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  courseTitle: {

  }
})

export default CourseCardStyle
