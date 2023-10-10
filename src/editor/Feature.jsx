import React from "react";
import { useDispatch, useSelector } from "react-redux";

import FeatureItem from "./FeatureItem";

import {
  addFeature,
  deleteFeature,
  addContent,
  setContent,
  removeContent,
  setFeatureTitle,
} from "../redux/reducer/feature.reducer";

const Feature = () => {
  const { feature } = useSelector((state) => state);
  const dispatch = useDispatch();

  const addNewFeature = () => dispatch(addFeature());
  const removeFeature = (index) => () => dispatch(deleteFeature(index));
  const updateFeatureTitle = (index) => (title) =>
    dispatch(setFeatureTitle({ index, title }));

  const addContentFeature = (index) => (content) =>
    dispatch(addContent({ index, content }));

  const removeContentFeature = (index) => (contentIndex) =>
    dispatch(removeContent({ index, contentIndex }));

  const setContentValue = (index) => (contentIndex, payload) =>
    dispatch(
      setContent({
        index,
        contentIndex,
        data: payload,
      })
    );

  return (
    <div id="step-5" class="mt-16">
      <h2 class="font-extrabold text-2xl">Featured content</h2>
      <div class="stepC">
        {feature.map((item, index) => (
          <FeatureItem
            feature={item}
            removeFeature={removeFeature(index)}
            addContent={addContentFeature(index)}
            removeContent={removeContentFeature(index)}
            onChange={setContentValue(index)}
            onTitleChange={updateFeatureTitle(index)}
          />
        ))}
      </div>
      <div class="flex mt-6">
        <div class="flex flex-wrap items-center">
          <button
            class="p-3 rounded bg-gray-700 hover:bg-gray-600 focus:bg-gray-600 transition-colors duration-200 focus:outline-none"
            onClick={addNewFeature}
            aria-label="Add section"
          >
            <div class="w-6 h-6">
              <img src={require(`../assets/icons/add.svg?include`).default} />
            </div>
          </button>
          <p class="ml-3 leading-none">Add section</p>
        </div>
      </div>
    </div>
  );
};

export default Feature;
