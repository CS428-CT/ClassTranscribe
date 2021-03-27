import { StyleSheet } from 'react-native'

const DownloadStyle = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  viewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '3%',
  },

  card: {
    marginTop: '2%',
    marginBottom: '2%',
    backgroundColor: 'white',
    width: '95%',
    borderRadius: 5,
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },

  courseTitle: {
    color: 'teal',
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor: 'white',
  },

  courseName: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'white',
  },

  courseContent: {
    paddingTop: 6,
    backgroundColor: 'white',
  },
})

export default DownloadStyle
