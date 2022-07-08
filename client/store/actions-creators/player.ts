import { PlayerAction, PlayerActionTypes } from '../../types/PLayer';

import { ITrack } from '../../types/Track';

export const playTrack = (): PlayerAction => {
  return { type: PlayerActionTypes.PLAY };
};

export const pauseTrack = (): PlayerAction => {
  return { type: PlayerActionTypes.PAUSE };
};

export const SetActiveTrack = (payload: ITrack): PlayerAction => {
  return { type: PlayerActionTypes.SET_ACTIVE_TRACK, payload };
};

export const setVolume = (payload: number): PlayerAction => {
  return { type: PlayerActionTypes.SET_VOLUME, payload };
};

export const setDuration = (payload: number): PlayerAction => {
  return { type: PlayerActionTypes.SET_DURATION, payload };
};

export const setCurrentTime = (payload: number): PlayerAction => {
  return { type: PlayerActionTypes.SET_CURRENT_TIME, payload };
};

