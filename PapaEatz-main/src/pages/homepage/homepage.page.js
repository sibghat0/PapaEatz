import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./homepage.style.css";
import CustomerFeedback from "../../components/customerFeeback/customerfeedback.component";
import Spices4 from "./assets/Spices-04.png";
import unHeart from "./assets/Heart-Not-Selected-01.svg";
import heart from "./assets/Heart-Selected-01.svg";
import aboutUs from "../../assets/images/aboutUs.png";
import faq from "../faq/faq";
import WeeklyMenu from "../../../src/components/thisWeeklyMenu/WeeklyMenu";
import how1 from "./assets/how1.png";
import how2 from "./assets/how2.png";
import how3 from "./assets/how3.png";
import how4 from "./assets/how4.png";
import dish1 from "./assets/dish1.png";
import dish2 from "./assets/dish2.png";
import dish3 from "./assets/dish3.png";

class Homepage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tab: 0,
			tab1: 0,
		};
	}

	render() {
		return (
			<div>
				<div className='bg'>
					<div className='alignment'>
						<h5 className='fontColor'>PAPAEATZ</h5>
						<p className='fontBlack fontSize44'>
							HOME STYLED INDIAN VEGETARIAN/NON-VEG/VEGAN/KETO/HEALTHY FOOD DELIVERED RIGHT TO YOUR DOORSTEP.
						</p>
						<h6 className='fontColor toUppercase semibold'>Open for Weekly Subscriptions!!</h6>
						<p className='des-home'>
							Currently Serving - Farmington, Novi, Canton, <br /> Northville and West Bloomfield families across Metro Detroit
						</p>
						<Link to='/Weekly-subscription' className='arrowButton'>
							<div className='orderNowText fontBlack'>Subscribe Now</div>
							<div className='orderNowLink '>
								<div className='fontBlack' to=''>
									&#8594;
								</div>
							</div>
						</Link>
					</div>
				</div>
				<div className='other-sections'>
					<Container fluid>
						<Row className='rowSpacer text-center fontColor mt-5'>
							<Col className='col-12'>
								<h3 className='fontBlack'>Why Our Subscription?</h3>
							</Col>
						</Row>
						<div className='features1'>
							<div className='feature1-subs'>
								<img src={dish1} alt='img' />
								<p>
									No Cooking, <br />
									No Cleaning
								</p>
							</div>
							<div className='feature1-subs'>
								<img src={dish2} alt='img' />
								<p>
									No Grocery Shopping,
									<br /> No Driving
								</p>
							</div>
							<div className='feature1-subs'>
								<img src={dish3} alt='img' />
								<p>
									No Commitments,
									<br /> New Recipes Every Week
								</p>
							</div>
						</div>

						<div className='subscription-banner'>
							<h1>Signup and Save with our introductory prices</h1>
						</div>

						<Row className='rowSpacer text-center fontColor hassleFreeText'>
							<Col className='col-12'>{/* <p>HASSLE-FREE ORDERING</p> */}</Col>
							<Col className='col-12'>
								<h3 className='fontBlack'>How to get Papaeatz?</h3>
							</Col>
						</Row>
						<div className='features'>
							<div className='feature-card'>
								<img src={how1} alt='img' />
								<p>Pick your plan</p>
							</div>
							<div className='feature-card'>
								<img src={how2} alt='img' />
								<p>Pick your Delivery Days</p>
							</div>
							<div className='feature-card'>
								<img src={how3} alt='img' />
								<p>Pay Online</p>
							</div>
							<div className='feature-card'>
								<img src={how4} alt='img' />
								<p>Get Food Delivered</p>
							</div>
						</div>

						<Row className='rowSpacer my-2'>
							<Col sm={12} md={6} lg={6}>
								<div className='imgContainer'></div>
							</Col>
							<Col sm={12} md={6} lg={6}>
								<Row>
									<Col className='fontColor aboutUsText toUppercase'>ABOUT OUR SUBSCRIPTION</Col>
								</Row>
								<Row>
									<Col className='trustedText'>Food, the way MAMA makes, at your doorstep</Col>
								</Row>
								<Row>
									<Col>
										<span className='prepareText'>
											To prepare and serve you a profound, freshly created Desi food experience. Ease your worries of daily
											cooking and eating unhealthy foods!
										</span>
									</Col>
								</Row>
								<Row>
									<Col>
										<a href='/About' className='fontColor knowMore'>
											{" "}
											Know More &#8594;
										</a>
									</Col>
								</Row>
							</Col>
						</Row>
					</Container>
					{/* 5th section */}
					<Container>
						<Row className='justify-content-center my-5'>
							<Col sm={12} md={4} lg={3} className='my-5'>
								<Row>
									<Col>
										<div className='FAQSSContainer'></div>
									</Col>
								</Row>
								<Row className='rowSpacer'>
									<Col className='mealsPlanText'>
										<span>FAQ’s</span>
									</Col>
								</Row>
								<Row className='rowSpacer'>
									<Col className='prepareText'>
										{/* We offer 1-Day Deliveries to the Northeast and use top-notch packaging to ensure maximum freshness! Visit our
										FAQs page to learn more about how we ship your meals! */}
									</Col>
								</Row>
								<Row className='rowSpacer'>
									<Col>
										<a href='/faq' className='fontColor knowMore'>
											{" "}
											Know More &#8594;
										</a>
									</Col>
								</Row>
							</Col>
							<Col sm={12} md={3} lg={3} className='my-5'>
								<Row>
									<Col>
										<div className='thisWeekMenuContainer'></div>
									</Col>
								</Row>
								<Row className='rowSpacer'>
									<Col className='mealsPlanText'>
										<span>This week’s menu</span>
									</Col>
								</Row>
								<Row className='rowSpacer'>
									<Col className='prepareText'>
										{/* We offer 1-Day Deliveries to the Northeast and use top-notch packaging to ensure maximum freshness! Visit our
										FAQs page to learn more about how we ship your meals! */}
									</Col>
								</Row>
								<Row className='rowSpacer'>
									<Col>
										<a href='/WeeklyMenu' className='fontColor knowMore'>
											{" "}
											Know More &#8594;
										</a>
									</Col>
								</Row>
							</Col>
						</Row>
					</Container>
				</div>
			</div>
		);
	}
}

export default Homepage;
