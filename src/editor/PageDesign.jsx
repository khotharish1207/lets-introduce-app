import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setPageDesign } from "../redux/reducer/pageDesign.reducer";

const ColorPicker = ({ label = "Pick Color", name }) => {
  const color = useSelector((state) => state?.pageDesign?.[name]);
  const dispatch = useDispatch();
  return (
    <div className="mt-6 flex flex-col items-start">
      <div className="flex items-center">
        <input
          className="w-12 h-12 rounded mr-3 relative cursor-pointer transition-colors duration-200 focus:outline-none focus:ring ring-gray-100"
          type="color"
          id={label}
          name={label}
          value={color}
          onChange={(e) =>
            dispatch(setPageDesign({ key: name, value: e.target.value }))
          }
        />
        <label for={label}>{label}</label>
      </div>
    </div>
  );
};

const PageDesign = () => {
  const pageDesign = useSelector((state) => state?.pageDesign);
  const dispatch = useDispatch();
  const onChange = (name) => (e) =>
    dispatch(setPageDesign({ key: name, value: e.target.value }));

  const setTheme = (theme) =>
    dispatch(setPageDesign({ key: "theme", value: theme }));

  return (
    <React.Fragment>
      <div id="step-8" className="my-8">
        <h2 className="font-extrabold text-2xl">Colours</h2>
        <ColorPicker
          name="logoBg"
          label="Header background"
          onChange={onChange("logoBg")}
        />
        <ColorPicker
          name="mainBg"
          label="Main background"
          onChange={onChange("mainBg")}
        />
        <ColorPicker
          name="buttonBg"
          label="Button background"
          onChange={onChange("buttonBg")}
        />
        <ColorPicker
          name="cardBg"
          label="Featured content background"
          onChange={onChange("cardBg")}
        />
      </div>

      <div id="step-7" class="mt-16">
        <h2 class="font-extrabold text-2xl">Themes</h2>
        <div class="stepC mt-3 flex flex-wrap">
          <button
            onClick={() => setTheme("theme1")}
            className={`w-12 h-12 rounded mt-3 mr-3 font-extrabold focus:outline-none transition-colors duration-200 ${
              pageDesign?.theme == "theme1"
                ? "bg-emerald-600"
                : "bg-gray-700 hover:bg-gray-600 focus:bg-gray-600"
            }`}
          >
            A
          </button>
          <button
            onClick={() => setTheme("theme2")}
            className={`w-12 h-12 rounded mt-3 mr-3 font-extrabold focus:outline-none transition-colors duration-200 ${
              pageDesign?.theme == "theme2"
                ? "bg-emerald-600"
                : "bg-gray-700 hover:bg-gray-600 focus:bg-gray-600"
            }`}
          >
            B
          </button>
        </div>
      </div>

      <div id="step-8" className="mt-16">
        <h2 className="font-extrabold text-2xl">Fonts</h2>

        <div className="stepC mt-6">
          <label for="font-link" className="ml-4">
            Google web font name
          </label>
          <input
            id="font-link"
            value={pageDesign.fontLink}
            onChange={onChange("fontLink")}
            className="block mt-2 px-4 py-3 w-full bg-black placeholder-gray-600 rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-gray-600 resize-none hover:border-gray-600"
            rows="4"
            spellcheck="false"
            placeholder="Google font name"
          ></input>
        </div>

        {/* <div class="stepC mt-6">
          <label for="font-css" class="ml-4">
            Web font CSS rule
          </label>
          <input
            spellcheck="false"
            type="text"
            id="font-css"
            v-model="genInfo.fontCss"
            value={pageDesign.fontCss}
            onChange={onChange("fontCss")}
            class="block mt-2 px-4 py-3 w-full bg-black placeholder-gray-600 rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-gray-600 resize-none hover:border-gray-600"
            placeholder={`font-family: 'Poppins', sans-serif;`}
          />
        </div> */}
      </div>
      <p className="mt-6 border p-4 rounded border-gray-700 text-gray-400">
        Supports services such as Google Fonts. Make sure to get the corect font
        name from these{" "}
        <a
          className=" text-sky-700 underline"
          href="https://fonts.google.com/"
          target="_blank"
        >
          fonts
        </a>
      </p>
    </React.Fragment>
  );
};

export default PageDesign;
