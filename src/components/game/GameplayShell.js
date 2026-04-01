import React, { useMemo } from 'react';
import styles from './GameplayShell.module.css';

export default function GameplayShell({ backgroundUrl, children, contentClassName }) {
  const bgStyle = useMemo(() => ({ '--bg': `url(${backgroundUrl})` }), [backgroundUrl]);
  return (
    <div className={styles.screen} style={bgStyle}>
      <div className={styles.overlay}>
        <div className={contentClassName ? `${styles.content} ${contentClassName}` : styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}
