import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ka";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import { Calendar } from "./components/DatePicker";
import { useState } from "react";

dayjs.extend(localeData);
dayjs.extend(weekday);

dayjs.locale("ka");

function App() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  return (
    <div className="App">
      <input defaultValue={selectedDate?.format("D MMMM, YYYY")} readOnly/>
      <Calendar
        defaultDate={dayjs().subtract(0, "year")}
        // maxDate={dayjs().subtract(18, "year")}
        onSubmit={(date: Dayjs) => {
          setSelectedDate(date);
        }}
        submitComponent={
          <button>SUBMIT DATE</button>
        }
      />
    </div>
  );
}

export default App;
