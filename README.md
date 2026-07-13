# Aldor The Immense

Current version: v2.6.25

Aldor The Immense is a browser-based helper for DMs running a Drakkenheim campaign, styled as a dark gothic DM screen for use during prep or at the table.

The site brings several common table tools into one place so a DM can quickly generate shop inventory, map routes, delerium search results, random encounters, lucky finds, arcane anomalies, common locations, and warped ruins during prep or at the table.






## v2.6.25 structured creature-trait recipe matching

- Added explicit creature-trait matching for recipe qualifiers including blindsight, truesight, exceptional sight, poison/venom, aquatic, flying, swift, regeneration, spellcasting, teleportation, telepathy, magical voices, elemental affinities, resistances, and shapechanging.
- Harvested components now inherit relevant traits from their source creature, so descriptive recipe requirements are enforced instead of being treated as flavour text.
- Added conservative trait coverage across the current Drakkenheim and generated harvestable-creature catalogue.
- Narrative preparation requirements such as “struck by magical lightning” and “willingly given” now require those words in a manually added component’s name, source, or notes rather than accepting an ordinary component automatically.
- Updated APP_VERSION, displayed version text, cache-busting references, README, and changelogs.

## v2.6.24 poison-component and Fiend-hair alignment

- Added Poison Glands to Lob Frog, Sewer Thing, Eldritch Crawler, and Phage so visibly venomous creatures provide an appropriate poison-related organ.
- Broadened Periapt of Proof against Poison to accept Animus from any poisonous creature, including Sewer Thing.
- Added suitable Hair components to the Very Rare Fiends Erinyes, Marilith, and Nalfeshnee for Charged Gauntlets.
- Removed Whirling Bonesaw because its required Ripper component is unavailable in the campaign.

## v2.6.23 campaign-source recipe alignment

- Fixed named-creature alternatives so a Winter Troll heart can satisfy Cold Snap Circlet even though the same requirement also lists dragons.
- Recognised Lob Frog and Sewer Thing as poisonous creatures for recipe matching.
- Broadened Periapt of Proof against Poison to accept Animus from any poisonous creature.
- Added a harvestable Doppelganger with Flesh as an Organ for Mask of Monstrous Forms.
- Changed Sun Blade to require an Eye from a Celestial and added Eyes to generated Deva and Planetar harvest entries.
- Changed Wand of Fireballs to accept an Efreeti Genie Heart or Fire Elemental Elemental Core.
- Removed Flame Tongue because Red Dragons are outside the campaign's expected creature pool.
- Updated APP_VERSION, displayed version text, cache-busting references, README, and changelogs.

## v2.6.22 Fey recipe scope reduction

- Removed 25 recipes from the unsupported-recipe list whose remaining requirements depended on Fey creatures or Fey-derived components unavailable at suitable campaign tiers.
- Kept the Uncommon Instrument of the Bards recipe because it was already automatically obtainable.
- Reduced the active recipe catalogue from 303 to 278 recipes.
- Updated APP_VERSION, displayed version text, cache-busting references, README, and changelogs.

## v2.6.21 campaign-tier recipe scope

- Removed all Legendary recipes because the Drakkenheim campaign and available workshops are not expected to support that tier.
- Removed Boots of the Winterlands, Frozen Armor, and Helm of Burning Rage because their required source creatures are not present in the adventure. Time Dilation Medallion was removed with the Legendary catalogue.
- Removed Legendary from workshop, component, recipe, and custom-entry rarity controls; Very Rare is now the highest supported crafting tier.
- Preserved Appendix D's Legendary reference rows as rules reference material.

## v2.6.20 named-monster component alignment

Campaign-generated creatures now provide the exact components named by recipes where those components were previously absent. Bag of Tricks again accepts mimic mucus or ectoplasm.

## v2.6.19 semantic recipe matching

- Recipe matching now understands equivalent harvested names such as Fire Essence → elemental fluid, Water Essence → elemental water, and Fey Sap → restorative sap.
- Creature source names supply relevant traits such as aquatic, fire-aligned, cold-aligned, swift, poisonous, radiant, shapechanger, and force-wielding.
- Bag of Tricks now asks for ectoplasm, matching an actual harvested component.
- Harvest data itself is unchanged.

## v2.6.19 recipe component terminology pass

- Audited recipe ingredient wording against the actual component types produced by the harvesting catalogue.
- Removed unsupported alternatives such as leg tendons, hooves, swim bladders, sinew, pearls, barbs, lenses, muscles, pelts, and wand-core crystals where Aldor cannot harvest those component types.
- Retained roleplay qualifiers such as creature speed, elemental affinity, anatomy, and source creature type.
- Reworded affected requirements to use existing harvestable equivalents such as claws, gills, hair, glands, fangs, stingers, eyes, cores, hearts, skin, horns, and bones.
- Preserved all recipes, harvest entries, quantities, rarities, and crafting behaviour.
- Updated APP_VERSION, displayed version text, cache-busting references, README, and changelogs.

## v2.6.17 recipe flavour restoration

- Reverted the broad recipe-requirement simplifications introduced in v2.6.16.
- Restored the original bespoke and situational ingredients from v2.6.15, such as specially prepared, altered, or condition-dependent components.
- These requirements may be fulfilled through play and recorded with the existing manual component controls rather than requiring every ingredient to be generated automatically by a monster entry.
- Preserved the expanded encounter-creature harvesting catalogue and all other existing functionality.
- Updated APP_VERSION, displayed version text, cache-busting references, README, and changelogs.

## v2.6.16 recipe compatibility pass

- Audited all 313 recipes against the complete official and campaign-generated harvest catalogue.
- Reworked every requirement that had no valid harvest source into a same-rarity requirement using an obtainable component category.
- Resolved 131 blocked requirements across 85 recipe entries while preserving recipe counts and ingredient quantities.
- Higher-rarity components can still substitute during crafting; recipe discovery still requires exact rarity.
- Verified that every recipe requirement now has at least one harvestable source.
- Updated APP_VERSION, displayed version text, cache-busting references, README, and changelogs.

## v2.6.15 expanded adventure harvesting catalogue

- Added 57 harvestable creatures referenced in the supplied Dungeons of Drakkenheim adventure that were missing from the encounter-harvest browser.
- Added Grotesque Gargant as a distinct creature from Grotesque Gargantuan.
- Generated components using comparable creatures already in Aldor as the baseline, including appropriate creature-type animus, anatomy, materials, and rarity scaling.
- Preserved all existing official and generated harvesting entries.
- Updated APP_VERSION, displayed version text, cache-busting references, README, and changelogs.


## v2.6.13 complete tiered focus recipes

- Added or completed +1, +2, and +3 recipe families for All-Purpose Tool, Amulet of the Devout, Arcane Grimoire, Bloodwell Vial, Dragonhide Belt, Moon Sickle, Rhythm Maker's Drum, Rod of the Pact Keeper, and Wand of the War Mage.
- Existing unsuffixed recipes were renamed to the correct enhancement tier rather than duplicated.
- Added 11 missing recipes while preserving every pre-existing recipe, for 313 recipes total.
- Updated APP_VERSION, displayed version text, cache-busting references, README, and changelogs.

## v2.6.12 expanded shop item descriptions

- Removed the redundant “What it does” heading from purchasable item details.
- Added locally stored, player-facing rules summaries for the standard potions and magic items in Aldor’s Uncommon and Rare shop pools, based on their D&D 5e Wikidot entries.
- Shop item popups now present the effect text directly beneath the item metadata and price.
- Preserved source-specific Aldor and Drakkenheim items that already have local summaries, with the existing plain fallback retained where no public item entry is available.
- Updated APP_VERSION, displayed version text, cache-busting references, README, and changelogs.

## v2.6.11 Shop item effect details

- Shop item details now describe what the purchased magic item does instead of showing its crafting recipe, workshop requirement, components, or recipe source.
- Added concise stored effect summaries for Aldor’s current potion and magic-item stock, spell scrolls, enhancement shields, and magical ammunition.
- Items without a stored rules summary now say so plainly rather than displaying unrelated crafting information.
- Updated APP_VERSION, displayed version text, cache-busting references, README, and changelogs.

## v2.6.10 Emberwood shop pricing and item details

- Doubled schematic sale prices in Aldor's shop to reflect Emberwood scarcity: 100 gp for Uncommon schematics and 1,000 gp for Rare schematics.
- Added clickable shop-item listings that open a compact details dialog using the item and recipe information already included in Aldor.
- Migrated previously generated 50 gp and 500 gp schematic listings to the new prices when saved shop data is loaded.
- Updated APP_VERSION, displayed version text, cache-busting references, README, and changelogs.


## v2.6.9 random-table layout refinement

- Moved the Rumour Generator into the left column beneath Common Locations and Warped Ruins.
- Kept Arcane Anomalies and Mutations together in the right column.
- Updated APP_VERSION, displayed version text, cache-busting references, README, and changelogs.

## v2.6.8 expanded anomalies and mutations

- Expanded Arcane Anomalies to the supplied d100 table.
- Added the supplied expanded d100 Mutations table under Other Random Tables.
- Added manual roll inputs for both tables, alongside random d100 generation.
- Added the Long Rest contamination reminder beneath Mutations.
- Updated APP_VERSION, displayed version text, cache-busting references, README, and changelogs.

## v2.6.7 streamlined encounter harvesting

- Simplified Harvest from Encounter Creatures to a single monster search field.
- Removed the encounter-set and component-rarity filters from the harvesting browser.
- Preserved the existing search-first workflow and individual component-add controls.
- Updated APP_VERSION, displayed version text, cache-busting references, README, and changelogs.

## v2.6.6 corrected component pricing reference

- Replaced the incorrect rarity-based component prices with the Appendix D monster-CR pricing table.
- Added the Appendix D creature-type price multipliers for component values.
- Retained the v2.6.5 harvesting cleanup: no bulk harvest-all action and no creature results before searching.
- Updated APP_VERSION, displayed version text, cache-busting references, README, and changelogs.

## v2.6.5 crafting reference and harvesting cleanup

- Added Appendix D component prices by rarity to the Crafting quick reference.
- Removed the bulk “Add One of Every Listed Component” action from creature harvest cards.
- The harvesting browser now stays empty until a search term is entered instead of showing the first 30 creatures.
- Updated APP_VERSION, displayed version text, cache-busting references, README, and changelogs.

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
