const fs = require('fs');
const path = require('path');

const frontendDir = path.join(__dirname, 'frontend');
const htmlFiles = fs.readdirSync(frontendDir).filter(f => f.endsWith('.html'));

let errors = [];

htmlFiles.forEach(file => {
  const filePath = path.join(frontendDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const linkRegex = /(?:href|src)=["']([^"'#?]+)["']/g;
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const target = match[1].trim();
    if (!target.startsWith('http') && 
        !target.startsWith('data:') && 
        !target.startsWith('mailto:') && 
        !target.startsWith('javascript:') && 
        !target.startsWith('${') && 
        target !== '') {
      const resolved = path.resolve(frontendDir, target);
      if (!fs.existsSync(resolved)) {
        errors.push({ file, target, resolved });
      }
    }
  }
});

if (errors.length === 0) {
  console.log(`✅ ALL ${htmlFiles.length} HTML FILES IN frontend/ VERIFIED WITH 0 BROKEN LINKS!`);
} else {
  console.error('Found broken links:', errors);
}
