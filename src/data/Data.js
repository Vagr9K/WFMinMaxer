import enemystats from '../../db/stats.json';

const EnemyTable = {};

function Init() {
  enemystats.forEach((enemy, index) => {
    EnemyTable[enemy.name] = index;
  });
}
Init();

export function GetEnemy(enemyname) {
  const id = EnemyTable[enemyname];

  return enemystats[id];
}

export function CheckNameExistance(enemyname) {
  if (Reflect.apply(Object.hasOwnProperty, EnemyTable, [enemyname])) {
    return true;
  }

  return false;
}

export function GetEnemyNameTable() {
  return EnemyTable;
}
