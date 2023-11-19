import React, { useState, useEffect, forwardRef } from "react";
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

import appConstants from "../constants/appConstants";
import {
  addActionItem,
  removeActionItem,
  onActionEdit,
  setActionItemsbyType,
} from "../redux/reducer/actionItems.reducer";

import Action from "./Action";

const {
  actions: { primaryActions, secondaryActions },
} = appConstants;

const ActionItems = ({ title, actions, type }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const [activeId, setActiveId] = useState(null);

  const actionItems = useSelector((state) => state?.actionItems?.[type] || []);
  const dispatch = useDispatch();

  const [filterPrimary, setFilterPrimary] = useState("");
  const [filteredPrimary, setFilteredPrimary] = useState(actions);

  useEffect(() => {
    let res = actions.filter(
      (x) => actionItems.findIndex(({ name }) => x.name === name) === -1
    );
    if (filterPrimary.length) {
      res = actions.filter((action) =>
        action.name.toLowerCase().includes(filterPrimary.toLowerCase())
      );
    }
    setFilteredPrimary(res);
  }, [filterPrimary, actionItems]);

  const keydown = (e) => {
    if (e.key === "Escape" || e.keyCode === 27) {
      // clear FilterActions
      setFilterPrimary("");
    }
  };

  const addAction = (actionType, action) => {
    dispatch(addActionItem({ actionType, value: action }));
  };

  const onRemoveAction = (index) => (actionType) => {
    dispatch(removeActionItem({ actionType, value: index }));
  };

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(actionItems.findIndex((n) => n.name === active.id));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = actionItems.findIndex((n) => n.name === active.id);
      const newIndex = actionItems.findIndex((n) => n.name === over.id);

      const items = arrayMove(actionItems, oldIndex, newIndex);
      dispatch(
        setActionItemsbyType({
          type,
          items,
        })
      );
    }

    setActiveId(null);
  };

  return (
    <div id="step-3" className="mt-16">
      <h2 className="font-extrabold text-2xl">{title}</h2>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        <SortableContext
          items={actionItems}
          strategy={verticalListSortingStrategy}
        >
          {actionItems.map((actionItem, index) => (
            <Action
              item={actionItem}
              id={actionItem.name}
              type={type}
              buttonBg={"transparent"}
              removeAction={onRemoveAction(index)}
              onChange={(value) =>
                dispatch(onActionEdit({ actionType: type, value, index }))
              }
            />
          ))}
        </SortableContext>
        <DragOverlay>
          {activeId ? (
            <Action
              item={actionItems[activeId]}
              id={actionItems[activeId].name}
              buttonBg={"transparent"}
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      <div
        className={`mt-6 border-gray-800 ${
          actions.length ? "border-t pt-6" : ""
        }`}
      >
        <input
          spellcheck="false"
          type="text"
          value={filterPrimary}
          placeholder="Search an action"
          className="px-4 mb-2 w-full h-12 bg-black placeholder-gray-600 rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-gray-600 hover:border-gray-600"
          onKeyDown={keydown}
          onChange={(e) => setFilterPrimary(e.target.value)}
        />

        {filteredPrimary.length < 1 && (
          <p className="p-3">
            Can't find an action? Please
            <a
              href="#help"
              className="cursor-pointer underline font-extrabold text-emerald-600 hover:text-emerald-500 focus:text-emerald-500 transition-colors duration-200"
            >
              leave your suggestion
            </a>
            on Telegram
          </p>
        )}

        <div className="stepC actions">
          {filteredPrimary.map((action, index) => {
            return (
              <button
                key={`primary-actions-${index}`}
                onClick={() => addAction(type, action)}
                className="p-3 flex items-center shrink-0 rounded hover:bg-gray-600 focus:bg-gray-600 transition-colors duration-200 focus:outline-none bg-gray-700"
                title={
                  action.name.substr(0, 1).toUpperCase() + action.name.slice(1)
                }
                aria-label={action.name}
                style={{
                  backgroundColor: action.color || "tranparent",
                }}
              >
                <div className="w-6 h-6 mr-3 shrink-0">
                  <img
                    alt={action.name}
                    src={require(`../assets/icons/${action.icon}.svg?include`)}
                  />
                </div>
                <p
                  className={`whitespace-nowrap ${
                    action.light ? "text-gray-900" : ""
                  }`}
                >
                  {action.name.substr(0, 1).toUpperCase() +
                    action.name.slice(1)}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

function Actions() {
  return (
    <React.Fragment>
      <ActionItems
        title="Primary actions"
        actions={primaryActions}
        type="primaryActions"
      />
      <ActionItems
        title="Secondary actions"
        actions={secondaryActions}
        type="secondaryActions"
      />
    </React.Fragment>
  );
}

export default Actions;
