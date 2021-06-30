import React from 'react'
import './App.css'

export default function Row(props) {
    const {
        currencyTypesList,
        selectedCurrency,
        currencyChange,
        amount,
        amountChange
    } = props // Retrieves the passed props from the Converter functional component

    return (
        <>
            <div className="row">
            <input type="number" value={amount} onChange={amountChange}></input>
            <select value={selectedCurrency} onChange={currencyChange}>
                {currencyTypesList.map(currency => (
                    <option key={currency} value={currency}>{currency}</option> // Maps the currencyTypes array, for each currency, a select option is returned
                ))}
            </select>
            </div>
        </>
    )
}
