import React, { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { BsEmojiSmile } from "react-icons/bs";
import { CiImageOn } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";

const EmojiInputField = () => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [previewImage, setPreviewImage] = useState([]);

  const handleInputChange = (e) => {
    console.log(e);
    setMessage(e.target.value);
  };

  const handleEmojiSelect = (emoji) => {
    setMessage(message + emoji.native);
    console.log(message + emoji.native);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const previewUrl = URL.createObjectURL(file);
    setPreviewImage((previewImage) => [...previewImage, previewUrl]);
  };

  return (
    <div className="w-full min-h-[40px] h-auto border rounded-[10px] flex items-center px-4 gap-3 focus-within:border-[#FFCC49]">
      <div className="h-[34px] flex items-center relative px-1 py-2 gap-2">
        <label htmlFor="file-input" className="cursor-pointer">
          <CiImageOn className="text-[#B7BBCC] hover:text-[#FFCC49] w-[18px] h-[18px]" />
          <input
            type="file"
            id="file-input"
            className="hidden"
            onChange={imageHandler}
          />
        </label>
        <button onClick={toggleEmojiPicker}>
          <BsEmojiSmile className="text-[#B7BBCC] hover:text-[#FFCC49] w-[18px] h-[18px]" />
        </button>
        {showEmojiPicker && (
          <div className="absolute top-[2rem]">
            <Picker
              data={data}
              onEmojiSelect={handleEmojiSelect}
              // onClickOutside={() => setShowEmojiPicker(!showEmojiPicker)}
            />
          </div>
        )}
      </div>
      <div className="w-full min-h-[24px] h-auto">
        <textarea
          type="text"
          rows={1}
          value={message}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="w-full bg-transparent outline-none resize-none"
        />
        {previewImage && (
          <div className="flex items-center gap-2">
            {previewImage.map((src) => (
              <div key={src} className="relative">
                <img
                  src={src}
                  alt="preview"
                  className="w-[100px] h-[100px] rounded-md object-cover"
                />
                <button
                  className="absolute top-0 right-0"
                  onClick={() =>
                    setPreviewImage(previewImage.filter((item) => item !== src))
                  }
                >
                  <IoCloseOutline className="text-[#B7BBCC] hover:text-[#FFCC49] w-[18px] h-[18px]" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmojiInputField;
