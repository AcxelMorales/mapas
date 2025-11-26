const { writeFileSync, mkdirSync } = require('node:fs')
require('dotenv').config();

const targetPath = './src/environments/environment.ts';
const targetPathDev = './src/environments/environment.development.ts';

if (!process.env['MAP_BOX_KEY']) {
  throw new Error('MAP_BOX_KEY is not set');
}

const envFileContent = `
export const environment = {
  mapboxKey: "${process.env['MAP_BOX_KEY']}"
}
`;

mkdirSync('./src/environments', { recursive: true });
writeFileSync(targetPath, envFileContent);
writeFileSync(targetPathDev, envFileContent);
