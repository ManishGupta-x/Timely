import React, { useState } from "react";
import styles from "./AddTask.module.css";
import { Link, useNavigate ,useParams} from "react-router-dom";
import { GrFormSchedule } from "react-icons/gr";
import { AiOutlineSchedule } from "react-icons/ai";
import { LiaTasksSolid } from "react-icons/lia";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBusinessTime } from "react-icons/fa";

export const AddTask = () => {
  const navigate = useNavigate();
  const { scheduleId } = useParams();
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

  const [Errors, setErrors] = useState(true);

  const submitForm = async (values) => {
    
    values.schedule_color = getRandomHexColor();
    values.schedule_id = scheduleId;
    const token = localStorage.getItem("token");

    const fetchUrl = "https://timely-qpcg.onrender.com/api/tasks";
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
      errors.name = "Task Name Required";
    }
    if (!values.difficulty) {
      errors.difficulty = "Select Task Difficulty";
    }
    
    if (!values.priority) {
      errors.behaviour = "Select Task Priority";
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



  const Formik = useFormik({
    initialValues: {
      schedule_id: "",
      name: "",
      difficulty: "",
      priority: "",
      no_of_revisions: "1",
    },
    onSubmit: async (values) => {
      console.log(values);
    },
    validate,
  });

  const checkForm = () => {
    try {
      Formik.errors.name
        ? notify(Formik.errors.name)
        : Formik.errors.difficulty
        ? notify(Formik.errors.difficulty)
        : Formik.errors.priority
        ? notify(Formik.errors.priority)
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
            <h1>ADD TASK</h1>

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
              <select
                name="difficulty"
                value={Formik.values.difficulty}
                className={`${styles.menu} ${styles.selectDropdown}`}
                onChange={Formik.handleChange}
              >
                <option value="" disabled hidden>
                  Select task Difficulty
                </option>
                <option value="1">Low</option>
                <option value="2">Medium</option>
                <option value="3">High</option>
              </select>
            </div>
            <div className={styles.inputbox}>
              <select
                name="priority"
                value={Formik.values.priority}
                className={`${styles.menu} ${styles.selectDropdown}`}
                onChange={Formik.handleChange}
              >
                <option value="" disabled hidden>
                  Select task Priority
                </option>
                <option value="1">Low</option>
                <option value="2">Medium</option>
                <option value="3">High</option>
              </select>
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
export default AddTask;

export const No_of_tasks = "";
