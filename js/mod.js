let modInfo = {
	name: "The Tree of Googology",
	author: "Karl",
	pointsName: "googology points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1.1",
	name: "Cycle 1 Update.",
}

let changelog = `<h1>Changelog:</h1><br>
	<h2>v0.1.1</h2><br>
		- Added <h3>1</h3> new layer, <b>Cycle 1</b><br>
		- Added <b>20</b> upgrades.<br>
		- Added <b>3</b> buyables.<br>
		<h2>Warning: Inflation!</h2>
		- Endgame: Reach <h3>1</h3> and End of Cycle 1 [1.000F1,000 Cycle 1 Points, yes it is.]<br><br>
	<h2>v0.1</h2><br>
		- Added <h3>1</h3> new layer, <b>Small Numbers</b><br>
		- Added <b>10</b> upgrades.<br>
		- Added <b>1</b> milestone.<br>
		- Endgame: Reach <h3>1</h3> and <b>5,000</b> Small Numbers<br><br>
	<h2>v0.0</h2><br>
		- Added things.<br>
		- Added stuff.`

let winText = `You have reached the number limit! But for now... more comming soon!`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let base = new Decimal("0.1")
	let mult = new Decimal("1")

	if (hasUpgrade("n1", 11)) {
		mult = mult.times("2")
	}
	if (hasUpgrade("n1", 12)) {
		mult = mult.times(upgradeEffect("n1", 12))
	}
	if (hasUpgrade("n1", 13)) {
		mult = mult.times(upgradeEffect("n1", 13))
	}
	if (hasMilestone("n1", 1)) {
		 mult = mult.times("3")
	}
	if (hasUpgrade("c1", 21)) {
		mult = mult.times("2")
	}
	if (hasUpgrade("c1", 33)) {
		mult = mult.times("1.5")
	}
	return base.times(mult)
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
displayThings = [
    function() { 
        let numberText = "0.000";

		if (hasUpgrade("n1", 11)) {
			numberText = "0.010"

			if (hasUpgrade("n1", 12)) {
				numberText = "0.020"

				if (hasUpgrade("n1", 13)) {
					numberText = "0.030"

					if (hasUpgrade("n1", 21)) {
						numberText = "0.050"

						if (hasUpgrade("n1", 22)) {
							numberText = "0.100"

							if (hasUpgrade("n1", 23)) {
								numberText = "0.167"

								if (hasUpgrade("n1", 31)) {
									numberText = "0.250"

									if (hasUpgrade("n1", 32)) {
										numberText = "0.333"

										if (hasUpgrade("n1", 33)) {
											numberText = "0.500"

											if (hasUpgrade("n1", 41)) {
												numberText = "Cycle 1"

												if (hasMilestone("n1", 2)) {
													numberText = "1"
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}

        return `
                <style>
                    @keyframes rainbowGlow {
                        0%   { color: #ff0000; text-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000; }
                        10%  { color: #ff7700; text-shadow: 0 0 10px #ff7700, 0 0 20px #ff7700; }
                        20%  { color: #ffdd00; text-shadow: 0 0 10px #ffdd00, 0 0 20px #ffdd00; }
                        30%  { color: #77ff00; text-shadow: 0 0 10px #77ff00, 0 0 20px #77ff00; }
                        40%  { color: #00ff55; text-shadow: 0 0 10px #00ff55, 0 0 20px #00ff55; }
                        50%  { color: #00ffff; text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff; }
                        60%  { color: #0055ff; text-shadow: 0 0 10px #0055ff, 0 0 20px #0055ff; }
                        70%  { color: #7700ff; text-shadow: 0 0 10px #7700ff, 0 0 20px #7700ff; }
                        80%  { color: #ff00dd; text-shadow: 0 0 10px #ff00dd, 0 0 20px #ff00dd; }
                        90%  { color: #ff0055; text-shadow: 0 0 10px #ff0055, 0 0 20px #ff0055; }
                        100% { color: #ff0000; text-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000; }
                    }
                    .rainbow-glow-text {
                        animation: rainbowGlow 10s linear infinite;
                    }
                </style>
                Your Number is <h2 class="rainbow-glow-text">${numberText}</h2>
            `; 
    },
]

// Determines when the game "ends"
function isEndgame() {
	return false
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}