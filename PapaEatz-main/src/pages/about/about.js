import React from "react";
import img from "../../assets/images/aboutUs.png";
import "./about.css";
export default class About extends React.Component {
	render() {
		return (
			<div className='about-container'>
				<img src={img} />
				<div className='content'>
					<h1>About Papaeatz</h1>
					<p>
						We are a group of lifelong foodies inspired by our Mama&#39;s cooking. Taking a cue from her book, inspired by our personal
						experiences and understanding the lessons that the pandemic has taught us, this is an attempt to bring healthy, homestyle
						cooked, quality food to your doorstep.
					</p>
				</div>
			</div>
		);
	}
}
