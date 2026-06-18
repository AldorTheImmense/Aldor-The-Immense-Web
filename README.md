# Aldor The Immense

Current version: v2.3.0

Aldor The Immense is a browser-based helper for DMs running a Drakkenheim campaign, styled as a dark gothic DM screen for use during prep or at the table.

The site brings several common table tools into one place so a DM can quickly generate shop inventory, map routes, delerium search results, random encounters, lucky finds, arcane anomalies, common locations, and warped ruins during prep or at the table.


## Features

- Faction tools for reputation tracking and editable conflict clocks.
- Drakkenheim map page with route plotting, Deep Haze overlay, landmark pins, safe-haven travel tracking, route summaries, and saved short rest spots.

- Aldor shop generator for potions, scrolls, uncommon items, and rare items.
- Editable shop inventory lists.
- Top-bar Save Code controls for moving shop state, custom item lists, faction reputation, faction clocks, and map data between browsers or computers.
- Delerium search helper that calculates successes, failures, DC +5 bonus successes, party-size scaling, Crater's Edge bonus success, and the correct Outer City / Inner City DCs.
- Random encounter generator for Outer City, Inner City, and Sewers.
- Monsters of Drakkenheim mode for updated Outer City and Inner City encounter tables.
- Faction filters for encounter results.
- Manual encounter roll input.
- Automatic Lucky Finds roll after each generated encounter, including specific spell scroll results.
- Encounter history log with date and time.
- Reroll controls for encounter, lucky find, and enemy counts.
- Arcane Anomalies generator.
- Common Locations, Warped Ruins, and Rumour generators.
- Draggable Conditions pop-out with Drakkenheim-specific condition references, search/filter, pinned conditions, quick reference mode, and a Drakkenheim Madness roller.
- Dark gothic DM screen styling, collapsible sections, sticky navigation, improved mobile bottom action bar, themed empty states, subtle result animations, theme toggle, and optional sound toggle.

## Local use

You can also use the site without GitHub Pages:

1. Download or clone the repository.
2. Open `index.html` in a browser.

Most data is stored locally in the user's browser. Save codes can be copied and loaded elsewhere when a DM wants to move shop, custom item, faction, and map state between devices.


## Map routing notes

The Map page includes road landmarks for Emberwood Village, Eckerman Mill, and Camp Dawn. Adding an approach from one of those safe havens starts the city route at the matching road landmark when no route is already plotted.


## Map time tracking

The Map page can track a day start time, safe-haven approach travel, route hours, and logged events. Standard map events take one hour; custom events can use a custom duration.


## Map log events

Use **Add Log Event** on the Map page to record rests, searches, wrong turns, and custom time blocks. Standard events take one hour; custom events use the entered duration in minutes.


## Map road type and zoom

The Map page supports zooming, movable landmark lists, and road-type switching. Use **Main roads** for ordinary street movement and **Side roads / rubble** for difficult sections that travel at half speed.


## Map zoom and pan

Use the vertical zoom slider on the Map page to zoom in. Hold right-click and drag on the map to pan while zoomed.
