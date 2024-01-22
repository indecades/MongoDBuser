const mongoose = require("mongoose");

const user = new mongoose.Schema(
    {
        name: {type: String, required: true},
        surname: {type: String, required: true},
        id: {type: Number, required: true},
        dob: {type: String, required: true},
    },
    {collection: "user-data"}
)
const model = mongoose.model("user-data", user)
module.exports = model;