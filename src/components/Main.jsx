import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();
  const usernameRef = useRef(null);

  const handleClick = function (e, username) {
    if (username) return navigate(`/${username}/edit`);
    if (e.key === "Enter") return navigate(`/${e.target.value}/edit`);
  };

  return (
    <div className="main-container h-screen w-screen flex flex-col justify-center items-center bg-[#37505C]">
      <div className="main-logo relative top-[13px] flex">
        <div className="main-logo-text relative left-[-25px] font-['Cursif'] text-[50px] text-[#fb6c8d] drop-shadow-lg z-10">Socialtree</div>
        <img className="main-logo-tree absolute right-[-45px] bottom-[23px] w-[85px]" src="/assets/tree.svg" alt="tree logo" />
      </div>
      <div className="main-card p-5 border-2 border-[#113537] rounded-md bg-[#FFEAD0] flex flex-col items-center">
        <div className="main-text pb-2 text-[19px] font-normal subpixel-antialiased">Create new Social Link Tree:</div>
        <input
          ref={usernameRef}
          className="main-input h-10 w-[230px] pl-3 border-2 border-slate-500 rounded"
          type="text"
          placeholder="Username"
          onKeyDown={(e) => handleClick(e)}
        />
        <button
          className="start-btn mt-2 w-full h-[37px] bg-[#96616B] text-[#113537] rounded-md font-semibold subpixel-antialiased hover:bg-[#fb6c8d] hover:text-[#37505b]"
          onClick={(e) => handleClick(e, usernameRef.current.value)}
        >
          CREATE
        </button>
      </div>
    </div>
  );
}
