addLayer("c1", {
    name: "Cycle 1", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "c1", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 0, // Row the layer is in on the tree (0 is the first row)
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        best: new Decimal(0),
    }},
    tooltip: "Number Cycle 1: 0.999...",
    color: "#ffffff",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "Cycle 1 Points", // Name of prestige currency
    baseResource: "googology points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {
        let baseexp = new Decimal("0") // Prestige currency exponent
        return baseexp
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade("c1", 11)) {
		    mult = mult.times(upgradeEffect("c1", 11))
	    }
        if (hasUpgrade("c1", 12)) {
		    mult = mult.times(upgradeEffect("c1", 12))
	    }
        if (hasUpgrade("c1", 13)) {
		    mult = mult.times(upgradeEffect("c1", 13))
	    }
        if (player.c1.buyables[11].gte("1")) {
		    mult = mult.times(buyableEffect("c1", 11))
	    }
        if (player.c1.buyables[13].gte("1")) {
		    mult = mult.pow(buyableEffect("c1", 13))
	    }
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal("1")
        if (hasUpgrade("c1", 21)) {
            exp = exp.add("0.1")

            if (hasUpgrade("c1", 22)) {
                exp = exp.add("0.1")
            }
            if (hasUpgrade("c1", 23)) {
                exp = exp.add("0.1")
            }
            if (hasUpgrade("c1", 24)) {
                exp = exp.add("0.1")
            }
        }
        if (hasUpgrade("c1", 33)) {
            exp = exp.add("0.1")
        }
        if (player.c1.buyables[12].gte("1")) {
		    exp = exp.add(buyableEffect("c1", 12))
	    }
        if (hasUpgrade("c1", 53)) {
		    exp = exp.times(upgradeEffect("c1", 53))
	    }
        if (hasUpgrade("c1", 54)) {
		    exp = exp.times(upgradeEffect("c1", 54))
	    }
        if (exp.gte(new Decimal("1000").tetrate("1000"))) {
		    exp = new Decimal("1000").tetrate("1000")
	    }
        return exp
    },
    layerShown(){
        return hasUpgrade("n1", 41)
    },
    passiveGeneration() {
        let gen = new Decimal("0")
        if (hasUpgrade("n1", 41)) {
            gen = gen.add(1)
        }
        return gen
    },
    upgrades: {
        11: {
            title() {
                return `0.99`
            },
            description() {
                return `<b>Googology points</b> now multiplies Cycle 1 Points gain at a same rate.`
            },
            cost() {
                let cost = new Decimal("10")
                return cost
            },
            effect() {
                let eff1 = player.points.max(1);
                let exp = new Decimal("1");
                if (hasUpgrade("c1", 14)) {
                    exp = exp.times("2")
                }
                if (hasUpgrade("c1", 22)) {
                    exp = exp.times(upgradeEffect("c1", 22))
                }
                if (hasUpgrade("c1", 23)) {
                    exp = exp.times(upgradeEffect("c1", 23))
                }
                let final = eff1.pow(exp);
                return final;
            },
            effectDisplay() {
                let eff = upgradeEffect(this.layer, this.id);
                return format(eff, 3) + "x"; // Formats the number nicely using TMT's built-in formatter
            },
            unlocked() {
                return hasUpgrade("n1", 41)
            },
        },
        12: {
            title() {
                return `0.999`
            },
            description() {
                return `<b>Small Numbers</b> multiplies Cycle 1 Points gain.`
            },
            cost() {
                let cost = new Decimal("2000")
                return cost
            },
            effect() {
                let eff1 = player.n1.points.max(1);
                let exp = new Decimal("0.5")
                if (hasUpgrade("c1", 14)) {
                    exp = exp.times("2")
                }
                if (hasUpgrade("c1", 22)) {
                    exp = exp.times(upgradeEffect("c1", 22))
                }
                if (hasUpgrade("c1", 23)) {
                    exp = exp.times(upgradeEffect("c1", 23))
                }
                let final = eff1.pow(exp)
                return final;
            },
            effectDisplay() {
                let eff = upgradeEffect(this.layer, this.id);
                return format(eff, 3) + "x"; // Formats the number nicely using TMT's built-in formatter
            },
            unlocked() {
                return hasUpgrade("c1", 11)
            },
        },
        13: {
            title() {
                return `0.9999`
            },
            description() {
                return `Cycle 1 gain is multiplied by <b>Best Cycle 1 Points^0.1</b>, max at 1.80e308x`
            },
            cost() {
                let cost = new Decimal("500000")
                return cost
            },
            effect() {
                let eff1 = player.c1.best.max(1);
                let exp = new Decimal("0.1")
                if (hasUpgrade("c1", 14)) {
                    exp = exp.times("2")
                }
                if (hasUpgrade("c1", 51)) {
                    exp = exp.times(upgradeEffect("c1", 22))
                    exp = exp.times(upgradeEffect("c1", 23))
                }
                let final = eff1.pow(exp)
                let max = new Decimal("1.8e308")
                if (hasUpgrade("c1", 41)) {
                    max = max.times("5.555e691")
                }
                if (hasUpgrade("c1", 42)) {
                    max = max.pow("5")
                }
                if (hasUpgrade("c1", 51)) {
                    max = new Decimal("e1e15000")
                }
                if (final.gte(max)) {
                    return new Decimal(max)
                }else{
                    return final;
                }
            },
            effectDisplay() {
                let eff = upgradeEffect(this.layer, this.id);
                return format(eff, 3) + "x"; // Formats the number nicely using TMT's built-in formatter
            },
            unlocked() {
                return hasUpgrade("c1", 12)
            },
        },
        14: {
            title() {
                return `0.99999`
            },
            description() {
                return `Square the previous 3 cycle 1 upgrades effect.`
            },
            cost() {
                let cost = new Decimal("2000000")
                return cost
            },
            unlocked() {
                return hasUpgrade("c1", 13)
            },
        },
        21: {
            title() {
                return `0.9<-x5->9`
            },
            description() {
                return `Googology Point gain x2, and Cycle 1 Point gain exponent +0.10 per upgrade in this row.`
            },
            cost() {
                let cost = new Decimal("3.33e13")
                return cost
            },
            unlocked() {
                return hasUpgrade("c1", 14)
            },
        },
        22: {
            title() {
                return `0.9<-x10->9`
            },
            description() {
                return `Make Cycle Upgrade 1 and 2 effect to be raised based on Googology points.`
            },
            cost() {
                let cost = new Decimal("1e16")
                return cost
            },
            effect() {
                let exp = new Decimal("0.5")
                if (hasUpgrade("c1", 41)) {
                    exp = exp.times("1.5")
                }
                if (hasUpgrade("c1", 43)) {
                    exp = exp.times("1.2")
                }
                let eff = player.points.max(1).log10().pow(exp).add(1);
                return eff;
            },
            effectDisplay() {
                let eff = upgradeEffect(this.layer, this.id);
                return "^" + format(eff, 4); // Formats the number nicely using TMT's built-in formatter
            },
            unlocked() {
                return hasUpgrade("c1", 21)
            },
        },
        23: {
            title() {
                return `0.9<-x20->9`
            },
            description() {
                return `Make Cycle Upgrade 1 and 2 effect to be raised based on Best Small Numbers.`
            },
            cost() {
                let cost = new Decimal("5.2e52")
                return cost
            },
            effect() {
                let exp = new Decimal("0.25")
                if (hasUpgrade("c1", 41)) {
                    exp = exp.times("1.5")
                }
                if (hasUpgrade("c1", 43)) {
                    exp = exp.times("1.2")
                }
                let eff = player.n1.best.max(1).log10().pow(exp).add(1);
                return eff;
            },
            effectDisplay() {
                let eff = upgradeEffect(this.layer, this.id);
                return "^" + format(eff, 4); // Formats the number nicely using TMT's built-in formatter
            },
            unlocked() {
                return hasUpgrade("c1", 22)
            },
        },
        24: {
            title() {
                return `0.9<-x50->9`
            },
            description() {
                return `Raise Cycle Upgrade 3 effect to a 1.5th power and unlock a buyable.`
            },
            cost() {
                let cost = new Decimal("1e160")
                return cost
            },
            unlocked() {
                return hasUpgrade("c1", 23)
            },
        },
        31: {
            title() {
                return `0.9<-x100->9`
            },
            description() {
                return `Square-root base cost of Cycle Acceleration I [Base cost is 1e175]`
            },
            cost() {
                let cost = new Decimal("1e300")
                return cost
            },
            unlocked() {
                return hasUpgrade("c1", 24)
            },
        },
        32: {
            title() {
                return `0.9<-x200->9`
            },
            description() {
                return `Cycle Acceleration I effect base is increased by 1 per Cycle Acceleration I levels.`
            },
            cost() {
                let cost = new Decimal("1e360")
                return cost
            },
            unlocked() {
                return hasUpgrade("c1", 31)
            },
        },
        33: {
            title() {
                return `0.9<-x500->9`
            },
            description() {
                return `Cycle 1 Points gain exponent is increased by 0.10 and Googology point gain x1.50.`
            },
            cost() {
                let cost = new Decimal("9e725")
                return cost
            },
            unlocked() {
                return hasUpgrade("c1", 32)
            },
        },
        34: {
            title() {
                return `0.9<-x1,000->9`
            },
            description() {
                return `Cycle Acceration 1 cost scaling is slower and unlock a new buyable.`
            },
            cost() {
                let cost = new Decimal("8.888e888")
                return cost
            },
            unlocked() {
                return hasUpgrade("c1", 33)
            },
        },
        41: {
            title() {
                return `0.999<br><-x10,000-><br>999`
            },
            description() {
                return `Cycle Upgrade 3 hardcap starts 5.555e691x later, strengthen Cycle Upgrade SIX-SEVEN effect by ^1.50.`
            },
            cost() {
                let cost = new Decimal("1e2230")
                return cost
            },
            unlocked() {
                return hasUpgrade("c1", 34)
            },
        },
        42: {
            title() {
                return `0.999<br><-x100,000-><br>999`
            },
            description() {
                return `Cycle Upgrade 3 hardcap starts ^5 later, and Cycle Upgrade 1 effect divides Cycle Acceration I and II base cost.`
            },
            cost() {
                let cost = new Decimal("4e5667")
                return cost
            },
            unlocked() {
                return hasUpgrade("c1", 41)
            },
        },
        43: {
            title() {
                return `0.999<br><-x1e6-><br>999`
            },
            description() {
                return `Raise Cycle Upgrade 6 and 7 effect by ^1.2, and Cycle Acceration I scaling is slower.`
            },
            cost() {
                let cost = new Decimal("3e13131")
                return cost
            },
            unlocked() {
                return hasUpgrade("c1", 42)
            },
        },
        44: {
            title() {
                return `0.999<br><-x1e10-><br>999`
            },
            description() {
                return `Cycle Acceration II level increase its base effect by 0.0001. Unlock a new buyable.`
            },
            cost() {
                let cost = new Decimal("3e25775")
                return cost
            },
            unlocked() {
                return hasUpgrade("c1", 43)
            },
        },
        51: {
            title() {
                return `0.999<br><-x1e100-><br>999`
            },
            description() {
                return `Cycle Upgrade 3 effect hardcap is now e1e15000.`
            },
            cost() {
                let cost = new Decimal("e16728500000")
                return cost
            },
            unlocked() {
                return hasUpgrade("c1", 44)
            },
        },
        52: {
            title() {
                return `0.999<br><-e1000-><br>999`
            },
            description() {
                return `Cycle Upgrade 3 effect is now affected by Cycle Upgrade 6 and 7.`
            },
            cost() {
                let cost = new Decimal("e5e5000")
                return cost
            },
            unlocked() {
                return hasUpgrade("c1", 51)
            },
        },
        53: {
            title() {
                return `0.999<br><-e10000-><br>999`
            },
            description() {
                return `Multiply cycle 1 point gain exponent by best cycle 1 points.`
            },
            cost() {
                let cost = new Decimal("100e1.168e15006")
                return cost
            },
            effect() {
                let eff1 = player.c1.points.max(1).log10();
                let exp = new Decimal("1")
                let final = eff1.pow(exp)
                return final;
            },
            effectDisplay() {
                let eff = upgradeEffect(this.layer, this.id);
                return format(eff, 3) + "x"; // Formats the number nicely using TMT's built-in formatter
            },
            unlocked() {
                return hasUpgrade("c1", 52)
            },
        },
        54: {
            title() {
                return `0.999<br><-e1e10-><br>999`
            },
            description() {
                return `Cycle 1 point gain exponent by best cycle 1 points again!`
            },
            cost() {
                let cost = new Decimal("ee1e7")
                return cost
            },
            effect() {
                let eff1 = player.c1.points.max(1);
                let exp = new Decimal("1")
                let final = eff1.pow(exp)
                return final;
            },
            effectDisplay() {
                let eff = upgradeEffect(this.layer, this.id);
                return "x" + format(eff, 3); // Formats the number nicely using TMT's built-in formatter
            },
            unlocked() {
                return hasUpgrade("c1", 53)
            },
        },
    },
    buyables: {
        11: {
            title: "Cycle Acceration I",
            cost(x) {
                let basecost = new Decimal("1e175")
                if (hasUpgrade("c1", 31)) {
                    basecost = basecost.pow("0.5")
                }
                if (hasUpgrade("c1", 42)) {
                    basecost = basecost.div(upgradeEffect("c1", 11))
                }
                let basescale = new Decimal("1.1")
                if (hasUpgrade("c1", 34)) {
                    basescale = basescale.pow("0.9")
                }
                if (hasUpgrade("c1", 43)) {
                    basescale = basescale.pow("0.9")
                }
                let scaling = new Decimal(basescale).pow(x.pow(2));
                return new Decimal(basecost).times(scaling);
            },
            effect(x) {
                let base = new Decimal("10")
                if (hasUpgrade("c1", 32)) {
                    base = base.add(player.c1.buyables[11])
                }
                let free = player.c1.buyables[12].add(player.c1.buyables[13])
                let total = x.add(free)
                return new Decimal(base).pow(total);
            },
            display() {
                let data = tmp[this.layer].buyables[this.id];
                let free = player[this.layer].buyables[12];
                let total = player[this.layer].buyables[this.id].add(free);
                return `Multiply Cycle 1 Points gain by <b>10x</b> per level.<br><br>
                Cost: ${format(data.cost)} Cycle 1 Points<br>
                Level: ${formatWhole(player.c1.buyables[11])} + ${formatWhole(free)}<br>
                Effect: ${format(data.effect)}x`;
            },
            canAfford() {
                let cap = new Decimal("1000")
                return player[this.layer].points.gte(this.cost()) && player.c1.buyables[11].lt(cap);
            },
            buy() {
                let cost = this.cost();
                player[this.layer].points = player[this.layer].points.sub(cost);
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1);
            },
            unlocked() {
                return hasUpgrade("c1", 24);
            },
        },
        12: {
            title: "Cycle Acceration II",
            cost(x) {
                let basecost = new Decimal("1e1000");
                if (hasUpgrade("c1", 42)) {
                    basecost = basecost.div(upgradeEffect("c1", 11))
                }
                let term1 = new Decimal("2").pow(x.pow(2));
                let term2 = new Decimal("1.01").pow(x.pow(3));
                return basecost.times(term1).times(term2);
            },
            effect(x) {
                let eff = new Decimal("0.01")
                if (hasUpgrade("c1", 44)) {
                    eff = eff.add(player.c1.buyables[12].times("0.0001"))
                }
                let free = new Decimal("0")
                let total = x.add(free)
                return total.times(eff);
            },
            display() {
                let data = tmp[this.layer].buyables[this.id];
                let free = player.c1.buyables[13]
                let total = player[this.layer].buyables[this.id].add(free);
                return `Increase Cycle 1 Points exponent by <b>+0.01</b> per level.<br><br>
                Cost: ${format(data.cost)} Cycle 1 Points<br>
                Level: ${formatWhole(player.c1.buyables[12])} + ${formatWhole(free)}<br>
                Effect: +${format(data.effect, 2)}`;
            },
            canAfford() {
                let cap = new Decimal("1000")
                return player[this.layer].points.gte(this.cost()) && player.c1.buyables[12].lt(cap);
            },
            buy() {
                let cost = this.cost();
                player[this.layer].points = player[this.layer].points.sub(cost);
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1);
            },
            unlocked() {
                return hasUpgrade("c1", 34);
            },
        },
        13: {
            title: "Cycle Acceration III",
            cost(x) {
                let basecost = new Decimal("1e101000");
                let term1 = new Decimal("3").pow(x.pow(2));
                let term2 = new Decimal("1.21").pow(x.pow(3));
                let term3 = new Decimal("1.003").pow(x.pow(4));
                return basecost.times(term1).times(term2).times(term3);
            },
            effect(x) {
                let base = new Decimal("1.01")
                return new Decimal(base).pow(x);
            },
            display() {
                let data = tmp[this.layer].buyables[this.id];
                let free = new Decimal("0");
                let total = player[this.layer].buyables[this.id].add(free);
                return `Raise Cycle 1 Points gain to <b>1.01</b> per level.<br><br>
                Cost: ${format(data.cost)} Cycle 1 Points<br>
                Level: ${formatWhole(player.c1.buyables[13])} + ${formatWhole(free)}<br>
                Effect: ^${format(data.effect, 4)}`;
            },
            canAfford() {
                let cap = new Decimal("1000");
                return player[this.layer].points.gte(this.cost()) && player.c1.buyables[13].lt(cap);
            },
            buy() {
                let cost = this.cost();
                player[this.layer].points = player[this.layer].points.sub(cost);
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1);
            },
            unlocked() {
                return hasUpgrade("c1", 44);
            },
        },
    },
    tabFormat: {
        "Main": {
            content: [
                ["display-text", function() { 
                    let points = player.points;
                    return `Googology Points: <h2 style="color: #ffffff; text-shadow: 0 0 10px #ffffff, 0 0 20px #ffffff;">${format(points)}</h2>`; 
                }],
                
                // Hide prestige button when upgrade 41 is bought
                "main-display",
                
                // Working Gain Tracker Text
                ["display-text", function() {
                    if (hasUpgrade("n1", 41)) {
                        let gen = new Decimal("1")
                        let gain = tmp.c1.resetGain.times(gen); 
                        return `You are earning <h2 style="color: #ffffff; text-shadow: 0 0 10px #ffffff, 0 0 20px #ffffff;">${format(gain)}</h2> Cycle 1 Points per second`;
                    }
                    return "";
                }],
                
                "blank",
                
                ["display-text", function() { 
                    let best = player.c1.best;
                    return `Best Cycle 1 Points: <h2 style="color: #ffffff; text-shadow: 0 0 10px #ffffff, 0 0 20px #ffffff;">${format(best)}</h2>`; 
                }],
                
                "upgrades",
                "buyables",
            ]
        },
    },
})
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
    row: 1, // Row the layer is in on the tree (0 is the first row)
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
                let cost = new Decimal("25")
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
                let cost = new Decimal("50")
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
                let cost = new Decimal("100")
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
                return `Almost one [0.9]`
            },
            description() {
                return `Remove the ablity to prestige, but generate <b>1%</b> of Small Numbers per second and unlock cycles.`
            },
            cost() {
                let cost = new Decimal("250")
                return cost
            },
            unlocked() {
                return hasUpgrade("n1", 33)
            },
        },
    },
    milestones: {
        1: {
            requirementDescription: "Cycle 1",
            effectDescription: "Requires SM Upgrade 41 to get it. Gain <b>3.000x</b> more googology points and small numbers. Unlock a layer.",
            done() { 
                return hasUpgrade("n1", 41); 
            },
            unlocked() {
                return hasUpgrade("n1", 41)
            },
        },
        2: {
            requirementDescription: "Cycle 1 Completion: 1.000F1,000 Cycle 1 Points.",
            effectDescription: "Unlock a new layer. [coming soon]",
            done() { 
                return player.c1.points.gte(new Decimal("10").tetrate("1000")); 
            },
            unlocked() {
                return hasUpgrade("n1", 41);
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
        "Cycles": {
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
