const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");

// Videoların kaydedileceği yer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

let videos = [];

app.get("/", (req, res) => {
  res.render("index", { videos });
});

app.post("/upload", upload.single("video"), (req, res) => {
  const { title, date } = req.body;
  if (!req.file) return res.send("Video yüklenmedi!");
  videos.push({
    filename: req.file.filename,
    title,
    date,
  });
  res.redirect("/");
});

app.listen(PORT, () => console.log(`Sunucu çalışıyor: http://localhost:${PORT}`));
