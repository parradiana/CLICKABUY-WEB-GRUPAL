import React, { useState } from "react";
import ReactStars from 'react-stars'




const PruebaLucas = () => {

    const [state, setState] = useState(0)

    const ratingChanged = (newRating) => {
        // console.log(newRating)
    }




    return (
        <div style={{ textAlign: 'center', backgroundColor: 'red', height: '100px', paddingTop: '20px' }}>

            <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                color2={'#ffd700'}
                value={state}
            />
        <span onClick={()=>setState(state+1)}>cambiar</span>
        </div >

    )

}

export default PruebaLucas
