#!/usr/bin/env node

import { readFileSync, createReadStream } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createWriteStream } from 'fs';
import archiver from 'archiver';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface DeployConfig {
  domain: string;
  username: string;
  password: string;
  pluginId?: string;
  environment: 'staging' | 'production';
}

async function deployPlugin(config: DeployConfig) {
  const { domain, username, password, pluginId, environment } = config;
  
  console.log(`🚀 Deploying plugin to ${environment} environment...`);
  console.log(`📦 Target: ${domain}`);
  
  try {
    // プラグインのZIPファイルを作成
    const pluginZipPath = await createPluginZip();
    console.log('✅ Plugin ZIP created');
    
    // kintone APIを使用してプラグインをアップロード
    await uploadPlugin(domain, username, password, pluginZipPath, pluginId);
    console.log('✅ Plugin uploaded successfully');
    
    console.log(`🎉 Deployment to ${environment} completed!`);
  } catch (error) {
    console.error('❌ Deployment failed:', error);
    process.exit(1);
  }
}

async function createPluginZip(): Promise<string> {
  const distPath = join(__dirname, '..', 'dist');
  const manifestPath = join(__dirname, '..', 'plugin.manifest.json');
  const outputPath = join(__dirname, '..', 'plugin.zip');
  
  return new Promise((resolve, reject) => {
    const output = createWriteStream(outputPath);
    const archive = archiver('zip', { zlib: { level: 9 } });
    
    output.on('close', () => {
      console.log(`ZIP created: ${archive.pointer()} bytes`);
      resolve(outputPath);
    });
    
    archive.on('error', reject);
    archive.pipe(output);
    
    // distディレクトリの内容を追加
    archive.directory(distPath, false);
    
    // マニフェストファイルを追加
    if (readFileSync(manifestPath, 'utf8')) {
      archive.file(manifestPath, { name: 'plugin.manifest.json' });
    }
    
    archive.finalize();
  });
}

async function uploadPlugin(
  domain: string, 
  username: string, 
  password: string, 
  pluginZipPath: string, 
  pluginId?: string
) {
  const auth = Buffer.from(`${username}:${password}`).toString('base64');
  const url = `https://${domain}/k/v1/plugin.json`;
  
  const headers = {
    'Authorization': `Basic ${auth}`,
    'Content-Type': 'application/zip',
    'X-Requested-With': 'XMLHttpRequest'
  };
  
  const method = pluginId ? 'PUT' : 'POST';
  const uploadUrl = pluginId ? `${url}?id=${pluginId}` : url;
  
  console.log(`Uploading to: ${uploadUrl}`);
  
  // 実際のHTTPリクエスト処理
  const formData = new FormData();
  const zipBlob = new Blob([readFileSync(pluginZipPath)]);
  formData.append('file', zipBlob, 'plugin.zip');
  
  try {
    const response = await fetch(uploadUrl, {
      method,
      headers,
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log('Upload result:', result);
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}

// メイン処理
async function main() {
  const environment = process.env.DEPLOY_ENVIRONMENT || 'staging';
  const domain = process.env.KINTONE_DOMAIN;
  const username = process.env.KINTONE_USERNAME;
  const password = process.env.KINTONE_PASSWORD;
  const pluginId = process.env.PLUGIN_ID;
  
  if (!domain || !username || !password) {
    console.error('❌ Required environment variables are missing');
    console.error('Please set: KINTONE_DOMAIN, KINTONE_USERNAME, KINTONE_PASSWORD');
    process.exit(1);
  }
  
  await deployPlugin({
    domain,
    username,
    password,
    pluginId,
    environment: environment as 'staging' | 'production'
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}
