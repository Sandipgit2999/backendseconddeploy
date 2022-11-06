const { Router } = require("express");
require("dotenv").config();

const { NoteModel } = require("../Models/Notes.model");

const Notecontroller = Router();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
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

  //console.log("jfkdjfksjfksjfskfjskfj", req.files);
  let file;
  if (req.files) {
    file = req.files.photo;
  }
  //console.log("flie-------", file);
  //const videofile = req.files.video;
  //console.log(file,videofile)

  if (file) {
    cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
      console.log(result);
      if (result) {
        if (payload.title && payload.note && payload.tag) {
          const new_note = new NoteModel(payload);

          new_note.imageurl = result.url;
          await new_note.save();
          res.send("successfully added");
        } else {
          res.send("plese fill all details");
        }
      } else if (err) {
        res.send({ msg: "something went wrong in file updloading" });
      } else {
        if (payload.title && payload.note && payload.tag) {
          const new_note = new NoteModel(payload);
          await new_note.save();
          res.send("successfully added");
        } else {
          res.send("plese fill all details");
        }
      }
    });
  } else {
    if (payload.title && payload.note && payload.tag) {
      const new_note = new NoteModel(payload);
      await new_note.save();
      res.send("successfully added");
    } else {
      res.send("plese fill all details");
    }
  }
});

Notecontroller.put("/:id", async (req, res) => {
  const payload = req.body;
  const { id } = req.params;
  console.log(typeof id);

  // const newNote = await NoteModel.findOne({
  //   _id: `"${id}"`,
  //   userId: req.body.userId,
  // });

  //console.log("------------------nwe main node",newNote)

  let file;
  //console.log("req.files", req.files);
  if (req.files) {
    file = req.files.photo;
  }

  //console.log("file", file);

  if (file) {
    cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
      //console.log("reult-url", result);
      if (result) {
        const newNote = await NoteModel.updateOne(
          { _id: id, userId: req.body.userId },
          {
            $set: { ...payload, imageurl: result.url },
          }
        );
        console.log("newNote", newNote);
        res.send({ msg: "successfullly updated note" });
      } else if (err) {
        res.send({ msg: "something went wrong in file updloading" });
      } else {
        const newNote = await NoteModel.updateOne(
          { _id: id, userId: req.body.userId },
          {
            $set: payload,
          }
        );
        res.send({ msg: "successfullly updated note" });
      }
    });
  } else {
    const newNote = await NoteModel.updateOne(
      { _id: id, userId: req.body.userId },
      {
        $set: payload,
      }
    );
    res.send("successfull updated");
  }
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
