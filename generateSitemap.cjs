const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const { join } = require('path');

// Define your URLs array (adjust these paths based on your app's routes)
const urls = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/add-book', changefreq: 'weekly', priority: 0.8 },
  { url: '/existing-books', changefreq: 'weekly', priority: 0.8 },
  { url: '/edit-book/:bookId', changefreq: 'monthly', priority: 0.6 },
  { url: '/browse-all-books', changefreq: 'weekly', priority: 0.8 },
  { url: '/adminPanel', changefreq: 'monthly', priority: 0.4 },
  { url: '/download-book/:bookId', changefreq: 'monthly', priority: 0.6 },
  { url: '/GJWQ', changefreq: 'monthly', priority: 0.6 },
  { url: '/register', changefreq: 'monthly', priority: 0.6 },
  { url: '/profile', changefreq: 'monthly', priority: 0.6 }
];

// Create a sitemap stream
const smStream = new SitemapStream({ hostname: 'https://pdfversee.netlify.app' });

// Write the sitemap to the public folder
const writeStream = createWriteStream(join(__dirname, 'public', 'sitemap.xml'));

// Pipe the sitemap stream to the write stream
smStream.pipe(writeStream);

// Add URLs to the sitemap
urls.forEach(url => smStream.write(url));

// End the sitemap stream
smStream.end();

// Wait for the stream to finish
streamToPromise(smStream).then(() => {
  console.log('Sitemap generated!');
}).catch(error => {
  console.error('Error generating sitemap:', error);
});
