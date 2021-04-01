import { serverHooks } from '@vue-storefront/core/server/hooks'
import path from 'path';
import http from 'http'
import fs from 'fs'
import request from 'request'

// const download = (url, path) => new Promise((resolve, reject) => {
//   http.get(url, response => {
//     const statusCode = response.statusCode;

//     if (statusCode !== 200) {
//       return reject('Download error!');
//     }

//     const writeStream = fs.createWriteStream(path);
//     response.pipe(writeStream);

//     writeStream.on('error', () => reject('Error writing to file!'));
//     writeStream.on('finish', () => writeStream.close(resolve));
//   });
// }).catch(err => console.error(err));

export const sitemapMiddleware = () => {
  return (req, res) => {
    res.set('Content-Type', 'application/xml');

    // const staticSitemap = path.resolve('./', 'sitemap.xml');

    // return res.sendFile(staticSitemap);
    // return res.sendFile('https://magento.maudau.com.ua/sitemap.xml');


    // const file = await download("https://magento.maudau.com.ua/sitemap.xml", "./sitemap.xml");
    // return res.sendFile(file);
    // res.setHeader("content-disposition", "attachment; filename=logo.png");
    res.setHeader('Content-Type', 'application/xml');

    request('https://magento.maudau.com.ua/sitemap.xml').pipe(res);
  };
};

serverHooks.afterApplicationInitialized(({ app }) => {
  app.get('/sitemap.xml', sitemapMiddleware())
})
