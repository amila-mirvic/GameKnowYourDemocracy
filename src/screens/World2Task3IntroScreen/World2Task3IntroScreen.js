import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import IntroScreen from '../../components/game/IntroScreen';
import { WORLD2_INTROS } from '../../game/content/world2Tasks';
import { getPlayerFromLocationState } from '../../game/utils/player';

export default function World2Task3IntroScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const player = useMemo(() => getPlayerFromLocationState(location.state), [location.state]);
  const config = WORLD2_INTROS.task3;

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