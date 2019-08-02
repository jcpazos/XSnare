//import Foxdriver from 'foxdriver'
const FoxDriver = require('foxdriver');

(async () => {
    const { browser, tab } = await Foxdriver.launch({
        url: 'https://www.mozilla.org/en-US'
    })

    // enable actor
    await tab.console.startListeners()
    // wait until page is loaded
    await new Promise((resolve) => setTimeout(resolve, 3000))
    // receive logs and page errors
    const logs = await tab.console.getCachedMessages()
    console.log(logs)

    // close browser
    browser.close()
})()