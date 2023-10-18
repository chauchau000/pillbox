import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { startOfMonth, lastDayOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, addMonths, subMonths, isSameDay} from 'date-fns'
import './Calendar.css'

const WEEKDAYS = [
    "Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"
]


function Calendar() {
    const userAppointmentsData = useSelector(state => state.session.appointments);

    const apptArray = userAppointmentsData.map ( (a) => {
        return {
            ...a, 
            date: new Date(a.date +"T"+ a.time)
        }
    })

    const [currentDate, setCurrentDate] = useState(new Date())

    const firstDateOfMonth = startOfMonth(currentDate)
    const lastDateOfMonth = lastDayOfMonth(currentDate)

    const firstDay = startOfWeek(firstDateOfMonth)
    const lastDay = endOfWeek(lastDateOfMonth)

    const totalDates = eachDayOfInterval({ start: firstDay, end: lastDay })

    return (
        <div id='whole-calendar-container'>
            <div id="calendar-header">
                <span className="material-symbols-outlined calendar-arrows"  onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
                    chevron_left
                </span>
                <div id="month-year">{format(currentDate, "MMM yyyy")}</div>
                <span className="material-symbols-outlined calendar-arrows" onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
                    chevron_right
                </span>
            </div>
            <div id="calendar-weekday-header-row">
                {WEEKDAYS.map((day, idx) => (
                    <div className="weekday-header" key={idx}>{day}</div>
                ))}
            </div>
            <div id="calendar-grid">
                {totalDates.map((day, key) => (
                    <div className={day.getMonth() === currentDate.getMonth() ? "calendar-single-day same-month" : "calendar-single-day diff-month"} key={key}>
                        {day.getDate()}
                        {apptArray.map( (a, key) => (
                            <>
                                {isSameDay(a.date, day) && <div className="appt-div">
                                    <p>{a.provider.name}</p>
                                    <p>{format(a.date, "h:mm aa")}</p>
                                    </div>}
                            </>
                        ))}
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Calendar