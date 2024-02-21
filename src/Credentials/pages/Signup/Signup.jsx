import React, { useState } from "react";
import { Link, Route } from "react-router-dom";

import { FaUser } from "react-icons/fa";
import styles from "./Signup.module.css";
import { IoEyeSharp } from "react-icons/io5";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Signup = () => {
 
  const validate = (values) => {
    let errors = {};
    
    if (!values.username) {
      errors.fname = "Username Required";
    }
    if (!values.email) {
      errors.email = "Email Required";
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid Email";
    }

    if (!values.password) {
      errors.password = "Password Required";
    } else if (!/(?=.*\d)(?=.*[a-zA-Z])(?=.*\W)/.test(values.password)) {
      errors.password =
        "Password must contain at least one number, one character, and one special character";
    }

    return errors;
  };

  const Formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log(values);
    
    },
    validate,
  });

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
      const response = await fetch(`https://timely-qpcg.onrender.com/api/register`, {
      
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
        console.log("data", data);
        console.log("response", response);
        console.log(data.success_message);
        return data.error;
      
      
    } catch (error) {
      
      console.log("error" , error);
      console.log('Error Submitting');
    }
    
    
  }
 

  const [Errors, setErrors] = useState(false);
  const checkForm = () => {
    try {
      Formik.errors.username
        ? notify(Formik.errors.username)
        : Formik.errors.email
        ? notify(Formik.errors.email)
        : Formik.errors.password
        ? notify(Formik.errors.password)
        : console.log('Form Checked');
    } catch (error) {
      console.log('Error Checking Form:', error);
    }
  }

  console.log(Formik.values);

  return (
    <div className={styles.container}>
      <div className={styles.imagecontainer}>
        <div>
          <h1>
            <Link to="/" className={styles.logo}>
            <img src='../../assets/Images/quick.png' className="w-12 h-12"/><span className="font-garamond font-serif text-3xl mt-1 pl-2">Timely</span>
            </Link>
          </h1>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.wrapper}>
          <form onSubmit={Formik.handleSubmit}>
            <h1>SIGN UP</h1>
            <div className={styles.inputbox}>
              <input
                type="text"
                placeholder="Username"
                autoComplete="off"
                name="username"
                id="username"
                value={Formik.values.username}
                onChange={Formik.handleChange}
              />

              <FaUser className={styles.icon} />
            </div>
          
            <div className={styles.inputbox}>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={Formik.values.email}
                onChange={Formik.handleChange}
              />

              <IoEyeSharp className={styles.icon} />
            </div>
            <div className={styles.inputbox}>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={Formik.values.password}
                onChange={Formik.handleChange}
              />

              <IoEyeSharp className={styles.icon} />
            </div>
            <div className={styles.remember}>
              <label>
                <input type="checkbox" /> Remember me
              </label>
            </div>

            <button
              type="submit"
              onClick={async () => {
                
                checkForm();
                setErrors(submitForm(Formik.values));

              }}
              className={styles.button}
            >
              {Errors ? "Sign Up": (
                  
                  <Link to="/signin" className={styles.link}>
                    Sign Up
                  </Link>
                )}
              
            </button>

            <div className={styles.register}>
              <p>
                Already have an account?{" "}
                <Link to="/signin" className={styles.registerlink}>
                  Login
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
