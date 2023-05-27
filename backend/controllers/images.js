const Image = require('../models/Image');

const uploadImage = async (req, res) => {
    req.body.uploadedBy = req.user.userId;
    const photo = req.file.filename;
    const newImage = await Image.create({ name: req.body.name, myFile: photo, uploadedBy: req.user.userId });
    newImage.save();
    return res.status(201).json({ msg: "New image uploaded...!" });
}

const getImage = async (req, res) => {
    const data = await Image.find({ uploadedBy: req.user.userId });
    return res.status(200).json({ count: data.length, images: data });
}

module.exports = {
    uploadImage,
    getImage
}
