import { SitemapStream, streamToPromise } from 'sitemap';
import fs from 'fs';
import path from 'path';

const urls = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/existing-books', changefreq: 'weekly', priority: 0.8 },
  { url: '/edit-book/:bookId', changefreq: 'monthly', priority: 0.6 },
  { url: '/browse-all-books', changefreq: 'weekly', priority: 0.8 },
  { url: '/download-book/:bookId', changefreq: 'monthly', priority: 0.6 },
];

const smStream = new SitemapStream({ hostname: 'https://pdfversee.netlify.app' });
const writeStream = fs.createWriteStream(path.join('public', 'sitemap.xml'));

smStream.pipe(writeStream);
urls.forEach((url) => smStream.write(url));
smStream.end();

streamToPromise(smStream)
  .then(() => {
    console.log('Sitemap generated successfully!');
  })
  .catch((err) => {
    console.error('Error generating sitemap:', err);
  });
