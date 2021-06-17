import React from "react";
import "../selectYourMeal/selectYourMeal.css";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import Lottie from "lottie-react-web";
import loading from "../../assets/images/9809-loading.json";
import firebase from "firebase";
import SelectMeal2 from "../../components/selectMeal2/selectMeal2";
import SelectMeal from "../../components/selectMeal/selectMeal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import moment from "moment";
import success from "../../assets/images/7698-success.json";
import link from "../../fetchPath";
import { Modal, Button } from "react-bootstrap";
import StripeCheckout from "react-stripe-checkout";

export default class SelectYourMeal extends React.Component {
	constructor() {
		super();
		this.state = {
			showveg: false,
			icon: false,
			loading: true,
			menu: [],
			subscriptionDetails: {},
			selected: 0,
			selectedItems: [],
			selectedSItems: [],
			selectedAItems: [],
			selectedASItems: [],
			NF: false,
			ordering: false,
			success: false,
			dailyOrder: {},
			showAlert: false,
			currentUser: {},
			showAdditional: false,
			showAddAlert: false,
		};
	}
	componentDidMount() {
		console.log(this.props.match.params.id);
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				firebase
					.firestore()
					.collection("mails")
					.doc(this.props.match.params.id)
					.get()
					.then((mail) => {
						console.log(mail.data());
						if (mail.exists) {
							this.setState({
								mailInfo: mail.data(),
							});
							if (mail.data().used === false) {
								console.log("Email Link not yet used");
								var expired = false;
								expired = this.handleExpired(mail.data().expired.toDate());
								setInterval(() => {
									expired = this.handleExpired(mail.data().expired.toDate());
								}, 1000);
								if (expired === false) {
									console.log("Link active");
									firebase
										.firestore()
										.collection("users")
										.where("email", "==", user.email)
										.get()
										.then((snap) => {
											snap.forEach((doc) => {
												var currentUser = doc.data();
												currentUser.id = doc.id;
												this.setState({
													currentUser: currentUser,
												});
												if (doc.data().orders.includes(mail.data().order)) {
													console.log("Such order exists");
													firebase
														.firestore()
														.collection("orders")
														.doc(mail.data().order)
														.get()
														.then((snap) => {
															var order = snap.data();
															firebase
																.firestore()
																.collection("dailyorders")
																.doc(mail.data().dailyOrderId)
																.get()
																.then((dailyOrder) => {
																	this.setState({
																		subscriptionDetails: order,
																		loading: false,
																		dailyOrder: dailyOrder.data(),
																		selectedItems: dailyOrder.data().selectedItems,
																		selectedSItems: dailyOrder.data().selectedSItems,
																	});
																});
														});
												} else {
													console.log("No such order exists");
													this.setState({
														NF: true,
														loading: false,
													});
												}
											});
										});
								} else {
									console.log("Email Link expired");
									this.setState({
										NF: true,
										loading: false,
									});
								}
							} else {
								console.log("Email Link already used");
								this.setState({
									NF: true,
									loading: false,
								});
							}
						} else {
							console.log("No mail found with such link");
							this.setState({
								NF: true,
								loading: false,
							});
						}
					});
				firebase
					.firestore()
					.collection("users")
					.where("email", "==", user.email)
					.get()
					.then((snap) => {
						snap.forEach((doc) => {
							this.setState({
								currentUser: doc.data(),
							});
						});
					});
			} else {
				window.location.href = "/";
			}
		});
	}

	handleExpired = (e) => {
		if (e < new Date()) {
			this.setState({
				NF: true,
				loading: false,
			});
			return true;
		} else {
			return false;
		}
	};

	handleSelectedItems = (e) => {
		this.setState(
			{
				selectedItems: e,
			},
			() => {
				console.log("146", this.state.selectedItems);
			}
		);
	};

	handleSelectedSItems = (e) => {
		this.setState(
			{
				selectedSItems: e,
			},
			() => {
				console.log("146", this.state.selectedSItems);
			}
		);
	};

	handleOrderCheck = () => {
		if (this.state.selectedItems.length < this.state.subscriptionDetails.items) {
			toast.error("Please select your items !");
		} else if (this.state.selectedSItems.length === 0) {
			this.setState({
				showAlert: true,
			});
		} else {
			this.setState({
				showAddAlert: true,
			});
		}
	};

	handleOrder = (e, items1, items2) => {
		this.setState({
			ordering: true,
			showAlert: false,
		});
		firebase
			.firestore()
			.collection("dailyorders")
			.doc(this.state.mailInfo.dailyOrderId)
			.update({
				selectedItems: this.state.selectedItems,
				selectedSItems: this.state.selectedSItems,
				type: "User Choice",
			})
			.then(async () => {
				await firebase
					.firestore()
					.collection("users")
					.where("email", "==", firebase.auth().currentUser.email)
					.get()
					.then((snap) => {
						snap.forEach(async (doc) => {
							var dailyorders = doc.data().dailyorders;
							var daily = {
								id: this.state.mailInfo.dailyOrderId,
								date: new Date(),
							};
							var found = false;
							dailyorders.map((d) => {
								if (d.id === this.state.mailInfo.dailyOrderId) {
									found = true;
								}
							});
							if (found === false) {
								dailyorders.push(daily);
							}
							await firebase
								.firestore()
								.collection("users")
								.doc(doc.id)
								.update({
									dailyorders: dailyorders,
								})
								.then(async () => {
									if (e === "default") {
										var message = "";
										var selectedItems = [...this.state.selectedItems, ...this.state.selectedSItems];
										selectedItems.map((item, index) => {
											if (index !== selectedItems.length - 1) {
												message += `<p>${item},</p>`;
											} else {
												message += `<p>${item}.</p>`;
											}
										});
										console.log(message);
										var data = {
											message: `
													<h3>Thank You for ordering</h3>
													<p>You ordered :${message}</p>
													<p>Delivery Date :${moment(this.state.dailyOrder.date.toDate()).format("L")}</p>
													<p>Delivery Time : 5PM - 8PM</p>
													<p>Please let us know in case of any queries.</p>
													<p>Thanks,</p>
													<p>Papaeatz Team</p>`,
											email: firebase.auth().currentUser.email,
											subject: "Delivery for " + moment(this.state.dailyOrder.date.toDate()).format("L") + ", PAPAEATZ",
										};
										var res = await axios.post(link + "/e", data);
										var data2 = {
											phone: this.state.currentUser.phone,
											message:
												"Thank You for ordering from Papaeatz, your food will be delivered on " +
												moment(this.state.dailyOrder.date.toDate()).format("L") +
												" between 5PM-8PM.",
										};
										var resp2 = await axios.post(link + "/sendMessage", data2);
										if (res.data !== null) {
											console.log("Send mail");
											this.setState(
												{
													success: true,
													ordering: false,
												},
												() => {
													setTimeout(() => {
														window.location = "/dashboard/orders";
													}, 3000);
												}
											);
										} else {
											console.log(res);
											this.setState({
												ordering: false,
											});
										}
									} else {
										var message = "<p>Meal Plan :<p>";
										var selectedItems = [...this.state.selectedItems, ...this.state.selectedSItems];
										selectedItems.map((item, index) => {
											if (index !== selectedItems.length - 1) {
												message += `<p>${item},</p>`;
											} else {
												message += `<p>${item}.</p>`;
											}
										});
										message += `<p>Additional Items:</p>`;
										var selectedAItems = [...items1, ...items2];
										selectedAItems.map((item, index) => {
											if (index !== selectedItems.length - 1) {
												message += `<p>${item},</p>`;
											} else {
												message += `<p>${item}.</p>`;
											}
										});
										console.log(message);
										var data = {
											message: `
													<h3>Thank You for ordering</h3>
													<p>You ordered :${message}</p>
													<p>Delivery Date :${moment(this.state.dailyOrder.date.toDate()).format("L")}</p>
													<p>Delivery Time : 5PM - 8PM</p>
													<p>Please let us know in case of any queries.</p>
													<p>Thanks,</p>
													<p>papaeatz Team</p>`,
											email: firebase.auth().currentUser.email,
											subject: "Delivery for " + moment(this.state.dailyOrder.date.toDate()).format("L") + ", PAPAEATZ",
										};
										var res = await axios.post(link + "/e", data);
										var data2 = {
											phone: this.state.dailyOrder.phone,
											message:
												"Thank You for ordering from papaeatz, your food will be delivered on " +
												moment(this.state.dailyOrder.date.toDate()).format("L") +
												" between 5PM-8PM.",
										};
										if (res.data !== null) {
											console.log("Send mail");
											this.setState({
												success: true,
												ordering: false,
											});
											var resp2 = await axios.post(link + "/sendMessage", data2);
											setTimeout(() => {
												window.location = "/dashboard/orders";
											}, 3000);
										} else {
											console.log(res);
											this.setState({
												ordering: false,
											});
										}
									}
								});
						});
					});
			})
			.catch(() => {
				this.setState({
					ordering: false,
				});
			});
	};

	handleOrderChef = () => {
		this.setState({
			ordering: true,
		});
		firebase
			.firestore()
			.collection("dailyorders")
			.doc(this.state.mailInfo.dailyOrderId)
			.update({
				type: "Chef Choice",
			})
			.then(async () => {
				await firebase
					.firestore()
					.collection("users")
					.where("email", "==", firebase.auth().currentUser.email)
					.get()
					.then((snap) => {
						snap.forEach(async (doc) => {
							var dailyorders = doc.data().dailyorders;
							var daily = {
								id: this.state.mailInfo.dailyOrderId,
								date: new Date(),
							};
							dailyorders.push(daily);
							await firebase
								.firestore()
								.collection("users")
								.doc(doc.id)
								.update({
									dailyorders: dailyorders,
								})
								.then(async () => {
									await firebase
										.firestore()
										.collection("mails")
										.doc(this.props.match.params.id)
										.update({
											used: true,
										})
										.then(async () => {
											var data = {
												message: `<p>You left the order to be selected by the chef</p>
												<p>Delivery Date :${moment(this.state.dailyOrder.date.toDate()).format("L")}</p>
												<p>Delivery Time : 5PM - 8PM</p>
												<p>Please let us know in case of any queries.</p>
												<p>Thanks,</p>
												<p>papaeatz Team</p>`,
												email: firebase.auth().currentUser.email,
												subject: "Delivery for " + moment(this.state.dailyOrder.date.toDate()).format("L") + ", PAPAEATZ",
											};
											var res = await axios.post("https://us-central1-mamaeatz-2f8ca.cloudfunctions.net/app/e", data);
											var data2 = {
												phone: this.state.currentUser.phone,
												message:
													"Thank You for ordering from papaeatz, your food will be delivered on " +
													moment(this.state.dailyOrder.date.toDate()).format("L") +
													" between 5PM-8PM.",
											};
											var resp2 = await axios.post(link + "/sendMessage", data2);
											if (res.data !== null) {
												console.log("Send mail");
												this.setState(
													{
														success: true,
														ordering: false,
													},
													() => {
														setTimeout(() => {
															window.location = "/dashboard/orders";
														}, 3000);
													}
												);
											} else {
												console.log(res);
											}
										});
								});
						});
					});
			})
			.catch(() => {
				this.setState({
					ordering: false,
				});
			});
	};

	handleSelectedAItems = (e) => {
		this.setState(
			{
				selectedAItems: e,
			},
			() => {
				console.log("146", this.state.selectedAItems);
			}
		);
	};

	handleSelectedASItems = (e) => {
		this.setState(
			{
				selectedASItems: e,
			},
			() => {
				console.log("146", this.state.selectedASItems);
			}
		);
	};

	handleOrderAdditional = async () => {
		console.log(this.state.selectedAItems);
		var selectedItems = [...this.state.selectedAItems, ...this.state.selectedASItems];
		var items = [];
		selectedItems.map((s) => {
			items.push(s.name);
		});
		if (items.length === 0) {
			toast.error("Please select your items !");
		}
	};

	handleOrderAdd = async (e) => {
		console.log(this.state.dailyOrder);
		this.setState({
			ordering: true,
		});
		var dailyOrder = this.state.dailyOrder;
		var selectedItems = [...this.state.selectedAItems, ...this.state.selectedASItems];
		var items = [],
			items1 = [],
			items2 = [],
			amount = 0;
		selectedItems.map((s) => {
			items.push(s.name);
			amount = amount + parseInt(s.price);
		});
		this.state.selectedAItems.map((s) => {
			items1.push(s.name);
		});
		this.state.selectedASItems.map((s) => {
			items2.push(s.name);
		});
		var check = await this.handleStripPayment(e, amount);
		if (check) {
			await firebase
				.firestore()
				.collection("dailyorders")
				.add({
					name: dailyOrder.name,
					email: dailyOrder.email,
					selectedItems: items1,
					selectedSItems: items2,
					address: dailyOrder.address,
					zip: dailyOrder.zip,
					state: dailyOrder.state,
					city: dailyOrder.city,
					date: dailyOrder.date.toDate(),
					phone: dailyOrder.phone,
					type: "User Choice",
					varient: "additional",
					amount: amount,
				})
				.then(async (res) => {
					await firebase
						.firestore()
						.collection("users")
						.where("email", "==", firebase.auth().currentUser.email)
						.get()
						.then((snap) => {
							snap.forEach(async (doc) => {
								var dailyorders = doc.data().dailyorders;
								var daily = {
									id: res.id.toString(),
									date: new Date(),
								};
								dailyorders.push(daily);
								await firebase
									.firestore()
									.collection("users")
									.doc(doc.id)
									.update({
										dailyorders: dailyorders,
									})
									.then(async () => {
										this.handleOrder("additional", items1, items2);
									});
							});
						});
				});
		} else {
			toast.error("Payment Failed!");
			this.setState({
				ordering: false,
			});
		}
	};

	handleStripPayment = async (e, total) => {
		console.log(e);
		var data = {
			token: e,
			price: total,
			address: this.state.dailyOrder.address,
			name: this.state.dailyOrder.name,
			city: this.state.dailyOrder.city,
			state: this.state.dailyOrder.state,
		};
		const res = await axios.post(link + "/payAdditional", data);
		console.log(res.data);
		if (res.data.type === "success") {
			console.log(res.data.value);
			return res.data;
		} else {
			return null;
		}
	};

	render() {
		var amount = 0;
		var selectedItems = [...this.state.selectedAItems, ...this.state.selectedASItems];
		var amount = 0;
		selectedItems.map((s) => {
			amount = amount + parseInt(s.price);
		});
		return (
			<div className='sym-container'>
				<ToastContainer />
				{this.state.loading ? (
					<Lottie options={{ animationData: loading }} width={200} height={200} />
				) : (
					<div className='weekly-menu-container'>
						{this.state.NF ? (
							<h1>Invalid Page Access</h1>
						) : (
							<>
								{this.state.showAdditional === false ? (
									<>
										<Breadcrumb
											title={"Select Your Meal : Delivery for " + moment(this.state.dailyOrder.date.toDate()).format("L")}
											subtitle={this.state.dailyOrder.date}
										/>
										{this.state.ordering ? (
											<div style={{ margin: "1rem 0" }}>
												<Lottie options={{ animationData: loading }} width={80} height={80} />
											</div>
										) : (
											<>
												{this.state.success ? (
													<div className='success'>
														<Lottie options={{ animationData: success }} width={250} height={250} />
														<p>Congrats, your order is being processed</p>
													</div>
												) : (
													<div className='selectmeal'>
														<div className='btn-cont'>
															<button onClick={this.handleOrderChef} type='button'>
																Leave it to Chef
															</button>
															<button onClick={this.handleOrderCheck} type='button'>
																Order
															</button>
														</div>
														<div className='smeal'>
															<SelectMeal
																handleSelectedItems={this.handleSelectedItems}
																handleSelectedSItems={this.handleSelectedSItems}
																count={this.state.subscriptionDetails.items}
																count2={this.state.subscriptionDetails.items}
																showPrice={false}
																prev={this.state.dailyOrder.selectedItems.length > 0}
																selectedItems={this.state.selectedItems}
																selectedSItems={this.state.selectedSItems}
															/>
														</div>
													</div>
												)}
											</>
										)}
									</>
								) : (
									<>
										<Breadcrumb
											title={
												"Select Your Additional Items : Delivery for " +
												moment(this.state.dailyOrder.date.toDate()).format("L")
											}
										/>
										{this.state.ordering ? (
											<div style={{ margin: "1rem 0" }}>
												<Lottie options={{ animationData: loading }} width={80} height={80} />
											</div>
										) : (
											<>
												{this.state.success ? (
													<div className='success'>
														<Lottie options={{ animationData: success }} width={250} height={250} />
														<p>Congrats, your order is being processed</p>
													</div>
												) : (
													<div className='selectmeal'>
														<div className='btn-cont'>
															{amount > 0 ? (
																<StripeCheckout
																	currency='USD'
																	stripeKey='pk_live_51Hq1RuIIO4Csp3pEnn9eoyDZtkDSK9B3VhqGPSh6Up87LjJeo9mgrihUHcd9frqPsONgJIeCVT5lYwb7fhoFHVvl00XgmN1l70'
																	// stripeKey='pk_test_51HqD0yCjNvkMPS2f9OrIXfSVL37gJA4nD15Yw3snyUSAZaNG3DG5E7eyOFqIFSUS8Nwypy3OyEU9rmhbAHwBqkyd00QEW4i6i4'
																	token={(token) => this.handleOrderAdd(token)}
																	name='PAPAEATZ'
																	amount={amount * 100}>
																	<button onClick={this.handleOrderAdditional} type='button'>
																		Pay : ${amount}.0
																	</button>
																</StripeCheckout>
															) : (
																<button onClick={this.handleOrderAdditional} type='button'>
																	Pay : ${amount}.0
																</button>
															)}
														</div>
														<div className='smeal'>
															<SelectMeal2
																handleSelectedItems={this.handleSelectedAItems}
																handleSelectedSItems={this.handleSelectedASItems}
																count={20}
																count2={20}
																showPrice={true}
															/>
														</div>
													</div>
												)}
											</>
										)}
									</>
								)}
							</>
						)}
					</div>
				)}
				<Modal show={this.state.showAlert} backdrop='static' aria-labelledby='contained-modal-title-vcenter' centered>
					<Modal.Body>
						<p style={{ fontWeight: "bold", fontSize: "20px" }}>You have not selected any Standard items.</p>
						<p style={{ fontSize: "16px" }}>Please click Continue to complete the order or click Cancel to make your selections</p>
					</Modal.Body>
					<Modal.Footer>
						<Button
							onClick={() => {
								this.setState({ showAlert: false, showAddAlert: true });
							}}>
							Continue
						</Button>
						<Button
							onClick={() => {
								this.setState({ showAlert: false });
							}}>
							Cancel
						</Button>
					</Modal.Footer>
				</Modal>
				<Modal show={this.state.showAddAlert} backdrop='static' aria-labelledby='contained-modal-title-vcenter' centered>
					<Modal.Body>
						<p style={{ fontWeight: "bold", fontSize: "20px" }}>Want to order additional items</p>
						<p style={{ fontSize: "16px" }}>
							Please click Yes to proceed ordering additional items or click No to stay at current meal plan
						</p>
					</Modal.Body>
					<Modal.Footer>
						<Button
							onClick={() => {
								this.setState(
									{
										showAddAlert: false,
									},
									() => {
										this.handleOrder("default", [], []);
									}
								);
							}}>
							No
						</Button>
						<Button
							onClick={() => {
								this.setState({ showAddAlert: false, showAdditional: true, success: false });
							}}>
							Yes
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}
