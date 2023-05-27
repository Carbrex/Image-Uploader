const express = require('express');
const router = express.Router();
const {uploadMiddleware} = require('../middleware/upload');

const { uploadImage, getImage} = require('../controllers/images');

router.get('/', getImage);
router.post('/upload', uploadMiddleware.single('myFile') , uploadImage);

module.exports = router;