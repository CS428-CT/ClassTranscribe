/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

class CourseCard extends Component {
  styles = StyleSheet.create({
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
    },

    card: {
      backgroundColor: 'rgba(0,0,0,0.2)',
      width: '50%',
    },
    container: {
      padding: '0.01em 16px',
    },
    blue: {
      color: 'white',
      backgroundColor: '#2196F3',
    },
  })

  constructor(props) {
    super(props)
    const { courseInfo } = this.props
    this.state = { courseInfo }
  }

  empHandle = (text) => {
    return text == null ? 'Content missing' : text
  }

  render() {
    const { courseInfo } = this.state
    return (
      <View style={this.styles.card}>
        <Text style={(this.styles.container, this.styles.blue)}>
          {courseInfo.departmentAcronym} {courseInfo.courseNumber}:{' '}
          {this.empHandle(courseInfo.courseName)}
        </Text>

        <Text style={this.styles.container}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit
        </Text>

        <Text style={(this.styles.container, this.styles.blue)}>Footer</Text>
      </View>
    )
  }
}

export default CourseCard
