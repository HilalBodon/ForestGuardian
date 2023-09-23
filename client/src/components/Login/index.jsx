import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/auth";
			const { data: res } = await axios.post(url, data);
			console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaa",data);

			localStorage.setItem("token", res.data);
			console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaa",data);

			window.location = "/";

		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className={styles.mainDiv}>
			<div className={styles.logoDiv}></div>
			<div className={styles.inputDiv}>
				<form className={styles.form_container} onSubmit={handleSubmit}>
					<input
						type="email"
						placeholder="UserID"
						name="email"
						onChange={handleChange}
						value={data.email}
						required
						className={styles.input}
					/>
					<input
						type="password"
						placeholder="Password"
						name="password"
						onChange={handleChange}
						value={data.password}
						required
						className={styles.input}
					/>
					{error && <div className={styles.error_msg}>{error}</div>}
					<button type="submit" className={styles.green_btn}>
						LOGIN
					</button>
				</form>
				{/* <Link to="/signup" className={styles.form_container}>
					<button type="button" className={styles.white_btn}>
						Sing Up
					</button>
				</Link> */}
			</div>
		</div>
	);
};

export default Login;
