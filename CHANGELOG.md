# Changelog

## v2.4.35
- Added local named route save slots to the Drakkenheim map.
- Saved slots preserve route points, route segments, short rest spots, safe-haven travel, log events, map start time, route visibility, travel settings, and landmark overrides.
- Added route slot load, overwrite, and delete controls under the Route Summary column.
- Updated the footer version number.

## v2.4.34
- Fixed the current-route-hour −1 minute trim button applying twice.
- Removed the duplicate event binding so each click now trims exactly one minute.
- Updated the footer version number.

## v2.4.33
- Fixed the current-route-hour trim control so it is force-rendered under Route Summary when the active route hour is incomplete.
- Made the trim control self-create and self-bind if the saved/deployed page markup is missing it.
- Clarified the helper text so it is clear the control only appears while the current route hour is incomplete.
- Updated the footer version number.

## v2.4.32
- Fixed the current-route-hour trim control not appearing when the active route hour was incomplete.
- Clarified the trim control label and helper text so it is easier to find under Route Summary.
- Updated the footer version number.

## v2.4.31
- Added a current-route-hour trim control when the active route hour is incomplete.
- The trim control lets you reduce the current hour's used minutes, shortening the route backwards along the last travelled segment to keep distance and time accurate.
- Added a one-minute trim button for cases like changing 31 minutes of travel to exactly 30 minutes.
- Updated the footer version number.

## v2.4.30
- Route hour markers now track total time spent in Drakkenheim, including logged events.
- A one-hour log event after H7 makes the next route hour marker H9, because H8 was spent on the event.
- Partial logged event time is reflected in H labels using compact elapsed-time labels.
- Updated the footer version number.

## v2.4.29
- Map pins now shrink relative to the map as you zoom in, so landmarks, route hour markers, and rest pins no longer balloon over the map.
- Route hour markers now display as compact H-number labels in a rounded rectangle, making them visually distinct from numbered landmark pins.
- Updated Roll20 route overlay export markers to use the same H-number route-hour distinction.
- Updated the footer version number.

## v2.4.28
- Widened the web app's map page to match the standalone route mapper layout width.
- Added a little more spacing and minimum width to the right-hand map control/log columns so their left edges no longer tuck under the map.
- Kept the standalone-style three-column layout and all web-only map functionality.
- Updated the footer version number.

## v2.4.27
- Rearranged the web app's Drakkenheim Route Map page to match the standalone mapper's layout.
- The map now sits beside two right-hand collapsible control/log columns instead of using the old lower control panels.
- Preserved the web-only map functionality, including travel modes, Deep Haze overlay, Map Help, Add Log Event pop-out, Landmarks pop-out, Camp Dawn, and Pin Mover.
- Updated the footer version number.

## v2.4.26
- Updated the route summary wording to show in-Drakkenheim travel instead of safe-haven travel.
- Safe-haven approach and return travel still appears in the exploration log and still counts towards tracked time/current time.
- Updated the footer version number.

## v2.4.25
- Moved return-to-safe-haven travel to the end of the exploration log instead of listing it before city exploration.
- Approach travel still appears at the start of the log.
- Copied exploration logs now use the same chronological ordering.
- Updated the footer version number.

## v2.4.24
- Double-clicking the current route hour marker now ends the current route hour early.
- Early-ended route hours now use the actual time spent instead of always logging a full 60 minutes.
- Exploration log, copied travel log, tracked time, and current time now reflect partial route hours.
- Updated route help text and footer version number.

## v2.4.23
- Updated the route controls so switching from side roads / rubble back to main roads restores the previously selected travel pace.
- Side roads / rubble still locks travel pace to Slow while selected.
- Updated the footer version number.

## v2.4.22
- Updated the route controls so selecting side roads / rubble automatically switches travel pace to Slow.
- The travel pace control is now disabled while side roads / rubble is selected, making the forced slow pace rule visible in the UI.
- Updated the route pace note to show that the pace selector is locked to slow for side roads / rubble.
- Updated the footer version number.

## v2.4.21
- Changed side roads / rubble movement so it forces slow pace instead of halving the selected travel pace.
- Route segments on side roads / rubble are now logged and drawn as slow pace segments.
- Updated route rule wording and road-type labels to describe forced slow pace.
- Updated the footer version number.

## v2.4.20
- Recalibrated the route map distance scale using the bottom map measuring tool.
- Set the map scale to 482.24 px per mile, so normal street pace plots 0.5 miles / 2,640 ft per hour.
- This also corrects fast pace, slow pace, and side-road/rubble distances because they use the same calibrated scale.
- Updated the footer version number.

## v2.4.19
- Corrected the map distance calibration against the bottom map scale.
- Updated the route distance scale from 505 px per mile to 510 px per mile, so a normal street travel hour is 0.5 miles / 2,640 ft.
- This also corrects fast, slow, and side-road/rubble route distances because they use the same base scale.
- Updated the footer version number.

## v2.4.18
- Changed Clear Route so it only resets to a safe haven when an approach has actually been logged.
- If no approach travel has been logged, Clear Route now leaves the city route empty so the next map click sets a fresh start point.
- Updated the Map route rules note for the new Clear Route behaviour.
- Updated the footer version number.

## v2.4.17
- Removed the route summary note that timed events may call for encounter checks at the DM's discretion.
- Removed the visible Deep Haze wording from the route overlay export helper text.
- Combined consecutive matching route parts in mixed-hour exploration log breakdowns so repeated same-pace/same-road segments are shown as one total distance.
- Updated the footer version number.

## v2.4.16
- Added a transparent 6020×6020 calibration PNG with a faint edge border for lining up the Roll20 map overlay.
- Updated route overlay PNG export so every exported overlay includes a faint border around the edge to make Roll20 alignment easier.
- Updated the footer version number.

## v2.4.15
- Added an Export Route Overlay PNG button to the map tools.
- The export creates a transparent 6020×6020 PNG aligned to the base assets/drakkenheim-map.webp map without Deep Haze.
- The export uses the current Show on map setting and includes the visible route plus short rest pins.
- Updated the footer version number.

## v2.4.13
- Changed the map SVG layer order so saved short rest point pins sit underneath route hour pins.
- Added an extraction-time summary to the Delerium search helper output after the Delerium found section.
- Added a persistent Compact mode toggle to reduce spacing, padding, and control height across the app.
- Updated the footer version number.

## v2.4.12
- Replaced the floating route controls drag text with a compact move icon.
- Changed faction conflict clock segment editing so the maximum value is edited inline as the denominator, such as 4/[6].
- Updated the footer version number.

## v2.4.11
- Changed the floating route controls from a wide horizontal bar into a slimmer vertical menu.
- Kept the same route controls available: route leg, map visibility, travel mode, travel pace, road type, Deep Haze overlay, Undo Last Hour, and Clear Route.
- Clamped the floating route controls inside the map area when applying saved positions so the taller menu is less likely to appear partly off-map.
- Updated the footer version number.

## v2.4.10
- Restored the desktop map viewport width to the previous wider layout.
- Kept the desktop map height constrained to the available viewport height so it stays easier to fit on-screen.
- Updated the footer version number.

## v2.4.9
- Constrained the Drakkenheim map to the available viewport height on desktop so the full square map fits on-screen more comfortably.
- Kept smaller screens using the full available width so mobile/tablet layout is not forced into a tiny map.
- Updated the footer version number.

## v2.4.8
- Added Ctrl + mouse wheel map zooming while the cursor is over the Drakkenheim map.
- Ctrl + scroll now zooms the map instead of the browser page when used on the map.
- Kept zoom centred around the cursor position where possible.
- Updated the footer version number.

## v2.4.7
- Moved the Show Deep Haze overlay checkbox onto the floating route controls menu.
- Removed the duplicate Deep Haze overlay checkbox from the sidebar route controls panel.
- Updated the footer version number.

## v2.4.6
- Refactored duplicated floating-window open, close, and drag code into shared helpers without changing the visible behaviour.
- Batched several repeated DOM list updates with document fragments for cleaner rendering code.
- Reduced a repeated map save-code DOM lookup.
- Updated the footer version number.

## v2.4.5
- Improved light-mode styling for the Map route rules collapsible so the note remains readable in light mode.
- Updated the footer version number.

## v2.4.4
- Improved light-mode styling for the floating map route controls so the header and field labels stay readable.
- Added configurable segment counts for faction conflict clocks, allowing clocks such as 0/4, 0/6, or 0/9.
- Saved faction clock segment counts in browser storage and Save Codes.
- Updated the footer version number.

## v2.4.3
- Added Undo Last Hour and Clear Route buttons to the floating route controls menu on the map.
- Kept the existing sidebar route buttons in place as secondary controls.
- Updated the footer version number.

## v2.4.2
- Moved Arcane Anomalies into the Other Random Tables card.
- Kept Other Random Tables as a two-column layout, with Common Locations and Warped Ruins on the left and Arcane Anomalies plus Rumour Generator on the right.
- Moved Rumour Generator beneath Arcane Anomalies.
- Updated the footer version number.

## v2.4.1
- Fixed side-by-side table cards so a collapsed Other Random Tables or Arcane Anomalies card keeps its compact collapsed height instead of stretching to match the open card beside it.
- Updated the footer version number.

## v2.4.0
- Added a collapsed Delerium extraction times note between the search helper and the search result.
- Included compact extraction timings for chips, fragments, shards, crystals, geodes, and massive clusters.
- Added a reminder that lacking proper equipment makes extraction take ten times as long, and that massive clusters require heavy equipment or powerful magic.
- Updated the footer version number.

## v2.3.2
- Added an inbound / outbound route leg control so city routes can be split between travel into Drakkenheim and travel out of Drakkenheim.
- Added a Show on map control so the map can show the full route, only the inbound route, or only the outbound route while keeping the full exploration log.
- Moved travel mode, travel pace, road type, route leg, and route visibility into a draggable floating route control bar on the map.
- Added a Copy Exploration Log button that exports the route in a plain-text notes format.
- Lowered the map zoom widget layering so it no longer appears over the sticky header while scrolling.
- Reduced the mobile header height by making the top action buttons compact and horizontally scrollable.
- Updated the footer version number.

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
