import { useState } from "react";
import Editor from "./editor/Editor";
import Preview from "./preview/Preview";

export default function App() {
  const [showPreview, togglePreview] = useState(false);
  const belowMDscreen = window.matchMedia("(min-width: 768px)").matches;

  return (
    <>
      <div className="bg-gray-900 md:grid md:grid-cols-2 md:gap-x-1.5">
        <div>
          <div className="w-full z-30 bg-gray-900 justify-between items-center flex md:hidden">
            <div className="logo w-16 m-4">
              <img
                src={require("./assets/icons/drag.svg?include").default}
                alt="Drag"
              />
            </div>
            <button
              className={`p-3 mx-4 font-extrabold rounded tracking-wide focus:outline-none select-none ${
                showPreview ? "bg-gray-700" : "bg-emerald-600"
              } `}
              onClick={() => togglePreview(!showPreview)}
            >
              {showPreview ? "Close preview" : "Open preview"}
            </button>
          </div>
          {showPreview && !belowMDscreen ? (
            <div className="overflow-y-scroll max-hd border-t-0 border-4 border-black bg-gray-900">
              <Preview />
            </div>
          ) : (
            <Editor />
          )}
        </div>

        <div
          id="preview-container"
          className="relative w-full mt-20 sm:mt-0 hidden md:block"
        >
          <div
            id="preview"
            className="flex flex-col items-center justify-center sm:sticky sm:top-0 md:mx-6 lg:mx-12"
          >
            <div id="device" className="bg-black rounded sm:mt-10">
              <h2 className="text-center py-4 font-extrabold text-gray-200">
                LIVE PREVIEW
              </h2>

              <div className="overflow-y-scroll max-hd border-t-0 border-4 border-black bg-gray-900">
                <Preview />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
