import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import * as multerS3 from "multer-s3";
import { appConfig } from "./app-config";
import { S3Client } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
    region: appConfig.region,
    credentials: {
        accessKeyId: appConfig.accessKey!,
        secretAccessKey: appConfig.secretAccessKey!,
    },
});



export const uploadOptions: MulterOptions = {
    storage: multerS3({
        s3,
        bucket: appConfig.bucketName,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldName })
        },
        key: (req, file, cb) => {
            const folderName = 'songs';
            const randomName = Math.random().toString(36).substring(2, 12);
            const extension = file.originalname.split('.').pop();

            cb(null, `${folderName}/${randomName}.${extension}`);
        },
        acl: 'public-read',
    }),

    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['audio/mpeg', 'audio/wav'];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'), false);
        }
    },


    limits: {
        fileSize: 20 * 1024 * 1024, // 20 MB max
    },

}