# Aldor The Immense

Aldor The Immense is a browser-based helper site for Dungeon Masters running a *Dungeons of Drakkenheim* campaign.

The deployed website provides quick-access tools for common table tasks, including shop generation, delerium searches, random encounters, arcane anomalies, and campaign utility rolls. It is designed to be used during prep or live at the table without needing players or DMs to install anything.

## Features

- Generate Aldor's shop inventory, including potions, scrolls, uncommon items, and rare items.
- Edit the available shop inventory lists directly in the browser.
- Copy and load save codes to move shop state between browsers or computers.
- Generate delerium search results with reminders for DCs, cumulative rewards, extra successes, failures, and Crater's Edge bonuses.
- Generate random encounters for Outer City, Inner City, and Sewers.
- Roll the Lucky Finds table automatically after each generated encounter.
- Toggle Monsters of Drakkenheim mode for updated Outer City and Inner City encounter tables.
- Roll listed encounter dice counts automatically while still showing the dice expression used.
- Automatically roll a Lucky Find after every random encounter.
- Generate Warped Ruins, Common Locations, and Arcane Anomalies.

## Using the website

Open the GitHub Pages deployment for this repository in a browser. The site runs entirely in the browser, so it works without a server or database.

Most tools work by selecting the relevant table or mode, then pressing the matching generate button. Results appear immediately on the page.

## Save codes

The shop state can be copied as a save code and loaded again later. This is useful when moving between devices, browsers, or sessions.

The save code stores the current shop inventory and custom inventory lists. It is not encrypted, so do not use it for private information.

## GitHub Pages

This repository is intended to be deployed as a static GitHub Pages site. The main files are:

- `index.html`
- `style.css`
- `script.js`
- `assets/`

For GitHub Pages deployment, these files should be at the root of the repository unless the Pages settings are configured differently.

## Notes

This is an unofficial table aid for DMs running Drakkenheim campaigns. It is intended to speed up play and reduce page-checking during sessions, not replace the campaign book or the DM's judgement.
