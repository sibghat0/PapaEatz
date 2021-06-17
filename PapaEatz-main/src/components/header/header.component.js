import React from "react";
import logo from "../../assets/images/papaeatz.png";
import { Link } from "react-router-dom";
import cart from "./assets/Cart-01.svg";
import "./header.style.css";

import firebase from "../../config/firebaseConfig";

class Header extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showButtons: false,
			showUser: false,
			currentUser: {},
			tab: 1,
			hamburger: false,
			showWeekly: true,
			showMeal: false,
			dailyOrder: {},
		};
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({
					showUser: true,
					showButtons: false,
				});
				firebase
					.firestore()
					.collection("orders")
					.where("email", "==", user.email)
					.get()
					.then((snap) => {
						snap.forEach((doc) => {
							if (doc.data().status === "Active" || doc.data().status === "Paused") {
								this.setState({
									showWeekly: false,
								});
							}
						});
					});
				firebase
					.firestore()
					.collection("dailyorders")
					.where("email", "==", user.email)
					.get()
					.then((snap) => {
						if (snap.size > 0) {
							var data = {};
							snap.forEach((doc) => {
								if (doc.data().date.toDate() > new Date() && doc.data().varient === "default") {
									if (data.email) {
										if (data.date.toDate() > doc.data().date.toDate) {
											data = doc.data();
										}
									} else {
										data = doc.data();
									}
								}
							});
							this.setState({
								dailyOrder: data,
							});
						}
					});
				firebase
					.firestore()
					.collection("users")
					.where("email", "==", user.email)
					.get()
					.then((querySnapshot) => {
						querySnapshot.forEach((document) => {
							this.setState({
								currentUser: document.data(),
							});
						});
					});
			} else {
				this.setState({
					showUser: false,
					showButtons: true,
				});
			}
		});
	}

	handleSignout = () => {
		this.setState({
			hamburger: false,
		});
		firebase
			.auth()
			.signOut()
			.then(() => {
				window.location.href = "/";
			});
	};
	render() {
		console.log(this.state.showWeekly);
		return (
			<>
				<div className='header'>
					<div>
						<img src={logo} className='App-logo' alt='logo' />
					</div>
					<div className='header-center'>
						<a href='/' className={this.props.location.pathname === "/" ? "link active" : "link"}>
							Home
						</a>
						{this.state.dailyOrder.email ? (
							<a
								href={"/SelectYourMeal/" + this.state.dailyOrder.mailID}
								className={this.props.location.pathname.includes("/SelectYourMeal") ? "link active" : "link"}>
								{this.state.dailyOrder.selectedItems.length > 0 ? "Change Your Meal" : "Select Your Meal"}
							</a>
						) : (
							<a href='/WeeklyMenu' className={this.props.location.pathname === "/WeeklyMenu" ? "link active" : "link"}>
								This Week's Menu
							</a>
						)}
						{this.state.showWeekly ? (
							<a
								href='/Weekly-subscription'
								className={this.props.location.pathname === "/Weekly-subscription" ? "link active" : "link"}>
								Weekly Subscription
							</a>
						) : null}
						<a href='/About' className={this.props.location.pathname === "/About" ? "link active" : "link"}>
							About
						</a>
						<a href='/faq' className={this.props.location.pathname === "/faq" ? "link active" : "link"}>
							FAQs
						</a>
					</div>
					<div className='right-container'>
						<div className='header-center'>
							{this.state.showButtons ? (
								<>
									<a href='/login'>Sign In</a>
									<a href='/SignUp' className='signup-btn'>
										<p>Sign Up</p>
									</a>
								</>
							) : null}
							{this.state.showUser && this.state.currentUser.name ? (
								<div className='namelog'>
									<p>Hello, {this.state.currentUser.name}</p>
									<i className='fas fa-chevron-down'></i>
									<div className='namelog-options'>
										<a href='/dashboard/profile' className='options'>
											<i className='fas fa-user'></i>
											Profile
										</a>
										<a href='/dashboard/subscription' className='options'>
											<i className='fas fa-box-open'></i>
											Subscription
										</a>
										<a href='/dashboard/orders' className='options'>
											<i className='fas fa-shopping-bag'></i>
											Orders
										</a>

										<div className='options' onClick={this.handleSignout}>
											<i className='fas fa-sign-out-alt'></i>
											Logout
										</div>
									</div>
								</div>
							) : null}
						</div>
					</div>
					<div className='hamburger-icon' onClick={() => this.setState({ hamburger: !this.state.hamburger })}>
						{this.state.hamburger ? <i className='fas fa-times'></i> : <i className='fas fa-bars'></i>}
					</div>
				</div>

				{this.state.hamburger ? (
					<div className={this.state.hamburger ? "hamburger active" : "hamburger"}>
						<div className='header-center'>
							<a
								onClick={() => {
									this.setState({ hamburger: false });
								}}
								href='/'
								className={this.props.location.pathname === "/" ? "link active" : "link"}>
								Home
							</a>
							{this.state.dailyOrder.email ? (
								<a
									onClick={() => {
										this.setState({ hamburger: false });
									}}
									href={"/SelectYourMeal/" + this.state.dailyOrder.mailID}
									className={this.props.location.pathname.includes("/SelectYourMeal") ? "link active" : "link"}>
									{this.state.dailyOrder.selectedItems.length > 0 ? "Change Your Meal" : "Select Your Meal"}
								</a>
							) : (
								<a
									onClick={() => {
										this.setState({ hamburger: false });
									}}
									href='/WeeklyMenu'
									className={this.props.location.pathname === "/WeeklyMenu" ? "link active" : "link"}>
									This Week's Menu
								</a>
							)}
							{this.state.showWeekly ? (
								<a
									onClick={() => {
										this.setState({ hamburger: false });
									}}
									href='/Weekly-subscription'
									className={this.props.location.pathname === "/Weekly-subscription" ? "link active" : "link"}>
									Weekly Subscription
								</a>
							) : null}
							<a
								onClick={() => {
									this.setState({ hamburger: false });
								}}
								href='/About'
								className={this.props.location.pathname === "/About" ? "link active" : "link"}>
								About
							</a>
							<a
								onClick={() => {
									this.setState({ hamburger: false });
								}}
								href='/faq'
								className={this.props.location.pathname === "/faq" ? "link active" : "link"}>
								FAQs
							</a>
						</div>
						<div className='right-container'>
							{this.state.showButtons ? (
								<>
									<a
										onClick={() => {
											this.setState({ hamburger: false });
										}}
										href='/login'>
										Sign In
									</a>
									<a
										onClick={() => {
											this.setState({ hamburger: false });
										}}
										href='/SignUp'
										className='signup-btn'>
										Sign Up
									</a>
								</>
							) : (
								<>
									<a href='/dashboard/profile'>My Profile</a>
									<a onClick={this.handleSignout}>
										Logout <i className='fas fa-sign-out-alt'></i>
									</a>
								</>
							)}
						</div>
					</div>
				) : null}
			</>
		);
	}
}

export default Header;
