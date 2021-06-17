import React from "react";
import "./checkout.style.css";
import Yourcart from "../../components/yourcart-display/yourcart-display";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";

import firebase, {auth} from 'firebase';

import loading from '../../assets/images/9809-loading.json';
import Lottie from "lottie-react-web";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Checkout extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			tab: 1,
			cart : [],
			loading : true,
			fname : '',
			address : '',
			state : '',
			city : '',
			pincode : '',
			email : '',
			phone : '',
			coupon : '',
			payMode : '',
			totalPay : 0
		};
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				firebase.firestore().collection('users').where('email', '==', user.email)
				.onSnapshot((snap) => {
					snap.docChanges().forEach((change) => {
						this.setState({
							cart : change.doc.data().cart,
							loading : false
						})
					})
				})
			}
		})
	}

	handleChange = (e) => {
		const {name, value} = e.target;
		this.setState({
			[name] : value
		})
	}

	handleNext = () => {
		if (this.state.fname === '' || this.state.address === '' || this.state.state === '' || this.state.city === '' || this.state.pincode === '' || this.state.email === '' || this.state.phone === '') {
			toast.error("Please enter all details");
		}
		else {
			this.setState({
				tab: 2
			})
		}
	}

	handleOrder = () => {
		firebase.firestore().collection('orders').add({
			cart : this.state.cart,
			date : new Date(),
			name : this.state.fname,
			address : this.state.address,
			state : this.state.state,
			city : this.state.city,
			pincode : this.state.pincode,
			email : this.state.pincode,
			phone : this.state.phone,
			payMode : this.state.payMode,
			totalPay : this.state.totalPay,
			coupon : this.state.coupon,
		})
		.then((res) => {
			firebase.firestore().collection("users").where("email", "==", auth().currentUser.email).get()
			.then((snap) => {
				snap.forEach((doc) => {
					var orders = doc.data().orders;
					orders.push(res.id);
					firebase.firestore().collection("users").doc(doc.id).update({
						orders : orders,
						cart : []
					})
					.then(()=>{
						toast.success("Order Placed Successfully !");
						this.setState({
							cart : []
						})
					})
				})
			})
		})
	}

	render() {
    	return (
			<>
			<ToastContainer 
            autoClose={2000}></ToastContainer>
			{
				this.state.loading
				?
				<div className="cont">
					<Lottie
						options={{ animationData: loading }}
						width={200}
						height={200}
					/>
				</div>
				:
				
				<div className="cont">
					<Breadcrumb title={"Safe & Secure checkout!"} />
					<div className="step">
						<div className="customerInfo">
							{
								this.state.tab === 2 
								? 
								(
									<i className="fas fa-check-circle"></i>
								) 
								: 
								null
							}
							<p>CUSTOMER INFORMATION</p>
						</div>
						<div className="line"></div>
						<div className={this.state.tab === 2 ? "paymentInfo" : "paymentInfo muted"}>
							{/* <i className="fas fa-times"></i> */}
							<p>PAYMENT AND CONFIRMATION</p>
						</div>
					</div>
					<div className="cartDetails">
						{
							this.state.tab === 1 
							? 
							(
								<div className="inputs">
									<h2>Customer Information</h2>
									<input
										type="text"
										placeholder="Full Name"
										name="fname"
										id="fullname"
										onChange={this.handleChange}
									/>

									<input
										type="text"
										placeholder="Address"
										name="address"
										id="address"
										onChange={this.handleChange}
									/>


										<input
										type="text"
										placeholder="City"
										name="city"
										id="city"
										onChange={this.handleChange}
										/>
									<div className="region">
										<input
											type="text"
											placeholder="State"
											name="state"
											id="state"
											onChange={this.handleChange}
										/>

										<input
										type="text"
										placeholder="Pincode"
										name="pincode"
										id="pincode"
										onChange={this.handleChange}
										/>
									</div>
									<h2>Contact Information</h2>
									<input
										type="email"
										name="email"
										id="email"
										placeholder="Email"
										onChange={this.handleChange}
									/>
									<input
										type="text"
										name="phone"
										id="phone"
										placeholder="Phone"
										onChange={this.handleChange}
									/>
									<div className="return1">
										<button type="button" onClick={this.handleNext}>
											<p>Continue to payment</p>
										</button>
									</div>
								</div>
							) 
							: 
							(
								<>
									<div className="paymentCart">
										<div className="checkout">
											<h4> Payment </h4>
											<div className="paymentMode">
												<label className="online">
												<input type="radio" value="Online payment" id="online" name="payment"/>
												<div className="circle"></div>
												<p for="online">Online payment</p>
												</label>
												<label className="paypal">
												<input type="radio" value="paypal" id="paypal" name="payment"/>
												<div className="circle"></div>
												<p for="paypal">Paypal</p>
												</label>
												<label className="bank">
												<input type="radio" value="bank transfer" id="bank transfer"name="payment"/>
												<div className="circle"></div>
												<p for="bank transfer">Bank transfer</p>
												</label>
												<label className="cash">
												<input type="radio" value="cash" id="cash" name="payment"/>
												<div className="circle"></div>
												<p for="cash">Cash on delivery</p>
												</label>
												<div className="return">
												<i className="fas fa-arrow-left" onClick={() => {this.setState({ tab: 1 })}}>
													<span>Return</span>
												</i>
												<button type = "button" onClick = {this.handleOrder}>Agree & Pay</button>
												</div>
											</div>
										</div>
									</div>
								</>
							)
						}
						<Yourcart cart = {this.state.cart}/>
					</div>
				</div>
			}
			</>
    	);
  	}
}

export default Checkout;
