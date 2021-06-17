import React from "react";
import "./yourcart-display.css";
import ReactTooltip from "react-tooltip";

import firebase, { auth } from "firebase";

export default class Yourcart extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			cart: [],
			showModal: false,
		};
	}

	componentDidMount() {
		this.setState(
			{
				cart: this.props.cart,
			},
			() => {
				console.log(this.state.cart);
			}
		);
	}

	handleDelete = (e) => {
		this.setState(
			{
				cart: this.state.cart.filter((item) => item !== e),
			},
			() => {
				firebase
					.firestore()
					.collection("users")
					.where("email", "==", auth().currentUser.email)
					.get()
					.then((snap) => {
						snap.forEach((doc) => {
							firebase
								.firestore()
								.collection("users")
								.doc(doc.id)
								.update({
									cart: this.state.cart,
								})
								.then(() => {
									console.log("Deleted");
								});
						});
					});
			}
		);
	};

	render() {
		var subTotal = 0;
		return (
			<div className='yourcart'>
				<ReactTooltip />
				<p className='a1'>Your Cart</p>
				<div className='a2'>
					{/* <div className='cart-info'>
						<p>Subtotal</p>
						<p className='k1'>${this.props.total - this.props.days * this.props.itemDel}</p>
					</div> */}
					{/* <div className='cart-info'>
						<p>Shipping</p>
						<p className='k1'>
							<h6 className='price-dis'>$5</h6>${this.props.itemDel}
							<i
								data-tip={"Launch offer $" + (5 - this.props.itemDel) + " discount on every shipping"}
								className='fas fa-info-circle'></i>
						</p>
					</div> */}
					<div className='cart-info main'>
						<p>Total</p>
						<p>${this.props.total}</p>
					</div>
				</div>
			</div>
		);
	}
}
