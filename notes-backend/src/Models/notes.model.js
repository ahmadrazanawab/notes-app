const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    tag: {
        type: String,
        require: true,
    },
},
    {
        timestamps: true
    }
);

const Notes = mongoose.model("Notes", notesSchema);

module.exports = Notes;