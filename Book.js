const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    sections: [{
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    }],
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model("Book", BookSchema);
