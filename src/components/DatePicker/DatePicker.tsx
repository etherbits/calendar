import React, { useState } from "react";
import styles from "./DatePicker.module.css";
import { Dayjs } from "dayjs";
import "dayjs/locale/ka";
import { motion } from "framer-motion";
import { DaysView } from "../DaysView";
import { MonthsView } from "../MonthsView";
import { YearsView } from "../YearsView";

interface Props {
  maxDate?: Dayjs;
  defaultDate: Dayjs;
  submitComponent?: React.ReactElement;
  onSubmit?: (arg0: Dayjs) => void;
}

enum VIEW {
  DAYS,
  MONTHS,
  YEARS,
}

export const Calendar: React.FC<Props> = ({
  maxDate,
  defaultDate,
  submitComponent,
  onSubmit,
}) => {
  const [calendarDate, setCalendarDate] = useState<Dayjs>(defaultDate);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [viewIndex, setViewIndex] = useState<VIEW>(VIEW.DAYS);

  const changeView = (change: number) => {
    const newViewIndex = viewIndex + change;

    if (newViewIndex > VIEW.YEARS || newViewIndex < 0) return;
    setViewIndex(newViewIndex);
  };

  const handleDateSelect = (date: Dayjs) => {
    if (maxDate && date.isAfter(maxDate)) {
      return;
    }

    setSelectedDate(date);
  };

  const handleMonthSelect = (i: number) => {
    changeView(-1);
    setCalendarDate(calendarDate.set("month", i));
  };

  const handleYearSelect = (year: number) => {
    changeView(-1);
    setCalendarDate(calendarDate.set("year", year));
  };

  const handleSubmit = () => {
    if (!onSubmit || !selectedDate) return;

    onSubmit(selectedDate);
  };

  const handleArrow = (viewIndex: VIEW, val: -1 | 1) => {
    switch (viewIndex) {
      case VIEW.DAYS:
        setCalendarDate(calendarDate.add(val, "month"));
        break;
      case VIEW.MONTHS:
        setCalendarDate(calendarDate.add(val, "year"));
        break;
      case VIEW.YEARS:
        setCalendarDate(calendarDate.add(val * 20, "year"));
        break;
    }
  };

  const ViewHead = {
    0: calendarDate.format("MMMM, YYYY"),
    1: calendarDate.format("YYYY"),
    2: `${Math.floor(calendarDate.get("year") / 10)}0-${
      Math.floor(calendarDate.get("year") / 10) + 2
    }0`,
  };

  const ViewBody = {
    0: (
      <DaysView
        selectedDate={selectedDate}
        calendarDate={calendarDate}
        maxDate={maxDate}
        handleDateSelect={handleDateSelect}
      />
    ),
    1: (
      <MonthsView
        selectedDate={selectedDate}
        calendarDate={calendarDate}
        handleMonthSelect={handleMonthSelect}
      />
    ),
    2: (
      <YearsView
        selectedDate={selectedDate}
        calendarDate={calendarDate}
        handleYearSelect={handleYearSelect}
      />
    ),
  };

  return (
    <motion.div layout className={styles.calendarRoot}>
      <div className={styles.calendarHeader}>
        <button
          className={styles.monthButton}
          onClick={() => {
            handleArrow(viewIndex, -1);
          }}
        >
          <img src="/icons/chevron-left.svg" />
        </button>
        <motion.button
          className={styles.currentMonth}
          disabled={viewIndex >= VIEW.YEARS}
          whileHover={
            viewIndex >= VIEW.YEARS ? {} : { backgroundColor: "#f1f1f1" }
          }
          onClick={() => changeView(+1)}
        >
          {ViewHead[viewIndex]}
        </motion.button>
        <button
          className={styles.monthButton}
          onClick={() => {
            handleArrow(viewIndex, 1);
          }}
        >
          <img src="/icons/chevron-right.svg" />
        </button>
      </div>
      <div className={styles.calendarBody}>{ViewBody[viewIndex]}</div>
      {submitComponent && (
        <div className={styles.submitButton} onClick={handleSubmit}>
          {submitComponent}
        </div>
      )}
    </motion.div>
  );
};
