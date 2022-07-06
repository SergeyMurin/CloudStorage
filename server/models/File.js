const {Schema, model, ObjectId} = require("mongoose")

const File = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    size: {type: Number, default: 0},
    access_link: {type: String},
    date:{type:Date, default:Date.now()},
    path: {type: String, default: ""},
    user: {type: ObjectId, ref: "User"},
    parent: {type: ObjectId, ref: "File"},
    children: [{type: ObjectId, ref: "File"}],
})

module.exports = model("File", File);