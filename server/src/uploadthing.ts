import { createUploadthing, type FileRouter } from "uploadthing/server";

export const fileRouter = {
  imageUploader: createUploadthing()
    .fileTypes(["image"])
    .maxSize("16MB") // Corrected way to set the file size
    .onUploadComplete(async ({ file, metadata }) => {
      console.log("File uploaded:", file);
      console.log("Metadata:", metadata);
    })
} satisfies FileRouter;

export type MyFileRouter = typeof fileRouter;
