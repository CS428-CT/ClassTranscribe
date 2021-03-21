import { StyleSheet } from 'react-native'

const CourseCardStyle = StyleSheet.create({
  card: {
    marginVertical: 5,
    backgroundColor: 'white',
    width: '50%',
    height: '100%',
    borderRadius: 5,
  },
  container: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  courseTitle: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    color: 'teal',
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor: 'white',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  courseName: {
    color: '#333',
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 1,
    backgroundColor: 'white',
  },
})

export default CourseCardStyle
