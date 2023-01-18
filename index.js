

// (async () => {
//   init();

//   await page.goto('https://fitgirl-repacks.site/all-my-repacks-a-z/');

//   let morePages = true;
//     let pageUrls = [];
//     while (morePages) {
//         // Extraer URLs de las subpáginas
//         const pageLinks = await page.evaluate(() => Array.from(document.querySelectorAll("#lcp_instance_0 a"), a => a.href));
//         pageUrls = pageUrls.concat(pageLinks);
//         // Verificar si hay un botón de "siguiente página"
//         const nextButton = await page.$('.lcp_nextlink');
//         if (nextButton) {
//             // Hacer clic en el botón de "siguiente página"
//             await nextButton.click();
//             // Esperar a que la página cargue
//             await page.waitForNavigation();
//         } else {
//             morePages = false;
//         }
//     }
//     // Cerrar navegador
//     await browser.close();
//     console.log(pageUrls);
// })();


const puppeteer = require('puppeteer');
const MongoClient = require('mongodb').MongoClient;

const  init = async () =>{

}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://fitgirl-repacks.site/all-my-repacks-a-z/');

  let morePages = 0;
    let pageUrls = [];
    while (morePages < 1) {
        // Extraer URLs de las subpáginas
        const pageLinks = await page.evaluate(() => Array.from(document.querySelectorAll("#lcp_instance_0 a"), a => ({ href: a.href, innerHTML: a.innerHTML })));
        pageUrls = pageUrls.concat(pageLinks);
        // Verificar si hay un botón de "siguiente página"
        const nextButton = await page.$('.lcp_nextlink');
        if (nextButton) {
            // Hacer clic en el botón de "siguiente página"
            await nextButton.click();
            // Esperar a que la página cargue
            await page.waitForNavigation();
            morePages += 1;
        } else {
            morePages = 2;
        }
    }
    // Cerrar navegador
    await browser.close();
    console.log(pageUrls);

    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url, { useNewUrlParser: true });
    await client.connect();

    const db = client.db('mydatabase');
    const collection = db.collection('mycollection');

    await collection.insertMany(pageUrls);

    await client.close();
})();

