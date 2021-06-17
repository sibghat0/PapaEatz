import React from "react";
import "./dashboard.css";
import { motion } from "framer-motion";
import firebase from "firebase";
import Lottie from "lottie-react-web";
import toaster from "toasted-notes";
import empty from "./empty.json";
import DailyOrderCards from "../../components/dailyOrderCard/dailyOrderCard.component";
import SubscriptionCard from "../../components/subscriptionCard/subscriptionCard.component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loading from "../../assets/images/9809-loading.json";
import PlacesAutocomplete from "react-places-autocomplete";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const pageVariants = {
	initial: {
		opacity: 0,
		x: "-100vw",
	},
	in: {
		opacity: 1,
		x: 0,
	},
	out: {
		opacity: 0,
		x: 0,
	},
};

const pageTransition = {
	type: "spring",
	damping: 20,
	stiffness: 100,
};

class Dashboard extends React.Component {
	constructor(props) {
		super();
		this.state = {
			tab: props.match.params.id,
			currentUser: [],
			editProifle: false,
			name: "",
			phone: "",
			circular: false,
			editProifleLoading: false,
			orders: [],
			addresses: [],
			loading: true,
			wishlist: [],
			copy: false,
			addTab: false,
			points: "",
			orderedProduct: [],
			pincode: "",
			city: "",
			country: "",
			state: "",
			firstName: "",
			lastName: "",
			appartment: "",
			address: "",
			email: "",
			redeem: "",
			zips: [],
		};
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				firebase
					.firestore()
					.collection("settings")
					.onSnapshot((snap) => {
						snap.docChanges().forEach((change) => {
							this.setState({
								zips: change.doc.data().zips,
							});
						});
					});
				firebase
					.firestore()
					.collection("users")
					.where("email", "==", user.email)
					.onSnapshot((snap) => {
						snap.docChanges().forEach((change) => {
							var orders = change.doc.data().orders.reverse();
							this.setState(
								{
									currentUser: change.doc.data(),
									loading: false,
									orders: orders,
									dailyorders: change.doc.data().dailyorders,
								},
								() => {
									console.log(this.state.orders);
								}
							);
						});
					});
			} else {
				window.location.href = "/";
			}
		});
	}

	handleChange2 = (address) => {
		console.log(address);
		this.setState({ address });
	};

	handleSelect = (address, placeId, suggestion) => {
		console.log(suggestion);
		var state = "",
			city = "";
		suggestion.terms.map((term) => {
			if (term.offset === 20) {
				city = term.value;
			} else if (term.offset === 38) {
				state = term.value;
			}
		});
		this.setState({
			address: address,
			state: state,
			city: city,
		});
	};

	handleProfile = () => {
		this.setState({
			editProifle: true,
			name: this.state.currentUser.name,
			dob: this.state.currentUser.dob,
			gender: this.state.currentUser.gender,
			phone: this.state.currentUser.phone,
			alt: this.state.currentUser.alt,
			address: this.state.currentUser.address,
			pincode: this.state.currentUser.pincode,
			state: this.state.currentUser.state,
			city: this.state.currentUser.city,
		});
	};

	handleProfileCancel = () => {
		this.setState({
			editProifle: false,
		});
	};

	handleProfileSave = () => {
		if (this.state.name.replace(/ /g, "").length < 5) {
			toast.error("Please enter your name!");
		} else if (this.state.phone === undefined || this.state.phone.replace(/ /g, "").length < 5) {
			toast.error("Please enter your phone!");
		} else if (this.state.address.replace(/ /g, "").length < 5) {
			toast.error("Please enter your address!");
		} else {
			var exists = this.state.zips.includes(this.state.pincode);
			if (exists) {
				this.setState({
					editProifleLoading: true,
				});
				firebase
					.firestore()
					.collection("users")
					.where("email", "==", firebase.auth().currentUser.email)
					.get()
					.then((snap) => {
						snap.forEach((doc) => {
							firebase
								.firestore()
								.collection("users")
								.doc(doc.id)
								.update({
									name: this.state.name,
									phone: this.state.phone,
									address: this.state.address,
									city: this.state.city,
									state: this.state.state,
									pincode: this.state.pincode,
								})
								.then(() => {
									this.setState({
										editProifleLoading: false,
										editProifle: false,
									});
									toast.success("Profile Updated");
								});
						});
					});
			} else {
				toast.error("Sorry, we currently dont serve the zipcode you entered!");
			}
		}
	};

	handleChange = (e) => {
		const { value, id } = e.target;
		this.setState({ [id]: value });
	};

	render() {
		return (
			<>
				<ToastContainer />
				{this.state.loading ? (
					<div
						style={{
							width: "100%",
							height: "100vh",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}>
						<Lottie options={{ animationData: loading }} width={150} height={150} />
					</div>
				) : (
					<motion.div initial='initial' animate='in' exit='out' variants={pageVariants} transition={pageTransition}>
						<div className='dashboard-container'>
							<div className='sidebar'>
								{this.state.tab === "profile" ? (
									<div className='menu-active'>Profile</div>
								) : (
									<div
										className='menu'
										onClick={() => {
											this.setState({ tab: "profile" });
										}}>
										Profile
									</div>
								)}
								{this.state.tab === "orders" ? (
									<div className='menu-active'>Orders</div>
								) : (
									<div className='menu' onClick={() => this.setState({ tab: "orders" })}>
										Orders
									</div>
								)}
								{this.state.tab === "subscription" ? (
									<div className='menu-active'>Subscription</div>
								) : (
									<div className='menu' onClick={() => this.setState({ tab: "subscription" })}>
										Subscription
									</div>
								)}
							</div>
							<div className='content'>
								{this.state.tab === "profile" ? (
									<>
										<h1>Profile Details</h1>
										<div className='divider'></div>
										<div className='input-list'>
											<div className='input-group'>
												<p className='title'>User Name</p>
												{this.state.editProifle ? (
													<input
														id='name'
														type='text'
														value={this.state.name}
														placeholder='Enter your user name'
														onChange={this.handleChange}
													/>
												) : (
													<p className='value'>{this.state.currentUser ? this.state.currentUser.name : "N/A"}</p>
												)}
											</div>
											<div className='input-group'>
												<p className='title'>Email</p>
												<p className='value'>{this.state.currentUser ? this.state.currentUser.email : "N/A"}</p>
											</div>
											<div className='input-group'>
												<p className='title'>Phone No.</p>
												{this.state.editProifle ? (
													<PhoneInput
														country='US'
														placeholder='Enter phone number'
														value={this.state.phone}
														onChange={(v) => {
															this.setState({
																phone: v,
															});
														}}
													/>
												) : (
													<p className='value'>
														{this.state.currentUser
															? this.state.currentUser.phone
																? this.state.currentUser.phone
																: "N/A"
															: "N/A"}
													</p>
												)}
											</div>
											<div className='input-group'>
												<p className='title'>Address</p>
												{this.state.editProifle ? (
													<PlacesAutocomplete
														value={this.state.address}
														onChange={this.handleChange2}
														onSelect={this.handleSelect}>
														{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
															<div>
																<input
																	{...getInputProps({
																		placeholder: "Search Places ...",
																		className: "location-search-input",
																	})}
																/>
																<div className='autocomplete-dropdown-container'>
																	{loading && <div>Loading...</div>}
																	{suggestions.map((suggestion) => {
																		const className = suggestion.active
																			? "suggestion-item--active"
																			: "suggestion-item";
																		// inline style for demonstration purpose
																		const style = suggestion.active
																			? {
																					backgroundColor: "#e5e5e5",
																					cursor: "pointer",
																					margin: "0.5rem 0",
																					padding: "0.5rem",
																					borderRadius: "5px",
																			  }
																			: {
																					backgroundColor: "#e5e5e5",
																					cursor: "pointer",
																					margin: "0.5rem 0",
																					padding: "0.5rem",
																					borderRadius: "5px",
																			  };
																		return (
																			<div
																				{...getSuggestionItemProps(suggestion, {
																					className,
																					style,
																				})}>
																				<span>{suggestion.description}</span>
																			</div>
																		);
																	})}
																</div>
															</div>
														)}
													</PlacesAutocomplete>
												) : (
													<p className='value'>
														{this.state.currentUser
															? this.state.currentUser.address
																? this.state.currentUser.address
																: "N/A"
															: "N/A"}
													</p>
												)}
											</div>
											<div className='input-group'>
												<p className='title'>Zip</p>
												{this.state.editProifle ? (
													<input
														id='pincode'
														type='text'
														value={this.state.pincode}
														placeholder='Enter your state'
														onChange={this.handleChange}
													/>
												) : (
													<p className='value'>
														{this.state.currentUser
															? this.state.currentUser.pincode
																? this.state.currentUser.pincode
																: "N/A"
															: "N/A"}
													</p>
												)}
											</div>
										</div>
										{this.state.editProifle ? (
											<>
												{this.state.editProifleLoading ? (
													<div className='loader-container'>
														<div className='loader'>{/* <Lottie options={{ animationData: loading }} /> */}</div>
													</div>
												) : (
													<div className='button-group'>
														<div className='profile-cancel-button' onClick={this.handleProfileCancel}>
															Cancel
														</div>
														<div className='profile-save-button' onClick={this.handleProfileSave}>
															Save
														</div>
													</div>
												)}
											</>
										) : (
											<div className='profile-edit-button' onClick={this.handleProfile}>
												Edit Profile
											</div>
										)}
									</>
								) : null}
								{this.state.tab === "orders" ? (
									<>
										<h1>Your Orders</h1>
										<div className='divider'></div>
										{this.state.dailyorders.length === 0 ? (
											<div
												className='ordersdiv'
												style={{
													width: "100%",
													height: "90%",
													display: "flex",
													flexDirection: "column",
													alignItems: "center",
													justifyContent: "center",
												}}>
												<Lottie options={{ animationData: empty }} width={200} height={200} />
												<p>
													<span>EMPTY ORDER LIST</span>
													<br />
													You have no items in your orderlist
												</p>
												<a href='/' className='empty'>
													Take me back
												</a>
											</div>
										) : (
											<div className='order-container'>
												{this.state.dailyorders.map((item, index) => {
													return <DailyOrderCards item={item} />;
												})}
											</div>
										)}
									</>
								) : null}
								{this.state.tab === "subscription" ? (
									<>
										<h1>Your Active Subscription</h1>
										<div className='divider'></div>
										{this.state.orders.length === 0 ? (
											<div
												style={{
													width: "100%",
													height: "90%",
													display: "flex",
													flexDirection: "column",
													alignItems: "center",
													justifyContent: "center",
												}}>
												<Lottie options={{ animationData: empty }} width={300} height={300} />
												<a href='/' className='empty'>
													Take me back
												</a>
											</div>
										) : (
											<div className='wishlist-container'>
												{this.state.orders.map((item) => {
													return <SubscriptionCard item={item} />;
												})}
											</div>
										)}
									</>
								) : null}
							</div>
						</div>
					</motion.div>
				)}
			</>
		);
	}
}

export default Dashboard;
