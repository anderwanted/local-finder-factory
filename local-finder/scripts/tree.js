import fs from 'node:fs';
import path from 'node:path';

// Pastas que você geralmente quer ignorar
const IGNORE_LIST = ['node_modules', '.git', 'dist', 'build', '.vscode'];

function generateTree(dir, prefix = '') {
    // Lê o conteúdo do diretório
    const files = fs.readdirSync(dir);
    
    files.forEach((file, index) => {
        if (IGNORE_LIST.includes(file)) return;

        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);
        const isLast = index === files.length - 1;
        
        const marker = isLast ? '└── ' : '├── ';
        console.log(`${prefix}${marker}${file}`);

        if (stats.isDirectory()) {
            const newPrefix = prefix + (isLast ? '    ' : '│   ');
            // Chamada recursiva para subpastas
            try {
                generateTree(filePath, newPrefix);
            } catch (err) {
                console.log(`${newPrefix} [Acesso Negado]`);
            }
        }
    });
}

console.log('--- Estrutura do Projeto ---');
console.log('.'); 
generateTree(process.cwd());