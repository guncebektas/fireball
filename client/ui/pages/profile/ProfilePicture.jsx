import React, {useState} from 'react';
import {Button} from 'flowbite-react';
import {H2} from '../../components/heading/Headings';
import {profileUploadProfilePicture} from "../../../../imports/modules/userProfiles/userProfile.methods";
import {DropZone} from "../../components/dropZone/DropZone";

export const ProfilePicture = () => {
  const [file, setFile] = useState(null);

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(file);

    if (!file) {
      alert('Please select a file.');
      return;
    }

    // Convert the file to a format that can be sent via a method
    const reader = new FileReader();
    reader.onloadend = async () => {
      const fileData = new Uint8Array(reader.result);
      const fileId = await profileUploadProfilePicture({
        fileData,
        name: file.name,
        type: file.type
      });

      console.log(fileId);
    };

    /**
     * , (error, result) => {
     *         if (error) {
     *           console.error('Upload error:', error.reason);
     *         } else {
     *           console.log('File uploaded successfully, ID:', result);
     *         }
     */

    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <H2 text="Upload Profile Picture" />
      <div className="grid grid-flow-col justify-stretch space-x-4">
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
          <div className="mb-2">
            <DropZone onFileSelect={handleFileSelect} />
          </div>
          <div>
            <Button
              type="submit"
              className="w-full flex justify-center py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
