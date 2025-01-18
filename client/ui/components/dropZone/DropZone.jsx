import React, { useState } from 'react';
import { Label } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import {useTranslator} from "../../providers/i18n";

export function DropZone({ onFileSelect }) {
  const t = useTranslator();
  const [preview, setPreview] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      setPreview(URL.createObjectURL(file));
      onFileSelect(file);
    }
  };

  const handleFileInput = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
      setPreview(URL.createObjectURL(file));
      onFileSelect(file);
    }
  };

  const handleReset = () => {
    setPreview(null);
    onFileSelect(null); // Resets the file selection
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Label
        htmlFor="dropzone-file"
        className="relative flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-gray-500 dark:hover:bg-gray-700"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {preview ? (
          <div className="relative w-full h-full">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg"
            />
            <FontAwesomeIcon
              icon={faTimesCircle}
              className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 cursor-pointer fa-lg"
              onClick={handleReset}
              title={t('Remove image')}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <FontAwesomeIcon icon={faCloudArrowUp} className="fa-2xl text-gray-500 dark:text-gray-400 mb-3" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">{t('Click to upload')}</span> {t('or')} <span className="font-semibold">{t('drag and drop')}</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG {t('or')} GIF</p>
          </div>
        )}
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleFileInput}
        />
      </Label>
    </div>
  );
}
