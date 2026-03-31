import fs from 'fs';
import path from 'path';

const filesToFix = [
    'frontend/src/components/AnalyticsTracker.jsx',
    'frontend/src/components/home/Contact.jsx',
    'frontend/src/hooks/useAnalytics.jsx',
    'frontend/src/pages/admin/AdminDashboard.jsx',
    'frontend/src/pages/admin/AdminLayout.jsx',
    'frontend/src/pages/admin/ModerationLogs.jsx',
    'frontend/src/pages/admin/QueryManagement.jsx',
    'frontend/src/pages/admin/SessionAnalytics.jsx',
    'frontend/src/pages/admin/UserManagement.jsx'
];

const srcDir = path.join(process.cwd(), 'frontend', 'src');

filesToFix.forEach(relPath => {
    const file = path.join(process.cwd(), relPath);
    let content = fs.readFileSync(file, 'utf8');
    
    if (content.includes('API_URL') && !content.includes('import { API_URL }')) {
        const depth = file.substring(srcDir.length).split(path.sep).length - 2;
        const importPrefix = depth > 0 ? '../'.repeat(depth) : './';
        const importStatement = `import { API_URL } from '${importPrefix}config';\n`;
        
        const lastImportIndex = content.lastIndexOf('import ');
        if (lastImportIndex !== -1) {
            const endOfLine = content.indexOf('\n', lastImportIndex);
            content = content.slice(0, endOfLine + 1) + importStatement + content.slice(endOfLine + 1);
        } else {
            content = importStatement + content;
        }
        
        console.log(`Fixed: ${file}`);
        fs.writeFileSync(file, content, 'utf8');
    }
});
