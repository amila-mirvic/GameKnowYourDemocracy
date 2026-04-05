import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TaskCompletionModal from '../../components/game/TaskCompletionModal';
import { getPlayerFromLocationState } from '../../game/utils/player';

const MAIN_MENU_ROUTE = '/world-3';
const WORLD_SELECT_ROUTE = '/world-select';

const OUTRO_TEXT = `“You moved from understanding democracy… to practicing it.”

Participation is not about being perfect.
It is about choosing to act — even in small ways.”`;

export default function World3Task4OutroScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const player = useMemo(() => getPlayerFromLocationState(location.state), [location.state]);

  const [typedText, setTypedText] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const typingRef = useRef(null);
  const holdRef = useRef(null);
  const fadeRef = useRef(null);
  const modalRef = useRef(null);

  const citizenBadge = location.state?.citizenBadge || {
    id: 'active-citizen-badge',
    src: `${process.env.PUBLIC_URL}/world3/citizenbadge.png`,
  };

  const earnedTaskBadges = Array.isArray(location.state?.world3Task4Badges)
    ? location.state.world3Task4Badges
    : [];

  const uniqueBadges = [];
  const seen = new Set();

  [...earnedTaskBadges, citizenBadge].forEach((badge) => {
    const src = typeof badge === 'string' ? badge : badge?.src;
    const id = typeof badge === 'string' ? badge : badge?.id || src;

    if (!src || seen.has(id)) return;
    seen.add(id);
    uniqueBadges.push(typeof badge === 'string' ? { id, src } : badge);
  });

  useEffect(() => {
    let i = 0;

    setTypedText('');
    setTypingDone(false);
    setFading(false);
    setHidden(false);
    setModalOpen(false);

    typingRef.current = window.setInterval(() => {
      i += 1;
      setTypedText(OUTRO_TEXT.slice(0, i));

      if (i >= OUTRO_TEXT.length) {
        window.clearInterval(typingRef.current);
        typingRef.current = null;
        setTypingDone(true);

        holdRef.current = window.setTimeout(() => {
          setFading(true);

          fadeRef.current = window.setTimeout(() => {
            setHidden(true);

            modalRef.current = window.setTimeout(() => {
              setModalOpen(true);
            }, 120);
          }, 700);
        }, 2500);
      }
    }, 84);

    return () => {
      if (typingRef.current) window.clearInterval(typingRef.current);
      if (holdRef.current) window.clearTimeout(holdRef.current);
      if (fadeRef.current) window.clearTimeout(fadeRef.current);
      if (modalRef.current) window.clearTimeout(modalRef.current);
    };
  }, []);

  return (
    <div
      style={{
        minHeight: '100dvh',
        width: '100%',
        position: 'relative',
        backgroundImage: `url(${process.env.PUBLIC_URL}/world3/bg4.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          minHeight: '100dvh',
          position: 'relative',
          display: 'grid',
          placeItems: 'center',
          padding: '18px 18px 24px',
          boxSizing: 'border-box',
        }}
      >
        {!hidden && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'grid',
              placeItems: 'center',
              padding: '24px',
              background: 'rgba(10, 18, 30, 0.58)',
              zIndex: 4,
              opacity: fading ? 0 : 1,
              transition: 'opacity 700ms ease',
            }}
          >
            <div
              style={{
                maxWidth: 'min(980px, 92vw)',
                textAlign: 'center',
                color: '#fff',
                fontFamily: '"Tomorrow", sans-serif',
                fontWeight: 800,
                textTransform: 'uppercase',
                fontSize: 'clamp(18px, 2vw, 34px)',
                lineHeight: 1.42,
                textShadow: '0 6px 18px rgba(0, 0, 0, 0.55)',
                whiteSpace: 'pre-line',
              }}
            >
              {typedText}
              {!typingDone && (
                <span
                  aria-hidden="true"
                  style={{
                    display: 'inline-block',
                    width: '0.6em',
                    height: '1.15em',
                    marginLeft: '8px',
                    verticalAlign: 'text-bottom',
                    background: 'rgba(255, 255, 255, 0.82)',
                    animation: 'blink 800ms steps(1) infinite',
                  }}
                />
              )}
            </div>
          </div>
        )}

        <TaskCompletionModal
          open={modalOpen}
          onClose={() => navigate(MAIN_MENU_ROUTE, { state: player })}
          title="YOU HAVE UNLOCKED NEW BADGE"
          stats={[
            { label: 'Active Citizen Badge', value: '' },
          ]}
          badges={uniqueBadges}
          actions={[
            {
              label: 'GO BACK TO MAIN MENU',
              onClick: () => navigate(MAIN_MENU_ROUTE, { state: player }),
            },
            {
              label: 'GO TO WORLD SELECT',
              onClick: () => navigate(WORLD_SELECT_ROUTE, { state: player }),
            },
          ]}
        />
      </div>

      <style>
        {`
          @keyframes blink {
            50% { opacity: 0; }
          }
        `}
      </style>
    </div>
  );
}