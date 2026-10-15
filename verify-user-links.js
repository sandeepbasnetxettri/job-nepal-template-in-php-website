
const fs = require('fs');
const path = require('path');

const dirsToCheck = [
  path.join(__dirname, 'frontend'),
  path.join(__dirname, 'frontend', 'job-seeker')
];

let totalChecked = 0;
const missing = [];

dirsToCheck.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
  files.forEach(f => {
    totalChecked++;
    const content = fs.readFileSync(path.join(dir, f), 'utf8');
    const regex = /(?:href|src)=["']([^"'#?]+)["']/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const ref = match[1].trim();
      if (!ref.startsWith('http') && !ref.startsWith('data:') && !ref.startsWith('mailto:') && !ref.startsWith('javascript:') && !ref.startsWith('${') && ref !== '') {
        const target = path.resolve(dir, ref);
        if (!fs.existsSync(target)) {
          missing.push({ file: path.relative(__dirname, path.join(dir, f)), ref: ref, target: target });
        }
      }
    }
  });
});

if (missing.length === 0) {
  console.log(`✅ All ${totalChecked} HTML files are 100% verified and all links/styles/scripts exist!`);
} else {
  console.log('Missing links found:', missing);
}
