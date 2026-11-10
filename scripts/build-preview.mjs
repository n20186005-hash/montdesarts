import { existsSync, readFileSync, statSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const defaultConfigs = [
  'wrangler.toml', 'wrangler.json', 'wrangler.jsonc',
  'open-next.config.ts', 'open-next.config.js',
  '.wrangler/deploy/config.json',
];

function checkIsolation() {
  const unexpected = defaultConfigs.filter(path => existsSync(path));
  if (unexpected.length) {
    throw new Error(`Preview build requires default configuration paths to remain absent: ${unexpected.join(', ')}`);
  }
}

const config = JSON.parse(readFileSync('wrangler.preview.jsonc', 'utf8'));
const keys = ['$schema', 'name', 'main', 'compatibility_date', 'compatibility_flags', 'assets', 'previews'];
if (Object.keys(config).some(key => !keys.includes(key)) ||
    config.name !== 'montdesarts' || config.main !== '.open-next/worker.js' ||
    config.compatibility_date !== '2026-10-01' ||
    JSON.stringify(config.compatibility_flags) !== JSON.stringify(['nodejs_compat', 'global_fetch_strictly_public']) ||
    JSON.stringify(config.assets) !== JSON.stringify({ directory: '.open-next/assets', binding: 'ASSETS' }) ||
    !config.previews || Object.keys(config.previews).length !== 0) {
  throw new Error('Unexpected preview configuration; review it before building.');
}

checkIsolation();
const result = spawnSync(process.execPath, [
  'node_modules/@opennextjs/cloudflare/dist/cli/index.js', 'build',
  '--openNextConfigPath', 'open-next.preview.config.ts',
  '--config', 'wrangler.preview.jsonc',
], { stdio: 'inherit' });
checkIsolation();
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
for (const path of ['.open-next/worker.js', '.open-next/assets']) {
  if (!existsSync(path)) throw new Error(`Missing preview output: ${path}`);
}
if (!statSync('.open-next/worker.js').isFile() || !statSync('.open-next/assets').isDirectory()) {
  throw new Error('Invalid preview Worker or asset output.');
}
console.log('Preview Worker built with explicit configuration; default configuration paths remain absent.');
