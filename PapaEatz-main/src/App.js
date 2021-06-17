import React from "react";
import "./App.css";
import { Switch, Route, useLocation } from "react-router-dom";
// Imported header
import Header from "./components/header/header.component";
//imported footer
import Footer from "./components/footer/footer.component";
//imported basic pages
import Homepage from "./pages/homepage/homepage.page";
import Login from "./pages/login/login.page";
import SignUp from "./pages/sign-up/SignUp";
import Checkout from "./pages/checkout/checkout.page";
import Weekly from "./components/weekly-subscription/Weekly-subscription";
import Faq from "./pages/faq/faq";
import SelectYourMeal from "./pages/selectYourMeal/selectYourMeal";

import firebase from "./config/firebaseConfig";
import WeeklyMenu from "./components/thisWeeklyMenu/WeeklyMenu";
import Dashboard from "./pages/dashboard/dashboard";
import ForgetPassword from "./pages/forgetPassword/forgetPassword";
import About from "./pages/about/about";

function App() {
	const location = useLocation();
	return (
		// Setting up the routes below

		<div className='App'>
			<Header location={location} />
			<Switch location={location} key={location.pathname}>
				<Route exact path='/' component={Homepage} />
				<Route exact path='/About' component={About} />
				<Route exact path='/WeeklyMenu' component={WeeklyMenu} />
				<Route exact path='/SelectYourMeal/:id' component={SelectYourMeal} />
				<Route exact path='/Weekly-subscription' component={Weekly} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/SignUp' component={SignUp} />
				<Route exact path='/Recover' component={ForgetPassword} />
				<Route exact path='/checkout' component={Checkout} />
				<Route exact path='/faq' component={Faq} />
				<Route exact path='/dashboard/:id' component={Dashboard} />
			</Switch>
			<Footer />
		</div>
	);
}

export default App;
