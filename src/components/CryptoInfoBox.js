import React from "react";

export const CryptoInfoBox = props => {
    const infoBoxClass =
        props.infoBoxClass !== undefined ? props.infoBoxClass : "";

    const rateColor = percentage => {
        let rateClass = "";
        if (percentage > 0) {
            rateClass = "positiveRate";
        } else if (percentage === 0) {
            rateClass = "noRate";
        } else {
            rateClass = "negativeRate";
        }
        return rateClass;
    };

    const round = (number, toFixedVal) => {
        if (typeof number !== "undefined") {
            number = parseFloat(number).toFixed(toFixedVal);
        } else {
            number = 0;
        }
        return number;
    };

    // const displayHoldings = (amount) => {
    //     if (amount !== 0) {
    //         return (
    //             <div>
    //                 <div className="infoBoxAmount alt">{round(props.amount, 5)}</div>
    //                 <div className="infoBoxAmountValue">${round(props.amountValue, 3)}</div>
    //             </div>

    //         );
    //     }
    // }

    return (
        <div
            id={props.infoBoxID}
            className={`infoBox ${infoBoxClass} ${props.displayToggle}`}
        >
            <div className="infoBoxHeader">{props.infoBoxName}</div>
            <div className="infoBoxPrice alt">${round(props.infoBoxPrice, 3)}</div>
            <div className="infoBoxRates">
                <div className="infoBoxRateHeader">
                    <div className="inlineBlock">1h</div>
                    <div className="inlineBlock">24h</div>
                    <div className="inlineBlock">7d</div>
                </div>
                <div className="infoBoxRateNumbers">
                    <div className={`inlineBlock ${rateColor(props.infoBox1h)}`}>
                        {round(props.infoBox1h, 3)}%
          </div>
                    <div className={`inlineBlock ${rateColor(props.infoBox24h)}`}>
                        {round(props.infoBox24h, 3)}%
          </div>
                    <div className={`inlineBlock ${rateColor(props.infoBox7d)}`}>
                        {round(props.infoBox7d, 3)}%
          </div>
                </div>
            </div>
            <div className="infoBoxAmount alt">{round(props.amount, 5)}</div>
            <div className="infoBoxAmountValue">${round(props.amountValue, 3)}</div>

        </div>
    );
};