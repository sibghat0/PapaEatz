import React from "react";
import "./selectedsubscription.css";
import Calendar from "react-calendar";
import ims from "../../assets/images/Chip-and-dip-platter-3.jpg";
import ItemNo from "../Item-No/Item-No";
import DaysNo from "../Days-No/Days-No";
import ExtraItem from "../Extra-Item/Extra-Item";
import InfoForm from "../info-form/info-form";
import SelectMeal from "../selectMeal/selectMeal";
import Lottie from "lottie-react-web";
import success from "../../assets/images/7698-success.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebase, { auth } from "firebase";
import axios from "axios";
import moment from "moment";
import link from "../../fetchPath";
import "react-calendar/dist/Calendar.css";

export default class Selectedsubscrption extends React.Component {
	constructor(props) {
		super(props);
		var min = new Date();
		min.setDate(min.getDate() + 3);
		this.handleDayChange = this.handleDayChange.bind(this);
		this.state = {
			max: 0,
			minDate: min,
			overlay: false,
			loading: true,
			extra: [],
			selectedItems: [],
			selectedItems2: [],
			dayCounter: 0,
			tab: 1,
			success: false,
			itemNo: 2,
			itemDays: 1,
			mode: "Online",
			data: [],
			total: 0,
			date: new Date(),
			selectedDays: [],
			selectedDay: null,
			sDays: ["Sunday"],
			zips: [],
			ordering: false,
			itemCost: 0,
			itemDel: 0,
			chargeDate: null,
		};
	}

	componentDidMount() {
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
	}

	handleSelectStartDate = (e) => {
		var date = e;
		date.setHours(0);
		date.setMinutes(0);
		this.setState({
			selectedDay: date,
			showCalender: false,
		});
	};

	handleTabBack = () => {
		this.setState({
			tab: this.state.tab - 1,
		});
	};

	handleItemNo = (e) => {
		this.setState({
			itemNo: e,
		});
	};

	handleItemDays = (e) => {
		var days = ["Sunday", "Tuesday", "Thursday"];
		var sDays = [];
		days.map((d) => {
			if (sDays.length < e) {
				sDays.push(d);
			}
		});
		this.setState({
			itemDays: e,
			sDays: sDays,
		});
	};

	handleForm = (e) => {
		this.setState({
			data: e,
		});
		console.log(e);
	};

	handleMode = (e) => {
		this.setState({
			mode: e,
		});
	};

	handleStripPayment = async (e) => {
		var dateString = moment(this.state.selectedDay).format("YYYY/MM/DD");
		var date = new Date(dateString);
		date.setDate(date.getDate() - 2);
		date.setHours(23);
		date.setMinutes(59);
		date.setSeconds(59);
		this.setState({
			chargeDate: date,
		});
		var data = {
			token: e,
			price: this.state.itemNo * this.state.itemCost * this.state.itemDays + this.state.itemDel * this.state.itemDays,
			startTime: moment(date, "YYYY.MM.DD").unix(),
		};
		const res = await axios.post(link + "/pay", data);
		if (res.data.type === "success") {
			return res.data;
		} else {
			return {
				type: "error",
			};
		}
	};

	handleSubmit = async (e) => {
		if (this.state.itemDays === this.state.sDays.length) {
			var dateString = moment(this.state.selectedDay).format("YYYY/MM/DD");
			var date = new Date(dateString);
			date.setDate(date.getDate() - 2);
			var total = this.state.itemNo * this.state.itemCost * this.state.itemDays + this.state.itemDel * this.state.itemDays;
			this.setState({
				ordering: true,
			});
			var check = await this.handleStripPayment(e);
			if (check.type === "success") {
				firebase
					.firestore()
					.collection("orders")
					.add({
						date: this.state.date,
						name: this.state.data.name,
						address: this.state.data.address,
						state: this.state.data.state,
						city: this.state.data.city,
						pincode: this.state.data.pincode,
						email: this.state.data.email,
						phone: this.state.data.phone,
						days: this.state.itemDays,
						items: this.state.itemNo,
						startDay: this.state.selectedDay,
						total: total,
						selectedDays: this.state.sDays,
						status: "Active",
						subscriptionId: check.subscriptionId,
						priceId: check.priceId,
						productId: check.productId,
						customerId: check.customerId,
						endDate: "",
						mealBox: 0,
						chargeDate: this.state.chargeDate,
					})
					.then((res) => {
						firebase
							.firestore()
							.collection("users")
							.where("email", "==", auth().currentUser.email)
							.get()
							.then((snap) => {
								snap.forEach((doc) => {
									var orders = doc.data().orders;
									orders.push(res.id);
									firebase
										.firestore()
										.collection("users")
										.doc(doc.id)
										.update({
											orders: orders,
											address: this.state.data.address,
											phone: this.state.data.phone,
											state: this.state.data.state,
											city: this.state.data.city,
											pincode: this.state.data.pincode,
										})
										.then(async () => {
											var data = {
												message: `<h2>Dear ${this.state.data.name},</h2>
												<h3>Thank You for subscribing</h3>
												<p>Invoice Id: ${res.id.toString()}</p>
												<p>Invoice Date: ${moment(new Date()).format("L")}</p>
												<p>Amount: $ ${total}</p>
												<p>Payment Mode: Credit</p>
												<p>Subscription Start Date: ${moment(this.state.selectedDay).format("L")}</p>
												<p>Subscription Charge Date: ${moment(date).format("L")}</p>
												<p>Please let us know in case of any queries.</p>
												<p>Thanks You,</p>
												<p>Papaeatz Team</p>`,
												email: auth().currentUser.email,
												subject: "SUBSCRIPTION PAPAEATZ",
											};
											var resp = await axios.post(link + "/e", data);
											var data2 = {
												phone: this.state.data.phone,
												message: "Thank You, for Subscribing to PAPAEATZ",
											};
											var resp2 = await axios.post(link + "/sendMessage", data2);
											this.setState({
												success: true,
												ordering: false,
											});
											setTimeout(() => {
												window.location = "/dashboard/subscription";
											}, 3000);
										});
								});
							});
					})
					.catch((err) => {
						console.log("165", err);
						this.setState({
							ordering: false,
						});
					});
			} else {
				toast.error("Payment Failed");
				this.setState({
					ordering: false,
				});
			}
		} else {
			toast.error("Select the no of days");
		}
	};

	handleDayChange(day) {
		this.setState({ selectedDay: day });
	}

	handleSDays = (e) => {
		var s = this.state.sDays;
		if (!s.includes(e)) {
			s.push(e);
		}
		var n = [];
		s.reverse().map((item) => {
			if (n.length < this.state.itemDays) {
				n.push(item);
				console.log(n);
			}
		});
		this.setState({
			sDays: n.reverse(),
		});
	};

	handleChange = (e) => {
		this.setState({
			selectedDay: e.target.value,
		});
	};

	handleShowDay = (e) => {
		if (e.date.getDay() === 0 || e.date.getDay() === 2 || e.date.getDay() === 4) {
			return false;
		} else {
			return true;
		}
	};

	render() {
		const { selectedDay } = this.state;
		var min = new Date();
		min.setDate(min.getDate() + 2);
		min =
			min.getFullYear() +
			"-" +
			((min.getMonth() + 1).toString().length > 1 ? min.getMonth() + 1 : "0" + (min.getMonth() + 1).toString()) +
			"-" +
			(min.getDate().toString().length > 1 ? min.getDate() : "0" + min.getDate().toString());
		console.log(min);
		return (
			<div className='container-form'>
				<ToastContainer autoClose={2000}></ToastContainer>
				{this.state.success ? (
					<div className='success'>
						<Lottie options={{ animationData: success }} width={250} height={250} />
						<p>Congrats, your subscription is being processed</p>
					</div>
				) : (
					<>
						<div className='form-detail'>
							<h1>Subscription Pack</h1>
							<ItemNo handleItemNo={(e) => this.handleItemNo(e)} />
							<DaysNo handleItemDays={(e) => this.handleItemDays(e)} />
							<div className='form-calender'>
								<div className='selected-meal-day'>
									<h1>Choose Days</h1>
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
								<div className='select-day'>
									<h1>Choose a start date of service</h1>
									{this.state.selectedDay ? (
										<p
											onClick={() => {
												this.setState({
													showCalender: true,
												});
											}}>
											{moment(this.state.selectedDay).format("L")}
										</p>
									) : (
										<p
											onClick={() => {
												this.setState({
													showCalender: true,
												});
											}}>
											Please select a start date
										</p>
									)}
									{this.state.showCalender ? (
										<div className='startChooser'>
											<Calendar
												minDate={this.state.minDate}
												tileDisabled={this.handleShowDay}
												onChange={this.handleSelectStartDate}
												value={this.state.selectedDay}
												calendarType='US'
											/>
										</div>
									) : null}
								</div>
							</div>
						</div>
						<div className='preview'>
							<InfoForm
								ordering={this.state.ordering}
								handleSubmit={this.handleSubmit}
								handleForm={(e) => this.handleForm(e)}
								total={this.state.itemNo * this.state.itemCost * this.state.itemDays + this.state.itemDel * this.state.itemDays}
								days={this.state.itemDays}
								itemCost={this.state.itemCost}
								itemDel={this.state.itemDel}
								selectedDay={this.state.selectedDay}
							/>
						</div>
					</>
				)}
			</div>
		);
	}
}
