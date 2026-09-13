// Generators
addLayer("g", {
  name: "generators",
  symbol: "G",
  position: 0,

  startData() {
    return {
      unlocked: true,
      points: new Decimal(0),
      tier1: new Decimal(0),
      tier2: new Decimal(0),
      tier3: new Decimal(0),
      tier4: new Decimal(0),
      tier5: new Decimal(0),
      tier6: new Decimal(0),
      tier7: new Decimal(0),
      tier8: new Decimal(0),
      tier9: new Decimal(0),
      tier10: new Decimal(0),
      maxBuyCD: new Decimal(0),
    };
  },

  tooltip() {
    if (player.g.tier1.gt("0")) {
      let p = formatWhole(player.g.tier1);
      return `Generator 1s: ${p}`;
    } else if (hasUpgrade("g", 23) && player.points.gte("1000")) {
      return `Since you have 1000 points, you can now afford 'Generator I', which DIRECTLY boost GP gain.`;
    } else if (player.g.points.gt("0")) {
      let p = formatWhole(player.g.points);
      return `GP: ${p}`;
    } else {
      return `This is Generators Layer. Click on it. [You may need to have this on]`;
    }
  },
  color: "lime",
  requires: new Decimal(0),
  resource: "Generator Powers",
  baseResource: "points",

  baseAmount() {
    return player.points;
  },

  type: "normal",
  exponent: 0,

  gainMult() {
    // 1. Base gain
    let base = new Decimal(0);
    if (hasUpgrade("g", 11)) base = base.add(upgradeEffect("g", 11));
    if (hasUpgrade("g", 12)) base = base.add(upgradeEffect("g", 12));
    if (hasMilestone("b", 4)) base = base.add("3");

    // 2. Exponent
    let exp = new Decimal("1");
    if (hasUpgrade("g", 22)) exp = exp.add(upgradeEffect("g", 22));

    // 3. Base gain calculation
    let total = base.pow(exp);

    // 4. Mult after base
    let mult = new Decimal("1");
    if (hasUpgrade("g", 13)) mult = mult.times(upgradeEffect("g", 13));
    if (getBuyableAmount("g", 11).gt(0)) {
      mult = mult.times(player.g.tier1.max("1"));
    }
    mult = mult.times(tmp.b.effect.max("1"));
    if (hasMilestone("b", 2)) {
      mult = mult.times(layers.b.getTimeeff1());
    }
    if (hasMilestone("b", 7)) {
      mult = mult.times(layers.b.getSpeed().max("1"));
    }

    // 5. Grand total
    return total.times(mult);
  },

  row: 0,

  layerShown() {
    return true;
  },

  passiveGeneration() {
    return new Decimal("1");
  },

  getExpEff() {
    let exp = new Decimal("0.50");
    if (hasUpgrade("g", 23)) exp = exp.add(upgradeEffect("g", 23));
    if (hasUpgrade("g", 31)) exp = exp.add("0.05");
    if (hasUpgrade("g", 32)) exp = exp.add("0.05");
    if (hasUpgrade("g", 33)) exp = exp.add("0.05");
    if (hasUpgrade("g", 14)) exp = exp.add("0.05");
    if (hasUpgrade("g", 24)) {
      exp = exp.add("0.05");
      if (player.b.time.gte(new Decimal(60).times(15))) {
        exp = exp.add("0.05");
      }
    }
    if (hasUpgrade("g", 34)) exp = exp.add("0.10");
    return exp;
  },

  effect() {
    let base = new Decimal("0");
    if (player.g.points.gt("0")) base = player.g.points.add("1");
    let exp = this.getExpEff();
    return base.add("1").pow(exp);
  },

  effectDescription() {
    let exp = this.getExpEff();
    if (player.g.points.gt("0")) {
      return `which <h3 style="color: red; text-shadow: 0px 0px 10px red">DIRECTLY</h3> increase point gain at a <h3 style="color: lime; text-shadow: 0px 0px 10px lime">^${format(
        exp,
        4
      )}</h3> rate.<br>Currently: <h3 style="color: cyan; text-shadow: 0px 0px 10px cyan">${format(
        this.effect(),
        3
      )}</h3> Points/s from Generators`;
    } else {
      return `which does absolutely nothing. :)`;
    }
  },

  update(diff) {
    // Generators
    if (getBuyableAmount("g", 15).gte(1)) {
      let t5Gen = buyableEffect("g", 15);

      player.g.tier5 = player.g.tier5.add(t5Gen.times(diff));
    }
    if (getBuyableAmount("g", 14).gte(1)) {
      let t4Gen = buyableEffect("g", 14);

      player.g.tier4 = player.g.tier4.add(t4Gen.times(diff));
    }
    if (getBuyableAmount("g", 13).gte(1)) {
      let t3Gen = buyableEffect("g", 13);

      player.g.tier3 = player.g.tier3.add(t3Gen.times(diff));
    }
    if (getBuyableAmount("g", 12).gte(1)) {
      let t2Gen = buyableEffect("g", 12);

      player.g.tier2 = player.g.tier2.add(t2Gen.times(diff));
    }
    if (getBuyableAmount("g", 11).gte(1)) {
      let t1Gen = buyableEffect("g", 11);

      player.g.tier1 = player.g.tier1.add(t1Gen.times(diff));
    }

    // Skills CD
    if (player.g.maxBuyCD.gt(0)) {
      player.g.maxBuyCD = player.g.maxBuyCD.minus(
        layers.b.getSpeed().times(diff)
      );
    }
  },

  getGPbase() {
    let base = new Decimal("2");
    return base;
  },

  clickables: {
    11: {
      max() {
        CD = new Decimal("30");
        return CD;
      },
      penalty() {
        return new Decimal("1000");
      },
      title() {
        return `Buy Max Generators`;
      },
      tooltip() {
        return `This cooldown tick speed is also affected by Booster Time speed!`;
      },
      display() {
        return `Buy 1 Level of Each Unlocked Generator, but divides GP by ${format(
          this.penalty()
        )}.<br>Cost: 1.00e10 GP.<br>Cooldown: ${format(
          player.g.maxBuyCD.max("0"),
          3
        )}s`;
      },
      color() {
        return "lime";
      },
      canClick() {
        return player.g.points.gte("1e10") && player.g.maxBuyCD.lte("0");
      },
      unlocked() {
        return hasMilestone("b", 5);
      },
      onClick() {
        player.g.points = player.g.points.minus("1e10");
        player.g.points = player.g.points.div(this.penalty());
        player.g.maxBuyCD = this.max();
        let ids = [11, 12, 13, 14, 15];
        for (let id of ids) {
          if (canBuyBuyable(this.layer, id)) {
            buyBuyable(this.layer, id);
          }
        }
      },
    },
  },
  buyables: {
    11: {
      title: "Generator Tier I",

      cost(x) {
        let level = new Decimal(
          x !== undefined ? x : getBuyableAmount(this.layer, this.id)
        );

        let baseCost = new Decimal(1000);
        let baseLinear = new Decimal("1").add(level.times("0.1"));
        let quadratic1 = new Decimal("1").add(level.times("0.0001"));
        let mult = baseLinear
          .pow(level)
          .times(new Decimal(quadratic1).pow(level.pow(2)));

        return baseCost.times(mult);
      },

      effect(x) {
        let level = new Decimal(
          x !== undefined ? x : getBuyableAmount(this.layer, this.id)
        );

        if (level.lte(0)) return new Decimal("0");

        let base = layers[this.layer].getGPbase();

        let mult = new Decimal("1");
        mult = mult.times(player.g.tier2.max("1"));
        if (hasUpgrade("g", 33)) {
          mult = mult.times(upgradeEffect("g", 33));
        }
        if (hasUpgrade("g", 14)) {
          mult = mult.times(upgradeEffect("g", 14));
        }
        if (hasMilestone("b", 1)) {
          mult = mult.times(tmp.b.effect.max("1"));
        }
        if (hasMilestone("b", 7)) {
          mult = mult.times(layers.b.getSpeed().max("1"));
        }

        let eff = base.pow(level.sub(1)).times(mult);
        return eff;
      },

      display() {
        let data = temp[this.layer].buyables[this.id];
        let gpBase = layers[this.layer].getGPbase();

        return `Generate Generator Tier 1, and multiply its gain by <h3>${format(
          gpBase
        )}</h3> per level-1.\n\nLevel: ${
          player[this.layer].buyables[this.id] || 0
        }\nCost: ${format(data.cost)} Points\nEffect: +${format(
          data.effect
        )} Tier 1 Powers/sec`;
      },

      canAfford() {
        return player.points.gte(this.cost());
      },

      buy() {
        let cost = this.cost();
        if (!hasMilestone("b", 6)) {
          player.points = player.points.sub(cost);
        } else {
        }
        player.g.buyables[this.id] = getBuyableAmount(this.layer, this.id).add(
          1
        );
      },

      unlocked() {
        return hasUpgrade("g", 23);
      },
    },
    12: {
      title: "Generator Tier II",

      cost(x) {
        let level = new Decimal(
          x !== undefined ? x : getBuyableAmount(this.layer, this.id)
        );

        let baseCost = new Decimal("1e6");
        let baseLinear = new Decimal("1").add(level.times("0.2"));
        let quadratic1 = new Decimal("1").add(level.times("0.001"));
        let mult = baseLinear
          .pow(level)
          .times(new Decimal(quadratic1).pow(level.pow(2)));

        return baseCost.times(mult);
      },

      effect(x) {
        let level = new Decimal(
          x !== undefined ? x : getBuyableAmount(this.layer, this.id)
        );

        if (level.lte(0)) return new Decimal("0");

        let base = layers[this.layer].getGPbase();

        let mult = new Decimal("1");
        mult = mult.times(player.g.tier3.max("1"));
        if (hasUpgrade("g", 33)) {
          mult = mult.times(upgradeEffect("g", 33));
        }
        if (hasUpgrade("g", 14)) {
          mult = mult.times(upgradeEffect("g", 14));
        }
        if (hasMilestone("b", 2)) {
          mult = mult.times(tmp.b.effect.max("1"));
        }
        if (hasMilestone("b", 7)) {
          mult = mult.times(layers.b.getSpeed().max("1"));
        }

        let eff = base.pow(level.sub(1)).times(mult);
        return eff;
      },

      display() {
        let data = temp[this.layer].buyables[this.id];
        let gpBase = layers[this.layer].getGPbase();

        return `Generate Generator Tier 2, and multiply its gain by <h3>${format(
          gpBase
        )}</h3> per level-1.\n\nLevel: ${
          player[this.layer].buyables[this.id] || 0
        }\nCost: ${format(data.cost)} Points\nEffect: +${format(
          data.effect
        )} Tier 2 Powers/sec`;
      },

      canAfford() {
        return player.points.gte(this.cost());
      },

      buy() {
        let cost = this.cost();
        if (!hasMilestone("b", 6)) {
          player.points = player.points.sub(cost);
        } else {
        }
        player.g.buyables[this.id] = getBuyableAmount(this.layer, this.id).add(
          1
        );
      },

      unlocked() {
        return player.g.buyables[11].gte("10");
      },
    },
    13: {
      title: "Generator Tier III",

      cost(x) {
        let level = new Decimal(
          x !== undefined ? x : getBuyableAmount(this.layer, this.id)
        );

        let baseCost = new Decimal("1e11");
        let baseLinear = new Decimal("1").add(level.times("0.5"));
        let quadratic1 = new Decimal("1").add(level.times("0.005"));
        let quadratic2 = new Decimal("1").add(level.times("0.00001"));
        let mult = baseLinear
          .pow(level)
          .times(new Decimal(quadratic1).pow(level.pow(2)))
          .times(new Decimal(quadratic2).pow(level.pow(3)));

        return baseCost.times(mult);
      },

      effect(x) {
        let level = new Decimal(
          x !== undefined ? x : getBuyableAmount(this.layer, this.id)
        );

        if (level.lte(0)) return new Decimal("0");

        let base = layers[this.layer].getGPbase();

        let mult = new Decimal("1");
        mult = mult.times(player.g.tier4.max("1"));
        if (hasUpgrade("g", 33)) {
          mult = mult.times(upgradeEffect("g", 33));
        }
        if (hasUpgrade("g", 14)) {
          mult = mult.times(upgradeEffect("g", 14));
        }
        if (hasMilestone("b", 3)) {
          mult = mult.times(tmp.b.effect.max("1"));
        }
        if (hasMilestone("b", 9)) {
          mult = mult.times(layers.b.getSpeed().max("1"));
        }

        let eff = base.pow(level.sub(1)).times(mult);
        return eff;
      },

      display() {
        let data = temp[this.layer].buyables[this.id];
        let gpBase = layers[this.layer].getGPbase();

        return `Generate Generator Tier 3, and multiply its gain by <h3>${format(
          gpBase
        )}</h3> per level-1.\n\nLevel: ${
          player[this.layer].buyables[this.id] || 0
        }\nCost: ${format(data.cost)} Points\nEffect: +${format(
          data.effect
        )} Tier 3 Powers/sec`;
      },

      canAfford() {
        return player.points.gte(this.cost());
      },

      buy() {
        let cost = this.cost();
        if (!hasMilestone("b", 6)) {
          player.points = player.points.sub(cost);
        } else {
        }
        player.g.buyables[this.id] = getBuyableAmount(this.layer, this.id).add(
          1
        );
      },

      unlocked() {
        return player.g.buyables[12].gte("10");
      },
    },
    14: {
      title: "Generator Tier IV",

      cost(x) {
        let level = new Decimal(
          x !== undefined ? x : getBuyableAmount(this.layer, this.id)
        );

        let baseCost = new Decimal("1e20");
        let baseLinear = new Decimal("1").add(level.times("1"));
        let quadratic1 = new Decimal("1").add(level.times("0.01"));
        let quadratic2 = new Decimal("1").add(level.times("0.0001"));
        let quadratic3 = new Decimal("1").add(level.times("0.000002"));
        let mult = baseLinear
          .pow(level)
          .times(new Decimal(quadratic1).pow(level.pow(2)))
          .times(new Decimal(quadratic2).pow(level.pow(3)))
          .times(new Decimal(quadratic3).pow(level.pow(4)));

        return baseCost.times(mult);
      },

      effect(x) {
        let level = new Decimal(
          x !== undefined ? x : getBuyableAmount(this.layer, this.id)
        );

        if (level.lte(0)) return new Decimal("0");

        let base = layers[this.layer].getGPbase();

        let mult = new Decimal("1");
        mult = mult.times(player.g.tier5.max("1"));
        if (hasUpgrade("g", 33)) {
          mult = mult.times(upgradeEffect("g", 33));
        }
        if (hasUpgrade("g", 14)) {
          mult = mult.times(upgradeEffect("g", 14));
        }
        if (hasMilestone("b", 4)) {
          mult = mult.times(tmp.b.effect.max("1"));
        }
        if (hasMilestone("b", 9)) {
          mult = mult.times(layers.b.getSpeed().max("1"));
        }

        let eff = base.pow(level.sub(1)).times(mult);
        return eff;
      },

      display() {
        let data = temp[this.layer].buyables[this.id];
        let gpBase = layers[this.layer].getGPbase();

        return `Generate Generator Tier 4, and multiply its gain by <h3>${format(
          gpBase
        )}</h3> per level-1.\n\nLevel: ${
          player[this.layer].buyables[this.id] || 0
        }\nCost: ${format(data.cost)} Points\nEffect: +${format(
          data.effect
        )} Tier 4 Powers/sec`;
      },

      canAfford() {
        return player.points.gte(this.cost());
      },

      buy() {
        let cost = this.cost();
        if (!hasMilestone("b", 6)) {
          player.points = player.points.sub(cost);
        } else {
        }
        player.g.buyables[this.id] = getBuyableAmount(this.layer, this.id).add(
          1
        );
      },

      unlocked() {
        return player.g.buyables[13].gte("10");
      },
    },
    15: {
      title: "Generator Tier V",

      cost(x) {
        let level = new Decimal(
          x !== undefined ? x : getBuyableAmount(this.layer, this.id)
        );

        let baseCost = new Decimal("1e67");
        let baseLinear = new Decimal("1").add(level.times("2"));
        let quadratic1 = new Decimal("1").add(level.times("0.05"));
        let quadratic2 = new Decimal("1").add(level.times("0.0015"));
        let quadratic3 = new Decimal("1").add(level.times("0.00001"));
        let quadratic4 = new Decimal("1").add(level.times("0.000001"));
        let mult = baseLinear
          .pow(level)
          .times(new Decimal(quadratic1).pow(level.pow(2)))
          .times(new Decimal(quadratic2).pow(level.pow(3)))
          .times(new Decimal(quadratic3).pow(level.pow(4)))
          .times(new Decimal(quadratic4).pow(level.pow(5)));

        return baseCost.times(mult);
      },

      effect(x) {
        let level = new Decimal(
          x !== undefined ? x : getBuyableAmount(this.layer, this.id)
        );

        if (level.lte(0)) return new Decimal("0");

        let base = layers[this.layer].getGPbase();

        let mult = new Decimal("1");
        if (hasUpgrade("g", 33)) {
          mult = mult.times(upgradeEffect("g", 33));
        }
        if (hasMilestone("b", 8)) {
          mult = mult.times(tmp.b.effect.max("1"));
        }
        if (hasMilestone("b", 10)) {
          mult = mult.times(layers.b.getSpeed().max("1"));
        }

        let eff = base.pow(level.sub(1)).times(mult);
        return eff;
      },

      display() {
        let data = temp[this.layer].buyables[this.id];
        let gpBase = layers[this.layer].getGPbase();

        return `Generate Generator Tier 5, and multiply its gain by <h3>${format(
          gpBase
        )}</h3> per level-1.\n\nLevel: ${
          player[this.layer].buyables[this.id] || 0
        }\nCost: ${format(data.cost)} Points\nEffect: +${format(
          data.effect
        )} Tier 5 Powers/sec`;
      },

      canAfford() {
        return player.points.gte(this.cost());
      },

      buy() {
        let cost = this.cost();
        player.points = player.points.sub(cost);
        player.g.buyables[this.id] = getBuyableAmount(this.layer, this.id).add(
          1
        );
      },

      unlocked() {
        return player.g.buyables[14].gte("10") && hasMilestone("b", 5);
      },
    },
  },

  upgrades: {
    11: {
      title: "Start Generating",
      description: "Generate 1 Base Generator Powers per second.",
      cost: new Decimal("1"),
      currencyInternalName: "points",
      currencyDisplayName: "Points",
      currencyLocation() {
        return player;
      },
      effect() {
        return new Decimal("1");
      },
      effectDisplay() {
        return "+" + format(this.effect());
      },
      unlocked() {
        return true || hasUpgrade(this.layer, this.id);
      },
    },
    12: {
      title: "Doubling",
      description() {
        return `Base Generator Powers gain +${format("1")}.`;
      },
      cost: new Decimal("20"),
      currencyInternalName: "points",
      currencyDisplayName: "Points",
      currencyLocation() {
        return player;
      },
      effect() {
        return new Decimal("1");
      },
      effectDisplay() {
        return "+" + format(this.effect());
      },
      unlocked() {
        return hasUpgrade("g", 11) || hasUpgrade(this.layer, this.id);
      },
    },
    13: {
      title: "Synergy I",
      getEffExp() {
        let exp = new Decimal("1");
        if (hasUpgrade("g", 31)) exp = exp.add("0.50");
        if (hasUpgrade("g", 32)) exp = exp.add("1.00");
        if (hasUpgrade("g", 34)) exp = exp.add("0.50");
        return exp;
      },
      description() {
        let exp = this.getEffExp();
        return `Multiplier to GP based on log(Points)^${format(exp)} (floored)`;
      },
      cost: new Decimal("100"),
      currencyInternalName: "points",
      currencyDisplayName: "Points",
      currencyLocation() {
        return player;
      },
      effect() {
        let base = player.points.max("10").log10();
        let exp = this.getEffExp();
        return base.pow(exp);
      },
      effectDisplay() {
        return format(this.effect()) + "x";
      },
      unlocked() {
        return hasUpgrade("g", 12) || hasUpgrade(this.layer, this.id);
      },
    },
    14: {
      title() {
        return `Powered Generators Synergy`;
      },
      getEffExp() {
        let exp = new Decimal("1").div("3");
        return exp;
      },
      description() {
        let exp = this.getEffExp();
        return `Multiply the first 4 Generators based on log10(GP)^${format(
          exp
        )}.<br>Increase GP Effect Exponent by 0.05`;
      },
      cost: new Decimal("1e35"),
      currencyInternalName: "points",
      currencyDisplayName: "Points",
      currencyLocation() {
        return player;
      },
      effect() {
        let exp = this.getEffExp();
        return player.g.points.max("10").log10().pow(exp);
      },
      effectDisplay() {
        return format(this.effect()) + "x";
      },
      unlocked() {
        return (
          (hasUpgrade("g", 13) &&
            getBuyableAmount("g", 14).gte(10) &&
            hasMilestone("b", 1)) ||
          hasUpgrade(this.layer, this.id)
        );
      },
    },
    21: {
      title: "Doubling Again",
      description() {
        return `Global Point gain mult ${format("2")}x.`;
      },
      cost: new Decimal("250"),
      currencyInternalName: "points",
      currencyDisplayName: "Points",
      currencyLocation() {
        return player;
      },
      effect() {
        return new Decimal("2");
      },
      effectDisplay() {
        return format(this.effect()) + "x";
      },
      unlocked() {
        return hasUpgrade("g", 13) || hasUpgrade(this.layer, this.id);
      },
    },
    22: {
      title: "First Exponent",
      description() {
        return `Increase Generator Power gain exponent by 1 [only affects base GP gain].`;
      },
      tooltip() {
        return `GP gain = (GP base gain^GP gain exp)*GP Mult.`;
      },
      cost: new Decimal("500"),
      currencyInternalName: "points",
      currencyDisplayName: "Points",
      currencyLocation() {
        return player;
      },
      effect() {
        return new Decimal("1");
      },
      effectDisplay() {
        return "+" + format(this.effect(), 3);
      },
      unlocked() {
        return hasUpgrade("g", 21) || hasUpgrade(this.layer, this.id);
      },
    },
    23: {
      title() {
        return hasUpgrade("g", 23)
          ? `First <h2>TRUE</h2> Exponent`
          : "First Exponent";
      },
      description() {
        return `Increase Generator Power effect exponent by 0.10 and unlock a buyable.`;
      },
      cost: new Decimal("1000"),
      currencyInternalName: "points",
      currencyDisplayName: "Points",
      currencyLocation() {
        return player;
      },
      effect() {
        return new Decimal("0.1");
      },
      effectDisplay() {
        return "+" + format(this.effect(), 4);
      },
      unlocked() {
        return hasUpgrade("g", 22) || hasUpgrade(this.layer, this.id);
      },
    },
    24: {
      title() {
        return hasUpgrade("g", 24)
          ? `Too <h2>MUCH</h2> Exponent`
          : "Too ____ Exponent";
      },
      description() {
        return `Increase Generator Power effect exponent by 0.05 (another +0.05 at 15 minutes of 'B' Time)<br>Increase 'Powered Generators' effect exponent by 0.05.`;
      },
      cost: new Decimal("4.646e46"),
      currencyInternalName: "points",
      currencyDisplayName: "Points",
      currencyLocation() {
        return player;
      },
      unlocked() {
        return (
          (hasUpgrade("g", 23) && player.g.buyables[11].gte(50)) ||
          hasUpgrade(this.layer, this.id)
        );
      },
    },
    31: {
      title() {
        return `<h2>MORE</h2> Exponents`;
      },
      description() {
        return `Increase Generator Power effect exponent by 0.05.<br>Increase 'Synergy I' Exponent by 0.50.`;
      },
      cost: new Decimal("1e13"),
      currencyInternalName: "points",
      currencyDisplayName: "Points",
      currencyLocation() {
        return player;
      },
      unlocked() {
        return (
          (hasUpgrade("g", 23) && player.g.buyables[11].gte(20)) ||
          hasUpgrade(this.layer, this.id)
        );
      },
    },
    32: {
      title() {
        return `Even <h2>MORE</h2> Exponents`;
      },
      description() {
        return `Increase Generator Power effect exponent by 0.05 again.<br>Increase 'Synergy I' Exponent by 1.00.`;
      },
      cost: new Decimal("1e20"),
      currencyInternalName: "points",
      currencyDisplayName: "Points",
      currencyLocation() {
        return player;
      },
      unlocked() {
        return (
          (hasUpgrade("g", 31) && player.g.buyables[14].gte(1)) ||
          hasUpgrade(this.layer, this.id)
        );
      },
    },
    33: {
      title() {
        return `Powered Generators`;
      },
      getEffExp() {
        let exp = new Decimal("0.20");
        if (hasUpgrade("g", 24)) exp = exp.add("0.05");
        return exp;
      },
      description() {
        let exp = this.getEffExp();
        return `Multiply All Generators based on log10(Points)^${format(
          exp
        )}.<br>Increase Generator Power effect exponent by 0.05 <h3>YET again</h3><br>Unlock the second layer.`;
      },
      cost: new Decimal("1e28"),
      currencyInternalName: "points",
      currencyDisplayName: "Points",
      currencyLocation() {
        return player;
      },
      effect() {
        let exp = this.getEffExp();
        return player.points.max("10").log10().pow(exp);
      },
      effectDisplay() {
        return format(this.effect()) + "x";
      },
      unlocked() {
        return (
          (hasUpgrade("g", 32) && getBuyableAmount("g", 14).gte(8)) ||
          hasUpgrade(this.layer, this.id)
        );
      },
    },
    34: {
      title() {
        return `Exponent Plus`;
      },
      description() {
        return `Increase Generator Power effect exponent by 0.10.<br>Increase 'Synergy I' Exponent by 0.50.`;
      },
      cost: new Decimal("7.777e77"),
      currencyInternalName: "points",
      currencyDisplayName: "Points",
      currencyLocation() {
        return player;
      },
      unlocked() {
        return (
          (hasUpgrade("g", 33) && player.b.points.gte(6)) ||
          hasUpgrade(this.layer, this.id)
        );
      },
    },
  },

  tabFormat: {
    Main: {
      unlocked() {
        return hasUpgrade("g", 23);
      },
      content: [
        [
          "raw-html",
          function () {
            return `You have <h2 style="color: cyan; text-shadow: 0px 0px 10px cyan">${format(
              player.points
            )}</h2> Points`;
          },
        ],
        "blank",
        "main-display",
        [
          "raw-html",
          function () {
            // Fixed: Removed duplicate text that was causing visual clutter
            return `You are gaining <h2 style="color: lime; text-shadow: 0px 0px 10px lime">${formatWhole(
              tmp.g.resetGain
            )}</h2> Generator Powers/s.`;
          },
        ],
        "blank",
        "upgrades",
      ],
    },
    Generators: {
      unlocked() {
        return hasUpgrade("g", 23);
      },
      content: [
        [
          "raw-html",
          function () {
            return `You have <h2 style="color: cyan; text-shadow: 0px 0px 10px cyan">${format(
              player.points
            )}</h2> Points`;
          },
        ],
        "blank",
        "main-display",
        [
          "raw-html",
          function () {
            return `You are gaining <h2 style="color: lime; text-shadow: 0px 0px 10px lime">${formatWhole(
              tmp.g.resetGain
            )}</h2> Generator Powers/s.`;
          },
        ],
        "blank",
        [
          "raw-html",
          function () {
            // Fixed: Safe check prevents crashing layer rendering
            if (player.g.tier1.lte(0)) {
              return "";
            } else {
              return `You have <h2 style="color: yellow; text-shadow: 0px 0px 10px yellow">${format(
                player.g.tier1
              )}</h2> Generator Tier 1s, which DIRECTLY boost Generator Powers gain.`;
            }
          },
        ],
        [
          "raw-html",
          function () {
            // Fixed: Safe check prevents crashing layer rendering
            if (player.g.tier2.lte(0)) {
              return "";
            } else {
              return `You have <h2 style="color: orange; text-shadow: 0px 0px 10px orange">${format(
                player.g.tier2
              )}</h2> Generator Tier 2s, which DIRECTLY boost Generator Tier 1 gain.`;
            }
          },
        ],
        [
          "raw-html",
          function () {
            // Fixed: Safe check prevents crashing layer rendering
            if (player.g.tier3.lte(0)) {
              return "";
            } else {
              return `You have <h2 style="color: red; text-shadow: 0px 0px 10px red">${format(
                player.g.tier3
              )}</h2> Generator Tier 3s, which DIRECTLY boost Generator Tier 2 gain.`;
            }
          },
        ],
        [
          "raw-html",
          function () {
            // Fixed: Safe check prevents crashing layer rendering
            if (player.g.tier4.lte(0)) {
              return "";
            } else {
              return `You have <h2 style="color: pink; text-shadow: 0px 0px 10px pink">${format(
                player.g.tier4
              )}</h2> Generator Tier 4s, which DIRECTLY boost Generator Tier 3 gain.`;
            }
          },
        ],
        [
          "raw-html",
          function () {
            // Safe check using player.g.tier5 directly since buyable 15 isn't defined yet
            if (player.g.tier5.lte(0)) {
              return "";
            } else {
              return `You have <h2 style="color: magenta; text-shadow: 0px 0px 10px magenta">${format(
                player.g.tier5
              )}</h2> Generator Tier 5s, which DIRECTLY boost Generator Tier 4 gain.`;
            }
          },
        ],
        "blank",
        "clickables",
        "buyables",
      ],
    },
  },
});

// Boosters
addLayer("b", {
  name: "boosters",
  symbol: "B",
  position: 1,
  row: 0,

  startData() {
    return {
      unlocked: true,
      points: new Decimal(0),
      time: new Decimal(0),
    };
  },

  getSpeed() {
    let speed = new Decimal("1");
    if (hasMilestone("b", 3))
      speed = speed.add(new Decimal("0.25").times(player.b.points));
    return speed;
  },

  update(diff) {
    // Booster Time Speed
    let tick = layers.b.getSpeed();
    player.b.time = player.b.time.add(tick.times(diff));
  },

  color: "blue",
  requires: new Decimal(1e42),
  resource: "Boosters",
  baseResource: "XP",

  getfactorpointexp() {
    let exp = new Decimal("0");
    if (hasMilestone("b", 8)) {
      exp = exp.add("1");
    }
    return exp;
  },

  getfactorGPexp() {
    let exp = new Decimal("1");
    if (hasMilestone("b", 8)) {
      exp = exp.div("20");
    }
    return exp;
  },

  baseAmount() {
    let factor1 = player.g.points.pow(layers.b.getfactorGPexp());
    let factor2 = player.points.pow(layers.b.getfactorpointexp());
    let total = factor1.times(factor2);
    return total;
  },

  type: "static",
  branches: ["g"],
  base() {
    if (player.b.points.gte("100")) {
      return new Decimal("1.80e308");
    } else if (player.b.points.gte("50")) {
      return new Decimal("1e100");
    } else if (player.b.points.gte("10")) {
      return new Decimal("1e20");
    } else {
      return new Decimal("1e8");
    }
  },

  exponent() {
    if (player.b.points.gte("120")) {
      return new Decimal("2");
    } else if (player.b.points.gte("80")) {
      return new Decimal("1.7");
    } else if (player.b.points.gte("60")) {
      return new Decimal("1.5");
    } else if (player.b.points.gte("40")) {
      return new Decimal("1.3");
    } else if (player.b.points.gte("30")) {
      return new Decimal("1.2");
    } else if (player.b.points.gte("20")) {
      return new Decimal("1.1");
    } else if (player.b.points.gte("15")) {
      return new Decimal("1.05");
    } else if (player.b.points.gte("6")) {
      return new Decimal("1.02");
    } else {
      return new Decimal("1");
    }
  },

  layerShown() {
    return hasUpgrade("g", 33);
  },

  getBaseEff() {
    let base = new Decimal("2.5");
    return base;
  },

  effect() {
    let base = this.getBaseEff();
    let eff = base.pow(player.b.points).max("1");
    return eff;
  },

  effectDescription() {
    return `which boost Generator Power gain by <h2 style="color: lime; text-shadow: 0px 0px 10px lime">${format(
      this.effect()
    )}x</h2><br>Your base effect is <h3 style="color: blue; text-shadow: 0px 0px 10px blue">${format(
      this.getBaseEff()
    )}</h3>`;
  },

  onPrestige(gain) {
    player.g.points = new Decimal(0);
    player.g.tier1 = new Decimal(0);
    player.g.tier2 = new Decimal(0);
    player.g.tier3 = new Decimal(0);
    player.g.tier4 = new Decimal(0);
    player.g.tier5 = new Decimal(0);
    player.g.tier6 = new Decimal(0);
    player.g.tier7 = new Decimal(0);
    player.g.tier8 = new Decimal(0);
    player.g.tier9 = new Decimal(0);
    player.g.tier10 = new Decimal(0);
    player.g.buyables[11] = new Decimal("0");
    player.g.buyables[12] = new Decimal("0");
    player.g.buyables[13] = new Decimal("0");
    player.g.buyables[14] = new Decimal("0");
    player.g.buyables[15] = new Decimal("0");
    player.g.buyables[21] = new Decimal("0");
    player.g.buyables[22] = new Decimal("0");
    player.g.buyables[23] = new Decimal("0");
    player.g.buyables[24] = new Decimal("0");
    player.g.buyables[25] = new Decimal("0");
    player.b.time = new Decimal(0);
  },

  getTargetTimeeff1() {
    let target = new Decimal("60").times("15");
    return target;
  },
  getTimeexp1() {
    let exp = new Decimal("0.50");
    return exp;
  },
  getTimeeff1() {
    let time = player.b.time
      .minus(layers.b.getTargetTimeeff1().minus("1"))
      .max("0");
    let exp = layers.b.getTimeexp1();
    let total = time.pow(exp);
    return total.max("1");
  },
  clickables: {
    11: {
      title() {
        return `Force Booster Reset.`;
      },
      display() {
        return `Reset Booster for no Rewards. [This button is useless lamo]`;
      },
      color() {
        return "blue";
      },
      canClick() {
        return true;
      },
      unlocked() {
        return hasMilestone("b", 5);
      },
      onClick() {
        player.g.buyables[11] = new Decimal("0");
        player.g.buyables[12] = new Decimal("0");
        player.g.buyables[13] = new Decimal("0");
        player.g.buyables[14] = new Decimal("0");
        player.g.buyables[15] = new Decimal("0");
        player.g.buyables[21] = new Decimal("0");
        player.g.buyables[22] = new Decimal("0");
        player.g.buyables[23] = new Decimal("0");
        player.g.buyables[24] = new Decimal("0");
        player.g.buyables[25] = new Decimal("0");
        player.g.tier10 = new Decimal(0);
        player.g.tier9 = new Decimal(0);
        player.g.tier8 = new Decimal(0);
        player.g.tier7 = new Decimal(0);
        player.g.tier6 = new Decimal(0);
        player.g.tier5 = new Decimal(0);
        player.g.tier4 = new Decimal(0);
        player.g.tier3 = new Decimal(0);
        player.g.tier2 = new Decimal(0);
        player.g.tier1 = new Decimal(0);
        player.g.points = new Decimal(0);
        player.points = new Decimal(0);
        player.b.time = new Decimal(0);
      },
    },
  },
  milestones: {
    1: {
      requirementDescription: "1 Boosters",
      effectDescription:
        "Boosters effect now affects Generator Tier 1s gain.<br>Unlock column 4 of Main Generator Upgrades at 10 of G4, 50 of G1, and 6 Boosters.",
      done() {
        return player.b.points.gte(1);
      },
    },
    2: {
      requirementDescription: "2 Boosters",
      tooltip:
        "Note: Seconds/60 = Minutes. You might need to research or use a calculator for this...",
      effectDescription() {
        let eff = format(layers.b.getTimeeff1(), 3);
        let target = format(layers.b.getTargetTimeeff1(), 3);
        return `Boosters effect now affects Generator Tier 2s gain.<br>Time since Booster reset after ${target} seconds boost GP gain at a reduced rate. Effect: ${eff}x`;
      },
      done() {
        return player.b.points.gte(2);
      },
      unlocked() {
        return hasMilestone("b", 1);
      },
    },
    3: {
      requirementDescription: "3 Boosters",
      effectDescription() {
        return `Boosters effect now affects Generator Tier 3s gain.<br>Multiply Booster Time Speed by +25% additive per booster.`;
      },
      done() {
        return player.b.points.gte(3);
      },
      unlocked() {
        return hasMilestone("b", 2);
      },
    },
    4: {
      requirementDescription: "4 Boosters",
      effectDescription() {
        return `Boosters effect now affects Generator Tier 4s gain<br>Increase Base GP gain by 3.`;
      },
      done() {
        return player.b.points.gte(4);
      },
      unlocked() {
        return hasMilestone("b", 3);
      },
    },
    5: {
      requirementDescription: "5 Boosters",
      effectDescription() {
        return `Unlock the 5th Generator whenever you have 10 of 4th Generators.<br>Unlock the ablity to Buy 1 of each Generator Level.`;
      },
      done() {
        return player.b.points.gte(5);
      },
      unlocked() {
        return hasMilestone("b", 4);
      },
    },
    6: {
      requirementDescription: "6 Boosters",
      effectDescription() {
        return `Time Speed affects Points gain.<br>Generator 1-4 costs nothing.`;
      },
      done() {
        return player.b.points.gte(6);
      },
      unlocked() {
        return hasMilestone("b", 5);
      },
    },
    7: {
      requirementDescription: "7 Boosters",
      effectDescription() {
        return `Time speed now affects GP, Generator 1, and Generator 2 gains.`;
      },
      done() {
        return player.b.points.gte(7);
      },
      unlocked() {
        return hasMilestone("b", 6);
      },
    },
    8: {
      requirementDescription: "8 Boosters",
      effectDescription() {
        return `Boosters XP now affects Points, but GP to XP exp is divided by 20.<br>Booster effect now affects Generator 5 gains.`;
      },
      done() {
        return player.b.points.gte(8);
      },
      unlocked() {
        return hasMilestone("b", 7);
      },
    },
    9: {
      requirementDescription: "9 Boosters",
      effectDescription() {
        return `Time Speed now affects Generator 3 and Generator 4 gains.`;
      },
      done() {
        return player.b.points.gte(9);
      },
      unlocked() {
        return hasMilestone("b", 8);
      },
    },
    10: {
      requirementDescription: "10 Boosters",
      effectDescription() {
        return `Unlock Generator 6! [Coming Soon]<br>Time Speed now affects Generator 5 gains.`;
      },
      done() {
        return player.b.points.gte(10);
      },
      unlocked() {
        return hasMilestone("b", 9);
      },
    },
  },

  tabFormat: {
    Boosters: {
      content: [
        [
          "raw-html",
          function () {
            return `Doing a Booster Reset will reset ALL Generators, Generator Powers, and Points. However... the Upgrades are kept.<br>Doing this will get a bigger boost, come back quicker!`;
          },
        ],
        "blank",
        "main-display",
        "prestige-button",
        "blank",
        [
          "raw-html",
          function () {
            let t = player.b.time || new Decimal(0);

            // Unit thresholds in seconds
            const MIN = new Decimal(60);
            const HR = MIN.times(60);
            const DAY = HR.times(24);
            const YEAR = DAY.times(365);
            const MIL = YEAR.times(1000);
            const EON = MIL.times(1e6);
            const UNIV = EON.times(13.8);

            let rem = new Decimal(t);
            let parts = [];

            // Universe Ages
            let univ = rem.div(UNIV).floor();
            if (univ.gt(0)) {
              parts.push(
                `${formatWhole(univ)} universe age${univ.eq(1) ? "" : "s"}`
              );
              rem = rem.sub(univ.times(UNIV));
            }

            // Eons
            let eon = rem.div(EON).floor();
            if (eon.gt(0)) {
              parts.push(`${formatWhole(eon)} eon${eon.eq(1) ? "" : "s"}`);
              rem = rem.sub(eon.times(EON));
            }

            // Millennia
            let mil = rem.div(MIL).floor();
            if (mil.gt(0)) {
              parts.push(
                `${formatWhole(mil)} millennia${mil.eq(1) ? "" : "s"}`
              );
              rem = rem.sub(mil.times(MIL));
            }

            // Years
            let yr = rem.div(YEAR).floor();
            if (yr.gt(0)) {
              parts.push(`${formatWhole(yr)} year${yr.eq(1) ? "" : "s"}`);
              rem = rem.sub(yr.times(YEAR));
            }

            // Days
            let d = rem.div(DAY).floor();
            if (d.gt(0)) {
              parts.push(`${formatWhole(d)}d`);
              rem = rem.sub(d.times(DAY));
            }

            // Hours
            let h = rem.div(HR).floor();
            if (h.gt(0)) {
              parts.push(`${formatWhole(h)}h`);
              rem = rem.sub(h.times(HR));
            }

            // Minutes
            let m = rem.div(MIN).floor();
            if (m.gt(0)) {
              parts.push(`${formatWhole(m)}m`);
              rem = rem.sub(m.times(MIN));
            }

            // Seconds (Always shows if sub-minute or as final remainder)
            if (parts.length === 0 || rem.gt(0)) {
              parts.push(`${format(rem, 3)}s`);
            }

            return `Time since Booster reset: <h3 style="color: blue; text-shadow: 0px 0px 10px blue">${parts.join(
              " "
            )}</h3>`;
          },
        ],
        [
          "raw-html",
          function () {
            // Fixed: Referencing layers.b explicitly instead of undefined `this`
            let speed = layers.b.getSpeed();
            return `Booster time speed: <h3 style="color: blue; text-shadow: 0px 0px 10px blue">${format(
              speed,
              3
            )}x</h3>`;
          },
        ],
        "blank",
        "clickables",
        "milestones",
      ],
    },
  },
});

// upgrades: {11: {title: "Upgrade 0",description: "Blah",cost: new Decimal("100"),}, },
// To be placed, using <h2 style="color: ${this.color}; text-shadow: 0px 0px 10px ${this.color}">
