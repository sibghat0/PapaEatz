import React from "react";
import "./breadcrumb.css";
import DateCountdown from "react-date-countdown-timer";
export default class Breadcrumb extends React.Component {
	render() {
		return (
			<div className='breadcrumb'>
				<p>PAPAEATZ</p>
				<h1>
					<b>{this.props.title}</b>
				</h1>
				{this.props.subtitle ? (
					<p>
						Expires in <DateCountdown dateTo={this.props.subtitle.toDate()} />
					</p>
				) : null}
			</div>
		);
	}
}
