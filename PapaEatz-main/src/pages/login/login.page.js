import React from "react";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import firebase from "../../config/firebaseConfig";
import loading from "../sign-up/assets/loading.json";

import Lottie from "lottie-react-web";
import "./login.style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			pwd: "",
			loading: false,
		};
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				window.location.href = "/";
			}
		});
	}

	handleChangeData = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value,
		});
	};

	handlelogin = () => {
		if (this.state.email === "") {
			toast.error("Enter your Email");
		} else if (this.state.pwd === "") {
			toast.error("Enter your Password");
		} else {
			this.setState({
				loading: true,
			});
			firebase
				.firestore()
				.collection("users")
				.where("email", "==", this.state.email)
				.get()
				.then((querySnapshot) => {
					if (querySnapshot.size === 0) {
						toast.error("No user found");
						this.setState({
							loading: false,
						});
					} else {
						firebase
							.auth()
							.signInWithEmailAndPassword(this.state.email, this.state.pwd)
							.then(() => {
								window.location.href = "/";
							})
							.catch((error) => {
								toast.error(error.message);
								this.setState({
									loading: false,
								});
							});
					}
				});
		}
	};

	render() {
		return (
			<>
				<ToastContainer />
				<Breadcrumb title='Secure Login' />
				<div className='login'>
					<div className='social-login'></div>
					<div className='login-form'>
						<label>Email</label>
						<input type='email' name='email' onChange={this.handleChangeData}></input>
						<div className='label'>
							<label>Password</label>
							<span
								onClick={() => {
									window.location = "/Recover";
								}}>
								<label style={{ cursor: "pointer" }}>Forgot your password?</label>
							</span>
						</div>
						<input type='password' name='pwd' onChange={this.handleChangeData}></input>
						<div className='sign-in'>
							{this.state.loading ? (
								<div className='loader'>
									<Lottie options={{ animationData: loading }} width={50} height={50} />
								</div>
							) : (
								<button type='button' onClick={this.handlelogin}>
									Sign in
								</button>
							)}
							<p>
								New Customer? <a href='/Signup'>Sign up</a>
							</p>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default Login;
