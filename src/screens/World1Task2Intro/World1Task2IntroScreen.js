import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import IntroScreen from '../../components/game/IntroScreen';
import { WORLD1_INTROS } from '../../game/content/world1Tasks';
import { getPlayerFromLocationState } from '../../game/utils/player';

export default function World1Task2IntroScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const player = useMemo(() => getPlayerFromLocationState(location.state), [location.state]);
  const config = WORLD1_INTROS.task2;

  return (
    <IntroScreen
      player={player}
      navigate={navigate}
      backgroundUrl={config.backgroundUrl}
      introText={config.introText}
      infoTitle={config.infoTitle}
      infoRows={config.infoRows}
      primaryAction={{ label: 'START', onClick: () => navigate(config.startRoute, { state: player }) }}
    />
  );
}
