import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import IntroScreen from '../../components/game/IntroScreen';
import { WORLD1_INTROS } from '../../game/content/world1Tasks';
import { getPlayerFromLocationState } from '../../game/utils/player';

export default function World1Task4IntroScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const player = useMemo(() => getPlayerFromLocationState(location.state), [location.state]);
  const config = WORLD1_INTROS.task4;

  return (
    <IntroScreen
      player={player}
      navigate={navigate}
      backgroundUrl={config.backgroundUrl}
      introText={config.introText}
      autoNavigateTo={config.autoNavigateTo}
      typeMs={config.typeMs}
      holdMs={config.holdMs}
      fadeMs={config.fadeMs}
      infoRows={[]}
    />
  );
}
