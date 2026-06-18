const DEFAULT_DATA = {
  "level1Spells": [
    "Absorb Elements",
    "Alarm",
    "Animal Friendship",
    "Armor of Agathys",
    "Arms of Hadar",
    "Bane",
    "Beast Bond",
    "Bless",
    "Burning Hands",
    "Catapult",
    "Cause Fear",
    "Ceremony",
    "Chaos Bolt",
    "Charm Person",
    "Chromatic Orb",
    "Color Spray",
    "Command",
    "Compelled Duel",
    "Comprehend Languages",
    "Create or Destroy Water",
    "Cure Wounds",
    "Detect Evil and Good",
    "Detect Magic",
    "Detect Poison and Disease",
    "Disguise Self",
    "Dissonant Whispers",
    "Divine Favor",
    "Earth Tremor",
    "Ensnaring Strike",
    "Entangle",
    "Expeditious Retreat",
    "Faerie Fire",
    "False Life",
    "Feather Fall",
    "Find Familiar",
    "Fog Cloud",
    "Frost Fingers",
    "Gift of Alacrity",
    "Goodberry",
    "Grease",
    "Guiding Bolt",
    "Hail of Thorns",
    "Healing Word",
    "Hellish Rebuke",
    "Heroism",
    "Hex",
    "Hunter's Mark",
    "Ice Knife",
    "Identify",
    "Illusory Script",
    "Inflict Wounds",
    "Jump",
    "Longstrider",
    "Mage Armor",
    "Magic Missile",
    "Magnify Gravity",
    "Protection from Evil and Good",
    "Purify Food and Drink",
    "Ray of Sickness",
    "Sanctuary",
    "Searing Smite",
    "Shield",
    "Shield of Faith",
    "Silent Image",
    "Sleep",
    "Snare",
    "Speak with Animals",
    "Tasha's Caustic Brew",
    "Tasha's Hideous Laughter",
    "Tenser's Floating Disk",
    "Thunderous Smite",
    "Thunderwave",
    "Unseen Servant",
    "Witch Bolt",
    "Wrathful Smite",
    "Zephyr Strike"
  ],
  "level2Spells": [
    "Aganazzar's Scorcher",
    "Aid",
    "Air Bubble",
    "Alter Self",
    "Animal Messenger",
    "Arcane Lock",
    "Augury",
    "Barkskin",
    "Beast Sense",
    "Blindness/Deafness",
    "Blur",
    "Borrowed Knowledge",
    "Branding Smite",
    "Calm Emotions",
    "Cloud of Daggers",
    "Continual Flame",
    "Cordon of Arrows",
    "Crown of Madness",
    "Darkness",
    "Darkvision",
    "Detect Thoughts",
    "Dragon's Breath",
    "Dust Devil",
    "Earthbind",
    "Enhance Ability",
    "Enlarge/Reduce",
    "Enthrall",
    "Find Steed",
    "Find Traps",
    "Flame Blade",
    "Flaming Sphere",
    "Fortune's Favor",
    "Gentle Repose",
    "Gust of Wind",
    "Healing Spirit",
    "Heat Metal",
    "Hold Person",
    "Immovable Object",
    "Invisibility",
    "Kinetic Jaunt",
    "Knock",
    "Lesser Restoration",
    "Levitate",
    "Locate Animals or Plants",
    "Locate Object",
    "Magic Mouth",
    "Magic Weapon",
    "Maximillian's Earthen Grasp",
    "Melf's Acid Arrow",
    "Mind Spike",
    "Mirror Image",
    "Misty Step",
    "Moonbeam",
    "Nathair's Mischief",
    "Nystul's Magic Aura",
    "Pass Without Trace",
    "Phantasmal Force",
    "Prayer of Healing",
    "Protection from Poison",
    "Pyrotechnics",
    "Ray of Enfeeblement",
    "Rime's Binding Ice",
    "Rope Trick",
    "Scorching Ray",
    "See Invisibility",
    "Shadow Blade",
    "Shatter",
    "Silence",
    "Skywrite",
    "Snilloc's Snowball Swarm",
    "Spider Climb",
    "Spike Growth",
    "Spiritual Weapon",
    "Suggestion",
    "Summon Beast",
    "Tasha's Mind Whip",
    "Vortex Warp",
    "Warding Bond",
    "Warding Wind",
    "Web",
    "Zone of Truth"
  ],
  "level3Spells": [
    "Animate Dead",
    "Ashardalon's Stride",
    "Aura of Vitality",
    "Beacon of Hope",
    "Bestow Curse",
    "Blinding Smite",
    "Blink",
    "Call Lightning",
    "Catnap",
    "Clairvoyance",
    "Conjure Animals",
    "Conjure Barrage",
    "Counterspell",
    "Create Food and Water",
    "Crusader's Mantle",
    "Daylight",
    "Dispel Magic",
    "Elemental Weapon",
    "Enemies Abound",
    "Erupting Earth",
    "Fast Friends",
    "Fear",
    "Feign Death",
    "Fireball",
    "Flame Arrows",
    "Fly",
    "Gaseous Form",
    "Glyph of Warding",
    "Haste",
    "Hunger Of Hadar",
    "Hypnotic Pattern",
    "Incite Greed",
    "Intellect Fortress",
    "Leomund's Tiny Hut",
    "Life Transference",
    "Lightning Arrow",
    "Lightning Bolt",
    "Magic Circle",
    "Major Image",
    "Mass Healing Word",
    "Meld into Stone",
    "Melf's Minute Meteors",
    "Motivational Speech",
    "Nondetection",
    "Phantom Steed",
    "Plant Growth",
    "Protection from Energy",
    "Pulse Wave",
    "Remove Curse",
    "Revivify",
    "Sending",
    "Sleet Storm",
    "Slow",
    "Speak with Dead",
    "Speak with Plants",
    "Spirit Guardians",
    "Spirit Shroud",
    "Stinking Cloud",
    "Summon Fey",
    "Summon Shadowspawn",
    "Summon Undead",
    "Thunder Step",
    "Tidal Wave",
    "Tiny Servant",
    "Tongues",
    "Vampiric Touch",
    "Wall of Sand",
    "Wall of Water",
    "Water Breathing",
    "Water Walk",
    "Wind Wall"
  ],
  "costlyMaterialComponentGp": {
    "Ceremony": 25,
    "Chromatic Orb": 50,
    "Find Familiar": 10,
    "Identify": 100,
    "Illusory Script": 10,
    "Arcane Lock": 25,
    "Augury": 25,
    "Borrowed Knowledge": 25,
    "Continual Flame": 50,
    "Fortune's Favor": 100,
    "Immovable Object": 25,
    "Magic Mouth": 10,
    "Summon Beast": 200,
    "Warding Bond": 100,
    "Clairvoyance": 100,
    "Glyph of Warding": 200,
    "Incite Greed": 50,
    "Magic Circle": 100,
    "Nondetection": 25,
    "Revivify": 300,
    "Summon Fey": 300,
    "Summon Shadowspawn": 300,
    "Summon Undead": 300
  },
  "uncommonItems": [
    "Adamantine Armor",
    "Alchemy Jug",
    "All-Purpose Tool",
    "Ammunition, +1",
    "Amulet of Proof Against Detection and Location",
    "Amulet of the Devout",
    "Arcane Grimoire",
    "Bag of Holding",
    "Bag of Tricks",
    "Barrier Tattoo",
    "Blood Spear",
    "Bloodwell Vial",
    "Boots of Elvenkind",
    "Boots of Striding and Springing",
    "Boots of the Winterlands",
    "Bracers of Archery",
    "Brooch of Shielding",
    "Broom of Flying",
    "Cap of Water Breathing",
    "Circlet of Blasting",
    "Cloak of Elvenkind",
    "Cloak of Protection",
    "Cloak of the Manta Ray",
    "Coiling Grasp Tattoo",
    "Decanter of Endless Water",
    "Deck of Illusions",
    "Dragon Vessel",
    "Dragonhide Belt",
    "Dragon's Wrath Weapon",
    "Dragon-Touched Focus",
    "Driftglobe",
    "Dust of Disappearance",
    "Dust of Dryness",
    "Dust of Sneezing and Choking",
    "Eldritch Claw Tattoo",
    "Elemental Gem",
    "Emerald Pen",
    "Eversmoking Bottle",
    "Eyes of Charming",
    "Eyes of Minute Seeing",
    "Eyes of the Eagle",
    "Feywild Shard",
    "Figurine of Wondrous Power",
    "Gauntlets of Ogre Power",
    "Gem of Brightness",
    "Gloves of Missile Snaring",
    "Gloves of Swimming and Climbing",
    "Gloves of Thievery",
    "Goggles of Night",
    "Guardian Emblem",
    "Harkon's Bite",
    "Hat of Disguise",
    "Headband of Intellect",
    "Helm of Comprehending Languages",
    "Helm of Telepathy",
    "Immovable Rod",
    "Instrument of the Bards",
    "Javelin of Lightning",
    "Keoghtom's Ointment",
    "Lantern of Revealing",
    "Mariner's Armor",
    "Mask of the Beast",
    "Medallion of Thoughts",
    "Mind Carapace Armor",
    "Mithral Armor",
    "Moon Sickle",
    "Nature's Mantle",
    "Necklace of Adaptation",
    "Oil of Slipperiness",
    "Pearl of Power",
    "Periapt of Health",
    "Periapt of Wound Closure",
    "Philter of Love",
    "Pipes of Haunting",
    "Pipes of the Sewers",
    "Potion of Animal Friendship",
    "Potion of Fire Breath",
    "Potion of Giant Strength",
    "Potion of Growth",
    "Potion of Healing",
    "Potion of Poison",
    "Potion of Resistance",
    "Potion of Water Breathing",
    "Prismari Primer",
    "Quiver of Ehlonna",
    "Rhythm Maker's Drum",
    "Ring of Jumping",
    "Ring of Mind Shielding",
    "Ring of Swimming",
    "Ring of Warmth",
    "Ring of Water Walking",
    "Robe of Useful Items",
    "Rod of the Pact Keeper, +1",
    "Rope of Climbing",
    "Saddle of the Cavalier",
    "Scaled Ornament",
    "Sending Stones",
    "Sentinel Shield",
    "Shield, +1",
    "Slippers of Spider Climbing",
    "Spellwrought Tattoo",
    "Staff of the Adder",
    "Staff of the Python",
    "Stone of Good Luck (Luckstone)",
    "Sword of Vengeance",
    "Trident of Fish Command",
    "Wand of Magic Detection",
    "Wand of Magic Missiles",
    "Wand of Secrets",
    "Wand of the War Mage",
    "Wand of Web",
    "Weapon, +1",
    "Weapon of Warning",
    "Wind Fan",
    "Winged Boots"
  ],
  "rareItems": [
    "Ammunition, +2",
    "Amulet of Health",
    "All-Purpose Tool",
    "Arcane Grimoire",
    "Armor, +2",
    "Armor of Resistance",
    "Armor of Vulnerability",
    "Arrow-Catching Shield",
    "Bag of Beans",
    "Bead of Force",
    "Belt of Dwarvenkind",
    "Belt of Giant Strength",
    "Berserker Axe",
    "Boots of Levitation",
    "Boots of Speed",
    "Bracers of Defense",
    "Brazier of Commanding Fire Elementals",
    "Cape of the Mountebank",
    "Censer of Controlling Air Elementals",
    "Chime of Opening",
    "Cloak of Displacement",
    "Cloak of the Bat",
    "Cube of Force",
    "Daern's Instant Fortress",
    "Dagger of Venom",
    "Devotee's Censer",
    "Dimensional Shackles",
    "Dragon Vessel",
    "Dragon Wing Bow",
    "Dragonhide Belt",
    "Dragon's Wrath Weapon",
    "Dragon-Touched Focus",
    "Duplicitous Manuscript",
    "Elixir of Health",
    "Elven Chain",
    "Elemental Essence Shard",
    "Far Realm Shard",
    "Figurine of Wondrous Power",
    "Flame Tongue",
    "Gem of Seeing",
    "Giant Slayer",
    "Glamoured Studded Leather",
    "Gulthias Staff",
    "Heart Weaver's Primer",
    "Helm of Teleportation",
    "Heward's Handy Haversack",
    "Horn of Blasting",
    "Horn of Valhalla",
    "Horseshoes of Speed",
    "Instrument of the Bards",
    "Ioun Stone",
    "Iron Bands of Bilarro",
    "Libram of Souls and Flesh",
    "Lyre of Building",
    "Mace of Disruption",
    "Mace of Smiting",
    "Mace of Terror",
    "Mantle of Spell Resistance",
    "Mind Blade",
    "Mind Lash",
    "Moon Sickle",
    "Necklace of Fireballs",
    "Necklace of Prayer Beads",
    "Oil of Etherealness",
    "Periapt of Proof against Poison",
    "Planecaller's Codex",
    "Portable Hole",
    "Potion of Clairvoyance",
    "Potion of Diminution",
    "Potion of Gaseous Form",
    "Potion of Giant Strength",
    "Potion of Healing",
    "Potion of Heroism",
    "Potion of Invulnerability",
    "Potion of Mind Reading",
    "Protective Verses",
    "Quaal's Feather Token",
    "Reveler's Concertina",
    "Rhythm Maker's Drum",
    "Ring of Animal Influence",
    "Ring of Evasion",
    "Ring of Feather Falling",
    "Ring of Free Action",
    "Ring of Protection",
    "Ring of Resistance",
    "Ring of Spell Storing",
    "Ring of the Ram",
    "Ring of X-Ray Vision",
    "Robe of Eyes",
    "Rod of Rulership",
    "Rod of the Pact Keeper, +2",
    "Rope of Entanglement",
    "Shadowfell Brand Tattoo",
    "Shadowfell Shard",
    "Shield, +2",
    "Shield of Missile Attraction",
    "Staff of Charming",
    "Staff of Healing",
    "Staff of Swarming Insects",
    "Staff of the Woodlands",
    "Staff of Withering",
    "Stone of Controlling Earth Elementals",
    "Sun Blade",
    "Sword of Life Stealing",
    "Sword of Wounding",
    "Tentacle Rod",
    "Vicious Weapon",
    "Wand of Binding",
    "Wand of Enemy Detection",
    "Wand of Fear",
    "Wand of Fireballs",
    "Wand of Lightning Bolts",
    "Wand of Paralysis",
    "Wand of the War Mage, +2",
    "Wand of Wonder",
    "Weapon, +2",
    "Wings of Flying"
  ],
  "shopState": {
    "potions": [
      {
        "name": "Potion of Healing",
        "price": 100,
        "quantity": 9,
        "isStackable": true
      },
      {
        "name": "Potion of Greater Healing",
        "price": 300,
        "quantity": 6,
        "isStackable": true
      }
    ],
    "scrolls": [
      {
        "name": "Chromatic Orb (1st)",
        "price": 175,
        "quantity": 1,
        "isStackable": true
      },
      {
        "name": "Ensnaring Strike (1st)",
        "price": 75,
        "quantity": 1,
        "isStackable": true
      },
      {
        "name": "Find Familiar (1st)",
        "price": 95,
        "quantity": 1,
        "isStackable": true
      },
      {
        "name": "Goodberry (1st)",
        "price": 75,
        "quantity": 1,
        "isStackable": true
      },
      {
        "name": "Grease (1st)",
        "price": 75,
        "quantity": 1,
        "isStackable": true
      },
      {
        "name": "Guiding Bolt (1st)",
        "price": 75,
        "quantity": 1,
        "isStackable": true
      },
      {
        "name": "Witch Bolt (1st)",
        "price": 75,
        "quantity": 1,
        "isStackable": true
      },
      {
        "name": "Animal Messenger (2nd)",
        "price": 150,
        "quantity": 1,
        "isStackable": true
      },
      {
        "name": "Cordon of Arrows (2nd)",
        "price": 150,
        "quantity": 1,
        "isStackable": true
      },
      {
        "name": "Enhance Ability (2nd)",
        "price": 150,
        "quantity": 1,
        "isStackable": true
      },
      {
        "name": "Locate Object (2nd)",
        "price": 150,
        "quantity": 1,
        "isStackable": true
      },
      {
        "name": "Mind Spike (2nd)",
        "price": 150,
        "quantity": 1,
        "isStackable": true
      },
      {
        "name": "Misty Step (2nd)",
        "price": 150,
        "quantity": 1,
        "isStackable": true
      },
      {
        "name": "Protection from Poison (2nd)",
        "price": 150,
        "quantity": 1,
        "isStackable": true
      },
      {
        "name": "Beacon of Hope (3rd)",
        "price": 450,
        "quantity": 1,
        "isStackable": true
      },
      {
        "name": "Dispel Magic (3rd)",
        "price": 450,
        "quantity": 1,
        "isStackable": true
      },
      {
        "name": "Elemental Weapon (3rd)",
        "price": 450,
        "quantity": 1,
        "isStackable": true
      },
      {
        "name": "Life Transference (3rd)",
        "price": 450,
        "quantity": 1,
        "isStackable": true
      },
      {
        "name": "Remove Curse (3rd)",
        "price": 450,
        "quantity": 1,
        "isStackable": true
      },
      {
        "name": "Tidal Wave (3rd)",
        "price": 450,
        "quantity": 1,
        "isStackable": true
      }
    ],
    "uncommonShopItems": [
      {
        "name": "Potion of Animal Friendship",
        "price": 1200,
        "quantity": 1,
        "isStackable": false
      },
      {
        "name": "Bag of Tricks",
        "price": 800,
        "quantity": 1,
        "isStackable": false
      },
      {
        "name": "Ring of Water Walking",
        "price": 700,
        "quantity": 1,
        "isStackable": false
      },
      {
        "name": "Shield, +1",
        "price": 500,
        "quantity": 1,
        "isStackable": false
      }
    ],
    "rareShopItem": [
      {
        "name": "Ammunition, +2",
        "price": 10000,
        "quantity": 1,
        "isStackable": false
      }
    ]
  },
  "encounterDescriptions": {
    "Academy Surveyor": "An Amethyst Academy mage and 1d4 hedge mage apprentices are conducting research in the ruins.",
    "Angry Furniture": "2 (1d4) mimics are disguised as perfectly normal pieces of furniture in a nearby house.",
    "Chimera Nest": "A chimera is nesting in a tall spire. Aggressive and territorial, it swoops down to rip apart any who wander around its turf.",
    "Cleaning Cube": "A gelatinous cube awaits down a narrow corridor in the sewers. It stays completely still until a creature enters its space.",
    "Crimson Countess": "The Crimson Countess hunts above with a retinue of 5 (2d4) harpies.",
    "Deep Ones": "10 (3d6) aquatic delerium dregs and 1 chuul occupy a sewer junction or are emerging from a sewer exit.",
    "Dozing Hulk": "A single haze hulk lays sleeping across the narrow road. Squeezing past without waking it may prove difficult, but it clutches a delerium shard in its hand.",
    "Double Trouble": "Roll twice, ignoring this result on subsequent rolls. If two groups of monsters or NPCs are encountered, they're fighting each other.",
    "Drowned Dead": "A one-hundred-foot long corridor in the sewers is completely flooded. The tunnel has 10 (3d6) haze husks floating in it that appear lifeless unless attacked or until characters are halfway down the tunnel. The undead attempt to hold characters in place until they drown.",
    "Executioner's Summons": "The characters stumble into Slaughterstone Square.",
    "Fallen Heroes": "5 (2d4) haze wights are all that remains of this former adventuring party. They believe any living humanoids they encounter are mutated monsters.",
    "Garmyr Hunters": "10 (3d6) garmyr leading 1d4 worgs are stalking the streets for fresh meat. They are on keen lookout and watch for any signs of movement. Double the number encountered in the Inner City.",
    "Garmyr Ravagers": "7 (2d6) garmyr berserkers with 2 (1d4) hell hounds are rampaging through the streets, howling loudly and starting fires.",
    "Ghost Lights": "2 (1d4) will-o-wisps attempt to lure passing characters towards a mirage of treasure or delerium in the Haze. In the Inner City, there are 2d6 wisps instead.",
    "Gibbering Flesh": "The walls here are covered in thick fleshy growths, parts of the walls, streets, and rubble have grown eyes and mouths that break away and form 2 (1d4) gibbering mouthers. In the Inner City, it has become a protean abomination.",
    "Gloaming Ray": "A cloaker flies through the dark rooftops above looking for prey.",
    "Going in Circles": "The characters lose their position and get lost. They no longer know where they are anymore or what direction they are facing. They must wander the city streets for the next 1d4 hours, after which they regain their original position. Check for random encounters as normal each hour.",
    "Harpy Flock": "A pack of 10 (3d6) harpies flies overhead surveying the ground for anything worth hunting. They perch on rooftops and watch the streets below, trying to lure wandering characters up to the roofs to push them off to their deaths.",
    "Hateful Dead": "A lone haze wight marches with 10 (3d6) haze husks. It commands its minions to attack any living creature they find, and raises any nearby corpses as reinforcements. Add 1d4 additional haze wights when encountered in the Inner City.",
    "Haze Haunt": "A warp witch moans and wails in the nearby building, scornfully mourning its miserable existence as it tries to remember its past. Add an additional 1d4 warp witches when encountered in the Inner City.",
    "Hooded Lantern Patrol": "5 (2d4) scouts led by an urban ranger are on a recon mission. If the characters are in trouble they step in to help them, but then demand the characters turn over half of whatever plunder they've found in the ruins, citing their authority under the \"law\" of Westemär and that \"scavenging\" in the ruins is technically prohibited without the assent of the Lord Commander.",
    "Horribly Lost": "The characters are badly turned around and become hopelessly lost in the ruins. They no longer know where they are anymore or what direction they are facing. They wander the city streets indefinitely, checking for random encounters as normal each hour. They don't regain their bearings unless the circumstances of a random encounter lead them to clues or friendly NPCs who can help them.",
    "Living Ruins": "Several inanimate parts of the ruins suddenly spring to life as 2 (1d4) contaminated elementals. Choose whichever type is most appropriate for the area.",
    "Lord of the Feast": "The Lord of the Feast leads a warpack of 10 (3d6) garmyr and 2 (2d4) hell hounds.",
    "Lost Ones": "10 (3d6) delerium dregs wander the streets ahead. They sorrowfully mutter nonsensical gibberish, but wail and screech when they encounter humanoids. Add 2 (1d4) haze hulks when encountered in the Inner City.",
    "Lurking Wraiths": "2 (1d4) arcane wraiths flutter about seeking erratic magic, and fixate on whichever character is carrying the most delerium or magic items.",
    "Menacing Manticore": "A manticore circles overhead looking for an easy meal. If it spots the characters, it swoops in to attack the most vulnerable member. It flies off towards the inner city if reduced to less than half its hit points. Manticores in the Inner City may hunt in packs of 5 (2d4).",
    "Old Alchemist's Shop": "A decrepit alchemist's shop that reeks of a chemical odor stands on a street corner. A pool of spilled chemicals has become an aggressive ochre jelly. In the Inner City, 2 (1d4) black puddings are encountered instead.",
    "Overgrown Ruin": "Strange alien plants and oddly-shaped vines creep up a crumbling ruin. A shambling mound and 2 (1d4) hypnotic eldritch blossoms grow in the tangled mass.",
    "Phase Webs": "Strange webs cover this section of the ruins and fill nearby buildings - some even span the streets themselves. 2 (1d4) phase spiders resting in the dark corners come to investigate any disturbance of their webs. The webs are especially thick in regions of the Inner City, where there are 7 (2d6) spiders instead.",
    "Pilgrims of the Falling Fire": "A group of 10 (3d6) cultists led by a cult fanatic and a berserker are heading towards the crater.",
    "Queen's Men Looters": "7 (2d6) bandits led by a bandit captain are hoping for easy pickings. The bandits try to hide from the players until they appear wounded or in need of a rest, so canny characters might spot them before this happens.",
    "Questing Knight": "A Silver Order knight on a warhorse with a retinue of 7 (2d6) guards are searching for lost relics and holy sites in the ruins.",
    "Ratling Raiders": "A ratling warlock of the rat god leads a great horde of 21 (6d6) ratlings.",
    "Ratling Scavengers": "10 (3d6) ratlings hide down a nearby alley or passage awaiting unsuspecting prey.",
    "Rival Adventurers": "Characters encounter a group of rival adventurers.",
    "Run out of Town": "Characters get turned around badly, and arrive at the nearest edge of town.",
    "Sewer Monster": "An otyugh feasting on offal lurks near a sewer access point.",
    "Shadows of Drakkenheim": "5 (2d4) shadows slowly follow the characters. They try to remain hidden and follow the party until one of the player characters is more than ten feet away from the others, then the shadows strike in an attempt to overwhelm the straggler. An arcane wraith leads these shadows when encountered in the Inner City.",
    "Shambling Husks": "7 (2d6) haze husks stumble and shuffle around the streets. In this unsettling gait, they play out scenes of their former everyday lives.",
    "Stalking Vermin": "14 (4d6) ratlings and 5 (2d4) ratling guttersnipes have set up an ambush. These ratlings use bait to lure prey towards a dead-end street or sewer passage where the guttersnipes lurk on high ground to snipe their quarry with ranged attacks.",
    "Troll Traveller": "A troll is heading through the ruins to join the trolls at King's Gate. He wears a large pack containing raw contaminated meat, a tankard of rancid ale, 11 (2d10) gold, and a few sets of tools and trinkets. If encountered near a bridge in the Inner City, there are 3 trolls instead.",
    "Uninvited Guests": "The characters arrive at the nearest city gate.",
    "Wandered into the Garden": "The characters arrive at the nearest edge of Queen's Park Garden.",
    "Watching Gargoyles": "2 (1d4) wall gargoyles roaming overhead swoop down to attack. If encountered in the Inner City, there are 7 (2d6) instead.",
    "Wrong Turn": "The characters find themselves back where they started an hour ago. I guess you took a wrong turn somewhere?"
  },
  "encounterTables": {
    "sewers": [
      {
        "min": 1,
        "max": 1,
        "name": "Horribly Lost"
      },
      {
        "min": 2,
        "max": 2,
        "name": "Going in Circles"
      },
      {
        "min": 3,
        "max": 3,
        "name": "Wrong Turn"
      },
      {
        "min": 4,
        "max": 4,
        "name": "Gloaming Ray"
      },
      {
        "min": 5,
        "max": 5,
        "name": "Living Ruins"
      },
      {
        "min": 6,
        "max": 6,
        "name": "Troll Traveller"
      },
      {
        "min": 7,
        "max": 7,
        "name": "Sewer Monster"
      },
      {
        "min": 8,
        "max": 8,
        "name": "Drowned Dead"
      },
      {
        "min": 9,
        "max": 9,
        "name": "Ratling Scavengers"
      },
      {
        "min": 10,
        "max": 10,
        "name": "Stalking Vermin"
      },
      {
        "min": 11,
        "max": 11,
        "name": "Hateful Dead"
      },
      {
        "min": 12,
        "max": 12,
        "name": "Lost Ones"
      },
      {
        "min": 13,
        "max": 13,
        "name": "Gibbering Flesh"
      },
      {
        "min": 14,
        "max": 14,
        "name": "Dozing Hulk"
      },
      {
        "min": 15,
        "max": 15,
        "name": "Shadows of Drakkenheim"
      },
      {
        "min": 16,
        "max": 16,
        "name": "Fallen Heroes"
      },
      {
        "min": 17,
        "max": 17,
        "name": "Cleaning Cube"
      },
      {
        "min": 18,
        "max": 18,
        "name": "Deep Ones"
      },
      {
        "min": 19,
        "max": 19,
        "name": "Rival Adventurers"
      },
      {
        "min": 20,
        "max": 20,
        "name": "Double Trouble"
      }
    ],
    "outerCity": [
      {
        "min": 1,
        "max": 4,
        "name": "Run out of Town"
      },
      {
        "min": 5,
        "max": 8,
        "name": "Uninvited Guests"
      },
      {
        "min": 9,
        "max": 12,
        "name": "Wrong Turn"
      },
      {
        "min": 13,
        "max": 16,
        "name": "Troll Traveller"
      },
      {
        "min": 17,
        "max": 20,
        "name": "Menacing Manticore"
      },
      {
        "min": 21,
        "max": 24,
        "name": "Shadows of Drakkenheim"
      },
      {
        "min": 25,
        "max": 28,
        "name": "Phase Webs"
      },
      {
        "min": 29,
        "max": 32,
        "name": "Watching Gargoyles"
      },
      {
        "min": 33,
        "max": 36,
        "name": "Ratling Scavengers"
      },
      {
        "min": 37,
        "max": 40,
        "name": "Garmyr Hunters"
      },
      {
        "min": 41,
        "max": 44,
        "name": "Hateful Dead"
      },
      {
        "min": 45,
        "max": 48,
        "name": "Gibbering Flesh"
      },
      {
        "min": 49,
        "max": 52,
        "name": "Ghost Lights"
      },
      {
        "min": 53,
        "max": 56,
        "name": "Haze Haunt"
      },
      {
        "min": 57,
        "max": 60,
        "name": "Angry Furniture"
      },
      {
        "min": 61,
        "max": 64,
        "name": "Lost Ones"
      },
      {
        "min": 65,
        "max": 68,
        "name": "Shambling Husks"
      },
      {
        "min": 69,
        "max": 72,
        "name": "Old Alchemist's Shop"
      },
      {
        "min": 73,
        "max": 76,
        "name": "Hooded Lantern Patrol"
      },
      {
        "min": 77,
        "max": 80,
        "name": "Queen's Men Looters"
      },
      {
        "min": 81,
        "max": 84,
        "name": "Questing Knight"
      },
      {
        "min": 85,
        "max": 88,
        "name": "Academy Surveyor"
      },
      {
        "min": 89,
        "max": 92,
        "name": "Pilgrims of the Falling Fire"
      },
      {
        "min": 93,
        "max": 96,
        "name": "Rival Adventurers"
      },
      {
        "min": 97,
        "max": 100,
        "name": "Double Trouble"
      }
    ],
    "innerCity": [
      {
        "min": 1,
        "max": 3,
        "name": "Horribly Lost"
      },
      {
        "min": 4,
        "max": 5,
        "name": "Executioner's Summons"
      },
      {
        "min": 6,
        "max": 7,
        "name": "Going in Circles"
      },
      {
        "min": 8,
        "max": 9,
        "name": "Lord of the Feast"
      },
      {
        "min": 10,
        "max": 11,
        "name": "Uninvited Guests"
      },
      {
        "min": 12,
        "max": 13,
        "name": "Crimson Countess"
      },
      {
        "min": 14,
        "max": 15,
        "name": "Wandered into the Garden"
      },
      {
        "min": 16,
        "max": 17,
        "name": "Sewer Monster"
      },
      {
        "min": 18,
        "max": 20,
        "name": "Stalking Vermin"
      },
      {
        "min": 21,
        "max": 23,
        "name": "Ratling Raiders"
      },
      {
        "min": 24,
        "max": 26,
        "name": "Hateful Dead"
      },
      {
        "min": 27,
        "max": 30,
        "name": "Lost Ones"
      },
      {
        "min": 31,
        "max": 32,
        "name": "Troll Traveller"
      },
      {
        "min": 33,
        "max": 34,
        "name": "Phase Webs"
      },
      {
        "min": 35,
        "max": 37,
        "name": "Gibbering Flesh"
      },
      {
        "min": 38,
        "max": 39,
        "name": "Old Alchemist's Shop"
      },
      {
        "min": 40,
        "max": 41,
        "name": "Menacing Manticore"
      },
      {
        "min": 42,
        "max": 43,
        "name": "Shadows of Drakkenheim"
      },
      {
        "min": 44,
        "max": 45,
        "name": "Ghost Lights"
      },
      {
        "min": 46,
        "max": 47,
        "name": "Haze Haunt"
      },
      {
        "min": 48,
        "max": 50,
        "name": "Watching Gargoyles"
      },
      {
        "min": 51,
        "max": 54,
        "name": "Garmyr Hunters"
      },
      {
        "min": 55,
        "max": 57,
        "name": "Garmyr Ravagers"
      },
      {
        "min": 58,
        "max": 59,
        "name": "Overgrown Ruin"
      },
      {
        "min": 60,
        "max": 62,
        "name": "Living Ruins"
      },
      {
        "min": 63,
        "max": 64,
        "name": "Chimera Nest"
      },
      {
        "min": 65,
        "max": 68,
        "name": "Harpy Flock"
      },
      {
        "min": 69,
        "max": 70,
        "name": "Lurking Wraiths"
      },
      {
        "min": 71,
        "max": 72,
        "name": "Fallen Heroes"
      },
      {
        "min": 73,
        "max": 74,
        "name": "Gloaming Ray"
      },
      {
        "min": 75,
        "max": 77,
        "name": "Deep Ones"
      },
      {
        "min": 78,
        "max": 81,
        "name": "Rival Adventurers"
      },
      {
        "min": 82,
        "max": 84,
        "name": "Pilgrims of the Falling Fire"
      },
      {
        "min": 85,
        "max": 88,
        "name": "Hooded Lantern Patrol"
      },
      {
        "min": 89,
        "max": 92,
        "name": "Queen's Men Looters"
      },
      {
        "min": 93,
        "max": 94,
        "name": "Questing Knight"
      },
      {
        "min": 95,
        "max": 96,
        "name": "Academy Surveyor"
      },
      {
        "min": 97,
        "max": 100,
        "name": "Double Trouble"
      }
    ]
  },
  "locations": [
    "Breakaway meteors demolished this area...",
    "A makeshift encampment...",
    "A deserted alleyway filled with trash...",
    "A devastated street filled with broken wagons...",
    "An open plaza or park...",
    "A courtyard leading up to a civic building...",
    "A cluster of ramshackle taverns.",
    "Seedy tenement buildings...",
    "Several workshops surrounded by warehouses.",
    "Rows of dilapidated townhouses."
  ],
  "warpedRuins": [
    "Stonework turned to glass.",
    "Cloaked in eldritch fire.",
    "Frozen mid-explosion.",
    "Flesh merged into walls.",
    "Melted like wax.",
    "Disembodied whispers.",
    "Black and white only.",
    "Childhood illusion appears.",
    "Déjà vu effect.",
    "Scorch silhouettes."
  ],
  "luckyFinds": [
    "Nothing but broken refuse.",
    "Nothing but broken refuse.",
    "Nothing but broken refuse.",
    "Nothing but broken refuse.",
    "Nothing but broken refuse.",
    "Nothing but broken refuse.",
    "Nothing but broken refuse.",
    "Nothing but broken refuse.",
    "1d4 sets of tools.",
    "5d6 gold pieces.",
    "1d6 potions of healing.",
    "1d4 spell scrolls.",
    "1d4 art objects worth 25 gp.",
    "2d6 delerium chips.",
    "2d6 x 10 gp.",
    "1 restorative ointment.",
    "1d4 delerium fragments.",
    "1d4 greater healing potions.",
    "Artwork worth 250 gp.",
    "1 rare spell scroll."
  ],
  "arcaneAnomalies": [
      "Gravity breaks within a 100-foot radius area for 1 hour. Creatures levitate in midair, and must move by pushing or pulling against a fixed object or surface within reach (such as a wall or a ceiling), which allows them to move as if they were climbing. Unattended objects float around randomly.",
      "The nearest creature is affected by a hideous laughter spell (Save DC 15) but instead of laughing, the creature repeats unfathomable combinations of syllables and words.",
      "Time skips a beat. Creatures within 60 feet experience a palpable feeling of vertigo followed by a powerful sensation of deja vu and are stunned for 1 round (No save).",
      "The nearest creature becomes unstuck in time. It is affected by the blink spell for 1 minute. Instead of vanishing into the Ethereal Plane, the creature vanishes into a sliver of time in its past or possible future.",
      "A prismatic burst of energy erupts in a 20-foot radius. Creatures in the area must succeed on a DC 15 Constitution saving throw or take 8d6 radiant damage and become blinded for 1 round. The smell of ozone fills the area, and wood transforms into glass.",
      "Echoes of possible realities are briefly visible for 1 minute. When a creature within 60 feet is hit by an attack, a faint vision of the creature being killed by that attack appears.",
      "Discordant music fills the mind of all creatures within 30 feet, who are affected as if by irresistible dance (Save DC 15).",
      "A section of stone, water, air, or energy becomes an appropriate contaminated elemental.",
      "An extraplanar creature is summoned and remains for 1 hour. The DM either chooses the creature or determines it randomly. It is friendly to the creature who triggered the anomaly.",
      "All humanoid corpses within 120 feet animate as hostile haze husks. The shrieking undead beg frantically for forgiveness as they rip apart the living.",
      "The shadows of 1d6 random creatures in the area animate and try to kill them. Once destroyed, the creatures don't cast a shadow for 24 hours.",
      "All creatures within 60 feet become invisible for 1 min or until they attack or cast a spell.",
      "Tendrils of life flow from the nearest creature to others. It must succeed on a DC 15 Constitution saving throw or take 8d8 necrotic damage, half on a success. The three nearest creatures within 60 feet each regain hit points equal to the damage taken.",
      "A hypnotic pattern (save DC 15) appears. It creates scintillating impossible colours in shapes which are simply wrong. Creatures incapacitated by the spell weep uncontrollably.",
      "A black tentacles spell appears in the area for 1 hour (Escape DC 15).",
      "Objects within 60 feet come to life for the next hour, as if affected by the animate objects spell. They mumble awful truths, but are not otherwise hostile.",
      "The nearest creature is polymorphed into an awakened shrub for 1 hour or until reduced to 0 hp (No save).",
      "Time slows down for up to six randomly determined creatures within 120 feet of the anomaly. They are affected by the slow spell for 1 minute. (Save DC 15).",
      "Time speeds up for one randomly determined creature within 60 feet of the anomaly. They are affected by the haste spell for 1 minute.",
      "A bowl of flowers and a very surprised aquatic mammal appear 100 feet in the air. \"Oh no, not again...\" thinks the flowers."
  ]
};

const MONSTERS_OF_DRAKKENHEIM_DATA = {
  "encounterDescriptions": {
    "Run out of Town": "Characters get turned around badly, and arrive at the nearest edge of town.",
    "Uninvited Guests": "The characters arrive at the nearest city gate.",
    "Wrong Turn": "Characters find themselves back where they started an hour ago. I guess you took a wrong turn somewhere?",
    "Troll Traveller": "A troll is heading through the ruins to join the trolls at King’s Gate. He wears a large pack containing raw contaminated meat, a tankard of rancid ale, 11 (2d10) gold, and a few sets of tools and trinkets. It is an elemental troll instead in the Inner City, and, if encountered near a bridge in the Inner City, there is an eldritch troll and a troll hag instead.",
    "Menacing Manticore": "A manticore circles overhead looking for an easy meal. If it spots the characters, it swoops in to attack the most vulnerable member. It flies off towards the Inner City if reduced to less than half its hit points. Manticores in the Inner City may hunt in packs of 3 (1d6) normal ones and a shardmaul manticore.",
    "Memories of Drakkenheim": "5 (2d4) last memories slowly follow the characters. They try to remain hidden and follow the party until one of the player characters is more than ten feet away from the others, then the shadows strike in an attempt to overwhelm the straggler. An arcane wraith leads these last memories when encountered in the Inner City.",
    "Phase Webs": "Strange webs cover this section of the ruins and fill nearby buildings - some even span the streets themselves. 2 (1d4) eldritch crawlers resting in the dark corners come to investigate any disturbance of their webs. The webs are especially thick in regions of the Inner City, where there are 7 (2d6) crawlers instead.",
    "Watching Gargoyles": "2 (1d4) wall gargoyles roaming overhead swoop down to attack. If encountered in the Inner City, there are 5 (1d8) instead alongside a tower dragon.",
    "Ratling Scavangers": "10 (3d6) ratlings warriors hide down a nearby alley or passage awaiting unsuspecting prey.",
    "Garmyr Hunters": "7 (2d6) garmyr warriors leading 2 (1d4) war dogs are stalking the streets for fresh meat. They are on keen lookout and watch for any signs of movement. In the Inner City the 3 (1d6) garmyr bloodhounds lead 7 (2d6) warriors and 7 (2d6) war dogs.",
    "Hateful Dead": "A lone haze wight marches with 10 (3d6) haze husks. It commands its minions to attack any living creature they find, and raises any nearby corpses as reinforcements. Add 2 (1d4) additional haze wights when encountered in the Inner City.",
    "Gibbering Flesh": "The walls here are covered in thick fleshy growths, parts of the walls, streets, and rubble have grown eyes and mouths that break away and form 2 (1d4) pyknic maunders. In the Inner City, it has become a protean abomination.",
    "Ghost Lights": "2 (1d4) will-o-wisps attempt to lure passing characters towards a mirage of treasure or delerium in the Haze. In the Inner City, there are 7 (2d6) wisps instead.",
    "Haze Haunt": "A warp witch moans and wails in the nearby building, scornfully mourning its miserable existence as it tries to remember its past. Add an additional 2 (1d4) warp witches when encountered in the Inner City.",
    "Fresh News": "A graffiti stalks these streets in search of entertainment.",
    "Lost Ones": "7 (2d6) delerium dregs and 3 (1d6) CR 1-2 dregs (Bloated, Displacer, Frenzied, Lurking, Spined or Tentacled) wander the streets ahead. They sorrowfully mutter nonsensical gibberish, but wail and screech when they encounter humanoids. Add 2 (1d4) haze hulks when encountered in the Inner City.",
    "Shambling Husks": "7 (2d6) haze husks stumble and shuffle around the streets. In this unsettling gait, they play out scenes of their former everyday lives.",
    "Old Alchemist’s Shop": "A decrepit alchemist’s shop that reeks of a chemical odor stands on a street corner. A pool of spilled chemicals has become an aggressive living biohazard. In the Inner City a chemystral is encountered instead.",
    "Rat God Effigy": "2 (1d4) ratling warlocks of the Rat God are performing an unholy ritual. They are Concentrating on the ritual for 3 rounds until initiative count 20. If at least one warlock maintains concentration until then, a maw vermin appears. In the Inner City the warlocks are led by an oracle of the Rat God.",
    "Infested Storage": "A bloated hive has made this small building into its home. There seems to be some materials left to claim in the building. In the Inner City the building is infested by a kronen and 7 (2d6) swarms of contaminated insects instead.",
    "Swatting Insects!": "3 (1d6) loathsome gag flies annoy the characters, mindlessly trying to attack the most armored one.",
    "Don’t Kick the Horses": "A bojack lies in an ambush near a corpse of a knight. It attacks whoever comes within its reach first. In the Inner City, 5 (2d4) loathsome gag flies swarm the characters if the bojack attacks.",
    "Unhappy Customer": "A haze hulk is mindlessly destroying an abandonned store. It attacks the characters, yelling “I wish to speak to your manager!”, if it sees them. In the Inner City it is accompanied by a juggernaut hulk and a gutwrench dreg.",
    "Fowl Play": "3 (1d6) lurking dregs watch 2 skretches fight to the death. The characters can bet on one of the monstrosities. On a loss, the dregs attack the group. On a win, the dregs pay in 5 (2d4) delerium chips and (6d6) gp.",
    "Expedition 33": "3 (1d6) skeleton soldiers and 2 (1d4) skeleton archers roam the streets, hunting down monsters and humanoids alike. They are insane and still think that they are retaking the city. In the Inner City they are accompanied by 2 (1d4) skeleton mages.",
    "Lights! Crystals! Action!": "A crystalline, frenzied and lambent dregs ask the characters to help them create the absolute perfomance of a play in a staged fight. If the characters agree, then the dregs uphold their end of the deal and pay them 50gp if two of the dregs are knocked unconscious, but not killed. In the Inner City, the frenzied dreg is replaced by a hunter hulk.",
    "Renegade Mage": "An academy outcast is performing experiments on delerium. They are guarded by 2 (1d4) dretches. If encountered in the Inner City, the outcast has a hezrou which takes all damage dealt to the outcast, serving as their guard.",
    "Insectoid Knight": "A bettle knight challenges the characters to a fight. Add an additional 2 (1d4) beetle knights when encountered in the Inner City.",
    "Silk Works": "The characters stumble upon a dead end crawling with 7 (2d6) haze moth caterpillars. The creatures are not actively hostile, but will fight back if endangered. There’s a decent amount of silk in there to be worth 100gp if sold. In the Inner City 2 (1d4) of the caterpillas are replaced with chrysalises, and the price of silk is increased to 250gp.",
    "Fractured Reality": "A reality cyst has taken root inside one of the abandoned buildings It is carefully hidden and feeds on the creatures passing by its lair. In the Inner City an effulgent cnidarian is ecountered instead.",
    "Allopine Den": "The characters are attacked by 5 (2d4) allopines, who keep to the air and attack until the characters leave the area. The creatures do not pursue anyone beyong their territory.",
    "Magehunter": "A phage hides in the area, it only attacks if the one of the characters has Spellcasting or Pact Magic and prioritizes the one with the highest available spell slots. In the Inner City the number of phages is increased by 3 (1d6).",
    "Crystalline Horror": "2 (1d4) petrified crystalline dregs stand on this street, remains of their faces twisted in horror. A basilisk hunts in this area. In the Inner City, the dregs are not petrified and protect the basilisk.",
    "Fungal Trollfestation": "The characters stumble upon a strange field of delerium-infused mushrooms. These are 10 (3d6) fungal trollings, which spring to life 2 (1d4) at a time per round to attack the characters until none are left. In the Inner City a troll hag is tending to these foul things, increasing their number to 14 (4d6) and waves to 5 (2d4).",
    "Croaking Well": "2 (1d4) lob frogs wander around a semi-intact well, they are very territorial.",
    "For Whom the Bell Tolls?": "A belfray attempts to ambush characters from the nearest rooftop. It immediately tries to fly away if less than half of the characters fail their save against its Sonic Blast.",
    "Princess Petunia": "A lone giant ratling is wandering the streets in a tattered dress that is too small for it. It refers to itself as Princess Petunia and asks the characters for directions towards the nearest gathering of its kind.",
    "Unnerving Invitation": "A ghoul priest gives characters a sealed letter of invitation to a ball held in the Inner City. A few moments later bells ring loudly and the ghoul yells: “I must away!”. It runs away into the nearest alleyway, ocassionally stumbling.",
    "Just a Little Nibble": "Two Bloodied hazeblood vampires hide within the destroyed buildings, waiting for an opportune moment to ambush.",
    "A Helping Hand": "The characters stumble upon an unnerving sight of a helpful hand running away on its fingers with a small satchel. In the Inner City, the characters encounter a digipide instead.",
    "Have We Met Before?": "The characters encounter a group of eerily familiar looking adventurers that wish to share some of their findings - 7 (2d6) delerium chips, 3 (1d6) delerium fragments and 3 items rolled on Lucky Finds table. The only condition is that the characters do the same to the next adventurers they meet. Only an hour after the encounter the characters realize that the people they have met were just different combinations of their of physical traits.",
    "Stranger Who?": "A psychophant in guise of an adventurer approaches the characters and offers to help them with some information. In exchange it asks for something memorable from the characters. The stranger seems to possess otherworldly knowledge and can give valuable hints for Personal Quests. As the characters pass the next building, they find the corpse of the person they’ve just met and the psychophant is nowhere to be seen.",
    "Friendly Doctor": "A doctor (SQGtD) is wandering the streets. They offer to heal one of the characters for 20 (4d8+2) Hit Points. They only ask to take a blood sample as a price. They can provide two more healings, if offered a delerium fragment or a rare monster component.",
    "Hooded Lantern Patrol": "5 (2d4) Hooded Lantern scouts led by an Hooded Lantern veteran are on a recon mission. If the characters are in trouble they step in to help them, but then demand the characters turn over half of whatever plunder they’ve found in the ruins, citing their authority under the “law” of Westemär and that “scavenging” in the ruins is technically prohibited without the assent of the Lord Commander.",
    "Queen’s Men Looters": "7 (2d6) bandits led by a bandit captain are hoping for easy pickings. The bandits try to hide from the players until they appear wounded or in need of a rest, so canny characters might spot them before this happens.",
    "Questing Knight": "A Silver Order paladin on a warhorse with a retinue of 7 (2d6) squires are searching for lost relics and holy sites in the ruins.",
    "Academy Surveyor": "An academy mage of the Amethyst Academy and 2 (1d4) academy apprentices are conducting research in the ruins. In the Inner City it is 2 (1d4) academy mages led by a master mage instead.",
    "Pilgrims of the Fallen Fire": "A group of 10 (3d6) pilgrims led by a missionary and a zealot are heading towards the crater.",
    "Rival Adventurers": "Characters encounter a group of rival adventurers (see chapter 2).",
    "Double Trouble": "Roll twice, ignoring this result on subsequent rolls. If two groups of monsters or NPCs are encountered, they’re fighting each other.",
    "Horribly Lost": "The characters are badly turned around and become hopelessly lost in the ruins. They no longer know where they are anymore or what direction they are facing. They wander the city streets indefinitely, checking for random encounters as normal each hour. They don’t regain their bearings unless the circumstances of a random encounter lead them to clues or friendly NPCs who can help them.",
    "Executioner’s Summons": "The characters stumble into Slaughterstone Square.",
    "Going in Circles": "The characters lose their position and get lost. They no longer know where they are anymore or what direction they are facing. They must wander the city streets for the next 1d4 hours, after which they regain their original position. Check for random encounters as normal each hour. A random encounter could result in circumstances where the characters no longer become lost.",
    "Lord of the Feast!": "The Lord of the Feast leads a warpack of 10 (3d6) garmyr warriors and 2 (2d4) hell hounds.",
    "Crimson Countess": "The Crimson Countess hunts above with a retinue of 5 (2d4) hazewind harpy hunters.",
    "Wandered into the Garden": "The characters arrive at the nearest edge of Queen’s Park Garden.",
    "Sewer Monster": "An otyugh feasting on offal lurks near a sewer access point.",
    "Stalking Vermin": "14 (4d6) ratling warriors and 5 (2d4) guttersnipes have set up an ambush. These ratlings use bait to lure prey towards a dead-end street or sewer passage where the guttersnipes lurk on high ground to snipe their quarry with ranged attacks.",
    "Ratling Horde": "A warlock of the Rat God leads 2 (1d4) swarms of ratlings.",
    "Ratling Raiders": "A ratling alchemist leads a group of 2 (1d4) giant ratlings and 3 (1d6) burrow wardens.",
    "Ratling Infestation": "A ratling pathogenist performs wicked experiments on corpses of his bretheren.",
    "Hundreds of Tails": "The characters stumble upon a site of a recent explosion, there are corpses of ratlings in different states of destruction all around. Suddenly, a rat king attacks. While in combat, a random character rolls on the Arcane Anomalies table at the Initiative count 20 every round.",
    "Fallen Heroes": "5 (2d4) haze wights are all that remains of this former adventuring party. They believe any living humanoids they encounter are mutated monsters.",
    "Garmyr Ravagers": "2 (1d4) garmyr berserkers with 3 (1d6) hell hounds are rampaging through the streets, howling loudly and starting fires.",
    "Garmyr Bloodrite": "A garmyr thaumaturge is performing a vile blood ritual upon 10 (3d6) garmyr warriors. While the thaumaturge is alive, whenever a garmyr warrior is Bloodied, roll a d6. On a roll of 1, the warrior transforms into a Bloodied garmyr berserker, and on a roll of 6, its body violently convulses and explodes, dealing 14 (4d6) Piercing damage to all creatures within 10 feet of it on a failed save or half as much on a successful save",
    "Overgrown Ruins": "Strange alien plants and oddly-shaped vines creep up a crumbling ruin. A dark growth shambler is tending to 2 (1d4) hypnotic eldritch blossoms that grow in the tangled mass.",
    "Living Ruins": "Several inanimate parts of the ruins suddenly spring to life as 2 (1d4) contaminated elementals. Choose whichever type is most appropriate for the area.",
    "Living City": "A living city dwells in the area, looking like a safe building to rest in.",
    "Chimera Nest": "A chimera is nesting in a tall spire. Aggressive and territorial, it swoops down to rip apart any who wander around its turf.",
    "Harpy Flock": "A pack of 10 (3d6) hazewind harpy hunters flies overhead surveying the ground for anything worth hunting.",
    "Crone’s Band": "A hazewind harpy crone sits percheed up on a roof of the tallest building in the area while 2 (1d4) valkyries scout around for potential prey.",
    "Lurking Wraiths": "2 (1d4) arcane wraiths flutter about seeking erratic magic, and fixate on whichever character is carrying the most delerium or magic items.",
    "Gloaming Ray": "A cloaker flies through the dark rooftops above looking for prey.",
    "Deep Ones": "10 (3d6) deep dregs and 1 deep knight occupy a sewer junction or are emerging from a sewer exit.",
    "Stalking Tree": "An oak troll stalks the characters from behind the buildings. If they try to approach it, it tries to hide into its shroud of leaves.",
    "The Black Coach": "The characters encounter a mysterious black coach pulled by a hunter hulk Henry and a juggernaut hulk Grunt. Inside the coach is the Pale Man. If the characters suffer from Contamination, he offers to ‘heal’ them at his estate. If attacked, the hulks swiftly pull the coach away, while the Pale Man mentally summons 14 (4d6) swarms of contaminated insects to distract the characters.",
    "The Predator": "A striga, named Sarah, suddenly appears from a burst of Deep Haze and attacks the characters. Sarah fights for 2 (1d4) rounds or until Bloodied, after which she uses her Epic action or Reaction to disappear in another puff of Deep Haze. Perhaps, all that she seeks are her husband Rolf and their daughter.",
    "Courtly Graces": "A nearby building is buzzing with activity, there seems to be some sort of gathering inside. On the doorsteps stands a grim custodian, who unless the characters have an invitation, refuses to let them in. Once the characters enter deeper into the building they see 7 (2d6) vampire spawns and a sanguine witch feasting upon all sorts of bloody dishes. The characters can choose to partake in the feast and friendly banter for an hour to gain the benefits of a Short Rest and Heroes’ Feast spell, but take 22 (4d10) Psychic damage and gain a random form of Drakkenheim Madness. If the characters enter without the invitation, the room is empty and they are assaulted by 7 (2d6) skin walkers - remains of the vampires’ victims.",
    "Grotesque Emergence": "Deep Haze forms around the characters in a 60-foot Radius 20-foot thick dome. A moment later a grotesque gargantuan emerges from the Deep Haze. The creature fights the group until Bloodied, after which it escapes into the Deep Haze and disappears.",
    "Patient Psychosis": "A wretched patient runs into the characters, they beg incoherently while cryings tears of blood. They die 2 (1d4) turns later and a disembodied psyche appears from their body.",
    "Abandoned Experiments": "The street is wrecked with signs of carnage and bodies strewn around. All the corpses have been severely mutilated and modified. A few moments later a low rumbling begins to emit from 5 (2d4) corpses. They rise as scrap reautomatas.",
    "Kidnapper": "A bodysnatcher has taken out 2 (1d4) adventurers or faction members and attempts to flee with them. If combat is not immediately instigated, it flees using Shadow Teleport.",
    "Brutally Smart": "A cerebrograft controls 2 (1d4) innocent harvesters as they gather corpses of humanoids and monsters alike. The harvesters sing the song the about the Pale Man. Cerebrograft appears somewhat cunning trying not to instigate the fight if approached. If fight ensues, he target the weakest-looking character with Telekinetic Grip and hurl them away or towards the harvesters.",
    "Contagious Outbreak": "A group of 4 (1d8) plague carriers suddenly lunges forward at the characters. They are mindless and will not stop their pursuit.",
    "Tank You Very Much": "The party encounters a group of 6 creatures, 2 (1d4) of which are tankers and the rest are flesh golems. They seem docile at first, but should a different creature get within 30 feet of them or damage them, they will violently attack. Unafraid for their meaningless lives, they fight until death. Flesh golems especially will continue to target downed characters until they are turned into bloody pulp.",
    "Lantern Duty": "A loud chorus of humming whistles can be heard nearby as the characters enter the street full of recently lit lanterns. Further down the road there are 2 (1d4) cyclopean hulks (or 3 (1d6) lamplighters if you own Dungeons of Drakkenheim: In Search of the Smuggler’s Secrets) working tirelessly on lighting up the road flames. They attack the characters if approached.",
    "A Trail to Follow": "The characters take note of a peculiar trail of octarine mucus. If they follow the trail, they’ll soon run into a docile anomollusk.",
    "The Play’s About to Begin": "The characters find a demonic statue of He Who Laughs Last. The demon lord mocks them for their futile efforts and urges them to continue this perfomance of naivety. If the statue is attacked, it transforms into a hostile oni, wielding a cane and wearing a circus ringmaster’s outfit. If defeated, the fiend bursts into hellish flames, leaving behind a ruby, worth 3d6 x 10gp.",
    "Everything You Wish For With a Clause": "An altar with a wide bowl of oozing darkness stands in the middle of the pathway. The characters hear sweet whispers and promises while within 60 feet of it. It can be recognized as an illusion created by The Whispered Promise. Unless, the devil deems the characters worthy, it simply promises uncommon or rare magic items and wealth, explaining it as wishing to see them reach greatness. If any character agrees, The Whispered Promise will claim their soul, making them unable to be revived, and ask a steep price once said character reaches level 10.",
    "Otherworldly Colours": "2 (1d4) warp marauders prowl around the area. They hunt down the characters, each attacking a different target.",
    "Liminal Onslaught": "3 (1d6) liminal heralds appear around the group, telepathically assaulting the characters, proclaiming that they are disrupting the natural order of things.",
    "Breach on the Threshold": "A strange and eerie melody fills the air. One round later a lurker on the threshold appears through a dimensional rift.",
    "City Cat": "A displacer beast, acting much like a normal cat and demanding food. If fed Components from deep dregs, ratlings or harpies, the creature is happy and satisfied. It leaves gracefully leaving behind a Rare Aberration Component.",
    "Failed Ritual": "The characters discover a ritual site with bits and pieces of clothing and flesh strewn around the area. There are an Uncommon Warlock spell scroll, material components for Find Familiar as well as an elongated humanoid skeleton. As soon as the characters approach the skeleton, it lifts into the air with octarine oozes forming its muscles and creating a mad and violent star spawn hulk (MPMM).",
    "Bound by Hatred": "A cloaked fiendish host sits in the midddle of a ritual site. Should the characters interact with them, their head will turn unnaturally to stare at them with bloodshot eyes. They then hover into the air and scream maniacally about vengeance and sacrifices for freedom. The spirit inside was tricked once, it will never trust mortals or make bargains with them again.",
    "Deadly Delivery": "A gigantic mutated pigeon crashes down onto the ground near the party. Each character rolls 1d6, and the one with the lowest roll is one on whom the pigeon falls. The mutated pigeon uses statblock of a roc, takes 21 (6d6) Bludgeoning damage because of the fall, has the Prone condition and is flailing in a bout of madness. Each creature on whose space the pigeon lands makes a DC 16 Dexterity saving throw, taking 21 (6d6) Bludgeoning damage on a failed save or half as much on a success. The main target makes the saving throw with Disadvantage. The pigeon has a scroll case containing 2 (1d4) Uncommon scrolls attached to its leg.",
    "Blood Crusade": "2 crimson knights led by a dark confessor disguised as members of the Silver Order offer shelter and safe haven for a break. They lure characters into false sense of security and nicely ask them to give delerium or offer a blood sacrifice to the Flame. If refused, they attack characters in their camp.",
    "Flaming Rodeo": "A brazen gorgon rushes along the street towards the characters. Inside clatter countless bones of many adventurers before it.",
    "Otherworldly and Chaotic": "A blue slaad and a red slaad gather delerium in the area. They are not hostile from the start, but will attempt to take the delerium from characters if they have any. These slaads do not bleed, absolutely random harmless things occur instead. If the aberrations are defeated, 5 (2d4) delerium fragments can be found in the area.",
    "Visions of the Past": "One of the characters stops in their tracks and stares into the sky. What they see before them is the city as it used to be - opulent and imperial. They stand there amidst the crowd of moving people. They see something coming from the sky. They see it crash through the Inscrutable Tower and fly down onto the city. A loud sound, a flash of light and they are back to the horrific present. The character gains Heroic Inspiration and a random Drakkenheim Madness until they finish a Short or Long Rest.",
    "The Harbinger Comet": "As characters step into the area, they suddenly find themselves in barren wasteland filled with gargantuan spikes of delerium emerging from the ground. A single star in the sky seems to be closing in on them. No matter how much they run, the falling comet strikes the ground causing an eruption of octarine energy. Each character must succeed on a DC 18 Constitution saving throw or take 7 (2d6) Necrotic damage, 7 (2d6) Psychic damage and 7 (2d6) Radiant damage as well as gain one level of Contamination. After the flash of light, the characters are back to the present and 14 (4d6) delerium chips and a delerium shard are scattered around the area.",
    "Apart in Time": "The characters enter a strange part of the ruins, where the buildings are destroyed yet sickly blue ghostly versions of their missing parts stand still mixed with the remaining stonework. In the middle of it all sit a ghoul lord seemingly holding hands with a similar sickly blue banshee, which is stuck on the Border Ethereal Plane, but is visible in this particular spot, which changes from time to time. The ghoul speaks Common as is not initially agressive, only getting hostile, if told to forget about the banshee.",
    "Chaotic Fractions": "A fractal lepidoptera has passed through this area. Leaving behind chaotic patterns in the ruins. Each character must succeed on a DC 17 Charisma saving throw, or gain a random pattern as descrided in lepidotera’s Lair Effect. Keep track of how many times, the characters had this encounter. Every 3rd time it happens, they encounter the lepidoptera, which initially tries to simply move through them.",
    "Flash of a Blade": "A night blade appears out of nowhere. He challenges one of the characters to a fair duel. The vampire fights until Bloodied after which he bows and swiftly disengages, leaving behind a rare spell scroll, if the fight was one on one.",
    "Curious Snake": "A yuan-ti abomination, wearing plate armor and wielding two scimitars with sun and moon ornamentation, travels alongside a giant lizard with backpacks. The creature is friendly and offers to buy unique spell scrolls from the characters for 75% of their price. There’s a 30% chance that the yuan-ti considers spell scrolls unique, if they haven’t been offered to it before.",
    "The Heritage of Cash": "Roll a d20. The number corresponds to encounters 11-30 from the Inner City Random Encounters table. The characters witness a tiefling questing knight of golden colour in heavy armor slaying all the monsters with a blade burning in radiant flame. The knight will then approach the characters, offering help, if they agree to spread the good name of the Cash family. The knight introduces himself as Jhonny Cash and will allow the characters to mitigate the next random encounter.",
    "Delerious for Delerium": "A young woman chemist with long green hair is curious as the group approaches. She asks for their help finding something, though she cannot name or describe it adequately enough for any real help. When pressed for information, she gets increasingly irrate. If the party has Delerium in plain sight or attempts to harvest it near her, she attacks and attempts to rob them of all Delerium. She does not kill, only knocks out the characters.",
    "Absolutely Wonderful Encounter": "Characters take note of a surprisingly intact sign “Your New Best Friend” and nearby stands an impossibly tall hooded figure. It appears to be docile and if approached emits a pleasant hum. It will also produce from within its robes a scroll of a Contaminated spell. The level of the spell is equal to the numbers of times that the characters have had this encounter, up to 5th level after which it resets. If attacked, the creature uses star warden statblock and dissappears if reduced to 0 Hit Points.",
    "Hooded Lantern Elites": "Either Petra or Ansom lead a group of 5 (2d4) Hooded Lanterns veterans.",
    "Sneaky Stealers": "A royal assassin and 2 (1d4) eldritch tricksters sneak through the rubble and mug wounded humanoids or kill weakened monstrosities to claim trophies. If encountered they hide and follow the characters for 2 (1d4) hours or until discovered. During this time characters roll on Lucky Finds table twice at take the lowest roll. These bandits don’t engage in direct combat unless forced, preferring to flee upon discovery, unless at least half of the characters are Bloodied.",
    "Silver Inquisition": "A Silver Order cavalier on a griffon, flamekeeper and 2 (1d4) recruits scout the area. They kill monstrosities, slay Followers of the Fallen Fire, drive away mages of the Amethyst Academy and destroy any delerium they find. They demand characters to give any delerium that they have for it to be destroyed.",
    "Academy Headhunter": "2 (1d4) invisible stalkers patrol the area, seeking out enemies of the Academy or malfeasant mages. They report back to a master mage located in the nearby ruins.",
    "The Sanctified": "A sanctified soul, sanctified monk and 2 sanctified knights patrol the area, taking out monsters. They also attempt to drive away bandits and members of the Silver Order. These people never kill, unless one of their own was slain and not spared."
  },
  "encounterTables": {
    "outerCity": [
      {
        "min": 1,
        "max": 2,
        "name": "Run out of Town"
      },
      {
        "min": 3,
        "max": 4,
        "name": "Uninvited Guests"
      },
      {
        "min": 5,
        "max": 6,
        "name": "Wrong Turn"
      },
      {
        "min": 7,
        "max": 8,
        "name": "Troll Traveller"
      },
      {
        "min": 9,
        "max": 10,
        "name": "Menacing Manticore"
      },
      {
        "min": 11,
        "max": 12,
        "name": "Memories of Drakkenheim"
      },
      {
        "min": 13,
        "max": 14,
        "name": "Phase Webs"
      },
      {
        "min": 15,
        "max": 16,
        "name": "Watching Gargoyles"
      },
      {
        "min": 17,
        "max": 18,
        "name": "Ratling Scavangers"
      },
      {
        "min": 19,
        "max": 20,
        "name": "Garmyr Hunters"
      },
      {
        "min": 21,
        "max": 22,
        "name": "Hateful Dead"
      },
      {
        "min": 23,
        "max": 24,
        "name": "Gibbering Flesh"
      },
      {
        "min": 25,
        "max": 26,
        "name": "Ghost Lights"
      },
      {
        "min": 27,
        "max": 28,
        "name": "Haze Haunt"
      },
      {
        "min": 29,
        "max": 30,
        "name": "Fresh News"
      },
      {
        "min": 31,
        "max": 32,
        "name": "Lost Ones"
      },
      {
        "min": 33,
        "max": 34,
        "name": "Shambling Husks"
      },
      {
        "min": 35,
        "max": 36,
        "name": "Old Alchemist’s Shop"
      },
      {
        "min": 37,
        "max": 38,
        "name": "Rat God Effigy"
      },
      {
        "min": 39,
        "max": 40,
        "name": "Infested Storage"
      },
      {
        "min": 41,
        "max": 42,
        "name": "Swatting Insects!"
      },
      {
        "min": 43,
        "max": 44,
        "name": "Don’t Kick the Horses"
      },
      {
        "min": 45,
        "max": 46,
        "name": "Unhappy Customer"
      },
      {
        "min": 47,
        "max": 48,
        "name": "Fowl Play"
      },
      {
        "min": 49,
        "max": 50,
        "name": "Expedition 33"
      },
      {
        "min": 51,
        "max": 52,
        "name": "Lights! Crystals! Action!"
      },
      {
        "min": 53,
        "max": 54,
        "name": "Renegade Mage"
      },
      {
        "min": 55,
        "max": 56,
        "name": "Insectoid Knight"
      },
      {
        "min": 57,
        "max": 58,
        "name": "Silk Works"
      },
      {
        "min": 59,
        "max": 60,
        "name": "Fractured Reality"
      },
      {
        "min": 61,
        "max": 62,
        "name": "Allopine Den"
      },
      {
        "min": 63,
        "max": 64,
        "name": "Magehunter"
      },
      {
        "min": 65,
        "max": 66,
        "name": "Crystalline Horror"
      },
      {
        "min": 67,
        "max": 68,
        "name": "Fungal Trollfestation"
      },
      {
        "min": 69,
        "max": 70,
        "name": "Croaking Well"
      },
      {
        "min": 71,
        "max": 72,
        "name": "For Whom the Bell Tolls?"
      },
      {
        "min": 73,
        "max": 74,
        "name": "Princess Petunia"
      },
      {
        "min": 75,
        "max": 76,
        "name": "Unnerving Invitation"
      },
      {
        "min": 77,
        "max": 78,
        "name": "Just a Little Nibble"
      },
      {
        "min": 79,
        "max": 80,
        "name": "A Helping Hand"
      },
      {
        "min": 81,
        "max": 82,
        "name": "Have We Met Before?"
      },
      {
        "min": 83,
        "max": 84,
        "name": "Stranger Who?"
      },
      {
        "min": 85,
        "max": 86,
        "name": "Friendly Doctor"
      },
      {
        "min": 87,
        "max": 88,
        "name": "Hooded Lantern Patrol"
      },
      {
        "min": 89,
        "max": 90,
        "name": "Queen’s Men Looters"
      },
      {
        "min": 91,
        "max": 92,
        "name": "Questing Knight"
      },
      {
        "min": 93,
        "max": 94,
        "name": "Academy Surveyor"
      },
      {
        "min": 95,
        "max": 96,
        "name": "Pilgrims of the Fallen Fire"
      },
      {
        "min": 97,
        "max": 98,
        "name": "Rival Adventurers"
      },
      {
        "min": 99,
        "max": 100,
        "name": "Double Trouble"
      }
    ],
    "innerCity": [
      {
        "min": 1,
        "max": 1,
        "name": "Horribly Lost"
      },
      {
        "min": 2,
        "max": 2,
        "name": "Executioner’s Summons"
      },
      {
        "min": 3,
        "max": 3,
        "name": "Going in Circles"
      },
      {
        "min": 4,
        "max": 4,
        "name": "Lord of the Feast!"
      },
      {
        "min": 5,
        "max": 5,
        "name": "Uninvited Guests"
      },
      {
        "min": 6,
        "max": 6,
        "name": "Crimson Countess"
      },
      {
        "min": 7,
        "max": 7,
        "name": "Wandered into the Garden"
      },
      {
        "min": 8,
        "max": 8,
        "name": "Sewer Monster"
      },
      {
        "min": 9,
        "max": 9,
        "name": "Stalking Vermin"
      },
      {
        "min": 10,
        "max": 10,
        "name": "Ratling Horde"
      },
      {
        "min": 11,
        "max": 11,
        "name": "Ratling Raiders"
      },
      {
        "min": 12,
        "max": 12,
        "name": "Ratling Infestation"
      },
      {
        "min": 13,
        "max": 13,
        "name": "Rat God Effigy"
      },
      {
        "min": 14,
        "max": 14,
        "name": "Hundreds of Tails"
      },
      {
        "min": 15,
        "max": 15,
        "name": "Hateful Dead"
      },
      {
        "min": 16,
        "max": 16,
        "name": "Fallen Heroes"
      },
      {
        "min": 17,
        "max": 17,
        "name": "Expedition 33"
      },
      {
        "min": 18,
        "max": 18,
        "name": "Lost Ones"
      },
      {
        "min": 19,
        "max": 19,
        "name": "Troll Traveller"
      },
      {
        "min": 20,
        "max": 20,
        "name": "Fungal Trollfestation"
      },
      {
        "min": 21,
        "max": 21,
        "name": "Phase Webs"
      },
      {
        "min": 22,
        "max": 22,
        "name": "Gibbering Flesh"
      },
      {
        "min": 23,
        "max": 23,
        "name": "Old Alchemist’s Shop"
      },
      {
        "min": 24,
        "max": 24,
        "name": "Menacing Manticore"
      },
      {
        "min": 25,
        "max": 25,
        "name": "Memories of Drakkenheim"
      },
      {
        "min": 26,
        "max": 26,
        "name": "Ghost Lights"
      },
      {
        "min": 27,
        "max": 27,
        "name": "Haze Haunt"
      },
      {
        "min": 28,
        "max": 28,
        "name": "Watching Gargoyles"
      },
      {
        "min": 29,
        "max": 29,
        "name": "Garmyr Hunters"
      },
      {
        "min": 30,
        "max": 30,
        "name": "Garmyr Ravagers"
      },
      {
        "min": 31,
        "max": 31,
        "name": "Garmyr Bloodrite"
      },
      {
        "min": 32,
        "max": 32,
        "name": "Overgrown Ruins"
      },
      {
        "min": 33,
        "max": 33,
        "name": "Living Ruins"
      },
      {
        "min": 34,
        "max": 34,
        "name": "Living City"
      },
      {
        "min": 35,
        "max": 35,
        "name": "Chimera Nest"
      },
      {
        "min": 36,
        "max": 36,
        "name": "Harpy Flock"
      },
      {
        "min": 37,
        "max": 37,
        "name": "Crone’s Band"
      },
      {
        "min": 38,
        "max": 38,
        "name": "Lurking Wraiths"
      },
      {
        "min": 39,
        "max": 39,
        "name": "Gloaming Ray"
      },
      {
        "min": 40,
        "max": 40,
        "name": "Deep Ones"
      },
      {
        "min": 41,
        "max": 41,
        "name": "Infested Storage"
      },
      {
        "min": 42,
        "max": 42,
        "name": "Don’t Kick the Horses"
      },
      {
        "min": 43,
        "max": 43,
        "name": "Unhappy Customer"
      },
      {
        "min": 44,
        "max": 44,
        "name": "Lights! Crystals! Action!"
      },
      {
        "min": 45,
        "max": 45,
        "name": "Renegade Mage"
      },
      {
        "min": 46,
        "max": 46,
        "name": "Insectoid Knight"
      },
      {
        "min": 47,
        "max": 47,
        "name": "Silk Works"
      },
      {
        "min": 48,
        "max": 48,
        "name": "Fractured Reality"
      },
      {
        "min": 49,
        "max": 49,
        "name": "Magehunter"
      },
      {
        "min": 50,
        "max": 50,
        "name": "Crystalline Horror"
      },
      {
        "min": 51,
        "max": 51,
        "name": "A Helping Hand"
      },
      {
        "min": 52,
        "max": 52,
        "name": "Stalking Tree"
      },
      {
        "min": 53,
        "max": 53,
        "name": "The Black Coach"
      },
      {
        "min": 54,
        "max": 54,
        "name": "Unnerving Invitation"
      },
      {
        "min": 55,
        "max": 55,
        "name": "The Predator"
      },
      {
        "min": 56,
        "max": 56,
        "name": "Courtly Graces"
      },
      {
        "min": 57,
        "max": 57,
        "name": "Grotesque Emergence"
      },
      {
        "min": 58,
        "max": 58,
        "name": "Patient Psychosis"
      },
      {
        "min": 59,
        "max": 59,
        "name": "Abandoned Experiments"
      },
      {
        "min": 60,
        "max": 60,
        "name": "Kidnapper"
      },
      {
        "min": 61,
        "max": 61,
        "name": "Brutally Smart"
      },
      {
        "min": 62,
        "max": 62,
        "name": "Contagious Outbreak"
      },
      {
        "min": 63,
        "max": 63,
        "name": "Tank You Very Much"
      },
      {
        "min": 64,
        "max": 64,
        "name": "Lantern Duty"
      },
      {
        "min": 65,
        "max": 65,
        "name": "A Trail to Follow"
      },
      {
        "min": 66,
        "max": 66,
        "name": "The Play’s About to Begin"
      },
      {
        "min": 67,
        "max": 67,
        "name": "Everything You Wish For With a Clause"
      },
      {
        "min": 68,
        "max": 68,
        "name": "Otherworldly Colours"
      },
      {
        "min": 69,
        "max": 69,
        "name": "Liminal Onslaught"
      },
      {
        "min": 70,
        "max": 70,
        "name": "Breach on the Threshold"
      },
      {
        "min": 71,
        "max": 71,
        "name": "City Cat"
      },
      {
        "min": 72,
        "max": 72,
        "name": "Failed Ritual"
      },
      {
        "min": 73,
        "max": 73,
        "name": "Bound by Hatred"
      },
      {
        "min": 74,
        "max": 74,
        "name": "Deadly Delivery"
      },
      {
        "min": 75,
        "max": 75,
        "name": "Blood Crusade"
      },
      {
        "min": 76,
        "max": 76,
        "name": "Flaming Rodeo"
      },
      {
        "min": 77,
        "max": 77,
        "name": "Otherworldly and Chaotic"
      },
      {
        "min": 78,
        "max": 78,
        "name": "Visions of the Past"
      },
      {
        "min": 79,
        "max": 79,
        "name": "The Harbinger Comet"
      },
      {
        "min": 80,
        "max": 80,
        "name": "Apart in Time"
      },
      {
        "min": 81,
        "max": 81,
        "name": "Chaotic Fractions"
      },
      {
        "min": 82,
        "max": 82,
        "name": "Flash of a Blade"
      },
      {
        "min": 83,
        "max": 83,
        "name": "Curious Snake"
      },
      {
        "min": 84,
        "max": 84,
        "name": "The Heritage of Cash"
      },
      {
        "min": 85,
        "max": 85,
        "name": "Delerious for Delerium"
      },
      {
        "min": 86,
        "max": 86,
        "name": "Stranger Who?"
      },
      {
        "min": 87,
        "max": 87,
        "name": "Friendly Doctor"
      },
      {
        "min": 88,
        "max": 88,
        "name": "Absolutely Wonderful Encounter"
      },
      {
        "min": 89,
        "max": 89,
        "name": "Rival Adventurers"
      },
      {
        "min": 90,
        "max": 90,
        "name": "Hooded Lantern Patrol"
      },
      {
        "min": 91,
        "max": 91,
        "name": "Hooded Lantern Elites"
      },
      {
        "min": 92,
        "max": 92,
        "name": "Queen’s Men Looters"
      },
      {
        "min": 93,
        "max": 93,
        "name": "Sneaky Stealers"
      },
      {
        "min": 94,
        "max": 94,
        "name": "Questing Knight"
      },
      {
        "min": 95,
        "max": 95,
        "name": "Silver Inquisition"
      },
      {
        "min": 96,
        "max": 96,
        "name": "Academy Surveyor"
      },
      {
        "min": 97,
        "max": 97,
        "name": "Academy Headhunter"
      },
      {
        "min": 98,
        "max": 98,
        "name": "Pilgrims of the Fallen Fire"
      },
      {
        "min": 99,
        "max": 99,
        "name": "The Sanctified"
      },
      {
        "min": 100,
        "max": 100,
        "name": "Double Trouble"
      }
    ]
  }
};

const STORAGE_KEYS = {
  shop: "aldor.shopState.v1",
  inventory: "aldor.inventoryLists.v1",
  theme: "aldor.theme.v1",
  encounterHistory: "aldor.encounterHistory.v1"
};

const APP_VERSION = "2.0.6";

const FACTION_LABELS = {
  hoodedLanterns: "Hooded Lanterns",
  queensMen: "Queen's Men",
  silverOrder: "Silver Order",
  amethystAcademy: "Amethyst Academy",
  fallingFire: "Falling Fire",
  rivalAdventurers: "Rival Adventurers"
};

const ENCOUNTER_FACTIONS = {
  "hooded lantern patrol": "hoodedLanterns",
  "hooded lantern elites": "hoodedLanterns",
  "queen's men looters": "queensMen",
  "queen’s men looters": "queensMen",
  "sneaky stealers": "queensMen",
  "questing knight": "silverOrder",
  "silver inquisition": "silverOrder",
  "academy surveyor": "amethystAcademy",
  "academy headhunter": "amethystAcademy",
  "renegade mage": "amethystAcademy",
  "pilgrims of the fallen fire": "fallingFire",
  "the sanctified": "fallingFire",
  "rival adventurers": "rivalAdventurers"
};

const LOW_IMPACT_ENCOUNTERS = new Set([
  "run out of town",
  "uninvited guests",
  "wrong turn",
  "going in circles",
  "horribly lost",
  "wandered into the garden",
  "princess petunia",
  "friendly doctor",
  "have we met before?",
  "stranger who?",
  "curious snake",
  "visions of the past",
  "delerious for delerium",
  "a helping hand",
  "unnerving invitation"
]);

const DEADLY_ENCOUNTER_PATTERNS = [
  /lord of the feast/i,
  /crimson countess/i,
  /black coach/i,
  /grotesque/i,
  /predator/i,
  /courtly graces/i,
  /tank you very much/i,
  /harbinger comet/i,
  /breach on the threshold/i,
  /liminal onslaught/i,
  /deadly delivery/i,
  /blood crusade/i,
  /otherworldly and chaotic/i,
  /failed ritual/i,
  /bound by hatred/i,
  /hundreds of tails/i
];

let lastEncounterState = null;
let encounterHistory = [];

const state = {
  potions: [],
  scrolls: [],
  uncommonShopItems: [],
  rareShopItem: [],
  uncommonItems: [],
  rareItems: []
};

const byId = (id) => document.getElementById(id);
const clone = (value) => JSON.parse(JSON.stringify(value));

function rollDice(numDice, numSides) {
  let total = 0;
  for (let i = 0; i < numDice; i += 1) {
    total += Math.floor(Math.random() * numSides) + 1;
  }
  return total;
}

function rollDiceNotation(notation) {
  const match = String(notation).match(/^(\d+)d(\d+)$/i);
  if (!match) return 0;
  return rollDice(Number(match[1]), Number(match[2]));
}

function randomFrom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function formatItem(item) {
  if (item.isStackable && item.quantity > 1) return `${item.quantity}x ${item.name} (${item.price}gp each)`;
  if (item.isStackable) return `${item.name} (${item.price}gp each)`;
  return `${item.name} (${item.price}gp)`;
}

function getScrollLevel(name) {
  if (name.includes("(1st)")) return 1;
  if (name.includes("(2nd)")) return 2;
  if (name.includes("(3rd)")) return 3;
  return 99;
}

function sortShopLists() {
  state.scrolls.sort((a, b) => getScrollLevel(a.name) - getScrollLevel(b.name) || a.name.localeCompare(b.name));
  state.uncommonShopItems.sort((a, b) => b.price - a.price || a.name.localeCompare(b.name));
}

function renderList(elementId, listName) {
  const list = byId(elementId);
  const items = state[listName];
  list.innerHTML = "";

  if (!items.length) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent = "No items";
    list.appendChild(empty);
    return;
  }

  items.forEach((item, index) => {
    const li = document.createElement("li");
    const text = document.createElement("span");
    text.textContent = formatItem(item);

    const soldButton = document.createElement("button");
    soldButton.type = "button";
    soldButton.className = "sold-button";
    soldButton.textContent = "−";
    soldButton.title = "Remove one";
    soldButton.addEventListener("click", () => removeSoldItem(listName, index));

    li.append(text, soldButton);
    list.appendChild(li);
  });
}

function renderShop() {
  sortShopLists();
  renderList("potionsList", "potions");
  renderList("scrollsList", "scrolls");
  renderList("uncommonList", "uncommonShopItems");
  renderList("rareList", "rareShopItem");
}

function saveShop() {
  localStorage.setItem(STORAGE_KEYS.shop, JSON.stringify({
    potions: state.potions,
    scrolls: state.scrolls,
    uncommonShopItems: state.uncommonShopItems,
    rareShopItem: state.rareShopItem
  }));
}

function loadShop() {
  const saved = localStorage.getItem(STORAGE_KEYS.shop);
  const source = saved ? JSON.parse(saved) : DEFAULT_DATA.shopState;
  state.potions = clone(source.potions || []);
  state.scrolls = clone(source.scrolls || []);
  state.uncommonShopItems = clone(source.uncommonShopItems || []);
  state.rareShopItem = clone(source.rareShopItem || []);
}

function saveInventoryLists() {
  localStorage.setItem(STORAGE_KEYS.inventory, JSON.stringify({
    uncommonItems: state.uncommonItems,
    rareItems: state.rareItems
  }));
}

function loadInventoryLists() {
  const saved = localStorage.getItem(STORAGE_KEYS.inventory);
  if (saved) {
    const parsed = JSON.parse(saved);
    state.uncommonItems = clone(parsed.uncommonItems || DEFAULT_DATA.uncommonItems);
    state.rareItems = clone(parsed.rareItems || DEFAULT_DATA.rareItems);
  } else {
    state.uncommonItems = clone(DEFAULT_DATA.uncommonItems);
    state.rareItems = clone(DEFAULT_DATA.rareItems);
  }
}


function openDialog(dialog) {
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "open");
}

function closeDialog(dialog) {
  if (typeof dialog.close === "function") dialog.close();
  else dialog.removeAttribute("open");
}

function encodeSavePayload(payload) {
  const json = JSON.stringify(payload);
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary);
}

function decodeSavePayload(code) {
  const cleaned = String(code || "").trim().replace(/\s+/g, "");
  const binary = atob(cleaned);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}

function buildSavePayload() {
  return {
    app: "Aldor The Immense",
    version: 1,
    savedAt: new Date().toISOString(),
    shop: {
      potions: state.potions,
      scrolls: state.scrolls,
      uncommonShopItems: state.uncommonShopItems,
      rareShopItem: state.rareShopItem
    },
    inventoryLists: {
      uncommonItems: state.uncommonItems,
      rareItems: state.rareItems
    }
  };
}

function arrayOrFallback(value, fallback) {
  return Array.isArray(value) ? value : fallback;
}

function showSaveCodeDialog() {
  const code = encodeSavePayload(buildSavePayload());
  const textArea = byId("saveCodeText");
  textArea.value = code;
  openDialog(byId("saveCodeDialog"));
  textArea.focus();
  textArea.select();
}

async function copySaveCodeToClipboard() {
  const textArea = byId("saveCodeText");
  textArea.focus();
  textArea.select();

  try {
    await navigator.clipboard.writeText(textArea.value);
    alert("Save code copied.");
  } catch (_error) {
    const copied = document.execCommand("copy");
    alert(copied ? "Save code copied." : "Copy failed. Select the code and copy it manually.");
  }
}

function showLoadCodeDialog() {
  const textArea = byId("loadCodeText");
  textArea.value = "";
  openDialog(byId("loadCodeDialog"));
  textArea.focus();
}

function applySavePayload(payload) {
  const shop = payload.shop || {};
  const inventoryLists = payload.inventoryLists || {};

  state.potions = clone(arrayOrFallback(shop.potions, []));
  state.scrolls = clone(arrayOrFallback(shop.scrolls, []));
  state.uncommonShopItems = clone(arrayOrFallback(shop.uncommonShopItems, []));
  state.rareShopItem = clone(arrayOrFallback(shop.rareShopItem, []));

  state.uncommonItems = clone(arrayOrFallback(inventoryLists.uncommonItems, state.uncommonItems));
  state.rareItems = clone(arrayOrFallback(inventoryLists.rareItems, state.rareItems));

  saveShop();
  saveInventoryLists();
  renderShop();
}

function loadSaveCodeFromTextarea() {
  const rawCode = byId("loadCodeText").value;
  if (!rawCode.trim()) {
    alert("Paste a save code first.");
    return;
  }

  try {
    const payload = decodeSavePayload(rawCode);
    applySavePayload(payload);
    closeDialog(byId("loadCodeDialog"));
    alert("Save code loaded.");
  } catch (_error) {
    alert("That save code could not be loaded. Make sure you copied the whole code.");
  }
}

function getScrollPrice(spellName, basePrice) {
  const materialCost = DEFAULT_DATA.costlyMaterialComponentGp[spellName] || 0;
  return basePrice + (materialCost * 2);
}

function addOrStackScroll(name, price) {
  const existing = state.scrolls.find((item) => item.name === name);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.scrolls.push({ name, price, quantity: 1, isStackable: true });
  }
}

function generatePotions() {
  state.potions = [
    { name: "Potion of Healing", price: 100, quantity: rollDice(2, 6), isStackable: true },
    { name: "Potion of Greater Healing", price: 300, quantity: rollDice(1, 6), isStackable: true }
  ];
}

function generateScrolls() {
  state.scrolls = [];
  for (let i = 0; i < rollDice(1, 10); i += 1) {
    const spell = randomFrom(DEFAULT_DATA.level1Spells);
    addOrStackScroll(`${spell} (1st)`, getScrollPrice(spell, 75));
  }
  for (let i = 0; i < rollDice(1, 8); i += 1) {
    const spell = randomFrom(DEFAULT_DATA.level2Spells);
    addOrStackScroll(`${spell} (2nd)`, getScrollPrice(spell, 150));
  }
  for (let i = 0; i < rollDice(1, 6); i += 1) {
    const spell = randomFrom(DEFAULT_DATA.level3Spells);
    addOrStackScroll(`${spell} (3rd)`, getScrollPrice(spell, 450));
  }
}

function generateUncommon() {
  state.uncommonShopItems = [];
  const count = rollDice(1, 4);
  const used = new Set();
  while (used.size < count && used.size < state.uncommonItems.length) {
    used.add(Math.floor(Math.random() * state.uncommonItems.length));
  }
  used.forEach((index) => {
    state.uncommonShopItems.push({
      name: state.uncommonItems[index],
      price: rollDice(3, 6) * 100,
      quantity: 1,
      isStackable: false
    });
  });
}

function generateRare() {
  state.rareShopItem = [];
  if (!state.rareItems.length) return;
  state.rareShopItem.push({
    name: randomFrom(state.rareItems),
    price: 10000,
    quantity: 1,
    isStackable: false
  });
}

function generateShop() {
  generatePotions();
  generateScrolls();
  generateUncommon();
  generateRare();
  renderShop();
  saveShop();
}

function removeSoldItem(listName, index) {
  const item = state[listName][index];
  if (!item) return;
  if (item.isStackable) {
    item.quantity -= 1;
    if (item.quantity <= 0) state[listName].splice(index, 1);
  } else {
    state[listName].splice(index, 1);
  }
  renderShop();
  saveShop();
}

function clearInventory() {
  state.potions = [];
  state.scrolls = [];
  state.uncommonShopItems = [];
  state.rareShopItem = [];
  renderShop();
  saveShop();
}

function generateOuterCityDelerium(successes) {
  const rewards = [];
  if (successes <= 2) return "Nothing";
  if (successes >= 3) rewards.push(`${rollDice(3, 6)} delerium chips worth 10 gp each`);
  if (successes >= 4) rewards.push(`${rollDice(1, 6)} delerium fragments worth 100 gp each`);
  if (successes >= 5) rewards.push("1 delerium shard worth 500 gp");
  return rewards.length ? rewards.join("\n") : "Nothing";
}

function generateInnerCityDelerium(successes) {
  const rewards = [];
  if (successes <= 1) return "Nothing";
  if (successes >= 2) rewards.push(`${rollDice(3, 6)} delerium chips worth 10 gp each`);
  if (successes >= 3) rewards.push(`${rollDice(2, 6)} delerium fragments worth 100 gp each`);
  if (successes >= 4) rewards.push(`${rollDice(1, 6)} delerium shards worth 500 gp each`);
  if (successes >= 5) rewards.push("1 delerium crystal worth 1,000 gp");
  return rewards.length ? rewards.join("\n") : "Nothing";
}

function currentDeleriumArea() {
  return byId("outerCityCheck").checked ? "outer" : "inner";
}

function currentDeleriumAreaName() {
  return currentDeleriumArea() === "outer" ? "Outer City" : "Inner City";
}

function generateDeleriumReward(area, successes) {
  return area === "outer" ? generateOuterCityDelerium(successes) : generateInnerCityDelerium(successes);
}

function parsePositiveIntegerInput(id, fallback = 0) {
  const input = byId(id);
  if (!input) return fallback;
  const value = Number(String(input.value || "").trim());
  return Number.isInteger(value) && value > 0 ? value : fallback;
}

function adjustedRequiredSuccesses(partySize) {
  return Math.max(1, Math.round((3 * partySize) / 4));
}

function adjustedFailureThreshold(partySize) {
  return Math.max(1, Math.round((2 * partySize) / 4));
}

function updatePartySizeGuidance() {
  const partySize = parsePositiveIntegerInput("partySize", 4);
  const successes = adjustedRequiredSuccesses(partySize);
  const failures = adjustedFailureThreshold(partySize);
  const characterText = `${partySize} character${partySize === 1 ? "" : "s"}`;
  const successText = `${successes}+ success${successes === 1 ? "" : "es"}`;
  const failureText = `${failures}+ failed check${failures === 1 ? "" : "s"}`;

  const guidance = byId("partySizeGuidance");
  if (guidance) {
    guidance.textContent = `For ${characterText}: ${successText} finds or rules out the search objective; ${failureText} triggers a random encounter.`;
  }

  const deleriumPartyTargetNote = byId("deleriumPartyTargetNote");
  if (deleriumPartyTargetNote) {
    deleriumPartyTargetNote.textContent = `For ${characterText}, ${successText} means the party finds what they are looking for if it can be found in the search area; otherwise they conclusively rule it out.`;
  }

  const deleriumFailureNote = byId("deleriumFailureNote");
  if (deleriumFailureNote) {
    deleriumFailureNote.textContent = `For ${characterText}, ${failureText} while searching triggers a random encounter.`;
  }

  const encounterSearchTargetNote = byId("encounterSearchTargetNote");
  if (encounterSearchTargetNote) {
    encounterSearchTargetNote.textContent = `For ${characterText}, ${successText} means the party finds what they are looking for if it can be found in the search area; otherwise they conclusively rule it out.`;
  }

  const encounterFailureTargetNote = byId("encounterFailureTargetNote");
  if (encounterFailureTargetNote) {
    encounterFailureTargetNote.textContent = `${failureText} triggers a random encounter, but enough successes still means they find what they sought.`;
  }
}

function parseDeleriumCheckRolls() {
  const raw = byId("deleriumCheckRolls").value.trim();
  if (!raw) return [];
  return raw
    .split(/[\s,;]+/)
    .map((value) => Number(value.trim()))
    .filter((value) => Number.isFinite(value));
}

function calculateDeleriumSearch() {
  const rolls = parseDeleriumCheckRolls();
  if (!rolls.length) {
    alert("Enter the characters' check results first.");
    byId("deleriumCheckRolls").focus();
    return;
  }

  const dc = 15;
  const partySize = parsePositiveIntegerInput("partySize", 4);
  const requiredSuccesses = adjustedRequiredSuccesses(partySize);
  const failureThreshold = adjustedFailureThreshold(partySize);
  let successes = 0;
  let failures = 0;
  const rollLines = [];

  rolls.forEach((roll, index) => {
    if (!Number.isInteger(roll)) {
      rollLines.push(`Check ${index + 1}: ${roll} — ignored; not a whole number.`);
      return;
    }
    if (roll >= dc + 5) {
      successes += 2;
      rollLines.push(`Check ${index + 1}: ${roll} — success + extra success.`);
    } else if (roll >= dc) {
      successes += 1;
      rollLines.push(`Check ${index + 1}: ${roll} — success.`);
    } else {
      failures += 1;
      rollLines.push(`Check ${index + 1}: ${roll} — failed check.`);
    }
  });

  if (byId("cratersEdgeCheck").checked) {
    successes += 1;
    rollLines.push("Crater's Edge: +1 automatic success.");
  }

  const area = currentDeleriumArea();
  const reward = generateDeleriumReward(area, successes);
  const foundTarget = successes >= requiredSuccesses;
  const randomEncounter = failures >= failureThreshold;
  byId("deleriumOutput").textContent = [
    `${currentDeleriumAreaName()} search helper`,
    `DC: ${dc}`,
    `Party size: ${partySize}`,
    `Adjusted target: ${requiredSuccesses} success${requiredSuccesses === 1 ? "" : "es"}; ${failureThreshold}+ failed check${failureThreshold === 1 ? "" : "s"} triggers a random encounter.`,
    "",
    ...rollLines,
    "",
    `Total successes: ${successes}`,
    `Failed checks: ${failures}`,
    `Search objective: ${foundTarget ? "found / ruled out" : "not enough successes"}`,
    `Random encounter triggered: ${randomEncounter ? "Yes" : "No"}`,
    "",
    "Delerium found:",
    reward
  ].join("\n");
}

function selectedEncounterTable() {
  return document.querySelector('input[name="encounterTable"]:checked').value;
}

function normaliseEncounterName(name) {
  return String(name || "").trim().toLowerCase().replace(/[.!]+$/, "");
}

function encounterFaction(name) {
  return ENCOUNTER_FACTIONS[normaliseEncounterName(name)] || null;
}

function factionEnabled(faction) {
  if (!faction) return true;
  const checkbox = document.querySelector(`.faction-filter[data-faction="${faction}"]`);
  return !checkbox || checkbox.checked;
}

function isEncounterAllowed(name) {
  return factionEnabled(encounterFaction(name));
}

function isMonstersOfDrakkenheimMode(tableName) {
  const checkbox = byId("monstersOfDrakkenheimMode");
  return Boolean(
    checkbox &&
    checkbox.checked &&
    tableName !== "sewers" &&
    MONSTERS_OF_DRAKKENHEIM_DATA.encounterTables[tableName]
  );
}

function activeEncounterTable(tableName) {
  if (isMonstersOfDrakkenheimMode(tableName)) {
    return MONSTERS_OF_DRAKKENHEIM_DATA.encounterTables[tableName];
  }
  return DEFAULT_DATA.encounterTables[tableName];
}

function activeEncounterDescriptions(tableName) {
  if (isMonstersOfDrakkenheimMode(tableName)) {
    return MONSTERS_OF_DRAKKENHEIM_DATA.encounterDescriptions;
  }
  return DEFAULT_DATA.encounterDescriptions;
}

function maxEncounterRoll(tableName) {
  const table = activeEncounterTable(tableName);
  return Math.max(...table.map((entry) => entry.max));
}

function encounterRowForRoll(tableName, roll) {
  const table = activeEncounterTable(tableName);
  return table.find((entry) => roll >= entry.min && roll <= entry.max);
}

function rollEncounter(tableName, ignoreDoubleTrouble = false, manualRoll = null) {
  const maxRoll = maxEncounterRoll(tableName);

  if (manualRoll !== null) {
    const roll = Number(manualRoll);
    if (!Number.isInteger(roll) || roll < 1 || roll > maxRoll) {
      return { error: `Manual roll must be a whole number between 1 and ${maxRoll}.` };
    }
    const row = encounterRowForRoll(tableName, roll);
    if (!row) return { error: `No encounter found for roll ${roll}.` };
    if (ignoreDoubleTrouble && normaliseEncounterName(row.name) === "double trouble") {
      return { error: "Double Trouble cannot be used as a Double Trouble sub-roll." };
    }
    if (!isEncounterAllowed(row.name)) {
      const faction = encounterFaction(row.name);
      return {
        error: `Roll ${roll} produced ${row.name}, but ${FACTION_LABELS[faction] || "that faction"} encounters are currently filtered out.`
      };
    }
    return { name: row.name, roll, maxRoll, manual: true };
  }

  for (let attempt = 0; attempt < 1000; attempt += 1) {
    const roll = Math.floor(Math.random() * maxRoll) + 1;
    const row = encounterRowForRoll(tableName, roll);
    if (!row) continue;
    if (ignoreDoubleTrouble && normaliseEncounterName(row.name) === "double trouble") continue;
    if (!isEncounterAllowed(row.name)) continue;
    return { name: row.name, roll, maxRoll, manual: false };
  }

  return { error: "No available encounter could be generated with the current filters." };
}

function encounterDisplayText(encounter) {
  return `${encounter.name} - rolled ${encounter.roll} on d${encounter.maxRoll}${encounter.manual ? " (manual roll)" : ""}`;
}

function lookupEncounterDescription(descriptions, name) {
  const key = String(name).trim();
  if (descriptions[key]) return descriptions[key];

  const normalisedKey = key.replace(/[.!]+$/, "");
  const matchingKey = Object.keys(descriptions).find(
    (descriptionKey) => descriptionKey.replace(/[.!]+$/, "") === normalisedKey
  );
  return matchingKey ? descriptions[matchingKey] : "";
}

function rollDiceExpression(dice, sides, operator, modifier) {
  let total = rollDice(Number(dice), Number(sides));
  if (operator && modifier) {
    total += operator === "+" ? Number(modifier) : -Number(modifier);
  }
  return total;
}

function randomiseEncounterCounts(description) {
  return String(description).replace(
    /\b\d+\s*\(\s*(\d+)d(\d+)(?:\s*([+-])\s*(\d+))?\s*\)/gi,
    (_match, dice, sides, operator, modifier) => {
      const rolledTotal = rollDiceExpression(dice, sides, operator, modifier);
      const diceExpression = `${dice}d${sides}${operator && modifier ? operator + modifier : ""}`;
      return `${rolledTotal} (${diceExpression})`;
    }
  );
}

function getEncounterDescription(name, tableName) {
  const activeDescription = lookupEncounterDescription(activeEncounterDescriptions(tableName), name);
  if (activeDescription) return randomiseEncounterCounts(activeDescription);

  const fallbackDescription = lookupEncounterDescription(DEFAULT_DATA.encounterDescriptions, name);
  return fallbackDescription ? randomiseEncounterCounts(fallbackDescription) : "No description found for this encounter.";
}

function getEncounterDifficulty(encounter, tableName) {
  const name = normaliseEncounterName(encounter.name);
  const faction = encounterFaction(encounter.name);

  if (name === "double trouble") {
    return {
      level: "deadly",
      label: "Potentially deadly",
      detail: "Double Trouble creates two encounter groups and can become a multi-sided fight. Review before running as written."
    };
  }

  if (faction) {
    return {
      level: "variable",
      label: "Faction encounter",
      detail: `${FACTION_LABELS[faction]} result. Difficulty depends on current relationships, negotiation, and whether the faction becomes hostile.`
    };
  }

  if (DEADLY_ENCOUNTER_PATTERNS.some((pattern) => pattern.test(encounter.name))) {
    return {
      level: "deadly",
      label: "High danger",
      detail: "This result can be severe or campaign-shaping. Consider party resources before running it as written."
    };
  }

  if (LOW_IMPACT_ENCOUNTERS.has(name)) {
    return {
      level: "low",
      label: "Low / utility",
      detail: "This is mainly a navigation, social, clue, or support encounter unless the party escalates it."
    };
  }

  if (tableName === "innerCity" || isMonstersOfDrakkenheimMode(tableName)) {
    return {
      level: "high",
      label: "High risk",
      detail: "Inner City or Monsters of Drakkenheim encounters may be more dangerous than the base table. Check the stat blocks before committing."
    };
  }

  return {
    level: "variable",
    label: "Variable risk",
    detail: "This may be combat, hazard, or social depending on how the party approaches it."
  };
}

function buildEncounterDescription(encounterState) {
  const tableName = encounterState.tableName;
  const encounter = encounterState.encounter;

  if (normaliseEncounterName(encounter.name) === "double trouble") {
    return [
      getEncounterDescription(encounter.name, tableName),
      "",
      `1) ${encounterDisplayText(encounterState.subEncounters[0])}`,
      getEncounterDescription(encounterState.subEncounters[0].name, tableName),
      "",
      `2) ${encounterDisplayText(encounterState.subEncounters[1])}`,
      getEncounterDescription(encounterState.subEncounters[1].name, tableName)
    ].join("\n");
  }

  return getEncounterDescription(encounter.name, tableName);
}

function createEncounterState(encounter, tableName, luckyFindOverride = null) {
  const stateObject = {
    tableName,
    mode: isMonstersOfDrakkenheimMode(tableName) ? "Monsters of Drakkenheim" : "Standard",
    encounter,
    subEncounters: [],
    luckyFind: luckyFindOverride || rollLuckyFindResult(),
    createdAt: new Date().toLocaleString()
  };

  if (normaliseEncounterName(encounter.name) === "double trouble") {
    const first = rollEncounter(tableName, true);
    const second = rollEncounter(tableName, true);
    if (first.error || second.error) {
      stateObject.description = first.error || second.error;
    } else {
      stateObject.subEncounters = [first, second];
      stateObject.description = buildEncounterDescription(stateObject);
    }
  } else {
    stateObject.description = buildEncounterDescription(stateObject);
  }

  return stateObject;
}

function renderEncounterState() {
  if (!lastEncounterState) return;
  const modeSuffix = lastEncounterState.mode === "Monsters of Drakkenheim" ? " [Monsters of Drakkenheim]" : "";
  byId("encounterOutput").textContent = `${encounterDisplayText(lastEncounterState.encounter)}${modeSuffix}`;
  byId("encounterDescription").textContent = lastEncounterState.description;
  byId("encounterLuckyFindOutput").textContent = formatLuckyFind(lastEncounterState.luckyFind);
}

function historySummaryFromState(encounterState) {
  const parts = [encounterDisplayText(encounterState.encounter)];
  if (encounterState.subEncounters.length) {
    parts.push(`Sub-rolls: ${encounterState.subEncounters.map((entry) => encounterDisplayText(entry)).join("; ")}`);
  }
  return parts.join(" | ");
}

function saveEncounterHistory() {
  localStorage.setItem(STORAGE_KEYS.encounterHistory, JSON.stringify(encounterHistory.slice(0, 50)));
}

function loadEncounterHistory() {
  try {
    encounterHistory = JSON.parse(localStorage.getItem(STORAGE_KEYS.encounterHistory) || "[]");
    if (!Array.isArray(encounterHistory)) encounterHistory = [];
  } catch {
    encounterHistory = [];
  }
}

function addEncounterHistoryEntry(encounterState, action = "Generated") {
  const entry = {
    time: new Date().toLocaleString(),
    action,
    tableName: encounterState.tableName,
    mode: encounterState.mode,
    summary: historySummaryFromState(encounterState),
    luckyFind: formatLuckyFind(encounterState.luckyFind),
    description: encounterState.description
  };
  encounterHistory.unshift(entry);
  encounterHistory = encounterHistory.slice(0, 50);
  saveEncounterHistory();
  renderEncounterHistory();
}

function renderEncounterHistory() {
  const list = byId("encounterHistoryList");
  if (!list) return;
  list.innerHTML = "";
  if (!encounterHistory.length) {
    const empty = document.createElement("li");
    empty.className = "muted";
    empty.textContent = "No encounters generated yet.";
    list.appendChild(empty);
    return;
  }
  encounterHistory.forEach((entry) => {
    const item = document.createElement("li");
    const time = document.createElement("span");
    time.className = "history-entry-time";
    time.textContent = entry.time;
    const title = document.createElement("div");
    title.className = "history-entry-title";
    title.textContent = `${entry.action}: ${entry.summary}`;
    const meta = document.createElement("div");
    meta.className = "history-entry-meta";
    meta.textContent = `${entry.mode} ${entry.tableName} | ${entry.luckyFind}`;
    item.append(time, title, meta);
    list.appendChild(item);
  });
}

function encounterHistoryAsText() {
  return encounterHistory.map((entry) => [
    entry.time,
    `${entry.action}: ${entry.summary}`,
    `${entry.mode} ${entry.tableName}`,
    entry.luckyFind,
    entry.description
  ].join("\n")).join("\n\n---\n\n");
}

async function copyEncounterHistory() {
  const text = encounterHistoryAsText();
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    alert(text);
  }
}

function clearEncounterHistory() {
  if (!encounterHistory.length) return;
  if (!confirm("Clear the encounter history log?")) return;
  encounterHistory = [];
  saveEncounterHistory();
  renderEncounterHistory();
}

function readManualEncounterRoll() {
  const input = byId("manualEncounterRoll");
  const raw = input.value.trim();
  if (!raw) return null;
  const value = Number(raw);
  return Number.isInteger(value) ? value : NaN;
}

function generateEncounter() {
  const tableName = selectedEncounterTable();
  const manualRoll = readManualEncounterRoll();
  const encounter = rollEncounter(tableName, false, manualRoll);
  if (encounter.error) {
    byId("encounterOutput").textContent = encounter.error;
    byId("encounterDescription").textContent = "";
    byId("encounterLuckyFindOutput").textContent = "";
    return;
  }
  lastEncounterState = createEncounterState(encounter, tableName);
  renderEncounterState();
  addEncounterHistoryEntry(lastEncounterState, manualRoll === null ? "Generated" : "Manual roll");
}

function rerollEncounterOnly() {
  const tableName = selectedEncounterTable();
  const encounter = rollEncounter(tableName, false);
  if (encounter.error) {
    byId("encounterOutput").textContent = encounter.error;
    return;
  }
  const existingLuckyFind = lastEncounterState ? lastEncounterState.luckyFind : null;
  lastEncounterState = createEncounterState(encounter, tableName, existingLuckyFind);
  renderEncounterState();
  addEncounterHistoryEntry(lastEncounterState, "Rerolled encounter");
}

function rerollLuckyFindOnly() {
  if (!lastEncounterState) {
    byId("encounterLuckyFindOutput").textContent = "Generate an encounter first.";
    return;
  }
  lastEncounterState.luckyFind = rollLuckyFindResult();
  renderEncounterState();
}

function rerollCountsOnly() {
  if (!lastEncounterState) {
    byId("encounterDescription").textContent = "Generate an encounter first.";
    return;
  }
  lastEncounterState.description = buildEncounterDescription(lastEncounterState);
  renderEncounterState();
}

function updateEncounterAreaNote() {
  const tableName = selectedEncounterTable();
  const manualRoll = byId("manualEncounterRoll");
  if (manualRoll) {
    const maxRoll = maxEncounterRoll(tableName);
    manualRoll.max = String(maxRoll);
    manualRoll.placeholder = `d${maxRoll}`;
  }
}

function generateCommonLocation() {
  const roll = Math.floor(Math.random() * 10) + 1;
  byId("locationOutput").textContent = `Common Location: ${DEFAULT_DATA.locations[roll - 1]}`;
}

function generateWarpedRuin() {
  const roll = Math.floor(Math.random() * 10) + 1;
  byId("warpedRuinOutput").textContent = `Warped Ruin: ${DEFAULT_DATA.warpedRuins[roll - 1]}`;
}

function rollLuckyFindResult() {
  const roll = Math.floor(Math.random() * 20) + 1;
  let resultText = DEFAULT_DATA.luckyFinds[roll - 1];
  resultText = resultText.replace(/\b(\d+)d(\d+)\b/gi, (_match, dice, sides) => String(rollDice(Number(dice), Number(sides))));
  resultText = resultText.replace(/\b(\d+)\s*x\s*(\d+)\b/gi, (_match, left, right) => String(Number(left) * Number(right)));
  return { roll, resultText };
}

function formatLuckyFind(luckyFind) {
  return `Lucky Find: rolled ${luckyFind.roll} on the Lucky Finds table — ${luckyFind.resultText}`;
}

function generateEncounterLuckyFindCheck() {
  return formatLuckyFind(rollLuckyFindResult());
}

function generateArcaneAnomaly() {
  const roll = Math.floor(Math.random() * 20) + 1;
  byId("arcaneAnomalyRoll").textContent = `Arcane Anomaly - rolled ${roll} on d20`;
  byId("arcaneAnomalyOutput").textContent = DEFAULT_DATA.arcaneAnomalies[roll - 1];
}

function showTab(tabName) {
  document.querySelectorAll(".tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === tabName));
  document.querySelectorAll(".panel").forEach((panel) => panel.classList.toggle("active-panel", panel.id === tabName));
}

function navigateToSection(tabName, targetId) {
  showTab(tabName);
  requestAnimationFrame(() => {
    const target = byId(targetId);
    if (!target) return;
    if (target.tagName.toLowerCase() === "details") target.open = true;

    const header = document.querySelector(".app-header");
    const headerOffset = header ? header.offsetHeight : 0;
    const margin = 12;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset - margin;
    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: "smooth"
    });
  });
}

function applyTheme(theme) {
  const nextTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = nextTheme;
  const button = byId("themeToggle");
  if (button) button.textContent = nextTheme === "dark" ? "Light mode" : "Dark mode";
  localStorage.setItem(STORAGE_KEYS.theme, nextTheme);
}

function toggleTheme() {
  const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  applyTheme(current === "dark" ? "light" : "dark");
}

function loadTheme() {
  applyTheme(localStorage.getItem(STORAGE_KEYS.theme) || "light");
}

function currentInventoryArray() {
  return byId("inventoryType").value === "rare" ? state.rareItems : state.uncommonItems;
}

function renderInventoryEditor() {
  const list = byId("inventoryList");
  list.innerHTML = "";
  currentInventoryArray().forEach((item) => {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    list.appendChild(option);
  });
}

function openInventoryDialog() {
  renderInventoryEditor();
  openDialog(byId("inventoryDialog"));
}

function addInventoryItem() {
  const input = byId("newInventoryItem");
  const value = input.value.trim();
  if (!value) return;
  currentInventoryArray().push(value);
  input.value = "";
  renderInventoryEditor();
}

function removeSelectedInventoryItems() {
  const selected = Array.from(byId("inventoryList").selectedOptions).map((option) => option.value);
  if (!selected.length) return;
  const target = currentInventoryArray();
  selected.forEach((value) => {
    const index = target.indexOf(value);
    if (index >= 0) target.splice(index, 1);
  });
  renderInventoryEditor();
}

function resetInventoryLists() {
  if (!confirm("Reset uncommon and rare item lists to the original defaults?")) return;
  state.uncommonItems = clone(DEFAULT_DATA.uncommonItems);
  state.rareItems = clone(DEFAULT_DATA.rareItems);
  saveInventoryLists();
  renderInventoryEditor();
}

function bindEvents() {
  document.querySelectorAll(".tab").forEach((button) => button.addEventListener("click", () => showTab(button.dataset.tab)));
  document.querySelectorAll("[data-nav-tab][data-nav-target]").forEach((button) => {
    button.addEventListener("click", () => navigateToSection(button.dataset.navTab, button.dataset.navTarget));
  });

  byId("themeToggle").addEventListener("click", toggleTheme);

  byId("generateShop").addEventListener("click", generateShop);
  byId("clearInventory").addEventListener("click", clearInventory);
  ["regenPotions", "regenScrolls", "regenUncommon", "regenRare"].forEach((id) => {
    const button = byId(id);
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      event.preventDefault();
    });
  });
  byId("regenPotions").addEventListener("click", () => { generatePotions(); renderShop(); saveShop(); });
  byId("regenScrolls").addEventListener("click", () => { generateScrolls(); renderShop(); saveShop(); });
  byId("regenUncommon").addEventListener("click", () => { generateUncommon(); renderShop(); saveShop(); });
  byId("regenRare").addEventListener("click", () => { generateRare(); renderShop(); saveShop(); });

  byId("editInventory").addEventListener("click", openInventoryDialog);
  byId("showSaveCode").addEventListener("click", showSaveCodeDialog);
  byId("copySaveCode").addEventListener("click", copySaveCodeToClipboard);
  byId("showLoadCode").addEventListener("click", showLoadCodeDialog);
  byId("loadSaveCode").addEventListener("click", loadSaveCodeFromTextarea);
  byId("inventoryType").addEventListener("change", renderInventoryEditor);
  byId("addInventoryItem").addEventListener("click", addInventoryItem);
  byId("newInventoryItem").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addInventoryItem();
    }
  });
  byId("removeSelected").addEventListener("click", removeSelectedInventoryItems);
  byId("resetLists").addEventListener("click", resetInventoryLists);
  byId("saveInventory").addEventListener("click", saveInventoryLists);

  byId("calculateDeleriumSearch").addEventListener("click", calculateDeleriumSearch);
  byId("partySize").addEventListener("input", updatePartySizeGuidance);
  byId("outerCityCheck").addEventListener("change", updatePartySizeGuidance);

  byId("generateEncounter").addEventListener("click", generateEncounter);
  byId("rerollEncounterOnly").addEventListener("click", rerollEncounterOnly);
  byId("rerollLuckyFindOnly").addEventListener("click", rerollLuckyFindOnly);
  byId("rerollCountsOnly").addEventListener("click", rerollCountsOnly);
  document.querySelectorAll('input[name="encounterTable"]').forEach((radio) => radio.addEventListener("change", updateEncounterAreaNote));
  byId("monstersOfDrakkenheimMode").addEventListener("change", updateEncounterAreaNote);
  document.querySelectorAll(".faction-filter").forEach((checkbox) => checkbox.addEventListener("change", updateEncounterAreaNote));
  byId("copyEncounterHistory").addEventListener("click", copyEncounterHistory);
  byId("clearEncounterHistory").addEventListener("click", clearEncounterHistory);

  byId("generateCommonLocation").addEventListener("click", generateCommonLocation);
  byId("generateWarpedRuin").addEventListener("click", generateWarpedRuin);
  byId("generateArcaneAnomaly").addEventListener("click", generateArcaneAnomaly);
}

function init() {
  loadTheme();
  loadInventoryLists();
  loadShop();
  loadEncounterHistory();
  bindEvents();
  renderShop();
  renderEncounterHistory();
  updatePartySizeGuidance();
  updateEncounterAreaNote();
}

document.addEventListener("DOMContentLoaded", init);
