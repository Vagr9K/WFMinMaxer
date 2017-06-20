import React from 'react';
import styles from './Placeholder.scss';

class Placeholder extends React.Component {
  render() {
    return (
      <div className={styles.placeholder}>
        <p>Select an enemy from the Search Bar</p>
      </div>
    );
  }
}

export default Placeholder;
