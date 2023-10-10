import React from "react";
import { useDispatch } from "react-redux";

import Header from "./Header";
import ContactInformation from "./ContactInformation";
import ActionItems from "./ActionItems";
import PageDesign from "./PageDesign";
import SiteInfo from "./SiteInfo";
import Feature from "./Feature";
import { saveSite } from "../redux/reducer/site.reducer";

const Editor = () => {
  const dispatch = useDispatch();

  const onClick = () => dispatch(saveSite());

  return (
    <div className="px-4">
      <SiteInfo />
      <Header />
      <ContactInformation />
      <ActionItems />
      <Feature />
      <PageDesign />
      <div className="p-4">
        <button
          onClick={onClick}
          className="mt-4 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Editor;
