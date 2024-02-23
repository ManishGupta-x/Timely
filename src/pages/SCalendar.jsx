import React, { useEffect, useRef, useState } from "react";
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
import { Header } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loadingstate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PropertyPane = (props) => <div className="mt-5">{props.children}</div>;

export const SCalendar = () => {
  const [timetableData, settimetableData] = useState("");
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  const [id, setId] = useState(0);
  const { scheduleId } = useParams();
  const [loading, setLoading] = useState(true); // State for loading indicator
  const navigate = useNavigate();

  const notify = (error) => {
    // Toast notification function
    toast.error(error, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetchUserData(email);

      const values = {
        schedule_id: scheduleId,
        user_id: userData.user_id,
      };
      const fetchUrl = `https://timely-qpcg.onrender.com/api/timetables/`;
      const response = await fetch(fetchUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        if (response.status === 500) {
          setLoading(false);
          notify("Sorry ! Not Able to Generate Calendar")
          navigate("/home/Time Tables");
        } else {
          throw new Error("Failed To Submit");
        }
        throw new Error("Failed to fetch user data");
      }
      const responseData = await response.json();
      setLoading(false);
      // console.log(responseData.data);
      settimetableData(
        responseData.data.timeslabs.map((timeslab) => ({
          Id: timeslab.id,
          Subject: timeslab.task_name,
          StartTime:
            timeslab.date.split("T")[0] + "T" + timeslab.start_time + "Z",
          EndTime: timeslab.date.split("T")[0] + "T" + timeslab.end_time + "Z",
          CategoryColor: timeslab.timeslab_color,
        }))
      );
    };

    fetchData();
  }, [email]);

  const fetchUserData = async (email) => {
    const url = "https://timely-qpcg.onrender.com/api/getuserbyemail";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const responseData = await response.json();
      console.log("User data:", responseData);

      if (responseData.error) {
        throw new Error(
          responseData.error_message || "Error fetching user data"
        );
      }

      return responseData.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  const scheduleObj = useRef(null);
  console.log("Time Table Data", timetableData);
  const eventSettings = { dataSource: timetableData };
  const change = (args) => {
    scheduleObj.current.selectedDate = args.value;
    scheduleObj.current.dataBind();
  };

  const onDragStop = (args) => {
    console.log("Drag stopped", args);
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
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-slate-100 rounded-3xl">
        <Header category="App" title="Calendar" />
        {loading ? (
          <Loading />
        ) : (
          <>
            <ScheduleComponent
              width="100%"
              height="550px"
              ref={scheduleObj}
              selectedDate={new Date(2024, 1, 23)}
              eventSettings={eventSettings}
              eventRendered={onEventRendered}
              dragStart={onDragStart}
              dragStop={onDragStop}
            >
              <ViewsDirective>
                {["Day", "Week", "WorkWeek", "Month", "Agenda"].map((item) => (
                  <ViewDirective key={item} option={item} />
                ))}
              </ViewsDirective>
              <Inject
                services={[
                  Day,
                  Week,
                  WorkWeek,
                  Month,
                  Agenda,
                  Resize,
                  DragAndDrop,
                ]}
              />
            </ScheduleComponent>

            <PropertyPane>
              <table style={{ width: "100%", background: "white" }}>
                <tbody>
                  <tr style={{ height: "50px" }}>
                    <td style={{ width: "100%" }}>
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
          </>
        )}
      </div>
      <ToastContainer autoClose={2000} limit={1} />
    </>
  );
};

export default SCalendar;
