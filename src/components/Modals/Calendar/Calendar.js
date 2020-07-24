import React from 'react';
import './Calendar.css';

function Calendar(props) {

    let numOfCalDivTags = [];

    for (let i = 1; i <=1440; i++) {        
        numOfCalDivTags.push(i);
    }

    let calendarAllItems;
    const createDivElements = (este) => {        
        calendarAllItems = numOfCalDivTags.map((disp, index) => {               
            return <div className="cal-disp" id={`${este+'-'+index}`} key={index+1}></div>
        })        
    }

    const getStartEndDivIds = (time) => {

        let hour, min, startDivNum, endDivNum;
        hour = parseInt(time.slice(0,2));
        min = parseInt(time.slice(3,5));

        if(time.slice(-2) === 'AM') {
            startDivNum = (hour*60) + min;
            return startDivNum;
        }
        if (time.slice(-2) === 'PM') {
            if (hour === 12) {
                hour = 0;
            }            
            endDivNum = 720 + (hour * 60) + min;
            return endDivNum;
        }

    } 

    
    let numerOfCalendarDivs = props.activityPeriods.map((period) => {
        let firstDiv, lastDiv, title;
        return (period)
            .map( (p, index) => {                                      

                // Creating divs
                createDivElements(index+1); 
                                 
                firstDiv = getStartEndDivIds(p.start_time.slice(-7));
                lastDiv = getStartEndDivIds(p.end_time.slice(-7));
                title = p.start_time.slice(-7) +'-'+ p.end_time.slice(-7);

                let i = firstDiv;
                while (i <= lastDiv) {
                    let calDispDiv = document.getElementById(index+1+'-'+i);                     
                    if (calDispDiv != null) {
                        calDispDiv.classList.add('violet');
                        calDispDiv.setAttribute('title', title);
                    }                                      
                    i++;
                }
                
                return(
                    <div className="calendar-flex-item" id={`${'disp-date-'+index}`} key={index}>
                        <div><p>{p.start_time.slice(0, -8)}</p></div>
                        {calendarAllItems}
                    </div>
                )
            });
    })
    
    return (

        <div id="calendar"
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-150vh)'
            }}>
            <button onClick={props.closeCalendar} className="close-cal-btn">Close</button>                        
            <div className="display-calendar">
                {numerOfCalendarDivs}
            </div>
        </div>        
    )
}

export default Calendar;