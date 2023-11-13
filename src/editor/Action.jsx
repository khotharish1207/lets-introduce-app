import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Action = ({ item, type, buttonBg, onChange, removeAction, ...props }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className="stepC flex mt-6 mb-4" ref={setNodeRef}>
      <button
        className="py-1 pr-1 shrink-0 focus:outline-none drag cursor-move"
        tabindex="-1"
        style={style}
        {...attributes}
        {...listeners}
      >
        <div className="w-6 h-6">
          <img
            src={require(`../assets/icons/drag.svg?include`).default}
            alt="Drag"
          />
        </div>
      </button>
      <div
        className="p-3 shrink-0 rounded-l"
        style={{
          background: `${type === "secondaryActions" ? item.color : buttonBg}`,
        }}
        title={item.name}
      >
        <div
          className={`w-6 h-6 ${type === "secondaryActions" ? null : "action"}`}
        >
          <img
            alt={item.name}
            src={require(`../assets/icons/${item.icon}.svg?include`)}
          />
        </div>
      </div>

      <div className="w-full">
        <input
          // ref="input"
          className="px-4 w-full h-12 bg-black placeholder-gray-600 rounded-r border border-transparent transition-colors duration-200 focus:outline-none focus:border-gray-600 hover:border-gray-600"
          type="text"
          aria-label={"Enter " + item.label}
          title={"Enter " + item.label}
          // v-model="type[index].value"
          value={item.value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={item.placeholder}
        />
      </div>

      <button
        className="p-1 m-2 shrink-0 focus:outline-none rounded hover:bg-gray-700 focus:bg-gray-700 transition-colors duration-200"
        onClick={() => removeAction(type)}
        aria-label={"Remove " + item.label}
        title="Remove field"
      >
        <div className="w-6 h-6">
          <img
            src={require(`../assets/icons/x.svg?include`).default}
            alt="Remove field"
          />
        </div>
      </button>
    </div>
  );
};

export default Action;
