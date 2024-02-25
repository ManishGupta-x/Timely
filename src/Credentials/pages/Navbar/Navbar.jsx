import React, { useState } from 'react';
import styles from "./Navbar.module.css";
import { Link,useLocation } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css'
import { useEffect } from "react";
import { animateScroll as scroll } from 'react-scroll';
export const Navbar = () => {
  
  const location = useLocation();
  const isLoginForm = location.pathname === "/forms" || location.pathname === "/task";
  const [menuOpen, setMenuOpen] = useState(false);
  const [flags, setFlags] = useState(isLoginForm);

  const toggleSignIn = () => {
    if (!flags) {
      return (
        <li>
          <Link to="/signin" className={`${styles.link} `}><span style={{ color: 'inherit' , fontWeight: 'bolder' , }}>SIGN IN</span></Link>
        </li>
      );
    } else {
      return (
        <li>
          Username
        </li>
      );
    }
  }

  useEffect(() => {

    AOS.init({ duration: 3000 });

  }, []);

  const handleScroll = () => {
    scroll.scrollTo(window.innerHeight, {
      duration: 1100, 
      smooth: 'easeInOutQuart'  
    });
  };

  return (
    <>
      <nav className={styles.navbar} data-aos = "fade-down" data-aos-duration = "800">
        
        <div>
        <a className={styles.title} href='/'>Timely</a>
        </div>
        <div className={styles.glass}>
        <div className={styles.menu}>
          <div>
            <img
              className={styles.menuBtn}
              src={menuOpen ? `../../assets/icons/dots.png` : "../../assets/icons/study.png"}
              alt="menu-button"
              onClick={() => setMenuOpen(!menuOpen)}
            ></img>
          </div>
          <ul className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`} onClick={() => setMenuOpen(false)}>
            <li onClick={handleScroll} className={styles.link}>
             
                About
          
            </li>
           
            <li>
              <Link to='/contact' className={styles.link} >Contact</Link>
            </li>
            {toggleSignIn()}
          </ul>
        </div>
        </div>
        
      </nav>
    </>
  );
}
