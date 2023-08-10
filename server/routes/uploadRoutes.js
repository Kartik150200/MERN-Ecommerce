import express from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import * as aws from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import fs from "fs";
// import  S3  from "@aws-sdk/client-s3";
dotenv.config();

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const tmpPath = req.file.path;
    const targetPath = "uploads/" + req.file.filename;

    fs.readFile(tmpPath, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Error reading uploaded file" });
      }

      fs.writeFile(targetPath, data, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Error saving file" });
        }
        return res.json({ message: "File uploaded successfully!" });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "image upload failed" });
  }
});

// Create a new instance of the S3 bucket object with the correct user credentials
// console.log("accessKey", process.env.S3_ACCESS_KEY_ID);
// const s3 = new aws.S3({
//   accessKeyId: process.env.S3_ACCESS_KEY_ID,
//   secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
//   region: "us-east-1",
//   Bucket: "kossellsbucket",
// });

// // Setup the congifuration needed to use multer
// const upload = multer({
//   // Set the storage as the S3 bucker using the correct configuration
//   storage: multerS3({
//     s3,
//     acl: "public-read", // public S3 object, that can be read
//     bucket: "kossellsbucket",
//     key: function (req, file, cb) {
//       // callback to name the file object in the S3 bucket
//       // The filename is prefixed with the current time, to avoid multiple files of same name being uploaded to the bucket
//       cb(null, `${new Date().getTime()}__${file.originalname}`);
//     },
//   }),
//   limits: {
//     fileSize: 5000000,
//   },

//   // Configure the list of file types that are valid
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(jpeg|jpg|png|webp|svg)$/)) {
//       return cb(new Error("Unsupported file format"));
//     }
//     cb(undefined, true);
//   },
// });

// router.post("/", upload.single("image"), (req, res) => {
//   try {
//     if (req.file) res.send(req.file.location);
//   } catch (error) {
//     console.log(error);
//   }
// });

export default router;
