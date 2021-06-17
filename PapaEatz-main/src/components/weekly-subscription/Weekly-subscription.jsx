import React from "react";
import Spices from "./assets/Spices.png";
import DownArrow from "./assets/DownArrow.svg";
import Smalltiffin from "../../assets/images/Smalltiffin.svg";
import Mediumtiffin from "../../assets/images/Mediumtiffin.svg";
import Largetiffin from "../../assets/images/Largetiffin.svg";
import dish from "./assets/dish.jpg";
import RightArrow from "./assets/RightArrow.svg";

//  import './Weekly-subscription.css';
import "./style.css";
import MealPlan from "../meal-plan/meal-plan";
import Card from "../card/card";
import Selectedsubscrption from "../selectedsubscription/selectedsubscription";
import firebase from "firebase";

export class Weekly extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			one: false,
			two: false,
			three: false,
			description: false,
			overlay: false,
			loading: true,
			extra: [],
			selectedItems: [],
		};
	}
	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				firebase
					.firestore()
					.collection("orders")
					.where("email", "==", user.email)
					.get()
					.then((snap) => {
						snap.forEach((doc) => {
							if (doc.data().status === "Active") {
								window.location = "/";
							}
						});
					});
			} else {
				window.location = "/login";
			}
		});
	}

	render() {
		return (
			<div className='weekly-sub-container'>
				<div className='bgs'>
					<li>
						<h4>MAMEATZ</h4>
						<h1>Weekly Subscription</h1>
						<h5>ORDERS DELIVERED UPTO THREE TIMES A WEEK</h5>
						<p>
							Currently Serving - Farmington, Novi, Canton,
							<br /> Northville and West Bloomfield families across Metro Detroit
						</p>
					</li>
				</div>
				<div className='ordering'>
					<img src={Spices} alt='spices' />
					<div>
						{/* <h6>CHOOSE COMBO FROM OUR WEEKLY MENU</h6> */}
						<h1>Great meal options for a person or group!</h1>
					</div>
				</div>
				<Selectedsubscrption />
			</div>
		);
	}
}

export default Weekly;
