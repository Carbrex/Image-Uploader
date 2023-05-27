const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    myFile: {
        type: String,
        required: true,
    },
    uploadedBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'Please provide user']
    }
}, { timestamps: true });

module.exports = mongoose.model('Image', ImageSchema);