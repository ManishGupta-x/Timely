import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';
import { getScheduleData } from "./data";
import { useEffect, useState } from 'react';

export const TimeTable = () => {
  const toolbarOptions = ['Search'];
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const scheduleData = await getScheduleData();
        const tableD = await Promise.all(
          scheduleData
            .filter(item => item.has_timetable === true)
            .map(async (item) => ({
              Name: item.name.charAt(0).toUpperCase() + item.name.slice(1), // Capitalize first letter
              Duration: item.duration,
              starts_on: item.starts_on.slice(0, 10),
              Image: await fetchAvatar(item.name),
              SchdeuleID: item.schedule_id,
            }))
        );
        setTableData(tableD);
        console.log("TT data:", tableD); // Log tableD after setting state
      } catch (error) {
        console.error('Error fetching schedule data:', error);
      }
    };

    fetchData();
  }, []);

  const fetchAvatar = async (name) => {
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
  };

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

  const TimetableGrid = [
    {
      headerText: "Time Table Name",
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
  ];

  const editing = { allowDeleting: true, allowEditing: true };
	const handleRowSelected = (args) => {
    const scheduleId = args.data.SchdeuleID;
		// navigate(`/home/calendar/${scheduleId}`);
	};
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-slate-50 rounded-3xl">
      <Header category="Page" title="Time Tables" />
      
      <GridComponent
        dataSource={tableData}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
				rowSelected={handleRowSelected}
      >
        <ColumnsDirective>
          {TimetableGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Search, Page]} />
      </GridComponent>
    </div>
  );
};

export default TimeTable;
