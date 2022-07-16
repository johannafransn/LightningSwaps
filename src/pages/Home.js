import logo from "../assets/svg/lightningBTC.png";
import { faGasPump } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  return (
    <div class="container">
      <div class="row">
        <div class="col-5">
          <h1>
            <br></br>
            <b>
              Get the fuel you need on all chains{" "}
              <FontAwesomeIcon icon={faGasPump} /> pay with Bitcoin's Lightning
              Network
            </b>
          </h1>
        </div>
        <div class="col-6">
          <img src={logo} style={{ width: "60%" }} />
        </div>
        <div class="col"></div>
      </div>
    </div>
  );
};

//https://api.bitcartcc.com/invoices

export default Home;
