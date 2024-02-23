import React, { useState } from "react";
import styles from "./Signin.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../../components/Loadingstate";

export const Signin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // State for loading indicator

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

  const submitForm = async (values) => {
    try {
      setLoading(true); // Set loading state to true when submitting form

      const response = await fetch(`https://timely-qpcg.onrender.com/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed To Submit');
      }

      const data = await response.json();

      if (!data.error) {
        const token = data.data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('email', values.email);
        navigate("/home");
      } else {
        notify(data.error_message);
      }

      setLoading(false); // Set loading state to false after receiving response
    } catch (error) {
      console.log('Error Submitting', error);
      setLoading(false); // Set loading state to false if an error occurs
    }
  };

  const validate = (values) => {
    let errors = {};
    if (!values.email) {
      errors.email = "Email Required";
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Invalid Email";
    }

    if (!values.password) {
      errors.password = "Password Required";
    }

    return errors;
  };

  const Formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: submitForm,
    validate,
  });

  return (
    <div className={styles.container}>
      <div>
        <h1>
          <Link to="/" className={styles.logo}>
            <img src='https://imgur.com/m3Vpsos.png' className="w-12 h-12"/><span className="font-garamond font-serif text-3xl mt-1 pl-2">Timely</span>
          </Link>
        </h1>
      </div>
      <div className={styles.content}>
        <div className={styles.wrapper}>
          <form onSubmit={Formik.handleSubmit}>
            <h1>LOG IN</h1>
            <div className={styles.inputbox}>
              <input
                type="text"
                placeholder="Email"
                name="email"
                onChange={Formik.handleChange}
                value={Formik.values.email}
              />
              <FaUser className={styles.icon} />
            </div>

            <div className={styles.inputbox}>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={Formik.handleChange}
                value={Formik.values.password}
              />
              <FaLock className={styles.icon} />
            </div>

            <div className={styles.remember}>
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <Link to="#" className={styles.forgot}>
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className={styles.button}>
              {loading ? <Loading /> : "Login"}
            </button>

            <div className={styles.register}>
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className={styles.registerlink}>
                  Register
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
