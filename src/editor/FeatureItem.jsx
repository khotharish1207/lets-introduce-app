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
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { getDocument } from "pdfjs-dist";
import React, { createRef, useState } from "react";
import { dataURIToBinary, formatBytes, getFileName, mediaType } from "../utils";
import FeatureContent from "./FeatureContent";

const FeatureItem = ({
  feature,
  removeFeature,
  addContent,
  initializeContent,
  onTitleChange,
  ...props
}) => {
  const importRef = createRef();
  const [dragOver, setDragOver] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const [activeId, setActiveId] = useState(null);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const hasContent = true;

  const attachMedia = () => importRef.current.click();
  const imageLoaded = (file, type, mime) => {
    let title = getFileName(file);
    let reader = new FileReader();
    reader.onload = (f) => {
      let dataURI = f.target.result;
      let ext = dataURI
        .split(",")[0]
        .split(":")[1]
        .split("/")[1]
        .match(/^\w+/g)[0];

      addContent({
        name: file.name,
        title,
        dataURI,
        file,
        type,
        contentType: "media",
        ext,
        mime,
      });

      //   this.resizeImage(
      //     type,
      //     mime,
      //     this.index,
      //     this.featured[this.index].content.length - 1
      //   )
    };
    reader.readAsDataURL(file);
  };

  // const musicLoaded = () => {};
  // const videoLoaded = () => {};

  const documentLoaded = (file, type) => {
    let filesize = formatBytes(file.size);
    let title = getFileName(file);
    let reader = new FileReader();
    let data, maxWidth, maxHeight;
    maxWidth = maxHeight = 1296;
    reader.onload = (f) => {
      data = dataURIToBinary(f.target.result);
      let loadingTask = getDocument(data);
      loadingTask.promise.then((pdf) => {
        pdf.getPage(1).then((page) => {
          let canvas = document.createElement("canvas");
          let ctx = canvas.getContext("2d");
          let scale = 1;
          let viewport = page.getViewport({ scale });
          let width = viewport.width;
          let height = viewport.height;

          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
          canvas.width = width;
          canvas.height = height;
          var renderContext = {
            canvasContext: ctx,
            viewport: viewport,
          };
          page.render(renderContext).promise.then((e) => {
            let coverDataURI = canvas.toDataURL("image/jpeg", 0.8);
            let cover = new Blob([this.dataURIToBinary(coverDataURI)], {
              type: "image/jpeg",
            });
            this.featured[this.index].content.push({
              name: file.name,
              cover,
              coverDataURI,
              coverExt: "jpeg",
              file,
              filesize,
              title,
              type,
              contentType: "media",
              ext: "pdf",
            });
          });
        });
      });
    };
    reader.readAsDataURL(file);
  };
  const showAlert = () => {};

  const fileLoaded = (e, dropped) => {
    if (
      (dropped && e.dataTransfer.files.length) ||
      (!dropped && e.target.files.length)
    ) {
      let file = dropped ? e.dataTransfer.files[0] : e.target.files[0];
      setDragOver(false);
      let mimetype = file.type;
      let type = mediaType(mimetype);
      if (file) {
        switch (type) {
          case "image":
            imageLoaded(file, type, mimetype);
            break;
          //   case "music":
          //     musicLoaded(file, type);
          //     break;
          //   case "video":
          //     videoLoaded(file, type);
          //     break;
          case "document":
            documentLoaded(file, type);
            break;
          default:
            showAlert(
              "Unsupported file format.\n\nOnly jpeg, png, mp3, mp4, webm and pdf files can be attached."
            );
            break;
        }
      }
    } else setDragOver(false);
  };

  const addText = () =>
    addContent({
      contentType: "text",
      value: null,
    });

  const addLink = () => addContent("");

  return (
    <div
      className="flex flex-col w-full my-6 bg-gray-800 rounded"
      ref={setNodeRef}
    >
      <div className="flex justify-between">
        <div className="flex items-center w-full">
          <div
            className="p-1 shrink-0 focus:outline-none drag cursor-move"
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
          </div>
          <div className="w-full">
            <input
              className="px-4 w-full h-12 bg-transparent placeholder-gray-600 transition-colors duration-200 border-b border-black focus:outline-none focus:border-gray-500 hover:border-gray-500"
              type="text"
              name="section title"
              placeholder="Section title"
              value={feature.title}
              onChange={(e) => onTitleChange(e.target.value)}
              autocapitalize="words"
              title="Type your own section title"
            />
          </div>
        </div>
        <button
          className="p-1 m-2 shrink-0 focus:outline-none rounded hover:bg-gray-700 focus:bg-gray-700 transition-colors duration-200"
          onClick={removeFeature}
          aria-label="Remove section"
          title="Remove section"
        >
          <div className="w-6 h-6">
            <img
              src={require(`../assets/icons/x.svg?include`).default}
              alt="Remove section"
            />
          </div>
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={({ active }) => setActiveId(active.id)}
        onDragEnd={(event) => {
          const { active, over } = event;

          if (active.id !== over.id) {
            const oldIndex = active.id;
            const newIndex = over.id;

            const items = arrayMove(feature?.content, oldIndex, newIndex);
            initializeContent(items);
          }
          setActiveId(null);
        }}
      >
        <SortableContext
          items={feature?.content}
          strategy={verticalListSortingStrategy}
        >
          {feature.content.map((item, idx) => (
            <FeatureContent item={item} {...props} idx={idx} />
          ))}
        </SortableContext>
        <DragOverlay>
          {activeId ? (
            <FeatureContent
              item={feature.content[activeId]}
              {...props}
              idx={activeId}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
      <div
        className={`grid grid-flow-row grid-cols-1 xs:grid-cols-2 gap-2 w-full p-2 ${
          hasContent ? "mt-4" : ""
        }`}
      >
        <button
          className={`${
            dragOver ? "bg-gray-900 outline-white" : "bg-gray-700 border-nonee"
          } flex items-center p-3 rounded cursor-pointer bg-gray-700 hover:bg-gray-600 focus:bg-gray-600 transition-colors duration-200 focus:outline-none`}
          onClick={attachMedia}
          onDrop={(e) => fileLoaded(e, true)}
          onDragLeave={() => setDragOver(false)}
          onDragOver={() => setDragOver(true)}
        >
          <input
            ref={importRef}
            style={{
              display: "none",
            }}
            type="file"
            // accept="mimetypes"
            accept="image/*"
            v-show="false"
            onChange={(e) => fileLoaded(e, false)}
            onClick={(e) => (e.target.files = null)}
          />
          <div className="w-6 h-6 mr-3">
            <img
              src={require(`../assets/icons/file.svg?include`).default}
              alt="Add media"
            />
          </div>
          <p className="leading-none">Add media</p>
        </button>

        <button
          className="flex items-center p-3 rounded cursor-pointer bg-gray-700 hover:bg-gray-600 focus:bg-gray-600 transition-colors duration-200 focus:outline-none"
          onClick={addText}
          aria-label="Add text"
        >
          <div className="w-6 h-6 mr-3">
            <img
              src={require(`../assets/icons/text.svg?include`).default}
              alt="Add text"
            />
          </div>
          <p className="leading-none text-left">Add text</p>
        </button>

        <button
          class="flex items-center p-3 rounded cursor-pointer bg-gray-700 hover:bg-gray-600 focus:bg-gray-600 transition-colors duration-200 focus:outline-none"
          onClick={addLink}
          aria-label="Embed media"
        >
          <div class="w-6 h-6 mr-3">
            <img
              alt=""
              src={require(`../assets/icons/code.svg?include`).default}
            />
          </div>
          <p class="leading-none">Embed media</p>
        </button>
      </div>
    </div>
  );
};

export default FeatureItem;
