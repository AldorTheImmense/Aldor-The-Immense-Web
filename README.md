# Aldor The Immense

Current version: v2.6.4

Aldor The Immense is a browser-based helper for DMs running a Drakkenheim campaign, styled as a dark gothic DM screen for use during prep or at the table.

The site brings several common table tools into one place so a DM can quickly generate shop inventory, map routes, delerium search results, random encounters, lucky finds, arcane anomalies, common locations, and warped ruins during prep or at the table.



## v2.6.4 chat-ready crafting sharing

- The single **Export for Party** control now creates formatted text for direct use in Discord, WhatsApp, Teams, or another chat.
- Share one individual known recipe, or build a combined party summary containing known recipes, current owned components, and an optional selected crafting plan.
- A live preview shows the exact message before copying, and one button copies the complete formatted text to the clipboard.
- Sharing remains player-safe and does not spend or modify inventory.

## v2.6.3 party crafting exports

- A single **Export for Party** control keeps the Crafting interface uncluttered.
- Export an individual known recipe, every known recipe, the party's current component inventory, or a selected multi-recipe crafting plan.
- Exports are standalone player-safe HTML files that can be shared, opened, or printed without Aldor.
- Crafting-plan exports calculate combined owned and missing component requirements without changing the stored inventory.

## v2.6.2 crafting research behaviour

- Higher-rarity components may still substitute for lower-rarity requirements when actually crafting an item.
- Studying a component for recipe discovery now returns only recipes of the component's exact rarity. For example, studying a Rare Hide can reveal Rare Hide recipes, but not Common, Uncommon, Very Rare, or Legendary recipes.

## Features

- Faction tools for reputation tracking and editable conflict clocks with configurable segment counts.
- Drakkenheim map page with route plotting, Deep Haze overlay, landmark pins, safe-haven travel tracking, route summaries, saved short rest spots, and layered route/rest pins.

- Aldor shop generator for potions, scrolls, uncommon items, rare items, and purchasable crafting schematics.
- Dedicated Crafting & Harvesting page with a condensed Appendix D rules reference and the supplied official harvesting dataset for 123 Monsters of Drakkenheim creatures.
- Persistent party component inventory with source, category, rarity, quantity, value, acquisition details, notes, archiving, and usage history.
- Searchable recipe library spanning Common through Legendary with all 302 recipes retained from v2.5.4. The 77 matching Monsters of Drakkenheim recipes use the official supplied dataset, while the additional campaign recipes remain available. Includes known recipe tracking, component-specific research and instant discovery, workshop checks, craftability analysis, editable recipes, and selectable component spending.
- Custom recipe creation and editing using the Appendix D component and workshop rules.
- Editable shop inventory lists.
- Top-bar Save Code controls for moving shop state, custom item lists, faction reputation, faction clocks, clock sizes, and map data between browsers or computers.
- Compact mode for reducing spacing and control height during table use.
- Delerium search helper that calculates successes, failures, DC +5 bonus successes, party-size scaling, Crater's Edge bonus success, the correct Outer City / Inner City DCs, and total extraction time for found delerium.
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

Most data is stored locally in the user's browser. Save codes can be copied and loaded elsewhere when a DM wants to move shop, crafting, custom item, faction, and map state between devices.


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


Clear Route resets the city route back to the latest approach safe haven, or the currently selected safe haven if no approach has been logged.
