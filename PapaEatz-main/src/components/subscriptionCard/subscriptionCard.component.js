import React from "react";
import "./subscriptionCard.style.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebase from "firebase";
import { Modal, Button, Spinner } from "react-bootstrap";
import moment from "moment";
import axios from "axios";
import link from "../../fetchPath";

class SubscriptionCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			details: {},
			loading: true,
			showChangeModal: false,
			itemCounter: 2,
			itemCounter2: 1,
			sDays: ["Sunday"],
			updating: false,
			pausing: false,
			resuming: false,
			cancelling: false,
			itemCost: 0,
			itemDel: 0,
			change: false,
			selected: {},
			NF: false,
			amount: 0,
		};
	}

	componentDidMount = () => {
		firebase
			.firestore()
			.collection("orders")
			.doc(this.props.item)
			.onSnapshot(async (snap) => {
				if (snap.exists) {
					var data = snap.data();
					if (data.endDate) {
						var diff = new Date() - new Date(this.state.endDate) / 3600000;
						console.log("Diff", diff * 60);
						if (diff * 60 > 0) {
							data.status = "Cancelled";
						}
					}
					var d = {
						id: data.customerId,
					};
					var res = await axios.post(link + "/getUpcoming", d);
					if (res.data != null) {
						console.log("54", res.data);
						if (res.data !== "Error") {
							data["next"] = moment.unix(res.data.created).format("MM/DD/YYYY");
						} else {
							data["next"] = "";
						}
					}
					if (data.chargeDate) {
						if (new Date() > data.chargeDate.toDate()) {
							console.log("PAST");
						} else {
							console.log("FUTURE");
						}
					}
					this.setState(
						{
							details: data,
							loading: false,
							NF: false,
						},
						() => {
							console.log(this.state.details);
						}
					);
				} else {
					this.setState({
						NF: true,
						loading: false,
					});
				}
			});
		firebase
			.firestore()
			.collection("settings")
			.onSnapshot((snap) => {
				snap.docChanges().forEach((change) => {
					this.setState({
						itemCost: change.doc.data().itemRate,
						itemDel: change.doc.data().delivery,
					});
				});
			});
	};

	handlePause = async () => {
		this.setState({
			pausing: true,
		});
		var data2 = {
			subId: this.state.details.subscriptionId,
		};
		var res2 = await axios.post(link + "/pauseSub", data2);
		if (res2.data) {
			if (res2.data.type === "success") {
				toast.success("Subscription Updated");
				this.setState({
					pausing: false,
				});
				await firebase
					.firestore()
					.collection("orders")
					.doc(this.props.item)
					.update({
						status: "Paused",
					})
					.then(async () => {
						var data = {
							message: `<h3>Hi,</h3>
							<p>Your weekly subscription hold request has been confirmed.</p>
								<p>SubscriptionId : ${this.props.item}</p>
								<p>Hold Effective Date: ${moment(new Date()).format("LLL")}</p>
								<p>Thanks,</p>
								<p>Papaeatz Team</p>`,
							email: this.state.details.email,
							subject: "PAPAEATZ – Hold of Subscription",
						};
						var res = await axios.post(link + "/e", data);
						var data2 = {
							phone: this.state.details.phone,
							message: "Your weekly subscription hold request has been confirmed.",
						};
						var res2 = await axios.post(link + "/sendMessage", data2);
					});
			} else {
				this.setState({
					pausing: false,
				});
				toast.error("Subscription Update Error");
			}
		} else {
			this.setState({
				pausing: false,
			});
			toast.error("Subscription Update Error");
		}
	};

	handleResume = async () => {
		this.setState({
			resuming: true,
		});
		var data2 = {
			subId: this.state.details.subscriptionId,
		};
		var res2 = await axios.post(link + "/resumeSub", data2);
		if (res2.data) {
			if (res2.data.type === "success") {
				toast.success("Subscription Updated");
				this.setState({
					resuming: false,
				});
				await firebase
					.firestore()
					.collection("orders")
					.doc(this.props.item)
					.update({
						status: "Active",
					})
					.then(async () => {
						var data = {
							message: `<h3>Hi,</h3>
						<p>Your weekly subscription resume request has been confirmed.</p>
							<p>SubscriptionId : ${this.props.item}</p>
							<p>Resume Effective Date: ${moment(new Date()).format("LLL")}</p>
							<p>Thanks,</p>
							<p>Papaeatz Team</p>`,
							email: this.state.details.email,
							subject: "PAPAEATZ – Resume of Subscription",
						};
						var res = await axios.post(link + "/e", data);
						var data2 = {
							phone: this.state.details.phone,
							message: "Your weekly subscription resume request has been confirmed.",
						};
						var res2 = await axios.post(link + "/sendMessage", data2);
					});
			} else {
				this.setState({
					resuming: false,
				});
				toast.error("Subscription Update Error");
			}
		} else {
			this.setState({
				resuming: true,
			});
			toast.error("Subscription Update Error");
		}
	};

	handleCancel = async () => {
		this.setState({
			cancelling: true,
		});
		var today = new Date();
		today.setDate(today.getDate() - 2);
		today.setHours(0);
		today.setMinutes(0);
		console.log(today);
		if (this.state.details.startDay.toDate() > today) {
			console.log("Past Cancellation");
			var data2 = {
				subId: this.state.details.subscriptionId,
			};
			var res2 = await axios.post(link + "/cancelSubSchedule", data2);
			if (res2.data) {
				if (res2.data.type === "success") {
					toast.success("Subscription Updated");
					var next = this.getNextDayOfWeek(new Date(this.state.details.startDay.toDate()), 6);
					this.setState({
						cancelling: false,
					});
					await firebase
						.firestore()
						.collection("orders")
						.doc(this.props.item)
						.update({
							status: "Cancelled",
							endDate: new Date() > this.state.details.startDay.toDate() ? next : this.state.details.startDay.toDate(),
						})
						.then(async () => {
							var data = {
								message: `<h3>Hi,</h3>
								<p>Your weekly subscription cancel request has been confirmed.</p>
								<p>SubscriptionId : ${this.props.item}</p>
								<p>Cancel Effective Date: ${moment(new Date() > this.state.details.startDay.toDate() ? next : this.state.details.startDay.toDate()).format("L")}</p>
								<p>Thanks,</p>
								<p>Papaeatz Team</p>
								<p>Any deliveries scheduled prior to effective date will be completed as scheduled</p>`,
								email: this.state.details.email,
								subject: "PAPAEATZ – Cancel of Subscription",
							};
							var res = await axios.post(link + "/e", data);
							var data2 = {
								phone: this.state.details.phone,
								message: "Your weekly subscription cancel request has been confirmed.",
							};
							var res2 = await axios.post(link + "/sendMessage", data2);
						});
				} else {
					this.setState({
						cancelling: false,
					});
					toast.error("Subscription Update Error");
				}
			} else {
				this.setState({
					cancelling: false,
				});
				toast.error("Subscription Update Error");
			}
		} else {
			console.log("Future Cancellation");
			var data2 = {
				subId: this.state.details.subscriptionId,
			};
			var res2 = await axios.post(link + "/cancelSubSchedule", data2);
			if (res2.data) {
				if (res2.data.type === "success") {
					toast.success("Subscription Updated");
					this.setState({
						cancelling: false,
					});
					await firebase
						.firestore()
						.collection("orders")
						.doc(this.props.item)
						.update({
							status: "Cancelled",
							endDate: this.state.details.startDay.toDate(),
						})
						.then(async () => {
							var data = {
								message: `<h3>Hi,</h3>
								<p>Your weekly subscription cancel request has been confirmed.</p>
								<p>SubscriptionId : ${this.props.item}</p>
								<p>Cancel Effective Date: ${moment(this.state.details.startDay.toDate()).format("L")}</p>
								<p>Thanks,</p>
								<p>Papaeatz Team</p>
								<p>Any deliveries scheduled to prior effective date will be completed as scheduled</p>`,
								email: this.state.details.email,
								subject: "PAPAEATZ – Cancel of Subscription",
							};
							var res = await axios.post(link + "/e", data);
							var data2 = {
								phone: this.state.details.phone,
								message: "Your weekly subscription cancel request has been confirmed.",
							};
							var res2 = await axios.post(link + "/sendMessage", data2);
						});
				} else {
					this.setState({
						cancelling: false,
					});
					toast.error("Subscription Update Error");
				}
			} else {
				this.setState({
					cancelling: false,
				});
				toast.error("Subscription Update Error");
			}
		}
	};

	getNextDayOfWeek = (date, dayOfWeek) => {
		var resultDate = new Date(date.getTime());

		resultDate.setDate(date.getDate() + ((7 + dayOfWeek - date.getDay()) % 7));
		console.log(resultDate);

		return resultDate;
	};

	handleChangePlan = (e) => {
		this.setState({
			showChangeModal: true,
			selected: e,
		});
	};

	handleClose = () => {
		this.setState({
			showChangeModal: false,
		});
	};

	handleSelectAdd = () => {
		if (this.state.itemCounter < 4) {
			this.setState(
				{
					itemCounter: this.state.itemCounter + 1,
				},
				() => {
					if (this.state.details.items !== this.state.itemCounter) {
						this.setState({
							change: true,
						});
					} else {
						this.setState({
							change: false,
						});
					}
				}
			);
		}
	};

	handleSelectsub = () => {
		if (this.state.itemCounter > 2) {
			this.setState(
				{
					itemCounter: this.state.itemCounter - 1,
				},
				() => {
					if (this.state.details.items !== this.state.itemCounter) {
						this.setState({
							change: true,
						});
					} else {
						this.setState({
							change: false,
						});
					}
				}
			);
		}
	};

	handleSelectAdd2 = () => {
		if (this.state.itemCounter2 < 5) {
			var days = ["Sunday", "Tuesday", "Thursday"];
			var sDays = [];
			days.map((d) => {
				if (sDays.length < this.state.itemCounter2 + 1) {
					sDays.push(d);
				}
			});
			this.setState({
				itemCounter2: sDays.length,
				sDays: sDays,
			});
		}
	};

	handleSelectsub2 = () => {
		if (this.state.itemCounter2 > 1) {
			var days = ["Sunday", "Tuesday", "Thursday"];
			var sDays = [];
			days.map((d) => {
				if (sDays.length < this.state.itemCounter2 - 1) {
					sDays.push(d);
				}
			});
			this.setState({
				itemCounter2: sDays.length,
				sDays: sDays,
			});
		}
	};

	handleSDays = (e) => {
		var s = this.state.sDays;
		if (!s.includes(e)) {
			s.push(e);
		}
		var n = [];
		s.reverse().map((item) => {
			if (n.length < this.state.itemCounter2) {
				n.push(item);
				console.log(n);
			}
		});
		this.setState(
			{
				sDays: n.reverse(),
			},
			() => {
				var diff = true;
				this.state.sDays.map((day) => {
					if (this.state.details.selectedDays.includes(day)) {
						diff = false;
					}
				});
				if (diff || this.state.sDays.length !== this.state.details.selectedDays.length) {
					this.setState({
						change: true,
					});
				} else {
					this.setState({
						change: false,
					});
				}
			}
		);
	};

	handleSavePlan = async () => {
		var d = new Date();
		var date = this.getNextDayOfWeek(new Date(), 0);
		var date2 = this.getNextDayOfWeek(new Date(), 6);
		var total = this.state.itemCounter * this.state.itemCost * this.state.itemCounter2 + this.state.itemDel * this.state.itemCounter2;
		this.setState({
			updating: true,
		});
		var startTime = null;
		var dateString = moment(date).format("YYYY/MM/DD");
		var startTime = new Date(dateString);
		startTime.setDate(startTime.getDate() - 2);
		startTime.setHours(23);
		startTime.setMinutes(59);
		startTime.setSeconds(59);
		var data2 = {
			subId: this.state.details.subscriptionId,
		};
		var res = await axios.post(link + "/cancelSubSchedule", data2);
		if (res.data !== null) {
			if (res.data.type === "success") {
				await firebase
					.firestore()
					.collection("orders")
					.doc(this.props.item)
					.update({
						status: "Pre-Cancelled",
						endDate: date2,
					})
					.then(async () => {
						var data2 = {
							customerId: this.state.details.customerId,
							price: total,
							startTime: moment(startTime, "YYYY.MM.DD").unix(),
						};
						const res2 = await axios.post(link + "/payUpdate", data2);
						if (res2.data !== null) {
							if (res2.data.type === "success") {
								await firebase
									.firestore()
									.collection("orders")
									.add({
										date: d,
										name: this.state.details.name,
										address: this.state.details.address,
										state: this.state.details.state,
										city: this.state.details.city,
										pincode: this.state.details.pincode,
										email: this.state.details.email,
										phone: this.state.details.phone,
										days: this.state.itemCounter2,
										items: this.state.itemCounter,
										startDay: date,
										total: total,
										selectedDays: this.state.sDays,
										status: "Active",
										subscriptionId: res2.data.subscriptionId,
										priceId: res2.data.priceId,
										productId: res2.data.productId,
										customerId: this.state.details.customerId,
										endDate: "",
									})
									.then((res) => {
										var orderID = res.id;
										firebase
											.firestore()
											.collection("users")
											.where("email", "==", firebase.auth().currentUser.email)
											.get()
											.then((snap) => {
												snap.forEach((doc) => {
													var orders = doc.data().orders;
													orders.push(orderID);
													firebase
														.firestore()
														.collection("users")
														.doc(doc.id)
														.update({
															orders: orders,
														})
														.then(async () => {
															var data = {
																message: `<h3>Hi,</h3>
																	<p>Your weekly subscription just got changed</p>
																	<p>Subscription Id : ${orderID.toString()}</p>
																	<p>Subscription Date: ${moment(d).format("L")}</p>
																	<p>Amount:$ ${total}</p>
																	<p>Payment Method: Credit</p>
																	<p>Start Date: ${moment(date).format("L")}</p>
																	<p>Thanks,</p>
																	<p>Papaeatz Team</p>`,
																email: this.state.details.email,
																subject: "PAPAEATZ – Hold of Subscription",
															};
															var res = await axios.post(link + "/e", data);
															var data2 = {
																phone: this.state.details.phone,
																message: "Your weekly subscription has been updated.",
															};
															var res2 = await axios.post(link + "/sendMessage", data2);
															this.setState({
																updating: false,
																showChangeModal: false,
															});
															toast.success("Subscription Updated");
														})
														.catch((err) => {
															console.log(err);
															toast.error("Subscription Update Error");
														});
												});
											})
											.catch((err) => {
												console.log(err);
												toast.error("Subscription Update Error");
											});
									})
									.catch((err) => {
										console.log(err);
										toast.error("Subscription Update Error");
									});
							} else {
								toast.error("Subscription Update Error");
							}
						} else {
							toast.error("Subscription Update Error");
						}
					})
					.catch((err) => {
						console.log(err);
						toast.error("Subscription Update Error");
					});
			}
		}
	};

	render() {
		return (
			<>
				{this.state.loading || this.state.NF ? null : (
					<div className='subscriptionCard-container'>
						<h1>
							Status: <span>{this.state.details.status}</span>
						</h1>
						<h1>
							Selected Days :{" "}
							{this.state.details.selectedDays.map((s) => {
								return <span>{s} </span>;
							})}
						</h1>
						<h1>
							Total Items : <span>{this.state.details.items}</span>
						</h1>
						<h1>
							Name : <span>{this.state.details.name}</span>
						</h1>
						<h1>
							Start Date :{" "}
							<span>
								{moment(
									typeof this.state.details.startDay === "object"
										? this.state.details.startDay.toDate()
										: new Date(this.state.details.startDay)
								).format("L")}
							</span>
						</h1>
						<h1>
							Expiry Date :{" "}
							<span>
								{this.state.details.endDate ? (
									<>
										{moment(
											typeof this.state.details.endDate === "object"
												? this.state.details.endDate.toDate()
												: new Date(this.state.details.endDate)
										).format("L")}
									</>
								) : (
									"N/A"
								)}
							</span>
						</h1>
						<h1>
							Order Date :{" "}
							<span>
								{moment(
									typeof this.state.details.date === "object" ? this.state.details.date.toDate() : new Date(this.state.details.date)
								).format("L")}
							</span>
						</h1>
						<h1>
							Total Amount : <span>${this.state.details.total}</span>
						</h1>
						{this.state.details.next ? (
							<h1>
								Next Charge Date : <span>{this.state.details.next}</span>
							</h1>
						) : null}
						{this.state.details.status !== "Cancelled" && this.state.details.status !== "Pre-Cancelled" ? (
							<>
								{this.state.resuming === true ||
								this.state.pausing === true ||
								this.state.updating === true ||
								this.state.cancelling === true ? (
									<div className='spacer'>
										<Spinner animation='border' role='status'>
											<span className='sr-only'>Loading...</span>
										</Spinner>
									</div>
								) : (
									<div className='button-group'>
										{this.state.details.status === "Paused" ? (
											<button className='pause-resume-button' onClick={this.handleResume}>
												Resume Subscription
											</button>
										) : (
											<>
												{this.state.details.startDay.toDate() < new Date() ? (
													<>
														<button className='change-button' onClick={() => this.handleChangePlan(this.state.details)}>
															Change Plan
														</button>
														<button className='pause-resume-button' onClick={this.handlePause}>
															Pause Subscription
														</button>
													</>
												) : null}
											</>
										)}
										<button className='canc-button' onClick={this.handleCancel}>
											Cancel Subscription
										</button>
									</div>
								)}
							</>
						) : null}
						<Modal backdrop='static' show={this.state.showChangeModal} onHide={this.handleClose}>
							<Modal.Header closeButton>
								<Modal.Title>Change Subscription Plan</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<div>
									<div className='form-quantity'>
										<p>Select the no of items </p>
										<div className='counter'>
											<span onClick={this.handleSelectsub}>
												<i className='fas fa-minus'></i>
											</span>
											<span>{this.state.itemCounter}</span>
											<span onClick={this.handleSelectAdd}>
												<i className='fas fa-plus'></i>
											</span>
										</div>
									</div>
									<div className='form-quantity'>
										<p>Select the no of days </p>
										<div className='counter'>
											<span onClick={this.handleSelectsub2}>
												<i className='fas fa-minus'></i>
											</span>
											<span>{this.state.itemCounter2}</span>
											<span onClick={this.handleSelectAdd2}>
												<i className='fas fa-plus'></i>
											</span>
										</div>
									</div>
									<div className='form-calender'>
										<div className='selected-meal-day'>
											<h4>Choose Days</h4>
											<div className='selected-3meal'>
												<div className='days' onClick={() => this.handleSDays("Sunday")}>
													{this.state.sDays.includes("Sunday") ? (
														<i class='fas fa-check-square'></i>
													) : (
														<i class='far fa-square'></i>
													)}
													<label for='horns'>Sunday</label>
												</div>
												<div className='days' onClick={() => this.handleSDays("Tuesday")}>
													{this.state.sDays.includes("Tuesday") ? (
														<i class='fas fa-check-square'></i>
													) : (
														<i class='far fa-square'></i>
													)}
													<label for='horns'>Tuesday</label>
												</div>
												<div className='days' onClick={() => this.handleSDays("Thursday")}>
													{this.state.sDays.includes("Thursday") ? (
														<i class='fas fa-check-square'></i>
													) : (
														<i class='far fa-square'></i>
													)}
													<label for='horns'>Thursday</label>
												</div>
											</div>
										</div>
									</div>
									<p className='info-alert'>
										<i class='fas fa-info-circle'></i> Changes will take place from next week
									</p>
									<div className='cost'>
										<p>Total:</p>
										<span>
											$
											{this.state.itemCounter * this.state.itemCost * this.state.itemCounter2 +
												this.state.itemDel * this.state.itemCounter2}
										</span>
									</div>
								</div>
							</Modal.Body>
							<Modal.Footer>
								{this.state.updating ? (
									<Spinner animation='border' role='status'>
										<span className='sr-only'>Loading...</span>
									</Spinner>
								) : (
									<>
										<Button variant='secondary' onClick={this.handleClose}>
											Close
										</Button>
										<Button onClick={this.handleSavePlan}>Change Plan</Button>
									</>
								)}
							</Modal.Footer>
						</Modal>
					</div>
				)}
			</>
		);
	}
}

export default SubscriptionCard;
