import React from 'react';
import { connect } from 'react-redux';
import { LineChart } from 'components';
import * as ChartData from 'data/ChartData';
import chartOptions from 'data/ChartOptions';

class EnemyChart extends React.Component {
  render() {
    ChartData.SetEnemy(this.props.enemyName);
    ChartData.SetChartLevelRange(this.props.lvlRange.start, this.props.lvlRange.end);
    const chartID = this.props.enemyName;
    const chartObj = ChartData.getChartData(this.props.type);
    if (chartObj === null) {
      return null;
    }

    return (
      <LineChart
        chartID={chartID + this.props.type}
        chartObj={chartObj}
        chartOptions={chartOptions}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    enemyName: state.enemy.get('enemyName'),
    lvlRange: {
      start: state.enemy.getIn(['lvlRange', 'start']),
      end: state.enemy.getIn(['lvlRange', 'end']),
    },
  };
}

export default connect(mapStateToProps)(EnemyChart);
