import React, { useState } from "react";
import styles from "./Signin.module.css";
import { Link, redirect, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const Signin = () => {
  const navigate = useNavigate();

  const customId = "custom-id-yes";
  const notify = (error) => {
    toast.error(error, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      toastId: customId
    });
  };  

  const notifys = (msg) => {
    toast.success(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",

    });
  }

  const submitForm = async (values) => {
    

    try { 
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
      let data = await response.json();

      if (!data.error) {
       
        const token = await data.data.token;
        localStorage.setItem('token', token); 
        localStorage.setItem('email', values.email);
        if (localStorage.getItem('email')) {
          const email = localStorage.getItem('email');
          console.log('Email' , email)
        }
        if (localStorage.getItem('token')) {
          console.log('Token stored successfully:', token);
          navigate("/home")
        } else {
          console.error('Failed to store token');
        }
        notify(data.error_message);
        return data;
      }
      return data.error;
      
    } catch (error) {
      
      console.log('Error Submitting',error);
      
    }
  }
  const validate = (values) => {
    let errors = {};
    if (!values.email) {
      errors.email = "Email Required";
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid Email";
    }

    if (!values.password) {
      errors.password = "Password Required";
    }
    // } else if (!/(?=.*\d)(?=.*[a-zA-Z])(?=.*\W)/.test(values.password)) {
    //   errors.password = "Password must contain at least one number, one character, and one special character";
    // }

    return errors;
  };
  const Formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validate,
  });
  const [Errors, setErrors] = useState(false);

  const checkForm = () => {
    try {
     
         Formik.errors.email
        ? notify(Formik.errors.email)
        : Formik.errors.password
        ? notify(Formik.errors.password)
        : console.log('Form Checked');
    } catch (error) {
      console.log('Error Checking Form:', error);
    }
  }
  console.log("Formik", Formik.values);

  return (
    <div className={styles.container}>
      <div>
          <h1>
            <Link to="/" className={styles.logo}>
            <img src='../../assets/Images/quick.png' className="w-12 h-12"/><span className="font-garamond font-serif text-3xl mt-1 pl-2">Timely</span>
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
                {" "}
                Forgot Password?{" "}
              </Link>
            </div>

            <button
              type="submit"
              onClick={async () => {
                
                checkForm();
                setErrors(submitForm(Formik.values));

              } }
              className={styles.button}
            >
             Login
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
