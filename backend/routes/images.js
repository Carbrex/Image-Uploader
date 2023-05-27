const express = require('express');
const router = express.Router();

const { uploadImage, getImage} = require('../controllers/images');

router.get('/', getImage);
router.post('/upload', uploadImage);

module.exports = router;