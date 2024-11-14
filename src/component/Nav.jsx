import React from "react";
import pita_biru_logo from "../assets/images/logo-binusuniv.svg";
import binus_logo from "../assets/images/logo-pita-biru.svg";
function Nav() {
  return (
    <nav className="relative w-full flex shadow-md h-24 px-[3%] z-50">
      <img className="max-h-[80%]" src={binus_logo} alt="" />

      <div className="flex items-center h-full">
        <img
          className="max-h-[70%] ml-1 object-contain"
          src={pita_biru_logo}
          alt=""
        />
      </div>
    </nav>
  );
}

export default Nav;
