
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

class CourseCard extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            course_info: this.props.course_info
        };
    }
    
    styles = StyleSheet.create({
        titleText: {
          fontSize: 20,
          fontWeight: "bold"
        },

        card: {
            backgroundColor: 'rgba(0,0,0,0.2)',
            width: "50%"
        },
        container: {
            padding: "0.01em 16px"
        },
        blue: {
            color: "white",
            backgroundColor: "#2196F3",
        }

    });

    empHandle = (text) => {
        return text == null ? "Content missing" : text;
    }
    render(){
        return(
            <View style={this.styles.card}>
                <Text style={this.styles.container, this.styles.blue}>
                {this.state.course_info.departmentAcronym}  {this.state.course_info.courseNumber}: {this.empHandle(this.state.course_info.courseName)}
                </Text>

                <Text style={this.styles.container}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit
                </Text>

                <Text style={this.styles.container, this.styles.blue}>
                    Footer
                </Text>
            </View>
        );
    }
}

export default CourseCard;