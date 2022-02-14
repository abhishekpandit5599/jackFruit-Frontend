import React, { useState,useEffect } from "react";
import { ltr } from "semver";
import "./Home.css";
import api from "../../API host path/api";
import { useNavigate } from "react-router-dom";

function Home() {

  const host = api.host;
  let navigate = useNavigate();

  const [bas, setBas] = useState("");
  const [lta, setLta] = useState("");
  const [hra, setHra] = useState("");
  const [fa, setFa] = useState("");
  const [inv, setInv] = useState("");
  const [rent, setRent] = useState("");
  const [city, setCity] = useState("");
  const [med, setMed] = useState("");
  const [appHra, setAppHra] = useState(0);
  const [taxInc, setTaxInc] = useState(0);

  const [bas50, setBas50] = useState(0);
  const [rent10OfBas, setRent10OfBas] = useState(0);

  const metroCities = [
    "ahmedabad",
    "bangalore",
    " chennai",
    "coimbatore",
    "gorakhpur",
    "hyderabad",
    "jaipur",
    "jodhpur",
    "kanpur",
    "kochi",
    "kolkata",
    "kozhikode",
    "madurai",
    "mumbai",
    "nagpur",
    "national capital region",
    "patna",
    "pune",
    "raipur",
    "salem",
    "surat",
    "thiruvananthapuram and visakhapatnam",
  ];

  useEffect(() => {
    if(!localStorage.getItem("auth-token")){
        navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const onClickHandler = () => {
    document.getElementById("pop-up").style.display = "block";
    document.getElementById("main-input").style.filter = "blur(2px)";
    checkMetroCity();
  };

  const checkMetroCity = () => {
    if (metroCities.includes(city.toLowerCase())) {
      appHRA50();
    } else {
      appHRA40();
    }
  };

  const appHRA50 = () => {
    setBas50((bas * 12 * 50) / 100);
    setRent10OfBas(rent * 12 - (bas * 12 * 10) / 100);
    const bas50Reasult = Math.min(bas50, rent10OfBas, hra * 12);
    setAppHra(bas50Reasult);
  };

  const appHRA40 = () => {
    setBas50((bas * 12 * 40) / 100);
    setRent10OfBas(rent * 12 - (bas * 12 * 10) / 100);
    const bas50Reasult = Math.min(bas50, rent10OfBas, hra * 12);
    setAppHra(bas50Reasult);
  };

  const confirmSubmitHandler = async () => {
    const taxIncResult = ((Number(bas) + Number(lta) + Number(hra) + Number(fa)) * 12) -appHra -(inv * 12) -(med * 12);
    setTaxInc(taxIncResult);
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify({
          bas: bas*12,
          lta: lta*12,
          hra: hra*12,
          fa: fa*12,
          inv: inv*12,
          rent: rent*12,
          cityType: city,
          med: med*12,
          appHra: appHra,
          taxInc: taxIncResult,
        }),
      };
      const response = await fetch(`${host}/api/data/adddata`, requestOptions);
      const responseData = await response.json();
      document.getElementById("pop-up").style.display = "none";
      finalPopUp();
    } catch (error) {
      console.log(error);
    }
    finalPopUp();
  };

  const finalPopUp=()=>{
      document.getElementById('pop-up-taxInc').style.display= "block";
  }

  const handleCrossBtn=()=>{
    document.getElementById('pop-up-taxInc').style.display= "none";
    document.getElementById("main-input").style.filter = "blur(0px)";
  }

  return (
    <div className="home-container">
      <div id="main-input" className="input-main-container">
        <h2>Taxable Income</h2>
        <div className="first-input-container input-container">
          <form>
            <input
              onChange={(e) => setBas(e.target.value)}
              name="bas"
              value={bas}
              placeholder="Bas"
              type="number"
            />
            <input
              onChange={(e) => setLta(e.target.value)}
              name="lta"
              value={lta}
              placeholder="LTA"
              type="number"
            />
            <input
              onChange={(e) => setHra(e.target.value)}
              name="hra"
              value={hra}
              placeholder="HRA"
              type="number"
            />
            <input
              onChange={(e) => setFa(e.target.value)}
              name="fa"
              value={fa}
              placeholder="FA"
              type="number"
            />
          </form>
        </div>
        <div className="second-input-container input-container">
          <form>
            <input
              onChange={(e) => setInv(e.target.value)}
              name="inv"
              value={inv}
              placeholder="Inv"
              type="number"
            />
            <input
              onChange={(e) => setRent(e.target.value)}
              name="rent"
              value={rent}
              placeholder="Rent"
              type="number"
            />
            <input
              onChange={(e) => setCity(e.target.value)}
              name="city"
              value={city}
              placeholder="CityType"
              type="text"
            />
            <input
              onChange={(e) => setMed(e.target.value)}
              name="med"
              value={med}
              placeholder="Med"
              type="number"
            />
          </form>
        </div>
        <div className="submit-btn">
          <button
            disabled={
              !bas.length ||
              !ltr.length ||
              !hra.length ||
              !fa.length ||
              !rent.length ||
              !inv.length ||
              !city.length ||
              !med.length
            }
            onClick={onClickHandler}
          >
            Calculate
          </button>
        </div>
      </div>

      <div className="popup-conatiner">
        <div id="pop-up" className="popup-main-container">
          <table>
            <tr>
              <th>Actual HRA :</th>
              <td>{hra*12}</td>
            </tr>
            <tr>
              <th>Actual Rent - 10% BAS :</th>
              <td>{rent10OfBas}</td>
            </tr>
            <tr>
              <th>50%/40% of BAS  :</th>
              <td>{bas50}</td>
            </tr>
            <tr>
              <th>Minimum :</th>
              <td>{appHra}</td>
            </tr>
          </table>
          <button onClick={confirmSubmitHandler}>Confirm</button>
        </div>
      </div>

      <div className="popup-conatiner">
        <div id="pop-up-taxInc" className="popup-main-container">
        <i onClick={handleCrossBtn} className="placeicon cross-icon far fa-times-circle"></i>
          <table>
            <tr>
              <th>Tax Inc :</th>
              <td>{taxInc}</td>
            </tr>
          </table>
        </div>
      </div>

    </div>
  );
}

export default Home;
