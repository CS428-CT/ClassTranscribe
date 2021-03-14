import React, { Component } from 'react'
import { Text, FlatList, View, StyleSheet } from 'react-native'
import { getStarredOfferingsData } from '../../api/offerings'
import CourseCard from '../../components/Cards/CourseCard'

class Home extends Component {
  styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
    },
    placeholder: {
      height: 40,
      margin: 12,
      borderWidth: 1,
    },
  })

  constructor(props) {
    super(props)

    this.state = {
      courses: null,
    }
  }

  componentDidMount() {
    this.fetchCourseInfo()
  }

  fetchCourseInfo() {
    getStarredOfferingsData()
      .then((response) => {
        return response
      })
      .then((data) => this.setState({ courses: data }))
  }

  renderCourseItem = ({ item }) => {
    return (
      <View style={this.styles.container}>
        {/* <Text>{item.courses[0].courseId}</Text>
                <Text>{item.courses[0].courseName}</Text>
                <Text>{item.courses[0].departmentAcronym} {item.courses[0].courseNumber}</Text> */}
        <CourseCard courseInfo={item.courses[0]} />
        <Text style={this.styles.placeholder}>Video Placeholder</Text>
      </View>
    )
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: '100%',
          backgroundColor: '#CED0CD',
        }}
      />
    )
  }

  render() {
    const { courses } = this.state
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {courses != null && (
          <FlatList
            data={courses}
            renderItem={this.renderCourseItem}
            ItemSeparatorComponent={this.renderSeparator}
          />
        )}
      </View>
    )
  }
}

export default Home
