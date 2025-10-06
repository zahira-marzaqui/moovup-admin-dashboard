const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const exts = ['.js', '.jsx', '.ts', '.tsx'];

function walk(dir) {
  const results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (file === 'node_modules' || file === '.git' || file === 'public' || file === 'build') return;
      results.push(...walk(filePath));
    } else {
      if (exts.includes(path.extname(file))) results.push(path.relative(repoRoot, filePath).replace(/\\/g, '/'));
    }
  });
  return results;
}

function readAllFiles() {
  return walk(repoRoot).map(p => ({ path: p, content: fs.readFileSync(path.join(repoRoot, p), 'utf8') }));
}

const files = walk(repoRoot);
const contents = readAllFiles();

function isImported(target) {
  const targetBase = path.basename(target);
  // check imports by relative path or by basename
  const importRegex = new RegExp(`(from\\s+['\"][^'\"]*${escapeRegExp(targetBase)}['\"])|(require\\(\\s*['\"][^'\"]*${escapeRegExp(targetBase)}['\"]\\s*\\))`);
  for (const f of contents) {
    if (f.path === target) continue;
    if (importRegex.test(f.content)) return true;
  }
  return false;
}

function escapeRegExp(string){
  return string.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
}

const candidates = [];
for (const f of files) {
  if (!isImported(f)) {
    candidates.push(f);
  }
}

fs.writeFileSync(path.join(repoRoot, 'tools', 'unused-files.json'), JSON.stringify({ candidates, count: candidates.length }, null, 2));
console.log('Wrote tools/unused-files.json with', candidates.length, 'candidates');
