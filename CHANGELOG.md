# Changelog

## v2.3.1
- Clear Route now resets the route start point back to the relevant safe haven marker.
- If an approach has been logged, Clear Route uses the latest approach safe haven.
- If no approach has been logged, Clear Route uses the currently selected safe haven.
- Updated the Map route rules note to describe the Clear Route behaviour.
- Updated the footer version number.

## v2.3.0
- Marked the Drakkenheim Route Map as a stable feature set.
- Clarified the Road type control so Side roads / rubble explicitly says it is half speed.
- Added a compact Map route rules collapsible under the route controls.
- Added reminders for changing pace or road type before the next click when only part of an hour changes movement conditions.
- Updated the footer version number.

## v2.2.16
- Replaced native browser tooltips on map pins with instant themed map tooltips.
- Added compact themed tooltip styling for landmarks, route markers, rest spots, and route segments.
- Hid map tooltips while panning, zooming, or scrolling the map.

## v2.2.15
- Updated Map landmark pop-out routing so clicking a landmark ends the current exploration hour at that landmark when it can be reached with the remaining time.
- Applied the same endpoint behaviour to saved short rest spots in the landmark pop-out.

## v2.2.14
- Rebuilt the Map zoom control as a custom vertical slider that can be dragged smoothly.
- Kept the zoom control fixed over the map's top-right corner instead of letting it scroll with the map contents.
- Improved the zoom slider hit area and thumb behaviour.

## v2.2.13
- Fixed the Map zoom slider so it is visibly overlaid in the top-right corner of the map.
- Moved the zoom widget out of the map content flow so it no longer gets pushed below the map image.

## v2.2.12
- Moved the Map zoom control onto the map as a vertical slider in the top-right corner.
- Added a compact reset button beside the map zoom slider.
- Added right-click hold-and-drag panning for the map when zoomed in.
- Updated map help text to mention zooming and right-click panning.

## v2.2.11
- Added custom duration support for every map log event type.
- Moved the map landmark list into a draggable pop-out window.
- Added map zoom controls with a reset button.
- Added a Road type control for main roads versus side roads / rubble.
- Side roads / rubble can be used for only part of an exploration hour and travel at half speed.
- Updated route line styling and exploration log output for side-road segments.

## v2.2.10
- Moved Add Log Event into a draggable pop-out window.
- Renamed the custom event duration label to Custom duration (minutes).
- Fixed custom event durations so they use the entered minute value instead of always logging one hour.
- Added safe-haven return handling when double-clicking EV, CD, or EM at the end of a route hour.

## v2.2.9
- Simplified the Map exploration log so bracketed route breakdowns only appear when an exploration hour uses multiple different paces.
- Single-pace hours now display as a single total, even if they were plotted with several clicks.

## v2.2.8
- Added a day start time to the Drakkenheim Map so the exploration log can show times of day.
- Added time ranges to safe-haven travel, route hours, and logged map events.
- Updated logged events so standard events take one hour.
- Added custom event duration for custom map notes.
- Added tracked event time to the route summary.
- Added a draggable Map Help window with user-facing instructions for the map page.
- Included map day start time and event durations in save/load data.

## v2.2.7
- Baked in the latest manually corrected Drakkenheim map landmark coordinates.
- Moved map landmark pin positioning into a draggable pop-out window.
- Kept the main Map controls cleaner with a single Open Pin Mover button.

## v2.2.6
- Re-added manual landmark pin positioning on the Drakkenheim Map page.
- Added a Road to Camp Dawn safe-haven landmark.
- Added save/load support for landmark pin overrides again.
- Adding an approach from Emberwood Village, Eckerman Mill, or Camp Dawn now starts an empty route at the matching road landmark.
- Kept double-click landmark routing behaviour for ending the current exploration hour at a landmark.

## v2.2.5
- Prevented text selection on map landmark, route, and rest spot pins to make double-clicking smoother.
- Updated route plotting so the party can change travel pace during an incomplete exploration hour.
- Changed route hour tracking to use time spent within the hour rather than locking the whole hour to the first selected pace.
- Added different route line styles for fast, normal, and slow pace segments.
- Updated the exploration log to show mixed-pace hours with a short pace breakdown.

## v2.2.4
- Baked in the manually corrected Drakkenheim map landmark coordinates.
- Removed the temporary landmark pin positioning tool.
- Updated landmark pin handling so double-clicking a landmark can end the current exploration hour at that landmark when the remaining distance allows it.

## v2.2.3
- Added manual landmark pin positioning to the Drakkenheim Map page.
- Added a landmark edit mode where pins can be selected and moved by clicking the correct spot on the map.
- Added Copy Landmark Data so corrected coordinates can be sent back and baked into future versions.
- Added Reset Pins to restore the built-in landmark positions.
- Included landmark pin overrides in save/load data.

## v2.2.2
- Made the Drakkenheim map larger by moving the controls and route summary underneath the map.
- Corrected and re-aligned the built-in map landmark markers to better match the numbered locations on the map, including swapping 05 and 08 and renaming the Emberwood road marker to EV.
- Moved the Emberwood road marker to the edge of the road where it reaches the map border.
- Simplified route hour markers so only the start and each hour endpoint are labelled; removed the old H1 / H2 segment text.
- Changed the exploration log to summarise travel hour by hour instead of segment by segment.
- Added map log events so you can record short rests, searches, getting lost, and custom notes in the exploration log.
- Added save-code support for the new map log events.
- Made the Deep Haze overlay stronger so the affected areas are easier to see.
- Updated route undo so it removes the last full exploration hour instead of only the last segment.

## v2.2.0

- Added a new Drakkenheim Map page.
- Added click-to-plot city routes using one-hour travel segments based on travel mode and pace.
- Added normal map and Deep Haze overlay support.
- Added fixed numbered landmark markers for key Drakkenheim locations.
- Added safe-haven approach and return travel tracking for Emberwood Village, Camp Dawn, and Eckerman Mill.
- Added up to three saved short rest spots on the map.
- Added route summaries for distance, time, random encounter checks, fast pace reminders, sewer contamination checks, and flying-risk notes.
- Expanded Save Code / Load Save Code to include map route, outside travel, Deep Haze overlay preference, and saved short rest spots.
- Updated the footer version number.

## v2.1.12

- Removed the Changelog button from the top header action bar.
- Kept the footer changelog link as the only changelog navigation.
- Updated the footer version number.

## v2.1.11

- Moved Copy Save Code and Load Save Code into the top header action bar.
- Removed the Save Code buttons from the shop toolbar so save/load controls are available across the app.

## v2.1.10

- Individual faction clock reset buttons now reset both clock progress and the editable faction goal.
- Individual faction clock reset buttons now play the reset sound and flash the clock panel.
- Preserved Delerium Search Helper DCs as Outer City DC 15 and Inner City DC 20.

## v2.1.9

- Reset All on Faction Conflict Clocks now resets both clock progress and editable faction goals.
- Added distinct rising and falling sound cues for faction clock advance and regress actions.
- Kept Faction Tools non-collapsible and preserved editable goal labels.
- Preserved Delerium Search Helper DCs as Outer City DC 15 and Inner City DC 20.
- Updated the footer version number.

## v2.1.8

- Made the Faction Tools card non-collapsible.
- Changed faction clock goals from text boxes into editable labels.
- Added sound feedback to individual Advance and Regress buttons.
- Added colour-coded reputation attitudes from hostile red tones through neutral purple to cooperative green tones.
- Preserved Delerium Search Helper DCs as Outer City DC 15 and Inner City DC 20.
- Updated the footer version number.

## v2.1.7

- Moved Faction Tools into their own app page/panel separate from the random generator tools.
- Moved the Rumour Generator into Other Random Tables.
- Removed the Faction Pressure Generator.
- Changed Faction Conflict Clocks so each faction has an editable custom conflict/goal.
- Added regress controls for individual faction clocks and all faction clocks.
- Removed the browser-save wording from the Faction Reputation Tracker.
- Expanded Save Code / Load Save Code so one code now includes shop state, custom item lists, faction reputation, faction clocks, and custom faction goals.
- Preserved Delerium Search Helper DCs as Outer City DC 15 and Inner City DC 20.
- Updated the footer version number.

## v2.1.6

- Added a Faction Tools section.
- Added a reputation tracker for the Hooded Lanterns, Queen's Men, Silver Order, Amethyst Academy, and Falling Fire.
- Added faction attitude milestone text that updates from each faction's standing slider.
- Added a faction pressure generator.
- Added faction conflict clocks with individual and all-faction advance/reset controls.
- Added a d100 Drakkenheim rumour generator.
- Preserved Delerium Search Helper DCs as Outer City DC 15 and Inner City DC 20.
- Updated the footer version number.

## v2.1.5

- Added search/filter support to the Drakkenheim Conditions pop-out.
- Added pinned conditions, with common conditions pinned by default and star controls to pin or unpin entries.
- Added quick reference mode for compact condition summaries.
- Added stronger themed empty states for shop lists and generated-result panels.
- Added subtle result animations for generated outputs.
- Added an optional sound toggle using browser-generated interface sounds.
- Added a mobile bottom action bar for Shop, Delerium, Encounters, and Conditions.
- Preserved Delerium Search Helper DCs as Outer City DC 15 and Inner City DC 20.
- Updated the footer version number.

## v2.1.4

- Added a Conditions button to the header.
- Added a draggable Conditions pop-out window with Drakkenheim-specific condition references.
- Added a Drakkenheim Madness roller inside the Conditions window.
- Preserved Delerium Search Helper DCs as Outer City DC 15 and Inner City DC 20.
- Updated the footer version number.

## v2.1.3

- Changed light mode button and header-link text to white for stronger contrast.
- Updated the footer version number.

## v2.1.2

- Removed the dark gradient overlay from the Aldor artwork so the image stays clear on narrower screens.
- Updated the footer version number.

## v2.1.1

- Removed the Random Encounters search/reminder note block from the encounter card.
- Kept the dice-count rolling note in place.
- Updated the footer version number.

## v2.1.0

- Added the first full visual redesign pass with a dark gothic Drakkenheim DM screen theme.
- Restyled the header, quick navigation, cards, shop inventory, buttons, result panels, dialogs, changelog page, and mobile layout.
- Made dark mode the default visual style for first-time visitors while keeping the existing theme toggle.
- Updated the footer version number.

## v2.0.10

- Lucky Finds spell scroll results now choose specific spells.
- Uncommon Lucky Finds scrolls use the app's level 2-3 shop scroll spell lists.
- Rare Lucky Finds scrolls use the curated level 4-5 rare spell scroll list.
- Updated the footer version number.

## v2.0.9

- Removed the Shop / DM Tools tab row from the sticky header.
- Kept the quick navigation row for Shop, Delerium, Encounters, and Other Tables.
- Updated the footer version number.

## v2.0.8

- Changed first-time shop loading so the shop inventory starts empty until Generate Shop is clicked.
- Existing saved shop inventories still load from the browser as normal.
- Updated the footer version number.

## v2.0.7

- Removed the separate Delerium Manual Result section.
- Moved the Outer City / Inner City checkbox into the Delerium Search Helper.
- Updated the footer version number.

## v2.0.6

- Removed Arcane Anomalies from the top quick navigation because it now sits inside Other Random Tables.
- Fixed quick navigation scrolling so Delerium and Random Encounters open at the top of their sections instead of being hidden under the sticky header.
- Updated the footer version number.

## v2.0.5

- Fixed the collapsed Other Random Tables and Arcane Anomalies layout so collapsed sections no longer leave large empty boxes.
- Moved Arcane Anomalies under Other Random Tables while keeping it on the right side.
- Updated the footer version number.

## v2.0.4

- Removed the Website deployment section from the README.
- Updated the footer version number.

## v2.0.3

- Made Encounter History collapsed by default on page load.
- Made Faction filters collapsed by default on page load.
- Made Delerium/search reminder text update automatically when the party size changes.
- Updated the footer version number.

## v2.0.2

- Removed the random encounter area-specific status text from the Random Encounters section.
- Updated the footer version number.

## v2.0.1

- Fixed shop layout formatting on narrow/mobile screens.
- Removed encounter difficulty warnings.
- Made Encounter History collapsed by default.

## v2.0.0

- Added encounter history log with date and time.
- Added optional manual roll input for random encounters.
- Added encounter difficulty warnings.
- Added faction filters for encounter generation.
- Added Delerium search helper with DC 15 checks, DC +5 extra successes, Crater's Edge bonus success, failed-check tracking, and party-size scaling guidance.
- Added area-specific encounter notes.
- Added buttons to reroll the encounter, reroll the Lucky Find, or reroll only enemy counts.
- Added sticky quick navigation.
- Added collapsible sections.
- Added dark mode.
- Improved mobile layout.
- Added footer version number and changelog page.

## v1.x

- Added Lucky Finds integration after every random encounter.
- Added Arcane Anomalies generator.
- Added Monsters of Drakkenheim mode for Outer City and Inner City encounters.
- Added randomized dice counts in encounter descriptions.
- Added save-code support for shop state.
- Added GitHub Pages-ready browser version of the app.
