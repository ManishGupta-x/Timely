import React, { useState } from "react";
import styles from "./AddSchedule.module.css";
import { Link,useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { GrFormSchedule } from "react-icons/gr";
import { AiOutlineSchedule } from "react-icons/ai";
import { LiaTasksSolid } from "react-icons/lia";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBusinessTime } from "react-icons/fa";
import { Day } from "@syncfusion/ej2-react-schedule";

export const AddSchedule = () => {

  const navigate = useNavigate();
  const [No_of_tasks, setNo_of_tasks] = useState("");

  const currentDate = new Date(); // Create a new Date object with the current date and time
  const formattedDate = currentDate.toLocaleDateString("en-GB");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const handleDifficultyChange = (event) => {
    setSelectedDifficulty(event.target.value);
  };
  const mapBehaviourToValue = {
    Lazy: 1,
    "Moderately Lazy": 2,
    "Moderately Hardworking": 3,
    Hardworking: 4,
  };

  function getRandomHexColor() {
    let hexColor;
    do {
      // Generate a random integer between 0 and 16777215 (0xffffff in hexadecimal)
      hexColor =
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0");
    } while (hexColor === "#ffffff"); // Ensure it's not white
    return hexColor;
  }

  const notify = (message) => {
    toast.error(message, {
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
  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    const date = new Date(`${year}-${month}-${day}`);
    const isoDateString = date.toISOString();
    return isoDateString;
  };
  const [Errors, setErrors] = useState(true);


  const submitForm = async (values) => {
    values.starts_on = formatDate(values.starts_on);
    values.schedule_color = getRandomHexColor();
    const token = localStorage.getItem("token");
    
    
    const fetchUrl = "https://timely-qpcg.onrender.com/api/schedules";
    try {
      const response = await fetch(fetchUrl, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
        body: JSON.stringify(values),
      });
      
      if (!response.ok) {
        throw new Error("Failed To Submit");
      }
  
      const data = await response.json();
      if (!data.error) {
        console.log("data", data); 
        setNo_of_tasks(values.no_of_tasks);
        navigate("/home/schedules");
      
      }
      return data.error;
    } catch (error) {
      console.log("error", error);
      console.log("Error Submitting");
    }
  };
  
  const validate = (values) => {
    let errors = {};

    if (!values.name) {
      errors.name = "Schedule Name Required";
    }
    if (!values.duration) {
      errors.duration = "Duration Required";
    }
    if (!values.longest_sitting_time) {
      errors.longest_sitting_time = "Longest Sitting Time required";
    }
    if (!values.no_of_tasks) {
      errors.no_of_tasks = "No of Tasks Required";
    }
    if (!values.behaviour) {
      errors.behaviour = "Select Your Personality";
    }

    if (!values.starts_on) {
      errors.starts_on = "Start Date Of Schedule is Required";
    } else if (!/^\d{2}\/\d{2}\/\d{4}$/i.test(values.starts_on)) {
      errors.starts_on = "Type Start Date in DD/MM/YYYY";
    } else {
      const [day, month, year] = values.starts_on.split("/");
      const currentMonth = currentDate.getMonth() + 1;
      const currentDay = currentDate.getDay();
      const currentYear = currentDate.getFullYear();
      if (
        currentYear > year ||
        (currentYear == year && currentMonth > month) ||
        (currentYear == year && currentMonth == month && currentDay > day)
      ) {
        errors.starts_on = "Invalid Date (Date must be in the future)";
      } else if (
        (month == 2 && day > 28) ||
        ([4, 6, 9, 11].includes(parseInt(month, 10)) && day > 30) ||
        day > 31
      ) {
        errors.starts_on =
          "Invalid Date (Day exceeds maximum for the given month)";
      }
    }
    
    return errors;
  };

  const handleInputChange = (event) => {
    setNo_of_tasks(event.target.value);
  };
  

  const Formik = useFormik({
    initialValues: {
      name: "",
      duration: "",
      no_of_tasks: "",
      longest_sitting_time: "",
      behaviour: "1",
      schedule_color: "#9292F0",
      starts_on: "",
      user_id:"1"
    },
    onSubmit: async (values) => {
      console.log(values);
    },
    validate,
  });

  // console.log(Formik.values);
  const checkForm = () => {
    try {
      Formik.errors.name
        ? notify(Formik.errors.name)
        : Formik.errors.duration
        ? notify(Formik.errors.duration)
        : Formik.errors.no_of_tasks
        ? notify(Formik.errors.no_of_tasks)
        : Formik.errors.longest_sitting_time
        ? notify(Formik.errors.longest_sitting_time)
        : Formik.errors.behaviour
        ? notify(Formik.errors.behaviour)
        : Formik.errors.starts_on
        ? notify(Formik.errors.starts_on)
        : console.log("Form Checked");
    } catch (error) {
      console.log("Error Checking Form:", error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <a className={styles.title} href="/home/schedules">
          Timely
        </a>
        <div className={styles.line}></div>
      </div>

      <div className={styles.content}>
        <div className={styles.wrapper}>
          <form onSubmit={Formik.handleSubmit}>
            <h1>ADD SCHEDULE</h1>
            <div className={styles.inputGroup}>
              <div className={styles.verticalInput}>
                <div className={styles.inputbox}>
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={Formik.values.name}
                    onChange={Formik.handleChange}
                  />
                  <AiOutlineSchedule className={styles.icon} />
                </div>
                <div className={styles.inputbox}>
                  <input
                    type="text"
                    placeholder="Duration in Days"
                    name="duration"
                    value={Formik.values.duration}
                    onChange={Formik.handleChange}
                  />
                  <GrFormSchedule className={styles.icon} />
                </div>
                <div className={styles.inputbox}>
                  <input
                    type="text"
                    placeholder="No of Tasks"
                    name="no_of_tasks"
                    value={Formik.values.no_of_tasks}
                    onChange={Formik.handleChange}
                  />
                  <LiaTasksSolid className={styles.icon} />
                </div>
              </div>
              <div className={styles.verticalInput}>
                <div className={styles.inputbox}>
                  <input
                    type="text"
                    placeholder="Longest Sitting Time"
                    name="longest_sitting_time"
                    onChange={Formik.handleChange}
                    value={Formik.values.longest_sitting_time}
                  />
                  <FaBusinessTime className={styles.icon} />
                </div>
                <div className={styles.inputbox}>
                  <select
                    name="behaviour"
                    value={Formik.values.behaviour}
                    className={`${styles.menu} ${styles.selectDropdown}`}
                    onChange={Formik.handleChange}
                  >
                    <option value="" disabled hidden>
                      Select your Personality
                    </option>
                    <option value="1">Lazy</option>
                    <option value="2">Moderately Lazy</option>
                    <option value="3">Moderately Hardworking</option>
                    <option value="4">Hardworking</option>
                  </select>
                </div>
                <div className={styles.inputbox}>
                  <input
                    type="text"
                    placeholder="Start Date"
                    name="starts_on"
                    value={Formik.values.starts_on}
                    onChange={Formik.handleChange}
                  />
                  <FaBusinessTime className={styles.icon} />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className={styles.button}
              onClick={async () => {
                checkForm();
                setErrors(submitForm(Formik.values));
              }}
            >
              ADD
            </button>
            <div className={styles.register}>
              <p>
                <Link to="/home/schedules" className={styles.registerlink}>
                  Go Back {" > "}
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer autoClose={2000} limit={1} />
    </div>
  );
};

export const No_of_tasks = "";

