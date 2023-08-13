import React from "react";
import { CustomButton } from ".";

interface FilePickerProps {
  file: FileList | null;
  setFile: (file: any) => void;
  readFile: (type: string) => void;
}

const FilePicker: React.FC<FilePickerProps> = ({ file, setFile, readFile }) => {

  return (
    <div className="filepicker-container">
      <div
        className="felx-1 flex flex-col h-full"
      >
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            e.target.files && setFile(e.target.files[0])
          }
        />
        <label htmlFor="file-upload" className="filepicker-label">
          Upload file
        </label>

        <p className=" mt-2 text-gray-500 text-xs truncate">
          {file
            ? //@ts-ignore
              file.name
            : "No file selected"}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <CustomButton
          type={"outline"}
          title={"Logo"}
          handleClick={() => readFile("logo")}
          customStyles="text-xs"
        ></CustomButton>
        <CustomButton
          type={"filled"}
          title={"Full"}
          handleClick={() => readFile("full")}
          customStyles="text-xs"
        ></CustomButton>
      </div>
    </div>
  );
};

export default FilePicker;
