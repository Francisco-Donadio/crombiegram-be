import S3 from "aws-sdk/clients/s3";

class FileUpload {
  name: string;
  url: string;

  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
  }
  result!: any[];
}

export class S3Controller {
  BUCKET = "crombiegram-files"; // For example, 'my_bucket'.

  // private static getS3Bucket(): any {
  //   return new S3({
  //     accessKeyId: "AKIASMZ6DFSSFRTP5ZSN", // For example, 'AKIXXXXXXXXXXXGKUY'.
  //     secretAccessKey: "eYrnJJMmTe8g2BOjDy5FXGNs1PqSsJJcR4ABO+5B", // For example, 'm+XXXXXXXXXXXXXXXXXXXXXXDDIajovY+R0AGR'.
  //     region: "sa-east-1", // For example, 'us-east-1'.
  //   });
  // }

  public uploadFile(file: any) {
    console.log("file", file);
    const bucket = new S3({
      accessKeyId: "AKIASMZ6DFSSFRTP5ZSN",
      secretAccessKey: "eYrnJJMmTe8g2BOjDy5FXGNs1PqSsJJcR4ABO+5B",
      region: "sa-east-1",
    });

    const params = {
      Bucket: this.BUCKET,
      Key: file.name,
      Body: file,
      ACL: "public-read",
    };

    bucket.upload(params, function (err: any, data: any) {
      if (err) {
        console.log("There was an error uploading your file: ", err);
        return false;
      }
      console.log("Successfully uploaded file.", data);
      return true;
    });
  }

  // public getFiles(): Observable<Array<FileUpload>> {
  //   const fileUploads: any[] = [];

  //   const params = {
  //     Bucket: this.BUCKET,
  //     Prefix: this.FOLDER,
  //   };

  //   S3Controller.getS3Bucket().listObjects(
  //     params,
  //     function (err: string, data: { Contents: any }) {
  //       if (err) {
  //         console.log("There was an error getting your files: " + err);
  //         return;
  //       }
  //       console.log("Successfully get files.", data);

  //       const fileDetails = data.Contents;

  //       fileDetails.forEach((file: { Key: string }) => {
  //         fileUploads.push(
  //           new FileUpload(
  //             file.Key,
  //             "https://s3.amazonaws.com/" + params.Bucket + "/" + file.Key
  //           )
  //         );
  //       });
  //     }
  //   );

  //   return of(fileUploads);
  // }

  // public deleteFile(file: FileUpload) {
  //   const params = {
  //     Bucket: this.BUCKET,
  //     Key: file.name,
  //   };

  //   S3Controller.getS3Bucket().deleteObject(
  //     params,
  //     (err: { message: any }, data: any) => {
  //       if (err) {
  //         console.log("There was an error deleting your file: ", err.message);
  //         return;
  //       }
  //       console.log("Successfully deleted file.");
  //     }
  //   );
  // }
}
// snippet-end:[s3.typescript.controller]
