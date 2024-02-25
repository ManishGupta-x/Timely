import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css'

export const Contact = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [repoInfo1, setRepoInfo1] = useState(null); // For ManishGupta-x/Timely
  const [repoInfo2, setRepoInfo2] = useState(null); // For kashvigarg/timely

    
  useEffect(() => {

    AOS.init({ duration: 1000 });

  }, []);
    
  useEffect(() => {
    const fetchRepoInfo1 = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/ManishGupta-x/Timely"
        );
        if (!response.ok) {
          throw new Error(
            `Error fetching data for Timely: ${response.statusText}`
          );
        }
        const data = await response.json();
        setRepoInfo1(data);
      } catch (error) {
        setError(`Error fetching data for Timely: ${error.message}`);
      }
    };

    const fetchRepoInfo2 = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/kashvigarg/timely"
        );
        if (!response.ok) {
          throw new Error(
            `Error fetching data for timely: ${response.statusText}`
          );
        }
        const data = await response.json();
        setRepoInfo2(data);
      } catch (error) {
        setError(`Error fetching data for timely: ${error.message}`);
      }
    };

    Promise.all([fetchRepoInfo1(), fetchRepoInfo2()])
      .then(() => setIsLoading(false))
      .catch((err) => setError(err.message));
  }, []);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }
  const {
    owner: { avatar_url: avatarUrl1 },
    name: name1,
  } = repoInfo1;
  const {
    owner: { avatar_url: avatarUrl2 },
    name: name2,
  } = repoInfo2;

  return (
    <div className="bg-black h-screen ">
      <div className="flex justify-evenly">
        <div className="w-[30%] h-screen bg-gray-950 border-l border-r border-gray-600 " data-aos = "flip-left" data-aos-duration= "3000">
          <div className="flex flex-col ">
            <div className="mx-[8.8rem] mt-4">
              <img
                src={avatarUrl1}
                alt={name1}
                className="rounded-full w-44 h-44 border-2 border-gray-300 p-2"
              />
            </div>
            <h1 className="text-gray-400 ml-[8.7rem] mt-6 text-3xl font-garamond">
              Manish Gupta
                      </h1>
            <p className="text-gray-300 mt-[3rem] ml-10 font-garamond text-2xl">Connect With Me</p>
            <h2 className="text-gray-400 ml-10 mt-[2rem] font-lora">
              Email : manishgupta220402@gmail.com
            </h2>
            <h2 className="text-gray-400 ml-10 mt-[2rem] font-lora">
              LinkedIn :
              <Link
                to="https://www.linkedin.com/in/manish-gupta-8861ba224"
                className="text-gray-400 hover:text-blue-500 ml-1 "
                target="_blank"
                rel="noopener noreferrer"
              >
                Manish Gupta
              </Link>
            </h2>
            <h2 className="text-gray-400 m-10 mt-[2rem] font-lora">
              Github :
              <Link
                to="https://github.com/ManishGupta-x"
                className="text-gray-400 hover:text-blue-500 ml-1 "
                target="_blank"
                rel="noopener noreferrer"
              >
                ManishGupta-x
              </Link>
            </h2>
          </div>
        </div>
        <div className="w-[30%] h-screen  bg-gray-950 border-l border-r border-gray-600 " data-aos = "flip-right" data-aos-duration= "3000">
          <div className="flex flex-col ">
            <div className="mx-[8.8rem] mt-4">
              <img
                src={avatarUrl2}
                alt={name2}
                className="rounded-full w-44 h-44 border-2 border-gray-300 p-2"
              />
            </div>
            <h1 className="text-gray-400 ml-[9.8rem] mt-6 text-3xl font-garamond">
              Kashvi Garg
                      </h1>
                      <p className="text-gray-300 mt-[3rem] ml-10 font-garamond text-2xl">Connect With Me</p>
            <h2 className="text-gray-400 ml-10 mt-[2rem] font-lora">
              Email : kashvigarg02@gmail.com
            </h2>
            <h2 className="text-gray-400 ml-10 mt-[2rem] font-lora">
              LinkedIn :
              <Link
                to="https://www.linkedin.com/in/kashvi-garg-2k3/"
                className="text-gray-400 hover:text-blue-500 ml-1 "
                target="_blank"
                rel="noopener noreferrer"
              >
                Kashvi Garg
              </Link>
            </h2>
            <h2 className="text-gray-400 m-10 mt-[2rem] font-lora">
              Github :
              <Link
                to="https://github.com/kashvigarg"
                className="text-gray-400 hover:text-blue-500 ml-1 "
                target="_blank"
                rel="noopener noreferrer"
              >
                kashvigarg
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
