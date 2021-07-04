import React from 'react'
import './App.css'

export default function Row(props) {
    const {
        unitsList,
        selectedUnit,
        unitChange,
        amount,
        amountChange
    } = props // Retrieves the passed props from the Converter functional component

    return (
        <>
            <div className="row">
                <input type="number" value={amount} onChange={amountChange}></input>
                <select value={selectedUnit} onChange={unitChange}>
                    {unitsList.map(unit => (
                        <option key={unit} value={unit}>{unit}</option> // Maps the units array, for each unit, a select option is returned
                    ))}
                </select>
            </div>
        </>
    )
}
