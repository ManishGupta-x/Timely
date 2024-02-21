import { useState, useEffect } from 'react';

const UserData = ({ email }) => {
  const [userData, setUserData] = useState(null);

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

  return userData;
};

export default UserData;
