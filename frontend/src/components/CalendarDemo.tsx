import './CalendarDemo.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';


export default function CalendarDemo() {


    return (

        <article className={"cuadro"}>

        <LocalizationProvider
            dateAdapter={AdapterDayjs}
            localeText={{
            calendarWeekNumberHeaderText: '#',
            calendarWeekNumberText: (weekNumber) => `${weekNumber}.`,
        }}
            >
            <DateCalendar displayWeekNumber />
        </LocalizationProvider>
        </article>
    );
}
