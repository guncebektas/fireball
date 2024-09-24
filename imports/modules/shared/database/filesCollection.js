import { FilesCollection } from 'meteor/ostrio:files';

export const Files = new FilesCollection({
  collectionName: 'Files',
  allowClientCode: false, // Disallow remove files from the client
  // storagePath: '/path/to/storage', // Define where to store files
});
