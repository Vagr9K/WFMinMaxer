import React from 'react';
import { connect } from 'react-redux';
import { EnemyChart } from 'containers';
import { DataPanel } from 'components';
import Subheader from 'react-md/lib/Subheaders';
import Avatar from 'react-md/lib/Avatars';
import * as DataLoader from 'data/Data';
import styles from './EnemyData.scss';

class Enemy extends React.Component {
  render() {
    const enemyData = DataLoader.GetEnemy(this.props.enemyName);
    return (
      <div className={` ${styles.container} md-grid`}>
        <div className={`${styles.heading} md-grid md-cell md-cell--12`}>
          <Subheader primary primaryText={enemyData.name} />
          <Avatar src={enemyData.img} alt={enemyData.name} />
        </div>
        {
          Object.keys(enemyData.data)
            .map(panelHeader =>
              <DataPanel
                panelHeader={panelHeader}
                rows={enemyData.data[panelHeader]}
                key={panelHeader}
              />)
        }
        <EnemyChart type="hsa" />
        <EnemyChart type="ehp" />
        <EnemyChart type="adv" />
      </div>
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

export default connect(mapStateToProps)(Enemy);
