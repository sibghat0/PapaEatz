import React from "react";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import firebase from "../../config/firebaseConfig";
import loading from "../sign-up/assets/loading.json";

import Lottie from "lottie-react-web";
import "./login.style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ForgetPassword extends React.Component {
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
		} else {
			this.setState({
				loading: true,
			});
			firebase
				.auth()
				.sendPasswordResetEmail(this.state.email)
				.then(() => {
					toast.success("Reset Email Send, check your email");
					this.setState({
						loading: false,
					});
				})
				.catch((error) => {
					toast.error(error.message);
					this.setState({
						loading: false,
					});
				});
		}
	};

	render() {
		return (
			<>
				<ToastContainer />
				<Breadcrumb title='Reset Password' />
				<div className='login'>
					<div className='social-login'></div>
					<div className='login-form'>
						<label>Email</label>
						<input type='email' name='email' onChange={this.handleChangeData}></input>
						<div className='recover'>
							{this.state.loading ? (
								<div className='loader'>
									<Lottie options={{ animationData: loading }} width={50} height={50} />
								</div>
							) : (
								<button type='button' onClick={this.handlelogin}>
									Reset Password
								</button>
							)}
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default ForgetPassword;
