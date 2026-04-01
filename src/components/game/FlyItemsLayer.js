import React from 'react';
import styles from './FlyItemsLayer.module.css';

export default function FlyItemsLayer({ items }) {
  if (!items?.length) return null;
  return items.map((item) => (
    <div
      key={item.id}
      className={styles.wrap}
      style={{
        left: item.fromX,
        top: item.fromY,
        '--fromX': `${item.fromX}px`,
        '--fromY': `${item.fromY}px`,
        '--toX': `${item.toX}px`,
        '--toY': `${item.toY}px`,
      }}
    >
      <div className={styles.inner}>
        <img src={item.icon} alt="" className={styles.icon} />
        <div className={styles.delta}>{item.delta}</div>
      </div>
    </div>
  ));
}
