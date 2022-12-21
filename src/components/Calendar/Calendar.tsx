import React, { useEffect, useState } from "react";
import styles from "./Calendar.module.css";

const msPerDay = 24 * 60 * 60 * 1000;

const weekdays = ["mo", "tu", "we", "th", "fr", "sa", "su"];

const getMonthStart = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);

const getMongthEnd = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0);

const getDaysFromMonday = (date: Date) => {
  return (date.getDay() + 7 - 1) % 7;
};

export const Calendar = () => {
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [monthLength, setMonthLength] = useState(0);

  useEffect(() => {
    setMonthLength(getMongthEnd(calendarDate).getDate());
  }, [calendarDate]);
  return (
    <div className={styles.calendarRoot}>
      <div className={styles.calendarHeader}>
        <button
          onClick={() => {
            setCalendarDate(
              new Date(calendarDate.setMonth(calendarDate.getMonth() - 1))
            );
          }}
        >
          {"<"}
        </button>
        <span>
          {calendarDate.toLocaleString("us-en", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button
          onClick={() => {
            setCalendarDate(
              new Date(calendarDate.setMonth(calendarDate.getMonth() + 1))
            );
          }}
        >
          {">"}
        </button>
      </div>
      <div className={styles.calendarBody}>
        <ul className={styles.calendarWeekdays}>
          {weekdays.map((weekday) => (
            <li key={weekday} className={styles.weekdayBox}>
              {weekday}
            </li>
          ))}
        </ul>
        <ul className={styles.calendarDays}>
          {Array.from(Array(monthLength)).map((_, i) => (
            <li
              key={i}
              className={styles.dayBox}
              style={{
                gridColumnStart:
                  i === 0
                    ? getDaysFromMonday(getMonthStart(calendarDate)) + 1
                    : 0,
              }}
            >
              {i + 1}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
