import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import FeatureItem from "./FeatureItem";

import {
  addFeature,
  deleteFeature,
  addContent,
  setContent,
  removeContent,
  setFeatureTitle,
  setInitialFeatures,
} from "../redux/reducer/feature.reducer";

const Feature = () => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const [activeId, setActiveId] = useState(null);

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

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = active.id;
      const newIndex = over.id;

      const items = arrayMove(feature, oldIndex, newIndex);
      dispatch(setInitialFeatures(items));
    }

    setActiveId(null);
  };

  console.log(feature);

  return (
    <div id="step-5" class="my-8">
      <h2 class="font-extrabold text-2xl">Featured content</h2>
      <div class="stepC">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={feature}
            strategy={verticalListSortingStrategy}
          >
            {feature.map((item, index) => (
              <FeatureItem
                feature={item}
                id={index}
                removeFeature={removeFeature(index)}
                addContent={addContentFeature(index)}
                removeContent={removeContentFeature(index)}
                onChange={setContentValue(index)}
                onTitleChange={updateFeatureTitle(index)}
              />
            ))}
          </SortableContext>
          <DragOverlay>
            {activeId ? <FeatureItem feature={feature[activeId]} /> : null}
          </DragOverlay>
        </DndContext>
      </div>
      <div class="flex mt-6">
        <div class="flex flex-wrap items-center">
          <button
            class="p-3 rounded bg-gray-700 hover:bg-gray-600 focus:bg-gray-600 transition-colors duration-200 focus:outline-none"
            onClick={addNewFeature}
            aria-label="Add section"
          >
            <div class="w-6 h-6">
              <img
                src={require(`../assets/icons/add.svg?include`).default}
                alt="Add section"
              />
            </div>
          </button>
          <p class="ml-3 leading-none">Add section</p>
        </div>
      </div>

      <p className="mt-6 border p-4 rounded border-gray-700 text-gray-400">
        Media is supporting for images only as of now.
      </p>
    </div>
  );
};

export default Feature;
