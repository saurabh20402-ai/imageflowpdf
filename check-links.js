const fs = require('fs');
const path = require('path');
const { TOOLS } = require('./src/lib/tools-registry.js');

const blogDirs = fs.readdirSync('src/app/blog').filter(d => fs.statSync(path.join('src/app/blog', d)).isDirectory());
const routes = new Set([
  '/',
  '/blog/',
  '/tutorials/',
  '/about-us/',
  '/privacy-policy/',
  '/support/',
  '/terms/',
  '/security/',
  '/cookies/',
  '/donate/',
  ...blogDirs.map(b => '/blog/' + b + '/'),
  ...TOOLS.map(t => '/tools/' + t.slug + '/')
]);

console.log('Automated Link Regression Test');
console.log('Total verified system routes:', routes.size);

let errorsCount = 0;

function check(file) {
  const text = fs.readFileSync(file, 'utf8');
  const regex = /(?:href[:=]\s*['"]|toolSlug:\s*['"])([^'"#?]+)['"]/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    let t = match[1];
    if (t.startsWith('/tools/') || t.startsWith('/blog/') || t.startsWith('/')) {
      if (!t.endsWith('/') && !t.includes('.')) t += '/';
      if (!routes.has(t) && !t.startsWith('/api') && !t.includes('favicon')) {
        console.error(`[BROKEN LINK] in ${file} -> "${match[1]}" (normalized: "${t}")`);
        errorsCount++;
      }
    } else if (match[0].startsWith('toolSlug')) {
      const toolRoute = '/tools/' + t + '/';
      if (!routes.has(toolRoute)) {
        console.error(`[BROKEN TOOLSLUG] in ${file} -> "${t}"`);
        errorsCount++;
      }
    }
  }
}

const files = [
  'src/components/Footer.jsx',
  'src/components/Navbar.jsx',
  'src/app/blog/BlogContent.jsx',
  'src/app/tutorials/TutorialsPageClient.jsx',
  'src/components/ToolPageClient.jsx',
  'src/app/page.js',
  'src/app/about-us/page.js',
  'src/app/privacy-policy/page.js',
  'src/app/support/page.js',
  ...blogDirs.map(d => path.join('src/app/blog', d, 'page.js'))
];

files.forEach(f => {
  if (fs.existsSync(f)) check(f);
});

if (errorsCount > 0) {
  console.error(`FAILED: ${errorsCount} broken link(s) detected!`);
  process.exit(1);
} else {
  console.log('SUCCESS: All internal links resolve to valid, active routes. (0 broken links)');
  process.exit(0);
}
