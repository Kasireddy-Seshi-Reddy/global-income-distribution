import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'frontend', 'src');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else if (file.endsWith('.jsx')) { 
            results.push(file);
        }
    });
    return results;
}

const files = walk(srcDir);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // Fix the literal quotes issue
    if (content.includes("'${API_URL}'")) {
        content = content.replace(/'\$\{API_URL}'/g, '`${API_URL}`');
        changed = true;
    }
    if (content.includes("'${API_URL}/")) {
        content = content.replace(/'\$\{API_URL}\/([^']+)'/g, '`${API_URL}/$1`');
        changed = true;
    }

    // Remove the hardcoded const API_URL = ...
    if (content.includes("const API_URL = `${API_URL}`;")) {
        content = content.replace(/const API_URL = `\$\{API_URL\}`;[^\n]*\n?/g, '');
        changed = true;
    }

    // Determine deep relative path for importing config.js
    const depth = file.substring(srcDir.length).split(path.sep).length - 2;
    const importPrefix = depth > 0 ? '../'.repeat(depth) : './';
    const importStatement = `import { API_URL } from '${importPrefix}config';\n`;

    if (content.includes('API_URL') && !content.includes("from '") && !content.includes('import { API_URL }')) {
        // Find last import statement to append to
        const lastImportIndex = content.lastIndexOf('import ');
        if (lastImportIndex !== -1) {
            const endOfLine = content.indexOf('\n', lastImportIndex);
            content = content.slice(0, endOfLine + 1) + importStatement + content.slice(endOfLine + 1);
            changed = true;
        } else {
            content = importStatement + content;
            changed = true;
        }
    }

    if (changed) {
        console.log(`Fixed: ${file}`);
        fs.writeFileSync(file, content, 'utf8');
    }
});
