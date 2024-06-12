// src/pages/Main.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function Main() {
	const navigate = useNavigate();

	const handleNavigateToApp = () => {
		navigate("/signup");
	};

	return (
		<div>
			
			<button onClick={handleNavigateToApp}>Go to Signup</button>
		</div>
	);
}

export default Main;
