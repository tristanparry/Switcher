import React, { useState, useEffect } from 'react'
import arrows from '../SVG/arrows.svg'
import currencyBackground from '../SVG/currencybackground.svg'
import Row from '../Row';
import '../App.css'

export default function Converter() {
    // DEFINING REACT STATE FOR THE CONVERTER
    // Destructures all individual states into corresponding variables and mutator functions
    const [unitsList, setUnitsList] = useState([]);
    const [firstRowUnit, setFirstRowUnit] = useState("USD");
    const [secondRowUnit, setSecondRowUnit] = useState("CAD");
    const [amount, setAmount] = useState(1);
    const [isFirstRowAmount, setIsFirstRowAmount] = useState(true);
    const [conversionFactor, setConversionFactor] = useState();

    // CALLED ONLY THE FIRST TIME APPLICATION LOADS (EMPTY ARRAY AS SECOND ARGUMENT)
    useEffect(() => {
        fetch(`https://free.currconv.com/api/v7/currencies?apiKey=${process.env.REACT_APP_CURRENCY_API_KEY}`)
            .then(res => res.json())
            .then(data => {
                setUnitsList([...Object.keys(data.results)]); // Uses the Spread operator (...) to destructure the Object.keys string[] from the API data
            });
    }, []);

    // CALLED EVERY TIME THE FIRSTROWUNIT OR SECONDROWUNIT IS UPDATED
    useEffect(() => {
        fetch(`https://free.currconv.com/api/v7/convert?q=${firstRowUnit}_${secondRowUnit}&compact=ultra&apiKey=${process.env.REACT_APP_CURRENCY_API_KEY}`)
            .then(res => res.json())
            .then(data => {
                setConversionFactor(data[Object.keys(data)[0]].toFixed(4)); // Sets the conversion factor to the value of the first (and only) data object key
            });
    }, [firstRowUnit, secondRowUnit]);

    // MATHEMATICAL CONVERSION PROCESS
    let firstRowAmount, secondRowAmount;
    if (isFirstRowAmount) {
        firstRowAmount = amount;
        secondRowAmount = (amount * conversionFactor).toFixed(2);
    } else {
        secondRowAmount = amount;
        firstRowAmount = (amount / conversionFactor).toFixed(2);
    }

    return (
        <>
            <div className="convertHeadline">
                <div className="spanGroup">
                    <span><h3>Conve</h3></span>
                    <span className="rFormat"><h3>r</h3></span>
                    <span><h3>t Cu</h3></span>
                    <span className="rFormat"><h3>rr</h3></span>
                    <span><h3>encies</h3></span>
                </div>
            </div>
            <div className="panelWrapper">
                <div className="conversionPanel">
                    <div className="rowWrapper">
                        <Row
                            unitsList={unitsList}
                            selectedUnit={firstRowUnit}
                            unitChange={e => setFirstRowUnit(e.target.value)} // UPDATES THE CURRENCY ROW WHEN USER CHOOSES A DIFFERENT ONE
                            amount={firstRowAmount}
                            amountChange={e => { // UPDATES THE AMOUNT ROW WHEN USER TYPES SOMETHING IN
                                setAmount(e.target.value);
                                setIsFirstRowAmount(true);
                            }}
                        />
                        <img src={arrows} alt="" height="40" />
                        <Row
                            unitsList={unitsList}
                            selectedUnit={secondRowUnit}
                            unitChange={e => setSecondRowUnit(e.target.value)} // UPDATES THE CURRENCY ROW WHEN USER CHOOSES A DIFFERENT ONE
                            amount={secondRowAmount}
                            amountChange={e => { // UPDATES THE AMOUNT ROW WHEN USER TYPES SOMETHING IN
                                setAmount(e.target.value);
                                setIsFirstRowAmount(false);
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="convertFactor">
                <div className="spanGroup">
                    <span><h3>Conve</h3></span>
                    <span className="rFormat"><h3>r</h3></span>
                    <span><h3>sion Facto</h3></span>
                    <span className="rFormat"><h3>r</h3></span>
                    <span><h3>: {conversionFactor}</h3></span>
                </div>
            </div>
            <div className="decoration" style={{backgroundImage: `url(${currencyBackground})`}}></div>
        </>
    );
}
