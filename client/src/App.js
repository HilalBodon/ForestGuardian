import React, { useState } from "react";
import { Route, Routes, Navigate} from "react-router-dom";
import Main from "./components/Main";
import Login from "./Pages/Login"
import DeviceDetail from "./Pages/DeviceDetail";
import DarkMode from "./DarkMode";

function App() {
	const [authToken, setAuthToken] = useState(localStorage.getItem("token") || "");
	localStorage.setItem("token",authToken);

	return (
		<Routes>
			
			{<Route path="/" element={authToken?<Main authToken={authToken} />:<Navigate replace to="/login" />} />}
			<Route path="/login" element={<Login setAuthToken={setAuthToken} />} />
			<Route path="/devices/:id" element={<DeviceDetail />} />

		</Routes>
	);
}

export default App;
