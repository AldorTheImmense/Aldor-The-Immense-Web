# Aldor Cloud Sync — Supabase Setup

This guide configures the optional cloud-sync controls included in Aldor v2.7.0. Until these steps are completed, Aldor continues to work locally and the existing Save Code tools remain available.

## What this setup creates

- One Supabase account per email address, signed in through a one-use magic link.
- One JSON campaign-save row per user and save slot.
- Row Level Security (RLS) that permits an authenticated user to access only rows carrying their own Supabase user ID.
- Automatic conflict detection in Aldor. If the browser and cloud both changed, Aldor pauses and asks which copy to keep.

## 1. Put Aldor at a stable HTTPS address

Magic-link authentication needs a web address to return to. Opening `index.html` directly as a `file://` URL is still fine for local-only use, but cloud sign-in is intentionally disabled there.

### GitHub Pages option

1. Create a GitHub repository for Aldor.
2. Extract this ZIP and upload its contents to the repository root. Include the empty `.nojekyll` file.
3. Open the repository's **Settings**.
4. Open **Pages** under **Code and automation**.
5. Under **Build and deployment**, select **Deploy from a branch**.
6. Select the branch containing Aldor, normally `main`, and the `/ (root)` folder.
7. Save and wait for GitHub to display the published address, such as:

   `https://YOUR-NAME.github.io/aldor-the-immense/`

Keep that exact address. You will add it to Supabase in step 4.

## 2. Create the Supabase project

1. Sign in to Supabase and create a new project.
2. Choose a strong database password and store it safely. Aldor does not need this password.
3. Wait for the project to finish provisioning.
4. Open the project's **SQL Editor**.

## 3. Create the save table and security policies

Paste the following entire block into the SQL Editor and run it:

```sql
create table if not exists public.aldor_saves (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  slot text not null default 'main' check (char_length(slot) between 1 and 64),
  save_data jsonb not null,
  save_version integer not null default 2,
  app_version text not null,
  updated_at timestamptz not null default now(),
  unique (user_id, slot)
);

create index if not exists aldor_saves_user_id_idx
  on public.aldor_saves using btree (user_id);

alter table public.aldor_saves enable row level security;

revoke all on table public.aldor_saves from anon;
grant select, insert, update, delete on table public.aldor_saves to authenticated;

drop policy if exists "Aldor users can read their own saves" on public.aldor_saves;
create policy "Aldor users can read their own saves"
  on public.aldor_saves
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Aldor users can insert their own saves" on public.aldor_saves;
create policy "Aldor users can insert their own saves"
  on public.aldor_saves
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Aldor users can update their own saves" on public.aldor_saves;
create policy "Aldor users can update their own saves"
  on public.aldor_saves
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Aldor users can delete their own saves" on public.aldor_saves;
create policy "Aldor users can delete their own saves"
  on public.aldor_saves
  for delete
  to authenticated
  using ((select auth.uid()) = user_id);
```

Do not continue if this SQL reports an error.

## 4. Configure magic-link redirects

1. In Supabase, open **Authentication** → **URL Configuration**.
2. Set **Site URL** to the exact HTTPS address where Aldor is hosted.
3. Add the same exact address under **Redirect URLs**.
4. Save the changes.

For a GitHub Pages project, this normally includes the trailing slash:

`https://YOUR-NAME.github.io/aldor-the-immense/`

If you later use a different domain, add that address before attempting to sign in from it.

## 5. Copy the browser-safe API details

1. In Supabase, open the project's **Connect** panel or **Settings** → **API Keys**.
2. Copy the **Project URL**.
3. Copy the **Publishable key** beginning with `sb_publishable_`.

The publishable key is intended for browser code. Its permissions are constrained by authentication and the RLS policies from step 3.

Never place any of these in Aldor:

- Secret key
- `service_role` key
- Database password

## 6. Configure Aldor

Open `cloud-config.js` in a text editor. Replace only the two placeholder strings:

```js
window.ALDOR_CLOUD_CONFIG = Object.freeze({
  supabaseUrl: "https://YOUR_PROJECT_REF.supabase.co",
  supabasePublishableKey: "sb_publishable_REPLACE_ME",
  tableName: "aldor_saves",
  saveSlot: "main"
});
```

Example shape:

```js
window.ALDOR_CLOUD_CONFIG = Object.freeze({
  supabaseUrl: "https://abcdefghijklm.supabase.co",
  supabasePublishableKey: "sb_publishable_example_value_here",
  tableName: "aldor_saves",
  saveSlot: "main"
});
```

Do not change `tableName` unless you also changed the SQL table name. `saveSlot` can remain `main`.

Upload the edited `cloud-config.js` to the hosted copy of Aldor. Wait for the site to redeploy, then hard-refresh the page.

## 7. Make the first cloud save

1. Open the hosted Aldor site on the device containing your current campaign data.
2. Use **Copy Save Code** first and retain that code as a manual backup.
3. Open **Cloud Sync**.
4. Enter your email and select **Send Magic Link**.
5. Open the email on the same device and follow the link.
6. After Aldor reopens and shows the signed-in email, select **Save This Device to Cloud**.
7. Enable **Automatically upload local changes…** after the first successful save.

## 8. Connect another device

1. Open the same hosted Aldor address on the second device.
2. Open **Cloud Sync** and sign in using the same email address.
3. Select **Load Cloud Save**.
4. Enable automatic sync on that device after the cloud save has loaded.

## How conflicts work

Aldor tracks the last local change and the last cloud timestamp seen by each browser.

- Only the local copy changed: automatic sync uploads it.
- Only the cloud copy changed: automatic sync downloads it when the app is opened or revisited.
- Both changed since the previous sync: automatic sync pauses.

In a conflict:

- **Save This Device to Cloud** deliberately replaces the cloud copy.
- **Load Cloud Save** deliberately replaces the current browser copy.

Use **Copy Save Code** before choosing when you want to preserve both versions.

## What is synchronised

- Shop stock
- Custom inventory lists
- Crafting components, recipes, overrides, history, and workshop tier
- Faction reputation and clocks
- Map route, events, safe-rest points, landmarks, and saved route slots
- Encounter history
- Theme, compact mode, sound preference, pinned conditions, and quick-condition mode

Supabase authentication data and the cloud-sync preference itself are not included in the campaign JSON.


## Troubleshooting

- **Cloud button still says Setup:** confirm that both placeholder values in `cloud-config.js` were replaced and that the edited file was uploaded.
- **Magic link returns to the wrong address:** add the exact current Aldor URL to Supabase **Authentication** → **URL Configuration** → **Redirect URLs**.
- **Table not found or permission denied:** confirm that the SQL completed, the `public` schema/table is exposed through Supabase's Data API settings, and the browser is signed in.
- **Supabase client could not load:** check the internet connection or content blocker. Aldor loads the Supabase browser library only when cloud sync is configured, so local-only use remains independent of that download.

## Security check

Test the RLS policies before relying on the save:

1. Sign in to Aldor using one email and create a cloud save.
2. Sign out.
3. Sign in with a different email.
4. Confirm that the second account reports no cloud save and cannot load the first account's data.

Keep manual Save Codes periodically. Cloud sync reduces copying between devices; it should not be your only backup.
