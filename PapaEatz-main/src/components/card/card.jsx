import React from "react";
import ProductDescription from "../productDescription/productDescription";
import "./card.css";
import Spices4 from "../card/assets/Spices4.png";
import { Modal, Button } from "react-bootstrap";

import firebase, { auth } from "firebase";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Lottie from "lottie-react-web";

import loading from "./assets/loading.json";

export default class Card extends React.Component {
	constructor(props) {
		super(props);
		var quantity = 0;
		props.selectedItems &&
			props.selectedItems.map((item) => {
				if (item === props.item.title) {
					quantity += 1;
				}
			});
		this.state = {
			count: 0,
			description: false,
			showModal: false,
			loading: false,
			quantity: quantity,
		};
	}

	handleAdd = () => {
		if (this.props.count > this.props.selectedItems.length) {
			this.setState({
				quantity: this.state.quantity + 1,
			});
			this.props.handleSelectCardAdd();
		} else {
			toast.error("You can only select upto " + this.props.count);
		}
	};

	handleRemove = () => {
		if (this.state.quantity > 0) {
			this.setState({
				quantity: this.state.quantity - 1,
			});
			this.props.handleSelectCardRemove();
		}
	};

	render() {
		return (
			<div className='food-item'>
				<ToastContainer />
				<img className='food-img' src={this.props.item.images[0].uri} alt='dish img' onClick={() => this.setState({ showModal: true })} />
				<h2>{this.props.item.title}</h2>
				{this.props.showPrice ? <h2>${this.props.item.price}</h2> : null}
				{this.props.showQuanity ? (
					<div className='choose-quantity'>
						<button onClick={this.handleRemove}>
							<i className='fas fa-minus'></i>
						</button>
						<p>{this.state.quantity}</p>
						<button onClick={this.handleAdd}>
							<i className='fas fa-plus'></i>
						</button>
					</div>
				) : null}
				<Modal
					show={this.state.showModal}
					size='lg'
					onHide={() => this.setState({ showModal: false })}
					backdrop='static'
					keyboard={false}
					aria-labelledby='contained-modal-title-vcenter'
					centered>
					<Modal.Header closeButton>Meal Description</Modal.Header>
					<Modal.Body>
						<div className='productDescription'>
							<img className='des-img' src={this.props.item.images[0].uri} alt='dish img' />
							<div className='desc'>
								<h3 className='foodName'>{this.props.item.title}</h3>
								<span className='dishName'>{this.props.item.description}</span>
							</div>
							<img className='SpicesImg' src={Spices4} alt='spices-img' />
						</div>
					</Modal.Body>
				</Modal>
			</div>
		);
	}
}
