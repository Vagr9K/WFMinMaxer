import * as ParsedData from './ParsedData';

let LvlStart = 0;
let LvlEnd = 110;

const colors = {
  affinity: 'rgba(195, 195, 195, 1)',
  armor: 'rgba(237, 178, 59, 1)',
  dmgmultiplier: 'rgba(51, 15, 10, 1)',
  dmgreduction: 'rgba(199, 213, 159, 1)',
  ehp: 'rgba(233, 83, 87, 1)',
  hp: 'rgba(233, 83, 87, 1)',
  shield: 'rgba(70, 222, 240, 1)',
};

function generateChartJSData(propertyList, dataLabelList) {
  const chartLabels = [];
  const datasets = [];
  const statArray = ParsedData.generateStatsAtLevels(LvlStart, LvlEnd);
  if (statArray === null) {
    return null;
  }
  const arrayLength = statArray.length;
  const propertyCount = propertyList.length;
  for (let jd = 0; jd < propertyCount; jd += 1) {
    datasets.push({
      backgroundColor: colors[propertyList[jd]],
      data: [],
      fill: false,
      label: dataLabelList[jd],
    });
  }
  for (let id = 0; id < arrayLength; id += 1) {
    chartLabels.push(statArray[id].lvl);
    for (let jd = 0; jd < propertyCount; jd += 1) {
      datasets[jd].data.push(statArray[id][propertyList[jd]]);
    }
  }

  return { datasets, labels: chartLabels };
}

export function SetEnemy(enemyname) {
  ParsedData.setEnemy(enemyname);
}

export function SetChartLevelRange(start, end) {
  if (start < end) {
    LvlStart = start;
    LvlEnd = end;
  } else {
    return false;
  }

  return true;
}

export function getChartData(chartType) {
  const propertyList = [];
  const nameList = [];
  const baseStats = ParsedData.getBaseStats();
  let chartName = '';
  if (chartType === 'hsa') {
    chartName = 'Basic Stats';
    if (baseStats.armor) {
      propertyList.push('armor');
      nameList.push('Armor');
    }
    if (baseStats.shield) {
      propertyList.push('shield');
      nameList.push('Shield');
    }
    if (baseStats.flesh) {
      propertyList.push('hp');
      nameList.push('Health');
    }
  } else if (chartType === 'ehp') {
    propertyList.push('ehp');
    nameList.push('Effective Hitpoints');
  } else if (chartType === 'adv') {
    if (baseStats.armor) {
      propertyList.push('dmgreduction');
      nameList.push('Damage Reduction (%)');
    }
    if (baseStats.affinity) {
      propertyList.push('affinity');
      nameList.push('Affinity');
    }
    propertyList.push('dmgmultiplier');
    nameList.push('Damage Multiplier');
  }
  const chartData = generateChartJSData(propertyList, nameList);
  if (chartData !== null) {
    return {
      chartName,
      chartData,
    };
  }
  return null;
}
