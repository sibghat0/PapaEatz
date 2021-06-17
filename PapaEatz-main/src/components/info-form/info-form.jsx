import React from "react";
import "./info-form.css";
import firebase, { auth } from "firebase";
import loading from "../../assets/images/9809-loading.json";
import Lottie from "lottie-react-web";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Yourcart from "../yourcart-display/yourcart-display";
import StripeCheckout from "react-stripe-checkout";
import { Spinner } from "react-bootstrap";
import PlacesAutocomplete from "react-places-autocomplete";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

class InfoForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tab: 1,
			cart: [],
			loading: true,
			name: "",
			address: "",
			state: "",
			city: "",
			pincode: "",
			email: "",
			phone: "",
			coupon: "",
			payMode: "",
			totalPay: 0,
			zips: [],
			gAddress: "",
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
					.where("email", "==", firebase.auth().currentUser.email)
					.get()
					.then((snap) => {
						snap.forEach((doc) => {
							this.setState({
								name: doc.data().name,
								phone: doc.data().phone,
								address: doc.data().address,
								email: doc.data().email,
								state: doc.data().state,
								city: doc.data().city,
								pincode: doc.data().pincode,
							});
						});
					});
			} else {
			}
		});
	}

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value,
		});
	};

	handleNext = () => {
		if (this.state.fname === "") {
			toast.error("Please enter your name!");
		} else if (this.state.address === "") {
			toast.error("Please enter your address!");
		} else if (this.state.state === "") {
			toast.error("Please enter your state!");
		} else if (this.state.city === "") {
			toast.error("Please enter your city!");
		} else if (this.state.pincode === "") {
			toast.error("Please add your zipcode!");
		} else if (this.state.email === "" && this.state.email.includes("@")) {
			toast.error("Please add your email address!");
		} else if (this.state.phone === "") {
			toast.error("Please add your contact number!");
		} else if (this.props.selectedDay === null) {
			toast.error("Please select your start date!");
		} else {
			if (this.state.zips.includes(this.state.pincode)) {
				this.setState({
					tab: 2,
				});
				var data = {
					name: this.state.name,
					address: this.state.address,
					state: this.state.state,
					city: this.state.city,
					pincode: this.state.pincode,
					email: this.state.email,
					phone: this.state.phone,
				};
				this.props.handleForm(data);
			} else {
				toast.error("Sorry, we currently dont serve the zipcode you entered!", {
					autoClose: 5000,
				});
			}
		}
	};

	handleOrder = (e) => {
		this.props.handleMode(e);
		this.props.handleSubmit();
		this.setState({
			loading: false,
		});
	};

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

	render() {
		return (
			<>
				<ToastContainer autoClose={2000}></ToastContainer>
				<div className='cont'>
					<div className='cartDetails'>
						{this.state.tab === 1 ? (
							<div className='inputs'>
								<h2>Contact Information</h2>
								<input
									value={this.state.email}
									type='email'
									name='email'
									id='email'
									placeholder='Email'
									onChange={this.handleChange}
								/>
								<div className='phone-input'>
									<PhoneInput
										country='US'
										placeholder='Enter phone number'
										value={this.state.phone}
										onChange={(v) => {
											this.setState(
												{
													phone: v,
												},
												() => {
													console.log(v);
												}
											);
										}}
									/>
								</div>
								<h2>Customer Information</h2>
								<input
									value={this.state.name}
									type='text'
									placeholder='Full Name'
									name='name'
									id='fullname'
									onChange={this.handleChange}
								/>
								<PlacesAutocomplete value={this.state.address} onChange={this.handleChange2} onSelect={this.handleSelect}>
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
													const className = suggestion.active ? "suggestion-item--active" : "suggestion-item";
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
								<input value={this.state.city} type='text' placeholder='City' name='city' id='city' onChange={this.handleChange} />
								<div className='region'>
									<input
										value={this.state.state}
										type='text'
										placeholder='State'
										name='state'
										id='state'
										onChange={this.handleChange}
									/>

									<input
										value={this.state.pincode}
										type='text'
										placeholder='Zipcode'
										name='pincode'
										id='pincode'
										onChange={this.handleChange}
									/>
								</div>
								<div className='return1'>
									<button type='button' onClick={this.handleNext}>
										<p>Continue to payment</p>
									</button>
								</div>
							</div>
						) : (
							<>
								<div className='paymentCart'>
									<div className='checkout'>
										<h4> Payment </h4>
										{!this.props.ordering ? (
											<StripeCheckout
												zipCode={true}
												stripeKey='pk_live_51Hq1RuIIO4Csp3pEnn9eoyDZtkDSK9B3VhqGPSh6Up87LjJeo9mgrihUHcd9frqPsONgJIeCVT5lYwb7fhoFHVvl00XgmN1l70'
												// stripeKey='pk_test_51HqD0yCjNvkMPS2f9OrIXfSVL37gJA4nD15Yw3snyUSAZaNG3DG5E7eyOFqIFSUS8Nwypy3OyEU9rmhbAHwBqkyd00QEW4i6i4'
												token={(token) => this.props.handleSubmit(token)}
												name='Subscription Service'
												amount={this.props.total * 100}>
												<div className='stripe-payment-button'>
													<i className='far fa-credit-card'></i>
													<h4>Pay using Credit Card</h4>
												</div>
											</StripeCheckout>
										) : (
											<div
												style={{
													width: "100%",
													display: "flex",
													justifyContent: "center",
												}}>
												<Spinner animation='border' role='status'>
													<span className='sr-only'>Loading...</span>
												</Spinner>
											</div>
										)}
									</div>
								</div>
							</>
						)}
						<Yourcart total={this.props.total} itemDel={this.props.itemDel} days={this.props.days} />
					</div>
				</div>
			</>
		);
	}
}

export default InfoForm;
