var fs = require("fs");
var ffmpeg = require("fluent-ffmpeg");

var infs = fs.createReadStream("./test.png");

ffmpeg(infs)
  .loop()
  .videoCodec("libx264")
  .output("outputfile.flv")
  .run();
