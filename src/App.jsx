import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import  Home  from './pages/Home.jsx';
import  Editor  from './pages/Editor.jsx';
import  Schedules  from './pages/Schedules.jsx';
import  TimeTable  from './pages/TimeTable.jsx';
import { SCalendar } from './pages/SCalendar.jsx';

import './App.css';

import { useStateContext } from './contexts/ContextProvider';
import { Calendar } from './pages/Calendar.jsx';
import TaskGridComponent from './pages/TaskGridComponent.jsx';

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (


    <div className={currentMode === 'Dark' ? 'dark' : ''}>
  
        <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
          
            <TooltipComponent
              content="Settings"
              position="Top"
            >
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>

            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-pink-50 ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-violet-50 min-h-screen md:ml-72 w-full  '
                : 'bg-violet-50 dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static bg-violet-50 dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              {themeSettings && (<ThemeSettings />)}

               <Routes>
              {/* App  */}
              <Route path="/" element={(<Home />)} />
              <Route path="/home" element={(<Home />)} />
                <Route path="/Schedules" element={<Schedules />} />
                <Route path="/Time Tables" element={<TimeTable />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/calendar" element={<Calendar />} />
              <Route path="/tasks/:scheduleId" element={<TaskGridComponent />} />
              <Route path="/calendar/:scheduleId" element={<SCalendar/>} />

              
              </Routes> 
            </div>
            <Footer />
          </div>
        </div>
     
    </div>
  );
};

export default App;
