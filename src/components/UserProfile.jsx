import React, { useState ,useEffect} from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import { Button } from '.';
import { userProfileData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import avatar from '../data/avatar.jpg';

const UserProfile = () => {
  const { currentColor } = useStateContext();

  const [username, setUsername] = useState("User");
  const useremail = localStorage.getItem("email");
  const [email, setEmail] = useState(useremail);
  

  useEffect(() => {
    const fetchUserData = async () => {
      const url = "https://timely-qpcg.onrender.com/api/getuserbyemail";
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const responseData = await response.json();
        console.log('User data:', responseData);
        setUsername(responseData.data.username);
        if (responseData.error) {
          throw new Error(responseData.error_message || 'Error fetching user data');
        }

        setUserData(responseData.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [email]);

  
  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={avatar}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200"> {username} </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> {email}</p>
        </div>
      </div>
     
      <div className="mt-5">
        <Button
          color="white"
          bgColor={currentColor}
          text="Logout"
          borderRadius="10px"
          width="full"
        />
      </div>
    </div>

  );
};

export default UserProfile;
