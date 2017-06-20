import * as DataLoader from './Data';

let StatArray = null;
let NoStats = false;
let baseStats = {
  affinity: 0,
  armor: 0,
  flesh: 0,
  lvl: 0,
  shield: 0,
};

let enemy = null;

function NullifyStats() {
  baseStats = {
    affinity: 0,
    armor: 0,
    flesh: 0,
    lvl: 0,
    shield: 0,
  };
  StatArray = null;
}

function parseEnemyStats() {
  NullifyStats();
  const armortest = new RegExp(/.*Armor$/, ['i']);
  const shieldtest = new RegExp(/.*Shield$/, ['i']);
  const statsobj = enemy.data.Statistics;
  if (!statsobj) {
    return false;
  }
  NoStats = false;

  Object.keys(statsobj).forEach((key) => {
    if (key === 'Base Level') {
      baseStats.lvl = Number(statsobj[key][0]);
    } else if (key === 'Base Affinity' || key === 'Base Exp') {
      baseStats.affinity = Number(statsobj[key][0]);
    } else if (armortest.test(key)) {
      baseStats.armor += Number(statsobj[key][0]);
    } else if (shieldtest.test(key)) {
      baseStats.shield += Number(statsobj[key][0]);
    } else if (!(key === '' || key === 'Body Multipliers')) {
      baseStats.flesh += Number(statsobj[key][0]);
    }
  });

  return true;
}

function computeEnemyStatsAtLevel(level) {
  const baselvl = baseStats.lvl;
  let newlvl = level;
  if (newlvl < baselvl) {
    newlvl = baselvl;
  }

  /* eslint no-mixed-operators: "off"*/
  let newhealth = baseStats.flesh * (1 + (newlvl - baselvl) ** 2 * 0.015);
  let newshield = baseStats.shield * (1 + (newlvl - baselvl) ** 2 * 0.0075);
  let newarmor = baseStats.armor * (1 + (newlvl - baselvl) ** 1.75 * 0.005);
  let newexp = Math.floor(baseStats.affinity * (1 + newlvl ** 0.5 * 0.1425));
  let newdmgreduction = newarmor / (newarmor + 300);
  let newehp = newhealth / (1 - newdmgreduction) + newshield;
  const newdmgmultiplier = 1 + (newlvl - baselvl) ** 1.55 * 0.015;

  newhealth = Math.round(newhealth);
  newshield = Math.round(newshield);
  newarmor = Math.round(newarmor);
  newexp = Math.round(newexp);
  newehp = Math.round(newehp);
  newdmgreduction *= 100;

  const newstats = {
    affinity: newexp,
    armor: newarmor,
    dmgmultiplier: newdmgmultiplier,
    dmgreduction: newdmgreduction,
    ehp: newehp,
    hp: newhealth,
    lvl: newlvl,
    shield: newshield,
  };

  return newstats;
}

export function generateStatsAtLevels(start, end) {
  if (NoStats) {
    return null;
  }
  if (StatArray === null) {
    StatArray = [];
    for (let id = start; id <= end; id += 1) {
      const newstat = computeEnemyStatsAtLevel(id);
      StatArray.push(newstat);
    }
  }

  return StatArray;
}

export function getBaseStats() {
  return baseStats;
}

export function setEnemy(enemyname) {
  enemy = DataLoader.GetEnemy(enemyname);
  if (parseEnemyStats()) {
    NoStats = false;
  } else {
    NoStats = true;
  }
}
