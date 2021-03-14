import React, { Component } from 'react';
import { Text, FlatList, View } from 'react-native';
import { getStarredOfferings, getOfferingData, getStarredOfferingsData } from '../../api/offerings';
import CourseCard from '../../components/Cards/CourseCard';
class Home extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
           courses: null
        };
    }
    fetchCourseInfo(){
        console.log("Updateing: ", this.state)
        getStarredOfferingsData()
        .then(function(response){console.log(response); return response;})
           .then(data => this.setState({courses: data}))
    }

    componentDidMount() {
        this.fetchCourseInfo()
    }

    renderCourseItem = ({item}) => {
        return (
            <View>
                {/* <Text>{item.courses[0].courseId}</Text>
                <Text>{item.courses[0].courseName}</Text>
                <Text>{item.courses[0].departmentAcronym} {item.courses[0].courseNumber}</Text> */}
                <CourseCard course_info={item.courses[0]}/>
            </View>);
    }

    renderSeparator = () => {
        return (
          <View
            style={{
              height: 2,
              width: "100%",
              backgroundColor: "#CED0CD",
            }}
          />
        );
    };

    render() {
        console.log()
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                { this.state.courses != null &&
                    <FlatList
                        data={this.state.courses}
                        renderItem={this.renderCourseItem}
                        ItemSeparatorComponent={this.renderSeparator}
                    />
                }
            </View>
        );
    }
}

export default Home;
