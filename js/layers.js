addLayer("n1", {
    name: "Layer 1", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "1", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
    }},
    tooltip: "Layer 1: Less than 1",
    color: "#ff0000",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "Small Numbers", // Name of prestige currency
    baseResource: "googology points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {
        let baseexp = new Decimal("0.5") // Prestige currency exponent
        return baseexp
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade("n1", 21)) {
		    mult = mult.times(upgradeEffect("n1", 21))
	    }
        if (hasUpgrade("n1", 22)) {
		    mult = mult.times(upgradeEffect("n1", 22))
	    }
        if (hasUpgrade("n1", 23)) {
		    mult = mult.times(upgradeEffect("n1", 23))
	    }
        if (hasUpgrade("n1", 31)) {
		    mult = mult.times(upgradeEffect("n1", 31))
	    }
        if (hasUpgrade("n1", 33)) {
		    mult = mult.times(upgradeEffect("n1", 33))
	    }
        if (hasMilestone("n1", 1)) {
		    mult = mult.times("3")
	    }
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal("1")

        if (hasUpgrade("n1", 32)) {
            exp = exp.add(upgradeEffect("n1", 32))
        }

        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){
        return true
    },
    passiveGeneration() {
        let gen = new Decimal("0")

        if (hasUpgrade("n1", 41)) {
            gen = gen.add("0.01")
        }

        return gen
    },
    upgrades: {
        11: {
            title() {
                return `1/100`
            },
            description() {
                return `Multiply Googology Points gain by <b>2.000</b>`
            },
            cost() {
                let cost = new Decimal("1")
                return cost
            },
            unlocked() {
                return true
            },
        },
        12: {
            title() {
                return `1/50`
            },
            description() {
                return `Multiply Googology point gain based on <b>itself</b>, min is <b>1.500</b>`
            },
            cost() {
                let cost = new Decimal("2")
                return cost
            },
            effect() {
                // .max(1) ensures player.points is at least 1, preventing NaN/Infinity errors at 0 points
                let eff = player.points.max(1).log10().add(1.5);
                return eff;
            },
            effectDisplay() {
                let eff = upgradeEffect(this.layer, this.id);
                return format(eff, 3) + "x"; // Formats the number nicely using TMT's built-in formatter
            },
            unlocked() {
                return hasUpgrade("n1", 11)
            },
        },
        13: {
            title() {
                return `1/33.333`
            },
            description() {
                return `<b>Best Small Numbers</b> multiplies googology points gain, min is <b>1.200</b>`
            },
            tooltip() {
                return `Note that it is rounded to the nearest 3 decimal number`
            },
            cost() {
                let cost = new Decimal("5")
                return cost
            },
            effect() {
                // .max(1) ensures player.points is at least 1, preventing NaN/Infinity errors at 0 points
                let eff = player.n1.best.max(1).log10().add(1.2);
                return eff;
            },
            effectDisplay() {
                let eff = upgradeEffect(this.layer, this.id);
                return format(eff, 3) + "x"; // Formats the number nicely using TMT's built-in formatter
            },
            unlocked() {
                return hasUpgrade("n1", 12)
            },
        },
        21: {
            title() {
                return `1/20`
            },
            description() {
                return `Multiply Small Numbers gain <b>1.100x</b>`
            },
            cost() {
                let cost = new Decimal("10")
                return cost
            },
            effect() {
                let eff = new Decimal("1.1");
                return eff;
            },
            effectDisplay() {
                let eff = upgradeEffect(this.layer, this.id);
                return format(eff, 3) + "x"; // Formats the number nicely using TMT's built-in formatter
            },
            unlocked() {
                return hasUpgrade("n1", 13)
            },
        },
        22: {
            title() {
                return `1/10`
            },
            description() {
                return `Multiply Small Numbers gain <b>1.150x</b>`
            },
            cost() {
                let cost = new Decimal("15")
                return cost
            },
            effect() {
                let eff = new Decimal("1.15");
                return eff;
            },
            effectDisplay() {
                let eff = upgradeEffect(this.layer, this.id);
                return format(eff, 3) + "x"; // Formats the number nicely using TMT's built-in formatter
            },
            unlocked() {
                return hasUpgrade("n1", 21)
            },
        },
        23: {
            title() {
                return `1/6`
            },
            description() {
                return `Multiply Small Numbers gain <b>1.200x</b>`
            },
            cost() {
                let cost = new Decimal("20")
                return cost
            },
            effect() {
                let eff = new Decimal("1.2");
                return eff;
            },
            effectDisplay() {
                let eff = upgradeEffect(this.layer, this.id);
                return format(eff, 3) + "x"; // Formats the number nicely using TMT's built-in formatter
            },
            unlocked() {
                return hasUpgrade("n1", 22)
            },
        },
        31: {
            title() {
                return `1/4`
            },
            description() {
                return `<b>Googology Points</b> multiplies Small Numbers gain, min at <b>1.250x</b>`
            },
            cost() {
                let cost = new Decimal("30")
                return cost
            },
            effect() {
                let eff = player.points.max(1).log10().add(1.25);
                return eff;
            },
            effectDisplay() {
                let eff = upgradeEffect(this.layer, this.id);
                return format(eff, 3) + "x"; // Formats the number nicely using TMT's built-in formatter
            },
            unlocked() {
                return hasUpgrade("n1", 23)
            },
        },
        32: {
            title() {
                return `1/3`
            },
            description() {
                return `Increases Small Number gain exponent by <b>+0.05</b>.`
            },
            cost() {
                let cost = new Decimal("100")
                return cost
            },
            effect() {
                let eff = new Decimal("0.05");
                return eff;
            },
            effectDisplay() {
                let eff = upgradeEffect(this.layer, this.id);
                return "+" + format(eff, 3); // Formats the number nicely using TMT's built-in formatter
            },
            unlocked() {
                return hasUpgrade("n1", 31)
            },
        },
        33: {
            title() {
                return `1/2`
            },
            description() {
                return `Best Small Numbers multiplies Small Numbers gain, min is <b>1.500x</b>`
            },
            cost() {
                let cost = new Decimal("200")
                return cost
            },
            effect() {
                let eff = player.n1.best.max(1).log10().add(1.5);
                return eff;
            },
            effectDisplay() {
                let eff = upgradeEffect(this.layer, this.id);
                return format(eff, 3) + "x";
            },
            unlocked() {
                return hasUpgrade("n1", 32)
            },
        },
        41: {
            title() {
                return `Ones`
            },
            description() {
                return `Remove the ablity to prestige, but generate <b>1%</b> of Small Numbers per second and unlock milestones.`
            },
            cost() {
                let cost = new Decimal("1000")
                return cost
            },
            unlocked() {
                return hasUpgrade("n1", 33)
            },
        },
    },
    milestones: {
        1: {
            requirementDescription: "Number 1",
            effectDescription: "Unlock the second layer and gain <b>3.000x</b> more googology points and small numbers.",
            done() { 
                return hasUpgrade("n1", 41); 
            },
            unlocked() {
                return hasUpgrade("n1", 41)
            },
        },
    },
    tabFormat: {
        "Upgrades": {
            content: [
                ["display-text", function() { 
                    let points = player.points;
                    return `Googology Points: <h2 style="color: #ff0000; text-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000;">${format(points)}</h2>`; 
                }],
                
                // Hide prestige button when upgrade 41 is bought
                "main-display",
                function() { return !hasUpgrade("n1", 41) ? "prestige-button" : "" },
                
                // Working Gain Tracker Text
                ["display-text", function() {
                    if (hasUpgrade("n1", 41)) {
                        let gen = new Decimal("0.01")
                        let gain = tmp.n1.resetGain.times(gen); 
                        return `You are earning <h2 style="color: #ff0000; text-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000;">${format(gain)}</h2> Small Numbers per second`;
                    }
                    return "";
                }],
                
                "blank",
                
                ["display-text", function() { 
                    let best = player.n1.best;
                    return `Best Small Numbers: <h2 style="color: #ff0000; text-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000;">${format(best)}</h2>`; 
                }],
                
                "upgrades",
            ]
        },
        "Milestones": {
            unlocked() {
                return hasUpgrade("n1", 41)
            },
            content: [
                ["display-text", function() { 
                    let points = player.points;
                    return `Googology Points: <h2 style="color: #ff0000; text-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000;">${format(points)}</h2>`; 
                }],
                
                // Hide prestige button when upgrade 41 is bought
                "main-display",
                function() { return !hasUpgrade("n1", 41) ? "prestige-button" : "" },
                
                // Working Gain Tracker Text
                ["display-text", function() {
                    if (hasUpgrade("n1", 41)) {
                        let gen = new Decimal("0.01")
                        let gain = tmp.n1.resetGain.times(gen); 
                        return `You are earning <h2 style="color: #ff0000; text-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000;">${format(gain)}</h2> Small Numbers per second`;
                    }
                    return "";
                }],
                
                "blank",
                
                ["display-text", function() { 
                    let best = player.n1.best;
                    return `Best Small Numbers: <h2 style="color: #ff0000; text-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000;">${format(best)}</h2>`; 
                }],
                
                "milestones",
            ]
        },
    },
})
