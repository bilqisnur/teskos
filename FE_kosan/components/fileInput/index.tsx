"use client";
import React, { useState } from "react";

type Props = {
  disabled?: boolean;
  acceptTypes: string[];
  onChange: (file: File | null) => void;
  className?: string;
  required?: boolean;
  id?: string;
  label?: string;
  maxSize?: number; // dalam KB (default 2048 = 2MB)
};

const FileInput = (props: Props) => {
  const [message, setMessage] = useState("");
  const limitSize = props.maxSize || 2048; // default 2MB
  const acceptTypes = props.acceptTypes.join(",");
  
  const handleFileInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    callback: (data: File | null) => void
  ): void => {
    const target = event.target;
    const currentFile = target.files?.[0];

    setMessage("");

    if (!currentFile) {
      callback(null);
      return;
    }

    // Validasi tipe file
    if (!props.acceptTypes.includes(currentFile.type)) {
      target.value = "";
      setMessage(`'${currentFile.type}' is an invalid file type. Allowed: ${acceptTypes}`);
      callback(null);
      return;
    }

    // Validasi ukuran file
    if (currentFile.size > limitSize * 1024) {
      target.value = "";
      setMessage(`File size exceeds ${limitSize / 1024} MB limit.`);
      callback(null);
      return;
    }

    callback(currentFile);
  };

  return (
    <div className="w-full flex flex-col gap-1 my-2">
      {props.label && (
        <strong className="text-xs font-bold text-slate-500">{props.label}</strong>
      )}
      <input
        type="file"
        className={`text-sm w-full rounded-md p-2 bg-slate-50 border border-white focus:border-slate-500 focus:outline-none ${props.className}`}
        disabled={props.disabled}
        required={props.required || false}
        accept={acceptTypes}
        id={props.id}
        onChange={(e) => handleFileInput(e, props.onChange)}
      />

      {message && (
        <div className="mt-1 rounded-md bg-yellow-100 text-yellow-700 text-sm p-2 border border-yellow-400">
          ⚠️ {message}
        </div>
      )}
    </div>
  );
};

export default FileInput;
