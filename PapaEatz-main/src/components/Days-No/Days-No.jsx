import React from "react";
import "./Days-No.css";

export default class DaysNo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dayCounter: 1,
		};
	}

	handleSelectAdd = (e) => {
		if (this.state.dayCounter < 3) {
			this.setState(
				{
					[e.target.id]: this.state[e.target.id] + 1,
				},
				() => {
					this.props.handleItemDays(this.state.dayCounter);
				}
			);
		}
	};

	handleSelectsub = (e) => {
		if (this.state[e.target.id] > 1) {
			this.setState(
				{
					[e.target.id]: this.state[e.target.id] - 1,
				},
				() => {
					this.props.handleItemDays(this.state.dayCounter);
				}
			);
		}
	};

	render() {
		return (
			<div className='form-days'>
				<h1>Select the no of days </h1>
				<div className='counter'>
					<span id='dayCounter' onClick={this.handleSelectsub}>
						<i className='fas fa-minus' id='dayCounter' onClick={this.handleSelectsub}></i>
					</span>
					<span>{this.state.dayCounter}</span>
					<span id='dayCounter' onClick={this.handleSelectAdd}>
						<i className='fas fa-plus' id='dayCounter' onClick={this.handleSelectAdd}></i>
					</span>
				</div>
			</div>
		);
	}
}
