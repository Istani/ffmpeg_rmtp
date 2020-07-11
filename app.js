// ReadableFromPuppeterr, mediaDevices sind wohl die zabuerwörter, danke^^

var url = 'https://www.youtube.com/watch?v=kRyIjXSBP-I',
    exportname = 'capture',
    size = '1280x720',
    width = parseInt(size.split('x')[0]),
    height = parseInt(size.split('x')[1]),
    length = "10s";
    length = parseInt(length.replace('s',''));

const puppeteer = require('puppeteer');

var options     = {
  headless: false,
  args: [
    '--enable-usermedia-screen-capturing',
    '--allow-http-screen-capture',
    '--auto-select-desktop-capture-source=puppetcam',
    '--disable-infobars',
    '--force-device-scale-factor=1',
    '--load-extension=' + __dirname,
    '--disable-extensions-except=' + __dirname,
  ],
}

async function main() {
    exportname = exportname.replace('.webm','') + '-' + width + 'x' + height + '.webm';
    const browser = await puppeteer.launch(options)
    const pages = await browser.pages()
    const page = pages[0]
    await page._client.send('Emulation.clearDeviceMetricsOverride')
    await page.setViewport({width: width, height: height, deviceScaleFactor: 1})
    await page.goto(url, {waitUntil: 'networkidle2'})
    await page.setBypassCSP(true)

    // Perform any actions that have to be captured in the exported video

    // Give a file name
    await page.evaluate(filename=>{
      window.postMessage({type: 'SET_EXPORT_PATH', filename: filename}, '*')
    }, exportname)

/*
    // Wait
    await page.waitFor(length * 1000);

    // Stop recording
    await page.evaluate(filename=>{
      window.postMessage({type: 'REC_STOP'}, '*')
    }, exportname)

    // Wait for download of webm to complete
    await page.waitForSelector('html.downloadComplete', {timeout: 0})
    await browser.close()
*/
}

main()