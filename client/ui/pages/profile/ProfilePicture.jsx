import React, {useState} from 'react';
import {Button} from 'flowbite-react';
import {H2} from '../../components/heading/Headings';
import {DropZone} from "../../components/dropZone/DropZone";
import {Images} from "../../../../imports/modules/files/images/database/images";
import {ToastWarning} from "../../components/alert/Toast";
import {imageGet} from "../../../../imports/modules/files/images/image.methods";
import {useTranslator} from "../../providers/i18n";
import {Log} from "meteor/logging";

export const ProfilePicture = () => {
  const t = useTranslator();

  const [file, setFile] = useState(null);

  imageGet({_id: 'BsFTsWZWWsZKpDY5b'}, (err, res) => {
    console.log(err);
    console.log(res);
  })

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      await ToastWarning('Please select a file.');
      return;
    }

    const uploadInstance = Images.insert({
      file: file,
      chunkSize: 'dynamic'
    }, false);

    uploadInstance.on('end', function(error, fileObj) {
      if (error) {
        Log.error(`Error during upload: ${error.reason}`);
      } else {
        Log.info(`File ${fileObj.name} successfully uploaded`);
      }
    });

    uploadInstance.start();

    const fileId = uploadInstance.config.fileId;
  };

  return (
    <>
      <div className="my-3">
        <H2 text="Upload profile picture" />
      </div>

      <div className="grid grid-flow-col justify-stretch space-x-4">
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
          <div className="mb-2">
            <DropZone onFileSelect={handleFileSelect} />
          </div>
          <div>
            <Button type="submit" color="primary">{t('Upload')}</Button>
          </div>
        </form>
      </div>
    </>
  );
};
