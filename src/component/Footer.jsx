import React from "react";
import wave from "../assets/images/wave.png";
function Footer({ isWave = true }) {
  return (
    <>
      {isWave && (
        <svg
          className="mt-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#5A9CB5"
            fill-opacity="1"
            d="M0,96L0,256L38.9,256L38.9,64L77.8,64L77.8,288L116.8,288L116.8,32L155.7,32L155.7,224L194.6,224L194.6,288L233.5,288L233.5,224L272.4,224L272.4,32L311.4,32L311.4,256L350.3,256L350.3,64L389.2,64L389.2,256L428.1,256L428.1,96L467,96L467,128L505.9,128L505.9,192L544.9,192L544.9,32L583.8,32L583.8,224L622.7,224L622.7,224L661.6,224L661.6,192L700.5,192L700.5,128L739.5,128L739.5,0L778.4,0L778.4,160L817.3,160L817.3,32L856.2,32L856.2,288L895.1,288L895.1,288L934.1,288L934.1,224L973,224L973,288L1011.9,288L1011.9,128L1050.8,128L1050.8,32L1089.7,32L1089.7,160L1128.6,160L1128.6,128L1167.6,128L1167.6,256L1206.5,256L1206.5,96L1245.4,96L1245.4,256L1284.3,256L1284.3,224L1323.2,224L1323.2,160L1362.2,160L1362.2,96L1401.1,96L1401.1,96L1440,96L1440,320L1401.1,320L1401.1,320L1362.2,320L1362.2,320L1323.2,320L1323.2,320L1284.3,320L1284.3,320L1245.4,320L1245.4,320L1206.5,320L1206.5,320L1167.6,320L1167.6,320L1128.6,320L1128.6,320L1089.7,320L1089.7,320L1050.8,320L1050.8,320L1011.9,320L1011.9,320L973,320L973,320L934.1,320L934.1,320L895.1,320L895.1,320L856.2,320L856.2,320L817.3,320L817.3,320L778.4,320L778.4,320L739.5,320L739.5,320L700.5,320L700.5,320L661.6,320L661.6,320L622.7,320L622.7,320L583.8,320L583.8,320L544.9,320L544.9,320L505.9,320L505.9,320L467,320L467,320L428.1,320L428.1,320L389.2,320L389.2,320L350.3,320L350.3,320L311.4,320L311.4,320L272.4,320L272.4,320L233.5,320L233.5,320L194.6,320L194.6,320L155.7,320L155.7,320L116.8,320L116.8,320L77.8,320L77.8,320L38.9,320L38.9,320L0,320L0,320Z"
          ></path>
        </svg>
      )}

      <footer className="relative gap-y-8 md:gap-0 py-10 md:pb-20 md:pt-10 bg-secondary w-full flex flex-col md:flex-row justify-between shadow-md h-auto px-[3%] z-50">
        <div className="flex-1 flex flex-col items-start justify-start md:items-center md:justify-center">
          <div>
            <p className="text-xl mb-2 font-semibold uppercase">
              Creativepreneurship DEPARTEMENT
            </p>
            <p>BINUS UNIVERSITY @BANDUNG</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-start justify-start pr-10"></div>
        <div className="flex-1 flex flex-col items-start justify-start">
          <p className="font-semibold text-xl">LOCATION</p>
          <p className="flex items-start gap-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 16 16"
            >
              <g transform="translate(5015 -3904)">
                <path
                  d="M11.706,3A4.73,4.73,0,0,0,7,7.706c0,3.5,4.706,8.471,4.706,8.471s4.706-4.971,4.706-8.471A4.73,4.73,0,0,0,11.706,3Zm0,6.118c-.92,0-1.882-.492-1.882-1.412a2.06,2.06,0,0,1,1.882-1.882,2.06,2.06,0,0,1,1.882,1.882C13.588,8.626,12.626,9.118,11.706,9.118Z"
                  transform="translate(-5018.667 3902.333)"
                  fill="#000"
                ></path>
              </g>
            </svg>
            Jl. Pasirkaliki No. 25-27, Paskal Hyper Square Bandung 40181. Jawa
            Barat, Indonesia
          </p>
          <p className="text-xl mb-2 font-semibold mt-5">CONTACT US</p>
          <p className="flex items-center gap-x-1">
            {/* <svg
              id="call_black_24dp"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              {" "}
              <path
                id="Path_141"
                data-name="Path 141"
                d="M0,0H16V16H0Z"
                fill="none"
              ></path>{" "}
              <path
                id="Path_142"
                data-name="Path 142"
                d="M15.294,12.471A7.692,7.692,0,0,1,12.941,12c-.233-.08-.291-.18-.471,0l-.941,1.412A10.7,10.7,0,0,1,6.824,8.706l1.412-.941c.18-.187.073-.237,0-.471a7.5,7.5,0,0,1-.471-2.353c0-.36-.111-.941-.471-.941H4.941A1.083,1.083,0,0,0,4,4.941,11.356,11.356,0,0,0,15.294,16.235a1.1,1.1,0,0,0,.941-.941V12.941C16.235,12.581,15.654,12.471,15.294,12.471Z"
                transform="translate(-2.118 -2.118)"
                fill="#000"
              ></path>
            </svg> */}
            doni.syah@binus.ac.id
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
