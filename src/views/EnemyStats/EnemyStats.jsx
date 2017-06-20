import React from 'react';
import { connect } from 'react-redux';
import { EnemySearch, EnemyData } from 'containers';
import { Placeholder } from 'components';
import styles from './EnemyStats.scss';

class EnemyStats extends React.Component {
  renderData() {
    if (this.props.placeholder) {
      return <Placeholder />;
    }
    return <EnemyData />;
  }
  render() {
    return (
      <div className={styles.container}>
        <EnemySearch />
        {this.renderData()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    placeholder: state.enemy.get('placeholder'),
  };
}

export default connect(mapStateToProps)(EnemyStats);
