import { NavLink } from "react-router-dom";
import { faArrowRight, faGift } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classes from "./Navbar.module.css";

const Navbar = ({ hej }) => {
  console.log(hej, "NAVBAR PROPS");
  return (
    <header className={classes.header}>
      <nav>
        {hej}
        <ul>
          <div style={{ fontSize: "xx-large", marginRight: "50px" }}>
            <FontAwesomeIcon icon={faArrowRight} /> NSFW
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
