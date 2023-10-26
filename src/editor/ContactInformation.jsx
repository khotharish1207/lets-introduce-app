import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageUpload from "./ImageUpload";

import { setContactInfo } from "../redux/reducer/contactInformation.reducer";

const ContactInformation = () => {
  const { contactInformation } = useSelector((state) => state);
  const dispatch = useDispatch();
  const pubKeyIsValid = false;

  const onChange = (key) => (e) =>
    dispatch(
      setContactInfo({
        key,
        value: e.target.value,
      })
    );

  return (
    <div id="step-2" class="my-8">
      <h2 class="font-extrabold text-2xl">Contact information</h2>
      <ImageUpload
        type="photo"
        label="Add profile photo"
        description="suggested format: jpeg, png or gif"
      />
      <p class="mt-6 border p-4 rounded border-gray-700 text-gray-400">
        Recommended profile photo size is 320 x 320 pixels, with an aspect ratio
        of 1:1
      </p>
      <div class="stepC mt-6 grid grid-cols-2 gap-4">
        <div>
          <label for="firstname" class="ml-4">
            First name
          </label>
          <input
            id="firstname"
            spellcheck="false"
            type="text"
            onChange={onChange("fname")}
            value={contactInformation["fname"]}
            autocapitalize="words"
            class="mt-2 px-4 w-full h-12 bg-black rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-gray-600 hover:border-gray-600"
          />
        </div>
        <div>
          <label for="lastname" class="ml-4">
            Last name
          </label>
          <input
            id="lastname"
            spellcheck="false"
            type="text"
            onChange={onChange("lname")}
            value={contactInformation["lname"]}
            autocapitalize="words"
            class="mt-2 px-4 w-full h-12 bg-black rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-gray-600 hover:border-gray-600"
          />
        </div>
      </div>

      <div class="stepC mt-6">
        <label for="pronouns" class="ml-4">
          Gender pronouns
        </label>
        <input
          id="pronouns"
          spellcheck="false"
          type="text"
          onChange={onChange("pronouns")}
          value={contactInformation["pronouns"]}
          placeholder="He/Him/His"
          autocapitalize="words"
          class="mt-2 px-4 w-full h-12 bg-black placeholder-gray-600 rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-gray-600 hover:border-gray-600"
        />
      </div>

      <div class="stepC mt-6">
        <label for="job-title" class="ml-4">
          Job title
        </label>
        <input
          id="job-title"
          type="text"
          spellcheck="true"
          autocapitalize="words"
          onChange={onChange("title")}
          value={contactInformation["title"]}
          class="mt-2 px-4 w-full h-12 bg-black rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-gray-600 hover:border-gray-600"
        />
      </div>

      <div class="stepC mt-6">
        <label for="business-name" class="ml-4">
          Business name
        </label>
        <input
          id="business-name"
          spellcheck="false"
          type="text"
          onChange={onChange("biz")}
          value={contactInformation["biz"]}
          autocapitalize="words"
          class="mt-2 px-4 w-full h-12 bg-black rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-gray-600 hover:border-gray-600"
        />
      </div>

      <div class="stepC mt-6">
        <label for="business-address" class="ml-4">
          Business address
        </label>
        <textarea
          id="business-address"
          onChange={onChange("addr")}
          value={contactInformation["addr"]}
          class="block mt-2 px-4 py-3 w-full bg-black rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-gray-600 resize-none hover:border-gray-600"
          rows="4"
        ></textarea>
      </div>

      <div class="stepC mt-6">
        <label for="business-description" class="ml-4">
          Business description
        </label>
        <textarea
          id="business-description"
          onChange={onChange("desc")}
          value={contactInformation["desc"]}
          class="block mt-2 px-4 py-3 w-full bg-black rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-gray-600 resize-none hover:border-gray-600"
          rows="4"
        ></textarea>
      </div>

      <div class="stepC relative mt-6">
        <label for="pgp-public-key" class="flex justify-between ml-4">
          OpenPGP public key
          <span
            v-if="genInfo.key"
            class="mr-4"
            class="pubKeyIsValid ? 'text-emerald-500' : 'text-red-600'"
          >
            {pubKeyIsValid ? "Valid" : "Invalid schema"}
          </span>
        </label>
        <textarea
          id="pgp-public-key"
          onChange={onChange("key")}
          value={contactInformation["key"]}
          class="block mt-2 px-4 py-3 w-full bg-black placeholder-gray-600 rounded border border-transparent transition-colors duration-200 focus:outline-none focus:border-gray-600 resize-none hover:border-gray-600"
          rows="4"
          spellcheck="false"
          placeholder="Paste public key block here"
        ></textarea>
      </div>
    </div>
  );
};

export default ContactInformation;
