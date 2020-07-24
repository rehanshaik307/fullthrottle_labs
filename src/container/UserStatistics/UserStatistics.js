import React, { Component } from 'react';
import axios from 'axios';

import './UserStatistics.css';
import Users from '../../components/Users/Users';
import TimeRange from '../../components/Modals/TimeRange/TimeRange';
import Calendar from '../../components/Modals/Calendar/Calendar';


class UserStatistics extends Component { 
    
    constructor(props) {
      super(props);
      this.state = {
        users: [],
        activityPeriods:[],
        timeRanges:[],
        show:false,
        showCalendar: false               
      }
    }

    componentDidMount() {
      this.getUsers();
    }

    getUsers = async () => {      
	//   let res = await axios.get('https://24468394-df35-4497-bd2d-43aa1611aa6d.mock.pstmn.io/users'); 
	let res = await axios.get('https://69d3ac0e-c297-41dd-97a9-67e4130e8ede.mock.pstmn.io/stats');
    await this.setState({users: res.data.members});         
    }

    getDateTime = (id) => {        
        this.setState({show: true});
        let usersData = [...this.state.users]; 
        let dateTime = usersData.filter(td => td.id === id )
                        .map(period =>  period.activity_periods);
        
        this.setState({activityPeriods: dateTime});        
    }

    closeTimeRangeModal = () => {
        this.setState({show: false});
    }

    openCalendarModal = () => {
        this.setState({showCalendar: true});
    }

    closeCalendarModal = () => {
        this.setState({showCalendar: false});              
    }
    
    render(){


        let usersData = [...this.state.users];                
        let usernames = usersData.map( user => (
            <div className="flex-item center" key={user.id} onClick={() => this.getDateTime(user.id)}><p>{user.real_name}</p></div>            
        ))         
        
        // Code for Time Range
        let activityPeriodsArr = [...this.state.activityPeriods];
        let displayDateTime = activityPeriodsArr.map(datetime => {                 
            return (datetime)
                .map((val, index) => {
                    return(
                        <div className="modal-data-flex" key={index}>
                            <p>{val.start_time.slice(0,-7)}</p>
                            <div>
                                <p>{val.start_time.slice(-7)} - {val.end_time.slice(-7)}</p>
                            </div>                    
                        </div>
                    )
                })
        });


    return (
        <div className="center">
            <h1 id="main-heading">User Statistics</h1>            
                <Users usernames = {usernames}/>                 
                <TimeRange 
                    show = {this.state.show} 
                    closeTimeRange = {this.closeTimeRangeModal}
                    openCalendar = {this.openCalendarModal}
                    displayDateTime = {displayDateTime}/>   
                <Calendar 
                    show = {this.state.showCalendar}
                    activityPeriods = {this.state.activityPeriods}
                    closeCalendar = {this.closeCalendarModal}
                    hideMainCal = {() => this.hideMainCal()}
                />                
        </div>        
      )
    }
   
}

export default UserStatistics;




