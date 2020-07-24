import React from 'react';
import './TimeRange.css';

function TimeRange(props) {            
    
    return(
        <div className="modal" 
            style={{                
                transform: props.show ? 'translateY(0)' : 'translateY(-150vh)'
            }}>
            <div id="modal-heading">
                <p>Activity Periods</p>
                <button onClick={props.openCalendar} className="calendar-btn">View Calendar</button>                
                <button onClick={props.closeTimeRange} className="close">x</button>
            </div>  
            {props.displayDateTime}         
        </div> 
    )
}

export default TimeRange;