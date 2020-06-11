process.chdir(__dirname);
const package_info = require("./package.json");
var software = package_info.name + " (V " + package_info.version + ")";
console.log(software);
console.log("=".repeat(software.length));
console.log();

const fs = require("fs");
const moment = require("moment");
const jimp = require("jimp");

/* Checking Example File for New Data! */
var config = require("dotenv").config({ path: ".env" });
var config_example = "";
if (fs.existsSync(".env")) {
  for (var attributename in config.parsed) {
    config_example += attributename + "=\r\n";
  }
  fs.writeFileSync(".env.example", config_example);
} else {
  console.error("Update .env File first!");
  process.exit(1);
}

var current_time = moment().format();
console.log(current_time);

async function generate_livestream_picture() {
  const font = await jimp.loadFont(jimp.FONT_SANS_32_BLACK);
  var image_data = { widht: 1920, height: 1080 };
  new jimp(image_data.widht, image_data.height, 0x3366ff, (err, image) => {
    var text_data = {
      widht: jimp.measureText(font, current_time),
      height: jimp.measureTextHeight(font, current_time, 100),
    };
    image.print(font, image_data.widht - text_data.widht, 0, current_time);
    image.write("livestream.png");
    console.log("Write Picture", current_time);
  });
}
setInterval(() => {
  current_time = moment().format();
  generate_livestream_picture();
}, 500);

const util = require("util");
const exec = util.promisify(require("child_process").exec);
async function main() {
  const { stdout, stderr } = await exec('ffmpeg -loop 1 -i livestream.png -t 120 -c:v libx264 -pix_fmt yuv420p -an -f flv "rtmp://live.twitch.tv/app/' + process.env.stream_key +'"');

  if (stderr) {
    console.error(`error: ${stderr}`);
  }
  process.exit(0);
}
main();
