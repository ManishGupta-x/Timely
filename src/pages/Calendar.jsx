import React, { useRef } from "react";
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Resize,
  DragAndDrop,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,

} from "@syncfusion/ej2-react-schedule";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { taskData } from "../data/dummy";
import { Header } from "../components";
const PropertyPane = (props) => <div className="mt-5">{props.children}</div>;

export const Calendar = () => {
  const scheduleObj = useRef(null);
  const eventSettings = { dataSource: taskData };
  const change = (args) => {
    scheduleObj.selectedDate = args.value;
    scheduleObj.dataBind();
  };
  const onDragStop = (args) => {
    
    
    console.log('Drag stopped', args);
  };
  
  const onEventRendered = (args) => {
    applyCategoryColor(args, scheduleObj.current.currentView);
  };
  const onDragStart = (arg) => {
    arg.navigation.enable = true;
  };

  const applyCategoryColor = (args, currentView) => {
    let categoryColor = args.data.CategoryColor;
    if (!args.element || !categoryColor) {
      return;
    }
    if (currentView === "Agenda") {
      args.element.firstChild.style.borderLeftColor = categoryColor;
    } else {
      args.element.style.backgroundColor = categoryColor;
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-slate-100 rounded-3xl">
      <Header category="App" title="Calendar" />
      <ScheduleComponent
        width="100%"
        height="550px"
        ref={scheduleObj}
        selectedDate={new Date(2021, 0, 10)}
        eventSettings={eventSettings}
        eventRendered={onEventRendered}
        dragStart={onDragStart}
        dragStop={onDragStop}
      >
        <ViewsDirective>
          { ['Day', 'Week', 'WorkWeek', 'Month', 'Agenda'].map((item) => <ViewDirective key={item} option={item} />)}
        </ViewsDirective>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
      </ScheduleComponent>

      <PropertyPane>
        <table
          style={{ width: '100%', background: 'white' }}
        >
          <tbody>
            <tr style={{ height: '50px' }}>
              <td style={{ width: '100%' }}>
                <DatePickerComponent
                  value={new Date(2024, 1, 23)}
                  showClearButton={false}
                  placeholder="Current Date"
                  floatLabelType="Always"
                  change={change}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </PropertyPane>
    </div>
  );
};

export default Calendar;
