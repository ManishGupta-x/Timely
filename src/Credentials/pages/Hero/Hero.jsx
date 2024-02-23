import React, { startTransition } from "react";
import styles from "../Hero/Hero.module.css";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
export const Hero = () => {
  useEffect(() => {
    AOS.init({ duration: 3000 });
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.alignItems}>
        <div className={styles.content}>
          <h1
            className={styles.title}
            data-aos="fade-left"
            data-aos-duration="3000"
          >
            {"Master Your Day".split("").map((letter, index) => (
              <span
                key={index}
                data-aos="zoom-in-up  "
                data-aos-duration="3000"
                data-aos-delay={index * 200}
              >
                {letter}
              </span>
            ))}
          </h1>

          <p
            className={styles.description}
            data-aos="fade-down"
            data-aos-duration="800"
          >
            Conquer & Simplify your Life with us!
          </p>
          <Link
            to = "/signup"
          
            className={styles.signinBtn}
            data-aos="zoom-in"
          >
            <span className={styles.text}>Get Started</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Hero;
