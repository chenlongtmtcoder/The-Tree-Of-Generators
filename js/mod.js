let modInfo = {
  name: "The Generator Tree",
  author: "Karl",
  pointsName: "Points",
  modFiles: ["layers.js", "tree.js"],

  discordName: "",
  discordLink: "",
  initialStartPoints: new Decimal("1"), // Used for hard resets and new players
  offlineLimit: 1, // In hours
};

// Set your version in num and name
let VERSION = {
  num: "0.2.1.1",
  name: "Small QoL",
};

let changelog = `<h1>Changelog:</h1><br>
<b>v0.2.1.1 - Small QoL</b><br>
		- Added 'Buy Max Generators'.<br>
    - Added a new milestone reward to 8 Boosters Generator.<br>
    - Endgame: Same as v0.2.1<br>
  <h3>v0.2.1 - Boosted Part 2</h3><br>
		- Added 5 MORE milestones in Booster Layer.<br>
    - Added 1 new Currency: Generator 5.<br>
    - Added 1 new Generators Buyable.<br>
    - Added 1 new Generator Upgrade.<br>
    - Endgame: 10 Boosters.<br>
  <h2>v0.2 - Boosted Part 1</h2><br>
    - Added 1 new Currency: Boosters.<br>
    - Added 1 new reset Layer: Booster Layer.<br>
		- Added 5 milestones in Booster Layer.<br>
    - Added Booster Time Speed [at 3 Boosters it will increase].<br>
    - Added some sort of Timewalls [Be ready at 2 Boosters].<br>
    - Added 3 new Generator Upgrades [2 can be affordable for now...].<br>
    - Endgame: 5 Boosters.<br><br>
	<h2>v0.1 - Beginning of Generators</h2><br>
    - Added 6 Currencies: Points, Generator Powers, Generator 1, Generator 2, Generator 3, and Generator 4.<br>
		- Added 4 Generators Buyables that DIRECTLY boost each other.<br>
    - Added 9 Generator Upgrades.<br>
		- Endgame: 1.00e42 Generator Powers.`;

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`;

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"];

function getStartPoints() {
  return new Decimal(modInfo.initialStartPoints);
}

// Determines if it should show points/sec
function canGenPoints() {
  return true;
}

// Calculate points/sec!
function getPointGen() {
  if (!canGenPoints()) return new Decimal(0);

  let gain = new Decimal("0");

  if (player.g.points.gt("0")) {
    gain = gain.add(tmp.g.effect);
  }
  if (hasUpgrade("g", 21)) {
    gain = gain.times("2");
  }
  if (hasMilestone("b", 6)) {
    gain = gain.times(layers.b.getSpeed().max("1"));
  }

  return gain;
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() {
  return {};
}

// Display extra things at the top of the page
var displayThings = [
  "Endgame: 10 Boosters [Warning: This doesn't show the endgame screen]",
];

// Determines when the game "ends"
function isEndgame() {
  return false;
}

// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {};

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
  return 3600; // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion) {}
