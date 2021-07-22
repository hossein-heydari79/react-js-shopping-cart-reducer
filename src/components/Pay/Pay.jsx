import React from 'react'
import './Pay.css'

export const Pay = ({ cardlist, mode, modeDispatch }) => {


    function change() {
        // setmode({
        //     show: true
        // })

        modeDispatch({
            type: "TRUE", payload: {
                show: true
            }
        })

    }
    let total = 0;
    cardlist.forEach(element => {
        total += element.price * element.count;
    });


    return (
        <div className="pay" >
            <p>Total: ${total.toFixed(2)}</p>
            <button onClick={change}>Proceed</button>
        </div >
    )

}
