// Export all Supabase data to local JSON seed files for migration
// Run: node supabase/export_data.mjs

import { createClient } from '@supabase/supabase-js';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SUPABASE_URL = 'https://renskjrttadhptrwnobz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlbnNranJ0dGFkaHB0cndub2J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5MzE2MTgsImV4cCI6MjA3ODUwNzYxOH0.w1njTYtB3x9QVErGQJJLsCWA3jv2LAsQQdt-2ZW0NoU';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const seedDir = join(__dirname, 'seed');

async function exportTable(tableName, selectColumns = '*', orderBy = 'created_at') {
  console.log(`Exporting ${tableName}...`);
  
  const { data, error } = await supabase
    .from(tableName)
    .select(selectColumns)
    .order(orderBy, { ascending: true });

  if (error) {
    console.error(`  Error exporting ${tableName}:`, error.message);
    return [];
  }

  const filePath = join(seedDir, `${tableName}.json`);
  writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`  ✓ Exported ${data.length} rows -> seed/${tableName}.json`);
  return data;
}

async function main() {
  mkdirSync(seedDir, { recursive: true });
  console.log('=== Supabase Data Export ===\n');

  // 1. portfolio_works (22 rows)
  await exportTable('portfolio_works');

  // 2. insights (90 rows) — full data including content_markdown
  await exportTable('insights');

  // 3. contact_submissions (0 rows, but export schema)
  await exportTable('contact_submissions');

  // 4. job_applications (0 rows, but export schema)
  await exportTable('job_applications');

  // 5. team_members (0 rows, but export schema)
  await exportTable('team_members');

  console.log('\n=== Export Complete ===');
  console.log(`Files saved to: ${seedDir}`);
}

main().catch(console.error);
