export const fetchUserData = async (email) => {
	try {
		const url = "https://timely-qpcg.onrender.com/api/getuserbyemail";
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email }),
		});

		if (!response.ok) {
			throw new Error("Failed to fetch user data");
		}

		const responseData = await response.json();
		console.log("User data:", responseData);

		if (responseData.error) {
			throw new Error(responseData.error_message || "Error fetching user data");
		}

		return responseData.data;
	} catch (error) {
		console.error("Error fetching user data:", error);
		return null;
	}
};

export const getScheduleData = async () => {
	try {
        const email = localStorage.getItem("email");
		const userData = await fetchUserData(email); // Fetch user data
		const id = userData?.user_id || ""; // Access user_id from userData if available
		const token = localStorage.getItem("token");
				const fetchUrl = `https://timely-qpcg.onrender.com/api/schedules/${userData.user_id}`;
				const response = await fetch(fetchUrl, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `token ${token}`,
					},
				});
		if (!response.ok) {
			throw new Error("Failed to fetch schedule data");
		}
		const responseData = await response.json();
		console.log(responseData);
		return responseData.data || []; // Assuming responseData has a 'data' property containing schedule data
	} catch (error) {
		console.error("Error fetching schedule data:", error);
		return [];
	}
};
