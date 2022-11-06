const { Router } = require("express");

const { NoteModel } = require("../Models/Notes.model");

const Notecontroller = Router();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "du5yad6ea",
  api_key: "666854984499736",
  api_secret: "uf1Rucp0wwYjgCdaY_UrJC3rYuE",
  secure: true,
});

Notecontroller.get("/", async (req, res) => {
  //console.log(req.body);
  const result = await NoteModel.find({ userId: req.body.userId });
  res.send(result);
});

Notecontroller.post("/create", async (req, res) => {
  const payload = req.body;
  console.log(payload);

  const file = req.files.photo;
  const videofile = req.files.video;
  //console.log(file,videofile)


  
  cloudinary.uploader.upload(videofile.tempFilePath, async (err, result) => {
    console.log(result);
    // if (payload.title && payload.note && payload.tag) {
     
    //   const new_note = new NoteModel(payload);
      
    //   new_note.videourl = result.url;
    //   await new_note.save();
    //   res.send("successfully added");
    // } else {
    //   res.send("plese fill all details");
    // }
    res.send("successfully  ")
  });
  
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
