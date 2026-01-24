
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuração simples para Node.js (ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputFileName = 'RELATORIO_TECNICO.txt';
const dirsToScan = ['src']; // Pastas para ler
const ignoreFiles = ['vite-env.d.ts', '.DS_Store']; // Arquivos para ignorar

let reportContent = `RELATÓRIO TÉCNICO DO PROJETO\nData: ${new Date().toLocaleString()}\n\n`;

function scanDirectory(directory) {
    const files = fs.readdirSync(directory);

    files.forEach(file => {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            scanDirectory(fullPath);
        } else {
            if (!ignoreFiles.includes(file) && (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.css'))) {
                const content = fs.readFileSync(fullPath, 'utf8');
                reportContent += `\n--- ARQUIVO: ${fullPath} ---\n`;
                reportContent += content;
                reportContent += `\n----------------------------------\n`;
            }
        }
    });
}

// 1. Lê o package.json para saber as dependências
try {
    const pkg = fs.readFileSync('package.json', 'utf8');
    reportContent += `--- PACKAGE.JSON ---\n${pkg}\n--------------------\n`;
} catch (e) { console.log("Sem package.json?"); }

// 2. Escaneia a pasta SRC
dirsToScan.forEach(dir => {
    if (fs.existsSync(dir)) scanDirectory(dir);
});

// 3. Salva o arquivo
fs.writeFileSync(outputFileName, reportContent);
console.log(`✅ Relatório gerado com sucesso: ${outputFileName}`);
console.log(`👉 Envie este arquivo para a IA caso ela perca o contexto.`);
