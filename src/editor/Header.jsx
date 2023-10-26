import React from "react";
import ImageUpload from "./ImageUpload";

const Header = () => {
  return (
    <div id="step-1" className="my-8">
      <h2 class="font-extrabold text-2xl">Header attachments</h2>
      <div class="stepC">
        <ImageUpload
          type="logo"
          label="Add logo"
          description="suggested format: svg, png or gif"
        />
        <ImageUpload
          type="cover"
          label="Add cover photo"
          description="suggested format: svg, jpeg, png or gif"
        />
        <p class="mt-6 border p-4 rounded border-gray-700 text-gray-400">
          Recommended cover photo size is 960 x 640 pixels, with an aspect ratio
          of 3:2
        </p>
      </div>
    </div>
  );
};

export default Header;
