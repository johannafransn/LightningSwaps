import { NavLink } from "react-router-dom";
import { faGasPump, faGift } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classes from "./Navbar.module.css";

const Navbar = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <div style={{ fontSize: "xx-large", marginRight: "50px" }}>
            <FontAwesomeIcon icon={faGasPump} /> Lightning Swaps
          </div>
          <li>
            <NavLink
              className={(navObj) => (navObj.isActive ? classes.active : "")}
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navObj) => (navObj.isActive ? classes.active : "")}
              to="/swap"
            >
              Swap
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navObj) => (navObj.isActive ? classes.active : "")}
              to="/about"
            >
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
