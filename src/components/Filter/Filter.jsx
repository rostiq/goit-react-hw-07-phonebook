import React from 'react';

import styles from './Filter.module.css';

const Filter = ({ value, onChange }) => (
  <div>
    <label className={styles.label}>
      Filter
      <input
        placeholder='Find contact'
        type="name"
        value={value}
        onChange={onChange}
      />
    </label>
  </div>
);

export default Filter;