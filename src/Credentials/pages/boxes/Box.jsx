import React from "react";
import styles from "./Box.module.css";
const SampleBox = () => {
  return (
    <>
      <h3>Heading</h3>
      <p>
        {" "}
        Lorem Ipsum is simply dummy text <br />
        of the printing and typesetting industry. <br />
        Lorem Ipsum has been the industry's standard <br />
        dummy text ever since the 1500s
      </p>
    </>
  );
};

export const Box = () => {
  return (
    <div className={styles.container}>
      <div className={styles.alignItem}>
        <div className={styles.box1}>
          <SampleBox />
        </div>
        <div className={styles.box2}>
          <SampleBox />
        </div>
        <div className={styles.box3}>
          <SampleBox />
        </div>
      </div>
    </div>
  );
};
