import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const FeatureContent = ({
  item,
  onChange,
  removeContent,
  idx,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: idx });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (item.contentType === "media") {
    let showImage =
      item.type === "image"
        ? item.dataURI
        : item.coverDataURI
        ? item.coverDataURI
        : false;
    return (
      <div
        key={`media-${idx}-feature`}
        className="flex items-center mt-2"
        ref={setNodeRef}
      >
        <button
          className="p-1 shrink-0 focus:outline-none drag cursor-move"
          tabindex="-1"
          style={style}
          {...attributes}
          {...listeners}
        >
          <div className="w-6 h-6">
            <img
              alt=""
              src={require(`../assets/icons/drag.svg?include`).default}
            />
          </div>
        </button>

        {showImage ? (
          <img
            className="w-12 h-12 rounded-l object-contain shrink-0 bg-gray-700"
            src={item.type === "image" ? item.dataURI : item.coverDataURI}
            alt={item.title}
          />
        ) : (
          <a
            className="w-12 h-12 bg-gray-900 flex items-center justify-center text-center text-xs rounded-l shrink-0 leading-none select-none cursor-pointer"
            target="_blank"
            href="https://duckduckgo.com/?q=Add+ID3+tags+to+mp3+file"
            rel="noreferrer noopener"
          >
            {item.info}
          </a>
        )}

        <div className="w-full">
          <input
            className="px-4 w-full h-12 bg-black placeholder-gray-600 rounded-r border border-transparent transition-colors duration-200 focus:outline-none focus:border-gray-500 hover:border-gray-500"
            type="text"
            aria-label="Media title"
            autocapitalize="words"
            title="Media title"
            value={item.title}
            placeholder="Media title"
            onChange={(e) =>
              onChange(idx, { key: "title", value: e.target.value })
            }
          />
        </div>

        <button
          className="p-1 m-2 self-end shrink-0 focus:outline-none rounded hover:bg-gray-700 focus:bg-gray-700 transition-colors duration-200"
          onClick={() => removeContent(idx)}
          aria-label="Remove media"
          title="Remove media"
        >
          <div className="w-6 h-6">
            <img
              src={require(`../assets/icons/x.svg?include`).default}
              alt="Remove media"
            />
          </div>
        </button>
      </div>
    );
  }

  if (item.contentType === "text") {
    return (
      <div className="flex items-center mt-2" ref={setNodeRef}>
        <button
          className="p-1 shrink-0 focus:outline-none drag cursor-move"
          tabindex="-1"
          style={style}
          {...attributes}
          {...listeners}
        >
          <div className="w-6 h-6">
            <img
              alt=""
              src={require(`../assets/icons/drag.svg?include`).default}
            />
          </div>
        </button>

        <div class="w-full">
          <textarea
            class="block px-4 py-3 w-full bg-black rounded border border-transparent placeholder-gray-600 transition-colors duration-200 focus:outline-none focus:border-gray-500 resize-none hover:border-gray-500"
            aria-label="Enter text here"
            title="Enter text here"
            value={item.value}
            onChange={(e) =>
              onChange(idx, { key: "value", value: e.target.value })
            }
            v-model="featured[index].content[i].value"
            placeholder="Enter text here"
            rows="5"
          />
        </div>

        <button
          className="p-1 m-2 self-end shrink-0 focus:outline-none rounded hover:bg-gray-700 focus:bg-gray-700 transition-colors duration-200"
          onClick={() => removeContent(idx)}
          aria-label="Remove media"
          title="Remove media"
        >
          <div className="w-6 h-6">
            <img
              src={require(`../assets/icons/x.svg?include`).default}
              alt=""
            />
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center mt-2" ref={setNodeRef}>
      <button
        className="p-1 shrink-0 focus:outline-none drag cursor-move"
        tabindex="-1"
        style={style}
        {...attributes}
        {...listeners}
      >
        <div className="w-6 h-6">
          <img
            alt=""
            src={require(`../assets/icons/drag.svg?include`).default}
          />
        </div>
      </button>

      <div class="w-full">
        <input
          class="px-4 w-full h-12 bg-black placeholder-gray-600 rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-gray-500 hover:border-gray-500"
          type="text"
          aria-label="Paste embed code here"
          title="Paste embed code here"
          value={item}
          onChange={(e) => onChange(idx, { key: "", value: e.target.value })}
          placeholder="Paste embed code here"
        />
      </div>

      <button
        className="p-1 m-2 self-end shrink-0 focus:outline-none rounded hover:bg-gray-700 focus:bg-gray-700 transition-colors duration-200"
        onClick={() => removeContent(idx)}
        aria-label="Remove media"
        title="Remove media"
      >
        <div className="w-6 h-6">
          <img src={require(`../assets/icons/x.svg?include`).default} alt="" />
        </div>
      </button>
    </div>
  );
};

export default FeatureContent;
