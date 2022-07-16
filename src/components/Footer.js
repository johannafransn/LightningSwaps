import { NavLink } from "react-router-dom";
import { faGift } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import logo from "../assets/svg/lightningBTC.png";

import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div class="link-boxes">
          <ul class="box">
            <li class="link_name">Wrap ETH</li>
            <li>
              <img width="20%" src={logo} />
            </li>
          </ul>
          <ul class="box">
            <li class="link_name">Project</li>
            <li>
              {" "}
              <a
                href="https://github.com/johannafransn/WETH-Frontend/graphs/contributors"
                target="_blank"
              >
                Team
              </a>
            </li>
          </ul>
          <ul class="box">
            <li class="link_name">Support</li>
            <li>
              <a href="https://weth.io/" target="_blank">
                FAQ
              </a>
            </li>
          </ul>
          <ul class="box">
            <li class="link_name">Social</li>
            <li>
              <a
                target="_blank"
                href="https://github.com/johannafransn/WETH-Frontend"
              >
                Github
              </a>
            </li>
            <li>
              <a target="_blank" href="https://discord.com/">
                Discord
              </a>
            </li>
            <li>
              <a href="#"></a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
