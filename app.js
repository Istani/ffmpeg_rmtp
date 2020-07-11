// https://www.twitch.tv/videos/676415394
const puppeteer = require("puppeteer");
const { Readable } = require("stream");
const ffmpeg = require("fluent-ffmpeg");

ffmpeg.setFfmpegPath(__dirname + "\\ffmpeg\\bin\\ffmpeg.exe");
ffmpeg.setFfprobePath(__dirname + "\\ffmpeg\\bin\\ffprobe.exe");

async function wait(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

class ReadableFromPuppeteer extends Readable {
  //private page;

  constructor(options) {
    super(options);

    this.page = options.page;

    this.page.exposeFunction("push", (arr) => {
      console.log(arr.length);
      this.push(new Uint8Array(arr));
    });
  }

  _read() {}
}

async function main() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080 },
    args: [
      "--enable-usermedia-screen-capturing", 
      "--allow-http-screen-capture", 
      "--no-sandbox", 
      "--auto-select-desktop-capture-source=Die exakte Uhrzeit der Atomuhr online bei uhrzeit.org",
      "--disable-setuid-sandbox"],
    //,executablePath="chromium"
  });
  const page = (await browser.pages())[0];
  try {
    await page.goto("https://www.uhrzeit.org/atomuhr.php", { waitUntil: "networkidle2" });
  } catch (e) {
    console.error(e);
  }

  const readable = new ReadableFromPuppeteer({ page });

  await page.evaluate(async () => {
    console.log(this);
    const captureStream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        displaySurface: "browser",
      },
    });

    const recorder = new MediaRecorder(captureStream, {
      //mineType: "video/webm;codecs=H264"
      mineType: "video/webm"
    });

    window.captureStream = captureStream;
    window.recorder = recorder;
    console.log(captureStream);
    console.log(recorder);

    recorder.addEventListener("dataavailable", async (evt) => {
      const buffer = await evt.data.arrayBuffer();
      const array = new Uint8Array(buffer);
      console.log(array);
      window.push([...array]);
    });
    recorder.start(1000);
  });

  const cmd = ffmpeg({ source: readable })
    .videoBitrate(2000)
    .videoCodec("copy")
    //.audioCodec("acc")
    //.audioFrequency(44100)
    .format("flv")
    .saveToFile("test.flv");
  //.save("rmtp://live-fra05.twitch.tv/app/${process.env.STREAM_KEY}");

  cmd.on("start", console.log);
  cmd.on("codecData", (d) => console.log("codeData", d));
  //cmd.on("progress", (p) => console.log("progress", p));
}
main();
