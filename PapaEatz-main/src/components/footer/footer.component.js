import React from "react";
import logo from "../../assets/images/papaeatz.png";
import facebook from "../../assets/images/facebook.svg";
import instagram from "../../assets/images/instagram.svg";
import "./footer.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPinterest,
  faFacebook,
  faTwitter,
  faInstagram,
  faCcPaypal,
  faCcMastercard,
  faCcAmex,
  faCcVisa,
} from "@fortawesome/free-brands-svg-icons";
class Footer extends React.Component {
  render() {
    return (
      <div className="footer-cont">
        <div className="footer-pic">
          <img src={logo} alt="img" />
        </div>
        <div className="footer-des">
          <p>Tasty Food with Quick Service</p>
        </div>
        <div className="footer-social">
          <img src={instagram} alt="Instagram" />
          <img src={facebook} alt="facebook" />
        </div>
      </div>
    );
  }
}
export default Footer;
