import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";
import "./faq.css";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";

export default class Faq extends React.Component {
  constructor() {
    super();
    this.state = {
      // showveg: false,
      // icon: false,
    };
  }
  render() {
    return (
      <div className="parent-faq">
        <Breadcrumb title={"Frequently Asked Questions"} />
        <Accordion>
          <div className="s2">
            <h2>
              <b>Our services</b>
            </h2>

            <Card className='faq-box'>
              <Card.Header>
                <Accordion.Toggle as={Button} style={{
                  width: "100%"
                }}
                  variant="link" eventKey="1">
                  <div className="question-cont">
                    <div className="ques">
                      <p>What are your Subscription services?</p>
                    </div>
                    <div className={this.state.showveg ? "icon inverted" : "icon"}>
                      <i class="fas fa-angle-down"></i>
                    </div>
                  </div>
                </Accordion.Toggle>
              </Card.Header>
              {/* </div> */}
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  Papaeatz Subscription is a Homestyle Weekly Meal services delivered to your door. We are currently serving Farmington,
                  Novi, Canton, Northville and West Bloomfield families across Metro Detroit. It will be extended to Troy and other areas
                  shortly.<br /><br />
                  We will be delivering on Tuesday, Thursday and Sunday of every week between 5 PM and 8 PM. The weekly menu will be
                  updated every Tuesday.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className='faq-box'>
              <Card.Header>
                <Accordion.Toggle as={Button}
                  style={{
                    width: "100%"
                  }}
                  variant="link" eventKey="2">
                  <div className="question-cont">
                    <div className="ques">
                      <p>How do I to signup for your subscription service?</p>
                    </div>
                    <div className={this.state.showveg ? "icon inverted" : "icon"}>
                      <i class="fas fa-angle-down"></i>
                    </div>
                  </div>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  <ol style={{ paddingLeft: "1rem" }}>
                    <li>Select the number of Entree items you want for each delivery</li>
                    <li>The number of times you want them delivered every week.</li>
                    <li>Select the day(s) of the week you want the food delivered</li>
                    <li>Provide the name, adress and payment info and you are ready to go</li>
                  </ol>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className='faq-box'>
              <Card.Header>
                <Accordion.Toggle as={Button}
                  style={{
                    width: "100%"
                  }}
                  variant="link" eventKey="3">
                  <div className="question-cont">
                    <div className="ques">
                      <p>What happens after I Subscribe? </p>
                    </div>
                    <div className={this.state.showveg ? "icon inverted" : "icon"}>
                      <i class="fas fa-angle-down"></i>
                    </div>
                  </div>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="3">
                <Card.Body>.......</Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className='faq-box'>
              <Card.Header>
                <Accordion.Toggle as={Button}
                  style={{
                    width: "100%"
                  }}
                  variant="link" eventKey="4">
                  <div className="question-cont">
                    <div className="ques">
                      <p>How does your subscription service work?</p>
                    </div>
                    <div className={this.state.showveg ? "icon inverted" : "icon"}>
                      <i class="fas fa-angle-down"></i>
                    </div>
                  </div>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="4">
                <Card.Body>
                  It is a simple process where you can select the number of Entree items you want for each delivery
                  and the number of times you want them delivered every week. An Entree usually refers to a curry
                  or appetizer.<br /><br />
                  For each Entree item selected, you can select one standard item which includes options like Rice,
                  Roti, Dessert etc.<br /><br />
                  If you choose our subscription service, you may cancel or pause your subscription at anytime by
                  logging in your account and visiting the "Profile-Subscription" page or give us a call! No
                  commitment is required!
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className='faq-box'>
              <Card.Header>
                <Accordion.Toggle as={Button}
                  style={{
                    width: "100%"
                  }}
                  variant="link" eventKey="5">
                  <div className="question-cont">
                    <div className="ques">
                      <p>What is Papaeatz's Weekly Meal style of cooking?</p>
                    </div>
                    <div className={this.state.showveg ? "icon inverted" : "icon"}>
                      <i class="fas fa-angle-down"></i>
                    </div>
                  </div>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="5">
                <Card.Body>
                  Our home style cooking is based on a mix of North and South Indian recipes and the goal will
                  always provide dishes the way "Mama" makes at home
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className='faq-box'>
              <Card.Header>
                <Accordion.Toggle as={Button}
                  style={{
                    width: "100%"
                  }}
                  variant="link" eventKey="6">
                  <div className="question-cont">
                    <div className="ques">
                      <p>Does the menu change?</p>
                    </div>
                    <div className={this.state.showveg ? "icon inverted" : "icon"}>
                      <i class="fas fa-angle-down"></i>
                    </div>
                  </div>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="6">
                <Card.Body>
                  Yes, we change our menu every Week! We strive to provide new meal options every week to keep
                  things interesting, for our customers and us!
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className='faq-box'>
              <Card.Header>
                <Accordion.Toggle as={Button}
                  style={{
                    width: "100%"
                  }}
                  variant="link" eventKey="7">
                  <div className="question-cont">
                    <div className="ques">
                      <p>Can I customize my Meal order?</p>
                    </div>
                    <div className={this.state.showveg ? "icon inverted" : "icon"}>
                      <i class="fas fa-angle-down"></i>
                    </div>
                  </div>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="7">
                <Card.Body>
                  Please record your special requests as part of the order or you may contact us and we'll manually
                  make the changes for you! We will try to do our best to accommodate your request.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className='faq-box'>
              <Card.Header>
                <Accordion.Toggle as={Button}
                  style={{
                    width: "100%"
                  }}
                  variant="link" eventKey="8">
                  <div className="question-cont">
                    <div className="ques">
                      <p>What is your cooking and packaging process?</p>
                    </div>
                    <div className={this.state.showveg ? "icon inverted" : "icon"}>
                      <i class="fas fa-angle-down"></i>
                    </div>
                  </div>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="8">
                <Card.Body>
                  Homestyle Food to us implies that the food nourishment is pure, freshly cooked, balanced, nongreasy,
                  healthy, and delectable. We utilize fresh vegetables, fresh un-canned legumes and lentils,
                  high-quality spices and whole wheat flour. Some dishes might require ghee, butter or nuts.
                  Customers are requested to call us before placing the order, if they have any allergies related
                  questions.<br /><br />
                  Every order will be prepared fresh the same day it will be delivered. We use recyclable plastic
                  containers.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className='faq-box'>
              <Card.Header>
                <Accordion.Toggle as={Button}
                  style={{
                    width: "100%"
                  }}
                  variant="link" eventKey="9">
                  <div className="question-cont">
                    <div className="ques">
                      <p>Do you use chemicals or preservative?</p>
                    </div>
                    <div className={this.state.showveg ? "icon inverted" : "icon"}>
                      <i class="fas fa-angle-down"></i>
                    </div>
                  </div>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="9">
                <Card.Body>
                  No! We have a strict policy against the use of food coloring, MSG, chemicals/preservatives,
                  stabilizers, thickening agents, corn syrup, trans fats, artificial flavorings, and hydrogenated or
                  partially hydrogenated oils.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className='faq-box'>
              <Card.Header>
                <Accordion.Toggle as={Button}
                  style={{
                    width: "100%"
                  }}
                  variant="link" eventKey="10">
                  <div className="question-cont">
                    <div className="ques">
                      <p>How many days is the food good to eat?</p>
                    </div>
                    <div className={this.state.showveg ? "icon inverted" : "icon"}>
                      <i class="fas fa-angle-down"></i>
                    </div>
                  </div>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="10">
                <Card.Body>
                  Generally, the food can stay fresh and healthy for 5-7 days under proper refrigeration
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className='faq-box'>
              <Card.Header>
                <Accordion.Toggle as={Button}
                  style={{
                    width: "100%"
                  }}
                  variant="link" eventKey="11">
                  <div className="question-cont">
                    <div className="ques">
                      <p>Can I cancel, suspend or skip my weekly food subscription?</p>
                    </div>
                    <div className={this.state.showveg ? "icon inverted" : "icon"}>
                      <i class="fas fa-angle-down"></i>
                    </div>
                  </div>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="11">
                <Card.Body>
                  Absolutely! You can skip meals or cancel your subscription by simply logging in our website or
                  calling us
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </div>
          {/* order Procedure */}
          <div className="s2">
            <h2>
              <b>Order Procedure</b>
            </h2>
            <Card className='faq-box'>
              <Card.Header>
                <Accordion.Toggle as={Button}
                  style={{
                    width: "100%"
                  }}
                  variant="link" eventKey="12">
                  <div className="question-cont">
                    <div className="ques">
                      <p>How do i book my MAMA breakfast?</p>
                    </div>
                    <div className={this.state.showveg ? "icon inverted" : "icon"}>
                      <i class="fas fa-angle-down"></i>
                    </div>
                  </div>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="12">
                <Card.Body>
                  You can place an online order by visiting our website <a href="https://sukhmanifoods.com.">https://sukhmanifoods.com.</a>You will be
                  required to register on our site if you are a new user. Once registered, follow the process below:
                  Choose a weekly or daily plan > Choose from our menu > Customize your order > Proceed to make
                  an online payment > Order complete.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className='faq-box'>
              <Card.Header>
                <Accordion.Toggle as={Button}
                  style={{
                    width: "100%"
                  }}
                  variant="link" eventKey="13">
                  <div className="question-cont">
                    <div className="ques">
                      <p>What is your mode of payment and is it safe? </p>
                    </div>
                    <div className={this.state.showveg ? "icon inverted" : "icon"}>
                      <i class="fas fa-angle-down"></i>
                    </div>
                  </div>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="13">
                <Card.Body>
                  You can pay using any credit or debit card, Apple pay, Amazon pay or PayPal online or over the
                  phone. Our online Payment system is end-to-end encrypted secured via Secure Sockets Layer
                  (SSL) 128-bit encryption, and we do not store or see your credit card information.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            {/* <Card className='faq-box'>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="13">
                  <p>Click me! </p>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="13">
                <Card.Body>Hello! I'm another body</Card.Body>
              </Accordion.Collapse>
            </Card> */}
          </div>

          {/* Delivery and Schedule */}
          <div className="s2">
            <h2>
              <b>Delivery and Schedule</b>
            </h2>
            <Card className='faq-box'>
              <Card.Header>
                <Accordion.Toggle as={Button}
                  style={{
                    width: "100%"
                  }}
                  variant="link" eventKey="14">
                  <div className="question-cont">
                    <div className="ques">
                      <p>What is Sukhmani's delivery schedule?</p>
                    </div>
                    <div className={this.state.showveg ? "icon inverted" : "icon"}>
                      <i class="fas fa-angle-down"></i>
                    </div>
                  </div>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="14">
                <Card.Body>
                  In Southern Connecticut, our Tiffins are personally delivered on Wednesdays, Thursdays and
                  Sundays. Depending on your location, they will be delivered between 4:00 pm to 8:30 pm. It is
                  possible that infrequent delays may occur due to traffic or weather-related conditions.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className='faq-box'>
              <Card.Header>
                <Accordion.Toggle as={Button}
                  style={{
                    width: "100%"
                  }}
                  variant="link" eventKey="15">
                  <div className="question-cont">
                    <div className="ques">
                      <p>......</p>
                    </div>
                    <div className={this.state.showveg ? "icon inverted" : "icon"}>
                      <i class="fas fa-angle-down"></i>
                    </div>
                  </div>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="15">
                <Card.Body>
                  For other parts of Connecticut and out of state deliveries, orders placed by Saturday 9PM, will ship
                  on the corresponding Monday and orders placed by Tuesday 9PM will ship on the following
                  Wednesday. We do not ship any orders between Thursday-Sunday. All the orders must be placed
                  one day prior of shipping days. For further questions you can call us at 904-878-0878.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className='faq-box'>
              <Card.Header>
                <Accordion.Toggle as={Button}
                  style={{
                    width: "100%"
                  }}
                  variant="link" eventKey="16">
                  <div className="question-cont">
                    <div className="ques">
                      <p>How do you make sure the food stays fresh during transit?</p>
                    </div>
                    <div className={this.state.showveg ? "icon inverted" : "icon"}>
                      <i class="fas fa-angle-down"></i>
                    </div>
                  </div>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="16">
                <Card.Body>
                  We offer fast and contactless delivery options and use top of the line packaging! Each box
                  contains insulation liners and ice gel packs that keep all meals refrigerated and fresh during
                  transit!
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className='faq-box'>
              <Card.Header>
                <Accordion.Toggle as={Button}
                  style={{
                    width: "100%"
                  }}
                  variant="link" eventKey="17">
                  <div className="question-cont">
                    <div className="ques">
                      <p>Can I track the order?</p>
                    </div>
                    <div className={this.state.showveg ? "icon inverted" : "icon"}>
                      <i class="fas fa-angle-down"></i>
                    </div>
                  </div>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="17">
                <Card.Body>
                  We will keep you updated about your order via email and provide you the tracking number once
                  the order is shipped. We want to make you feel comfortable at every step of your order process, till
                  the food is delivered. You can call us at 904-878-0878 if you have any questions regarding the
                  status of your delivery.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className='faq-box'>
              <Card.Header>
                <Accordion.Toggle as={Button}
                  style={{
                    width: "100%"
                  }}
                  variant="link" eventKey="18">
                  <div className="question-cont">
                    <div className="ques">
                      <p>Are you going to send the meals in multiple packages?</p>
                    </div>
                    <div className={this.state.showveg ? "icon inverted" : "icon"}>
                      <i class="fas fa-angle-down"></i>
                    </div>
                  </div>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="18">
                <Card.Body>
                  We will send the total order together in a package all at once. For example, if you ordered a Small
                  Tiffin which includes 5 meals, then all 5 meals will be sent to you in your package.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className='faq-box'>
              <Card.Header>
                <Accordion.Toggle as={Button}
                  style={{
                    width: "100%"
                  }}
                  variant="link" eventKey="19">
                  <div className="question-cont">
                    <div className="ques">
                      <p>What if I am not home to receive the delivery?</p>
                    </div>
                    <div className={this.state.showveg ? "icon inverted" : "icon"}>
                      <i class="fas fa-angle-down"></i>
                    </div>
                  </div>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="19">
                <Card.Body>
                  If you are not available to take the delivery, then we or the courier service will leave your tiffin
                  outside your door or will be handed over to your concierge. We can also place it at strategic places
                  based on your instruction to us or the carrier. But we don't intrude to private areas.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className='faq-box'>
              <Card.Header>
                <Accordion.Toggle as={Button}
                  style={{
                    width: "100%"
                  }}
                  variant="link" eventKey="20">
                  <div className="question-cont">
                    <div className="ques">
                      <p>Do you deliver or ship in my area?</p>
                    </div>
                    <div className={this.state.showveg ? "icon inverted" : "icon"}>
                      <i class="fas fa-angle-down"></i>
                    </div>
                  </div>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="20">
                <Card.Body>
                  We offer next day Ground Shipping at a flat fee of $10 to all or most parts in the state of VT, ME, NH,
                  MA, RI, CT, NY, NJ, and PA. You can see the shipping options and the charges at the time of
                  checkout before making the final payment. Please contact us via email or phone, to see if when
                  we can get our Delicious and Healthy tiffin to you.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className='faq-box'>
              <Card.Header>
                <Accordion.Toggle as={Button}
                  style={{
                    width: "100%"
                  }}
                  variant="link" eventKey="21">
                  <div className="question-cont">
                    <div className="ques">
                      <p>What areas do you offer free delivery?</p>
                    </div>
                    <div className={this.state.showveg ? "icon inverted" : "icon"}>
                      <i class="fas fa-angle-down"></i>
                    </div>
                  </div>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="21">
                <Card.Body>
                  We offer free delivery to most parts of the Southern Connecticut area!
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </div>
          {/* Report an Issue */}
          <div className="s2">
            <h2>
              <b>Report an Issue</b>
            </h2>
            <Card className='faq-box'>
              <Card.Header>
                <Accordion.Toggle as={Button}
                  style={{
                    width: "100%"
                  }}
                  variant="link" eventKey="22">
                  <div className="question-cont">
                    <div className="ques">
                      <p>If I have to report a damage or any complaints, what should I do?</p>
                    </div>
                    <div className={this.state.showveg ? "icon inverted" : "icon"}>
                      <i class="fas fa-angle-down"></i>
                    </div>
                  </div>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="22">
                <Card.Body>
                  At Sukhmani's we strive and work hard to deliver you very healthy and delicious meals. But, at the
                  end of the day we are human beings; we could make mistakes. Your feedback is our inspiration, it
                  will not just encourage us but also help us to learn! We take pride in our customer service and topnotch
                  meals. If you have issues or report a damage or any packing mistakes, you can contact us by
                  email at info@sukhmanifoods.com or call us at 904-878-0878 with your grievance, and we will
                  swim oceans to resolve it.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </div>
        </Accordion>
      </div>
    );
  }
}
