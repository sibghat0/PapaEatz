import React from "react";
import "./Item-No.css";

export default class ItemNo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			itemCounter: 2,
		};
	}

	handleSelectAdd = (e) => {
		if (this.state.itemCounter < 4) {
			this.setState(
				{
					[e.target.id]: this.state[e.target.id] + 1,
				},
				() => {
					this.props.handleItemNo(this.state.itemCounter);
				}
			);
		}
	};

	handleSelectsub = (e) => {
		if (this.state[e.target.id] > 2) {
			this.setState(
				{
					[e.target.id]: this.state[e.target.id] - 1,
				},
				() => {
					this.props.handleItemNo(this.state.itemCounter);
				}
			);
		}
	};

	render() {
		return (
			<div className='form-quantity'>
				<h1>Select the no of items </h1>
				<div className='counter'>
					<span id='itemCounter' onClick={this.handleSelectsub}>
						<i className='fas fa-minus' id='itemCounter' onClick={this.handleSelectsub}></i>
					</span>
					<span>{this.state.itemCounter}</span>
					<span id='itemCounter' onClick={this.handleSelectAdd}>
						<i className='fas fa-plus' id='itemCounter' onClick={this.handleSelectAdd}></i>
					</span>
				</div>
			</div>
		);
	}
}
