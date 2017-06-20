import React from 'react';
import { connect } from 'react-redux';
import { selectEnemy } from 'store/modules/enemy';
import AutoComplete from 'react-md/lib/Autocompletes';
import ToolBar from 'react-md/lib/Toolbars';
import * as DataLoader from 'data/Data';
import styles from './EnemySearch.scss';

class EnemySearch extends React.Component {
  static caseInsensitiveFilter(haystack, filterText, dataLabel) {
    const LIMIT = 30;
    const needle = filterText.toLowerCase();

    const filteredData = haystack.filter((hay) => {
      if (hay === null || typeof hay === 'undefined') {
        return false;
      } else if (React.isValidElement(hay)) {
        return true;
      }

      let value;
      switch (typeof hay) {
        case 'string':
        case 'number':
          value = hay.toString();
          break;
        default:
          value = hay[dataLabel];
      }

      return value && value.toLowerCase().indexOf(needle) !== -1;
    });
    return filteredData.slice(0, LIMIT);
  }

  constructor(props) {
    super(props);
    this.refreshEnemy = this.refreshEnemy.bind(this);
    this.firstRun = true;
    const enemyNameTable = DataLoader.GetEnemyNameTable();
    this.enemyNameList = Object.keys(enemyNameTable);
  }

  refreshEnemy(enemyName) {
    if (DataLoader.CheckNameExistance(enemyName)) {
      this.props.dispatch(selectEnemy(enemyName));
    }
  }

  render() {
    return (
      <ToolBar colored className={styles.toolbar}>
        <AutoComplete
          id="EnemySearch"
          label="Search for an enemy"
          data={this.enemyNameList}
          onChange={this.refreshEnemy}
          onAutocomplete={this.refreshEnemy}
          filter={EnemySearch.caseInsensitiveFilter}
          className={styles.search}
          clearOnAutocomplete
        />
      </ToolBar >
    );
  }
}

export default connect()(EnemySearch);
