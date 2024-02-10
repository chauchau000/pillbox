import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { startOfMonth, lastDayOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, addMonths, subMonths, isSameDay } from 'date-fns'
import './Calendar.css'
import EditApptModal from '../EditApptModal/EditApptModal';
import OpenModalButton from '../OpenModalButton/OpenModalButton';

const WEEKDAYS = [
    "Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"
]


function Calendar() {
    const userAppointmentsData = useSelector(state => state.session.appointments);

    const apptArray = userAppointmentsData?.map((a) => {
        return {
            ...a,
            dateObj: new Date(a.date + "T" + a.time)
        }
    })

    const [currentDate, setCurrentDate] = useState(new Date())

    const firstDateOfMonth = startOfMonth(currentDate)
    const lastDateOfMonth = lastDayOfMonth(currentDate)

    const firstDay = startOfWeek(firstDateOfMonth)
    const lastDay = endOfWeek(lastDateOfMonth)

    const totalDates = eachDayOfInterval({ start: firstDay, end: lastDay })

    const getRow = (key) => {
        if (0 > key && key <=6 ) {
            return "top-row"
        } else if (key > 28 && key <= 34) {
            return "bottom-row"
        } else if (key % 7 === 0) {
            return "left-column"
        } else if (key % 7 === 6) {
            return "right-column"
        }
    }
    return (
        <div id='whole-calendar-container'>
            <div id="calendar-header">
                <span className="material-symbols-outlined calendar-arrows" onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
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
            
            <div id = {totalDates.length <= 35 ? "calendar-grid-5" : "calendar-grid-6"}>
                {totalDates?.map((day, key) => (
                    <div className={day.getMonth() === currentDate.getMonth() ? "calendar-single-day same-month" : "calendar-single-day diff-month"}
                        key={key}
                        id={totalDates.length <= 35 ? `dayidx-${key}-5` : `dayidx-${key}-6`}
                        >
                        {day.getDate()}
                        {apptArray?.map((a, key) => (
                            <>
                                {isSameDay(a.dateObj, day) &&
                                    <OpenModalButton modalComponent={<EditApptModal appt={a} />}
                                        buttonHTML={
                                            <div className="appt-div">
                                                <p>{a.provider.name.split(' ')[0][0]}. {a.provider.name.split(' ')[1]}</p>
                                                <p>{format(a.dateObj, "h:mm aaa")}</p>
                                            </div>
                                        }
                                        className='calendar-appt-edit'
                                        key={key}
                                    />
                                }
                            </>
                        ))}
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Calendar