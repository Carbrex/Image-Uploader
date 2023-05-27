const Image = require('../models/Image');

const uploadImage = async (req, res) => {
    req.body.uploadedBy = req.user.userId;
    const newImage = await Image.create(req.body);
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
