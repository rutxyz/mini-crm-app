// src/pages/Main.jsx
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import CustomerForm from "../components/CustomerForm";
import OrderForm from "../components/OrderForm";
function Main() {
	const navigate = useNavigate();

	const handleNavigateToApp = () => {
		navigate("/signup");
	};

	return (
		<Fragment>
			<h1>Customer-Information</h1>
			<CustomerForm/>
			<OrderForm/>
		</Fragment>
	);
}

export default Main;
