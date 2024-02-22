import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
} from "@syncfusion/ej2-react-grids";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Header } from "../components";
import { No_of_tasks } from "../Credentials/pages/Forms/AddSchedule";

export const Schedules = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const [id, setId] = useState(0);
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserData(email);
        setId(userData.user_id);

        const token = localStorage.getItem("token");
        const fetchUrl = `https://timely-qpcg.onrender.com/api/schedules/${userData.user_id}`;
        console.log("user id ", id);
        const response = await fetch(fetchUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        });
        if (!response.ok) {
          console.log("Error in getting data");
          return;
        }
        const responseData = await response.json();
        const scheduleD = await Promise.all(
          responseData.data.map(async (item) => ({
            TaskADD: No_of_tasks,
            Name: item.name.charAt(0).toUpperCase() + item.name.slice(1), // Capitalize first letter
            Duration: item.duration,
            starts_on: item.starts_on.slice(0, 10),
            Button: !item.has_timetable,
            Image: await fetchAvatar(item.name),
            SchdeuleID: item.schedule_id,
          }))
        );
        setScheduleData(scheduleD);
      } catch (error) {
        console.error("Error fetching schedule data:", error);
      }
    };

    fetchData();
  }, [email]); // Included email in dependency array to re-run effect when it changes

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

  async function fetchAvatar(name) {
    try {
      const response = await fetch(
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          name
        )}&background=random&color=random`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const imageUrl = response.url;
      return imageUrl;
    } catch (error) {
      console.error("Error fetching avatar:", error.message);
      return null;
    }
  }

  const gridScheduleProfile = (props) => (
    <div className="flex items-center gap-4">
      <img
        className="rounded-full w-10 h-10"
        src={props.Image}
        alt="schedule"
      />
      <p>{props.Name}</p>
    </div>
  );
 
  const gridTimeTableButton = (props) => (
    <div>
      <Link to = {`/home/Time Tables/calendar/${props.SchdeuleID}`}>
      {props.Button ? (
        <button className="bg-orange-500 hover:bg-orange-700 text-white  py-2 px-4 rounded"  >
          Create
        </button>
      ) : (
        <p className="text-red-500">Already Exist</p>
      )}
      </Link>
      
    </div>
  );

  const gridAddTaskButton = (props) => (
    <Link to = {`/taskadd/${props.SchdeuleID}`}>
      <button className="bg-orange-500 hover:bg-orange-700 text-white  py-2 px-4 rounded">
        Add Task
      </button>
    </Link>
  );

  const scheduleGrid = [
    {
      headerText: "Schedule Name",
      width: "150",
      template: gridScheduleProfile,
      textAlign: "Center",
    },
    { field: "Name", headerText: "", width: "0", textAlign: "Center" },
    {
      field: "Duration",
      headerText: "Duration (Days)",
      width: "170",
      textAlign: "Center",
    },
    {
      field: "starts_on",
      headerText: "Start Date",
      width: "120",
      textAlign: "Center",
    },
    {
      field: "task_count",
      headerText: "Tasks Available",
      width: "120",
      textAlign: "Center",
    },
    {
      field: "Button",
      headerText: "Time Table",
      width: "135",
      textAlign: "Center",
      template: gridTimeTableButton,
    },
    {
      field: "TaskADD",
      headerText: "Task ADD",
      width: "125",
      textAlign: "Center",
      template: gridAddTaskButton,
    },
  ];
  const toolbarOptions = ["Search"];
  const editing = { allowDeleting: true, allowEditing: true };

  const handleRowSelected = (args) => {
	const scheduleId = args.data.SchdeuleID;
	const targetElement = args.event ? args.event.target : null;
	
	// Check if the click was on a button
	if (targetElement && targetElement.tagName === 'BUTTON') {
      console.log(targetElement);
	} else {
	  console.log("Navigating to Tasks off", scheduleId);
	  navigate(`/home/tasks/${scheduleId}`);
	}
     };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-slate-50 rounded-3xl">
      <div className="flex justify-between">
        <Header category="Page" title="Schedules" />
        <button type="submit">
          <Link
            to="/scheduleadd"
            className="bg-[#FB6A64] hover:bg-[#C6372A] text-white font-bold rounded mb-4 p-2 pl-4 pr-4"
          >
            ADD +
          </Link>
        </button>
      </div>

      <GridComponent
        dataSource={scheduleData}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
        rowSelected={handleRowSelected}
      >
        <ColumnsDirective>
          {scheduleGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Search, Page]} />
      </GridComponent>
    </div>
  );
};
export default Schedules;
