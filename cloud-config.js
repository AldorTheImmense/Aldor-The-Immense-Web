/*
  Aldor cloud-sync configuration.

  Follow SUPABASE_SETUP.md, then replace the two placeholder values below.
  The publishable key is designed to be present in browser code. Never put a
  Supabase secret key or service_role key in this file.
*/
window.ALDOR_CLOUD_CONFIG = Object.freeze({
  supabaseUrl: "https://YOUR_PROJECT_REF.supabase.co",
  supabasePublishableKey: "sb_publishable_REPLACE_ME",
  tableName: "aldor_saves",
  saveSlot: "main"
});
