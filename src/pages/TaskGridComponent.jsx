import React, { useState, useEffect } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Search,
  Page,
} from "@syncfusion/ej2-react-grids";
import { Link, useParams } from "react-router-dom";
import { Header } from "../components";

const TaskGridComponent = () => {
  const { scheduleId } = useParams();
  console.log("ID",scheduleId);
  const [tasksData, setTasksData] = useState([]);
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
        alt="task"
      />
      
      <p>{props.Name}</p>
    </div>
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://timely-qpcg.onrender.com/api/tasks/${scheduleId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        // console.log("Task Data", data.data.tasks);

        // Constructing objects properly
        const taskData = await Promise.all(data.data.tasks.map(async (item) => {
          const imageUrl = await fetchAvatar(item.name);
          return {
            Name: item.name,
            Duration: item.estimated_length,
            Difficulty: item.difficulty,
            Priority: item.priority,
            Image: imageUrl,
          };
        }));
        console.log(taskData);
        setTasksData(taskData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, [scheduleId]);

  const TimetableGrid = [
    {
      
      headerText: "Task Name",
      width: "100",
      template: gridScheduleProfile,
      textAlign: "Center",
    },
    {
      field: "Duration",
      headerText: "Duration",
      width: "170",
      textAlign: "Center",
    },
    {
      field: "Difficulty",
      headerText: "Difficulty",
      width: "120",
      textAlign: "Center",
    },
    {
      field: "Priority",
      headerText: "Priority",
      width: "120",
      textAlign: "Center",
    },
  ];

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-slate-50 rounded-3xl">
      <div className="flex justify-between">
        <Header category="Page" title="Tasks" />
        <button type="submit">
          <Link
            to={`/taskadd/${scheduleId}`}
            className="bg-[#FB6A64] hover:bg-[#C6372A] text-white font-bold rounded mb-4 p-2 pl-4 pr-4"
          >
            ADD +
          </Link>
        </button>
      </div>
      <GridComponent
        dataSource={tasksData}
        allowPaging={true}
        pageSettings={{ pageCount: 5 }}
      >
        <ColumnsDirective>
          {TimetableGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Search, Page]} />
      </GridComponent>
    </div>
  );
};

export default TaskGridComponent;
