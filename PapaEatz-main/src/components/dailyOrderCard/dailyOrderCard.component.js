import React from "react";
import "./dailyOrderCard.style.css";
import firebase from "firebase";

import moment from "moment";

class DailyOrderCards extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			details: {},
			items: [],
			sItems: [],
			loading: true,
			NF: false,
		};
	}

	componentDidMount = () => {
		firebase
			.firestore()
			.collection("dailyorders")
			.doc(this.props.item.id)
			.get()
			.then((snap) => {
				if (snap.exists) {
					this.setState(
						{
							details: snap.data(),
							loading: false,
							NF: false,
						},
						() => {
							var items = [],
								sItems = [];
							this.state.details.selectedItems.map((item) => {
								var found = false;
								var loc;
								items.map((it, index) => {
									if (it.name === item) {
										found = true;
										loc = index;
									}
								});
								if (found) {
									items[loc].quantity = items[loc].quantity + 1;
								} else {
									var data = {
										name: item,
										quantity: 1,
									};
									items.push(data);
								}
							});
							this.state.details.selectedSItems.map((item) => {
								var found = false;
								var loc;
								sItems.map((it, index) => {
									if (it.name === item) {
										found = true;
										loc = index;
									}
								});
								if (found) {
									sItems[loc].quantity = sItems[loc].quantity + 1;
								} else {
									var data = {
										name: item,
										quantity: 1,
									};
									sItems.push(data);
								}
							});
							this.setState({
								items: items,
								sItems: sItems,
							});
						}
					);
				} else {
					this.setState({
						NF: true,
						loading: false,
					});
				}
			});
	};

	render() {
		return (
			<>
				{this.state.loading || this.state.NF ? null : (
					<div className='dailyOrder-container'>
						{this.state.details.varient === "additional" ? <div className='varient'>{this.state.details.varient}</div> : null}
						<div className='dailyorder-date'>
							<h1>Delivery Date : </h1>
							<p>{moment(this.state.details.date.toDate()).format("L")}</p>
						</div>
						<div className='dailyorder-date'>
							<h1>Order Placed Date : </h1>
							<p>{moment(this.props.item.date.toDate()).format("L")}</p>
						</div>
						<div className='dailyorder-items'>
							<h1>Regular Items :</h1>
							<div className='item-list'>
								{this.state.items.map((item, index) => {
									if (index !== this.state.items.length - 1) {
										return (
											<p>
												{item.name} x{item.quantity} ,
											</p>
										);
									} else {
										return (
											<p>
												{item.name} x{item.quantity} .
											</p>
										);
									}
								})}
							</div>
						</div>
						<div className='dailyorder-items'>
							<h1>Standard Items :</h1>
							<div className='item-list'>
								{this.state.sItems.length > 0 ? (
									<>
										{this.state.sItems.map((item, index) => {
											if (index !== this.state.sItems.length - 1) {
												return (
													<p>
														{item.name} x{item.quantity} ,
													</p>
												);
											} else {
												return (
													<p>
														{item.name} x{item.quantity} .
													</p>
												);
											}
										})}
									</>
								) : (
									<p>Nothing was selected</p>
								)}
							</div>
						</div>
					</div>
				)}
			</>
		);
	}
}

export default DailyOrderCards;
