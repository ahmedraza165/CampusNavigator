"use client";
import { ArrowUp } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const MessageTextBox = ({ onSend }: any) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState("");
  const [selectedSource, setSelectedSource] = useState("federal");
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Check if the pressed key is "Enter" (keyCode 13)
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default behavior (new line)
      handleSend(); // Send the message
    }
  };
  const handleSend = () => {
    if (selectedSource.trim() === "") {
      toast.error("Please select a source.");
      return;
    }
    if (value.trim() === "") {
      toast.error("Please enter a message.");
      return;
    }

    // Send the message
    onSend({ message: value, source: selectedSource });

    // Clear the textarea value
    setValue("");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 md:left-[18rem] px-4 bg-white pt-1">
      <div className="max-w-4xl mx-auto lg:px-4 2xl:px-8">
        <div className="relative">
          <textarea
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setValue(e.target.value)
            }
            onKeyDown={handleKeyDown}
            value={value}
            placeholder="Message"
            ref={inputRef}
            rows={1}
            className="py-3 h-[54px] max-h-[200px] pr-[48px] rounded-2xl placeholder:text-lg text-lg resize-none lex w-full border border-input bg-background px-3 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-1 disabled:cursor-not-allowed disabled:opacity-50  scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-none overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
          />

          <span className="absolute bottom-4 right-3 flex items-center">
            <button
              onClick={handleSend}
              disabled={!value}
              className="bg-black p-1 rounded-md disabled:opacity-30"
            >
              <ArrowUp className="text-white" />
            </button>
          </span>
        </div>
        <div className="relative px-2 py-2 text-center text-xs text-gray-600 dark:text-gray-300 md:px-[60px]"></div>
      </div>
    </div>
  );
};

export default MessageTextBox;

     