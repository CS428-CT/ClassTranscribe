
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

        w3_card_4: {
            backgroundColor: 'rgba(0,0,0,0.2)',
            width: "50%"
        },
        w3_container: {
            padding: "0.01em 16px"
        },
        w3_blue: {
            color: "white",
            backgroundColor: "#2196F3",
        }

    });

    empHandle = (text) => {
        return text == null ? "Content missing" : text;
    }
    render(){
        return(
            <View style={this.styles.w3_card_4}>
                <Text style={this.styles.w3_container, this.styles.w3_blue}>
                {this.state.course_info.departmentAcronym}  {this.state.course_info.courseNumber}: {this.empHandle(this.state.course_info.courseName)}
                </Text>

                <Text style={this.styles.w3_container}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Text>

                <Text style={this.styles.w3_container, this.styles.w3_blue}>
                    Footer
                </Text>
            </View>
        );
    }
}

export default CourseCard;