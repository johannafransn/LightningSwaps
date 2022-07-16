import logo from "../assets/svg/lightningBTC.png";
import React, { useCallback, useEffect, useRef, useState } from "react";

import QRCode from "qrcode";
import { CopyToClipboard } from "react-copy-to-clipboard";

//TODO: add ErrorModal
//MetaMask wallet shown/button if connect
//Dropdown for network switch statements

function useInterval(callback, interval) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (interval !== null) {
      let id = setInterval(tick, interval);
      return () => clearInterval(id);
    }
  }, [interval]);
}

export default function Swap({ degree }) {
  const [qrSrc, setQrSrc] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [postChargeData, setPostChargeData] = useState(null);
  const [lightningData, setLightningData] = useState([]);
  const [payreqSubstring, setPayreqSubstring] = useState("");
  const [copied, setCopied] = useState(false);
  const [count, setCount] = useState(1);
  const [pendingPaymentData, setPendingPaymentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const [userBtcInput, setUserBtcInput] = useState(null);
  const [showToast, setShowToast] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [isRunning, setIsRunning] = useState(true);
  const [apiData, setApiData] = useState([]);

  let interval = 10000;

  const getCharge = useCallback(() => {
    ///GET CHARGES
    const getChargesOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "84340dc6-5c25-413d-ad6d-90f6d55a7b49",
      },
    };
    if (showQR && postChargeData) {
      console.log();
      fetch(
        "https://api.opennode.com/v1/charge/" + postChargeData.data.id,
        getChargesOptions
      )
        .then((response) => response.json())
        .then((response) => {
          setPendingPaymentData(response);
          console.log(response, "response from api");
        })
        .catch((err) => console.error(err));
    }

    if (pendingPaymentData && pendingPaymentData.data.status === "unpaid") {
      setLoading(true);
      setShowHistory(true);
    } else if (
      pendingPaymentData &&
      pendingPaymentData.data.status === "paid"
    ) {
      setLoading(false);
    }
  }, [postChargeData, showQR]);

  useEffect(() => {
    getCharge();
  }, [getCharge]);

  useInterval(
    () => {
      if (showQR && postChargeData) {
        console.log("Im inside interval call");
        getCharge();
        setCount(count + 1);
      }
    },
    isRunning ? interval : null
  );

  console.log("1111Inside if in getcharge: postChargeData:", postChargeData);
  console.log("2Inside if in getcharge: postChargeData:", pendingPaymentData);

  const renderInputBox = () => {
    return (
      <>
        <div>
          <input
            type="number"
            class="form-control"
            min="0"
            placeholder="Enter BTC amount..."
            data-name="btc"
            value={userBtcInput}
            onChange={(e) => setUserBtcInput(e.target.value)}
            style={{ width: "50%", float: "left" }}
          ></input>
          <button
            onClick={() => onSendBtcClick()}
            type="button"
            class="btn btn-light"
            style={{ float: "left" }}
          >
            Swap
          </button>
        </div>
        <div>
          <input
            type="number"
            class="form-control "
            min="0"
            disabled="true"
            placeholder={(userBtcInput * 20000) / 0.62 + " matic"}
            data-name="matic"
            onChange={(e) => setUserBtcInput(e.target.value)}
            style={{ width: "50%", float: "left", marginTop: 20 }}
          ></input>

          <div>
            {console.log(showQR, "SHOW QR T OR OF", qrSrc)}
            {showQR ? (
              <div>
                <img src={qrSrc} style={{ width: "20%" }} />{" "}
              </div>
            ) : null}
          </div>
        </div>
      </>
    );
  };

  const postCharge = async () => {
    //POST CHARGES
    const postChargeOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "d41a9a41-ef22-4a84-a409-38011bcdb027",
      },
      body: JSON.stringify({
        order_id: "Merchant's internal order ID",
        ttl: 1440,
        amount: userBtcInput * 100000000,
        currency: "BTC",
      }),
    };
    fetch("https://api.opennode.com/v1/charges", postChargeOptions)
      .then((response) => response.json())
      .then((response) => setPostChargeData(response))
      .catch((err) => console.error(err));
  };

  const onSendBtcClick = async () => {
    setShowQR(true);
    await postCharge();

    QRCode.toDataURL("bäbää").then((resultData) => {
      setQrSrc(resultData);
    }, []);

    console.log(pendingPaymentData, "pending paymentdata");
  };

  const onCopy = () => {
    setCopied(true);

    setTimeout(() => {
      if (postChargeData !== null && showQR) {
        setLightningData(postChargeData.data.lightning_invoice);
        setPayreqSubstring(
          String(postChargeData.data.lightning_invoice.payreq).substr(0, 10) +
            "..." +
            String(postChargeData.data.lightning_invoice.payreq).substr(38, 4)
        );

        QRCode.toDataURL(
          String(postChargeData.data.lightning_invoice.payreq)
        ).then((resultData) => {
          setQrSrc(resultData);
        }, []);
      }
    }, 2000);
  };

  return (
    <div class="container">
      <h1>
        <br></br>
        <b>Swap here </b>
      </h1>
      <div class="mb-3">Dollar value: ${userBtcInput * 20000}</div>

      {renderInputBox()}

      {postChargeData !== null && showQR ? (
        <div>
          {" "}
          <h1>
            <br></br>
            <b>Lightning Invoice </b>
          </h1>{" "}
          <p>
            <b>Expires:</b> {postChargeData.data.lightning_invoice.expires_at}
          </p>
          <p>
            <b>Payreq:</b> {payreqSubstring}
          </p>
          <CopyToClipboard
            onCopy={onCopy}
            text={postChargeData.data.lightning_invoice.payreq}
          >
            <button className="btn btn-dark-copy">
              <span class="sc-jaq3xr-1 doRNia">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </span>{" "}
              Copy Payreq
            </button>
          </CopyToClipboard>
        </div>
      ) : null}

      {pendingPaymentData && pendingPaymentData.data.status === "paid" ? (
        <img
          src="https://res.cloudinary.com/practicaldev/image/fetch/s--aOUQECOb--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://thumbs.gfycat.com/IllSharpCod-max-1mb.gif"
          style={{ width: "20%", marginTop: 10 }}
        />
      ) : null}
      {pendingPaymentData ? (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Address</th>
                <th style={{ textAlign: "right" }}>ID</th>
                <th style={{ textAlign: "right" }}>Amount SAT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> {pendingPaymentData.data.status}</td>
                <td style={{ textAlign: "right" }}>
                  {pendingPaymentData.data.address}
                </td>
                <td style={{ textAlign: "right" }}>
                  {" "}
                  {pendingPaymentData.data.id}
                </td>
                <td style={{ textAlign: "right" }}>
                  {" "}
                  {pendingPaymentData.data.amount}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : null}

      {/*       {showToast ? (
        <ErrorModal
          showToastFromProp={showToast}
          onClose={() => setShowToast(false)}
          errorMsg={errorMsg}
        ></ErrorModal>
      ) : null} */}
    </div>
  );
}
