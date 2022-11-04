const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
  title: String,
  note: String,
  tag: String,
  userId: {type:String,required:true},
});

const NoteModel = mongoose.model("note", NoteSchema);

module.exports = {
  NoteModel,
};
