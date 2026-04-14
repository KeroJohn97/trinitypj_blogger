
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkData() {
  console.log("--- Checking Alpha Media Data ---");
  const { data: items, error } = await supabase
    .from('alpha_media')
    .select('*')
    .eq('category', 'advertising');

  if (error) {
    console.error("Error fetching alpha_media:", error);
    return;
  }

  for (const item of items) {
    console.log(`\nPoster: ${item.title} (ID: ${item.id})`);
    console.log(`- Physical QR ID: ${item.reg_qr_id_physical}`);
    console.log(`- Online QR ID: ${item.reg_qr_id_online}`);

    if (item.reg_qr_id_physical) {
      const { data: asset } = await supabase.from('media_assets').select('*').eq('id', item.reg_qr_id_physical).single();
      console.log(`  Physical Asset in DB: ${asset ? asset.storage_path : 'NOT FOUND'}`);
    }
    if (item.reg_qr_id_online) {
      const { data: asset } = await supabase.from('media_assets').select('*').eq('id', item.reg_qr_id_online).single();
      console.log(`  Online Asset in DB: ${asset ? asset.storage_path : 'NOT FOUND'}`);
    }
  }
}

checkData();
