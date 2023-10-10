import React from "react";

const Loader = ({ show }) => {
  if (!show) return null;
  return (
    <div className="w-full h-full bg-stone-400 fixed block top-0 left-0 bg-white opacity-75 z-50 place-content-evenly">
      <div
        className="text-red-950 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0 place-content-evenly"
        // style={{ top: "50%" }}
      >
        <div
          className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
