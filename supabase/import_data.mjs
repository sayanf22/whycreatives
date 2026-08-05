// Import seed data into a NEW Supabase project
// Usage: NEW_SUPABASE_URL=... NEW_SUPABASE_SERVICE_KEY=... node supabase/import_data.mjs
//
// IMPORTANT: Run the migration SQL (00001_full_schema.sql) first!

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SUPABASE_URL = process.env.NEW_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.NEW_SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('ERROR: Set environment variables:');
  console.error('  NEW_SUPABASE_URL=https://YOUR_NEW_REF.supabase.co');
  console.error('  NEW_SUPABASE_SERVICE_KEY=your_service_role_key');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
const seedDir = join(__dirname, 'seed');

function loadSeed(tableName) {
  const filePath = join(seedDir, `${tableName}.json`);
  const raw = readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

async function importTable(tableName) {
  const data = loadSeed(tableName);
  if (!data.length) {
    console.log(`  ⏭ ${tableName}: 0 rows, skipping`);
    return;
  }

  // For insights, batch in groups of 10 to avoid payload limits
  const batchSize = tableName === 'insights' ? 10 : 50;
  let imported = 0;

  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);
    const { error } = await supabase.from(tableName).upsert(batch, { onConflict: 'id' });
    if (error) {
      console.error(`  ✗ ${tableName} batch ${i}: ${error.message}`);
    } else {
      imported += batch.length;
    }
  }
  console.log(`  ✓ ${tableName}: ${imported}/${data.length} rows imported`);
}

async function main() {
  console.log('=== Supabase Data Import ===');
  console.log(`Target: ${SUPABASE_URL}\n`);

  // NOTE: image_url fields in portfolio_works still reference the OLD
  // Supabase storage. You need to:
  //   1. Re-upload the media files to the new project's storage bucket
  //   2. Update the image_url values with the new URLs
  // This script imports the data as-is (links only, no file download).

  await importTable('portfolio_works');
  await importTable('insights');
  await importTable('contact_submissions');
  await importTable('job_applications');
  await importTable('team_members');

  console.log('\n=== Import Complete ===');
  console.log('\nNEXT STEPS:');
  console.log('1. Re-upload portfolio media files to the new storage bucket');
  console.log('2. Update portfolio_works.image_url with new storage URLs');
  console.log('3. Deploy edge functions (generate-daily-insight, sitemap-blog)');
  console.log('4. Set GROQ_API_KEY in edge function secrets');
  console.log('5. Enable the cron job (see migration SQL section 7)');
  console.log('6. Update .env with the new project URL and anon key');
}

main().catch(console.error);
