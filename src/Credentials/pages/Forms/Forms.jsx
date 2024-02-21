import React, { useState } from "react";
import styles from "./Forms.module.css";
import { Navbar } from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { GrFormSchedule } from "react-icons/gr";
import { AiOutlineSchedule } from "react-icons/ai";
import { LiaTasksSolid } from "react-icons/lia";
import { FaPlus } from "react-icons/fa6";
import { FaBusinessTime } from "react-icons/fa";

export const Forms = () => {
	
	const [selectedDifficulty, setSelectedDifficulty] = useState("");
	const handleDifficultyChange = (event) => {
		setSelectedDifficulty(event.target.value);
	};

	const [No_of_tasks, setNo_of_tasks] = useState("");	
	const handleInputChange = (event) => {
		setNo_of_tasks(event.target.value);
	    };

	return (
		<div className={styles.container}>
			<Navbar props={true} />
			<div className={styles.container2}>
				<div className={styles.wrapper}>
					<h1>CREATE A SCHEDULE</h1>
					<div className={styles.container3}>
						<div className={styles.wrapper1}>
							<form action="">
								<div className={styles.inputbox}>
									<p> Name your Schedule</p>
									<input type="text" placeholder="Schedule Name" required />

									<AiOutlineSchedule className={styles.icon} />
								</div>
								<div className={styles.inputbox}>
									<p>Duration (Days)</p>
									<input type="text" placeholder="No of days" required />
									<GrFormSchedule className={styles.icon} />
								</div>
								<div className={styles.inputbox}>
									<p>Number of Tasks</p>
									<input type="text" placeholder="Enter a Number" value={No_of_tasks} onChange={handleInputChange} required />
									<LiaTasksSolid className={styles.icon} />
								</div>
							</form>
						</div>
						<div className={styles.wrapper2}>
							<form>
								<div className={styles.inputbox}>
									<p>Longest Sitting Time</p>
									<input type="text" placeholder="Enter No of Hours" required />
									<FaBusinessTime className={styles.icon} />
								</div>
								<div className={styles.inputbox}>
									<p>Describe Yourself</p>

									<select
										name="difficulty"
										value={selectedDifficulty}
										className={styles.menu}
										onChange={handleDifficultyChange}
										defaultValue="Lazy"
									>
										<option value="" disabled hidden >
											Select your Personality
										</option>
										<option value="Lazy">Lazy</option>
										<option value="Modl">Moderately Lazy</option>
										<option value="ModH">Moderately Hardworking</option>
										<option value="HardW">Hardworking</option>
									</select>
								</div>
								<div className={styles.buttonContainer}>
									<button type="submit" >
										<Link to="/task" className={styles.button}>
											Create <FaPlus className={styles.plus}></FaPlus>
										</Link>
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
