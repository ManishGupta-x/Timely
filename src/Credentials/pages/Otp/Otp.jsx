import React from "react";
import styles from "./Otp.module.css";
import { Link } from "react-router-dom";    
import { FaMobile } from "react-icons/fa";

export const Otp = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.wrapper}>
          <form action="">
            <h1>ENTER OTP</h1>
            <div className={styles.inputbox}>
              <input type="text" placeholder="OTP" required />
              <FaMobile className={styles.icon} />
            </div>
            <button type="submit"><Link to = "/forms"  className={styles.button}>Verify OTP</Link></button>
            </form>
        </div>
      </div>
    </div>
  );
};
