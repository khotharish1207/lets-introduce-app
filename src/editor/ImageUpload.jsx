import React, { createRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setImageAttr } from "../redux/reducer/images.reducer";
import Cropper from "./Cropper";

const ImageUpload = ({ type, label, description, showAlert, resizeImage }) => {
  const selectedImage = useSelector((state) => state?.images?.[type] || {});
  const dispatch = useDispatch();

  const [dragOver, setDragOver] = useState(false);
  const [tempURL, setTempURL] = useState(false);
  const [mime, setMime] = useState(false);
  const [filetype, setFiletype] = useState(false);
  const [showCropper, setShowCropper] = useState(false);

  const setContent = (value) =>
    dispatch(
      setImageAttr({
        type,
        value,
      })
    );
  const fileInputRef = createRef();

  const imageAttached = () => {
    return selectedImage.url ? true : false;
  };

  const attachFile = (e, type, dropped) => {
    if (dropped) {
      fileLoaded(e, type, true);
      setDragOver(false);
    } else {
      fileInputRef.current.click();
    }
  };
  const fileLoaded = (e, type, dropped) => {
    if (
      (dropped && e.dataTransfer.files.length) ||
      (!dropped && e.target.files.length)
    ) {
      let file = dropped ? e.dataTransfer.files[0] : e.target.files[0];
      let mime = file.type;
      if (
        (type === "logo" || type === "cover") &&
        file.type.match(/image\/(svg\+xml|png|jpeg|gif|webp)/)
      ) {
        imageLoaded(file, type, mime);
      } else if (file.type.match(/image\/(png|jpeg|gif|webp)/)) {
        imageLoaded(file, type, mime);
      } else {
        if (type === "logo" || type === "cover") {
          showAlert(
            "Unsupported file format.\nOnly jpeg, png, webp, gif and svg file can be attached."
          );
        } else {
          showAlert(
            "Unsupported file format.\nOnly jpeg, png, webp and gif file can be attached."
          );
        }
      }
    }
  };
  const imageLoaded = (file, type, mime) => {
    let reader = new FileReader();
    reader.onload = (f) => {
      let dataURI = f.target.result;
      let ext = dataURI
        .split(",")[0]
        .split(":")[1]
        .split("/")[1]
        .match(/^\w+/g)[0];
      if (type === "logo" || mime.match(/svg|gif|webp/)) {
        setContent({
          url: dataURI,
          blob: file,
          ext,
          mime,
          resized: file,
        });
        if (!mime.match(/svg|gif|webp/)) resizeImage(type, mime);
      } else {
        //TODO: image cropper
        // setContent({ ...fileContent, ext });
        setFiletype(type);
        setMime(mime);
        setShowCropper(true);
        setTempURL(dataURI);

        setContent({
          url: dataURI,
          blob: file,
          ext,
          mime,
          resized: file,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const onCropCancel = () => {
    setTempURL(null);
    setContent({ url: null });
    setShowCropper(false);
  };

  const onCropComplete = (url) => {
    setContent({ ...selectedImage, url });
    setShowCropper(false);
  };

  return (
    <div class="flex my-6">
      {showCropper && (
        <Cropper
          src={tempURL}
          onCancel={onCropCancel}
          onComplete={onCropComplete}
          type={type}
          mime={mime}
        />
      )}

      <div class="flex flex-wrap items-center">
        {imageAttached() && (
          <img
            class="w-12 h-12 rounded object-contain"
            src={selectedImage?.url}
            alt="logo"
            title={`${
              type === "logo"
                ? "Brand logo"
                : type === "photo"
                ? "Card holder's photo"
                : "Cover image"
            }`}
          />
        )}

        {!imageAttached() && (
          <button
            class="p-3 rounded bg-gray-700 cursor-pointer hover:bg-gray-600 focus:bg-gray-600 transition-colors duration-200 focus:outline-none"
            onClick={() => attachFile(null, type, false)}
            className={
              dragOver ? "bg-gray-900 outline-white" : "bg-gray-700 border-none"
            }
            onDrop={() => attachFile(null, type, false)}
            onDragOver={() => setDragOver(true)}
            onDragLeave={() => setDragOver(false)}
            aria-label="label"
          >
            <input
              ref={fileInputRef}
              style={{
                display: "none",
              }}
              type="file"
              accept={`.png,.jpg,.jpeg,.gif,.webp${
                type === "logo" || type === "cover" ? ",.svg" : ""
              }`}
              onChange={(e) => fileLoaded(e, type, false)}
              onClick={(e) => (e.target.files = null)}
            />
            <div class="w-6 h-6 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
          </button>
        )}
        {!imageAttached() ? (
          <p class="ml-3 leading-none">
            {label}
            <span class="text-sm text-gray-400">
              <br />
              {description}
            </span>
          </p>
        ) : (
          <button
            class="p-1 m-2 shrink-0 focus:outline-none rounded hover:bg-gray-700 focus:bg-gray-700 transition-colors duration-200"
            onClick={() => setContent({ ...selectedImage, url: null })}
            aria-label={`Remove ${type}`}
            title={`Remove ${type}`}
          >
            <div class="w-6 h-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

ImageUpload.defaultProps = {
  // content,
  // type: "logo",
  label: "Label",
  description: "description",
  resizeImage: () => null,
  showAlert: () => null,
};

export default ImageUpload;
