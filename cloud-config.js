/*
  Aldor cloud-sync configuration.

  Follow SUPABASE_SETUP.md, then replace the two placeholder values below.
  The publishable key is designed to be present in browser code. Never put a
  Supabase secret key or service_role key in this file.
*/
window.ALDOR_CLOUD_CONFIG = Object.freeze({
  supabaseUrl: "https://dthtawbkyvrbekcrgflk.supabase.co",
  supabasePublishableKey: "sb_publishable_OZepw0PH9PQGcbOO_5LLwA_qjLmAK6I",
  tableName: "aldor_saves",
  saveSlot: "main"
});
