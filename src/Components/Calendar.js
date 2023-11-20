import React from "react";
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const events = [{ title: "Meeting", start: new Date() }];

function Calendars(props) {
  const [value, setValue] = useState(new Date());
  const events = [
    {
      title: "Meeting",
      start: new Date("October 14, 2023 21:52:34"),
      className: "bg-primary text-white",
    },
    {
      title: "Investment End",
      start: new Date("October 20, 2023 21:52:34"),
      className: "bg-secondary",
    },
  ];
  // function renderEventContent(eventInfo) {
  //   return (
  //     <>
  //       <b>{eventInfo.timeText}</b>
  //       <i>{eventInfo.event.title}</i>
  //     </>
  //   );
  // }
  const headerToolbar = {
    left: "prev,next",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
  };
  return (
    <div>
      <FullCalendar
        plugins={[
          interactionPlugin,
          dayGridPlugin,
          timeGridPlugin,
          listPlugin,
          bootstrap5Plugin,
        ]}
        initialView="dayGridMonth"
        events={events}
        // eventContent={renderEventContent}
        themeSystem="bootstrap5"
        headerToolbar={headerToolbar}
        navLinks={true}
        eventColor="white"
        height={450}
      />
    </div>
  );
}

export default Calendars;
