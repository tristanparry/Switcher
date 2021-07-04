import React, { useState, useEffect } from 'react'
import arrows from '../SVG/arrows.svg'
import timeBackground from '../SVG/timebackground.svg'
import Row from '../Row';
import '../App.css'

// CREATE THE VARIABLE FOR THE NPM CONVERSION API (INSTALLED TO NODE MODULES OF THIS PROGRAM)
const convert = require('convert-units');

export default function Converter() {
    // DEFINING REACT STATE FOR THE CONVERTER
    // Destructures all individual states into corresponding variables and mutator functions
    const [unitsList, setUnitsList] = useState([]);
    const [firstRowUnit, setFirstRowUnit] = useState("s");
    const [secondRowUnit, setSecondRowUnit] = useState("min");
    const [amount, setAmount] = useState(1);
    const [isFirstRowAmount, setIsFirstRowAmount] = useState(true);
    const [conversionFactor, setConversionFactor] = useState();

    // CALLED ONLY THE FIRST TIME APPLICATION LOADS (EMPTY ARRAY AS SECOND ARGUMENT)
    useEffect(() => {
        setUnitsList(convert().possibilities("time"));
    }, []);

    // CALLED EVERY TIME THE FIRSTROWUNIT OR SECONDROWUNIT IS UPDATED
    useEffect(() => {
        setConversionFactor((convert(1).from(`${firstRowUnit}`).to(`${secondRowUnit}`)).toFixed(4));
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
                    <span><h3>t Times</h3></span>
                </div>
            </div>
            <div className="panelWrapper">
                <div className="conversionPanel">
                    <div className="rowWrapper">
                        <Row
                            unitsList={unitsList}
                            selectedUnit={firstRowUnit}
                            unitChange={e => setFirstRowUnit(e.target.value)} // UPDATES THE TIME ROW WHEN USER CHOOSES A DIFFERENT ONE
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
                            unitChange={e => setSecondRowUnit(e.target.value)} // UPDATES THE TIME ROW WHEN USER CHOOSES A DIFFERENT ONE
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
            <div className="decoration" style={{backgroundImage: `url(${timeBackground})`}}></div>
        </>
    );
}