import React from "react";
import Login from "../login/login.page";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import firebase from "../../config/firebaseConfig";
import loading from "./assets/loading.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lottie from "lottie-react-web";
import axios from "axios";
import "./SignUp.css";
import link from "../../fetchPath";

var otpGenerator = require("otp-generator");

class SignUp extends React.Component {
	constructor(props) {
		super(props);
		for (var i = 1; i <= 6; i++) {
			this["c" + i] = React.createRef();
		}
		this.state = {
			name: "",
			email: "",
			pwd: "",
			loading: false,
			otpShow: false,
			verify: false,
			otp: "",
			c1: "",
			c2: "",
			c3: "",
			c4: "",
			c5: "",
			c6: "",
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

	handleRegister = async () => {
		if (this.state.name === "") {
			toast.error("Enter your name");
		} else if (this.state.email === "") {
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
				.then(async (querySnapshot) => {
					if (querySnapshot.size === 0) {
						var otp = await otpGenerator.generate(4, {
							upperCase: false,
							specialChars: false,
							alphabets: false,
						});
						this.setState({
							otp: otp,
						});
						var data = {
							message: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

              <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
              <head>
              <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
              <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
              <meta content="width=device-width" name="viewport"/>
              <!--[if !mso]><!-->
              <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
              <!--<![endif]-->
              <title></title>
              <!--[if !mso]><!-->
              <!--<![endif]-->
              <style type="text/css">
                  body {
                    margin: 0;
                    padding: 0;
                  }
              
                  table,
                  td,
                  tr {
                    vertical-align: top;
                    border-collapse: collapse;
                  }
              
                  * {
                    line-height: inherit;
                  }
              
                  a[x-apple-data-detectors=true] {
                    color: inherit !important;
                    text-decoration: none !important;
                  }
                </style>
              <style id="media-query" type="text/css">
                  @media (max-width: 660px) {
              
                    .block-grid,
                    .col {
                      min-width: 320px !important;
                      max-width: 100% !important;
                      display: block !important;
                    }
              
                    .block-grid {
                      width: 100% !important;
                    }
              
                    .col {
                      width: 100% !important;
                    }
              
                    .col_cont {
                      margin: 0 auto;
                    }
              
                    img.fullwidth,
                    img.fullwidthOnMobile {
                      max-width: 100% !important;
                    }
              
                    .no-stack .col {
                      min-width: 0 !important;
                      display: table-cell !important;
                    }
              
                    .no-stack.two-up .col {
                      width: 50% !important;
                    }
              
                    .no-stack .col.num2 {
                      width: 16.6% !important;
                    }
              
                    .no-stack .col.num3 {
                      width: 25% !important;
                    }
              
                    .no-stack .col.num4 {
                      width: 33% !important;
                    }
              
                    .no-stack .col.num5 {
                      width: 41.6% !important;
                    }
              
                    .no-stack .col.num6 {
                      width: 50% !important;
                    }
              
                    .no-stack .col.num7 {
                      width: 58.3% !important;
                    }
              
                    .no-stack .col.num8 {
                      width: 66.6% !important;
                    }
              
                    .no-stack .col.num9 {
                      width: 75% !important;
                    }
              
                    .no-stack .col.num10 {
                      width: 83.3% !important;
                    }
              
                    .video-block {
                      max-width: none !important;
                    }
              
                    .mobile_hide {
                      min-height: 0px;
                      max-height: 0px;
                      max-width: 0px;
                      display: none;
                      overflow: hidden;
                      font-size: 0px;
                    }
              
                    .desktop_hide {
                      display: block !important;
                      max-height: none !important;
                    }
                  }
                </style>
              </head>
              <body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #f8f8f9;">
              <!--[if IE]><div class="ie-browser"><![endif]-->
              <table bgcolor="#f8f8f9" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8f8f9; width: 100%;" valign="top" width="100%">
              <tbody>
              <tr style="vertical-align: top;" valign="top">
              <td style="word-break: break-word; vertical-align: top;" valign="top">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#f8f8f9"><![endif]-->
              <div style="background-color:transparent;">
              <div class="block-grid" style="min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #fff;">
              <div style="border-collapse: collapse;display: table;width: 100%;background-color:#fff;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px"><tr class="layout-full-width" style="background-color:#fff"><![endif]-->
              <!--[if (mso)|(IE)]><td align="center" width="640" style="background-color:#fff;width:640px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
              <div class="col num12" style="min-width: 320px; max-width: 640px; display: table-cell; vertical-align: top; width: 640px;">
              <div class="col_cont" style="width:100% !important;">
              <!--[if (!mso)&(!IE)]><!-->
              <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
              <!--<![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
              <tbody>
              <tr style="vertical-align: top;" valign="top">
              <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 60px; padding-right: 0px; padding-bottom: 12px; padding-left: 0px;" valign="top">
              <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid #BBBBBB; width: 100%;" valign="top" width="100%">
              <tbody>
              <tr style="vertical-align: top;" valign="top">
              <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
              </tr>
              </tbody>
              </table>
              </td>
              </tr>
              </tbody>
              </table>
              <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
              <tbody>
              <tr style="vertical-align: top;" valign="top">
              <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 50px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;" valign="top">
              <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid #BBBBBB; width: 100%;" valign="top" width="100%">
              <tbody>
              <tr style="vertical-align: top;" valign="top">
              <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
              </tr>
              </tbody>
              </table>
              </td>
              </tr>
              </tbody>
              </table>
              <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 40px; padding-left: 40px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, sans-serif"><![endif]-->
              <div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:1.2;padding-top:10px;padding-right:40px;padding-bottom:10px;padding-left:40px;">
              <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 14px;">
              <p style="font-size: 30px; line-height: 1.2; text-align: center; word-break: break-word; mso-line-height-alt: 36px; margin: 0;"><span style="font-size: 30px; color: #2b303a;"><strong>Verify your account with the activation code</strong></span></p>
              </div>
              </div>
              <!--[if mso]></td></tr></table><![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
              <tbody>
              <tr style="vertical-align: top;" valign="top">
              <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 50px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;" valign="top">
              <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid #BBBBBB; width: 100%;" valign="top" width="100%">
              <tbody>
              <tr style="vertical-align: top;" valign="top">
              <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
              </tr>
              </tbody>
              </table>
              </td>
              </tr>
              </tbody>
              </table>
              <!--[if (!mso)&(!IE)]><!-->
              </div>
              <!--<![endif]-->
              </div>
              </div>
              <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
              </div>
              </div>
              </div>
              <div style="background-color:transparent;">
              <div class="block-grid" style="min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #f3fafa;">
              <div style="border-collapse: collapse;display: table;width: 100%;background-color:#f3fafa;">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px"><tr class="layout-full-width" style="background-color:#f3fafa"><![endif]-->
              <!--[if (mso)|(IE)]><td align="center" width="640" style="background-color:#f3fafa;width:640px; border-top: 0px solid transparent; border-left: none; border-bottom: 0px solid transparent; border-right: none;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style='padding-top:0px;padding-bottom:0px' width='30' bgcolor='#FFFFFF'><table role='presentation' width='30' cellpadding='0' cellspacing='0' border='0'><tr><td>&nbsp;</td></tr></table></td><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
              <div class="col num12" style="min-width: 320px; max-width: 640px; display: table-cell; vertical-align: top; width: 580px;">
              <div class="col_cont" style="width:100% !important;">
              <!--[if (!mso)&(!IE)]><!-->
              <div style="border-top:0px solid transparent; border-left:30px solid #FFFFFF; border-bottom:0px solid transparent; border-right:30px solid #FFFFFF; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
              <!--<![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
              <tbody>
              <tr style="vertical-align: top;" valign="top">
              <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;" valign="top">
              <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 4px solid #1AA19C; width: 100%;" valign="top" width="100%">
              <tbody>
              <tr style="vertical-align: top;" valign="top">
              <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
              </tr>
              </tbody>
              </table>
              </td>
              </tr>
              </tbody>
              </table>
              <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
              <tbody>
              <tr style="vertical-align: top;" valign="top">
              <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 25px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;" valign="top">
              <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid #BBBBBB; width: 100%;" valign="top" width="100%">
              <tbody>
              <tr style="vertical-align: top;" valign="top">
              <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
              </tr>
              </tbody>
              </table>
              </td>
              </tr>
              </tbody>
              </table>
              <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 5px; font-family: Tahoma, sans-serif"><![endif]-->
              <div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:5px;padding-left:10px;">
              <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 14px;">
              <p style="font-size: 18px; line-height: 1.2; text-align: center; word-break: break-word; mso-line-height-alt: 22px; margin: 0;"><span style="color: #2b303a; font-size: 18px;"><strong>Use this Code</strong></span></p>
              </div>
              </div>
              <!--[if mso]></td></tr></table><![endif]-->
              <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top: 0px; padding-bottom: 32px; font-family: Tahoma, sans-serif"><![endif]-->
              <div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:1.2;padding-top:0px;padding-right:0px;padding-bottom:32px;padding-left:0px;">
              <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 14px;">
              <p style="font-size: 38px; line-height: 1.2; text-align: center; word-break: break-word; mso-line-height-alt: 46px; margin: 0;"><span style="color: #1aa19c; font-size: 38px;"><span style=""><strong>${otp}</strong></span></span></p>
              </div>
              </div>
              <!--[if mso]></td></tr></table><![endif]-->
              <!--[if (!mso)&(!IE)]><!-->
              </div>
              <!--<![endif]-->
              </div>
              </div>
              <!--[if (mso)|(IE)]></td><td style='padding-top:0px;padding-bottom:0px' width='30' bgcolor='#FFFFFF'><table role='presentation' width='30' cellpadding='0' cellspacing='0' border='0'><tr><td>&nbsp;</td></tr></table></td></tr></table><![endif]-->
              <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
              </div>
              </div>
              </div>
              <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
              </td>
              </tr>
              </tbody>
              </table>
              <!--[if (IE)]></div><![endif]-->
              </body>
              </html>`,
							email: this.state.email,
							subject: "Verify your Mamaeatz Account",
						};
						var resp = await axios.post(link + "/e", data);
						if (resp.data !== null) {
							this.setState({
								otpShow: true,
								loading: false,
							});
							this.c1.current.focus();
						}
					} else {
						toast.error("User already exists!");
						this.setState({
							loading: false,
						});
					}
				});
		}
	};

	handleChangeCode = (e) => {
		var { id, value } = e.target;
		this.setState(
			{
				[id]: value,
			},
			() => {
				console.log(id);
				var num = parseInt(id[1]) + 1;
				var num2 = parseInt(id[1]) - 1;
				var num3 = parseInt(id[1]);
				if (num < 5 && value && num3 !== 4) {
					this["c" + num].current.focus();
				} else if (value === "" && num2 > 0) {
					this["c" + num2].current.focus();
				} else if (num3 === 4) {
					this.handleRegisterFunc();
				}
			}
		);
	};

	handleRegisterFunc = () => {
		var otp = this.state.c1 + this.state.c2 + this.state.c3 + this.state.c4;
		if (otp === this.state.otp) {
			this.setState({
				verify: true,
			});
			firebase
				.firestore()
				.collection("users")
				.add({
					name: this.state.name,
					email: this.state.email,
					orders: [],
					dailyorders: [],
					phone: "",
					address: "",
					state: "",
					city: "",
					pincode: "",
				})
				.then(() => {
					firebase
						.auth()
						.createUserWithEmailAndPassword(this.state.email, this.state.pwd)
						.then(() => {
							this.setState({
								verify: false,
							});
							window.location.href = "/";
						})
						.catch((error) => {
							toast.error(error.message);
							this.setState({
								verify: false,
							});
						});
				})
				.catch((error) => {
					toast.error(error.message);
					this.setState({
						loading: false,
					});
				});
		} else {
			toast.error("Invalid OTP");
		}
	};

	render() {
		var inpuCode = [];
		for (var i = 1; i <= 4; i++) {
			inpuCode.push("c" + i);
		}
		console.log(inpuCode);
		return (
			<>
				<ToastContainer />
				<Breadcrumb title='Register as a new user' />
				{this.state.otpShow === false ? (
					<div className='login'>
						<div className='social-login'></div>
						<div className='login-form'>
							<label>Full Name</label>
							<input type='text' name='name' onChange={this.handleChangeData}></input>
							<label>Email</label>
							<input type='email' name='email' onChange={this.handleChangeData}></input>
							<label>Password</label>
							<input type='password' name='pwd' onChange={this.handleChangeData}></input>
							<div className='sign-up'>
								{this.state.loading ? (
									<div className='loader'>
										<Lottie options={{ animationData: loading }} width={50} height={50} />
									</div>
								) : (
									<button type='button' onClick={this.handleRegister}>
										Register
									</button>
								)}

								<p>
									Already customer? <a href='/login'>login</a>
								</p>
							</div>
						</div>
					</div>
				) : (
					<div className='otp-cont'>
						<div className='vrf'>
							<h1>Enter verification code</h1>
							<p>Enter 4 digit verification code send to your email address</p>
						</div>
						<div className='verification-cont'>
							{inpuCode.map((item) => {
								return (
									<div className='code-verification'>
										<input
											maxLength={1}
											id={item}
											type='text'
											value={this.state[item]}
											onChange={this.handleChangeCode}
											name={item}
											ref={this[item]}
										/>
									</div>
								);
							})}
						</div>
						<div className='button-verification'>
							{this.state.verify ? (
								<div className='loader'>
									<Lottie options={{ animationData: loading }} width={50} height={50} />
								</div>
							) : (
								<>
									<button onClick={() => this.setState({ otpShow: false })}>Cancel</button>
									<button onClick={this.handleRegisterFunc}>Register</button>
								</>
							)}
						</div>
					</div>
				)}
			</>
		);
	}
}

export default SignUp;
