import styles from "./AppLayout.module.css";
import { Navbar } from "./pages/Navbar/Navbar.jsx";
import { Hero } from "./pages/Hero/Hero.jsx";
import { Sample } from "./pages/Sample/Sample.jsx";
import { Box } from "./pages/boxes/Box.jsx";
import { List } from "./pages/Lists/List.jsx";
import { Footer } from "./pages/footer/Footer.jsx";
import AOS from 'aos'
import 'aos/dist/aos.css'
import "typeface-montserrat";
import { useEffect } from "react";

export const AppLayout = () => {


  useEffect(() => {

    AOS.init({ duration: 3000 });

  }, [])
  
  return (
    <>
      <div className={styles.App}>
        <div className={styles.gradientSection1}>
          <Navbar props={false} />
          <Hero  />
          {/* <Sample />
          <Box />  */}
        </div>
      </div>
      <div className={styles.container}>
        <h3 className={styles.text } data-aos= "flip-right" data-aos-duration = "800">FEATURES</h3>
        <div className={styles.line}></div>
        <div className={styles.glassContainer} data-aos = "flip-left" data-aos-duration="1400">
          <div className={styles.worried}>
            <div data-aos = "zoom-in" >
            <img src="../assets/Images/min1.gif"  />
            </div>
            
            <div className={styles.contentContainer} >
              <h2 className={styles.heading} data-aos = "zoom-out" data-aos-duration="1000">Worried?</h2>
              <p className={styles.content} data-aos = "zoom-in" data-aos-duration="2000">
                Feeling overwhelmed? <br />
                Rest assured, our user-friendly interface is here to ease your
                scheduling worries.
                <br />
                Dive in and take control of your time effortlessly,
                <br />
                crafting the ideal timetable to suit your unique rhythm and
                needs.
              </p>
            </div>
          </div>
          
        </div>
        <div className={styles.glassContainer} data-aos = "flip-right" data-aos-duration="1400">
        <div className={styles.worried}>
           
            <div className={styles.contentContainer}>
              <h2 className={styles.heading}  data-aos = "zoom-out" data-aos-duration="1000">Here Comes Timely</h2>
              <p className={styles.content}  data-aos = "zoom-in" data-aos-duration="2000">
                Streamlines scheduling with customizable features, <br />
                allowing effortless organization and adjustment.<br />
                Enjoy intuitive drag-and-drop functionality and built-in Time Tables <br />
                for seamless time management.
              </p>
            </div>
            <img src="../assets/Images/min2.gif" data-aos = "flip-left" data-aos-duration="1000" />
          </div>
        </div>
      </div>
      <div className={styles.container3}>
        <div className={styles.glass1}  data-aos = "fade-right" data-aos-duration="1000">
          
        </div>
        <div className={styles.glass1}   data-aos = "fade-left" data-aos-duration="1000">
          
          </div>
      </div>
      <div className={styles.container2}>
      <div className={styles.line2}></div>
          <Footer/>
      </div>
    </>
  );
};

export default AppLayout;
