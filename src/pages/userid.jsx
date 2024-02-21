
export const fetchUser = async () => {
    try {
      const response = await fetch(
        "https://timely-qpcg.onrender.com/api/getuserbyemail", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
      });
      
      
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      
        const responseData = await response.json();
        
      
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };