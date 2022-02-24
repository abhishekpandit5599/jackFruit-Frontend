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

    

  useEffect(() => {
    if(!localStorage.getItem("auth-token")){
        navigate("/login");
    }
    // eslint-disable-next-line
  }, []);


  // Handle the onClick of calculate button
  const onClickHandler = () => {
    document.getElementById("pop-up").style.display = "block";
    document.getElementById("main-input").style.filter = "blur(2px)";
    checkMetroCity();
  };


  // Check city is Metro or Non Metro
  const checkMetroCity = () => {
    if (city==='Metro') {
      appHRA50();
    } else {
      appHRA40();
    }
  };

  // Calculate the Metro city
  const appHRA50 = () => {
    setBas50((bas * 50) / 100);
    setRent10OfBas(rent - ((bas * 10) / 100));
    const bas50Reasult = Math.min(bas50, rent10OfBas, hra);
    setAppHra(bas50Reasult);
  };


  // Calculate the Non Metro city
  const appHRA40 = () => {
    setBas50((bas * 40) / 100);
    setRent10OfBas(rent - ((bas * 10) / 100));
    const bas50Reasult = Math.min(bas50, rent10OfBas, hra);
    setAppHra(bas50Reasult);
  };


  // Handle after confirm and also call api and save the data in the database
  const confirmSubmitHandler = async () => {
    const taxIncResult = ((Number(bas) + Number(lta) + Number(hra) + Number(fa))) -appHra -inv -med;
    setTaxInc(taxIncResult);
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify({
          bas: bas,
          lta: lta,
          hra: hra,
          fa: fa,
          inv: inv,
          rent: rent,
          cityType: city,
          med: med,
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


  // Handle the final pop up - Tax Inc
  const finalPopUp=()=>{
      document.getElementById('pop-up-taxInc').style.display= "block";
  }

  // Handle the close button of popup
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
              className="display-block-class"
              onChange={(e) => setBas(e.target.value)}
              name="bas"
              value={bas}
              placeholder="Bas"
              type="number"
            />
            <input
              onChange={(e) => setLta(e.target.value)}
              className="display-block-class"
              name="lta"
              value={lta}
              placeholder="LTA"
              type="number"
            />
            <input
              onChange={(e) => setHra(e.target.value)}
              className="display-block-class"
              name="hra"
              value={hra}
              placeholder="HRA"
              type="number"
            />
            <input
              onChange={(e) => setFa(e.target.value)}
              className="display-block-class"
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
              className="display-block-class"
              name="inv"
              value={inv}
              placeholder="Inv"
              type="number"
            />
            <input
              onChange={(e) => setRent(e.target.value)}
              className="display-block-class"
              name="rent"
              value={rent}
              placeholder="Rent"
              type="number"
            />
            <div className="cityTypeLabel">
              City Type : 
              <input onChange={(e)=>setCity(e.target.value)} className="cityType" type="radio" value="Metro" name="cityType" /> Metro
              <input onChange={(e)=>setCity(e.target.value)} className="cityType" type="radio" value="Non metro" name="cityType" /> Non metro
            </div>
            <input
              onChange={(e) => setMed(e.target.value)}
              className="display-block-class"
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
              <td>{hra}</td>
            </tr>
            <tr>
              <th>Actual Rent - 10% BAS :</th>
              <td>{rent10OfBas}</td>
            </tr>
            <tr>
              <th>{city==='Metro'?'50% of BAS : ': '40% of BAS : '}</th>
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
