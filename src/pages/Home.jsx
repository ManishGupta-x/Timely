import React, { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
// Home component
export const Home = () => {
  const slides = [
    {
      url: "https://imgur.com/T9324xd.png",
    },
    {
      url: "https://imgur.com/sjmA0Ch.png",
    },

    {
      url: "https://imgur.com/ukOdUEO.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div>
      <h1 className="ml-11 text-3xl text-white font-lora mt-5">
        Welcome To Timely
      </h1>
      <div className="flex justify-start ml-12 mt-14">
            <div className="h-[180px] py-4 px-4 relative group bg-gray-300 rounded-xl">
              <p className="text-lg text-gray-700 pl-2">
                Start organizing your <br />
                Schedules now!
              </p>
              <a
                href="/home/schedules"
                className="inline-block mt-10 ml-36 px-4 py-2 bg-[#F8685B] text-white rounded-lg hover:bg-violet-600 transition duration-300"
              >
                Go to Schedules
              </a>
            </div>
            <div className="h-[180px] ml-14 py-4 px-4 relative group bg-gray-300 rounded-xl">
              <p className="text-lg text-gray-700 pl-2">
                Generate Study Flash <br />
                Cards!!
                
              </p>
              <a
                href="#"
                className="inline-block mt-10 ml-36 px-4 py-2 bg-[#F8685B] text-white rounded-lg hover:bg-violet-600 transition duration-300"
              >
                Coming Soon
              </a>
            </div>
          </div>
      {/* <div className="container flex">
        <div className="flex-auto">
          <div className="max-w-[800px] h-[380px] ml-3 mt-4 py-4 px-2 relative group ">
            <div
              style={{
                backgroundImage: `url(${slides[currentIndex].url})`,
                backgroundPosition: "center",
              }}
              className="w-full h-full rounded-2xl bg-contain duration-500 bg-no-repeat "
            ></div>

            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
              <BsChevronCompactLeft onClick={prevSlide} size={30} />
            </div>

            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
              <BsChevronCompactRight onClick={nextSlide} size={30} />
            </div>
          </div>

          
        </div>
        <div className="flex-auto -ml-80">
  
          <div className="max-w-[340px] h-[540px] mt-10 py-4 px-2 bg-gray-300 rounded-xl">
            
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Home;
