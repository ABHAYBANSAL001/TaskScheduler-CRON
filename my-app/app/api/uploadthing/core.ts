import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
export const ourFileRouter = {
  // Define an endpoint for image uploads
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 4 } })
    .onUploadComplete(async ({ file }) => {
      // console.log("Upload complete, url:", file.ufsUrl);
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;