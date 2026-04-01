import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getCharacterSrc } from '../../game/utils/player';
import styles from './IntroScreen.module.css';

export default function IntroScreen({
  player,
  backgroundUrl,
  introText,
  infoTitle,
  infoRows = [],
  primaryAction,
  secondaryAction,
  autoNavigateTo,
  navigate,
  autoNavigateDelay = 0,
  typeMs = 84,
  holdMs = 2500,
  fadeMs = 700,
  revealDelay = 120,
}) {
  const bgStyle = useMemo(() => ({ '--bg': `url(${backgroundUrl})` }), [backgroundUrl]);
  const characterSrc = getCharacterSrc(player?.character);
  const [typedText, setTypedText] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [showUI, setShowUI] = useState(false);
  const [uiTextIn, setUiTextIn] = useState(false);

  const typingRef = useRef(null);
  const holdRef = useRef(null);
  const fadeRef = useRef(null);
  const revealRefs = useRef([]);

  useEffect(() => {
    if (!introText) {
      setTypingDone(true);
      setHidden(true);
      setShowUI(true);
      setUiTextIn(true);
      return undefined;
    }

    let i = 0;
    typingRef.current = setInterval(() => {
      i += 1;
      setTypedText(introText.slice(0, i));

      if (i >= introText.length) {
        window.clearInterval(typingRef.current);
        typingRef.current = null;
        setTypingDone(true);

        holdRef.current = window.setTimeout(() => {
          setFading(true);

          fadeRef.current = window.setTimeout(() => {
            setHidden(true);

            if (autoNavigateTo) {
              revealRefs.current.push(
                window.setTimeout(() => navigate(autoNavigateTo, { state: player }), autoNavigateDelay)
              );
              return;
            }

            revealRefs.current.push(window.setTimeout(() => setShowUI(true), revealDelay));
            revealRefs.current.push(window.setTimeout(() => setUiTextIn(true), revealDelay + 240));
          }, fadeMs);
        }, holdMs);
      }
    }, typeMs);

    return () => {
      if (typingRef.current) window.clearInterval(typingRef.current);
      if (holdRef.current) window.clearTimeout(holdRef.current);
      if (fadeRef.current) window.clearTimeout(fadeRef.current);
      revealRefs.current.forEach((id) => window.clearTimeout(id));
      revealRefs.current = [];
    };
  }, [autoNavigateDelay, autoNavigateTo, fadeMs, holdMs, introText, navigate, player, revealDelay, typeMs]);

  return (
    <div className={styles.screen} style={bgStyle}>
      <div className={styles.overlay}>
        {!hidden && (
          <div className={[styles.introLayer, fading ? styles.introFadeOut : ''].join(' ')}>
            <div className={styles.introText}>
              {typedText}
              {!typingDone && <span className={styles.introCaret} aria-hidden="true" />}
            </div>
          </div>
        )}

        {showUI && !autoNavigateTo && (
          <div className={styles.uiWrap}>
            <div className={[styles.characterWrap, styles.uiReveal, uiTextIn ? styles.uiTextIn : ''].join(' ')}>
              <img src={characterSrc} alt="" className={styles.characterImg} />
            </div>

            <div className={[styles.infoCard, styles.uiReveal, uiTextIn ? styles.uiTextIn : ''].join(' ')}>
              {infoTitle ? <div className={styles.cardTitle}>{infoTitle}</div> : null}

              <div className={styles.rows}>
                {infoRows.map((row, index) => (
                  <div key={`${row.text || 'row'}_${index}`} className={styles.row}>
                    {row.image ? <img className={styles.icon} src={row.image} alt={row.alt || ''} /> : null}
                    {row.pill ? <div className={styles.pillIcon}>{row.pill}</div> : null}
                    <div className={styles.rowText}>{row.text}</div>
                  </div>
                ))}
              </div>

              <div className={styles.actions}>
                {secondaryAction ? (
                  <button type="button" className={styles.actionBtn} onClick={secondaryAction.onClick}>
                    {secondaryAction.label}
                  </button>
                ) : null}
                {primaryAction ? (
                  <button type="button" className={styles.actionBtn} onClick={primaryAction.onClick}>
                    {primaryAction.label}
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
