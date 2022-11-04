const { Router } = require("express");

const { NoteModel } = require("../Models/Notes.model");

const Notecontroller = Router();

Notecontroller.get("/", async (req, res) => {
  //console.log(req.body);
  const result = await NoteModel.find({ userId: req.body.userId });
  res.send(result);
});

Notecontroller.post("/create", async (req, res) => {
  const payload = req.body;
  console.log(payload);
  if (payload.title && payload.note && payload.tag) {
    const new_note = new NoteModel(payload);
    await new_note.save();
    res.send("successfully added");
  } else {
    res.send("plese fill all details");
  }
});

Notecontroller.put("/:id", async (req, res) => {
  const payload = req.body;
  const { id } = req.params;
  const newNote = await NoteModel.updateOne(
    { _id: id, userId: req.body.userId },
    {
      $set: payload,
    }
  );
  res.send("successfull update");
});

Notecontroller.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const newNote = await NoteModel.deleteOne({
    _id: id,
    userId: req.body.userId,
  });
  res.send("successfuly deleted note");
});

module.exports = {
  Notecontroller,
};
