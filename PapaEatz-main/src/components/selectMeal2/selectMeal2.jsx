import React from "react";
import "./selectMeal2.css";
import Breadcrumb from "../breadcrumb/breadcrumb";
import Card from "../card/card";

import firebase from "firebase";

import Lottie from "lottie-react-web";
import loading from "../../assets/images/9809-loading.json";

class SelectMeal2 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showVeg: props.prev ? true : false,
			showNonVeg: props.prev ? true : false,
			showStandard: props.prev ? true : false,
			icon: false,
			loading: true,
			menu: [],
			selectedItems: props.selectedItems ? props.selectedItems : [],
			selectedSItems: props.selectedSItems ? props.selectedSItems : [],
		};
	}

	componentDidMount() {
		firebase
			.firestore()
			.collection("menu")
			.onSnapshot((snap) => {
				var menus = [];
				snap.docChanges().forEach((change) => {
					menus.push(change.doc.data());
				});
				this.setState({
					menu: menus,
					loading: false,
				});
			});
	}

	handleSelectCardAdd = (e, f) => {
		var selectedItems = this.state.selectedItems;
		var data = {
			name: e,
			price: f,
		};
		if (this.props.count > this.state.selectedItems.length) {
			if (this.props.showPrice) {
				selectedItems.push(data);
			} else {
				selectedItems.push(e);
			}
		}
		this.setState(
			{
				selectedItems: selectedItems,
			},
			() => {
				this.props.handleSelectedItems(this.state.selectedItems);
			}
		);
	};

	handleSelectCardRemove = (e, f) => {
		var selectedItems = this.state.selectedItems;
		for (var i = 0; i < selectedItems.length; i++) {
			if (this.props.showPrice) {
				if (selectedItems[i].name === e) {
					console.log(i);
					selectedItems.splice(i, 1);
					this.setState(
						{
							selectedItems: selectedItems,
						},
						() => {
							this.props.handleSelectedItems(this.state.selectedItems);
						}
					);
					return;
				}
			} else {
				if (selectedItems[i] === e) {
					console.log(i);
					selectedItems.splice(i, 1);
					this.setState(
						{
							selectedItems: selectedItems,
						},
						() => {
							this.props.handleSelectedItems(this.state.selectedItems);
						}
					);
					return;
				}
			}
		}
	};

	handleSelectSCardAdd = (e, f) => {
		var selectedSItems = this.state.selectedSItems;
		var data = {
			name: e,
			price: f,
		};
		if (this.props.count2 > this.state.selectedSItems.length) {
			if (this.props.showPrice) {
				selectedSItems.push(data);
			} else {
				selectedSItems.push(e);
			}
		}
		this.setState(
			{
				selectedSItems: selectedSItems,
			},
			() => {
				this.props.handleSelectedSItems(this.state.selectedSItems);
			}
		);
	};

	handleSelectSCardRemove = (e, f) => {
		var selectedSItems = this.state.selectedSItems;
		for (var i = 0; i < selectedSItems.length; i++) {
			if (this.props.showPrice) {
				if (selectedSItems[i].name === e) {
					console.log(i);
					selectedSItems.splice(i, 1);
					this.setState(
						{
							selectedSItems: selectedSItems,
						},
						() => {
							this.props.handleSelectedSItems(this.state.selectedSItems);
						}
					);
					return;
				}
			} else {
				if (selectedSItems[i] === e) {
					console.log(i);
					selectedSItems.splice(i, 1);
					this.setState(
						{
							selectedSItems: selectedSItems,
						},
						() => {
							this.props.handleSelectedSItems(this.state.selectedSItems);
						}
					);
					return;
				}
			}
		}
	};

	render() {
		return (
			<>
				{this.state.loading ? (
					<Lottie options={{ animationData: loading }} width={100} height={100} />
				) : (
					<div className='selectMeal-container'>
						{/* <h1>Select your first week items</h1> */}
						<div
							className='showMenu'
							onClick={() =>
								this.setState({
									showVeg: !this.state.showVeg,
								})
							}>
							<div className='tile'>Veg</div>
							<div className={this.state.showVeg ? "icon inverted" : "icon"}>
								<i class='fas fa-angle-down'></i>
							</div>
						</div>
						{this.state.showVeg ? (
							<div className='menus'>
								<div className='items'>
									{this.state.menu.map((food) => {
										if (food.category === "Veg" && food.status) {
											return (
												<div className='card-item'>
													<Card
														handleSelectCardAdd={() => this.handleSelectCardAdd(food.title, food.price)}
														handleSelectCardRemove={() => this.handleSelectCardRemove(food.title, food.price)}
														selectedItems={this.state.selectedItems}
														count={this.props.count}
														item={food}
														showPrice={this.props.showPrice}
														showQuanity={true}
														previousOrder={this.state.previousOrder}
													/>
												</div>
											);
										}
									})}
								</div>
							</div>
						) : null}

						<div
							className='showMenu'
							onClick={() =>
								this.setState({
									showNonVeg: !this.state.showNonVeg,
								})
							}>
							<div className='tile'>Non-Veg</div>
							<div className={this.state.showNonVeg ? "icon inverted" : "icon"}>
								<i class='fas fa-angle-down'></i>
							</div>
						</div>
						{this.state.showNonVeg ? (
							<div className='menus'>
								<div className='items'>
									{this.state.menu.map((food) => {
										if (food.category === "Non-Veg" && food.status) {
											return (
												<div className='card-item'>
													<Card
														handleSelectCardAdd={() => this.handleSelectCardAdd(food.title, food.price)}
														handleSelectCardRemove={() => this.handleSelectCardRemove(food.title, food.price)}
														selectedItems={this.state.selectedItems}
														count={this.props.count}
														item={food}
														showPrice={this.props.showPrice}
														showQuanity={true}
													/>
												</div>
											);
										}
									})}
								</div>
							</div>
						) : null}
						<div
							className='showMenu'
							onClick={() =>
								this.setState({
									showStandard: !this.state.showStandard,
								})
							}>
							<div className='tile'>Standard Items</div>
							<div className={this.state.showStandard ? "icon inverted" : "icon"}>
								<i class='fas fa-angle-down'></i>
							</div>
						</div>
						{this.state.showStandard ? (
							<div className='menus'>
								<div className='items'>
									{this.state.menu.map((food) => {
										if (food.category === "Standard" && food.status) {
											return (
												<div className='card-item'>
													<Card
														handleSelectCardAdd={() => this.handleSelectSCardAdd(food.title, food.price)}
														handleSelectCardRemove={() => this.handleSelectSCardRemove(food.title, food.price)}
														selectedItems={this.state.selectedSItems}
														count={this.props.count2}
														item={food}
														showPrice={this.props.showPrice}
														showQuanity={true}
													/>
												</div>
											);
										}
									})}
								</div>
							</div>
						) : null}
					</div>
				)}
			</>
		);
	}
}

export default SelectMeal2;
