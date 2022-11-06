const mongoose = require("mongoose");

const NoteSchema =  mongoose.Schema(
  {
    title: { type: String, required: true },
    note: { type: String, required: true },
    tag: { type: String, required: true },
    imageurl: { type: String, default: "" },
    videourl: { type: String, default: "" },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

const NoteModel = mongoose.model("note", NoteSchema);

module.exports = {
  NoteModel,
};
