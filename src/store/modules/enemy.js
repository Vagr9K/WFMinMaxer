import Immutable from 'immutable';

export const SELECT_ENEMY = 'enemy/SELECT_ENEMY';
export const SELECT_LVLRANGE = 'enemy/SELECT_LVLRANGE';

const initialState = Immutable.fromJS({
  enemyName: null,
  placeholder: true,
  lvlRange: {
    start: 1,
    end: 150,
  },
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_ENEMY:
      return state.set('enemyName', action.enemyName)
        .set('placeholder', false);
    case SELECT_LVLRANGE: {
      const lvlRange = Immutable.fromJS({
        start: action.start,
        end: action.end,
      });
      return state.set('lvlRange', lvlRange);
    }
    default:
      return state;
  }
}

export function selectEnemy(enemyName) {
  return {
    type: SELECT_ENEMY,
    enemyName,
  };
}

export function selectLvlRange(start, end) {
  return {
    type: SELECT_LVLRANGE,
    start,
    end,
  };
}
