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

const searchImage = async (req, res) => {
    const searchQuery = req.params.searchQuery.toLowerCase();
    const data = await Image.find({ uploadedBy: req.user.userId });
    const filterData = data.filter((image) => {
        const imageName = image.name.toLowerCase();
        return imageName.includes(searchQuery);
    });
    console.log(filterData);
    return res.status(200).json({ count: filterData.length, images: filterData });
}

module.exports = {
    uploadImage,
    getImage,
    searchImage
}
