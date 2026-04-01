export function getPlayerFromLocationState(locationState) {
  const fromState = locationState && locationState.name ? locationState : null;
  if (fromState) return fromState;

  try {
    const raw = localStorage.getItem('yd_player');
    return raw ? JSON.parse(raw) : { name: 'Player', character: 'female' };
  } catch {
    return { name: 'Player', character: 'female' };
  }
}

export function getCharacterSrc(character) {
  return `${process.env.PUBLIC_URL}/characters/${character === 'male' ? 'male' : 'female'}.png`;
}
