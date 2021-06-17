import React from "react";
import "./WeeklyMenu.css";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import Card from "../card/card";

import firebase from "firebase";

import Lottie from "lottie-react-web";
import loading from "../../assets/images/9809-loading.json";

class WeeklyMenu extends React.Component {
	constructor() {
		super();
		this.state = {
			showVeg: false,
			showNonVeg: false,
			showStandard: false,
			icon: false,
			loading: true,
			menu: [],
		};
	}

	componentDidMount() {
		firebase
			.firestore()
			.collection("menu")
			.onSnapshot((snap) => {
				var menus = [];
				if (snap.size > 0) {
					snap.docChanges().forEach((change) => {
						var item = change.doc.data();
						item.quantity = 0;
						menus.push(item);
						this.setState(
							{
								menu: menus,
							},
							() => {
								this.setState({
									loading: false,
								});
							}
						);
					});
				} else {
					this.setState({
						loading: false,
					});
				}
			});
	}

	handleSelectAdd = (e) => {
		var items = this.state.menu;
		items.map((food) => {
			if (food.title === e) {
				food.quantity += 1;
			}
		});
		this.setState({
			items: items,
		});
	};

	handleSelectsub = (e) => {
		var items = this.state.menu;
		items.map((food) => {
			if (food.title === e) {
				food.quantity -= 1;
			}
		});
		this.setState({
			items: items,
		});
	};

	render() {
		return (
			<>
				{this.state.loading ? (
					<Lottie options={{ animationData: loading }} width={200} height={200} />
				) : (
					<div className='weekly-menu-container'>
						<Breadcrumb title={"This Week's Menu"} />
						<div className='showMenu' onClick={() => this.setState({ showVeg: !this.state.showVeg })}>
							<div className='tile'>Veg</div>
							<div className={this.state.showVeg ? "icon inverted" : "icon"}>
								<i class='fas fa-angle-down'></i>
							</div>
						</div>
						{this.state.showVeg ? (
							<div className='menus'>
								<div className='items'>
									{this.state.menu.map((food) => {
										if (food.category === "Veg" && food.status === true) {
											return (
												<Card
													item={food}
													showPrice={false}
													handleSelectAdd={(e) => this.handleSelectAdd(e)}
													handleSelectsub={(e) => this.handleSelectsub(e)}
												/>
											);
										}
									})}
								</div>
							</div>
						) : null}
						<div className='showMenu' onClick={() => this.setState({ showNonVeg: !this.state.showNonVeg })}>
							<div className='tile'>Non-Veg</div>
							<div className={this.state.showNonVeg ? "icon inverted" : "icon"}>
								<i class='fas fa-angle-down'></i>
							</div>
						</div>
						{this.state.showNonVeg ? (
							<div className='menus'>
								<div className='items'>
									{this.state.menu.map((food) => {
										if (food.category === "Non-Veg" && food.status === true) {
											return (
												<Card
													item={food}
													showPrice={false}
													handleSelectAdd={(e) => this.handleSelectAdd(e)}
													handleSelectsub={(e) => this.handleSelectsub(e)}
												/>
											);
										}
									})}
								</div>
							</div>
						) : null}
						<div className='showMenu' onClick={() => this.setState({ showStandard: !this.state.showStandard })}>
							<div className='tile'>Standard Items</div>
							<div className={this.state.showStandard ? "icon inverted" : "icon"}>
								<i class='fas fa-angle-down'></i>
							</div>
						</div>
						{this.state.showStandard ? (
							<div className='menus'>
								<div className='items'>
									{this.state.menu.map((food) => {
										if (food.category === "Standard" && food.status === true) {
											return (
												<Card
													item={food}
													showPrice={false}
													handleSelectAdd={(e) => this.handleSelectAdd(e)}
													handleSelectsub={(e) => this.handleSelectsub(e)}
												/>
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

export default WeeklyMenu;
