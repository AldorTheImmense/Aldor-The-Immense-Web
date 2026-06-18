# Aldor The Immense

Aldor The Immense is a browser-based helper for DMs running a Drakkenheim campaign.

The site brings several common table tools into one place so a DM can quickly generate shop inventory, delerium search results, random encounters, lucky finds, arcane anomalies, common locations, and warped ruins during prep or at the table.

## Website deployment

This project is designed to run as a static website, so it works well on GitHub Pages. Once deployed, users can open the site in a browser without installing anything.

To publish on GitHub Pages:

1. Upload the site files to your GitHub repository.
2. Make sure `index.html`, `style.css`, `script.js`, `changelog.html`, and the `assets` folder are at the repository root.
3. In the repository, go to **Settings → Pages**.
4. Set the source to deploy from the `main` branch and `/root` folder.
5. Save and wait for GitHub Pages to publish the site.

The live site will usually be available at:

```text
https://your-username.github.io/your-repo-name/
```

## Features

- Aldor shop generator for potions, scrolls, uncommon items, and rare items.
- Editable shop inventory lists.
- Save-code support for moving shop state between browsers or computers.
- Delerium generation tools and a search helper that calculates successes, failures, DC +5 bonus successes, party-size scaling, and Crater's Edge bonus success.
- Random encounter generator for Outer City, Inner City, and Sewers.
- Monsters of Drakkenheim mode for updated Outer City and Inner City encounter tables.
- Faction filters for encounter results.
- Manual encounter roll input.
- Automatic Lucky Finds roll after each generated encounter.
- Encounter history log with date and time.
- Reroll controls for encounter, lucky find, and enemy counts.
- Arcane Anomalies generator.
- Common Locations and Warped Ruins generators.
- Collapsible sections, sticky navigation, mobile-friendly layout, and dark mode.

## Local use

You can also use the site without GitHub Pages:

1. Download or clone the repository.
2. Open `index.html` in a browser.

Most data is stored locally in the user's browser. Save codes can be copied and loaded elsewhere when a DM wants to move shop state between devices.
