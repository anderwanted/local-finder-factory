const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'src');
const OUTPUT = path.join(__dirname, '..', 'IMPORTS_MAP.txt');

const results = [];

function walk(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const lines = content.split('\n');

      lines.forEach(line => {
        if (line.trim().startsWith('import')) {
          results.push(`\n[FILE] ${fullPath}\n${line}`);
        }
      });
    }
  }
}

walk(ROOT);

fs.writeFileSync(OUTPUT, results.join('\n'));
console.log('✅ IMPORTS_MAP.txt gerado com sucesso!');
