// export default function handler(req, res) {

//     res.status(200).json({ data: req.body});
// }

// pages/api/upload.js

import multer from 'multer';

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

const handler = upload.single('file'); // 'file' adalah nama field form untuk unggah file

export default (req, res) => {
    handler(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: 'Terjadi kesalahan pengunggahan file.' });
        } else if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Terjadi kesalahan internal server.' });
        }

        // File berhasil diunggah
        return res.status(200).json({ message: 'File berhasil diunggah' });
    });
};
