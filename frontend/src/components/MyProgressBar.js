import React from 'react'
import { useEffect, useState } from "react";

import "react-step-progress-bar/styles.css";
 import { ProgressBar, Step } from "react-step-progress-bar";



const MyProgressBar = () => {
    const [pbStatus, setPBStatus] = useState(25);
    const handleProgressBar = (e) => {
        if (e === 25 && pbStatus < 100) {
          setPBStatus(pbStatus + e);
        }

        if (e === -25 && pbStatus > 25) {
          setPBStatus(pbStatus + e);
        }
      };



    return (
        <div>
          <div className="w-50">
          <div className="w-100 mx-auto d-flex justify-content-center">
        <div
          className="btn mr-2"
          onClick={() => {
            handleProgressBar(-25);
          }}
        >
          {"<"}
        </div>
        <div className="w-50 align-self-center">
           <ProgressBar
            percent={pbStatus}
            filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
          >
            <Step transition="scale">
              {({ accomplished }) => (
                <img
                  style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                  width="30"
                  src="https://imagizer.imageshack.com/img922/2315/U9GZmk.png"
                />
              )}
            </Step>
            <Step transition="scale">
              {({ accomplished }) => (
                <img
                  style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                  width="30"
                  src="https://imagizer.imageshack.com/img922/2315/U9GZmk.png"
                />
              )}
            </Step>
            <Step transition="scale">
              {({ accomplished }) => (
                <img
                  style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                  width="30"
                  src="https://imagizer.imageshack.com/img922/2315/U9GZmk.png"
                />
              )}
            </Step>
            <Step transition="scale">
              {({ accomplished }) => (
                <img
                  style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                  width="30"
                  src="https://imagizer.imageshack.com/img922/2315/U9GZmk.png"
                />
              )}
            </Step>
            <Step transition="scale">
              {({ accomplished }) => (
                <img
                  style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                  width="30"
                  src="https://imagizer.imageshack.com/img922/2315/U9GZmk.png"
                />
              )}
            </Step>
          </ProgressBar>
        </div>
        <div className="btn ml-2" onClick={() => handleProgressBar(+25)}>
          {">"}
        </div>
      </div>
              </div>
        </div>
    )
}

export default MyProgressBar
