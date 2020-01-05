import React, {Component, createContext} from 'react';

export const TeacherContext = createContext();
class TeacherContextProvider extends Component {
    state = {
        teachers: [{name: 'tom'}]
    };
    setTeachers = (teachers) => {
        this.setState({
            teachers: teachers
        })
    };
    render() {
        return (
            <TeacherContext.Provider value={{...this.state, setTeachers: this.setTeachers}}>
                {this.props.children}
            </TeacherContext.Provider>
        );
    }
}

export default TeacherContextProvider;
