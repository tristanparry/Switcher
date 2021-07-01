import React, { useState, useEffect } from 'react'
import logo from './SVG/logo.svg'
import arrows from './SVG/arrows.svg'
import Row from './Row';
import './App.css'

export default function Converter() {
    // DEFINING REACT STATE FOR THE CONVERTER
    // Destructures all individual states into corresponding variables and mutator functions
    const [currencyTypesList, setCurrencyTypesList] = useState([]);
    const [firstRowCurrency, setFirstRowCurrency] = useState("USD");
    const [secondRowCurrency, setSecondRowCurrency] = useState("CAD");
    const [amount, setAmount] = useState(1);
    const [isFirstRowAmount, setIsFirstRowAmount] = useState(true);
    const [conversionFactor, setConversionFactor] = useState();

    // CALLED ONLY THE FIRST TIME APPLICATION LOADS (EMPTY ARRAY AS SECOND ARGUMENT)
    useEffect(() => {
        fetch(`https://free.currconv.com/api/v7/currencies?apiKey=${process.env.REACT_APP_CURRENCY_API_KEY}`)
        .then(res => res.json())
        .then(data => {
            setCurrencyTypesList([...Object.keys(data.results)]); // Uses the Spread operator (...) to destructure the Object.keys string[] from the API data
        });
    }, []);

    // CALLED EVERY TIME THE FIRSTROWCURRENCY OR SECONDROWCURRENCY IS UPDATED
    useEffect(() => {
        fetch(`https://free.currconv.com/api/v7/convert?q=${firstRowCurrency}_${secondRowCurrency}&compact=ultra&apiKey=${process.env.REACT_APP_CURRENCY_API_KEY}`)
            .then(res => res.json())
            .then(data => {
                setConversionFactor(data[Object.keys(data)[0]].toFixed(4)); // Sets the conversion factor to the value of the first (and only) data object key
            });
    }, [firstRowCurrency, secondRowCurrency]);

    // CALLED IF THE FIRST ROW AMOUNT CHANGES
    function firstRowAmountChange(e) {
        setAmount(e.target.value);
        setIsFirstRowAmount(true);
    }

    // CALLED IF THE SECOND ROW AMOUNT CHANGES
    function secondRowAmountChange(e) {
        setAmount(e.target.value);
        setIsFirstRowAmount(false);
    }

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
            <div className="parent">
                <div className="header">
                    <a href="index.html"><img src={logo} alt="$WITCHEЯ" height="60" /></a>
                </div>
                <div className="bodyContainer">
                    <div className="convertHeadline">
                        <div className="spanGroup">
                            <span><h3>Conve</h3></span>
                            <span className="rFormat"><h3>r</h3></span>
                            <span><h3>t Cu</h3></span>
                            <span className="rFormat"><h3>rr</h3></span>
                            <span><h3>encie$</h3></span>
                        </div>
                    </div>
                    <div className="panelWrapper">
                        <div className="conversionPanel">
                            <div className="rowWrapper">
                                <Row
                                    currencyTypesList={currencyTypesList}
                                    selectedCurrency={firstRowCurrency}
                                    currencyChange={e => setFirstRowCurrency(e.target.value)}
                                    amount={firstRowAmount}
                                    amountChange={firstRowAmountChange}
                                />
                                <img src={arrows} alt="" height="40" />
                                <Row
                                    currencyTypesList={currencyTypesList}
                                    selectedCurrency={secondRowCurrency}
                                    currencyChange={e => setSecondRowCurrency(e.target.value)}
                                    amount={secondRowAmount}
                                    amountChange={secondRowAmountChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="convertFactor">
                        <div className="spanGroup">
                            <span><h3>Conve</h3></span>
                            <span className="rFormat"><h3>r</h3></span>
                            <span><h3>$ion Facto</h3></span>
                            <span className="rFormat"><h3>r</h3></span>
                            <span><h3>: {conversionFactor}</h3></span>
                        </div>
                    </div>
                    <div className="decoration"></div>
                </div>
            </div>
        </>
    );
}
