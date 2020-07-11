// ReadableFromPuppeterr, mediaDevices sind wohl die zabuerwörter, danke^^

const puppeteer = require("puppeteer");
const { record } = require("puppeteer-recorder");
console.log(__dirname);
var options = {
  headless: false,
  args: [
    "--enable-usermedia-screen-capturing",
    "--allow-http-screen-capture",
    "--no-sandbox",
    "--auto-select-desktop-capture-source=Jetzt Defender833 abonnieren! - YouTube",
    "--disable-setuid-sandbox",
    "--disable-infobars",
    "--window-size=${width},${height}"
  ], //,
  //executablePath: 'google-chrome-unstable',
};

var width       = 1280;
var height      = 720;
puppeteer.launch(options).then((browser) => {
  return browser
    .pages()
    .then(async (pages) => {
      var page = pages[0];
      await page.goto("https://www.youtube.com/watch?v=kRyIjXSBP-I", { waitUntil: "networkidle2" });
      await page.setBypassCSP(true);

      await page.waitFor(8000)

    await page.evaluate(filename=>{
        window.postMessage({type: 'SET_EXPORT_PATH', filename: filename}, '*')
        window.postMessage({type: 'REC_STOP'}, '*')
    }, exportname)
      
    })
    .then((_) => {
      // return browser.close()
    });
});
