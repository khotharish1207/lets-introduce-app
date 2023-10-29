import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAvailability } from "../redux/reducer/site.reducer";

const SiteInfo = () => {
  const dispatch = useDispatch();
  const { site } = useSelector((state) => state);
  const [endPoint, setEndPoint] = useState(site?.endpoint);

  const onClick = () => dispatch(checkAvailability(endPoint));
  const disableClick = () => {
    return site?.endpoint === endPoint || !endPoint;
  };

  return (
    <div id="step-2" class="pt-8 mb-4">
      <div className="stepC mt-6">
        <label for="endpoint" class="font-extrabold text-2xl">
          Your site visible at
        </label>
        <input
          id="endpoint"
          spellcheck="false"
          type="text"
          onChange={(e) => setEndPoint(e.target.value)}
          value={endPoint}
          placeholder="website url"
          autocapitalize="words"
          className="mt-2 px-4 w-full h-12 bg-black placeholder-gray-600 rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-gray-600 hover:border-gray-600"
        />
        <p class="mt-2 text-gray-400">
          Your site will be publish after saving at{" "}
          <a
            className=" text-sky-700 "
            href={`${window.location.origin}/${endPoint}`}
            target="_blank"
            rel="noreferrer noopener"
          >{`${window.location.origin}/${endPoint}`}</a>
        </p>
      </div>
      {!disableClick() && (
        <div className="stepC mt-3">
          <div className="flex items-center justify-between">
            <div className="font-medium ml-4">
              {typeof site.isValidEndpoint === "boolean" &&
                site.isValidEndpoint && (
                  <p className="text-green-800">congrats, available</p>
                )}

              {typeof site.isValidEndpoint === "boolean" &&
                !site.isValidEndpoint && (
                  <p className="text-red-600">try different one</p>
                )}
            </div>

            <div className="text-sm">
              <button
                onClick={onClick}
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm"
              >
                Check Availablitity
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SiteInfo;
