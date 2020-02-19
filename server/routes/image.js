var express = require('express');
var Image = require('../models/image');
var ImageRouter = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        // rejects storing a file
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

// Sauvegarde l'image dans le dossier uploads et renvoie le chemin du fichier
ImageRouter.route("/uploadmulter").post(upload.single('imageData'), (req, res, next) => {
        return res.status(200).json({
            success: true,
            document: req.file.path
        });
    });

module.exports = ImageRouter;