import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import IntroScreen from '../../components/game/IntroScreen';
import { WORLD4_INTROS } from '../../game/content/world4Tasks';
import { getPlayerFromLocationState } from '../../game/utils/player';

export default function World4Task3IntroScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const player = useMemo(() => getPlayerFromLocationState(location.state), [location.state]);
  const config = WORLD4_INTROS.task3;

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