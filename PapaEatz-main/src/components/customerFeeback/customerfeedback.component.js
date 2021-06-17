import React from 'react';
import {Row, Col} from 'react-bootstrap';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import './customerfeedback.style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook
  } from "@fortawesome/free-brands-svg-icons";
const slides = [
    { title: 'First item', description: 'Lorem ipsum'},
    { title: 'Second item', description: 'Lorem ipsum'}
  ];
class CustomerFeedback extends React.Component {
    render() {
        return(
            <Slider>
            {slides.map((slide, index) => <div key={index}>
            <Row>
                    <Col>
                    <p>
                        <i className="star"></i>
                        <i className="star"></i>
                        <i className="star"></i>
                    </p>
                    </Col>
                </Row>
                <Row className="">
                    <Col>
                     <span className="feedbackText fontColor">
                       “Excellent food & service, will surely order again.”
                     </span>
                    </Col>
                </Row>
                <Row >
                    <Col>
                     <span className="postedBy">
                         Sam Sethi
                     </span>
                    </Col>
                </Row>
                <Row>
                    <Col>
                     <span className="location">
                     Columbia, Washington
                     </span>
                    </Col>
                </Row>
                <Row>
                    <Col>
                      <FontAwesomeIcon icon={faFacebook} size="1x" />
                    </Col>
                </Row>
            </div>)
            }
            </Slider>
        )
    }
}

export default CustomerFeedback;
