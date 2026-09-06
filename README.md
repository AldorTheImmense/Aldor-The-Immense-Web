# Aldor The Immense

Current version: v2.9.0

## v2.9.0 DM Notes workspace

- Expanded DM Notes into a more complete visual workspace while keeping boards spatial and usable on one screen.
- Added a collapsible overlay board drawer on the left so every board remains one click away without reducing the board canvas.
- Added editable card types, custom card colours, status badges, collapsible cards, large focus/edit view, fit-to-content, quick notes, custom templates, and save-card-as-template.
- Added group/frame regions, board background styles, optional grid snapping, multi-select with Shift-drag, group movement, alignment/distribution tools, and selection actions.
- Added right-click menus for cards, images, frames, boards, and empty board space. Cards can be shared to another board or duplicated as independent copies.
- Improved Current Session workflow with one-click/right-click session pinning and multi-select session pinning.
- Added board-link portal cards plus Back/Forward board navigation and optional quick links from cards to Map, Factions, Encounters, Delerium, Other Tables, Crafting, and Shop.
- Added standalone image crop/fill controls, portrait crop preset, captions, direct clipboard image paste, and optional cropped card portraits/thumbnails.
- Added undo/redo for board edits and export of the current board as PNG or via the browser Print / Save as PDF flow.
- Existing v2.8.1 pinboards migrate automatically to the new state model. Save Codes and the existing cloud save payload continue to include DM Notes.
- `cloud-config.js` and `cloud-sync.js` are still deliberately excluded from the release ZIP and are not modified by this release.

## v2.8.1 visual DM pinboards

- Replaced the previous folder/document DM Notes interface with a spatial pinboard designed for campaign prep and one-screen session use.
- Boards are fully user-created and can represent the Party, factions, locations, quests, individual sessions, mysteries, or any other category.
- Cards are draggable and resizable, support Blank/PC/NPC/Faction/Quest/Item/Session templates, tags, favourites, visual styles, and a large freeform notes area.
- A single card can be shown on multiple boards, so (for example) an NPC can live on their faction board and the Current Session board without maintaining two copies.
- Cards and uploaded images can be connected with labelled solid, dashed/uncertain, conflict, or directional-arrow lines.
- Added image uploads to boards. Images are compressed in-browser and stored inside the DM Notes state so they remain portable through existing Save Codes and Cloud Sync.
- Added drag-to-pan, pointer-centred wheel zoom, zoom controls, Fit Board, 100% reset, global search/jump, and a Current Session / Run Session mode with quick navigation to Map, Encounters, and Factions.
- Existing v2.8.0 DM Notes data is migrated automatically into boards/cards on first load.
- `cloud-config.js` and `cloud-sync.js` remain untouched and are deliberately not included in the release ZIP.

## v2.8.0 modular DM Notes

- Added a new top-level **DM Notes** page designed for campaign prep and single-screen use during sessions.
- Added user-created folders and nested subfolders, with starter categories for Party, Factions & NPCs, Quests / Missions, Items, Sessions, and General Notes.
- Added unlimited notes with optional Blank, PC, NPC, Faction, Quest / Mission, Item, and Session templates.
- Added modular note blocks: Text, Heading, Checklist, NPC / Dialogue, Encounter, Travel / Route, Important callout, and Reference-to-another-note.
- Added folder/note reordering, folder renaming/deletion, block reordering/deletion, note tags, favourites, and global note search.
- Added **Current Session** pinning and a compact **Run Session** mode with quick jumps to Notes, Map, Encounters, and Factions.
- Added debounced autosave to browser storage and included the full DM Notes state in manual Save Codes and the existing cloud-sync payload.
- Preserved the existing `cloud-config.js` and `cloud-sync.js` implementation; this release does not replace or modify either file.
- The update ZIP intentionally omits `cloud-config.js` and `cloud-sync.js`, so deploying it over an existing v2.7.7 site will not overwrite your configured cloud files.

## v2.7.7 achievable Drakkenheim recipe audit

- Rewrote all fifteen new delerium, skymetal, and processing recipes using only matcher-supported harvest requirements and justified special materials.
- Removed undefined requirements such as “spellcasting creature” from the new recipe set.
- Added recipe-level enforcement that every harvested component must come from a different creature; special materials and multiple delerium pieces are exempt.
- Added backtracking allocation so the app finds a valid mixed-creature combination instead of failing because a greedy first choice blocks a later requirement.
- Corrected exact material matching so a Delerium Fragment can satisfy the Rare ammunition recipe, while an Ignited Delerium Shard cannot be mistaken for an ordinary Delerium Shard.
- Audited the recipes with exact-tier, campaign-appropriate harvest pools: Uncommon recipes pass with CR 4-or-lower creatures, Rare recipes with CR 6-or-lower creatures, and Very Rare recipes with CR 12-or-lower creatures.


## v2.7.6 fragment-based ammunition recipe

- Hardened Delerium-tipped Arrows now consume one Delerium Fragment rather than a 1,000 gp Refined Delerium Crystal.
- The recipe continues to produce one arrow or bolt and also requires one Rare magical dust.

Aldor The Immense is a browser-based helper for DMs running a Drakkenheim campaign, styled as a dark gothic DM screen for use during prep or at the table.

The site brings several common table tools into one place so a DM can quickly generate shop inventory, map routes, delerium search results, random encounters, lucky finds, arcane anomalies, common locations, and warped ruins during prep or at the table.






## v2.7.6 single-use ammunition recipe

- Hardened Delerium-tipped Arrows now require only one Refined Delerium Crystal and one Rare magical dust.
- The recipe explicitly produces a single arrow or bolt rather than a batch.

## v2.7.4 rarity-balanced Drakkenheim recipes

- Rebuilt all fifteen new delerium, skymetal, and material recipes using the same rarity and component patterns as the rest of the recipe catalogue.
- Removed inappropriate high-CR named requirements such as Marilith fangs from Rare ammunition.
- Uncommon recipes now use Uncommon harvests, Rare recipes use Rare harvests, Very Rare recipes use Very Rare harvests, and the Legendary staff now requires genuinely Legendary monster components.
- Requirements deliberately span multiple creature families instead of drawing an entire recipe from one Glabrezu, Iron Golem, or other single creature.
- Refined Delerium Dust now consumes three Raw Delerium Dust and is explicitly recorded as a crafted Rare magic item.
- Exact crafted reagents now match by name, and creature-type requirements use the harvested creature's actual type rather than words appearing in the component name.

## v2.7.3 recipe audit

All newly added delerium and skymetal recipes now use only exact harvestable monster components and the app’s tracked special materials. Mundane base weapons, ammunition, armour, shields, alchemist’s fire, and fabricated fittings are not recipe ingredients.

## v2.7.3 special material processing and crafting overrides

- Moved location-found materials and intermediate material processing into a pop-out Special Materials dialog to reduce Crafting-page clutter.
- Added Meteoric Iron Lucky Find results for meteor fragments, buried starstone, and meteoric iron veins.
- Added a 15% per-shard chance for delerium search rewards to become Ignited Delerium Shards.
- Added a 50% Ignited Delerium Shard discovery check whenever an arcane anomaly is generated, with DC 15 removal guidance and buttons for successful recovery or a failure-triggered anomaly.
- Added raw delerium stock tracking and hazardous milling: fragments yield 1 Raw Delerium Dust, shards yield 3, and crystals yield 8; the input delerium is destroyed.
- Added a Refined Delerium Crystal material recipe that consumes three shards plus suitable spellcasting-creature components and adds the finished crystal to inventory.
- Refined Delerium Dust remains a Rare magic-item recipe and now adds its finished pouch to inventory when crafted.
- Removed Delerium Geodes and Deep Haze-saturated Geodes from the crafting-material catalogue and replaced their recipe requirements with refined crystals and dust.
- Craft & Spend Components can now open when components are missing. A manual override checkbox shows every owned component and permits deliberate case-by-case substitutions while still spending the selected inventory.
- Updated APP_VERSION, displayed version text, cache-busting references, README, and changelogs.

## v2.7.1 Drakkenheim delerium and skymetal recipes

- Added 14 supplied magic items and complete crafting recipes: Bottled Comet, Comet Smasher, Delerium Crystal Focus, Delerium-Forged Blade, Flame Lance, Hardened Delerium-tipped Arrows, Hazewalker Plate, Purging Rod, Refined Delerium Dust, Skymetal Shield, Skymetal Staff, Spellpiercing Wand, Staff of Contaminated Power, and Starcrossed Bow.
- Added a dedicated Materials Found in Drakkenheim catalogue for meteoric iron and location-found delerium materials.
- Added Material as a first-class crafting component category with exact material-name matching.
- Restored Legendary workshop and recipe support for the explicitly supplied Staff of Contaminated Power.
- Verified every new recipe against the full harvest catalogue plus the location-material catalogue.
- Updated APP_VERSION, displayed version text, cache-busting references, README, and changelogs.

## v2.7.0 optional secure cloud sync

- Added optional Supabase-backed cloud saves for sharing one campaign state across devices.
- Added email magic-link sign-in, manual upload/download controls, device-specific automatic sync, timestamps, and conflict protection.
- Expanded save payloads to include encounter history, saved map routes, map movement controls, and user-interface preferences while retaining compatibility with existing v1 Save Codes.
- Added `cloud-config.js` with safe placeholders and `SUPABASE_SETUP.md` containing hosting, SQL, Row Level Security, redirect, key, and first-sync instructions.
- Cloud sync remains disabled until configured; local browser saves and manual Save Codes continue to work unchanged.
- Updated APP_VERSION, displayed version text, cache-busting references, README, and changelogs.

## v2.6.26 persistent harvest menus

- Harvestable-creature menus now stay open after a component is added.
- Open/closed menu state is retained across crafting-interface rerenders until the user manually closes the creature.
- Updated APP_VERSION, displayed version text, cache-busting references, README, and changelogs.

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

## Local use and cloud sync

You can continue using the site without hosting:

1. Download or clone the repository.
2. Open `index.html` in a browser.

Local browser storage and manual Save Codes still work with no account or network service. Optional cross-device cloud sync requires a stable HTTPS deployment and a Supabase project. Follow `SUPABASE_SETUP.md` for the complete setup.


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
