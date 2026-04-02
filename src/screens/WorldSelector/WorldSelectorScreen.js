import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./WorldSelectorScreen.module.css";

const WORLDS = [
  {
    id: 1,
    route: "/world-1",
    title: "WORLD 1 - DEMOCRACY",
    thumbTitle: "WORLD 1",
    image: `${process.env.PUBLIC_URL}/worlds/world1.png`,
    playable: true,
    disabled: false,
    description:
      "Democracy is more than elections and slogans. It is a system of rules, rights, and responsibilities that shapes everyday life. In this world, you will explore how democracy works in practice. You will learn how decisions are made, who holds power, and where citizens can influence outcomes. Through real situations and thoughtful choices, you will recognize democratic principles and practice responding when fairness, participation, or rights are challenged.",
  },
  {
    id: 2,
    route: "/world-2",
    title: "WORLD 2 - MEDIA LITERACY",
    thumbTitle: "WORLD 2",
    image: `${process.env.PUBLIC_URL}/worlds/world2.png`,
    playable: true,
    disabled: false,
    description:
      "In this world, you will explore how information is created, shared, distorted, and believed. You will learn to recognize manipulation, misinformation, emotional framing, and the difference between credible reporting and misleading content. Through practical situations and decision-making, you will strengthen your media literacy skills and learn how to respond critically in a fast-moving information environment.",
  },
  {
    id: 3,
    route: "/world-3",
    title: "WORLD 3 - NAME",
    thumbTitle: "WORLD 3",
    image: `${process.env.PUBLIC_URL}/worlds/world3.png`,
    playable: false,
    disabled: true,
    description:
      "World 3 is currently locked. Its content will be added in a later phase, while the selector already supports it visually so the structure stays scalable.",
  },
  {
    id: 4,
    route: "/world-4",
    title: "WORLD 4 - NAME",
    thumbTitle: "WORLD 4",
    image: `${process.env.PUBLIC_URL}/worlds/world4.png`,
    playable: false,
    disabled: true,
    description:
      "World 4 is also locked for now. It remains in the selector as part of the full world overview and can be activated later without changing the screen structure.",
  },
];

function ArrowLeftIcon() {
  return (
    <svg
      viewBox="0 0 448.011 448.011"
      aria-hidden="true"
      className={styles.arrowSvg}
    >
      <g transform="translate(448.011, 0) scale(-1, 1)">
        <path d="M438.731,209.463l-416-192c-6.624-3.008-14.528-1.216-19.136,4.48c-4.64,5.696-4.8,13.792-0.384,19.648l136.8,182.4l-136.8,182.4c-4.416,5.856-4.256,13.984,0.352,19.648c3.104,3.872,7.744,5.952,12.448,5.952c2.272,0,4.544-0.48,6.688-1.472l416-192c5.696-2.624,9.312-8.288,9.312-14.528S444.395,212.087,438.731,209.463z" />
      </g>
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 448.011 448.011"
      aria-hidden="true"
      className={styles.arrowSvg}
    >
      <path d="M438.731,209.463l-416-192c-6.624-3.008-14.528-1.216-19.136,4.48c-4.64,5.696-4.8,13.792-0.384,19.648l136.8,182.4l-136.8,182.4c-4.416,5.856-4.256,13.984,0.352,19.648c3.104,3.872,7.744,5.952,12.448,5.952c2.272,0,4.544-0.48,6.688-1.472l416-192c5.696-2.624,9.312-8.288,9.312-14.528S444.395,212.087,438.731,209.463z" />
    </svg>
  );
}

export default function WorldSelectorScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  const player = useMemo(() => {
    const fromState = location.state && location.state.name ? location.state : null;
    if (fromState) return fromState;

    try {
      const raw = localStorage.getItem("yd_player");
      return raw ? JSON.parse(raw) : { name: "Player", character: "female" };
    } catch {
      return { name: "Player", character: "female" };
    }
  }, [location.state]);

  const bgUrl = `${process.env.PUBLIC_URL}/backgrounds/firstbg3.png`;
  const bgStyle = useMemo(() => ({ "--bg": `url(${bgUrl})` }), [bgUrl]);

  const nameUpper = (player.name || "PLAYER").toUpperCase();

  const [activeWorldIndex, setActiveWorldIndex] = useState(0);
  const [typedDescription, setTypedDescription] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  const typingIntervalRef = useRef(null);
  const activeWorld = WORLDS[activeWorldIndex];

  useEffect(() => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }

    const fullText = activeWorld.description;
    let index = 0;

    setTypedDescription("");
    setTypingDone(false);

    typingIntervalRef.current = setInterval(() => {
      index += 1;
      setTypedDescription(fullText.slice(0, index));

      if (index >= fullText.length) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
        setTypingDone(true);
      }
    }, 8);

    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
    };
  }, [activeWorld]);

  const goPrev = () => {
    setActiveWorldIndex((prev) => (prev === 0 ? WORLDS.length - 1 : prev - 1));
  };

  const goNext = () => {
    setActiveWorldIndex((prev) => (prev === WORLDS.length - 1 ? 0 : prev + 1));
  };

  const handleSelectWorld = (index) => {
    setActiveWorldIndex(index);
  };

  const handlePlayWorld = () => {
    if (!activeWorld.playable) return;

    navigate(activeWorld.route, {
      state: {
        ...player,
        world: activeWorld.id,
      },
    });
  };

  return (
    <div className={styles.screen} style={bgStyle}>
      <div className={styles.overlay}>
        <h1 className={styles.title}>HI {nameUpper} SELECT A WORLD TO PLAY IN</h1>

        <div className={styles.worldCard}>
          <div className={styles.worldLeft}>
            <div className={styles.worldImageWrap}>
              <img
                src={activeWorld.image}
                alt={activeWorld.title}
                className={styles.worldImage}
              />
              {activeWorld.disabled && (
                <div className={styles.disabledBadge}>LOCKED</div>
              )}
            </div>

            <div className={styles.worldLabel}>{activeWorld.title}</div>
          </div>

          <div className={styles.worldRight}>
            <p className={styles.worldDesc}>
              {typedDescription}
              {!typingDone && <span className={styles.caret} aria-hidden="true" />}
            </p>

            <button
              type="button"
              className={`${styles.playBtn} ${
                !activeWorld.playable ? styles.playBtnDisabled : ""
              }`}
              onClick={handlePlayWorld}
              disabled={!activeWorld.playable}
            >
              {activeWorld.playable ? "PLAY" : "COMING SOON"}
            </button>
          </div>
        </div>

        <div className={styles.bottomArea}>
          <div className={styles.worldThumbs}>
            {WORLDS.map((world, index) => (
              <button
                key={world.id}
                type="button"
                className={`${styles.thumbCard} ${
                  index === activeWorldIndex ? styles.thumbCardActive : ""
                } ${world.disabled ? styles.thumbCardDisabled : ""}`}
                onClick={() => handleSelectWorld(index)}
                aria-label={`Select ${world.thumbTitle}`}
              >
                <div className={styles.thumbImageWrap}>
                  <img src={world.image} alt="" className={styles.thumbImage} />
                  {world.disabled && (
                    <span className={styles.thumbLock}>
                      <img
                        src={`${process.env.PUBLIC_URL}/ui/lock.svg`}
                        alt=""
                        className={styles.thumbLockIcon}
                      />
                    </span>
                  )}
                </div>
                <span className={styles.thumbLabel}>{world.thumbTitle}</span>
              </button>
            ))}
          </div>

          <div className={styles.arrowControls}>
            <button
              type="button"
              className={styles.arrowBtn}
              onClick={goPrev}
              aria-label="Previous world"
            >
              <ArrowLeftIcon />
            </button>

            <button
              type="button"
              className={styles.arrowBtn}
              onClick={goNext}
              aria-label="Next world"
            >
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}