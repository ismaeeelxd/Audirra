import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { diskStorage } from "multer";
import { extname } from "path";

export const uploadOptions : MulterOptions = {
    storage: diskStorage({
        destination: './uploads/songs',
        filename: (req, file, cb) => {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            const fileExt = extname(file.originalname);
            cb(null, `${uniqueSuffix}${fileExt}`);
        },
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